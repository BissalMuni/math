-- ============================================================
-- 같은 Supabase 프로젝트를 다른 앱(gangubuy-tax-new)과 공유하므로
-- 본 프로젝트(math) 전용 스키마를 새로 만들고 빈 테이블로 시작한다.
--
-- 주의:
--   - public.comments / public.topic_images / public.content_changes 는
--     건드리지 않는다 (다른 프로젝트가 사용 중).
--   - 본 프로젝트는 처음 시작 단계라 데이터 이관 없음.
--
-- 적용 후 Supabase 대시보드에서:
--   Settings → API → "Exposed schemas" 에 `math` 추가 필요
-- ============================================================
BEGIN;

CREATE SCHEMA IF NOT EXISTS math;

GRANT USAGE ON SCHEMA math TO anon, authenticated, service_role;

-- ============================================================
-- math.comments (migrations 001 + 002 + 004 통합 정의)
-- ============================================================
CREATE TABLE math.comments (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  content_path  TEXT        NOT NULL,
  author        TEXT        NOT NULL,
  body          TEXT        NOT NULL,
  section_title TEXT,
  processed     BOOLEAN     NOT NULL DEFAULT false,
  processed_at  TIMESTAMPTZ,
  commit_sha    TEXT,
  feedback_type TEXT        NOT NULL DEFAULT 'content'
    CHECK (feedback_type IN ('content', 'structure')),
  level         TEXT        NOT NULL DEFAULT 'section'
    CHECK (level IN ('major', 'medium', 'minor', 'section')),
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_math_comments_content_path
  ON math.comments (content_path);
CREATE INDEX idx_math_comments_processed
  ON math.comments (processed) WHERE processed = false;
CREATE INDEX idx_math_comments_feedback_type
  ON math.comments (feedback_type);
CREATE INDEX idx_math_comments_level
  ON math.comments (level);
CREATE INDEX idx_math_comments_unprocessed_class
  ON math.comments (feedback_type, level) WHERE processed = false;

-- ============================================================
-- math.topic_images (migration 001)
-- ============================================================
CREATE TABLE math.topic_images (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  content_path TEXT        NOT NULL,
  file_name    TEXT        NOT NULL,
  storage_path TEXT        NOT NULL,
  file_size    BIGINT      NOT NULL,
  uploaded_by  TEXT        NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_math_topic_images_content_path
  ON math.topic_images (content_path);

-- ============================================================
-- math.content_changes (migration 003)
-- ============================================================
CREATE TABLE math.content_changes (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  role            TEXT        NOT NULL,
  actor           TEXT        NOT NULL DEFAULT 'unknown',
  change_type     TEXT        NOT NULL,
  file_path       TEXT        NOT NULL,
  diff            TEXT,
  before_content  TEXT,
  after_content   TEXT,
  commit_sha      TEXT,
  metadata        JSONB,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_math_content_changes_file_path
  ON math.content_changes (file_path);
CREATE INDEX idx_math_content_changes_created_at
  ON math.content_changes (created_at DESC);
CREATE INDEX idx_math_content_changes_change_type
  ON math.content_changes (change_type);

-- ============================================================
-- 권한
-- ============================================================
GRANT ALL ON ALL TABLES    IN SCHEMA math TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA math TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA math TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA math GRANT ALL ON TABLES    TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA math GRANT ALL ON SEQUENCES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA math GRANT ALL ON FUNCTIONS TO service_role;

-- ============================================================
-- math 전용 Storage 버킷
-- (기존 'topic-images' 는 gangubuy-tax-new 가 사용 중이므로 건드리지 않음)
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('math-topic-images', 'math-topic-images', true)
ON CONFLICT (id) DO NOTHING;

COMMIT;
