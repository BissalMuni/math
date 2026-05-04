import type { CategoryRoot } from "./types";

/** LLM 수학 개념 트리 (콘텐츠 라우팅용) */
export const llmConceptTree: CategoryRoot = {
  id: "llm-concepts",
  basePath: "llm",
  title: "LLM 수학",
  description: "LLM에 쓰이는 수학 개념 (분야별 + 파이프라인 절차별)",
  children: [
    // ── 분야별 (각 항목이 곧 leaf) ──
    {
      id: "llm-fields",
      slug: "fields",
      title: "수학 분야별",
      children: [
        { id: "llm-f-la",   slug: "linear-algebra",     title: "1. 선형대수" },
        { id: "llm-f-calc", slug: "calculus",           title: "2. 미적분" },
        { id: "llm-f-prob", slug: "probability",        title: "3. 확률과 통계" },
        { id: "llm-f-info", slug: "information-theory", title: "4. 정보이론" },
        { id: "llm-f-opt",  slug: "optimization",       title: "5. 최적화" },
        { id: "llm-f-num",  slug: "numerical-methods",  title: "6. 수치해석" },
      ],
    },

    // ── 파이프라인 절차별 (각 항목이 곧 leaf) ──
    {
      id: "llm-pipeline",
      slug: "pipeline",
      title: "LLM 처리 절차별",
      children: [
        { id: "llm-p-s1",  slug: "tokenization",        title: "① 토큰화 (Tokenization)" },
        { id: "llm-p-s2",  slug: "token-embedding",     title: "② 토큰 임베딩 (Token Embedding)" },
        { id: "llm-p-s3",  slug: "positional-encoding", title: "③ 위치 인코딩 (Positional Encoding)" },
        { id: "llm-p-s4",  slug: "layer-norm",          title: "④-a. Layer Normalization" },
        { id: "llm-p-s5",  slug: "attention",           title: "④-b. Multi-Head Self-Attention" },
        { id: "llm-p-s7",  slug: "ffn",                 title: "④-c~f. Residual Connection + FFN" },
        { id: "llm-p-s9",  slug: "softmax-output",      title: "⑥⑦ LM Head + Softmax" },
        { id: "llm-p-s10", slug: "sampling",            title: "⑧ 샘플링 / 디코딩" },
        { id: "llm-p-s11", slug: "loss-function",       title: "⑨ 손실 함수 (Cross-Entropy Loss)" },
        { id: "llm-p-s12", slug: "backpropagation",     title: "⑩ 역전파 (Backpropagation)" },
        { id: "llm-p-s13", slug: "optimizer",           title: "⑪ 옵티마이저 (Adam/AdamW)" },
        { id: "llm-p-s14", slug: "rlhf-lora",           title: "⑬⑭ RLHF / LoRA / 양자화" },
      ],
    },
  ],
};

/** LLM 수학 사이드바 네비게이션 — 개념 트리 그대로 사용 */
export const llmMath: CategoryRoot = {
  id: "llm",
  basePath: "llm",
  title: "LLM 수학",
  description: "LLM에 쓰이는 수학 개념",
  children: llmConceptTree.children,
};
