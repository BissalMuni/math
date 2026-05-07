-- ============================================================
-- Storage 버킷 정리 (gangubuy-tax-new 의 'tax-attachments' 와 일관된 이름 규칙)
--
-- Supabase 가 storage.buckets / storage.objects 의 직접 DELETE/UPDATE 를
-- 트리거(storage.protect_delete) 로 차단한다. 따라서 본 SQL 은 신규 버킷
-- 생성만 담당하고, 파일 이동·구 버킷 삭제는 Supabase 대시보드(Storage UI)
-- 또는 Storage REST API 로 진행해야 한다.
--
-- 절차:
--   1. 본 SQL 실행 → 'math-attachments' 버킷 생성
--   2. 대시보드 Storage 탭에서:
--      a. 'math-topic-images' 의 파일을 'math-attachments' 로 이동
--         (파일이 있을 경우. 파일별 Move 또는 다운로드 후 재업로드.)
--      b. 'math-topic-images' 빈 버킷 삭제
--      c. 'topic-images' 버킷의 파일 확인 후 백업 또는 삭제
--      d. 'topic-images' 버킷 삭제
--   3. 코드 변경 반영(BUCKET = 'math-attachments')은 이미 적용됨
-- ============================================================
BEGIN;

-- public = false 로 생성 (Signed URL 로만 접근).
-- 이미 public = true 로 생성된 경우 ON CONFLICT 로 private 전환.
INSERT INTO storage.buckets (id, name, public)
VALUES ('math-attachments', 'math-attachments', false)
ON CONFLICT (id) DO UPDATE SET public = false;

COMMIT;
