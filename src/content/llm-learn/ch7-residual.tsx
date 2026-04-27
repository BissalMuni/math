"use client";

import { BlockMath, InlineMath } from "@/components/math-formula";
import { Step, Matrix, Arrow, CalcBox, Insight } from "./shared";

/**
 * 잔차 연결 (Residual Connection) 예제:
 *   x = [1.0, -0.5, 0.8, 0.3]  (입력 벡터)
 *   f(x) = [0.2, 0.1, -0.1, 0.4]  (어텐션/FFN 통과 결과)
 *   x + f(x) = [1.2, -0.4, 0.7, 0.7]
 *
 * 역전파 관점:
 *   ∂(x + f(x))/∂x = 1 + ∂f/∂x  → 기울기는 최소 1
 */

// ── 수치 예제 ──────────────────────────────────────────────
const x = [1.0, -0.5, 0.8, 0.3];
const fx = [0.2, 0.1, -0.1, 0.4];
const xPlusFx = x.map((v, i) => v + fx[i]);

// ── 깊은 네트워크 기울기 소실 시뮬레이션 ──────────────────
// 레이어당 기울기 0.5씩 곱해지는 경우
const gradients_no_residual = [1.0, 0.5, 0.25, 0.125, 0.0625, 0.0313];
// 잔차 연결 시: 최소 1이 보장 (1 + ∂f/∂x ≥ 1)
const gradients_residual = [1.0, 1.1, 1.05, 0.98, 1.02, 1.0];

