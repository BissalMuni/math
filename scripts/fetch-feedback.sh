#!/usr/bin/env bash
# 미처리 의견을 Supabase에서 가져오는 스크립트
# 사용법:
#   bash scripts/fetch-feedback.sh                          — 미처리 의견 전체 조회
#   bash scripts/fetch-feedback.sh --all                    — 전체 의견 조회 (처리됨 포함)
#   bash scripts/fetch-feedback.sh --type=content           — 내용 편집만
#   bash scripts/fetch-feedback.sh --type=structure         — 구조 편집만
#   bash scripts/fetch-feedback.sh --level=major            — 대목차만 (medium, minor, section)
#   bash scripts/fetch-feedback.sh --type=structure --level=medium  — 조합 가능
#   bash scripts/fetch-feedback.sh --mark-processed id1,id2 — ID로 처리 표시
#   bash scripts/fetch-feedback.sh --mark-all-unprocessed   — 미처리 전체 처리 표시
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

if [[ -f "$PROJECT_DIR/.env.local" ]]; then
  export $(grep -v '^#' "$PROJECT_DIR/.env.local" | xargs)
fi

if [[ -z "${SUPABASE_URL:-}" || -z "${SUPABASE_SERVICE_ROLE_KEY:-}" ]]; then
  echo "ERROR: SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY가 설정되지 않았습니다" >&2
  exit 1
fi

API="${SUPABASE_URL}/rest/v1"
# math 전용 스키마 사용 (Accept-Profile: 읽기, Content-Profile: 쓰기)
HEADERS=(
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}"
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}"
  -H "Accept-Profile: math"
  -H "Content-Profile: math"
)
COMMIT_SHA="$(cd "$PROJECT_DIR" && git rev-parse --short HEAD 2>/dev/null || echo 'unknown')"
NOW=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# ──────────────────────────────────────────────
# 옵션 파싱: --type=, --level= 만 분리하고 나머지는 그대로 넘김
# ──────────────────────────────────────────────
TYPE_FILTER=""
LEVEL_FILTER=""
POSITIONAL=()
for arg in "$@"; do
  case "$arg" in
    --type=*)  TYPE_FILTER="${arg#*=}" ;;
    --level=*) LEVEL_FILTER="${arg#*=}" ;;
    *)         POSITIONAL+=("$arg") ;;
  esac
done

# 분류 필터를 PostgREST 쿼리 파라미터로 변환
build_class_filter() {
  local q=""
  if [[ -n "$TYPE_FILTER" ]]; then
    q+="&feedback_type=eq.${TYPE_FILTER}"
  fi
  if [[ -n "$LEVEL_FILTER" ]]; then
    q+="&level=eq.${LEVEL_FILTER}"
  fi
  echo "$q"
}

CLASS_QUERY="$(build_class_filter)"

case "${POSITIONAL[0]:-}" in
  --all)
    curl -s "${API}/comments?select=*${CLASS_QUERY}&order=created_at.asc" "${HEADERS[@]}" -H "Accept: application/json"
    ;;

  --mark-processed)
    IDS="${POSITIONAL[1]:?'--mark-processed에 id 목록 필요 (쉼표 구분)'}"
    SHA="${POSITIONAL[2]:-$COMMIT_SHA}"
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
    # 미처리 전체를 한번에 처리 표시 (필터가 있으면 해당 분류만)
    SHA="${POSITIONAL[1]:-$COMMIT_SHA}"
    curl -s -X PATCH "${API}/comments?or=(processed.eq.false,processed.is.null)${CLASS_QUERY}" \
      "${HEADERS[@]}" \
      -H "Content-Type: application/json" \
      -H "Prefer: return=representation" \
      -d "{\"processed\": true, \"processed_at\": \"${NOW}\", \"commit_sha\": \"${SHA}\"}" \
      | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const r=JSON.parse(d);console.log('Marked '+r.length+' comments as processed')})" 2>/dev/null \
      || echo "Marked unprocessed comments as processed"
    ;;

  *)
    # 미처리 의견만 조회 (processed=false 또는 processed=null) + 분류 필터
    curl -s "${API}/comments?select=*&or=(processed.eq.false,processed.is.null)${CLASS_QUERY}&order=created_at.asc" "${HEADERS[@]}" -H "Accept: application/json"
    ;;
esac
