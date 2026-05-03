"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox } from "@/components/content/shared";

export default function LayerNorm() {
  return (
    <div className="space-y-8">
      <p className="text-muted">각 서브레이어 입력의 평균을 0, 분산을 1로 정규화합니다. 학습 안정성을 확보합니다.</p>

      <CalcBox title="평균/분산 — 통계량 계산">
        <BlockMath math="\mu = \frac{1}{d}\sum_i x_i \qquad \sigma^2 = \frac{1}{d}\sum_i (x_i - \mu)^2" />
      </CalcBox>

      <CalcBox title="정규화 — LayerNorm / RMSNorm">
        <p><strong>LayerNorm:</strong></p>
        <BlockMath math="\text{LayerNorm}(\mathbf{x}) = \gamma \cdot \frac{\mathbf{x} - \mu}{\sqrt{\sigma^2 + \epsilon}} + \beta" />
        <p className="mt-4"><strong>RMSNorm (LLaMA):</strong></p>
        <BlockMath math="\text{RMSNorm}(\mathbf{x}) = \frac{\mathbf{x}}{\sqrt{\frac{1}{d}\sum x_i^2}} \cdot \gamma" />
        <p className="text-sm text-muted">L2 노름 기반, 평균 계산 생략으로 더 효율적</p>
      </CalcBox>
    </div>
  );
}
