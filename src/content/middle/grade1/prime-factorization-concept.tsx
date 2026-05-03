"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";

/** 중1 > 수와 연산 > 소인수분해 > 소인수분해 */
export default function PrimeFactorizationConcept() {
  return (
    <div className="space-y-6">
      <section id="prime-composite">
        <h2 className="text-xl font-semibold mb-3">소수와 합성수</h2>
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
      </section>

      <section id="factorization">
        <h2 className="text-xl font-semibold mb-3">소인수분해</h2>
        <p>
          자연수를 <strong>소인수</strong>(소수인 인수)들의 곱으로 나타내는 것을 <strong>소인수분해</strong>라고 합니다.
        </p>
        <div className="mt-4 space-y-3">
          <p>예시: 60을 소인수분해하면</p>
          <BlockMath math="60 = 2^2 \times 3 \times 5" />
          <p>예시: 360을 소인수분해하면</p>
          <BlockMath math="360 = 2^3 \times 3^2 \times 5" />
        </div>
      </section>

      <section id="method">
        <h2 className="text-xl font-semibold mb-3">소인수분해 방법</h2>
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
      </section>

      <section id="divisor-count">
        <h2 className="text-xl font-semibold mb-3">약수의 개수 공식</h2>
        <p>
          자연수 <InlineMath math="n = p_1^{a_1} \times p_2^{a_2} \times \cdots \times p_k^{a_k}" />일 때,
        </p>
        <BlockMath math="\text{약수의 개수} = (a_1 + 1)(a_2 + 1) \cdots (a_k + 1)" />
        <p className="mt-2">
          예: <InlineMath math="72 = 2^3 \times 3^2" />의 약수의 개수는{" "}
          <InlineMath math="(3+1)(2+1) = 12" />개입니다.
        </p>
      </section>
    </div>
  );
}
