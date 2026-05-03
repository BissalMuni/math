"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";

export default function ResidualConnection() {
  return (
    <div className="space-y-8">
      <p className="text-muted">서브레이어의 출력에 입력을 더합니다. 그래디언트 소실을 방지합니다.</p>

      <section>
        <h2 className="text-xl font-semibold mb-3">벡터 덧셈 — 잔차 연결</h2>
        <BlockMath math="\text{output} = \mathbf{x} + \text{SubLayer}(\mathbf{x})" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">항등 함수/편미분 — 그래디언트 보존</h2>
        <p>잔차 경로 = 항등 사상. 그래디언트가 최소 1의 크기로 전파됩니다:</p>
        <BlockMath math="\frac{\partial \text{output}}{\partial \mathbf{x}} = 1 + \frac{\partial \text{SubLayer}(\mathbf{x})}{\partial \mathbf{x}}" />
        <div className="mt-3 rounded-lg bg-accent-light p-4 text-sm">
          그래디언트가 최소 <strong>1</strong>이 보장되므로, 깊은 네트워크에서도 학습이 가능합니다.
        </div>
      </section>
    </div>
  );
}
