"use client";

import { useState } from "react";
import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection } from "@/components/content/shared";

/** 중1 > Ⅰ. 수와 연산 > 1. 소인수분해 */
export default function PrimeFactorization() {
  return (
    <div className="space-y-8">
      <CalcBox title="■ 소인수분해">
        <SubSection title="● 소수와 합성수">
          <p>
            <strong>소수</strong>는 1보다 큰 자연수 중에서 1과 자기 자신만을 약수로 가지는 수입니다.
          </p>
          <p className="mt-2">예: 2, 3, 5, 7, 11, 13, 17, 19, 23, ...</p>
          <p className="mt-2">
            <strong>합성수</strong>는 1보다 큰 자연수 중에서 소수가 아닌 수, 즉 1과 자기 자신 외에 다른 약수를 가지는 수입니다.
          </p>
          <p className="mt-2">예: 4, 6, 8, 9, 10, 12, 14, 15, ...</p>
          <div className="mt-3 rounded-lg bg-accent-light p-4 text-sm">
            <strong>참고:</strong> 1은 소수도 합성수도 아닙니다.
          </div>
        </SubSection>

        <SubSection title="● 소인수분해의 정의">
          <p>
            자연수를 <strong>소인수</strong>(소수인 인수)들의 곱으로 나타내는 것을 <strong>소인수분해</strong>라고 합니다.
          </p>
          <div className="mt-4 space-y-3">
            <p>예시: 60을 소인수분해하면</p>
            <BlockMath math="60 = 2^2 \times 3 \times 5" />
            <p>예시: 360을 소인수분해하면</p>
            <BlockMath math="360 = 2^3 \times 3^2 \times 5" />
          </div>
        </SubSection>

        <SubSection title="● 소인수분해 방법">
          <p>
            자연수 <InlineMath math="n" />을 가장 작은 소수부터 차례로 나누어 갑니다.
          </p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">72의 소인수분해:</p>
            <div className="font-mono text-sm space-y-1">
              <p>2 | 72</p>
              <p>2 | 36</p>
              <p>2 | 18</p>
              <p>3 | 9</p>
              <p>&nbsp;&nbsp;&nbsp;3</p>
            </div>
            <BlockMath math="72 = 2^3 \times 3^2" />
          </div>
        </SubSection>

        <SubSection title="● 약수의 개수 공식">
          <p>
            자연수 <InlineMath math="n = p_1^{a_1} \times p_2^{a_2} \times \cdots \times p_k^{a_k}" />일 때,
          </p>
          <BlockMath math="\text{약수의 개수} = (a_1 + 1)(a_2 + 1) \cdots (a_k + 1)" />
          <p className="mt-2">
            예: <InlineMath math="72 = 2^3 \times 3^2" />의 약수의 개수는{" "}
            <InlineMath math="(3+1)(2+1) = 12" />개입니다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 최대공약수와 최소공배수">
        <SubSection title="● 최대공약수 (GCD)">
          <p>
            두 개 이상의 자연수의 공통인 약수 중에서 가장 큰 수를 <strong>최대공약수</strong>라고 합니다.
          </p>
          <div className="mt-4 rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">소인수분해를 이용한 최대공약수 구하기:</p>
            <BlockMath math="72 = 2^3 \times 3^2" />
            <BlockMath math="48 = 2^4 \times 3" />
            <p className="mt-2">
              공통 소인수의 <strong>최소 지수</strong>를 택합니다:
            </p>
            <BlockMath math="\gcd(72, 48) = 2^3 \times 3 = 24" />
          </div>
        </SubSection>

        <SubSection title="● 최소공배수 (LCM)">
          <p>
            두 개 이상의 자연수의 공통인 배수 중에서 가장 작은 수를 <strong>최소공배수</strong>라고 합니다.
          </p>
          <div className="mt-4 rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">소인수분해를 이용한 최소공배수 구하기:</p>
            <BlockMath math="72 = 2^3 \times 3^2" />
            <BlockMath math="48 = 2^4 \times 3" />
            <p className="mt-2">
              모든 소인수의 <strong>최대 지수</strong>를 택합니다:
            </p>
            <BlockMath math="\text{lcm}(72, 48) = 2^4 \times 3^2 = 144" />
          </div>
        </SubSection>

        <SubSection title="● 최대공약수와 최소공배수의 관계">
          <p>
            두 자연수 <InlineMath math="a" />, <InlineMath math="b" />에 대해:
          </p>
          <BlockMath math="a \times b = \gcd(a, b) \times \text{lcm}(a, b)" />
          <p className="mt-2">
            검증: <InlineMath math="72 \times 48 = 3456" />,{" "}
            <InlineMath math="24 \times 144 = 3456" /> ✓
          </p>
        </SubSection>

        <SubSection title="● 직접 계산해 보기">
          <GcdLcmCalculator />
        </SubSection>
      </CalcBox>
    </div>
  );
}

/** GCD/LCM 인터랙티브 계산기 */
function GcdLcmCalculator() {
  const [a, setA] = useState(72);
  const [b, setB] = useState(48);

  const gcdVal = gcd(a, b);
  const lcmVal = (a * b) / gcdVal;

  return (
    <div className="rounded-lg border border-sidebar-border p-4 space-y-4">
      <div className="flex gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-muted">a</span>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-24 rounded border border-sidebar-border px-2 py-1 bg-background"
            min={1}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-muted">b</span>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-24 rounded border border-sidebar-border px-2 py-1 bg-background"
            min={1}
          />
        </label>
      </div>
      <div className="space-y-1 text-sm">
        <p>
          <InlineMath math={`\\gcd(${a}, ${b}) = ${gcdVal}`} />
        </p>
        <p>
          <InlineMath math={`\\text{lcm}(${a}, ${b}) = ${lcmVal}`} />
        </p>
        <p>
          검증: <InlineMath math={`${a} \\times ${b} = ${a * b}`} />,{" "}
          <InlineMath math={`${gcdVal} \\times ${lcmVal} = ${gcdVal * lcmVal}`} />{" "}
          {a * b === gcdVal * lcmVal ? "✓" : "✗"}
        </p>
      </div>
    </div>
  );
}

/** 유클리드 호제법으로 GCD 계산 */
function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}
