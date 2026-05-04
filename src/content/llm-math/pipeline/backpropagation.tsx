"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox } from "@/components/content/shared";

export default function Backpropagation() {
  return (
    <div className="space-y-8">
      <p className="text-muted">손실 함수의 그래디언트를 출력층에서 입력층 방향으로 역방향 전파합니다.</p>

      <CalcBox title="연쇄 법칙 — 그래디언트 역전파">
        <BlockMath math="\frac{\partial L}{\partial W^{(l)}} = \frac{\partial L}{\partial a^{(L)}} \cdot \frac{\partial a^{(L)}}{\partial a^{(L-1)}} \cdots \frac{\partial a^{(l+1)}}{\partial W^{(l)}}" />
        <p className="mt-2">각 레이어에서 순전파 시 중간값을 저장해 역전파에 사용합니다.</p>
      </CalcBox>

      <CalcBox title="Vanishing / Exploding Gradient">
        <p>그래디언트가 레이어를 거칠수록 소실/폭발하는 문제:</p>
        <BlockMath math="\left\|\frac{\partial L}{\partial W^{(1)}}\right\| \approx \prod_{l=2}^{L} \left\|\frac{\partial a^{(l)}}{\partial a^{(l-1)}}\right\| \cdot \left\|\frac{\partial L}{\partial a^{(L)}}\right\|" />
        <div className="mt-3 rounded-lg bg-accent-light p-3 text-sm space-y-1">
          <p><strong>해결:</strong> 잔차 연결, LayerNorm, Gradient Clipping</p>
          <p><strong>Gradient Clipping:</strong> <InlineMath math="\mathbf{g} \leftarrow \mathbf{g} \cdot \frac{\text{clip\_norm}}{\max(\|\mathbf{g}\|, \text{clip\_norm})}" /></p>
        </div>
      </CalcBox>

      <CalcBox title="자동 미분 (Autograd)">
        <p>계산 그래프를 동적으로 구성하여 자동으로 그래디언트를 계산합니다. PyTorch의 `loss.backward()`가 이를 수행합니다.</p>
      </CalcBox>
    </div>
  );
}
