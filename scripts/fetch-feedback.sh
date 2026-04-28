#!/usr/bin/env bash
# 미처리 의견을 Supabase에서 가져오는 스크립트
# 사용법:
#   bash scripts/fetch-feedback.sh                          — 미처리 의견 조회
#   bash scripts/fetch-feedback.sh --all                    — 전체 의견 조회
#   bash scripts/fetch-feedback.sh --mark-processed id1,id2 — ID로 처리 표시
#   bash scripts/fetch-feedback.sh --mark-all-unprocessed   — 미처리 전체 처리 표시
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
HEADERS=(-H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}")
COMMIT_SHA="$(cd "$PROJECT_DIR" && git rev-parse --short HEAD 2>/dev/null || echo 'unknown')"
NOW=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

case "${1:-}" in
  --all)
    # 전체 의견 조회
    curl -s "${API}/comments?select=*&order=created_at.asc" "${HEADERS[@]}" -H "Accept: application/json"
    ;;

  --mark-processed)
    # ID로 처리 표시 (쉼표 구분)
    IDS="${2:?'--mark-processed에 id 목록 필요 (쉼표 구분)'}"
    SHA="${3:-$COMMIT_SHA}"
    IFS=',' read -ra ID_ARRAY <<< "$IDS"
    for ID in "${ID_ARRAY[@]}"; do
      curl -s -X PATCH "${API}/comments?id=eq.${ID}" \
        "${HEADERS[@]}" \
        -H "Content-Type: application/json" \
        -H "Prefer: return=minimal" \
        -d "{\"processed\": true, \"processed_at\": \"${NOW}\", \"commit_sha\": \"${SHA}\"}"
      echo "Marked processed (by id): ${ID}"
    done
    ;;

  --mark-all-unprocessed)
    # 미처리 전체를 한번에 처리 표시 (id=null 포함)
    SHA="${2:-$COMMIT_SHA}"
    curl -s -X PATCH "${API}/comments?or=(processed.eq.false,processed.is.null)" \
      "${HEADERS[@]}" \
      -H "Content-Type: application/json" \
      -H "Prefer: return=representation" \
      -d "{\"processed\": true, \"processed_at\": \"${NOW}\", \"commit_sha\": \"${SHA}\"}" \
      | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const r=JSON.parse(d);console.log('Marked '+r.length+' comments as processed')})" 2>/dev/null \
      || echo "Marked unprocessed comments as processed"
    ;;

  *)
    # 미처리 의견만 조회 (processed=false 또는 processed=null)
    curl -s "${API}/comments?select=*&or=(processed.eq.false,processed.is.null)&order=created_at.asc" "${HEADERS[@]}" -H "Accept: application/json"
    ;;
esac
