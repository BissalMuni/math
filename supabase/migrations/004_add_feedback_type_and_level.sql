-- ============================================================
-- 의견 분류 컬럼 추가
--   feedback_type: 'content' (내용 편집) | 'structure' (구조 편집)
--   level:         'major' (대목차) | 'medium' (중목차) | 'minor' (소목차) | 'section' (h2 섹션)
-- 기존 데이터는 default 값으로 채워짐 (content / section)
-- ============================================================
ALTER TABLE comments
  ADD COLUMN IF NOT EXISTS feedback_type TEXT NOT NULL DEFAULT 'content'
    CHECK (feedback_type IN ('content', 'structure')),
  ADD COLUMN IF NOT EXISTS level TEXT NOT NULL DEFAULT 'section'
    CHECK (level IN ('major', 'medium', 'minor', 'section'));

CREATE INDEX IF NOT EXISTS idx_comments_feedback_type ON comments (feedback_type);
CREATE INDEX IF NOT EXISTS idx_comments_level ON comments (level);
-- 미처리 의견 + 분류로 자주 필터링하므로 복합 인덱스
CREATE INDEX IF NOT EXISTS idx_comments_unprocessed_class
  ON comments (feedback_type, level)
  WHERE processed = false;
