/**
 * 바구니 (Basket) — 책을 묶는 UX 라벨.
 * 책을 소유하지 않고 ID로 참조만 함. URL/콘텐츠 없음, 사이드바·홈 그룹핑용.
 * 한 책이 여러 바구니에 속할 수 있음.
 */
export interface Basket {
  /** 바구니 ID = 파일명 어간 */
  id: string;
  /** 바구니 표시 이름 (UX용 자연어) */
  title: string;
  /** 이 바구니에 속한 책 ID 목록 (book.id 참조) */
  bookIds: string[];
}
