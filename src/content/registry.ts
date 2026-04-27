import { type ComponentType, lazy } from "react";

/** 콘텐츠 컴포넌트 레지스트리 (topicId → lazy 컴포넌트) */
const registry: Record<string, () => Promise<{ default: ComponentType }>> = {
  // 중1 > 소인수분해
  "m1-t1": () => import("./middle/grade1/prime-factorization-concept"),
  "m1-t2": () => import("./middle/grade1/gcd-lcm"),

  // ── LLM 수학 > 분야별 ──────────────────────────────────────────────────

  // 1. 선형대수 (10개)
  "llm-f-la-t1": () => import("./llm/fields/linear-algebra"),
  "llm-f-la-t2": () => import("./llm/fields/linear-algebra"),
  "llm-f-la-t3": () => import("./llm/fields/linear-algebra"),
  "llm-f-la-t4": () => import("./llm/fields/linear-algebra"),
  "llm-f-la-t5": () => import("./llm/fields/linear-algebra"),
  "llm-f-la-t6": () => import("./llm/fields/linear-algebra"),
  "llm-f-la-t7": () => import("./llm/fields/linear-algebra"),
  "llm-f-la-t8": () => import("./llm/fields/linear-algebra"),
  "llm-f-la-t9": () => import("./llm/fields/linear-algebra"),
  "llm-f-la-t10": () => import("./llm/fields/linear-algebra"),

  // 2. 미적분 (6개)
  "llm-f-calc-t1": () => import("./llm/fields/calculus"),
  "llm-f-calc-t2": () => import("./llm/fields/calculus"),
  "llm-f-calc-t3": () => import("./llm/fields/calculus"),
  "llm-f-calc-t4": () => import("./llm/fields/calculus"),
  "llm-f-calc-t5": () => import("./llm/fields/calculus"),
  "llm-f-calc-t6": () => import("./llm/fields/calculus"),

  // 3. 확률과 통계 (8개)
  "llm-f-prob-t1": () => import("./llm/fields/probability"),
  "llm-f-prob-t2": () => import("./llm/fields/probability"),
  "llm-f-prob-t3": () => import("./llm/fields/probability"),
  "llm-f-prob-t4": () => import("./llm/fields/probability"),
  "llm-f-prob-t5": () => import("./llm/fields/probability"),
  "llm-f-prob-t6": () => import("./llm/fields/probability"),
  "llm-f-prob-t7": () => import("./llm/fields/probability"),
  "llm-f-prob-t8": () => import("./llm/fields/probability"),

  // 4. 정보이론 (5개)
  "llm-f-info-t1": () => import("./llm/fields/information-theory"),
  "llm-f-info-t2": () => import("./llm/fields/information-theory"),
  "llm-f-info-t3": () => import("./llm/fields/information-theory"),
  "llm-f-info-t4": () => import("./llm/fields/information-theory"),
  "llm-f-info-t5": () => import("./llm/fields/information-theory"),

  // 5. 최적화 (5개)
  "llm-f-opt-t1": () => import("./llm/fields/optimization"),
  "llm-f-opt-t2": () => import("./llm/fields/optimization"),
  "llm-f-opt-t3": () => import("./llm/fields/optimization"),
  "llm-f-opt-t4": () => import("./llm/fields/optimization"),
  "llm-f-opt-t5": () => import("./llm/fields/optimization"),

  // 6. 수치해석 (3개)
  "llm-f-num-t1": () => import("./llm/fields/numerical-methods"),
  "llm-f-num-t2": () => import("./llm/fields/numerical-methods"),
  "llm-f-num-t3": () => import("./llm/fields/numerical-methods"),

  // ── LLM 수학 > 파이프라인 절차별 ───────────────────────────────────────

  // ① 토큰화 (4개)
  "llm-p-s1-t1": () => import("./llm/pipeline/tokenization"),
  "llm-p-s1-t2": () => import("./llm/pipeline/tokenization"),
  "llm-p-s1-t3": () => import("./llm/pipeline/tokenization"),
  "llm-p-s1-t4": () => import("./llm/pipeline/tokenization"),

  // ② 토큰 임베딩 (3개)
  "llm-p-s2-t1": () => import("./llm/pipeline/token-embedding"),
  "llm-p-s2-t2": () => import("./llm/pipeline/token-embedding"),
  "llm-p-s2-t3": () => import("./llm/pipeline/token-embedding"),

  // ③ 위치 인코딩 (3개)
  "llm-p-s3-t1": () => import("./llm/pipeline/positional-encoding"),
  "llm-p-s3-t2": () => import("./llm/pipeline/positional-encoding"),
  "llm-p-s3-t3": () => import("./llm/pipeline/positional-encoding"),

  // ④-a. Layer Normalization (2개)
  "llm-p-s4-t1": () => import("./llm/pipeline/layer-norm"),
  "llm-p-s4-t2": () => import("./llm/pipeline/layer-norm"),

  // ④-b. Multi-Head Self-Attention (5개)
  "llm-p-s5-t1": () => import("./llm/pipeline/attention"),
  "llm-p-s5-t2": () => import("./llm/pipeline/attention"),
  "llm-p-s5-t3": () => import("./llm/pipeline/attention"),
  "llm-p-s5-t4": () => import("./llm/pipeline/attention"),
  "llm-p-s5-t5": () => import("./llm/pipeline/attention"),

  // ④-c/f. Residual Connection (2개) — FFN 파일에 포함
  "llm-p-s6-t1": () => import("./llm/pipeline/ffn"),
  "llm-p-s6-t2": () => import("./llm/pipeline/ffn"),

  // ④-e. Feed-Forward Network (3개)
  "llm-p-s7-t1": () => import("./llm/pipeline/ffn"),
  "llm-p-s7-t2": () => import("./llm/pipeline/ffn"),
  "llm-p-s7-t3": () => import("./llm/pipeline/ffn"),

  // ⑥ 출력 선형 변환 LM Head (2개)
  "llm-p-s8-t1": () => import("./llm/pipeline/softmax-output"),
  "llm-p-s8-t2": () => import("./llm/pipeline/softmax-output"),

  // ⑦ Softmax → 확률 분포 (2개)
  "llm-p-s9-t1": () => import("./llm/pipeline/softmax-output"),
  "llm-p-s9-t2": () => import("./llm/pipeline/softmax-output"),

  // ⑧ 샘플링 / 디코딩 (3개)
  "llm-p-s10-t1": () => import("./llm/pipeline/sampling"),
  "llm-p-s10-t2": () => import("./llm/pipeline/sampling"),
  "llm-p-s10-t3": () => import("./llm/pipeline/sampling"),

  // ⑨ 손실 함수 (3개)
  "llm-p-s11-t1": () => import("./llm/pipeline/loss-function"),
  "llm-p-s11-t2": () => import("./llm/pipeline/loss-function"),
  "llm-p-s11-t3": () => import("./llm/pipeline/loss-function"),

  // ⑩ 역전파 (3개)
  "llm-p-s12-t1": () => import("./llm/pipeline/backpropagation"),
  "llm-p-s12-t2": () => import("./llm/pipeline/backpropagation"),
  "llm-p-s12-t3": () => import("./llm/pipeline/backpropagation"),

  // ⑪ 옵티마이저 (4개)
  "llm-p-s13-t1": () => import("./llm/pipeline/optimizer"),
  "llm-p-s13-t2": () => import("./llm/pipeline/optimizer"),
  "llm-p-s13-t3": () => import("./llm/pipeline/optimizer"),
  "llm-p-s13-t4": () => import("./llm/pipeline/optimizer"),

  // ⑬⑭ RLHF / LoRA / 양자화 (4개)
  "llm-p-s14-t1": () => import("./llm/pipeline/rlhf"),
  "llm-p-s14-t2": () => import("./llm/pipeline/rlhf"),
  "llm-p-s14-t3": () => import("./llm/pipeline/quantization"),
  "llm-p-s14-t4": () => import("./llm/pipeline/quantization"),

  // ── LLM 학습 (트랜스포머 완전 가이드) ─────────────────────────────────

  // 1. 토큰화
  "ll-ch1-1": () => import("./llm-learn/ch1-tokenization"),
  "ll-ch1-2": () => import("./llm-learn/ch1-tokenization"),
  "ll-ch1-3": () => import("./llm-learn/ch1-tokenization"),
  "ll-ch1-4": () => import("./llm-learn/ch1-tokenization"),

  // 2. 임베딩
  "ll-ch2-1": () => import("./llm-learn/ch2-embedding"),
  "ll-ch2-2": () => import("./llm-learn/ch2-embedding"),
  "ll-ch2-3": () => import("./llm-learn/ch2-embedding"),
  "ll-ch2-4": () => import("./llm-learn/ch2-embedding"),

  // 4. Q·K·V 어텐션 (핵심 — 실제 벡터 계산)
  "ll-ch4-1": () => import("./llm-learn/ch4-qkv"),
  "ll-ch4-2": () => import("./llm-learn/ch4-qkv"),
  "ll-ch4-3": () => import("./llm-learn/ch4-qkv"),
  "ll-ch4-4": () => import("./llm-learn/ch4-qkv"),
  "ll-ch4-5": () => import("./llm-learn/ch4-qkv"),
};

/** topicId로 콘텐츠 컴포넌트 가져오기 (없으면 null) */
export function getContentComponent(topicId: string): ComponentType | null {
  const loader = registry[topicId];
  if (!loader) return null;
  return lazy(loader);
}
