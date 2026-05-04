import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중3 > Ⅰ. 실수와 그 계산 > 1. 제곱근과 실수 */
export default function SquareRootReal() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 제곱근의 뜻과 성질">
        <SubSection title="(1) 제곱근의 뜻">
          <p>
            어떤 수 <InlineMath math="x" />를 제곱하여 <InlineMath math="a" />가
            될 때, 즉 <InlineMath math="x^2 = a" />일 때,{" "}
            <InlineMath math="x" />를 <InlineMath math="a" />의{" "}
            <strong>제곱근</strong>이라고 합니다.
          </p>
          <div className="mt-4 space-y-2">
            <p>
              예: <InlineMath math="3^2 = 9" />,{" "}
              <InlineMath math="(-3)^2 = 9" />이므로 9의 제곱근은{" "}
              <InlineMath math="\pm 3" />입니다.
            </p>
            <p>
              양수 <InlineMath math="a" />의 제곱근은 양의 제곱근{" "}
              <InlineMath math="\sqrt{a}" />와 음의 제곱근{" "}
              <InlineMath math="-\sqrt{a}" />, 두 개가 있습니다.
            </p>
          </div>
          <div className="mt-3 rounded-lg bg-accent-light p-4 text-sm">
            <strong>참고:</strong> 0의 제곱근은 0 하나뿐이고, 음수의 제곱근은
            실수 범위에서 존재하지 않습니다.
          </div>
        </SubSection>

        <SubSection title="(2) 제곱근의 성질">
          <p>
            <InlineMath math="a > 0" />일 때 다음이 성립합니다.
          </p>
          <BlockMath math="(\sqrt{a})^2 = a, \quad (-\sqrt{a})^2 = a" />
          <BlockMath math="\sqrt{a^2} = a, \quad \sqrt{(-a)^2} = a" />
          <p className="mt-2">
            일반적으로 <InlineMath math="\sqrt{a^2} = |a|" />입니다.
          </p>
          <div className="mt-3 space-y-1">
            <p>
              예: <InlineMath math="\sqrt{5^2} = 5" />,{" "}
              <InlineMath math="\sqrt{(-5)^2} = |-5| = 5" />
            </p>
          </div>
        </SubSection>

        <SubSection title="(3) 제곱근의 대소 관계">
          <p>
            <InlineMath math="a > 0" />, <InlineMath math="b > 0" />일 때:
          </p>
          <BlockMath math="a > b \iff \sqrt{a} > \sqrt{b}" />
          <p className="mt-2">
            예: <InlineMath math="5 > 3" />이므로{" "}
            <InlineMath math="\sqrt{5} > \sqrt{3}" />
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 무리수와 실수">
        <SubSection title="(1) 유리수와 무리수">
          <p>
            <strong>유리수</strong>: 분수{" "}
            <InlineMath math="\dfrac{a}{b}" /> (
            <InlineMath math="a" />, <InlineMath math="b" />는 정수,{" "}
            <InlineMath math="b \neq 0" />)로 나타낼 수 있는 수
          </p>
          <p className="mt-2">
            <strong>무리수</strong>: 유리수가 아닌 수, 즉 순환하지 않는 무한소수
          </p>
          <div className="mt-3 space-y-1">
            <p>
              유리수의 예: <InlineMath math="3, -2, \dfrac{1}{3}, 0.25, 0.\overline{3}" />
            </p>
            <p>
              무리수의 예: <InlineMath math="\sqrt{2}, \sqrt{3}, \pi, -\sqrt{5}" />
            </p>
          </div>
        </SubSection>

        <SubSection title="(2) 실수">
          <p>
            유리수와 무리수를 합하여 <strong>실수</strong>라고 합니다.
            실수는 수직선 위의 모든 점에 대응하며, 수직선을 빈틈없이 채웁니다.
          </p>
          <BlockMath math="\text{실수} = \text{유리수} \cup \text{무리수}" />
        </SubSection>

        <SubSection title="(3) 실수의 분류">
          <div className="rounded-lg border border-sidebar-border p-4 text-sm space-y-2">
            <p>
              실수 → 유리수 → 정수 → 양의 정수(자연수), 0, 음의 정수
            </p>
            <p>실수 → 유리수 → 정수가 아닌 유리수 (유한소수, 순환소수)</p>
            <p>실수 → 무리수 (순환하지 않는 무한소수)</p>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="3. 실수의 대소 관계">
        <SubSection title="(1) 수직선을 이용한 대소 비교">
          <p>
            수직선에서 <strong>오른쪽</strong>에 있는 수가 더 큽니다.
            무리수도 수직선 위에 나타내어 대소를 비교할 수 있습니다.
          </p>
          <p className="mt-2">
            예: <InlineMath math="\sqrt{2} \approx 1.414..." />이므로{" "}
            <InlineMath math="1 < \sqrt{2} < 2" />
          </p>
        </SubSection>

        <SubSection title="(2) 제곱을 이용한 대소 비교">
          <p>
            양수끼리 비교할 때, 제곱하여 크기를 비교할 수 있습니다.
          </p>
          <div className="mt-3 space-y-2">
            <p>
              예: <InlineMath math="3" />과{" "}
              <InlineMath math="\sqrt{10}" />의 비교
            </p>
            <BlockMath math="3^2 = 9, \quad (\sqrt{10})^2 = 10" />
            <p>
              <InlineMath math="9 < 10" />이므로{" "}
              <InlineMath math="3 < \sqrt{10}" />
            </p>
          </div>
        </SubSection>

        <Insight>
          무리수의 정수 부분을 알면 대소 비교가 쉬워집니다. 예를 들어{" "}
          <InlineMath math="4 < 5" />이므로{" "}
          <InlineMath math="2 < \sqrt{5} < 3" />이고,{" "}
          <InlineMath math="\sqrt{5}" />의 정수 부분은 2입니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
