"use client";

import { BlockMath, InlineMath } from "@/components/math-formula";
import { Step, Matrix, Arrow, CalcBox, Insight } from "./shared";

/**
 * 예제 설정:
 * 문장: "나는 사과를 좋아한다" → 3개 토큰
 * d_model = 4 (실제는 512, 여기선 4로 축소)
 *
 * 위치 인코딩 공식:
 *   PE(pos, 2i)   = sin(pos / 10000^(2i/d_model))
 *   PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))
 *
 * d_model=4이므로 i=0,1 → 차원 0,1,2,3
 *   dim 0 (i=0): sin(pos / 10000^(0/4)) = sin(pos / 1)
 *   dim 1 (i=0): cos(pos / 10000^(0/4)) = cos(pos / 1)
 *   dim 2 (i=1): sin(pos / 10000^(2/4)) = sin(pos / 100)
 *   dim 3 (i=1): cos(pos / 10000^(2/4)) = cos(pos / 100)
 */

// ── 위치 인코딩 계산 ────────────────────────────────────────
function pe(pos: number, i: number, d_model: number): number {
  const denom = Math.pow(10000, (2 * i) / d_model);
  return i % 2 === 0
    ? Math.sin(pos / denom)
    : Math.cos(pos / Math.pow(10000, (2 * Math.floor(i / 2)) / d_model));
}

const d_model = 4;
// PE 행렬: 3토큰 × 4차원
const PE: number[][] = [0, 1, 2].map(pos =>
  [0, 1, 2, 3].map(dim => {
    const i = Math.floor(dim / 2);
    const denom = Math.pow(10000, (2 * i) / d_model);
    return dim % 2 === 0 ? Math.sin(pos / denom) : Math.cos(pos / denom);
  })
);

// 임베딩 벡터 (학습된 값 가정)
const X_embed: number[][] = [
  [1.0,  0.0, -1.0,  0.5],  // 나는
  [0.5,  1.0,  0.0, -0.5],  // 사과를
  [-0.5, 0.5,  1.0,  0.0],  // 좋아한다
];

// X_final = X_embed + PE
const X_final: number[][] = X_embed.map((row, i) =>
  row.map((v, j) => v + PE[i][j])
);

