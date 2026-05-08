#!/usr/bin/env bash
# ============================================================
# ④ 출력 검증단 — Claude 가 만든 변경사항을 commit 직전에 검증
#
# 호출 시점: review-feedback.yml 의 step 5(Apply content feedback) 직후,
#            step 6(Commit and push) 직전
#
# 검사 항목:
#   1. 허용 경로 (src/content/** 외 변경 차단)
#   2. 총 변경 라인 상한 (500)
#   3. 파일당 변경 라인 상한 (200)
#   4. 변경 파일 수 상한 (20)
#   5. 위험 패턴 (XSS·코드 인젝션 시그니처)
#
# 실패 시: exit 1 → workflow fail → commit·push 수행 안 됨.
#         댓글은 미처리 상태로 보존되어 다음 cron 에 재시도됨.
#
# 통과 시: exit 0 → 후속 step 진행
# ============================================================
set -euo pipefail

# 임계값
MAX_TOTAL_LINES=500
MAX_PER_FILE_LINES=200
MAX_FILES=20

# 허용 경로 prefix (변경 가능한 영역)
ALLOWED_PATH_PREFIX="src/content/"

# 위험 패턴 — Claude 가 추가한 라인에서 검사
DANGEROUS_PATTERNS=(
  'dangerouslySetInnerHTML'
  'eval\s*\('
  'new\s+Function\s*\('
  '<script'
  'import\.meta'
  '__proto__'
)

errors=0

echo "=== ④ 출력 검증단 시작 ==="

# ─────────────────────────────────────────────
# 1. 변경 파일 목록 (수정된 추적 파일 + 새 untracked 파일)
#    Claude 가 새 파일을 만든 경우도 검사 대상에 포함
# ─────────────────────────────────────────────
# git add -N 으로 untracked 파일을 intent-to-add 등록 → diff/numstat 에 노출됨
# 검사 끝나면 step 6 의 `git add -A src/content/` 가 정상 stage 처리
untracked=$(git ls-files --others --exclude-standard)
if [ -n "$untracked" ]; then
  echo "$untracked" | xargs -r git add -N
fi

mapfile -t changed_files < <(git diff --name-only HEAD)

if [ ${#changed_files[@]} -eq 0 ]; then
  echo "변경사항 없음 — 검증 통과 (skip)"
  exit 0
fi

echo "변경 파일 ${#changed_files[@]}개:"
printf '  %s\n' "${changed_files[@]}"

# ─────────────────────────────────────────────
# 2. 변경 파일 수 상한
# ─────────────────────────────────────────────
if [ ${#changed_files[@]} -gt $MAX_FILES ]; then
  echo "❌ 변경 파일 수 ${#changed_files[@]} > 상한 $MAX_FILES"
  errors=$((errors+1))
fi

# ─────────────────────────────────────────────
# 3. 허용 경로 외 변경 차단
# ─────────────────────────────────────────────
for f in "${changed_files[@]}"; do
  if [[ "$f" != "$ALLOWED_PATH_PREFIX"* ]]; then
    echo "❌ 허용 경로 외 변경: $f (허용: ${ALLOWED_PATH_PREFIX}**)"
    errors=$((errors+1))
  fi
done

# ─────────────────────────────────────────────
# 4. 총 변경 라인 상한
# ─────────────────────────────────────────────
shortstat=$(git diff --shortstat HEAD)
echo "shortstat: ${shortstat:-(empty)}"
insertions=$(echo "$shortstat" | grep -oE '[0-9]+ insertion' | grep -oE '[0-9]+' || echo 0)
deletions=$(echo "$shortstat" | grep -oE '[0-9]+ deletion' | grep -oE '[0-9]+' || echo 0)
total_changes=$((insertions + deletions))
echo "총 변경 라인: $total_changes (insertions=$insertions, deletions=$deletions)"
if [ $total_changes -gt $MAX_TOTAL_LINES ]; then
  echo "❌ 총 변경 라인 $total_changes > 상한 $MAX_TOTAL_LINES"
  errors=$((errors+1))
fi

# ─────────────────────────────────────────────
# 5. 파일당 변경 라인 상한
# ─────────────────────────────────────────────
while IFS=$'\t' read -r added removed path; do
  # 바이너리 파일은 '-' 로 표시됨
  if [[ "$added" == "-" || "$removed" == "-" ]]; then
    echo "❌ 바이너리 변경 감지: $path"
    errors=$((errors+1))
    continue
  fi
  per_file=$((added + removed))
  if [ $per_file -gt $MAX_PER_FILE_LINES ]; then
    echo "❌ 파일당 변경 라인 초과: $path ($per_file > $MAX_PER_FILE_LINES)"
    errors=$((errors+1))
  fi
done < <(git diff --numstat HEAD)

# ─────────────────────────────────────────────
# 6. 위험 패턴 (추가된 라인에서만 검사)
# ─────────────────────────────────────────────
echo "위험 패턴 검사..."
added_lines=$(git diff --unified=0 HEAD | grep -E '^\+' | grep -v '^\+\+\+' || true)
for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  matches=$(echo "$added_lines" | grep -E "$pattern" || true)
  if [ -n "$matches" ]; then
    echo "❌ 위험 패턴 감지: '$pattern'"
    echo "$matches" | head -3 | sed 's/^/    /'
    errors=$((errors+1))
  fi
done

# ─────────────────────────────────────────────
# 결론
# ─────────────────────────────────────────────
if [ $errors -gt 0 ]; then
  echo ""
  echo "=== ④ 검증 실패: $errors 건 ==="
  echo "Claude 가 만든 변경을 적용하지 않습니다."
  echo "댓글은 미처리 상태로 보존되어 다음 cron 에 재시도됩니다."
  exit 1
fi

echo ""
echo "=== ④ 검증 통과 ==="
exit 0
