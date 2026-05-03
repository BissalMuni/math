"use client";

import { BlockMath, InlineMath } from "@/components/math/math-formula";
import { Matrix, CalcBox, Insight } from "./shared";

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

/** 작은 불릿 리스트 */
function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="text-sm list-disc list-inside space-y-1 text-muted">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

export default function SinCosContent() {
  return (
    <article className="prose-like max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">3-2. sin/cos 함수로 위치 표현</h1>
      <p className="text-muted mb-8">
        각 위치를 sin/cos 함수 조합으로 표현합니다.
        차원마다 주파수가 다르기 때문에 모든 위치가 고유한 벡터를 갖게 됩니다.
      </p>

      {/* 1 */}
      <CalcBox title="1. 공식 설명 (pos, i, d_model)">
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

      {/* 2 */}
      <CalcBox title="2. 각 차원별 주파수 (빠름 / 느림)">
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

      {/* 3 */}
      <CalcBox title="3. sin만 쓰면 안 되는 이유 (pos=0 문제)">
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

      {/* 4 */}
      <CalcBox title="4. pos별 실제 계산 예제 (pos=0, 1, 2, 3)">
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

      {/* 5 */}
      <CalcBox title="5. 주기는 다르지만 계산은 매번">
        <Bullets items={[
          "pos가 들어올 때마다 매번 sin/cos을 새로 계산",
          "각 차원의 주기(분모)는 처음부터 고정 — 학습 중에도 안 바뀜",
          "주기가 차원마다 달라서 (pos, dim) 조합이 절대 중복되지 않음",
        ]} />
      </CalcBox>

      {/* 6 */}
      <CalcBox title="6. 분모가 크면 값이 0에 가까워짐">
        <div className="text-sm mb-3 font-mono bg-sidebar-bg rounded-lg p-3 border border-sidebar-border">
          예) dim 2 (분모 100): sin(1/100) = sin(0.01) ≈ <strong>0.01</strong> &nbsp; — 0에 매우 가까움
        </div>
        <Bullets items={[
          "분모가 크면 sin/cos 안의 숫자(pos/분모)가 0에 가까워짐",
          "sin(0) = 0 이므로 결과도 0에 가까워짐",
          "느린 차원(큰 분모)은 작은 pos에서는 거의 0",
        ]} />
      </CalcBox>

      {/* 7 */}
      <CalcBox title="7. 느린 차원은 긴 문장에서 역할">
        <Bullets items={[
          "pos가 커질수록 느린 차원에서도 값 차이가 생김",
          "짧은 문장 (pos가 작음) → 느린 차원은 거의 0, 사실상 빠른 차원만 동작",
          "긴 문장 (pos가 큼) → 느린 차원이 비로소 위치를 구분하는 역할",
        ]} />
      </CalcBox>

      {/* 8 */}
      <CalcBox title="8. fp16 / fp4 / int8에서 긴 주기가 잘리는 문제">
        <Bullets items={[
          "느린 차원의 미세한 값 차이가 저정밀도에서는 같은 숫자로 뭉개짐",
          "그러면 멀리 떨어진 두 pos를 더 이상 구분하지 못함",
          "긴 문장에서 위치 정보가 손실됨",
          "LLM이 매우 긴 문장(long-context)에서 성능이 떨어지는 원인 중 하나",
        ]} />
      </CalcBox>

      {/* 9 */}
      <CalcBox title="9. 양자화(quantization) 개념">
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
        <strong>핵심:</strong> sin/cos 조합은 차원마다 주기가 달라 모든 위치에 고유한 좌표를 만든다.
        단, 저정밀도 양자화에서는 느린 차원 값이 뭉개져 긴 문장에서 위치 구분이 약해진다.
      </Insight>
    </article>
  );
}
