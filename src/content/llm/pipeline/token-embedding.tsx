"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";

export default function TokenEmbedding() {
  return (
    <div className="space-y-8">
      <p className="text-muted">정수 토큰 ID → 고차원 실수 벡터. 임베딩 행렬에서 해당 행을 룩업합니다.</p>

      <section>
        <h2 className="text-xl font-semibold mb-3">벡터/벡터 공간 — 임베딩</h2>
        <p>각 토큰은 <InlineMath math="d" />차원 벡터로 표현됩니다. GPT-3: <InlineMath math="d = 12{,}288" /></p>
        <p className="mt-2">의미적으로 유사한 단어가 벡터 공간에서 가까이 위치합니다.</p>
        <div className="mt-2 rounded-lg bg-accent-light p-3 text-sm">
          king - man + woman ≈ queen
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">행렬 — 임베딩 룩업</h2>
        <p>임베딩 행렬 <InlineMath math="E \in \mathbb{R}^{V \times d}" />에서 해당 행을 선택합니다:</p>
        <BlockMath math="\mathbf{e} = E[\text{token\_id}]" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">코사인 유사도 — 의미 유사도</h2>
        <p>임베딩 벡터 간 의미적 유사도를 측정합니다:</p>
        <BlockMath math="\cos(\theta) = \frac{\mathbf{a} \cdot \mathbf{b}}{\|\mathbf{a}\| \times \|\mathbf{b}\|}" />
      </section>
    </div>
  );
}
