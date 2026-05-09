#!/usr/bin/env bash
# 최근 커밋의 콘텐츠 변경을 Supabase content_changes 테이블에 기록
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# .env.local에서 환경변수 로드
if [[ -f "$PROJECT_DIR/.env.local" ]]; then
  export $(grep -v '^#' "$PROJECT_DIR/.env.local" | xargs)
fi

if [[ -z "${SUPABASE_URL:-}" || -z "${SUPABASE_SERVICE_ROLE_KEY:-}" ]]; then
  echo "ERROR: SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY가 설정되지 않았습니다" >&2
  exit 1
fi

API="${SUPABASE_URL}/rest/v1"
# math 전용 스키마 사용
HEADERS=(
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}"
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}"
  -H "Accept-Profile: math"
  -H "Content-Profile: math"
)
COMMIT_SHA="$(cd "$PROJECT_DIR" && git rev-parse --short HEAD 2>/dev/null || echo 'unknown')"

cd "$PROJECT_DIR"

# 최근 커밋에서 변경된 src/content/ 파일 목록
CHANGED_FILES=$(git diff --name-only HEAD~1 HEAD -- src/content/ 2>/dev/null || echo "")

if [[ -z "$CHANGED_FILES" ]]; then
  echo "No content changes to log"
  exit 0
fi

COUNT=0

while IFS= read -r FILE; do
  [[ -z "$FILE" ]] && continue

  # diff 가져오기
  DIFF=$(git diff HEAD~1 HEAD -- "$FILE" 2>/dev/null || echo "")

  # JSON payload를 임시 파일로 생성 (argument limit 회피)
  TMPFILE=$(mktemp)
  trap "rm -f '$TMPFILE'" EXIT

  node -e "
    const fs = require('fs');
    const filePath = process.argv[1];
    const commitSha = process.argv[2];
    const tmpFile = process.argv[3];
    const diff = fs.readFileSync('/dev/stdin', 'utf8');

    // before/after는 환경변수 대신 파일에서 직접 읽기
    let before = '';
    try { before = require('child_process').execSync('git show HEAD~1:' + filePath, { encoding: 'utf8' }); } catch {}

    let after = '';
    try { after = fs.readFileSync(filePath, 'utf8'); } catch {}

    const payload = {
      role: 'github_actions',
      actor: 'github_actions',
      change_type: 'automated_feedback',
      file_path: filePath,
      diff: diff || null,
      before_content: before || null,
      after_content: after || null,
      commit_sha: commitSha || null,
      metadata: { source: 'review-feedback-workflow' }
    };
    fs.writeFileSync(tmpFile, JSON.stringify(payload));
  " "$FILE" "$COMMIT_SHA" "$TMPFILE" <<< "$DIFF"

  # Supabase에 기록 (파일에서 읽어 argument limit 회피)
  HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "${API}/content_changes" \
    "${HEADERS[@]}" \
    -H "Content-Type: application/json" \
    -H "Prefer: return=minimal" \
    -d @"$TMPFILE")

  rm -f "$TMPFILE"

  if [[ "$HTTP_STATUS" -ge 200 && "$HTTP_STATUS" -lt 300 ]]; then
    echo "Logged: $FILE (commit: $COMMIT_SHA)"
    COUNT=$((COUNT + 1))
  else
    echo "WARN: Failed to log $FILE (HTTP $HTTP_STATUS)" >&2
  fi

done <<< "$CHANGED_FILES"

echo "Logged $COUNT content change(s)"
