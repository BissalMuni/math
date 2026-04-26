"use client";

import { InlineMath, BlockMath } from "@/components/math-formula";

export default function Sampling() {
  return (
    <div className="space-y-8">
      <p className="text-muted">필터링된 확률 분포에서 다음 토큰을 샘플링합니다.</p>

      <section>
        <h2 className="text-xl font-semibold mb-3">이산 확률 분포 — 다항 샘플링</h2>
        <p>각 토큰의 확률에 비례하여 무작위로 선택합니다:</p>
        <BlockMath math="x_t \sim \text{Categorical}(P(x_t \mid x_{<t}))" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Greedy vs Sampling</h2>
        <p><strong>Greedy:</strong> <InlineMath math="x_t = \arg\max P(x_t \mid x_{<t})" /></p>
        <p className="mt-2"><strong>Beam Search:</strong> 상위 k개 시퀀스를 동시에 추적:</p>
        <BlockMath math="\text{score}(x_1, \ldots, x_t) = \sum_{i=1}^t \log P(x_i \mid x_{<i})" />
        <p className="mt-2"><strong>Multinomial Sampling:</strong> 확률 분포에서 무작위 추출</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Repetition Penalty</h2>
        <p>이미 생성된 토큰의 로짓을 줄여 반복을 방지합니다:</p>
        <BlockMath math="z_i' = z_i / \text{penalty} \quad \text{(이미 등장한 토큰)}" />
      </section>
    </div>
  );
}
