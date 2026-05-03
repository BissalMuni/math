"use client";

import { BlockMath, InlineMath } from "@/components/math/math-formula";
import { Step, Matrix, Arrow, CalcBox, Insight } from "@/components/content/shared";

/**
 * 출력 레이어 (LM Head) 예제:
 *   마지막 트랜스포머 블록 출력의 마지막 토큰 벡터 (512-dim)
 *   → W_lm_head(512 × 50257) → logits(50257-dim)
 *   → Softmax → 확률 분포
 *
 * 축소 예제: 512-dim → vocab=5
 *   logits = [1.2, 0.5, -0.3, 2.1, 0.8]
 *   vocab  = ["가", "나", "다", "오늘", "마"]
 *
 * 온도별 분포 변화도 보여줌.
 */

// ── 소프트맥스 (온도 포함) ─────────────────────────────────
function softmaxTemp(logits: number[], temp: number): number[] {
  const scaled = logits.map(v => v / temp);
  const exps = scaled.map(v => Math.exp(v));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(e => e / sum);
}

// ── 예제 데이터 ────────────────────────────────────────────
const vocab = ["가", "나", "다", "오늘", "마"];
const logits = [1.2, 0.5, -0.3, 2.1, 0.8];

const prob_T10 = softmaxTemp(logits, 1.0);
const prob_T05 = softmaxTemp(logits, 0.5);
const prob_T20 = softmaxTemp(logits, 2.0);

// 가장 높은 확률 토큰 인덱스
const topIdx = prob_T10.indexOf(Math.max(...prob_T10));

