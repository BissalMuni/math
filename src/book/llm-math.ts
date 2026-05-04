import data from "./data/llm-math.json";
import type { Book } from "./types";

/** LLM 수학 — LLM에 쓰이는 수학 개념 (분야별 + 파이프라인) */
export const llmMath = data as Book;

/** @deprecated `llmMath`로 통합. 외부 참조 호환용. */
export const llmConceptTree = llmMath;
