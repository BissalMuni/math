-- 콘텐츠 수정 이력 테이블
CREATE TABLE IF NOT EXISTS content_changes (
  id              UUID            DEFAULT gen_random_uuid() PRIMARY KEY,
  role            TEXT            NOT NULL,
  actor           TEXT            NOT NULL DEFAULT 'unknown',
  change_type     TEXT            NOT NULL,
  file_path       TEXT            NOT NULL,
  diff            TEXT,
  before_content  TEXT,
  after_content   TEXT,
  commit_sha      TEXT,
  metadata        JSONB,
  created_at      TIMESTAMPTZ     DEFAULT now()
);

-- 인덱스
CREATE INDEX idx_content_changes_file_path ON content_changes (file_path);
CREATE INDEX idx_content_changes_created_at ON content_changes (created_at DESC);
CREATE INDEX idx_content_changes_change_type ON content_changes (change_type);
