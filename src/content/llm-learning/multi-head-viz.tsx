"use client";

import { useState } from "react";
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
// cols 0-3: ⑥ Attn1×V1 실계산값, cols 4-7: head2 가정값
const Z: number[][] = [
  [0.26, 0.17, 0.51,  0.00, 0.67, 0.42, 0.93, 0.26],
  [0.28, 0.51, 0.07,  0.42, 0.49, 0.38, 0.49, 0.58],
  [0.21, 0.57, 0.07,  0.31, 0.52, 0.65, 0.57, 0.11],
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

// ── Score1 (Q1·K1ᵀ ÷ √dk=2) ──────────────────────────────────
const Score1: number[][] = [
  [ 1.66,  1.37, -0.02],
  [ 0.62,  1.33,  2.08],
  [-0.45,  1.20,  1.54],
];
const Score1Exps: number[][] = Score1.map(row => row.map(v => Math.exp(v)));
const Score1Sums: number[] = Score1Exps.map(row => row.reduce((a, b) => a + b, 0));

export default function MultiHeadViz() {
  const [softmaxStep, setSoftmaxStep] = useState<0 | 1 | 2>(0);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const stepMatrix = softmaxStep === 0 ? Score1 : softmaxStep === 1 ? Score1Exps : Attn1;

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

      {/* ───────────── ⑤ Softmax (인터랙티브) ───────────── */}
      <CalcBox title="■ ⑤ Softmax — 어텐션 가중치 Attn1">
        <p className="mb-3">
          Score의 각 행을 확률 분포로 변환. 행 합 = 1.
        </p>
        <BlockMath math="\text{Attn}_1[i,j] = \frac{e^{\text{Score}_1[i,j]}}{\sum_k e^{\text{Score}_1[i,k]}}" />

        {/* 단계 탭 */}
        <div className="flex gap-1 bg-sidebar-bg rounded-lg p-1 mt-4 mb-4">
          {["① 원시 점수", "② e^x 적용", "③ 정규화 (÷합)"].map((label, i) => (
            <button
              key={i}
              onClick={() => { setSoftmaxStep(i as 0 | 1 | 2); setActiveRow(null); }}
              className={`flex-1 py-1.5 rounded-md text-xs transition-colors ${
                softmaxStep === i
                  ? "bg-white dark:bg-gray-800 font-semibold shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 변환 단계별 행렬 (행 클릭 → 상세) */}
        <div className="font-mono text-sm space-y-1 mb-2">
          <div className="flex items-center gap-2 px-3 text-xs text-muted mb-1">
            <span className="w-12" />
            {["키0", "키1", "키2"].map((h, j) => (
              <span key={j} className="min-w-[4.5rem] text-center">{h}</span>
            ))}
          </div>
          {[0, 1, 2].map(ri => {
            const row = stepMatrix[ri];
            const isActive = activeRow === ri;
            return (
              <div
                key={ri}
                onClick={() => setActiveRow(isActive ? null : ri)}
                style={{ cursor: "pointer" }}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
                  isActive
                    ? "ring-1 ring-accent bg-accent-light"
                    : "hover:bg-sidebar-bg"
                }`}
              >
                <span className="text-xs text-muted w-12">쿼리{ri}</span>
                {row.map((v, ci) => {
                  let cls = "inline-block min-w-[4.5rem] text-center rounded px-1 py-0.5";
                  if (softmaxStep === 0) {
                    cls += v >= 0
                      ? " bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
                      : " bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300";
                  } else if (softmaxStep === 1) {
                    cls += v > 4
                      ? " bg-blue-200 dark:bg-blue-800/60 text-blue-800 dark:text-blue-200"
                      : v > 1.5
                      ? " bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                      : " text-muted";
                  } else {
                    cls += v > 0.4
                      ? " bg-purple-200 dark:bg-purple-800/60 text-purple-800 dark:text-purple-100 font-bold"
                      : v > 0.2
                      ? " bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
                      : " text-muted";
                  }
                  return (
                    <span key={ci} className={cls}>
                      {softmaxStep === 1 ? v.toFixed(2) : v.toFixed(3)}
                    </span>
                  );
                })}
                {softmaxStep === 1 && (
                  <span className="ml-auto text-xs text-muted">합={Score1Sums[ri].toFixed(2)}</span>
                )}
                {softmaxStep === 2 && (
                  <span className="ml-auto text-xs text-muted">합={row.reduce((a, b) => a + b, 0).toFixed(3)}</span>
                )}
                <span className="text-xs text-muted ml-1">{isActive ? "▴" : "▾"}</span>
              </div>
            );
          })}
        </div>

        {/* 선택된 행 상세 계산 */}
        {activeRow !== null && (
          <div className="p-4 rounded-lg border border-accent bg-accent-light text-sm">
            <div className="font-semibold text-accent text-xs mb-3">쿼리{activeRow} — 3단계 변환 상세</div>
            <div className="grid grid-cols-3 gap-3 font-mono text-center">
              <div className="space-y-1">
                <div className="text-xs text-muted font-sans mb-2">① 원시 점수</div>
                {Score1[activeRow].map((v, j) => (
                  <div key={j} className={`rounded px-2 py-0.5 ${
                    v >= 0
                      ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
                      : "bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300"
                  }`}>
                    {v >= 0 ? "+" : ""}{v.toFixed(2)}
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted font-sans mb-2">② e^x</div>
                {Score1Exps[activeRow].map((v, j) => (
                  <div key={j} className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded px-2 py-0.5">
                    {v.toFixed(3)}
                  </div>
                ))}
                <div className="text-xs text-muted border-t border-sidebar-border pt-1 mt-1">
                  합={Score1Sums[activeRow].toFixed(3)}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted font-sans mb-2">③ ÷{Score1Sums[activeRow].toFixed(2)}</div>
                {Attn1[activeRow].map((v, j) => (
                  <div key={j} className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded px-2 py-0.5 font-bold">
                    {v.toFixed(3)}
                  </div>
                ))}
                <div className="text-xs text-muted border-t border-sidebar-border pt-1 mt-1">
                  합={Attn1[activeRow].reduce((a, b) => a + b, 0).toFixed(3)} ✓
                </div>
              </div>
            </div>
          </div>
        )}

        <Insight>
          행을 클릭하면 원시 점수 → e^x → 정규화 전 과정을 확인할 수 있습니다.
        </Insight>
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
          두 헤드의 (3×4) 출력을 열 방향으로 이어붙여 (3×8) Z를 만든다.
          <strong>열 0–3은 ⑥에서 직접 계산한 head1 값</strong>이며, 열 4–7은 head2 가정값
          (Head 2는 동일 패턴이므로 생략).
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
