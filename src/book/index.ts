export { middleSchool } from "./middle-school";
export { highSchool } from "./high-school";
export { llmMath } from "./llm-math";
export { llmLearning } from "./llm-learning";
export { aiResearch } from "./ai-research";
export { aiMemory } from "./ai-memory";
export { aiDatacenter } from "./ai-datacenter";
export { wirelessComm } from "./wireless-comm";
export { saasArchitecture } from "./saas-architecture";
export { bash } from "./bash";
export { powershell } from "./powershell";
export { python } from "./python";
export { autohotkey } from "./autohotkey";
export type { TreeNode, Book } from "./types";
export { isLeafNode, findNodePath, findNodeBySlugs, getFirstLeafPath } from "./types";

import { middleSchool } from "./middle-school";
import { highSchool } from "./high-school";
import { llmMath } from "./llm-math";
import { llmLearning } from "./llm-learning";
import { aiResearch } from "./ai-research";
import { aiMemory } from "./ai-memory";
import { aiDatacenter } from "./ai-datacenter";
import { wirelessComm } from "./wireless-comm";
import { saasArchitecture } from "./saas-architecture";
import { bash } from "./bash";
import { powershell } from "./powershell";
import { python } from "./python";
import { autohotkey } from "./autohotkey";
import type { Book } from "./types";

/** 모든 책 — 13개 독립 책 (basket으로 묶어 사이드바 그룹) */
export const allBooks: Book[] = [middleSchool, highSchool, llmMath, llmLearning, aiResearch, aiMemory, aiDatacenter, wirelessComm, saasArchitecture, bash, powershell, python, autohotkey];

/** basePath로 책 찾기 */
export function getBookByPath(basePath: string): Book | undefined {
  return allBooks.find((b) => b.basePath === basePath);
}
