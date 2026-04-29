"use client";

import { BlockMath, InlineMath } from "@/components/math-formula";
import { Matrix, Arrow, CalcBox, Insight } from "./shared";

/**
 * 예제 설정:
 * 문장: "나는 빨간 사과를 좋아한다" → 4개 토큰
 * d_model = 4 (실제는 512, 여기선 4로 축소)
 *
 * 위치 인코딩 공식:
 *   PE(pos, 2i)   = sin(pos / 10000^(2i/d_model))
 *   PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))
 */

const d_model = 4;

// PE 행렬: 4토큰 × 4차원
const PE: number[][] = [0, 1, 2, 3].map(pos =>
  [0, 1, 2, 3].map(dim => {
    const i = Math.floor(dim / 2);
    const denom = Math.pow(10000, (2 * i) / d_model);
    return dim % 2 === 0 ? Math.sin(pos / denom) : Math.cos(pos / denom);
  })
);

// 임베딩 벡터 (학습된 값 가정)
const X_embed: number[][] = [
  [1.0,  0.0, -1.0,  0.5],  // 나는
  [0.3, -0.4,  0.7,  0.2],  // 빨간
  [0.5,  1.0,  0.0, -0.5],  // 사과를
  [-0.5, 0.5,  1.0,  0.0],  // 좋아한다
];

const X_final: number[][] = X_embed.map((row, i) =>
  row.map((v, j) => v + PE[i][j])
);

/** 작은 불릿 리스트 (세부 목차 표시용) */
function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="text-sm list-disc list-inside space-y-1 text-muted">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

