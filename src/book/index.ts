export { middleSchool } from "./middle-school";
export { highSchool } from "./high-school";
export { llmMath } from "./llm-math";
export { llmLearning } from "./llm-learning";
export type { TreeNode, Book } from "./types";
export { isLeafNode, findNodePath, findNodeBySlugs } from "./types";

import { middleSchool } from "./middle-school";
import { highSchool } from "./high-school";
import { llmMath } from "./llm-math";
import { llmLearning } from "./llm-learning";
import type { Book } from "./types";

/** 모든 책 — 4개 독립 책 (basket으로 묶어 사이드바 그룹) */
export const allBooks: Book[] = [middleSchool, highSchool, llmMath, llmLearning];

/** basePath로 책 찾기 */
export function getBookByPath(basePath: string): Book | undefined {
  return allBooks.find((b) => b.basePath === basePath);
}
