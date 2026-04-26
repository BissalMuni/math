"use client";

import { InlineMath, BlockMath } from "@/components/math-formula";

export default function LossFunction() {
  return (
    <div className="space-y-8">
      <p className="text-muted">모델 예측과 정답의 차이를 수치화합니다. 이 값을 최소화하는 방향으로 학습합니다.</p>

      <section>
        <h2 className="text-xl font-semibold mb-3">Cross-Entropy Loss — 사전 학습</h2>
        <p>다음 토큰 예측의 표준 손실 함수입니다:</p>
        <BlockMath math="L = -\frac{1}{T} \sum_{t=1}^{T} \log P(x_t \mid x_1, \ldots, x_{t-1})" />
        <div className="mt-3 rounded-lg bg-accent-light p-3 text-sm">
          <strong>MLE와 동치:</strong> Cross-Entropy 최소화 = 로그 우도 최대화
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Perplexity — 성능 지표</h2>
        <BlockMath math="\text{PPL} = e^L = e^{-\frac{1}{T}\sum \log P(x_t \mid x_{<t})}" />
        <p className="text-sm text-muted">PPL 10 = 평균적으로 10개 중 1개를 확신하는 수준</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Label Smoothing</h2>
        <p>과적합 방지를 위해 정답 레이블을 부드럽게 처리합니다:</p>
        <BlockMath math="y_{\text{smooth}} = (1-\epsilon) \cdot y + \epsilon / V" />
        <p className="text-sm text-muted">ε: 스무딩 계수 (보통 0.1)</p>
      </section>
    </div>
  );
}
