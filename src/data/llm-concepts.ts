/** LLM 수학 개념 단일 소스 — 분야별/절차별/교육과정별 뷰의 공통 데이터 */
export interface LlmConcept {
  /** 콘텐츠 레지스트리 ID (registry.ts와 일치) */
  id: string;
  /** URL 슬러그 */
  slug: string;
  /** 개념 이름 */
  title: string;
  /** 수학 분야 */
  field: string;
  /** 관련 LLM 처리 단계 */
  pipelines: string[];
  /** 교육과정 수준 */
  curriculum: string;
}

export const llmConcepts: LlmConcept[] = [
  // ── 선형대수 ────────────────────────────────────────────────────────────
  { id: "llm-f-la-t1",  slug: "vector",              title: "벡터 (Vector)",                    field: "선형대수",   pipelines: ["토큰 임베딩", "Attention"],          curriculum: "고등학교 기하" },
  { id: "llm-f-la-t2",  slug: "matrix",              title: "행렬 (Matrix)",                    field: "선형대수",   pipelines: ["전체 레이어 가중치"],               curriculum: "대학교 선형대수학" },
  { id: "llm-f-la-t3",  slug: "matrix-multiplication",title: "행렬 곱셈",                       field: "선형대수",   pipelines: ["Attention (QKᵀ)", "FFN"],           curriculum: "대학교 선형대수학" },
  { id: "llm-f-la-t4",  slug: "transpose",           title: "전치 행렬 (Transpose)",             field: "선형대수",   pipelines: ["Attention (QKᵀ)"],                  curriculum: "대학교 선형대수학" },
  { id: "llm-f-la-t5",  slug: "dot-product",         title: "내적 (Dot Product)",                field: "선형대수",   pipelines: ["Attention"],                        curriculum: "고등학교 기하" },
  { id: "llm-f-la-t6",  slug: "tensor",              title: "텐서 (Tensor)",                    field: "선형대수",   pipelines: ["전체 레이어"],                      curriculum: "대학교 선형대수학" },
  { id: "llm-f-la-t7",  slug: "eigenvalue",          title: "고유값/고유벡터",                   field: "선형대수",   pipelines: ["LoRA", "양자화"],                   curriculum: "대학교 선형대수학" },
  { id: "llm-f-la-t8",  slug: "svd",                 title: "특이값 분해 (SVD)",                 field: "선형대수",   pipelines: ["LoRA"],                             curriculum: "대학교 선형대수학" },
  { id: "llm-f-la-t9",  slug: "cosine-similarity",   title: "코사인 유사도",                     field: "선형대수",   pipelines: ["토큰 임베딩"],                      curriculum: "대학교 선형대수학" },
  { id: "llm-f-la-t10", slug: "norm",                title: "노름 (Norm)",                      field: "선형대수",   pipelines: ["Layer Normalization", "역전파"],    curriculum: "대학교 선형대수학" },

  // ── 미적분 ────────────────────────────────────────────────────────────
  { id: "llm-f-calc-t1", slug: "partial-derivative", title: "편미분 (Partial Derivative)",       field: "미적분",     pipelines: ["역전파"],                           curriculum: "대학교 미적분학" },
  { id: "llm-f-calc-t2", slug: "chain-rule",         title: "연쇄 법칙 (Chain Rule)",            field: "미적분",     pipelines: ["역전파"],                           curriculum: "고등학교 미적분Ⅱ" },
  { id: "llm-f-calc-t3", slug: "gradient",           title: "그래디언트 (Gradient)",             field: "미적분",     pipelines: ["역전파", "옵티마이저"],             curriculum: "대학교 미적분학" },
  { id: "llm-f-calc-t4", slug: "exponential",        title: "지수 함수",                         field: "미적분",     pipelines: ["Softmax", "활성화 함수"],           curriculum: "고등학교 대수" },
  { id: "llm-f-calc-t5", slug: "logarithm",          title: "로그 함수",                         field: "미적분",     pipelines: ["손실 함수", "Softmax"],             curriculum: "고등학교 대수" },
  { id: "llm-f-calc-t6", slug: "taylor-series",      title: "테일러 급수",                       field: "미적분",     pipelines: ["활성화 함수 근사"],                 curriculum: "대학교 미적분학" },

  // ── 확률과 통계 ──────────────────────────────────────────────────────
  { id: "llm-f-prob-t1", slug: "conditional-probability", title: "조건부 확률",                  field: "확률과 통계", pipelines: ["언어 모델링 (다음 토큰 예측)"],    curriculum: "고등학교 확률과통계" },
  { id: "llm-f-prob-t2", slug: "joint-probability",  title: "결합 확률",                         field: "확률과 통계", pipelines: ["언어 모델링"],                      curriculum: "고등학교 확률과통계" },
  { id: "llm-f-prob-t3", slug: "bayes-theorem",      title: "베이즈 정리",                       field: "확률과 통계", pipelines: ["RLHF"],                             curriculum: "고등학교 확률과통계" },
  { id: "llm-f-prob-t4", slug: "expected-value",     title: "기대값 (Expected Value)",           field: "확률과 통계", pipelines: ["RLHF", "손실 함수"],               curriculum: "고등학교 확률과통계" },
  { id: "llm-f-prob-t5", slug: "variance",           title: "분산/표준편차",                     field: "확률과 통계", pipelines: ["Layer Normalization"],              curriculum: "고등학교 확률과통계" },
  { id: "llm-f-prob-t6", slug: "normal-distribution",title: "정규 분포",                         field: "확률과 통계", pipelines: ["가중치 초기화"],                    curriculum: "대학교 확률통계" },
  { id: "llm-f-prob-t7", slug: "mle",                title: "최대 우도 추정 (MLE)",              field: "확률과 통계", pipelines: ["사전 학습"],                        curriculum: "대학교 수리통계학" },
  { id: "llm-f-prob-t8", slug: "sampling",           title: "샘플링 (Sampling)",                 field: "확률과 통계", pipelines: ["디코딩 / 샘플링"],                  curriculum: "대학교 확률통계" },

  // ── 정보이론 ─────────────────────────────────────────────────────────
  { id: "llm-f-info-t1", slug: "entropy",            title: "엔트로피 (Entropy)",                field: "정보이론",   pipelines: ["손실 함수"],                        curriculum: "대학교 정보이론" },
  { id: "llm-f-info-t2", slug: "cross-entropy",      title: "교차 엔트로피 (Cross-Entropy)",     field: "정보이론",   pipelines: ["손실 함수"],                        curriculum: "대학교 정보이론" },
  { id: "llm-f-info-t3", slug: "kl-divergence",      title: "KL 발산 (KL Divergence)",           field: "정보이론",   pipelines: ["RLHF", "파인튜닝"],                curriculum: "대학교 정보이론" },
  { id: "llm-f-info-t4", slug: "perplexity",         title: "퍼플렉시티 (Perplexity)",           field: "정보이론",   pipelines: ["모델 평가"],                        curriculum: "대학교 정보이론" },
  { id: "llm-f-info-t5", slug: "mutual-information", title: "상호 정보량",                       field: "정보이론",   pipelines: ["표현 학습"],                        curriculum: "대학교 정보이론" },

  // ── 최적화 ───────────────────────────────────────────────────────────
  { id: "llm-f-opt-t1",  slug: "gradient-descent",   title: "경사 하강법",                       field: "최적화",     pipelines: ["옵티마이저"],                       curriculum: "대학교 최적화이론" },
  { id: "llm-f-opt-t2",  slug: "sgd",                title: "확률적 경사 하강법 (SGD)",           field: "최적화",     pipelines: ["옵티마이저"],                       curriculum: "대학교 최적화이론" },
  { id: "llm-f-opt-t3",  slug: "adam",               title: "Adam / AdamW 옵티마이저",           field: "최적화",     pipelines: ["옵티마이저"],                       curriculum: "대학교 최적화이론" },
  { id: "llm-f-opt-t4",  slug: "lr-scheduling",      title: "학습률 스케줄링",                   field: "최적화",     pipelines: ["옵티마이저"],                       curriculum: "대학교 최적화이론" },
  { id: "llm-f-opt-t5",  slug: "regularization",     title: "정규화 (Regularization)",           field: "최적화",     pipelines: ["과적합 방지"],                      curriculum: "대학교 통계학" },

  // ── 수치해석 ─────────────────────────────────────────────────────────
  { id: "llm-f-num-t1",  slug: "floating-point",     title: "부동소수점 산술",                   field: "수치해석",   pipelines: ["양자화"],                           curriculum: "대학교 수치해석" },
  { id: "llm-f-num-t2",  slug: "numerical-stability",title: "수치 안정성",                       field: "수치해석",   pipelines: ["Softmax", "Layer Normalization"],   curriculum: "대학교 수치해석" },
  { id: "llm-f-num-t3",  slug: "lora",               title: "행렬 분해 / LoRA",                  field: "수치해석",   pipelines: ["파인튜닝", "LoRA"],                 curriculum: "대학교 수치해석" },
];

