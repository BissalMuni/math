"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox } from "@/components/content/shared";

export default function InferenceOptimization() {
  return (
    <div className="space-y-8">
      <p className="text-muted">추론 속도와 메모리 효율을 높이는 수학적 기법들입니다.</p>

      <CalcBox title="KV Cache">
        <p>이미 계산한 K, V를 캐시해 반복 계산을 방지합니다:</p>
        <BlockMath math="\text{메모리} = 2 \times L \times H \times d_k \times T \times \text{dtype}" />
        <p className="text-sm text-muted">L: 레이어, H: 헤드, T: 현재 시퀀스 길이</p>
      </CalcBox>

      <CalcBox title="FlashAttention — IO 최적화">
        <p>Attention 행렬을 분할(Tiling)하여 HBM↔SRAM 이동을 최소화합니다:</p>
        <BlockMath math="\text{기존: } O(N^2 d) \text{ FLOPs, } O(N^2) \text{ 메모리}" />
        <BlockMath math="\text{FlashAttention: } O(N^2 d) \text{ FLOPs, } O(N) \text{ 메모리}" />
      </CalcBox>

      <CalcBox title="Speculative Decoding">
        <p>소형 Draft 모델로 여러 토큰을 예측 후 큰 모델로 검증합니다:</p>
        <BlockMath math="\text{수락 확률} = \min\left(1, \frac{P_{\text{target}}(x)}{P_{\text{draft}}(x)}\right)" />
        <p className="text-sm text-muted">기각된 토큰은 Target 모델 분포에서 재샘플링</p>
      </CalcBox>

      <CalcBox title="Sparse Attention">
        <p>Full Attention의 <InlineMath math="O(N^2)" /> 복잡도를 줄입니다:</p>
        <BlockMath math="\text{Sparse}: O(N \cdot k), \quad \text{Linear}: O(N)" />
      </CalcBox>
    </div>
  );
}
