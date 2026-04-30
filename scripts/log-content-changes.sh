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

  # 이전 내용 (파일이 새로 생성된 경우 빈 문자열)
  BEFORE=$(git show "HEAD~1:$FILE" 2>/dev/null || echo "")

  # 현재 내용 (파일이 삭제된 경우 빈 문자열)
  if [[ -f "$FILE" ]]; then
    AFTER=$(cat "$FILE")
  else
    AFTER=""
  fi

  # JSON 이스케이프 (node 사용)
  PAYLOAD=$(node -e "
    const payload = {
      role: 'github_actions',
      actor: 'github_actions',
      change_type: 'automated_feedback',
      file_path: process.argv[1],
      diff: process.argv[2] || null,
      before_content: process.argv[3] || null,
      after_content: process.argv[4] || null,
      commit_sha: process.argv[5] || null,
      metadata: { source: 'review-feedback-workflow' }
    };
    process.stdout.write(JSON.stringify(payload));
  " "$FILE" "$DIFF" "$BEFORE" "$AFTER" "$COMMIT_SHA")

  # Supabase에 기록
  HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "${API}/content_changes" \
    "${HEADERS[@]}" \
    -H "Content-Type: application/json" \
    -H "Prefer: return=minimal" \
    -d "$PAYLOAD")

  if [[ "$HTTP_STATUS" -ge 200 && "$HTTP_STATUS" -lt 300 ]]; then
    echo "Logged: $FILE (commit: $COMMIT_SHA)"
    COUNT=$((COUNT + 1))
  else
    echo "WARN: Failed to log $FILE (HTTP $HTTP_STATUS)" >&2
  fi

done <<< "$CHANGED_FILES"

echo "Logged $COUNT content change(s)"
