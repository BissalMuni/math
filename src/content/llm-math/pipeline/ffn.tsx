"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox } from "@/components/content/shared";

export default function FFN() {
  return (
    <div className="space-y-8">
      <p className="text-muted">Attention 이후 각 토큰을 독립적으로 비선형 변환합니다. 지식 저장소 역할을 합니다.</p>

      <CalcBox title="선형 변환 — 두 번의 완전 연결">
        <BlockMath math="\text{FFN}(\mathbf{x}) = \text{Act}(xW_1 + b_1) W_2 + b_2" />
        <p className="mt-2">중간 차원: <InlineMath math="d_{\text{ff}} = 4d" /> (GPT) 또는 <InlineMath math="\frac{8d}{3}" /> (LLaMA SwiGLU)</p>
      </CalcBox>

      <CalcBox title="활성화 함수 — 비선형성">
        <p><strong>ReLU:</strong></p>
        <BlockMath math="\text{ReLU}(x) = \max(0, x)" />
        <p className="mt-3"><strong>GELU (GPT-2/3/4):</strong></p>
        <BlockMath math="\text{GELU}(x) = x \cdot \Phi(x) \approx x \cdot \sigma(1.702x)" />
        <p className="text-sm text-muted">Φ: 표준 정규 분포 CDF</p>
        <p className="mt-3"><strong>SwiGLU (LLaMA):</strong></p>
        <BlockMath math="\text{SwiGLU}(x, W, V) = \text{Swish}(xW) \odot xV" />
      </CalcBox>

      <CalcBox title="잔차 연결 — 그래디언트 흐름">
        <p>Attention과 FFN 모두 잔차 연결을 사용합니다. Vanishing Gradient를 방지합니다.</p>
        <BlockMath math="\mathbf{x}' = \mathbf{x} + \text{Sublayer}(\mathbf{x})" />
      </CalcBox>
    </div>
  );
}