/** 분야 목록 (중복 제거, 순서 유지) */
export const llmFields = [...new Set(llmConcepts.map((c) => c.field))];

/** 절차 목록 (중복 제거, 순서 유지) */
export const llmPipelineStages = [
  "토큰화",
  "토큰 임베딩",
  "위치 인코딩",
  "Layer Normalization",
  "Attention",
  "FFN",
  "Softmax / 출력",
  "디코딩 / 샘플링",
  "언어 모델링 (다음 토큰 예측)",
  "손실 함수",
  "역전파",
  "옵티마이저",
  "사전 학습",
  "파인튜닝",
  "RLHF",
  "LoRA",
  "양자화",
  "모델 평가",
  "과적합 방지",
  "가중치 초기화",
  "표현 학습",
  "활성화 함수",
  "전체 레이어 가중치",
  "전체 레이어",
  "Attention (QKᵀ)",
  "활성화 함수 근사",
];

/** 교육과정 수준 목록 (순서 고정) */
export const llmCurriculumLevels = [
  "고등학교 기하",
  "고등학교 대수",
  "고등학교 미적분Ⅱ",
  "고등학교 확률과통계",
  "대학교 선형대수학",
  "대학교 미적분학",
  "대학교 확률통계",
  "대학교 수리통계학",
  "대학교 정보이론",
  "대학교 최적화이론",
  "대학교 통계학",
  "대학교 수치해석",
];

/** 교육과정 그룹 (고등학교 / 대학교) */
export const llmCurriculumGroups = [
  {
    label: "고등학교",
    levels: ["고등학교 기하", "고등학교 대수", "고등학교 미적분Ⅱ", "고등학교 확률과통계"],
  },
  {
    label: "대학교",
    levels: [
      "대학교 선형대수학",
      "대학교 미적분학",
      "대학교 확률통계",
      "대학교 수리통계학",
      "대학교 정보이론",
      "대학교 최적화이론",
      "대학교 통계학",
      "대학교 수치해석",
    ],
  },
];
