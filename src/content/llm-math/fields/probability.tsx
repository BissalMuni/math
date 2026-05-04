"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox } from "@/components/content/shared";

export default function Probability() {
  return (
    <div className="space-y-8">
      <CalcBox title="조건부 확률 (Conditional Probability)">
        <p>LLM의 근본 원리입니다. 이전 토큰들이 주어졌을 때 다음 토큰의 확률을 모델링합니다.</p>
        <BlockMath math="P(A|B) = \frac{P(A \cap B)}{P(B)}" />
        <p className="mt-2">LLM에서의 적용:</p>
        <BlockMath math="P(x_t \mid x_1, \ldots, x_{t-1})" />
        <p className="mt-2 text-sm text-muted">교육과정: 고등학교 확률과 통계</p>
      </CalcBox>

      <CalcBox title="결합 확률 (Joint Probability)">
        <p>전체 문장의 확률을 조건부 확률의 곱으로 분해합니다.</p>
        <BlockMath math="P(x_1, \ldots, x_n) = \prod_{t=1}^{n} P(x_t \mid x_1, \ldots, x_{t-1})" />
        <p className="mt-2 text-sm text-muted">교육과정: 고등학교 확률과 통계</p>
      </CalcBox>

      <CalcBox title="베이즈 정리 (Bayes' Theorem)">
        <p>RLHF에서 보상 모델의 이론적 기반입니다. 베이지안 관점에서의 모델 학습 해석에 사용됩니다.</p>
        <BlockMath math="P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}" />
        <p className="mt-2 text-sm text-muted">교육과정: 고등학교 확률과 통계 / 대학교</p>
      </CalcBox>

      <CalcBox title="기대값 (Expected Value)">
        <p>손실 함수가 기대 손실의 추정입니다. RLHF에서 보상의 기대값을 최대화합니다.</p>
        <BlockMath math="E[X] = \sum_i x_i P(x_i)" />
        <p className="mt-2 text-sm text-muted">교육과정: 고등학교 확률과 통계</p>
      </CalcBox>

      <CalcBox title="분산/표준편차 (Variance/Standard Deviation)">
        <p>Layer Normalization에서 출력의 분산을 1로 정규화합니다.</p>
        <BlockMath math="\text{Var}(X) = E[(X - \mu)^2]" />
        <BlockMath math="\sigma = \sqrt{\text{Var}(X)}" />
        <p className="mt-2 text-sm text-muted">교육과정: 고등학교 확률과 통계</p>
      </CalcBox>

      <CalcBox title="정규 분포 (Normal Distribution)">
        <p>가중치 초기화(Xavier, He)에 사용됩니다. GELU 활성화 함수가 가우시안 CDF 기반입니다.</p>
        <BlockMath math="f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}" />
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 확률과 통계</p>
      </CalcBox>

      <CalcBox title="최대 우도 추정 (MLE)">
        <p>사전 학습의 목적 함수입니다. 다음 토큰 예측의 로그 우도 최대화 = Cross-Entropy Loss 최소화와 동치입니다.</p>
        <BlockMath math="\hat{\theta} = \arg\max_\theta \sum_t \log P(x_t \mid x_1, \ldots, x_{t-1}; \theta)" />
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 수리통계학</p>
      </CalcBox>

      <CalcBox title="샘플링 (Sampling)">
        <p>텍스트 생성 시 확률 분포에서 다음 토큰을 샘플링합니다. Temperature로 분포 날카로움을 제어합니다.</p>
        <BlockMath math="P(x_i) = \frac{e^{x_i / T}}{\sum_j e^{x_j / T}}" />
        <p className="text-sm text-muted">T↓ → 결정적, T↑ → 무작위</p>
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 확률과 통계</p>
      </CalcBox>
    </div>
  );
}
