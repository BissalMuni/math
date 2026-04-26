import type { CategoryRoot, TreeNode } from "./types";
import { llmConcepts, llmCurriculumGroups } from "./llm-concepts";

/** LLM 수학 개념 트리 (콘텐츠 라우팅용) */
export const llmConceptTree: CategoryRoot = {
  id: "llm-concepts",
  basePath: "llm",
  title: "LLM 수학",
  description: "LLM에 쓰이는 수학 개념 (분야별 + 파이프라인 절차별)",
  children: [
    // ── 분야별 ──
    {
      id: "llm-fields",
      slug: "fields",
      title: "수학 분야별",
      children: [
        {
          id: "llm-f-la",
          slug: "linear-algebra",
          title: "1. 선형대수",
          children: [
            { id: "llm-f-la-t1", slug: "vector", title: "벡터 (Vector)" },
            { id: "llm-f-la-t2", slug: "matrix", title: "행렬 (Matrix)" },
            { id: "llm-f-la-t3", slug: "matrix-multiplication", title: "행렬 곱셈 (Matrix Multiplication)" },
            { id: "llm-f-la-t4", slug: "transpose", title: "전치 행렬 (Transpose)" },
            { id: "llm-f-la-t5", slug: "dot-product", title: "내적 (Dot Product)" },
            { id: "llm-f-la-t6", slug: "tensor", title: "텐서 (Tensor)" },
            { id: "llm-f-la-t7", slug: "eigenvalue", title: "고유값/고유벡터 (Eigenvalue/Eigenvector)" },
            { id: "llm-f-la-t8", slug: "svd", title: "특이값 분해 (SVD)" },
            { id: "llm-f-la-t9", slug: "cosine-similarity", title: "코사인 유사도 (Cosine Similarity)" },
            { id: "llm-f-la-t10", slug: "norm", title: "노름 (Norm)" },
          ],
        },
        {
          id: "llm-f-calc",
          slug: "calculus",
          title: "2. 미적분",
          children: [
            { id: "llm-f-calc-t1", slug: "partial-derivative", title: "편미분 (Partial Derivative)" },
            { id: "llm-f-calc-t2", slug: "chain-rule", title: "연쇄 법칙 (Chain Rule)" },
            { id: "llm-f-calc-t3", slug: "gradient", title: "그래디언트 (Gradient)" },
            { id: "llm-f-calc-t4", slug: "exponential", title: "지수 함수 (Exponential Function)" },
            { id: "llm-f-calc-t5", slug: "logarithm", title: "로그 함수 (Logarithm)" },
            { id: "llm-f-calc-t6", slug: "taylor-series", title: "테일러 급수 (Taylor Series)" },
          ],
        },
        {
          id: "llm-f-prob",
          slug: "probability",
          title: "3. 확률과 통계",
          children: [
            { id: "llm-f-prob-t1", slug: "conditional-probability", title: "조건부 확률 (Conditional Probability)" },
            { id: "llm-f-prob-t2", slug: "joint-probability", title: "결합 확률 (Joint Probability)" },
            { id: "llm-f-prob-t3", slug: "bayes-theorem", title: "베이즈 정리 (Bayes' Theorem)" },
            { id: "llm-f-prob-t4", slug: "expected-value", title: "기대값 (Expected Value)" },
            { id: "llm-f-prob-t5", slug: "variance", title: "분산/표준편차 (Variance/Std Dev)" },
            { id: "llm-f-prob-t6", slug: "normal-distribution", title: "정규 분포 (Normal Distribution)" },
            { id: "llm-f-prob-t7", slug: "mle", title: "최대 우도 추정 (MLE)" },
            { id: "llm-f-prob-t8", slug: "sampling", title: "샘플링 (Sampling)" },
          ],
        },
        {
          id: "llm-f-info",
          slug: "information-theory",
          title: "4. 정보이론",
          children: [
            { id: "llm-f-info-t1", slug: "entropy", title: "엔트로피 (Entropy)" },
            { id: "llm-f-info-t2", slug: "cross-entropy", title: "교차 엔트로피 (Cross-Entropy)" },
            { id: "llm-f-info-t3", slug: "kl-divergence", title: "KL 발산 (KL Divergence)" },
            { id: "llm-f-info-t4", slug: "perplexity", title: "퍼플렉시티 (Perplexity)" },
            { id: "llm-f-info-t5", slug: "mutual-information", title: "상호 정보량 (Mutual Information)" },
          ],
        },
        {
          id: "llm-f-opt",
          slug: "optimization",
          title: "5. 최적화",
          children: [
            { id: "llm-f-opt-t1", slug: "gradient-descent", title: "경사 하강법 (Gradient Descent)" },
            { id: "llm-f-opt-t2", slug: "sgd", title: "확률적 경사 하강법 (SGD)" },
            { id: "llm-f-opt-t3", slug: "adam", title: "Adam 옵티마이저 (Adam/AdamW)" },
            { id: "llm-f-opt-t4", slug: "lr-scheduling", title: "학습률 스케줄링 (LR Scheduling)" },
            { id: "llm-f-opt-t5", slug: "regularization", title: "정규화 (Regularization)" },
          ],
        },
        {
          id: "llm-f-num",
          slug: "numerical-methods",
          title: "6. 수치해석",
          children: [
            { id: "llm-f-num-t1", slug: "floating-point", title: "부동소수점 산술 (Floating Point)" },
            { id: "llm-f-num-t2", slug: "numerical-stability", title: "수치 안정성 (Numerical Stability)" },
            { id: "llm-f-num-t3", slug: "lora", title: "행렬 분해 / LoRA (Low-Rank Adaptation)" },
          ],
        },
      ],
    },

    // ── 파이프라인 절차별 ──
    {
      id: "llm-pipeline",
      slug: "pipeline",
      title: "LLM 처리 절차별",
      children: [
        {
          id: "llm-p-s1",
          slug: "tokenization",
          title: "① 토큰화 (Tokenization)",
          children: [
            { id: "llm-p-s1-t1", slug: "set-theory", title: "집합론 — 어휘집" },
            { id: "llm-p-s1-t2", slug: "frequency", title: "빈도/확률 — BPE 병합" },
            { id: "llm-p-s1-t3", slug: "combinatorics", title: "조합론 — 시퀀스 경우의 수" },
            { id: "llm-p-s1-t4", slug: "coding-theory", title: "정보이론 — 최적 부호화" },
          ],
        },
        {
          id: "llm-p-s2",
          slug: "token-embedding",
          title: "② 토큰 임베딩 (Token Embedding)",
          children: [
            { id: "llm-p-s2-t1", slug: "vector-space", title: "벡터/벡터 공간 — 임베딩" },
            { id: "llm-p-s2-t2", slug: "embedding-matrix", title: "행렬 — 임베딩 룩업" },
            { id: "llm-p-s2-t3", slug: "cosine-sim", title: "코사인 유사도 — 의미 유사도" },
          ],
        },
        {
          id: "llm-p-s3",
          slug: "positional-encoding",
          title: "③ 위치 인코딩 (Positional Encoding)",
          children: [
            { id: "llm-p-s3-t1", slug: "trig-functions", title: "삼각함수 — Sinusoidal PE" },
            { id: "llm-p-s3-t2", slug: "complex-numbers", title: "복소수/회전 행렬 — RoPE" },
            { id: "llm-p-s3-t3", slug: "vector-addition", title: "벡터 덧셈 — PE 합산" },
          ],
        },
        {
          id: "llm-p-s4",
          slug: "layer-norm",
          title: "④-a. Layer Normalization",
          children: [
            { id: "llm-p-s4-t1", slug: "mean-variance", title: "평균/분산 — 통계량 계산" },
            { id: "llm-p-s4-t2", slug: "normalization", title: "정규화 — LayerNorm/RMSNorm" },
          ],
        },
        {
          id: "llm-p-s5",
          slug: "attention",
          title: "④-b. Multi-Head Self-Attention",
          children: [
            { id: "llm-p-s5-t1", slug: "linear-projection", title: "선형 변환 — Q, K, V 투영" },
            { id: "llm-p-s5-t2", slug: "matrix-multiply", title: "행렬 곱셈/전치 — QKᵀ" },
            { id: "llm-p-s5-t3", slug: "scaling", title: "스케일링 — √dₖ 정규화" },
            { id: "llm-p-s5-t4", slug: "softmax", title: "Softmax — 확률 분포 변환" },
            { id: "llm-p-s5-t5", slug: "weighted-average", title: "가중 평균 — Attention 출력" },
          ],
        },
        {
          id: "llm-p-s6",
          slug: "residual-connection",
          title: "④-c/f. Residual Connection",
          children: [
            { id: "llm-p-s6-t1", slug: "vector-add", title: "벡터 덧셈 — 잔차 연결" },
            { id: "llm-p-s6-t2", slug: "identity-gradient", title: "항등 함수/편미분 — 그래디언트 보존" },
          ],
        },
        {
          id: "llm-p-s7",
          slug: "ffn",
          title: "④-e. Feed-Forward Network",
          children: [
            { id: "llm-p-s7-t1", slug: "linear-transform", title: "선형 변환 — 확장/축소" },
            { id: "llm-p-s7-t2", slug: "gelu", title: "GELU — 가우시안 CDF 활성화" },
            { id: "llm-p-s7-t3", slug: "swiglu", title: "SwiGLU — 게이트 활성화" },
          ],
        },
        {
          id: "llm-p-s8",
          slug: "lm-head",
          title: "⑥ 출력 선형 변환 (LM Head)",
          children: [
            { id: "llm-p-s8-t1", slug: "logits", title: "선형 변환/내적 — 로짓 계산" },
            { id: "llm-p-s8-t2", slug: "weight-tying", title: "전치 행렬 — Weight Tying" },
          ],
        },
        {
          id: "llm-p-s9",
          slug: "softmax-output",
          title: "⑦ Softmax → 확률 분포",
          children: [
            { id: "llm-p-s9-t1", slug: "softmax-prob", title: "Softmax — 확률 분포 변환" },
            { id: "llm-p-s9-t2", slug: "conditional-prob", title: "조건부 확률 — P(xₜ|x<ₜ)" },
          ],
        },
        {
          id: "llm-p-s10",
          slug: "sampling",
          title: "⑧ 샘플링 / 디코딩",
          children: [
            { id: "llm-p-s10-t1", slug: "temperature", title: "Temperature Scaling" },
            { id: "llm-p-s10-t2", slug: "top-k-p", title: "Top-k / Top-p 필터링" },
            { id: "llm-p-s10-t3", slug: "beam-search", title: "Beam Search — 로그 확률" },
          ],
        },
        {
          id: "llm-p-s11",
          slug: "loss-function",
          title: "⑨ 손실 함수 (Cross-Entropy Loss)",
          children: [
            { id: "llm-p-s11-t1", slug: "cross-entropy-loss", title: "교차 엔트로피 — 손실 계산" },
            { id: "llm-p-s11-t2", slug: "mle-equiv", title: "MLE — 로그 우도 최대화" },
            { id: "llm-p-s11-t3", slug: "perplexity-metric", title: "퍼플렉시티 — 성능 지표" },
          ],
        },
        {
          id: "llm-p-s12",
          slug: "backpropagation",
          title: "⑩ 역전파 (Backpropagation)",
          children: [
            { id: "llm-p-s12-t1", slug: "chain-rule-bp", title: "연쇄 법칙 — 레이어별 미분" },
            { id: "llm-p-s12-t2", slug: "gradient-bp", title: "그래디언트 — 파라미터 편미분" },
            { id: "llm-p-s12-t3", slug: "gradient-clipping", title: "그래디언트 클리핑 — 폭발 방지" },
          ],
        },
        {
          id: "llm-p-s13",
          slug: "optimizer",
          title: "⑪ 옵티마이저 (Adam/AdamW)",
          children: [
            { id: "llm-p-s13-t1", slug: "gd", title: "경사 하강법 — 기본 원리" },
            { id: "llm-p-s13-t2", slug: "momentum", title: "모멘트 — 지수 이동 평균" },
            { id: "llm-p-s13-t3", slug: "adaptive-lr", title: "적응적 학습률 — Adam 업데이트" },
            { id: "llm-p-s13-t4", slug: "weight-decay", title: "가중치 감쇠 — AdamW" },
          ],
        },
        {
          id: "llm-p-s14",
          slug: "rlhf-lora",
          title: "⑬⑭ RLHF / LoRA / 양자화",
          children: [
            { id: "llm-p-s14-t1", slug: "kl-penalty", title: "KL 발산 — 모델 발산 제약" },
            { id: "llm-p-s14-t2", slug: "reward-expectation", title: "기대값 — 보상 최대화" },
            { id: "llm-p-s14-t3", slug: "low-rank", title: "저랭크 근사 — LoRA" },
            { id: "llm-p-s14-t4", slug: "quantization", title: "양자화 — INT8/INT4 변환" },
          ],
        },
      ],
    },
  ],
};

