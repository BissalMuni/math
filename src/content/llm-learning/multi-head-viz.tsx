"use client";

import { CalcBox, SubSection, Matrix, Insight } from "@/components/content/shared";
import { BlockMath, InlineMath } from "@/components/math/math-formula";
import { InteractiveMatmul, transposeMat } from "@/components/math/interactive-matmul";

/**
 * 멀티헤드 어텐션 한눈에 보기 — 핵심 행렬곱 4단계를 인터랙티브로 시각화.
 * d_model=8, num_heads=2, dk=dv=4 (multi-head.tsx와 동일 차원).
 */

// ── 입력 X (3토큰 × 8차원) ───────────────────────────────────
const X: number[][] = [
  [ 1.00,  0.00, -1.00,  0.50,  0.20, -0.30,  0.80,  0.10],
  [ 0.50,  1.00,  0.00, -0.50,  0.70,  0.40, -0.20,  0.60],
  [-0.50,  0.50,  1.00,  0.00, -0.10,  0.90,  0.30, -0.40],
];

// ── Head 1 가중치 ───────────────────────────────────────────
const Wq1: number[][] = [
  [ 0.47,  0.57,  0.64, -0.06],
  [ 0.61,  0.73,  0.41,  1.05],
  [-0.00, -0.17, -0.18,  0.75],
  [ 0.18, -0.20,  0.65, -0.41],
  [ 0.27,  0.52,  0.07,  0.43],
  [ 0.50,  0.29,  0.52,  0.91],
  [ 0.66,  0.13,  1.29, -0.03],
  [-0.02,  0.39, -0.35,  0.17],
];
const Wk1: number[][] = [
  [ 0.35,  0.41,  0.31, -0.19],
  [ 0.34,  0.40,  0.57,  0.41],
  [-0.18, -0.00,  0.08,  0.53],
  [-0.08,  0.42, -0.03, -0.07],
  [ 0.27,  0.07,  0.29,  0.05],
  [ 0.08,  0.49,  0.41,  0.54],
  [ 0.08,  0.92,  0.30,  0.14],
  [ 0.22, -0.26,  0.10, -0.13],
];
const Wv1: number[][] = [
  [ 0.13,  0.02,  0.30, -0.04],
  [ 0.10,  0.36,  0.14,  0.03],
  [ 0.02,  0.21, -0.21,  0.22],
  [ 0.24, -0.13,  0.12,  0.35],
  [-0.04,  0.16,  0.11, -0.18],
  [ 0.21,  0.29,  0.04,  0.33],
  [ 0.45,  0.01,  0.27,  0.58],
  [-0.18,  0.07,  0.04, -0.38],
];

// ── Head 1 계산 결과 (검증된 값) ─────────────────────────────
const Q1: number[][] = [
  [1.00, 0.80, 2.00, -1.20],
  [1.00, 1.80, 0.20,  2.00],
  [0.70, 0.00, 0.70,  2.00],
];
const K1: number[][] = [
  [ 0.60,  1.20,  0.40, -0.80],
  [ 0.90,  0.30,  1.10,  0.50],
  [-0.20,  0.80,  0.60,  1.40],
];
const V1: number[][] = [
  [ 0.50, -0.30,  0.80,  0.20],
  [-0.10,  0.70,  0.30, -0.50],
  [ 0.40,  0.60, -0.20,  0.90],
];
const Attn1: number[][] = [
  [0.517, 0.387, 0.096],
  [0.136, 0.277, 0.587],
  [0.074, 0.385, 0.541],
];

// ── Concat Z + Wo ──────────────────────────────────────────
const Z: number[][] = [
  [0.49, 0.81, 0.47, 0.63, 0.67, 0.42, 0.93, 0.26],
  [0.47, 0.43, 0.49, 0.26, 0.49, 0.38, 0.49, 0.58],
  [0.42, 0.37, 0.25, 0.92, 0.52, 0.65, 0.57, 0.11],
];
const Wo: number[][] = [
  [ 0.30,  0.10, -0.20,  0.40,  0.50, -0.10,  0.20,  0.30],
  [ 0.20, -0.30,  0.50,  0.10, -0.20,  0.40,  0.10, -0.10],
  [-0.10,  0.40,  0.20, -0.30,  0.30,  0.20, -0.40,  0.50],
  [ 0.50,  0.20, -0.10,  0.30, -0.40,  0.10,  0.30, -0.20],
  [ 0.10, -0.40,  0.30,  0.20,  0.40, -0.30,  0.10,  0.20],
  [-0.30,  0.50,  0.10, -0.20,  0.20,  0.30, -0.50,  0.40],
  [ 0.40,  0.10, -0.30,  0.50, -0.10,  0.20,  0.40, -0.30],
  [ 0.20, -0.20,  0.40,  0.10,  0.30, -0.40,  0.20,  0.10],
];

