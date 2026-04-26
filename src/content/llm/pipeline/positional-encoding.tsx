"use client";

import { InlineMath, BlockMath } from "@/components/math-formula";

export default function PositionalEncoding() {
  return (
    <div className="space-y-8">
      <p className="text-muted">토큰의 순서 정보를 벡터에 주입합니다. Sinusoidal PE 또는 RoPE를 사용합니다.</p>

      <section>
        <h2 className="text-xl font-semibold mb-3">삼각함수 — Sinusoidal PE</h2>
        <BlockMath math="PE(\text{pos}, 2i) = \sin\left(\frac{\text{pos}}{10000^{2i/d}}\right)" />
        <BlockMath math="PE(\text{pos}, 2i+1) = \cos\left(\frac{\text{pos}}{10000^{2i/d}}\right)" />
        <p className="mt-2">sin/cos의 주기성으로 상대적 위치 관계를 표현합니다.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">복소수/회전 행렬 — RoPE</h2>
        <p>RoPE(Rotary Position Embedding): 위치를 복소수 평면의 회전으로 표현합니다.</p>
        <BlockMath math="e^{i\theta} = \cos\theta + i\sin\theta" />
        <p className="mt-2">2차원 회전 행렬을 벡터 쌍마다 적용:</p>
        <BlockMath math="R(\theta) = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">벡터 덧셈 — PE 합산</h2>
        <p>Sinusoidal PE에서 임베딩에 위치 벡터를 더합니다:</p>
        <BlockMath math="\mathbf{x}' = \mathbf{x} + PE(\text{pos})" />
      </section>
    </div>
  );
}
