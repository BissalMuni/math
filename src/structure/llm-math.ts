import data from "./data/llm-math.json";
import type { CategoryRoot } from "./types";

/** LLM 수학 개념 트리 (콘텐츠 라우팅용) */
export const llmConceptTree = data as CategoryRoot;

/** LLM 수학 사이드바 네비게이션 — 개념 트리 그대로 사용 */
export const llmMath: CategoryRoot = {
  id: "llm",
  basePath: "llm",
  title: "LLM수학",
  description: "LLM에 쓰이는 수학 개념",
  children: llmConceptTree.children,
};
