"use client";

import { BlockMath, InlineMath } from "@/components/math-formula";
import { Step, Matrix, Arrow, CalcBox, Insight } from "./shared";

/**
 * Feed-Forward Network (FFN) 예제:
 *   d_model = 4, d_ff = 16 (실제 GPT-3: 12288→49152, 4배 확장)
 *
 *   입력: x = [1.0, -0.5, 0.8, 0.3]
 *   W1: 4→16, b1: 16-dim
 *   ReLU: max(0, h)
 *   W2: 16→4, b2: 4-dim
 *
 * 실제 규모: GPT-3 d_model=12288, d_ff=49152
 */

/** ReLU: max(0, x) */
function relu(x: number): number {
  return Math.max(0, x);
}

/** 행렬-벡터 곱: W(m×n) × x(n) + b(m) → (m) */
function linearLayer(W: number[][], x: number[], b: number[]): number[] {
  return W.map((row, i) =>
    row.reduce((s, w, j) => s + w * x[j], b[i])
  );
}

// ── 입력 벡터 ──────────────────────────────────────────────
const x_input = [1.0, -0.5, 0.8, 0.3];

// ── W1 (16×4) — 예시 가중치 (학습된 값 가정) ──────────────
// 4차원 입력을 16차원으로 확장
const W1: number[][] = [
  [ 0.5,  0.3, -0.2,  0.8], [ 0.1, -0.4,  0.7,  0.2],
  [-0.3,  0.6,  0.1, -0.5], [ 0.4,  0.2, -0.6,  0.3],
  [ 0.7, -0.1,  0.4,  0.6], [-0.2,  0.5, -0.3,  0.1],
  [ 0.3,  0.8,  0.2, -0.4], [ 0.6, -0.3,  0.5, -0.2],
  [-0.4,  0.2,  0.8,  0.1], [ 0.5, -0.6,  0.3,  0.7],
  [ 0.1,  0.4, -0.5,  0.2], [-0.7,  0.3,  0.6, -0.1],
  [ 0.8,  0.1, -0.3,  0.4], [ 0.2, -0.5,  0.7,  0.3],
  [-0.1,  0.7,  0.4, -0.6], [ 0.4,  0.2, -0.1,  0.5],
];
const b1: number[] = Array(16).fill(0.1);

// ── W2 (4×16) — 16차원을 다시 4차원으로 압축 ──────────────
const W2: number[][] = [
  [0.3, -0.1,  0.2,  0.4, -0.3,  0.1,  0.5, -0.2,  0.1,  0.3, -0.4,  0.2,  0.1, -0.3,  0.4,  0.2],
  [0.1,  0.4, -0.3,  0.2,  0.5, -0.1, -0.2,  0.3,  0.4, -0.2,  0.1,  0.5, -0.3,  0.2, -0.1,  0.4],
  [0.4, -0.2,  0.1,  0.3, -0.1,  0.5,  0.3, -0.4,  0.2,  0.1,  0.5, -0.3,  0.4,  0.1, -0.2,  0.3],
  [0.2,  0.3, -0.4,  0.1,  0.4, -0.2,  0.1,  0.5, -0.3,  0.4,  0.2, -0.1,  0.3, -0.4,  0.5,  0.1],
];
const b2: number[] = [0.05, -0.05, 0.05, -0.05];

// ── FFN 계산 ───────────────────────────────────────────────
const h_pre = linearLayer(W1, x_input, b1);       // W1x + b1 (16-dim)
const h_relu = h_pre.map(relu);                    // ReLU(h)
const ffn_output = linearLayer(W2, h_relu, b2);   // W2·ReLU(h) + b2

// ReLU 효과: 음수 → 0이 된 뉴런 수
const zeroed = h_pre.filter(v => v <= 0).length;

