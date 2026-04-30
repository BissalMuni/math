/** 의견 편집 종류 */
export type FeedbackType = "content" | "structure";

/** 의견 대상 목차 레벨 */
export type FeedbackLevel = "major" | "medium" | "minor" | "section";

/** 의견(댓글) */
export interface Comment {
  id: string;
  content_path: string;
  author: string;
  body: string;
  /** 소목차/섹션 제목 (예: "소수와 합성수") */
  section_title?: string | null;
  /** 편집 종류: content(내용 편집) | structure(구조 편집) */
  feedback_type: FeedbackType;
  /** 목차 레벨: major(대목차) | medium(중목차) | minor(소목차) | section(h2 섹션) */
  level: FeedbackLevel;
  created_at: string;
}

/** 역할 */
export type { Role } from "@/lib/auth/constants";

/** 콘텐츠 수정 이력 */
export interface ContentChange {
  id: string;
  role: string;
  actor: string;
  change_type: "content_edit" | "structure_edit" | "automated_feedback" | "rollback";
  file_path: string;
  diff?: string | null;
  before_content?: string | null;
  after_content?: string | null;
  commit_sha?: string | null;
  metadata?: Record<string, unknown> | null;
  created_at: string;
}

/** 참고 이미지 */
export interface TopicImage {
  id: string;
  content_path: string;
  file_name: string;
  storage_path: string;
  file_size: number;
  uploaded_by: string;
  created_at: string;
  /** 공개 URL (조회 시 추가) */
  url?: string;
}
