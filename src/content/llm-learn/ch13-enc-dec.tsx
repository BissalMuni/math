"use client";

import { BlockMath, InlineMath } from "@/components/math/math-formula";
import { Step, Matrix, Arrow, CalcBox, Insight } from "@/components/content/shared";

/**
 * 인코더/디코더 아키텍처 비교:
 *   - Encoder-only: BERT (양방향, 문장 이해)
 *   - Decoder-only: GPT (단방향, 텍스트 생성)
 *   - Encoder+Decoder: T5, BART (번역, 요약)
 *
 * 인과 마스크(Causal Mask) 예제:
 *   3×3 행렬 [[1,0,0],[1,1,0],[1,1,1]]
 *   → 각 토큰은 자신과 그 이전 토큰만 봄
 */

// ── 인과 마스크 (3토큰) ────────────────────────────────────
const causalMask: (number | string)[][] = [
  [1, 0, 0],  // 토큰 0: 자신만 봄
  [1, 1, 0],  // 토큰 1: 0, 1 봄
  [1, 1, 1],  // 토큰 2: 0, 1, 2 모두 봄
];

// ── BERT MLM 예제 ──────────────────────────────────────────
const bertExample = {
  input:  ["나는", "[MASK]", "좋아한다"],
  output: ["나는", "사과를",   "좋아한다"],
};

