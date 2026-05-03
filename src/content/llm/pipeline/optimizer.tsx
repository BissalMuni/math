"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox } from "@/components/content/shared";

export default function Optimizer() {
  return (
    <div className="space-y-8">
      <p className="text-muted">그래디언트를 이용해 파라미터를 업데이트합니다. AdamW + Cosine LR Decay가 표준입니다.</p>

      <CalcBox title="AdamW — 표준 옵티마이저">
        <BlockMath math="m_t = \beta_1 m_{t-1} + (1-\beta_1)g_t" />
        <BlockMath math="v_t = \beta_2 v_{t-1} + (1-\beta_2)g_t^2" />
        <BlockMath math="\hat{m}_t = \frac{m_t}{1-\beta_1^t}, \quad \hat{v}_t = \frac{v_t}{1-\beta_2^t}" />
        <BlockMath math="\theta_t = \theta_{t-1} - \alpha \left(\frac{\hat{m}_t}{\sqrt{\hat{v}_t}+\epsilon} + \lambda \theta_{t-1}\right)" />
        <p className="text-sm text-muted">보통 β₁=0.9, β₂=0.95, ε=1e-8, λ=0.1</p>
      </CalcBox>

      <CalcBox title="Warmup + Cosine Decay">
        <BlockMath math="\eta_t = \begin{cases} \eta_{\max} \cdot \frac{t}{T_w} & t \leq T_w \\ \eta_{\min} + \frac{\eta_{\max}-\eta_{\min}}{2}\left(1+\cos\frac{\pi(t-T_w)}{T-T_w}\right) & t > T_w \end{cases}" />
        <p className="text-sm text-muted">T_w: Warmup 스텝 수</p>
      </CalcBox>

      <CalcBox title="Mixed Precision 학습">
        <p>FP16으로 순전파/역전파 → FP32로 파라미터 업데이트:</p>
        <BlockMath math="\theta_{\text{FP32}} \leftarrow \theta_{\text{FP32}} - \alpha \nabla L_{\text{FP16}}" />
      </CalcBox>
    </div>
  );
}
