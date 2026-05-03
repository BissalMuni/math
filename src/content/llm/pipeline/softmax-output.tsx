"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";

export default function SoftmaxOutput() {
  return (
    <div className="space-y-8">
      <p className="text-muted">마지막 레이어 출력을 어휘 크기의 확률 분포로 변환합니다.</p>

      <section>
        <h2 className="text-xl font-semibold mb-3">선형 투영 — Logit 계산</h2>
        <p>숨겨진 상태 <InlineMath math="h \in \mathbb{R}^d" />를 어휘 크기 로짓으로 변환합니다:</p>
        <BlockMath math="\text{logits} = hW^T_{\text{embed}}" />
        <p className="text-sm text-muted">Weight Tying: 임베딩 행렬 재사용</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Softmax — 확률 분포</h2>
        <BlockMath math="P(x_i) = \frac{e^{z_i}}{\sum_j e^{z_j}}" />
        <p className="mt-2">Temperature 조절:</p>
        <BlockMath math="P(x_i \mid T) = \frac{e^{z_i/T}}{\sum_j e^{z_j/T}}" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Top-k / Top-p 필터링</h2>
        <p><strong>Top-k:</strong> 확률 상위 k개만 남기고 나머지를 0으로</p>
        <p className="mt-2"><strong>Top-p (nucleus):</strong> 누적 확률 p에 도달할 때까지의 토큰만 사용</p>
        <BlockMath math="\sum_{i \in S_p} P(x_i) \geq p" />
      </section>
    </div>
  );
}