export default function PositionalEncodingContent() {
  return (
    <article className="prose-like max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">3. 위치 인코딩 (Positional Encoding)</h1>
      <p className="text-muted mb-8">
        트랜스포머는 모든 토큰을 <strong>동시에</strong> 처리합니다 — RNN처럼 순서대로 읽지 않습니다.
        그래서 "나는 사과를 좋아한다"와 "사과를 나는 좋아한다"를 구분할 수 없습니다.
        위치 정보를 임베딩에 더해 이 문제를 해결합니다.
      </p>

      {/* ── 왜 필요한가 ── */}
      <CalcBox title="왜 위치 인코딩이 필요한가?">
        <div className="text-sm space-y-3">
          <div className="flex gap-4 items-start">
            <div className="bg-red-100 dark:bg-red-950 rounded-lg p-3 flex-1">
              <div className="font-semibold text-red-700 dark:text-red-300 mb-1">RNN (순서 처리)</div>
              <div className="text-muted">토큰 1 → 토큰 2 → 토큰 3 → ...</div>
              <div className="text-muted">순서가 자연스럽게 반영됨</div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-950 rounded-lg p-3 flex-1">
              <div className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Transformer (병렬 처리)</div>
              <div className="text-muted">모든 토큰을 동시에 처리</div>
              <div className="text-muted font-medium">→ 위치 정보를 별도로 주입해야 함</div>
            </div>
          </div>
        </div>
      </CalcBox>

      {/* ── STEP 1: sin/cos 공식 ── */}
      <Step n={1} label="sin/cos 위치 인코딩 공식" />
      <CalcBox>
        <p className="text-sm mb-4">
          각 위치(pos)와 차원(i)에 대해 sin과 cos을 번갈아 사용합니다.
          10000의 거듭제곱이 분모에 있어 각 차원마다 다른 주파수를 가집니다.
        </p>
        <BlockMath math="PE(pos, 2i) = \sin\!\left(\frac{pos}{10000^{2i/d_{model}}}\right)" />
        <BlockMath math="PE(pos, 2i+1) = \cos\!\left(\frac{pos}{10000^{2i/d_{model}}}\right)" />
        <div className="text-sm text-muted mt-4 space-y-1">
          <div><strong>pos</strong>: 문장 내 토큰 위치 (0, 1, 2, ...)</div>
          <div><strong>i</strong>: 차원 인덱스 쌍 (0, 1, 2, ...)</div>
          <div><strong>d_model</strong>: 임베딩 차원 수 (여기서는 4)</div>
        </div>
      </CalcBox>

      {/* ── STEP 2: d_model=4 전개 ── */}
      <Step n={2} label="d_model=4일 때 각 차원 공식 전개" />
      <CalcBox>
        <p className="text-sm mb-4">
          d_model=4이므로 i=0, 1 → 4개 차원:
        </p>
        <div className="text-sm space-y-2 font-mono bg-sidebar-bg rounded-lg p-4 border border-sidebar-border">
          <div>dim 0 (i=0, sin): <strong>sin(pos / 10000⁰·⁰ ) = sin(pos / 1)</strong></div>
          <div>dim 1 (i=0, cos): <strong>cos(pos / 10000⁰·⁰ ) = cos(pos / 1)</strong></div>
          <div>dim 2 (i=1, sin): <strong>sin(pos / 10000⁰·⁵ ) = sin(pos / 100)</strong></div>
          <div>dim 3 (i=1, cos): <strong>cos(pos / 10000⁰·⁵ ) = cos(pos / 100)</strong></div>
        </div>
        <p className="text-sm text-muted mt-3">
          낮은 차원 = 높은 주파수(빠르게 변함), 높은 차원 = 낮은 주파수(천천히 변함)
        </p>
      </CalcBox>

      {/* ── STEP 3: 실제 계산 ── */}
      <Step n={3} label='예제: "나는 사과를 좋아한다" 위치 인코딩 계산' />
      <CalcBox>
        <p className="text-sm mb-4">3개 토큰의 위치 인코딩 벡터를 실제 계산합니다.</p>
        <div className="text-sm space-y-3 font-mono mb-5">
          <div className="p-3 rounded-lg border border-sidebar-border bg-blue-50 dark:bg-blue-950">
            <strong>pos=0 "나는":</strong>
            <div className="mt-1 text-muted">
              [sin(0/1), cos(0/1), sin(0/100), cos(0/100)]
            </div>
            <div className="font-bold text-blue-700 dark:text-blue-300">
              = [{PE[0].map(v => v.toFixed(2)).join(", ")}]
            </div>
          </div>
          <div className="p-3 rounded-lg border border-sidebar-border bg-green-50 dark:bg-green-950">
            <strong>pos=1 "사과를":</strong>
            <div className="mt-1 text-muted">
              [sin(1/1), cos(1/1), sin(1/100), cos(1/100)]
            </div>
            <div className="font-bold text-green-700 dark:text-green-300">
              = [{PE[1].map(v => v.toFixed(2)).join(", ")}]
            </div>
          </div>
          <div className="p-3 rounded-lg border border-sidebar-border bg-orange-50 dark:bg-orange-950">
            <strong>pos=2 "좋아한다":</strong>
            <div className="mt-1 text-muted">
              [sin(2/1), cos(2/1), sin(2/100), cos(2/100)]
            </div>
            <div className="font-bold text-orange-700 dark:text-orange-300">
              = [{PE[2].map(v => v.toFixed(2)).join(", ")}]
            </div>
          </div>
        </div>
        <Matrix
          data={PE}
          label="PE 행렬 (3토큰 × 4차원)"
          color="blue"
        />
      </CalcBox>

      {/* ── STEP 4: 임베딩에 더하기 ── */}
      <Step n={4} label="X_final = X_embed + PE (행렬 덧셈)" />
      <CalcBox>
        <p className="text-sm mb-4">
          위치 인코딩을 단어 임베딩에 <strong>더합니다</strong>.
          두 행렬의 크기가 같으므로 원소별(element-wise) 덧셈입니다.
        </p>
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <Matrix data={X_embed} label="X_embed (3×4)" color="orange" />
          <Arrow op="+" />
          <Matrix data={PE} label="PE (3×4)" color="blue" />
          <Arrow op="=" />
          <Matrix data={X_final} label="X_final (3×4)" color="green" />
        </div>
        <p className="text-sm text-muted">
          X_final의 각 행 = 단어 의미 + 위치 정보가 모두 담긴 벡터
        </p>
      </CalcBox>

      {/* ── 핵심 인사이트 ── */}
      <Insight>
        <strong>같은 단어, 다른 위치 → 다른 벡터!</strong>
        <br />
        "사과를"이 pos=1에 있을 때와 pos=5에 있을 때 PE 벡터가 다르므로,
        X_final도 달라집니다. 트랜스포머는 이를 통해 단어의 위치를 구분합니다.
        <br /><br />
        sin/cos을 사용하는 이유: 학습 시 본 적 없는 더 긴 시퀀스에도 일반화 가능하고,
        두 위치 간 상대적 거리를 선형 변환으로 표현할 수 있습니다.
      </Insight>
    </article>
  );
}