export default function ResidualContent() {
  return (
    <article className="prose-like max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">7. 잔차 연결 (Residual Connection)</h1>
      <p className="text-muted mb-8">
        깊은 신경망의 고질적 문제인 <strong>기울기 소실</strong>을 해결하는 핵심 기법입니다.
        원본 신호를 그대로 더함으로써 역전파 신호가 살아남습니다.
      </p>

      {/* ── 문제: 기울기 소실 ── */}
      <CalcBox title="문제: 깊은 네트워크에서 기울기 소실">
        <p className="text-sm mb-4">
          역전파 중 기울기는 레이어를 거슬러 올라갈수록 곱셈으로 전파됩니다.
          각 레이어에서 기울기가 0.5씩 곱해진다면:
        </p>
        <div className="text-sm font-mono space-y-2">
          {gradients_no_residual.map((g, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-muted w-16">레이어 {i}</span>
              <div
                className="h-4 bg-red-400 rounded"
                style={{ width: `${Math.max(g * 200, 2)}px`, minWidth: "2px" }}
              />
              <span className={g < 0.1 ? "text-red-600 font-bold" : ""}>
                {g.toFixed(4)}
              </span>
            </div>
          ))}
        </div>
        <p className="text-sm text-red-600 dark:text-red-400 mt-3 font-medium">
          6레이어 후 기울기가 0.03으로 감소 → 초기 레이어가 거의 학습되지 않음!
        </p>
      </CalcBox>

      {/* ── STEP 1: 해결책 ── */}
      <Step n={1} label="해결책: x + f(x) — 원본 신호를 그대로 더하기" />
      <CalcBox>
        <p className="text-sm mb-4">
          서브레이어(어텐션 또는 FFN) 출력 f(x)에 원본 입력 x를 더합니다.
          네트워크는 f(x) = 변화량만 학습하면 됩니다.
        </p>
        <BlockMath math="\text{Output} = x + f(x)" />
        <div className="text-sm mt-4 p-4 rounded-lg bg-sidebar-bg border border-sidebar-border font-mono space-y-2">
          <div className="text-muted">비유: 원본 편지에 수정사항만 메모 추가</div>
          <div>원본 편지 (x)     = 훼손하지 않고 그대로 전달</div>
          <div>수정 메모 f(x)    = 어텐션/FFN이 배운 변화량</div>
          <div className="font-bold text-accent">결과 = 원본 + 수정사항</div>
        </div>
      </CalcBox>

      {/* ── STEP 2: 실제 수치 예제 ── */}
      <Step n={2} label="수치 예제: 벡터 덧셈" />
      <CalcBox>
        <p className="text-sm mb-4">
          어텐션 서브레이어를 통과한 결과에 잔차 연결을 적용합니다.
        </p>
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <Matrix data={[x]} label="x (입력, 1×4)" color="blue" />
          <Arrow op="+" />
          <Matrix data={[fx]} label="f(x) (어텐션 출력, 1×4)" color="green" />
          <Arrow op="=" />
          <Matrix data={[xPlusFx]} label="x + f(x) (1×4)" color="orange" />
        </div>
        <div className="text-sm space-y-1 font-mono p-3 rounded-lg bg-sidebar-bg border border-sidebar-border">
          {x.map((v, i) => (
            <div key={i}>
              dim {i}: {v.toFixed(1)} + {fx[i].toFixed(1)} = <strong>{xPlusFx[i].toFixed(1)}</strong>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted mt-3">
          f(x)의 각 값이 작더라도, 원본 x가 그대로 유지되어
          정보 손실 없이 다음 레이어로 전달됩니다.
        </p>
      </CalcBox>

      {/* ── STEP 3: 역전파 수학 ── */}
      <Step n={3} label="왜 기울기 소실이 해결되는가? — 미분" />
      <CalcBox>
        <p className="text-sm mb-4">
          잔차 연결이 있는 함수를 x에 대해 미분합니다:
        </p>
        <BlockMath math="\frac{\partial}{\partial x}(x + f(x)) = 1 + \frac{\partial f}{\partial x}" />
        <div className="text-sm space-y-3 mt-4">
          <div className="p-3 rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <div className="font-bold text-red-700 dark:text-red-300">잔차 연결 없음:</div>
            <div className="font-mono mt-1">
              <InlineMath math="\frac{\partial f}{\partial x}" /> — 이 값이 작으면 기울기 소실
            </div>
          </div>
          <div className="p-3 rounded-lg border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <div className="font-bold text-green-700 dark:text-green-300">잔차 연결 있음:</div>
            <div className="font-mono mt-1">
              <InlineMath math="1 + \frac{\partial f}{\partial x}" /> — 최소값이 1 (∂f/∂x가 작아도)
            </div>
          </div>
        </div>
        <div className="text-sm mt-4 space-y-2">
          <p className="font-medium">잔차 연결 있을 때 기울기 (동일 조건):</p>
          <div className="font-mono space-y-1">
            {gradients_residual.map((g, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-muted w-16">레이어 {i}</span>
                <div
                  className="h-4 bg-green-400 rounded"
                  style={{ width: `${Math.max(g * 80, 10)}px` }}
                />
                <span className="text-green-700 dark:text-green-300">{g.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <p className="text-green-700 dark:text-green-300 font-medium">
            기울기가 1 근처에서 안정 → 초기 레이어도 충분히 학습됨!
          </p>
        </div>
      </CalcBox>

      {/* ── 트랜스포머에서 사용되는 위치 ── */}
      <CalcBox title="트랜스포머에서 잔차 연결 위치">
        <div className="text-sm space-y-2 font-mono">
          <div className="p-2 rounded bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
            x → [Multi-Head Attention] → f₁(x) → <strong>x + f₁(x)</strong> → LayerNorm
          </div>
          <div className="p-2 rounded bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
            x → [Feed-Forward Network] → f₂(x) → <strong>x + f₂(x)</strong> → LayerNorm
          </div>
        </div>
        <p className="text-sm text-muted mt-3">
          각 트랜스포머 블록에서 2번의 잔차 연결이 사용됩니다.
          GPT-3(96레이어)처럼 매우 깊은 네트워크를 학습 가능하게 만드는 핵심입니다.
        </p>
      </CalcBox>

      <Insight>
        <strong>잔차 연결의 핵심:</strong> 네트워크가 f(x) = 전체 변환을 학습하는 대신,
        f(x) = 입력 대비 변화량만 학습합니다. 변화량이 0이어도 (f(x)=0)
        원본 x가 그대로 전달되므로, 불필요한 레이어는 자연스럽게 항등함수(identity)가 됩니다.
        이것이 ResNet(이미지), GPT(언어) 등 현대 딥러닝의 공통 기반입니다.
      </Insight>
    </article>
  );
}
