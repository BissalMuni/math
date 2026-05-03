"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox } from "@/components/content/shared";

export default function Attention() {
  return (
    <div className="space-y-8">
      <p className="text-muted">입력 시퀀스의 모든 토큰 쌍 간 관련성을 계산하여 문맥을 반영합니다.</p>

      <CalcBox title="선형 변환 — Q, K, V 투영">
        <BlockMath math="Q = XW_q, \quad K = XW_k, \quad V = XW_v" />
        <p className="text-sm text-muted">X: 입력, W: 가중치 행렬</p>
        <p className="mt-2">Multi-Head: <InlineMath math="(n, d) \rightarrow (n, h, d_k)" />으로 <InlineMath math="h" />개 헤드로 분할. <InlineMath math="d_k = d/h" /></p>
      </CalcBox>

      <CalcBox title="행렬 곱셈/전치 — QKᵀ">
        <p>모든 쿼리-키 쌍의 유사도를 한번에 계산합니다. Key를 전치하여 <InlineMath math="(A^\top)_{ij} = A_{ji}" /></p>
      </CalcBox>

      <CalcBox title="스케일링 — √dₖ 정규화">
        <p>내적 값의 분산이 <InlineMath math="d_k" />에 비례하므로 <InlineMath math="\sqrt{d_k}" />로 나눕니다.</p>
        <BlockMath math="\text{Var}(\mathbf{q} \cdot \mathbf{k}) = d_k" />
      </CalcBox>

      <CalcBox title="Softmax — 확률 분포 변환">
        <BlockMath math="\text{softmax}(z_i) = \frac{e^{z_i}}{\sum_j e^{z_j}}" />
        <p>안정 softmax: <InlineMath math="\max(\mathbf{z})" />를 빼서 오버플로 방지</p>
      </CalcBox>

      <CalcBox title="가중 평균 — Attention 출력">
        <BlockMath math="\text{Attention 출력} = \sum_i \alpha_i V_i" />
        <p className="text-sm text-muted">αᵢ: attention weight</p>
      </CalcBox>

      <CalcBox title="핵심 공식">
        <BlockMath math="\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right) \cdot V" />
        <BlockMath math="\text{MultiHead}(X) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h) \cdot W_o" />
      </CalcBox>
    </div>
  );
}