export default function PositionalEncodingContent() {
  return (
    <article className="prose-like max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">3. 위치 인코딩 (Positional Encoding)</h1>
      <p className="text-muted mb-8">
        트랜스포머는 모든 토큰을 <strong>동시에</strong> 처리합니다 — RNN처럼 순서대로 읽지 않습니다.
        그래서 "나는 사과를 좋아한다"와 "사과를 나는 좋아한다"를 구분할 수 없습니다.
        위치 정보를 임베딩에 더해 이 문제를 해결합니다.
      </p>

      {/* 1 */}
      <CalcBox title="1. Positional Encoding이 필요한 이유">
        <div className="text-sm space-y-3">
          <div className="flex gap-3 items-stretch">
            <div className="bg-red-100 dark:bg-red-950 rounded-lg p-3 flex-1">
              <div className="font-semibold text-red-700 dark:text-red-300 mb-1">RNN</div>
              <div className="text-muted">토큰 1 → 토큰 2 → 토큰 3 (순차)</div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-950 rounded-lg p-3 flex-1">
              <div className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Transformer</div>
              <div className="text-muted">모든 토큰을 동시에 처리 (병렬)</div>
            </div>
          </div>
          <Bullets items={[
            "Transformer는 단어를 동시에 처리한다",
            "그래서 순서 정보가 전혀 없다",
            "위치를 숫자(벡터)로 만들어 임베딩에 더해줘야 한다",
          ]} />
        </div>
      </CalcBox>

      {/* 2 */}
      <CalcBox title="2. 공식 설명 (pos, i, d_model)">
        <BlockMath math="PE(pos, 2i) = \sin\!\left(\frac{pos}{10000^{2i/d_{model}}}\right)" />
        <BlockMath math="PE(pos, 2i+1) = \cos\!\left(\frac{pos}{10000^{2i/d_{model}}}\right)" />
        <Bullets items={[
          <><InlineMath math="pos" /> = 토큰 위치 (0, 1, 2, …)</>,
          <><InlineMath math="i" /> = 차원 쌍 번호 (0, 1, 2, …)</>,
          <><InlineMath math="d_{model}" /> = 벡터 전체 크기 (여기선 4)</>,
          <><InlineMath math="i" /> 의 최대값 = <InlineMath math="d_{model}/2 - 1" /> (d=4면 i=0,1)</>,
          <>분모 계산: <InlineMath math="10000^{2i/d_{model}}" /></>,
          "짝수 차원(2i) → sin, 홀수 차원(2i+1) → cos",
          <><InlineMath math="i=0" /> → <InlineMath math="10000^0 = 1" /></>,
          <><InlineMath math="i=1" /> → <InlineMath math="10000^{0.5} = 100" /></>,
          "분모가 클수록 같은 pos에 대해 주파수가 느려짐",
        ]} />
      </CalcBox>

      {/* 3 */}
      <CalcBox title="3. 각 차원별 주파수 (빠름 / 느림)">
        <div className="text-sm space-y-2 font-mono bg-sidebar-bg rounded-lg p-4 border border-sidebar-border mb-3">
          <div>dim 0 (i=0, sin): <strong>sin(pos / 1)</strong> &nbsp; — 빠름</div>
          <div>dim 1 (i=0, cos): <strong>cos(pos / 1)</strong> &nbsp; — 빠름</div>
          <div>dim 2 (i=1, sin): <strong>sin(pos / 100)</strong> — 느림</div>
          <div>dim 3 (i=1, cos): <strong>cos(pos / 100)</strong> — 느림</div>
        </div>
        <Bullets items={[
          "dim 0, 1 → 빠르게 변함 (낮은 차원 = 고주파)",
          "dim 2, 3 → 느리게 변함 (높은 차원 = 저주파)",
          "d_model이 클수록 i 종류가 많아지고, 따라서 주파수 종류도 늘어남",
        ]} />
      </CalcBox>

      {/* 4 */}
      <CalcBox title="4. sin만 쓰면 안 되는 이유 (pos=0 문제)">
        <div className="text-sm space-y-2 font-mono bg-sidebar-bg rounded-lg p-4 border border-sidebar-border mb-3">
          <div>sin만 쓴다면 pos=0 → [sin(0/1), sin(0/100), …] = <strong>[0, 0, 0, 0]</strong> — 위치 정보 소실!</div>
          <div>sin/cos 섞으면 pos=0 → [sin(0/1), <strong>cos(0/1)</strong>, sin(0/100), <strong>cos(0/100)</strong>] = [0, 1, 0, 1]</div>
        </div>
        <Bullets items={[
          "sin(0) = 0 → 모든 차원이 0이 되어버림",
          "cos(0) = 1 → 0이 아닌 값이 생김",
          "sin/cos는 분기(나누기)가 아니라 짝수·홀수 차원에 둘 다 사용",
        ]} />
      </CalcBox>

      {/* 5 */}
      <CalcBox title="5. pos별 실제 계산 예제 (pos=0, 1, 2, 3)">
        <div className="text-sm mb-3 font-mono bg-sidebar-bg rounded-lg p-3 border border-sidebar-border">
          분모 먼저: i=0 → 1, &nbsp; i=1 → 10000<sup>0.5</sup> = 100
        </div>
        <div className="space-y-2 mb-4">
          {[
            { pos: 0, label: "나는",       color: "blue"   },
            { pos: 1, label: "빨간",       color: "green"  },
            { pos: 2, label: "사과를",     color: "orange" },
            { pos: 3, label: "좋아한다",   color: "purple" },
          ].map(({ pos, label, color }) => (
            <div
              key={pos}
              className={`p-3 rounded-lg border text-sm font-mono
                ${color === "blue"   ? "border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-950" : ""}
                ${color === "green"  ? "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950" : ""}
                ${color === "orange" ? "border-orange-300 bg-orange-50 dark:border-orange-700 dark:bg-orange-950" : ""}
                ${color === "purple" ? "border-purple-300 bg-purple-50 dark:border-purple-700 dark:bg-purple-950" : ""}
              `}
            >
              <strong>pos={pos} "{label}":</strong>
              <div className="text-muted mt-1">
                [sin({pos}/1), cos({pos}/1), sin({pos}/100), cos({pos}/100)]
              </div>
              <div className="font-bold mt-1">
                = [{PE[pos].map(v => v.toFixed(2)).join(", ")}]
              </div>
            </div>
          ))}
        </div>
        <Matrix data={PE} label="PE 행렬 (4토큰 × 4차원)" color="blue" />
        <div className="mt-3">
          <Bullets items={[
            "분모 먼저 계산해두면 반복 계산이 쉬워짐",
            "각 dim별로 sin/cos 값을 따로 계산",
            "pos마다 고유한 4차원 벡터가 만들어짐",
          ]} />
        </div>
      </CalcBox>

      {/* 6 */}
      <CalcBox title="6. 단어 벡터에 더하기">
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <Matrix data={X_embed} label="X_embed (4×4)" color="orange" />
          <Arrow op="+" />
          <Matrix data={PE} label="PE (4×4)" color="blue" />
          <Arrow op="=" />
          <Matrix data={X_final} label="X_final (4×4)" color="green" />
        </div>
        <Bullets items={[
          "같은 차원끼리 원소별(element-wise) 덧셈",
          "같은 단어라도 위치가 다르면 X_final이 달라짐",
          "한 벡터 안에 의미(임베딩) + 위치(PE)가 동시에 표현됨",
        ]} />
      </CalcBox>

      {/* 7 */}
      <CalcBox title="7. 비트 플래그와 비교">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-3">
          <div className="rounded-lg border border-sidebar-border bg-sidebar-bg p-3">
            <div className="font-semibold mb-1">비트 플래그</div>
            <div className="text-muted font-mono">[0, 1, 1, 0] — 0/1만 사용</div>
            <div className="text-muted">2⁴=16개 조합으로 16개 상태 구분</div>
          </div>
          <div className="rounded-lg border border-sidebar-border bg-sidebar-bg p-3">
            <div className="font-semibold mb-1">Positional Encoding</div>
            <div className="text-muted font-mono">[0.84, 0.54, 0.01, 1.00]</div>
            <div className="text-muted">각 차원이 −1 ~ 1 연속값</div>
          </div>
        </div>
        <Bullets items={[
          "비트 플래그 = 0 또는 1 (이산)",
          "PE = −1 ~ 1 사이의 연속값",
          "둘 다 독립적인 채널의 조합으로 고유값을 만든다는 원리는 같음",
          "차원이 섞여 있어도 각 채널은 독립적으로 구분 가능",
        ]} />
      </CalcBox>

      {/* 8 */}
      <CalcBox title="8. 시·분·초 비유 → 주행거리계 비유로 수정">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-3">
          <div className="rounded-lg border border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950 p-3">
            <div className="font-semibold text-red-700 dark:text-red-300 mb-1">시계 (부적절)</div>
            <div className="text-muted">12시간마다 같은 자리로 돌아옴 → 위치가 고유하지 않다</div>
          </div>
          <div className="rounded-lg border border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950 p-3">
            <div className="font-semibold text-green-700 dark:text-green-300 mb-1">주행거리계 (적합)</div>
            <div className="text-muted">자리수마다 회전 주기가 달라 조합이 절대 겹치지 않음</div>
          </div>
        </div>
        <Bullets items={[
          "시계는 12시간마다 반복되어 위치를 고유하게 표현하지 못함",
          "주행거리계는 자리수마다 주기가 10배씩 차이 → 조합이 겹치지 않음",
          "PE도 차원마다 주기가 극단적으로 달라(1 vs 100 vs 10000…) 위치 조합이 고유함",
        ]} />
      </CalcBox>

      {/* 9 */}
      <CalcBox title="9. 크기 순서로 정렬되나? (벡터 거리 개념)">
        <Bullets items={[
          "각 차원의 값 크기는 들쭉날쭉 — 단순 정렬되지 않음",
          "가까운 위치(pos=2 ↔ pos=3) → 벡터가 비슷함",
          "먼 위치(pos=0 ↔ pos=10) → 벡터가 많이 다름",
          "트랜스포머는 값 크기가 아니라 패턴 유사도(내적)로 순서를 파악",
        ]} />
      </CalcBox>

      {/* 10 */}
      <CalcBox title="10. 주기는 다르지만 계산은 매번">
        <Bullets items={[
          "pos가 들어올 때마다 매번 sin/cos을 새로 계산",
          "각 차원의 주기(분모)는 처음부터 고정 — 학습 중에도 안 바뀜",
          "주기가 차원마다 달라서 (pos, dim) 조합이 절대 중복되지 않음",
        ]} />
      </CalcBox>

      {/* 11 */}
      <CalcBox title="11. 분모가 크면 값이 0에 가까워짐">
        <div className="text-sm mb-3 font-mono bg-sidebar-bg rounded-lg p-3 border border-sidebar-border">
          예) dim 2 (분모 100): sin(1/100) = sin(0.01) ≈ <strong>0.01</strong> &nbsp; — 0에 매우 가까움
        </div>
        <Bullets items={[
          "분모가 크면 sin/cos 안의 숫자(pos/분모)가 0에 가까워짐",
          "sin(0) = 0 이므로 결과도 0에 가까워짐",
          "느린 차원(큰 분모)은 작은 pos에서는 거의 0",
        ]} />
      </CalcBox>

      {/* 12 */}
      <CalcBox title="12. 느린 차원은 긴 문장에서 역할">
        <Bullets items={[
          "pos가 커질수록 느린 차원에서도 값 차이가 생김",
          "짧은 문장 (pos가 작음) → 느린 차원은 거의 0, 사실상 빠른 차원만 동작",
          "긴 문장 (pos가 큼) → 느린 차원이 비로소 위치를 구분하는 역할",
        ]} />
      </CalcBox>

      {/* 13 */}
      <CalcBox title="13. 트랜스포머 블록마다 더하나? (한 번만)">
        <Bullets items={[
          "맨 처음 입력 단계에서 단 한 번만 PE를 더함",
          "그 위치 정보가 attention/FFN 블록을 통과하면서도 유지됨",
          "블록마다 PE를 다시 더하지 않음",
        ]} />
      </CalcBox>

      {/* 14 */}
      <CalcBox title="14. 더하고 학습하고 반복">
        <div className="text-sm mb-3 font-mono bg-sidebar-bg rounded-lg p-3 border border-sidebar-border">
          단어벡터 + PE → 모델 통과 → 오차 계산 → 가중치 수정 &nbsp; (한 세트)
        </div>
        <Bullets items={[
          "이 한 세트(forward + backward)를 수천~수억 번 반복",
          "PE 더하기와 학습은 번갈아 하는 게 아니라 한 세트 안에서 같이 일어남",
          "매 반복마다 PE는 똑같이 더해지고, 그 위에서 학습이 누적됨",
        ]} />
      </CalcBox>

      {/* 15 */}
      <CalcBox title="15. 학습 중 바뀌는 것 vs 안 바뀌는 것">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-3">
          <div className="rounded-lg border border-orange-300 bg-orange-50 dark:border-orange-700 dark:bg-orange-950 p-3">
            <div className="font-semibold text-orange-700 dark:text-orange-300 mb-1">단어 벡터 (임베딩)</div>
            <div className="text-muted">학습 도중 계속 갱신됨</div>
          </div>
          <div className="rounded-lg border border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-950 p-3">
            <div className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Sinusoidal PE</div>
            <div className="text-muted">수식으로 고정 — 절대 안 바뀜</div>
          </div>
        </div>
        <Bullets items={[
          "단어 벡터는 학습으로 계속 바뀌어 의미를 점점 잘 표현하게 됨",
          "PE는 sin/cos 수식으로 고정 — 학습으로 바뀌지 않음",
          "PE는 닻(anchor)처럼 위치 좌표계를 고정시켜주는 역할",
        ]} />
      </CalcBox>

      {/* 16 */}
      <CalcBox title="16. fp16 / fp4 / int8에서 긴 주기가 잘리는 문제">
        <Bullets items={[
          "느린 차원의 미세한 값 차이가 저정밀도에서는 같은 숫자로 뭉개짐",
          "그러면 멀리 떨어진 두 pos를 더 이상 구분하지 못함",
          "긴 문장에서 위치 정보가 손실됨",
          "LLM이 매우 긴 문장(long-context)에서 성능이 떨어지는 원인 중 하나",
        ]} />
      </CalcBox>

      {/* 17 */}
      <CalcBox title="17. 양자화(quantization) 개념">
        <div className="text-sm mb-3 font-mono bg-sidebar-bg rounded-lg p-3 border border-sidebar-border">
          fp32 (≈4×10⁹ 단계) &nbsp;→&nbsp; fp16 &nbsp;→&nbsp; int8 (256 단계) &nbsp;→&nbsp; fp4 (16 단계)
        </div>
        <Bullets items={[
          "연속적인 float을 띄엄띄엄한 정수(integer)로 근사 — 용량을 줄임",
          "비트 수가 줄수록 표현 가능한 숫자 개수가 급격히 감소",
          "학습은 정밀한 fp32/fp16, 배포(추론)는 가벼운 int8/fp4",
          "정확도 손실은 작고 메모리·속도 이득은 크기 때문에 추론에서 자주 사용",
        ]} />
      </CalcBox>

      <Insight>
        <strong>핵심:</strong> PE는 차원마다 주기가 다른 sin/cos을 조합해
        모든 위치에 고유한 좌표를 주는 장치다. 임베딩에 한 번만 더해도
        위치 정보가 모든 블록에 흘러간다. 단, 저정밀도 양자화에서는
        느린 차원이 뭉개져 긴 문장의 위치 구분이 약해진다.
      </Insight>
    </article>
  );
}