export default function OutputContent() {
  return (
    <article className="prose-like max-w-3xl">
      <p className="text-muted mb-8">
        모든 트랜스포머 블록을 통과한 마지막 벡터를 어휘 사전 크기의 확률 분포로 변환합니다.
        가장 높은 확률의 토큰이 다음 단어로 선택됩니다.
      </p>

      {/* ── 전체 흐름 ── */}
      <CalcBox title="출력 생성 전체 흐름">
        <div className="text-sm font-mono space-y-2">
          <div className="p-2 rounded bg-sidebar-bg border border-sidebar-border">
            입력 문장 → 트랜스포머 N블록 → <strong>마지막 토큰 벡터</strong> (512-dim)
          </div>
          <div className="text-center text-muted">↓ W_lm_head (512 × 50,257)</div>
          <div className="p-2 rounded bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
            <strong>logits</strong> (50,257-dim) — 어휘 전체에 대한 원시 점수
          </div>
          <div className="text-center text-muted">↓ Softmax</div>
          <div className="p-2 rounded bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
            <strong>확률 분포</strong> (50,257-dim, 합=1) — 다음 토큰 선택
          </div>
        </div>
      </CalcBox>

      {/* ── STEP 1: LM Head 규모 ── */}
      <Step n={1} label="LM Head 행렬 크기 (GPT-2 기준)" />
      <CalcBox>
        <p className="text-sm mb-4">
          GPT-2의 어휘 크기는 50,257개 (BPE 토큰 기준).
          마지막 벡터를 선형 변환으로 logits를 만듭니다.
        </p>
        <BlockMath math="\text{logits} = W_{\text{lm\_head}} \cdot h_{\text{last}} + b" />
        <div className="text-sm font-mono p-3 rounded-lg bg-sidebar-bg border border-sidebar-border">
          <div>h_last 크기:      512</div>
          <div>W_lm_head 크기:   512 × 50,257</div>
          <div className="font-bold">파라미터 수:      512 × 50,257 = 25,731,584</div>
          <div className="text-muted mt-1">출력 logits 크기: 50,257-dim</div>
        </div>
      </CalcBox>

      {/* ── STEP 2: 예제 계산 ── */}
      <Step n={2} label="Softmax로 확률 변환 (축소 예제: vocab=5)" />
      <CalcBox>
        <p className="text-sm mb-4">
          어휘를 5개로 축소한 예제입니다.
          logits = {JSON.stringify(logits)}
        </p>
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <Matrix data={[logits]} label="logits (1×5)" color="default" />
          <Arrow op="Softmax" />
          <Matrix data={[prob_T10]} label="확률 (T=1.0)" color="blue" />
        </div>

        <div className="text-sm space-y-2">
          {vocab.map((word, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-2 rounded-lg ${
                i === topIdx
                  ? "bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700"
                  : "bg-sidebar-bg border border-sidebar-border"
              }`}
            >
              <span className="font-bold w-12 text-center">"{word}"</span>
              <div
                className={`h-5 rounded ${i === topIdx ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}`}
                style={{ width: `${prob_T10[i] * 200}px` }}
              />
              <span className="font-mono">
                logit {logits[i].toFixed(1)} → <strong>{(prob_T10[i] * 100).toFixed(1)}%</strong>
                {i === topIdx ? " ← 선택!" : ""}
              </span>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted mt-3">
          "{vocab[topIdx]}"가 {(prob_T10[topIdx] * 100).toFixed(0)}% 확률로 선택됩니다.
        </p>
      </CalcBox>

      {/* ── STEP 3: 온도 효과 ── */}
      <Step n={3} label="온도(Temperature)로 다양성 조절" />
      <CalcBox>
        <p className="text-sm mb-4">
          logits를 온도 T로 나눈 뒤 Softmax를 적용합니다.
          T가 낮을수록 더 결정적, 높을수록 더 무작위적인 출력이 나옵니다.
        </p>
        <BlockMath math="P(\text{token}) = \text{softmax}\!\left(\frac{\text{logits}}{T}\right)" />

        <div className="space-y-4 text-sm">
          {/* T=0.5 */}
          <div>
            <div className="font-bold text-red-700 dark:text-red-300 mb-1">T=0.5 (날카롭게 — 더 결정적)</div>
            <div className="space-y-1">
              {vocab.map((word, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-10 text-right font-mono text-xs">"{word}"</span>
                  <div
                    className="h-4 bg-red-400 rounded"
                    style={{ width: `${prob_T05[i] * 200}px`, minWidth: "2px" }}
                  />
                  <span className="font-mono text-xs">{(prob_T05[i] * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* T=1.0 */}
          <div>
            <div className="font-bold text-blue-700 dark:text-blue-300 mb-1">T=1.0 (기본값)</div>
            <div className="space-y-1">
              {vocab.map((word, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-10 text-right font-mono text-xs">"{word}"</span>
                  <div
                    className="h-4 bg-blue-400 rounded"
                    style={{ width: `${prob_T10[i] * 200}px`, minWidth: "2px" }}
                  />
                  <span className="font-mono text-xs">{(prob_T10[i] * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* T=2.0 */}
          <div>
            <div className="font-bold text-green-700 dark:text-green-300 mb-1">T=2.0 (부드럽게 — 더 다양)</div>
            <div className="space-y-1">
              {vocab.map((word, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-10 text-right font-mono text-xs">"{word}"</span>
                  <div
                    className="h-4 bg-green-400 rounded"
                    style={{ width: `${prob_T20[i] * 200}px`, minWidth: "2px" }}
                  />
                  <span className="font-mono text-xs">{(prob_T20[i] * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalcBox>

      {/* ── 반복 생성 ── */}
      <CalcBox title="다음 토큰 선택 → 반복 생성">
        <p className="text-sm mb-3">
          선택된 토큰을 입력에 추가하고 다시 트랜스포머를 실행합니다.
          이 과정을 반복하여 전체 문장을 생성합니다.
        </p>
        <div className="text-sm font-mono space-y-1 p-3 rounded-lg bg-sidebar-bg border border-sidebar-border">
          <div>입력: "오늘" → 출력: "날씨가" (55%)</div>
          <div>입력: "오늘 날씨가" → 출력: "정말" (42%)</div>
          <div>입력: "오늘 날씨가 정말" → 출력: "좋네요" (61%)</div>
          <div>입력: "오늘 날씨가 정말 좋네요" → 출력: "&lt;EOS&gt;" (78%)</div>
        </div>
        <p className="text-sm text-muted mt-2">
          &lt;EOS&gt; (End of Sequence) 토큰이 나오면 생성을 멈춥니다.
        </p>
      </CalcBox>

      <Insight>
        <strong>Weight Tying:</strong> 많은 LLM에서 입력 임베딩 행렬과 LM Head 행렬을 공유합니다
        (같은 가중치를 전치해서 사용). GPT-2도 이 방식을 채택했습니다.
        vocab=50,257, d_model=512라면 약 2,500만 파라미터를 절약합니다.
        이는 "같은 단어의 입력 표현과 출력 표현이 일관성을 가져야 한다"는
        직관과도 일치합니다.
      </Insight>
    </article>
  );
}