export default function FeedForwardContent() {
  return (
    <article className="prose-like max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">9. Feed-Forward Network (FFN)</h1>
      <p className="text-muted mb-8">
        어텐션이 토큰 간 관계를 파악한다면, FFN은 각 토큰에 독립적으로 적용되는
        <strong>"지식 저장소"</strong>입니다. 모델 파라미터의 약 2/3를 차지합니다.
      </p>

      {/* ── FFN의 역할 ── */}
      <CalcBox title="FFN vs 어텐션 — 역할 차이">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
            <div className="font-bold text-blue-700 dark:text-blue-300 mb-1">Multi-Head Attention</div>
            <div className="text-muted space-y-1">
              <div>토큰 간 상호작용</div>
              <div>"어떤 토큰이 중요한가?"</div>
              <div>관계(relation) 파악</div>
            </div>
          </div>
          <div className="p-3 rounded-lg border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <div className="font-bold text-green-700 dark:text-green-300 mb-1">FFN (지식 저장소)</div>
            <div className="text-muted space-y-1">
              <div>토큰 내부 처리 (독립)</div>
              <div>"이 토큰은 무엇을 의미하나?"</div>
              <div>지식(knowledge) 저장</div>
            </div>
          </div>
        </div>
      </CalcBox>

      {/* ── 실제 규모 ── */}
      <CalcBox title="실제 모델 규모">
        <div className="text-sm font-mono space-y-2">
          <div className="p-3 rounded-lg bg-sidebar-bg border border-sidebar-border">
            <div className="font-bold mb-2">GPT-3 FFN 파라미터</div>
            <div>d_model = 12,288</div>
            <div>d_ff    = 49,152  (4배 확장)</div>
            <div className="mt-1">W1: 12,288 × 49,152 = <strong>603,979,776</strong></div>
            <div>W2: 49,152 × 12,288 = <strong>603,979,776</strong></div>
            <div className="text-accent font-bold mt-1">레이어당 약 12억 파라미터!</div>
          </div>
        </div>
      </CalcBox>

      {/* ── STEP 1: W1 계산 ── */}
      <Step n={1} label="W1·x + b1 — 차원 확장 (4 → 16)" />
      <CalcBox>
        <p className="text-sm mb-4">
          입력 x를 더 넓은 공간으로 투영합니다.
          더 많은 뉴런 = 더 다양한 패턴 포착 가능.
        </p>
        <BlockMath math="h = W_1 x + b_1 \quad (4 \to 16\text{ 차원})" />
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <Matrix data={[x_input]} label="x (1×4)" color="default" />
          <Arrow op="× W1(16×4) + b1" />
          <Matrix data={[h_pre.slice(0, 8)]} label="h 앞 8차원" color="blue" />
        </div>
        <div className="text-sm text-muted">
          h 전체 (16차원): [{h_pre.map(v => v.toFixed(2)).join(", ")}]
        </div>
      </CalcBox>

      {/* ── STEP 2: ReLU ── */}
      <Step n={2} label="ReLU — 음수 제거" />
      <CalcBox>
        <BlockMath math="\text{ReLU}(h_i) = \max(0, h_i)" />
        <p className="text-sm mb-4">
          "뉴런이 발화(활성화)하거나 침묵하는 것" —
          음수 값은 0으로, 양수 값은 그대로.
          {zeroed}개 뉴런이 침묵하고 {16 - zeroed}개가 활성화됩니다.
        </p>
        <div className="text-sm space-y-1 font-mono p-3 rounded-lg bg-sidebar-bg border border-sidebar-border mb-3">
          {h_pre.map((v, i) => (
            <div key={i} className={v > 0 ? "text-green-700 dark:text-green-300" : "text-red-500"}>
              dim {i.toString().padStart(2)}: {v.toFixed(3)} →{" "}
              <strong>{relu(v).toFixed(3)}</strong>
              {v <= 0 ? " (침묵)" : " (활성화)"}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <Matrix data={[h_pre.slice(0, 8)]} label="h 앞 8차원" color="blue" />
          <Arrow op="ReLU" />
          <Matrix data={[h_relu.slice(0, 8)]} label="ReLU(h) 앞 8차원" color="green" />
        </div>
      </CalcBox>

      {/* ── STEP 3: W2 계산 ── */}
      <Step n={3} label="W2·ReLU(h) + b2 — 차원 복원 (16 → 4)" />
      <CalcBox>
        <BlockMath math="\text{FFN}(x) = W_2 \cdot \text{ReLU}(W_1 x + b_1) + b_2" />
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <Matrix data={[h_relu.slice(0, 8)]} label="ReLU(h) 앞 8차원" color="green" />
          <Arrow op="× W2(4×16) + b2" />
          <Matrix data={[ffn_output]} label="FFN 출력 (1×4)" color="orange" />
        </div>
        <p className="text-sm text-muted">
          입력과 출력 크기 동일 (4차원) — 잔차 연결에 그대로 더할 수 있습니다.
        </p>
      </CalcBox>

      {/* ── 전체 흐름 ── */}
      <CalcBox title="입력부터 출력까지">
        <div className="flex flex-wrap gap-3 items-center">
          <Matrix data={[x_input]} label="x 입력" color="default" />
          <Arrow op="W1+b1" />
          <Matrix data={[h_pre.slice(0, 4)]} label="h (앞 4)" color="blue" />
          <Arrow op="ReLU" />
          <Matrix data={[h_relu.slice(0, 4)]} label="ReLU(h)" color="green" />
          <Arrow op="W2+b2" />
          <Matrix data={[ffn_output]} label="출력" color="orange" />
        </div>
        <p className="text-sm text-muted mt-3">
          x = [{x_input.join(", ")}] → FFN → [{ffn_output.map(v => v.toFixed(3)).join(", ")}]
        </p>
      </CalcBox>

      {/* ── MoE ── */}
      <CalcBox title="발전: MoE (Mixture of Experts)">
        <p className="text-sm mb-3">
          FFN을 여러 개의 "전문가"로 대체하고, 토큰마다 K개만 활성화합니다.
          총 파라미터는 많지만 실제 연산은 K/N만 수행합니다.
        </p>
        <div className="text-sm font-mono p-3 rounded-lg bg-sidebar-bg border border-sidebar-border">
          <div className="font-bold mb-2">Mixtral 8×7B 예시:</div>
          <div>전문가 수 N = 8 (각각 7B 규모의 FFN)</div>
          <div>토큰당 활성화 K = 2</div>
          <div>총 파라미터: ~47B</div>
          <div>실제 연산 파라미터: ~13B (2/8만 활성화)</div>
          <div className="text-accent mt-1">효율성 = 47B 수준의 지식, 13B 수준의 연산비용</div>
        </div>
      </CalcBox>

      <Insight>
        <strong>FFN = LLM의 "장기 기억"</strong>
        <br />
        어텐션이 "이 문장에서 어떤 단어들이 서로 관련 있나?"를 파악한다면,
        FFN은 "파리는 프랑스의 수도다", "사과는 과일이다" 같은
        사실적 지식을 파라미터에 저장합니다.
        실험적으로 FFN 뉴런들은 특정 사실을 저장하는 "키-값 메모리"처럼 작동합니다.
        이것이 GPT가 학습 데이터의 사실을 "기억"하는 원리입니다.
      </Insight>
    </article>
  );
}
