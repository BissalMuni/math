-- ============================================================
-- 의견 처리 상태 추적 컬럼 추가
-- ============================================================
ALTER TABLE comments
  ADD COLUMN IF NOT EXISTS section_title TEXT,
  ADD COLUMN IF NOT EXISTS processed BOOLEAN DEFAULT false NOT NULL,
  ADD COLUMN IF NOT EXISTS processed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS commit_sha TEXT;

CREATE INDEX IF NOT EXISTS idx_comments_processed ON comments (processed) WHERE processed = false;
