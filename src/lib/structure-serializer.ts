import type { Book } from "@/book/types";

/** 책 ID → JSON 데이터 파일 경로 매핑 */
const BOOK_META: Record<string, { fileName: string }> = {
  "middle-school": { fileName: "data/middle-school.json" },
  "high-school":   { fileName: "data/high-school.json" },
  "llm-math":      { fileName: "data/llm-math.json" },
  "llm-learning":  { fileName: "data/llm-learning.json" },
  "ai-research":   { fileName: "data/ai-research.json" },
  "ai-memory":     { fileName: "data/ai-memory.json" },
  "ai-datacenter": { fileName: "data/ai-datacenter.json" },
  "wireless-comm": { fileName: "data/wireless-comm.json" },
};

/** Book을 JSON 문자열로 직렬화 (관리자 편집 → JSON 파일) */
export function serializeBookToJSON(book: Book): string {
  return JSON.stringify(book, null, 2) + "\n";
}

/** 트리에서 모든 leaf node id를 수집 */
export function collectLeafIds(nodes: Book["children"]): string[] {
  const ids: string[] = [];
  for (const node of nodes) {
    if (!node.children || node.children.length === 0) {
      ids.push(node.id);
    } else {
      ids.push(...collectLeafIds(node.children));
    }
  }
  return ids;
}

/** 책 메타 정보 조회 */
export function getBookMeta(bookId: string) {
  return BOOK_META[bookId] ?? null;
}
