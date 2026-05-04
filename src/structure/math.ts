import { middleSchool } from "./middle-school";
import { highSchool } from "./high-school";
import { llmConceptTree } from "./llm-math";
import type { CategoryRoot, TreeNode } from "./types";

/** 중등수학 — 수학 책 하위 노드 */
const middleAsNode: TreeNode = {
  id: middleSchool.id,
  slug: "middle",
  title: "중등수학",
  children: middleSchool.children,
};

/** 고등수학 — 수학 책 하위 노드 */
const highAsNode: TreeNode = {
  id: highSchool.id,
  slug: "high",
  title: "고등수학",
  children: highSchool.children,
};

/** LLM 수학 — 수학 책 하위 노드 */
const llmMathAsNode: TreeNode = {
  id: llmConceptTree.id,
  slug: "llm-math",
  title: "LLM수학",
  children: llmConceptTree.children,
};

/** 수학 책 — 중등/고등/LLM수학을 묶은 최상위 카테고리 */
export const math: CategoryRoot = {
  id: "math",
  basePath: "math",
  title: "수학",
  description: "중·고등 수학과 LLM 수학을 한 곳에서 학습합니다.",
  children: [middleAsNode, highAsNode, llmMathAsNode],
};
