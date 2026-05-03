"use client";

import { useState } from "react";
import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox } from "@/components/content/shared";

/** 중1 > 수와 연산 > 소인수분해 > 최대공약수와 최소공배수 */
export default function GcdLcm() {
  return (
    <div className="space-y-6">
      {/* 최대공약수 */}
      <CalcBox title="최대공약수 (GCD)">
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
      </CalcBox>

      {/* 최소공배수 */}
      <CalcBox title="최소공배수 (LCM)">
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
      </CalcBox>

      {/* GCD × LCM 관계 */}
      <CalcBox title="최대공약수와 최소공배수의 관계">
        <p>
          두 자연수 <InlineMath math="a" />, <InlineMath math="b" />에 대해:
        </p>
        <BlockMath math="a \times b = \gcd(a, b) \times \text{lcm}(a, b)" />
        <p className="mt-2">
          검증: <InlineMath math="72 \times 48 = 3456" />,{" "}
          <InlineMath math="24 \times 144 = 3456" /> ✓
        </p>
      </CalcBox>

      {/* 인터랙티브 계산기 */}
      <CalcBox title="직접 계산해 보기">
        <GcdLcmCalculator />
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
