import type { CategoryRoot } from "@/book/types";

/** 카테고리 ID → JSON 데이터 파일 경로 매핑 */
const CATEGORY_META: Record<string, { fileName: string }> = {
  "middle-school": { fileName: "data/middle-school.json" },
  "high-school":   { fileName: "data/high-school.json" },
  "llm-math":      { fileName: "data/llm-math.json" },
  "llm-learning":  { fileName: "data/llm-learning.json" },
};

/** CategoryRoot를 JSON 문자열로 직렬화 (관리자 편집 → JSON 파일) */
export function serializeCategoryToJSON(category: CategoryRoot): string {
  return JSON.stringify(category, null, 2) + "\n";
}

/** 트리에서 모든 leaf node id를 수집 */
export function collectLeafIds(nodes: CategoryRoot["children"]): string[] {
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

/** 카테고리 메타 정보 조회 */
export function getCategoryMeta(categoryId: string) {
  return CATEGORY_META[categoryId] ?? null;
}
