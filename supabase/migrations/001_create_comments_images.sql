-- ============================================================
-- 의견(댓글) 테이블
-- ============================================================
CREATE TABLE IF NOT EXISTS comments (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  content_path TEXT        NOT NULL,
  author       TEXT        NOT NULL,
  body         TEXT        NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_comments_content_path ON comments (content_path);

-- ============================================================
-- 참고 이미지 테이블
-- ============================================================
CREATE TABLE IF NOT EXISTS topic_images (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  content_path TEXT        NOT NULL,
  file_name    TEXT        NOT NULL,
  storage_path TEXT        NOT NULL,
  file_size    BIGINT      NOT NULL,
  uploaded_by  TEXT        NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_topic_images_content_path ON topic_images (content_path);

-- ============================================================
-- Storage 버킷: topic-images (public)
-- Supabase 대시보드 Storage 탭에서 직접 생성하거나
-- 아래 SQL을 실행하세요
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('topic-images', 'topic-images', true)
ON CONFLICT DO NOTHING;
