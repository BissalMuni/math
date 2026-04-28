#!/usr/bin/env bash
# Windows Task Scheduler에서 호출하는 피드백 리뷰 스크립트
# Claude Code CLI로 /review-feedback 스킬을 실행한다.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_FILE="$PROJECT_DIR/scripts/review-feedback.log"

# Task Scheduler 환경에서 PATH가 부족할 수 있으므로 보충
export PATH="/d/AppData/nodejs/npm_global:$PATH"

cd "$PROJECT_DIR"

log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') $1" | tee -a "$LOG_FILE"
}

log "=== 피드백 리뷰 시작 ==="

# 미처리 의견 확인 (없으면 조기 종료)
COMMENTS=$(bash scripts/fetch-feedback.sh)
if [[ "$COMMENTS" == "[]" ]]; then
  log "미처리 의견 없음 — 건너뜀"
  exit 0
fi

COUNT=$(echo "$COMMENTS" | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>console.log(JSON.parse(d).length))" 2>/dev/null || echo "?")
log "미처리 의견 ${COUNT}건 발견 — Claude Code 실행"

# Claude Code CLI 실행
# --dangerously-skip-permissions: 무인 실행 시 권한 확인 생략 (자동화 전용)
# --allowedTools: 사용 가능 도구를 제한하여 안전성 확보
claude --print --dangerously-skip-permissions \
  --allowedTools "Bash(d:/Coding/math/**),Read(d:/Coding/math/**),Edit(d:/Coding/math/src/**),Write(d:/Coding/math/src/**),Glob(d:/Coding/math/**),Grep(d:/Coding/math/**)" \
  -p "프로젝트 d:\\Coding\\math 에서 review-feedback 작업을 수행해줘.
절대 규칙:
- d:\\Coding\\math\\src\\content/ 과 d:\\Coding\\math\\scripts/ 내의 파일만 수정 가능
- 다른 경로의 파일은 읽기만 가능, 절대 수정하지 말 것
- 미처리 의견을 확인하고, 내용이 합리적이면 src/content/ 콘텐츠 파일에 반영한 뒤 커밋
- 비합리적이거나 단순 감상 의견은 processed만 표시
- 변경사항 커밋 후 git push까지 완료할 것" \
  2>&1 | tee -a "$LOG_FILE"

log "=== 피드백 리뷰 완료 ==="