export default function MultiHeadViz() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        멀티헤드 어텐션의 전 과정을 <strong>인터랙티브 행렬곱</strong>으로 한눈에. 자동 순회되며, 결과 셀을
        클릭하면 그 셀의 계산 과정만 단독 재생됩니다. (d_model=8 · heads=2 · dk=4)
      </p>

      {/* ───────────── ① 입력 X ───────────── */}
      <CalcBox title="■ ① 입력 X (3×8)">
        <p className="mb-3">
          토큰 3개, 각 토큰의 임베딩 차원 <InlineMath math="d_{model}=8" />.
        </p>
        <Matrix data={X} label="X (3×8)" />
      </CalcBox>

      {/* ───────────── ② Wq1 · Wk1 · Wv1 (Head 1) ───────────── */}
      <CalcBox title="■ ② Head 1 가중치 — Wq1 · Wk1 · Wv1 (8×4)">
        <p className="mb-3">
          학습 파라미터 3종. <span style={{ color: "var(--blue)" }}>Wq1</span>은 Q1,{" "}
          <span style={{ color: "var(--orange)" }}>Wk1</span>은 K1,{" "}
          <span style={{ color: "var(--green)" }}>Wv1</span>은 V1을 생성한다. 모두 (8×4) 동일 구조.
        </p>
        <div className="flex flex-wrap gap-4">
          <Matrix data={Wq1} label="Wq1 (8×4) — Q1 생성" color="blue" />
          <Matrix data={Wk1} label="Wk1 (8×4) — K1 생성" color="orange" />
          <Matrix data={Wv1} label="Wv1 (8×4) — V1 생성" color="green" />
        </div>
      </CalcBox>

      {/* ───────────── ③ X × Wq1 = Q1 (인터랙티브) ───────────── */}
      <CalcBox title="■ ③ X × Wq1 = Q1 — 내적 인터랙티브">
        <p className="mb-2">
          행렬곱의 핵심: <InlineMath math="Q_1[i,j] = \sum_k X[i,k] \cdot W_{q1}[k,j]" /> — X의 i행과 Wq1의 j열의 내적.
        </p>
        <BlockMath math="Q_1 = X \cdot W_{q1}" />
        <InteractiveMatmul
          matA={X} matB={Wq1}
          aLabel="X (3×8)" bLabel="Wq1 (8×4)" cLabel="Q1 (3×4)"
          aColor="gray" bColor="gray" cColor="blue"
          ballAColor="#4a90d9" ballBColor="#3fb950"
        />
        <Insight>
          12개 Q1 셀이 자동 순회됩니다. 파란 구슬(X→Wq1) → 초록 구슬(Wq1→Q1) 순으로 8개 곱셈이 합쳐져 한 셀이 만들어집니다.
        </Insight>
      </CalcBox>

      {/* ───────────── ④ Score (Q×Kᵀ ÷ √dk) ───────────── */}
      <CalcBox title="■ ④ Score = Q1 · K1ᵀ ÷ √dk — 어텐션 점수">
        <p className="mb-2">
          쿼리와 키의 유사도. <InlineMath math="\sqrt{d_k}=\sqrt{4}=2" /> 로 나눠 분산 안정화.
        </p>
        <BlockMath math="\text{Score}_1 = \frac{Q_1 \cdot K_1^\top}{\sqrt{d_k}}" />

        <SubSection title="● 미리 계산된 Q1, K1 (Head 1)">
          <div className="flex flex-wrap gap-4 mb-3">
            <Matrix data={Q1} label="Q1 (3×4)" color="blue" />
            <Matrix data={K1} label="K1 (3×4)" color="orange" />
          </div>
          <p className="text-sm text-muted">
            아래 인터랙티브에서는 K1을 전치한 <InlineMath math="K_1^\top" /> (4×3)으로 표시 — 표준 "행 × 열" 곱셈 시각화 유지.
          </p>
        </SubSection>

        <InteractiveMatmul
          matA={Q1} matB={transposeMat(K1)}
          aLabel="Q1 (3×4)" bLabel="K1ᵀ (4×3)" cLabel="Score1 (3×3)"
          aColor="blue" bColor="orange" cColor="purple"
          ballAColor="#58a6ff" ballBColor="#ffa657"
          divisor={2} divisorLabel="÷ 2"
        />
        <Insight>
          나눗셈(÷2)이 추가되면 합산값 옆에 <code>= sum ÷ 2 = result</code> 형태로 단계가 표시됩니다.
        </Insight>
      </CalcBox>

      {/* ───────────── ⑤ Softmax (간략) ───────────── */}
      <CalcBox title="■ ⑤ Softmax — 어텐션 가중치 Attn1">
        <p className="mb-3">
          Score의 각 행을 확률 분포로 변환. 행 합 = 1.
        </p>
        <BlockMath math="\text{Attn}_1[i,j] = \frac{e^{\text{Score}_1[i,j]}}{\sum_k e^{\text{Score}_1[i,k]}}" />
        <Matrix data={Attn1} label="Attn1 (3×3) — 행합 1.0" color="green" />
      </CalcBox>

      {/* ───────────── ⑥ Attn × V = head (인터랙티브) ───────────── */}
      <CalcBox title="■ ⑥ Attn1 × V1 = head1 — 가중합으로 V 추출">
        <p className="mb-2">
          어텐션 가중치로 V의 행을 가중평균. 이것이 한 헤드의 출력.
        </p>
        <BlockMath math="\text{head}_1 = \text{Attn}_1 \cdot V_1" />
        <InteractiveMatmul
          matA={Attn1} matB={V1}
          aLabel="Attn1 (3×3)" bLabel="V1 (3×4)" cLabel="head1 (3×4)"
          aColor="teal" bColor="green" cColor="yellow"
          ballAColor="#39d0d8" ballBColor="#3fb950"
        />
      </CalcBox>

      {/* ───────────── ⑦ Concat (정적) ───────────── */}
      <CalcBox title="■ ⑦ Concat(head1, head2) → Z (3×8)">
        <p className="mb-3">
          두 헤드의 (3×4) 출력을 열 방향으로 이어붙여 (3×8) Z를 만든다. (Head 2 계산은 동일 패턴이라 생략 —
          본 페이지의 정적 Z는 head1+head2 결과 가정값)
        </p>
        <Matrix data={Z} label="Z = Concat(head1, head2) (3×8)" color="orange" />
      </CalcBox>

      {/* ───────────── ⑧ Z × Wo = Output (인터랙티브) ───────────── */}
      <CalcBox title="■ ⑧ Z × Wo = Output — 최종 출력 투영">
        <p className="mb-2">
          출력 가중치 <InlineMath math="W_o" />로 투영. 출력 차원은 입력과 동일 (3×8) — Residual Connection 가능.
        </p>
        <BlockMath math="\text{Output} = Z \cdot W_o" />
        <InteractiveMatmul
          matA={Z} matB={Wo}
          aLabel="Z (3×8)" bLabel="Wo (8×8)" cLabel="Output (3×8)"
          aColor="orange" bColor="red" cColor="purple"
          ballAColor="#ffa657" ballBColor="#ff7b72"
        />
        <Insight>
          24개 셀 모두 자동 순회 (3×8). 다음/이전 버튼으로 셀 단위 이동, 클릭으로 특정 셀 단독 재생 가능.
        </Insight>
      </CalcBox>

      {/* ───────────── ⑨ 파이프라인 요약 ───────────── */}
      <CalcBox title="■ ⑨ 전체 파이프라인 요약">
        <BlockMath math="\text{MultiHead}(Q,K,V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h) \cdot W^O" />
        <BlockMath math="\text{head}_i = \text{Attention}(Q W_{q_i}, K W_{k_i}, V W_{v_i})" />
        <BlockMath math="\text{Attention}(Q,K,V) = \text{softmax}\!\left(\frac{Q K^\top}{\sqrt{d_k}}\right) V" />
        <p className="mt-3 text-sm text-muted">
          X(3×8) → Q,K,V 생성 → Q·Kᵀ/√dk → Softmax → ×V → Concat → ×Wo → Output(3×8)
        </p>
      </CalcBox>
    </div>
  );
}
