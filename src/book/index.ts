export { middleSchool } from "./middle-school";
export { highSchool } from "./high-school";
export { llmMath } from "./llm-math";
export { llmLearning } from "./llm-learning";
export { aiMemory } from "./ai-memory";
export { wirelessComm } from "./wireless-comm";
export { saasArchitecture } from "./saas-architecture";
export type { TreeNode, Book } from "./types";
export { isLeafNode, findNodePath, findNodeBySlugs, getFirstLeafPath } from "./types";

import { middleSchool } from "./middle-school";
import { highSchool } from "./high-school";
import { llmMath } from "./llm-math";
import { llmLearning } from "./llm-learning";
import { aiMemory } from "./ai-memory";
import { wirelessComm } from "./wireless-comm";
import { saasArchitecture } from "./saas-architecture";
import type { Book } from "./types";

/** 모든 책 — 7개 독립 책 (basket으로 묶어 사이드바 그룹) */
export const allBooks: Book[] = [middleSchool, highSchool, llmMath, llmLearning, aiMemory, wirelessComm, saasArchitecture];

/** basePath로 책 찾기 */
export function getBookByPath(basePath: string): Book | undefined {
  return allBooks.find((b) => b.basePath === basePath);
}
