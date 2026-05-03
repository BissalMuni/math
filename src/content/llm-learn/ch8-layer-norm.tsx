"use client";

import { BlockMath, InlineMath } from "@/components/math/math-formula";
import { Matrix, Arrow, CalcBox, Insight } from "@/components/content/shared";

/**
 * Layer Normalization 예제:
 *   v = [2.0, 4.0, 1.0, 3.0]
 *
 *   μ = (2+4+1+3)/4 = 2.5
 *   σ² = ((2-2.5)² + (4-2.5)² + (1-2.5)² + (3-2.5)²) / 4
 *      = (0.25 + 2.25 + 2.25 + 0.25) / 4 = 1.25
 *   σ = √1.25 ≈ 1.118
 *   normalized = (v - μ) / σ = [-0.447, 1.342, -1.342, 0.447]
 *   output = γ × normalized + β  (γ=1, β=0 초기값)
 */

// ── 수치 계산 ──────────────────────────────────────────────
const v = [2.0, 4.0, 1.0, 3.0];
const mu = v.reduce((a, b) => a + b, 0) / v.length;  // 2.5
const variance = v.reduce((s, x) => s + (x - mu) ** 2, 0) / v.length;  // 1.25
const sigma = Math.sqrt(variance);  // 1.118...
const normalized = v.map(x => (x - mu) / sigma);

// γ=1, β=0 (초기값) → 출력 = normalized
const gamma = 1.0;
const beta = 0.0;
const output = normalized.map(x => gamma * x + beta);

// Batch Norm vs Layer Norm 비교를 위한 설명용 수치
const afterNorm_mean = normalized.reduce((a, b) => a + b, 0) / normalized.length;
const afterNorm_var = normalized.reduce((s, x) => s + (x - afterNorm_mean) ** 2, 0) / normalized.length;

