export { middleSchool } from "./middle-school";
export { highSchool } from "./high-school";
export { llmMath, llmConceptTree } from "./llm-math";
export { llmLearning } from "./llm-learning";
export type { TreeNode, CategoryRoot } from "./types";
export { isLeafNode, findNodePath, findNodeBySlugs } from "./types";

import { middleSchool } from "./middle-school";
import { highSchool } from "./high-school";
import { llmMath } from "./llm-math";
import { llmLearning } from "./llm-learning";
import type { CategoryRoot } from "./types";

/** 모든 카테고리 */
export const allCategories: CategoryRoot[] = [middleSchool, highSchool, llmMath, llmLearning];

/** basePath로 카테고리 찾기 */
export function getCategoryByPath(basePath: string): CategoryRoot | undefined {
  return allCategories.find((c) => c.basePath === basePath);
}
