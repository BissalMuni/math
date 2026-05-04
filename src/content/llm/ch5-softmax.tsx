"use client";

import { BlockMath, InlineMath } from "@/components/math/math-formula";
import { Matrix, Arrow, CalcBox, Insight } from "@/components/content/shared";

/**
 * Softmax 예제:
 *   scores1 = [2.0, 1.0, 0.1]  → 양수 점수
 *   scores2 = [-1.0, 2.0, -0.5] → 음수 포함
 *
 * 온도(Temperature) 효과:
 *   T=0.5 (날카롭게), T=1.0 (기본), T=2.0 (부드럽게)
 */

// ── Softmax 계산 유틸 ────────────────────────────────────────
function softmaxWithTemp(scores: number[], temp: number): number[] {
  const shifted = scores.map(s => s / temp);
  const exps = shifted.map(s => Math.exp(s));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(e => e / sum);
}

// ── 예제 1: 양수 점수 ──────────────────────────────────────
const scores1 = [2.0, 1.0, 0.1];
const exps1 = scores1.map(s => Math.exp(s));
const sum1 = exps1.reduce((a, b) => a + b, 0);
const softmax1 = exps1.map(e => e / sum1);

// ── 예제 2: 음수 포함 ──────────────────────────────────────
const scores2 = [-1.0, 2.0, -0.5];
const exps2 = scores2.map(s => Math.exp(s));
const sum2 = exps2.reduce((a, b) => a + b, 0);
const softmax2 = exps2.map(e => e / sum2);

// ── 온도 효과 ─────────────────────────────────────────────
const baseScores = [2.0, 1.0, 0.1];
const sm_T05 = softmaxWithTemp(baseScores, 0.5);
const sm_T10 = softmaxWithTemp(baseScores, 1.0);
const sm_T20 = softmaxWithTemp(baseScores, 2.0);