export default function LayerNormContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        각 레이어 출력값의 범위를 안정화해 학습을 빠르고 안정적으로 만듭니다.
        트랜스포머에서 잔차 연결 직후에 적용됩니다: <strong>LayerNorm(x + f(x))</strong>
      </p>

      {/* ── 왜 필요한가 ── */}
      <CalcBox title="왜 정규화가 필요한가?">
        <p className="text-sm mb-3">
          레이어를 거칠수록 값의 범위가 폭발적으로 커지거나 0에 수렴할 수 있습니다.
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <div className="font-bold text-red-700 dark:text-red-300 mb-1">문제 — 폭발</div>
            <div className="font-mono text-xs">[127.3, -89.1, 342.0, ...]</div>
            <div className="text-muted text-xs mt-1">기울기도 폭발 → 학습 불안정</div>
          </div>
          <div className="p-3 rounded-lg border border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
            <div className="font-bold text-orange-700 dark:text-orange-300 mb-1">문제 — 소실</div>
            <div className="font-mono text-xs">[0.001, 0.0002, 0.003, ...]</div>
            <div className="text-muted text-xs mt-1">기울기도 소실 → 학습 안 됨</div>
          </div>
        </div>
        <div className="p-3 rounded-lg border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950 mt-3 text-sm">
          <div className="font-bold text-green-700 dark:text-green-300 mb-1">해결 — Layer Norm 후</div>
          <div className="font-mono text-xs">[-0.447, 1.342, -1.342, 0.447]</div>
          <div className="text-muted text-xs mt-1">평균≈0, 표준편차≈1 → 안정적</div>
        </div>
      </CalcBox>

      {/* ── STEP 1: 평균 ── */}
      <CalcBox title="① 평균(μ) 계산">
        <p className="text-sm mb-3">
          입력 벡터 v = [{v.join(", ")}]의 평균을 구합니다.
        </p>
        <BlockMath math="\mu = \frac{1}{d}\sum_{i=1}^{d} v_i = \frac{2.0 + 4.0 + 1.0 + 3.0}{4} = \frac{10.0}{4} = 2.5" />
      </CalcBox>

      {/* ── STEP 2: 분산 ── */}
      <CalcBox title="② 분산(σ²) 계산">
        <BlockMath math="\sigma^2 = \frac{1}{d}\sum_{i=1}^{d}(v_i - \mu)^2" />
        <div className="text-sm font-mono space-y-1 p-3 rounded-lg bg-sidebar-bg border border-sidebar-border mb-3">
          <div>(2.0 - 2.5)² = (-0.5)² = <strong>0.25</strong></div>
          <div>(4.0 - 2.5)² = ( 1.5)² = <strong>2.25</strong></div>
          <div>(1.0 - 2.5)² = (-1.5)² = <strong>2.25</strong></div>
          <div>(3.0 - 2.5)² = ( 0.5)² = <strong>0.25</strong></div>
          <div className="border-t border-sidebar-border mt-1 pt-1">
            σ² = (0.25 + 2.25 + 2.25 + 0.25) / 4 = 5.0 / 4 = <strong>{variance.toFixed(4)}</strong>
          </div>
        </div>
      </CalcBox>

      {/* ── STEP 3: 표준편차 ── */}
      <CalcBox title="③ 표준편차(σ) 계산">
        <BlockMath math="\sigma = \sqrt{\sigma^2} = \sqrt{1.25} \approx 1.118" />
        <p className="text-sm text-muted">
          실제 구현에서는 수치 안정성을 위해 <InlineMath math="\sqrt{\sigma^2 + \epsilon}" /> 사용
          (ε ≈ 1e-5)
        </p>
      </CalcBox>

      {/* ── STEP 4: 정규화 ── */}
      <CalcBox title="④ 정규화: (v - μ) / σ">
        <BlockMath math="\hat{v}_i = \frac{v_i - \mu}{\sigma}" />
        <div className="text-sm font-mono space-y-1 p-3 rounded-lg bg-sidebar-bg border border-sidebar-border mb-3">
          {v.map((val, i) => (
            <div key={i}>
              ({val.toFixed(1)} - 2.5) / 1.118 = {(val - mu).toFixed(1)} / 1.118 ={" "}
              <strong>{normalized[i].toFixed(3)}</strong>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <Matrix data={[v]} label="입력 v" color="default" />
          <Arrow op="LayerNorm" />
          <Matrix data={[normalized]} label="정규화된 v̂" color="blue" />
        </div>
        <p className="text-sm text-muted mt-3">
          결과: 평균 ≈ {afterNorm_mean.toFixed(4)}, 분산 ≈ {afterNorm_var.toFixed(4)} ✓
        </p>
      </CalcBox>

      {/* ── STEP 5: γ, β 학습 파라미터 ── */}
      <CalcBox title="⑤ 학습 파라미터 γ(scale), β(shift) 적용">
        <p className="text-sm mb-4">
          정규화 후 고정 범위(평균=0, 분산=1)로만 있으면 표현력이 제한됩니다.
          학습 가능한 γ와 β로 최적 범위를 모델이 스스로 학습합니다.
        </p>
        <BlockMath math="\text{LayerNorm}(v)_i = \gamma \cdot \hat{v}_i + \beta" />
        <div className="text-sm p-3 rounded-lg bg-sidebar-bg border border-sidebar-border mb-3">
          <div>초기값: γ = {gamma.toFixed(1)} (scale = 1), β = {beta.toFixed(1)} (shift = 0)</div>
          <div className="mt-1">초기 출력 = 1.0 × [{normalized.map(v => v.toFixed(3)).join(", ")}] + 0.0</div>
          <div className="font-bold mt-1">= [{output.map(v => v.toFixed(3)).join(", ")}]</div>
        </div>
        <p className="text-sm text-muted">
          학습이 진행되면 γ, β도 역전파로 업데이트됩니다.
          예: γ=[1.2, 0.8, 1.5, 1.0], β=[0.1, -0.2, 0.0, 0.3] 등으로 학습될 수 있음.
        </p>
      </CalcBox>

      {/* ── Layer Norm vs Batch Norm ── */}
      <CalcBox title="Layer Norm vs Batch Norm">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-bold mb-2 text-orange-700 dark:text-orange-300">Batch Norm</div>
            <div className="text-muted space-y-1">
              <div>정규화 방향: 배치 차원</div>
              <div>배치 내 같은 위치 토큰들을 기준으로 정규화</div>
              <div>배치 크기에 민감</div>
              <div>→ 이미지 모델에 적합</div>
            </div>
          </div>
          <div>
            <div className="font-bold mb-2 text-blue-700 dark:text-blue-300">Layer Norm ✓</div>
            <div className="text-muted space-y-1">
              <div>정규화 방향: 피처(차원) 차원</div>
              <div>각 토큰의 모든 차원을 기준으로 정규화</div>
              <div>배치 크기 독립적</div>
              <div>→ 시퀀스 모델에 적합</div>
            </div>
          </div>
        </div>
      </CalcBox>

      <Insight>
        <strong>Layer Norm이 값 범위를 안정화하는 이유:</strong>
        <br />
        정규화 후 출력은 항상 평균=0, 분산=1인 분포를 가집니다.
        이는 활성화 함수(ReLU, GELU 등)가 안정적으로 동작하는 범위를 유지시킵니다.
        학습자가 독립적으로 도출한 통찰 — "Norm이 값 범위를 안정화한다" — 이
        바로 이 원리입니다. γ, β로 이후 학습에서 최적 범위로 조정됩니다.
      </Insight>
    </div>
  );
}
