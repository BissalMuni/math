export { middleSchool } from "./middle-school";
export { highSchool } from "./high-school";
export { llmMath, llmConceptTree } from "./llm-math";
export { llmLearning } from "./llm-learning";
export { math } from "./math";
export type { TreeNode, CategoryRoot } from "./types";
export { isLeafNode, findNodePath, findNodeBySlugs } from "./types";

import { middleSchool } from "./middle-school";
import { highSchool } from "./high-school";
import { llmMath } from "./llm-math";
import { llmLearning } from "./llm-learning";
import { math } from "./math";
import type { CategoryRoot } from "./types";

/** 모든 책 — 사이드바·홈 페이지에서 쓰는 최상위 단위 (수학, LLM) */
export const allBooks: CategoryRoot[] = [math, llmLearning];

/** 원본 카테고리 — 어드민에서 편집 단위로 쓰는 raw 데이터 */
export const allCategories: CategoryRoot[] = [middleSchool, highSchool, llmMath, llmLearning];

/** basePath로 책 찾기 (라우팅용) */
export function getBookByPath(basePath: string): CategoryRoot | undefined {
  return allBooks.find((c) => c.basePath === basePath);
}

/** basePath로 카테고리 찾기 (어드민) */
export function getCategoryByPath(basePath: string): CategoryRoot | undefined {
  return allCategories.find((c) => c.basePath === basePath);
}