export default function SoftmaxContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        어텐션 점수 <InlineMath math="Q \cdot K^T / \sqrt{d_k}" /> 를 확률 분포로 변환합니다.
        "모든 토큰에 어느 정도의 주의를 주되, 중요한 토큰에 집중"하는 원리입니다.
      </p>

      {/* ── 왜 e^x 인가 ── */}
      <CalcBox title="왜 e^x 를 사용하는가?">
        <BlockMath math="\text{softmax}(x_i) = \frac{e^{x_i}}{\sum_j e^{x_j}}" />
        <div className="text-sm space-y-2 mt-4">
          <div className="flex gap-2 items-start">
            <span className="font-bold text-accent">①</span>
            <span><strong>항상 양수:</strong> <InlineMath math="e^x > 0" /> — 어떤 점수도 음수 확률이 되지 않음</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="font-bold text-accent">②</span>
            <span><strong>차이 증폭:</strong> 2.0 vs 1.0 → e² ≈ 7.39 vs e¹ ≈ 2.72 — 작은 점수 차가 큰 확률 차로</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="font-bold text-accent">③</span>
            <span><strong>합 = 1:</strong> 분모로 정규화 → 확률 분포 완성</span>
          </div>
        </div>
      </CalcBox>

      {/* ── STEP 1: 양수 점수 예제 ── */}
      <CalcBox title="① 기본 예제: 점수 [2.0, 1.0, 0.1] → Softmax">
        <p className="text-sm mb-4">
          Q·Kᵀ/√dk 결과로 세 토큰의 어텐션 점수 [2.0, 1.0, 0.1]이 나왔다고 가정합니다.
        </p>
        <div className="text-sm space-y-3 font-mono mb-4">
          <div className="p-3 rounded-lg border border-sidebar-border bg-sidebar-bg">
            <div className="text-muted mb-1">① exp 계산:</div>
            <div>
              [e^2.0, e^1.0, e^0.1] = [{exps1.map(v => v.toFixed(2)).join(", ")}]
            </div>
          </div>
          <div className="p-3 rounded-lg border border-sidebar-border bg-sidebar-bg">
            <div className="text-muted mb-1">② 합산:</div>
            <div>
              {exps1[0].toFixed(2)} + {exps1[1].toFixed(2)} + {exps1[2].toFixed(2)} = <strong>{sum1.toFixed(2)}</strong>
            </div>
          </div>
          <div className="p-3 rounded-lg border border-sidebar-border bg-blue-50 dark:bg-blue-950">
            <div className="text-muted mb-1">③ 정규화 (÷ {sum1.toFixed(2)}):</div>
            <div className="font-bold text-blue-700 dark:text-blue-300">
              [{softmax1.map(v => v.toFixed(3)).join(", ")}]
            </div>
            <div className="text-muted mt-1">
              합 = {softmax1.reduce((a, b) => a + b, 0).toFixed(3)} ✓
            </div>
          </div>
        </div>
        <Insight>
          점수 2.0인 토큰이 <strong>{(softmax1[0] * 100).toFixed(1)}%</strong>의 주의를 받습니다.
          점수 0.9 차이가 확률 {((softmax1[0] - softmax1[1]) * 100).toFixed(1)}% 차이로 증폭되었습니다.
        </Insight>
      </CalcBox>

      {/* ── STEP 2: 음수 점수 ── */}
      <CalcBox title="② 음수 점수 처리: [-1.0, 2.0, -0.5]">
        <p className="text-sm mb-4">
          음수 점수도 e^x를 거치면 양수가 됩니다 (단지 작아질 뿐).
          음수 점수 = "별로 관련 없는 토큰"이지만 완전히 무시하진 않습니다.
        </p>
        <div className="text-sm space-y-3 font-mono mb-4">
          <div className="p-3 rounded-lg border border-sidebar-border bg-sidebar-bg">
            <div className="text-muted mb-1">① exp 계산:</div>
            <div>
              [e^-1.0, e^2.0, e^-0.5] = [{exps2.map(v => v.toFixed(2)).join(", ")}]
            </div>
            <div className="text-muted text-xs mt-1">음수도 양수로 변환됨 (단 작은 값)</div>
          </div>
          <div className="p-3 rounded-lg border border-sidebar-border bg-sidebar-bg">
            <div className="text-muted mb-1">② 합 = {sum2.toFixed(2)}, ③ 정규화:</div>
            <div className="font-bold">
              [{softmax2.map(v => v.toFixed(3)).join(", ")}]
            </div>
          </div>
        </div>
        <p className="text-sm text-muted">
          점수 2.0인 토큰이 <strong>{(softmax2[1] * 100).toFixed(1)}%</strong> 차지.
          음수 점수의 토큰들도 각각 {(softmax2[0] * 100).toFixed(1)}%, {(softmax2[2] * 100).toFixed(1)}% — 0은 아닙니다.
        </p>
      </CalcBox>

      {/* ── STEP 3: 온도 효과 ── */}
      <CalcBox title="③ 온도(Temperature)로 분포 조절">
        <p className="text-sm mb-4">
          점수를 온도 T로 나눈 후 Softmax를 적용합니다:{" "}
          <InlineMath math="\text{softmax}(x/T)" />
        </p>
        <BlockMath math="\text{softmax}(x_i / T) = \frac{e^{x_i/T}}{\sum_j e^{x_j/T}}" />
        <div className="space-y-3 text-sm font-mono mt-4">
          <div className="p-3 rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <div className="font-bold text-red-700 dark:text-red-300 mb-1">T=0.5 (날카롭게 — 한 토큰에 집중)</div>
            <div>[{sm_T05.map(v => v.toFixed(3)).join(", ")}]</div>
            <div className="text-muted text-xs mt-1">첫 토큰이 {(sm_T05[0] * 100).toFixed(1)}% 차지 → 더 결정적</div>
          </div>
          <div className="p-3 rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
            <div className="font-bold text-blue-700 dark:text-blue-300 mb-1">T=1.0 (기본값)</div>
            <div>[{sm_T10.map(v => v.toFixed(3)).join(", ")}]</div>
          </div>
          <div className="p-3 rounded-lg border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <div className="font-bold text-green-700 dark:text-green-300 mb-1">T=2.0 (부드럽게 — 고르게 분산)</div>
            <div>[{sm_T20.map(v => v.toFixed(3)).join(", ")}]</div>
            <div className="text-muted text-xs mt-1">첫 토큰이 {(sm_T20[0] * 100).toFixed(1)}% → 더 무작위적</div>
          </div>
        </div>
      </CalcBox>

      {/* ── 전체 공식 ── */}
      <CalcBox title="어텐션에서의 Softmax 위치">
        <BlockMath math="\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^T}{\sqrt{d_k}}\right) V" />
        <div className="text-sm text-muted mt-3 space-y-1">
          <div>① Q·Kᵀ → 원시 점수 (어떤 값이든 가능)</div>
          <div>② ÷√dk → 스케일 조정</div>
          <div><strong>③ Softmax → 각 행의 합=1인 확률 분포</strong></div>
          <div>④ × V → 확률로 가중합</div>
        </div>
      </CalcBox>

      <Insight>
        <strong>"모든 토큰에 어느 정도의 주의를 주되, 중요한 토큰에 집중"</strong>
        <br />
        Softmax는 절대로 0을 출력하지 않습니다 (e^x &gt; 0이므로).
        따라서 트랜스포머는 항상 모든 토큰을 고려하지만,
        중요한 토큰에 훨씬 큰 가중치를 줍니다.
        온도 T를 낮추면 더 결정적(greedy), 높이면 더 다양한 출력이 나옵니다.
      </Insight>
    </div>
  );
}