export default function EncoderDecoderContent() {
  return (
    <article className="prose-like max-w-3xl">
      <p className="text-muted mb-8">
        트랜스포머는 목적에 따라 세 가지 변형이 있습니다.
        어텐션이 "어떤 방향으로" 흐를 수 있는지가 핵심 차이입니다.
      </p>

      {/* ── 세 가지 아키텍처 비교 ── */}
      <CalcBox title="아키텍처 3종 비교">
        <div className="space-y-4 text-sm">
          {/* Encoder-only */}
          <div className="p-4 rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
            <div className="font-bold text-blue-700 dark:text-blue-300 text-base mb-2">
              Encoder-only (BERT, RoBERTa)
            </div>
            <div className="space-y-2">
              <div>
                <span className="font-semibold">어텐션 방향:</span>{" "}
                <span className="text-blue-700 dark:text-blue-300 font-bold">양방향 (bidirectional)</span>
                — 모든 토큰이 모든 토큰을 봄
              </div>
              <div>
                <span className="font-semibold">학습 방법:</span> Masked Language Modeling (MLM)
              </div>
              <div>
                <span className="font-semibold">주요 용도:</span> 분류, 개체명 인식(NER), 문장 유사도, 질의응답
              </div>
              <div className="font-mono text-xs p-2 rounded bg-blue-100 dark:bg-blue-900 mt-1">
                "나는 [MASK] 좋아한다" → 빈칸: "사과를" 예측
              </div>
            </div>
          </div>

          {/* Decoder-only */}
          <div className="p-4 rounded-lg border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <div className="font-bold text-green-700 dark:text-green-300 text-base mb-2">
              Decoder-only (GPT, LLaMA, Claude)
            </div>
            <div className="space-y-2">
              <div>
                <span className="font-semibold">어텐션 방향:</span>{" "}
                <span className="text-green-700 dark:text-green-300 font-bold">단방향 (causal)</span>
                — 자신과 이전 토큰만 봄
              </div>
              <div>
                <span className="font-semibold">학습 방법:</span> Next Token Prediction (자기회귀)
              </div>
              <div>
                <span className="font-semibold">주요 용도:</span> 텍스트 생성, 대화, 코드 작성
              </div>
              <div className="font-mono text-xs p-2 rounded bg-green-100 dark:bg-green-900 mt-1">
                "나는 사과를" → 다음: "좋아한다" 예측
              </div>
            </div>
          </div>

          {/* Encoder+Decoder */}
          <div className="p-4 rounded-lg border border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950">
            <div className="font-bold text-purple-700 dark:text-purple-300 text-base mb-2">
              Encoder + Decoder (T5, BART, mT5)
            </div>
            <div className="space-y-2">
              <div>
                <span className="font-semibold">인코더:</span> 입력 전체를 양방향으로 이해
              </div>
              <div>
                <span className="font-semibold">디코더:</span> 인코더 출력 + 자신의 이전 출력을 참고해 생성
              </div>
              <div>
                <span className="font-semibold">주요 용도:</span> 번역, 요약, 질의응답 (긴 입력→짧은 출력)
              </div>
              <div className="font-mono text-xs p-2 rounded bg-purple-100 dark:bg-purple-900 mt-1">
                인코더: "I love apples" → 디코더: "나는 사과를 좋아합니다"
              </div>
            </div>
          </div>
        </div>
      </CalcBox>

      {/* ── STEP 1: BERT MLM ── */}
      <Step n={1} label="Encoder-only: BERT의 Masked Language Modeling" />
      <CalcBox>
        <p className="text-sm mb-4">
          입력의 15%를 [MASK]로 가리고, 양방향 컨텍스트를 활용해 원래 단어를 예측합니다.
          "나는 _____ 좋아한다" → 앞뒤 문맥 모두 활용 가능.
        </p>
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <div className="flex gap-2">
            {bertExample.input.map((tok, i) => (
              <div
                key={i}
                className={`px-3 py-2 rounded-lg text-sm font-mono border ${
                  tok === "[MASK]"
                    ? "bg-orange-100 dark:bg-orange-950 border-orange-400 text-orange-700 dark:text-orange-300 font-bold"
                    : "bg-sidebar-bg border-sidebar-border"
                }`}
              >
                {tok}
              </div>
            ))}
          </div>
          <Arrow op="BERT" />
          <div className="flex gap-2">
            {bertExample.output.map((tok, i) => (
              <div
                key={i}
                className={`px-3 py-2 rounded-lg text-sm font-mono border ${
                  i === 1
                    ? "bg-blue-100 dark:bg-blue-950 border-blue-400 text-blue-700 dark:text-blue-300 font-bold"
                    : "bg-sidebar-bg border-sidebar-border"
                }`}
              >
                {tok}
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-muted">
          어텐션이 양방향이므로 [MASK]는 "나는"(앞)과 "좋아한다"(뒤) 모두를 참고합니다.
        </p>
      </CalcBox>

      {/* ── STEP 2: 인과 마스크 ── */}
      <Step n={2} label="Decoder-only: 인과 마스크 (Causal Mask)" />
      <CalcBox>
        <p className="text-sm mb-4">
          GPT는 디코더 전용이라 <strong>자기가 생성한 내용만 볼 수 있습니다</strong>.
          어텐션 점수 행렬에 삼각형 마스크를 씌워 미래 토큰을 차단합니다.
        </p>
        <div className="flex flex-wrap gap-6 items-start mb-4">
          <div>
            <p className="text-xs text-muted font-mono mb-2">인과 마스크 (3×3)</p>
            <Matrix
              data={causalMask}
              label='토큰: ["나는", "사과를", "좋아한다"]'
              color="green"
            />
          </div>
          <div className="text-sm space-y-2 self-center">
            <div className="flex gap-2 items-center">
              <span className="font-mono font-bold">행 0</span>
              <span>"나는" → [나는] 만 봄</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="font-mono font-bold">행 1</span>
              <span>"사과를" → [나는, 사과를] 봄</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="font-mono font-bold">행 2</span>
              <span>"좋아한다" → 전체 봄</span>
            </div>
          </div>
        </div>
        <div className="text-sm p-3 rounded-lg bg-sidebar-bg border border-sidebar-border">
          <div className="font-bold mb-2">마스크 적용 방법:</div>
          <div className="font-mono text-xs space-y-1">
            <div>마스크=0인 위치 → 어텐션 점수를 -∞로 설정</div>
            <div>Softmax(-∞) = 0 → 미래 토큰에 주의 0%</div>
          </div>
        </div>
      </CalcBox>

      {/* ── STEP 3: Cross-Attention ── */}
      <Step n={3} label="Encoder+Decoder: Cross-Attention" />
      <CalcBox>
        <p className="text-sm mb-4">
          Encoder+Decoder 구조에서 디코더는 두 종류의 어텐션을 수행합니다:
        </p>
        <div className="space-y-3 text-sm">
          <div className="p-3 rounded-lg border border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950">
            <div className="font-bold text-purple-700 dark:text-purple-300 mb-1">
              ① Self-Attention (인과적)
            </div>
            <div className="text-muted">
              디코더가 자신이 이미 생성한 토큰들만 참고 (GPT와 동일)
            </div>
          </div>
          <div className="p-3 rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
            <div className="font-bold text-blue-700 dark:text-blue-300 mb-1">
              ② Cross-Attention (핵심!)
            </div>
            <div className="text-muted">
              Q: 디코더의 현재 상태<br />
              K, V: 인코더의 출력 (입력 문장 전체 표현)<br />
              → "원문의 어떤 부분을 번역 중인가?" 결정
            </div>
          </div>
        </div>
        <BlockMath math="\text{CrossAttn}(Q_{\text{dec}}, K_{\text{enc}}, V_{\text{enc}}) = \text{softmax}\!\left(\frac{Q_{\text{dec}} K_{\text{enc}}^T}{\sqrt{d_k}}\right) V_{\text{enc}}" />
      </CalcBox>

      {/* ── 모델별 비교표 ── */}
      <CalcBox title="주요 모델 비교">
        <div className="overflow-x-auto">
          <table className="text-sm w-full">
            <thead>
              <tr className="border-b border-sidebar-border">
                <th className="text-left py-2 pr-4">모델</th>
                <th className="text-left py-2 pr-4">아키텍처</th>
                <th className="text-left py-2 pr-4">대표 용도</th>
              </tr>
            </thead>
            <tbody className="space-y-1">
              {[
                ["BERT", "Encoder-only", "문장 분류, NER"],
                ["GPT-4", "Decoder-only", "텍스트 생성, 대화"],
                ["LLaMA 3", "Decoder-only", "오픈소스 생성 모델"],
                ["Claude", "Decoder-only", "대화, 분석, 코드"],
                ["T5", "Encoder+Decoder", "번역, 요약"],
                ["BART", "Encoder+Decoder", "요약, 번역"],
              ].map(([model, arch, use]) => (
                <tr key={model} className="border-b border-sidebar-border/50">
                  <td className="py-2 pr-4 font-bold">{model}</td>
                  <td className="py-2 pr-4 text-muted">{arch}</td>
                  <td className="py-2 text-muted">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CalcBox>

      <Insight>
        <strong>"GPT는 디코더 전용이라 자기가 생성한 내용만 볼 수 있음"</strong>
        <br /><br />
        이것이 GPT가 왼쪽에서 오른쪽으로 한 토큰씩 생성하는 이유입니다.
        인과 마스크 덕분에 학습 시에도 미래 정답을 "엿보지 않고" 훈련됩니다.
        반면 BERT는 양방향 컨텍스트를 볼 수 있어 문장 이해에 강하지만,
        새 텍스트를 생성하는 것은 자연스럽지 않습니다.
        어떤 아키텍처가 낫다기보다 목적에 맞는 구조를 선택합니다.
      </Insight>
    </article>
  );
}
