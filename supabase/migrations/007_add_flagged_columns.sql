-- ============================================================
-- 댓글 sanitizer 결과 보관용 컬럼 추가
--   flagged     : 의심 패턴 감지 시 true (자동화에서 제외)
--   flag_reason : 플래그 사유 (운영자 사후 검토용)
--
-- 정책:
--   - 본문(body)은 정제하되 보존한다 (운영자가 원본을 확인할 수 있어야 함)
--   - flagged=true 인 댓글은 fetch-feedback.sh 의 자동화 쿼리에서 제외한다
-- ============================================================
BEGIN;

ALTER TABLE math.comments
  ADD COLUMN IF NOT EXISTS flagged BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE math.comments
  ADD COLUMN IF NOT EXISTS flag_reason TEXT;

-- 자동화 쿼리는 (processed=false AND flagged=false) 만 본다 — 전용 인덱스
CREATE INDEX IF NOT EXISTS idx_math_comments_automation_queue
  ON math.comments (feedback_type, level, created_at)
  WHERE processed = false AND flagged = false;

COMMENT ON COLUMN math.comments.flagged IS
  'sanitizer 가 의심 패턴 감지 시 true. 자동화 큐에서 제외된다.';
COMMENT ON COLUMN math.comments.flag_reason IS
  '플래그 사유 (예: "이전 지시 무시 명령 (ignore-previous-en)")';

COMMIT;
