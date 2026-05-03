"use client";

import { BlockMath, InlineMath } from "@/components/math/math-formula";
import { Step, Matrix, Arrow, CalcBox, Insight } from "./shared";

/**
 * 역전파 (Backpropagation) 예제:
 *   예측: [0.20, 0.10, 0.04, 0.55, 0.11] (Softmax 출력)
 *   어휘: ["가", "나", "다", "라", "마"]
 *   정답: "라" (index 3) → one-hot [0, 0, 0, 1, 0]
 *
 *   Cross-entropy loss = -log(0.55) ≈ 0.598
 *
 * 연쇄법칙 (Chain Rule):
 *   L → y → h → x: ∂L/∂x = (∂L/∂y)(∂y/∂h)(∂h/∂x)
 *
 * 파라미터 업데이트:
 *   W = W - lr × ∂L/∂W  (lr = 0.001)
 */

// ── 수치 예제 ──────────────────────────────────────────────
const vocab = ["가", "나", "다", "라", "마"];
const predicted = [0.20, 0.10, 0.04, 0.55, 0.11];
const trueIdx = 3;  // "라"
const oneHot = vocab.map((_, i) => (i === trueIdx ? 1 : 0));

// 크로스 엔트로피 손실
const loss = -Math.log(predicted[trueIdx]);

// 소프트맥스 + 크로스 엔트로피 결합 기울기: ŷ - y
const grad_logits = predicted.map((p, i) => p - oneHot[i]);

// ── 파라미터 업데이트 예시 ─────────────────────────────────
const lr = 0.001;
// 예시 가중치와 기울기
const W_before = [0.5, -0.3, 0.8, 0.2];
const dW = [0.12, -0.05, 0.18, -0.03];  // ∂L/∂W (예시)
const W_after = W_before.map((w, i) => w - lr * dW[i]);