/** 교육과정 레벨 → URL 슬러그 변환 */
function lvlSlug(level: string) {
  return level.replace(/\s+/g, "-");
}

/** 교육과정별 서브트리 (llmConcepts 단일 소스 기반) */
const curriculumBranch: TreeNode = {
  id: "llm-curriculum",
  slug: "by-curriculum",
  title: "교육과정별",
  children: llmCurriculumGroups.map((group) => ({
    id: `llm-c-${group.label}`,
    slug: group.label === "고등학교" ? "high-school" : "university",
    title: group.label,
    children: group.levels
      .map((level): TreeNode | null => {
        const concepts = llmConcepts.filter((c) => c.curriculum === level);
        if (!concepts.length) return null;
        return {
          id: `llm-c-${lvlSlug(level)}`,
          slug: lvlSlug(level),
          title: level,
          children: concepts.map((c) => ({ id: c.id, slug: c.slug, title: c.title })),
        };
      })
      .filter((n): n is TreeNode => n !== null),
  })),
};

// llmConceptTree에 교육과정별 브랜치 추가
llmConceptTree.children.push(curriculumBranch);

/** LLM 수학 사이드바 네비게이션 — 개념 트리 그대로 사용 */
export const llmMath: CategoryRoot = {
  id: "llm",
  basePath: "llm",
  title: "LLM 수학",
  description: "LLM에 쓰이는 수학 개념",
  children: llmConceptTree.children,
};
