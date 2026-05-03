"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";

export default function Pretraining() {
  return (
    <div className="space-y-8">
      <p className="text-muted">대규모 텍스트 코퍼스에서 다음 토큰 예측 목적으로 학습합니다.</p>

      <section>
        <h2 className="text-xl font-semibold mb-3">언어 모델 목적 함수</h2>
        <BlockMath math="\mathcal{L}_{\text{LM}} = -\sum_{t} \log P(x_t \mid x_1, \ldots, x_{t-1}; \theta)" />
        <p className="mt-2">이 목적으로 <InlineMath math="10^{11}" /> ~ <InlineMath math="10^{13}" /> 토큰을 학습합니다.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">스케일링 법칙 (Scaling Laws)</h2>
        <p>모델 크기(N), 데이터(D), 컴퓨팅(C)과 손실의 관계:</p>
        <BlockMath math="L(N, D) \approx \frac{A}{N^\alpha} + \frac{B}{D^\beta} + L_\infty" />
        <div className="mt-3 rounded-lg bg-accent-light p-3 text-sm">
          <strong>Chinchilla 법칙:</strong> 최적 N과 D의 비율은 약 20:1 (토큰:파라미터)
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Emergent Abilities</h2>
        <p>모델 규모가 임계점을 넘으면 갑자기 새로운 능력이 출현합니다 (Chain-of-thought, few-shot 등). 수학적으로 상전이(Phase Transition) 현상입니다.</p>
      </section>
    </div>
  );
}