export default function BackpropContent() {
  return (
    <article className="prose-like max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">11. 역전파 (Backpropagation)</h1>
      <p className="text-muted mb-8">
        "손실을 줄이려면 각 파라미터를 얼마나 어느 방향으로 바꿔야 하나" —
        이 질문에 미분(기울기)으로 답하고, 모든 파라미터를 동시에 업데이트합니다.
      </p>

      {/* ── STEP 1: 손실 함수 ── */}
      <Step n={1} label="Cross-Entropy 손실 계산" />
      <CalcBox>
        <p className="text-sm mb-4">
          모델이 예측한 확률 분포와 정답의 차이를 수치로 표현합니다.
          정답 토큰의 확률이 낮을수록 손실이 커집니다.
        </p>
        <BlockMath math="\mathcal{L} = -\sum_{i} y_i \log(\hat{y}_i) = -\log(\hat{y}_{\text{정답}})" />

        <div className="text-sm space-y-2 mb-4">
          <div className="p-3 rounded-lg bg-sidebar-bg border border-sidebar-border">
            <div className="mb-2">예측 확률 vs 정답 (one-hot):</div>
            {vocab.map((word, i) => (
              <div
                key={i}
                className={`flex gap-3 items-center py-1 ${
                  i === trueIdx ? "font-bold text-accent" : "text-muted"
                }`}
              >
                <span className="w-6">"{word}"</span>
                <span>예측={predicted[i].toFixed(2)}</span>
                <span>정답={oneHot[i]}</span>
                {i === trueIdx && <span>← 정답 토큰</span>}
              </div>
            ))}
          </div>
        </div>

        <BlockMath math={`\\mathcal{L} = -\\log(${predicted[trueIdx].toFixed(2)}) \\approx ${loss.toFixed(4)}`} />

        <div className="text-sm mt-3 space-y-1 p-3 rounded-lg bg-sidebar-bg border border-sidebar-border">
          <div>정답 확률 = 0.55 → 손실 = {(-Math.log(0.55)).toFixed(3)}</div>
          <div>정답 확률 = 0.90 → 손실 = {(-Math.log(0.90)).toFixed(3)} (더 작음 ✓)</div>
          <div>정답 확률 = 0.10 → 손실 = {(-Math.log(0.10)).toFixed(3)} (더 큼 ✓)</div>
        </div>
      </CalcBox>

      {/* ── STEP 2: 연쇄법칙 ── */}
      <Step n={2} label="연쇄법칙 (Chain Rule) — 기울기 역방향 전파" />
      <CalcBox>
        <p className="text-sm mb-4">
          손실 L이 파라미터 x에 어떻게 의존하는지 계산합니다.
          여러 레이어를 거친다면 각 레이어의 기울기를 곱해 나갑니다.
        </p>
        <BlockMath math="\frac{\partial \mathcal{L}}{\partial x} = \frac{\partial \mathcal{L}}{\partial y} \cdot \frac{\partial y}{\partial h} \cdot \frac{\partial h}{\partial x}" />

        <div className="text-sm p-4 rounded-lg bg-sidebar-bg border border-sidebar-border space-y-3">
          <div className="font-bold text-center mb-2">2-레이어 예제</div>
          <div className="text-center space-y-1 font-mono">
            <div>입력 x → [레이어 1: h = W₁x] → [레이어 2: y = W₂h] → 손실 L</div>
          </div>
          <div className="border-t border-sidebar-border pt-2 space-y-1">
            <div>∂L/∂y = ŷ - y_true (Softmax+CE 결합 기울기)</div>
            <div>∂y/∂h = W₂ (선형 레이어의 기울기)</div>
            <div>∂h/∂x = W₁ (선형 레이어의 기울기)</div>
            <div className="font-bold text-accent">∂L/∂x = (∂L/∂y) × W₂ × W₁</div>
          </div>
        </div>

        <p className="text-sm text-muted mt-3">
          GPT-3은 96개 레이어 → 기울기를 96번 곱해서 첫 레이어까지 전달합니다.
          잔차 연결이 없으면 기울기가 소실됩니다 (챕터 7 참고).
        </p>
      </CalcBox>

      {/* ── STEP 3: Softmax+CE 기울기 ── */}
      <Step n={3} label="Softmax + Cross-Entropy 결합 기울기" />
      <CalcBox>
        <p className="text-sm mb-4">
          Softmax와 Cross-Entropy를 합쳐 미분하면 놀랍도록 단순해집니다:
        </p>
        <BlockMath math="\frac{\partial \mathcal{L}}{\partial \text{logit}_i} = \hat{y}_i - y_i" />

        <div className="text-sm space-y-2">
          {vocab.map((word, i) => (
            <div key={i} className="flex gap-3 items-center font-mono p-2 rounded-lg bg-sidebar-bg border border-sidebar-border">
              <span className="w-6">"{word}"</span>
              <span>ŷ={predicted[i].toFixed(2)}</span>
              <span>- y={oneHot[i].toFixed(2)}</span>
              <span>=</span>
              <span
                className={`font-bold ${
                  grad_logits[i] > 0
                    ? "text-red-600 dark:text-red-400"
                    : grad_logits[i] < 0
                    ? "text-blue-600 dark:text-blue-400"
                    : ""
                }`}
              >
                {grad_logits[i].toFixed(2)}
                {grad_logits[i] > 0 ? " (↑ 낮춰야 함)" : " (↓ 높여야 함)"}
              </span>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted mt-3">
          정답 "라"의 기울기 = {grad_logits[trueIdx].toFixed(2)} → 이 logit을 높여야 함.
          나머지는 양수 → 낮춰야 함.
        </p>
      </CalcBox>

      {/* ── STEP 4: 파라미터 업데이트 ── */}
      <Step n={4} label="파라미터 업데이트: W ← W - lr × ∂L/∂W" />
      <CalcBox>
        <BlockMath math="W \leftarrow W - \eta \cdot \frac{\partial \mathcal{L}}{\partial W}" />
        <p className="text-sm mb-4">
          학습률 lr = {lr} 예제 (실제 Adam 옵티마이저는 더 복잡하지만 기본 원리는 동일):
        </p>
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <Matrix data={[W_before]} label="W (업데이트 전)" color="default" />
          <Arrow op={`- ${lr} × ∂L/∂W`} />
          <Matrix data={[W_after]} label="W (업데이트 후)" color="green" />
        </div>
        <div className="text-sm font-mono space-y-1 p-3 rounded-lg bg-sidebar-bg border border-sidebar-border">
          {W_before.map((w, i) => (
            <div key={i}>
              dim {i}: {w.toFixed(4)} - {lr} × {dW[i].toFixed(4)} = <strong>{W_after[i].toFixed(4)}</strong>
            </div>
          ))}
        </div>
      </CalcBox>

      {/* ── 규모 ── */}
      <CalcBox title="GPT-3의 역전파 규모">
        <div className="text-sm font-mono space-y-2 p-3 rounded-lg bg-sidebar-bg border border-sidebar-border">
          <div>파라미터 수: <strong>175,000,000,000</strong> (175B)</div>
          <div>→ 한 번의 역전파에서 <strong>175B개의 기울기</strong> 계산</div>
          <div>→ 175B개의 파라미터 동시 업데이트</div>
          <div className="text-muted mt-2">학습 배치 1개(= 수천 토큰) 처리 시간: ~초</div>
          <div className="text-muted">전체 학습 (수천억 토큰): 수개월 (A100 GPU 수백 장)</div>
        </div>
      </CalcBox>

      <Insight>
        <strong>역전파의 핵심:</strong> "손실에 기여한 파라미터일수록 더 큰 기울기를 받는다."
        <br /><br />
        정답 토큰의 logit이 낮았다면 그 logit과 연결된 파라미터들이
        큰 음수 기울기를 받아 해당 방향으로 강하게 업데이트됩니다.
        수천억 개의 파라미터를 동시에 조금씩 조정하여
        "다음 토큰 예측"을 점점 잘하게 됩니다 — 이것이 LLM 학습의 전부입니다.
      </Insight>
    </article>
  );
}
