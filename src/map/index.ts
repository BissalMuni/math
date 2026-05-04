import { type ComponentType, lazy } from "react";

/** 콘텐츠 컴포넌트 레지스트리 (topicId → lazy 컴포넌트) */
const registry: Record<string, () => Promise<{ default: ComponentType }>> = {
  // 중1 > 소인수분해
  "m1-t1": () => import("@/content/middle/grade1/prime-factorization-concept"),
  "m1-t2": () => import("@/content/middle/grade1/gcd-lcm"),

  // ── LLM 수학 > 분야별 (leaf 합치기 후 — 1 leaf = 1 file) ────────────────
  "llm-f-la":   () => import("@/content/llm/fields/linear-algebra"),
  "llm-f-calc": () => import("@/content/llm/fields/calculus"),
  "llm-f-prob": () => import("@/content/llm/fields/probability"),
  "llm-f-info": () => import("@/content/llm/fields/information-theory"),
  "llm-f-opt":  () => import("@/content/llm/fields/optimization"),
  "llm-f-num":  () => import("@/content/llm/fields/numerical-methods"),

  // ── LLM 수학 > 파이프라인 절차별 (leaf 합치기 후 — 1 leaf = 1 file) ─────
  "llm-p-s1":  () => import("@/content/llm/pipeline/tokenization"),
  "llm-p-s2":  () => import("@/content/llm/pipeline/token-embedding"),
  "llm-p-s3":  () => import("@/content/llm/pipeline/positional-encoding"),
  "llm-p-s4":  () => import("@/content/llm/pipeline/layer-norm"),
  "llm-p-s5":  () => import("@/content/llm/pipeline/attention"),
  "llm-p-s7":  () => import("@/content/llm/pipeline/ffn"),                 // Residual + FFN 통합 (s6 통합)
  "llm-p-s9":  () => import("@/content/llm/pipeline/softmax-output"),      // LM Head + Softmax 통합 (s8 통합)
  "llm-p-s10": () => import("@/content/llm/pipeline/sampling"),
  "llm-p-s11": () => import("@/content/llm/pipeline/loss-function"),
  "llm-p-s12": () => import("@/content/llm/pipeline/backpropagation"),
  "llm-p-s13": () => import("@/content/llm/pipeline/optimizer"),
  "llm-p-s14": () => import("@/content/llm/pipeline/rlhf"),                // 양자화 콘텐츠는 별도 정리 필요

  // ── LLM 학습 (트랜스포머 완전 가이드) ─────────────────────────────────

  // 1. 토큰화
  "ll-ch1-1": () => import("@/content/llm-learn/ch1-tokenization"),
  "ll-ch1-2": () => import("@/content/llm-learn/ch1-tokenization"),
  "ll-ch1-3": () => import("@/content/llm-learn/ch1-tokenization"),
  "ll-ch1-4": () => import("@/content/llm-learn/ch1-tokenization"),

  // 2. 임베딩
  "ll-ch2-1": () => import("@/content/llm-learn/ch2-embedding"),
  "ll-ch2-2": () => import("@/content/llm-learn/ch2-embedding"),
  "ll-ch2-3": () => import("@/content/llm-learn/ch2-embedding"),
  "ll-ch2-4": () => import("@/content/llm-learn/ch2-embedding"),

  // 4. Q·K·V 어텐션 (핵심 — 실제 벡터 계산)
  "ll-ch4-1": () => import("@/content/llm-learn/ch4-qkv"),
  "ll-ch4-2": () => import("@/content/llm-learn/ch4-qkv"),
  "ll-ch4-3": () => import("@/content/llm-learn/ch4-qkv"),
  "ll-ch4-4": () => import("@/content/llm-learn/ch4-qkv"),
  "ll-ch4-5": () => import("@/content/llm-learn/ch4-qkv"),

  // 0. 서막
  "ll-p1": () => import("@/content/llm-learn/ch0-why-llm"),
  "ll-p2": () => import("@/content/llm-learn/ch0-neural-net"),
  "ll-p3": () => import("@/content/llm-learn/ch0-parameter"),
  "ll-p4": () => import("@/content/llm-learn/ch0-matrix-basic"),

  // 3. 위치 인코딩
  "ll-ch3-1": () => import("@/content/llm-learn/ch3-positional-encoding"),
  "ll-ch3-2": () => import("@/content/llm-learn/ch3-2-sin-cos"),
  "ll-ch3-3": () => import("@/content/llm-learn/ch3-3-add-to-embed"),

  // 5. Softmax
  "ll-ch5-1": () => import("@/content/llm-learn/ch5-softmax"),
  "ll-ch5-2": () => import("@/content/llm-learn/ch5-softmax"),
  "ll-ch5-3": () => import("@/content/llm-learn/ch5-softmax"),

  // 6. Multi-Head Attention
  "ll-ch6-1": () => import("@/content/llm-learn/ch6-multi-head"),
  "ll-ch6-2": () => import("@/content/llm-learn/ch6-multi-head"),
  "ll-ch6-3": () => import("@/content/llm-learn/ch6-multi-head"),
  "ll-ch6-4": () => import("@/content/llm-learn/ch6-multi-head"),
  "ll-ch6-5": () => import("@/content/llm-learn/ch6-multi-head"),

  // 7. 잔차 연결
  "ll-ch7-1": () => import("@/content/llm-learn/ch7-residual"),
  "ll-ch7-2": () => import("@/content/llm-learn/ch7-residual"),
  "ll-ch7-3": () => import("@/content/llm-learn/ch7-residual"),

  // 8. Layer Normalization
  "ll-ch8-1": () => import("@/content/llm-learn/ch8-layer-norm"),
  "ll-ch8-2": () => import("@/content/llm-learn/ch8-layer-norm"),
  "ll-ch8-3": () => import("@/content/llm-learn/ch8-layer-norm"),
  "ll-ch8-4": () => import("@/content/llm-learn/ch8-layer-norm"),

  // 9. Feed-Forward Network
  "ll-ch9-1": () => import("@/content/llm-learn/ch9-ffn"),
  "ll-ch9-2": () => import("@/content/llm-learn/ch9-ffn"),
  "ll-ch9-3": () => import("@/content/llm-learn/ch9-ffn"),

  // 10. Linear + Softmax (Output)
  "ll-ch10-1": () => import("@/content/llm-learn/ch10-output"),
  "ll-ch10-2": () => import("@/content/llm-learn/ch10-output"),
  "ll-ch10-3": () => import("@/content/llm-learn/ch10-output"),
  "ll-ch10-4": () => import("@/content/llm-learn/ch10-output"),

  // 11. 역전파 (Backpropagation)
  "ll-ch11-1": () => import("@/content/llm-learn/ch11-backprop"),
  "ll-ch11-2": () => import("@/content/llm-learn/ch11-backprop"),
  "ll-ch11-3": () => import("@/content/llm-learn/ch11-backprop"),
  "ll-ch11-4": () => import("@/content/llm-learn/ch11-backprop"),

  // 12. 학습 (ch11-backprop 임시 재사용)
  "ll-ch12-1": () => import("@/content/llm-learn/ch11-backprop"),
  "ll-ch12-2": () => import("@/content/llm-learn/ch11-backprop"),
  "ll-ch12-3": () => import("@/content/llm-learn/ch11-backprop"),
  "ll-ch12-4": () => import("@/content/llm-learn/ch11-backprop"),

  // 13. 인코더 vs 디코더
  "ll-ch13-1": () => import("@/content/llm-learn/ch13-enc-dec"),
  "ll-ch13-2": () => import("@/content/llm-learn/ch13-enc-dec"),
  "ll-ch13-3": () => import("@/content/llm-learn/ch13-enc-dec"),
};

/** topicId로 콘텐츠 컴포넌트 가져오기 (없으면 null) */
export function getContentComponent(topicId: string): ComponentType | null {
  const loader = registry[topicId];
  if (!loader) return null;
  return lazy(loader);
}
