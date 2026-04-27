/** 의견(댓글) */
export interface Comment {
  id: string;
  content_path: string;
  author: string;
  body: string;
  /** 소목차 제목 (예: "소수와 합성수") */
  section_title?: string | null;
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
