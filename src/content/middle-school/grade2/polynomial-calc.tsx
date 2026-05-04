import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중2 > Ⅰ. 수와 식 > 2. 다항식 계산 */
export default function PolynomialCalc() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 단항식의 계산">
        <SubSection title="(1) 단항식의 곱셈">
          <p>
            단항식의 곱셈은 <strong>계수끼리 곱하고</strong>, 같은 문자끼리는{" "}
            <strong>지수를 더합니다</strong>.
          </p>
          <BlockMath math="3a^2 \times 5a^3 = 15a^{2+3} = 15a^5" />
          <BlockMath math="(-2x^2y) \times 4xy^3 = -8x^{2+1}y^{1+3} = -8x^3y^4" />
        </SubSection>

        <SubSection title="(2) 단항식의 나눗셈">
          <p>
            단항식의 나눗셈은 <strong>계수끼리 나누고</strong>, 같은 문자끼리는{" "}
            <strong>지수를 뺍니다</strong>.
          </p>
          <BlockMath math="12a^5 \div 3a^2 = 4a^{5-2} = 4a^3" />
          <BlockMath math="(-18x^4y^3) \div 6x^2y = -3x^{4-2}y^{3-1} = -3x^2y^2" />
        </SubSection>

        <SubSection title="(3) 곱셈과 나눗셈의 혼합">
          <p>왼쪽부터 차례대로 계산하거나, 나눗셈을 곱셈으로 바꾸어 계산합니다.</p>
          <BlockMath math="8a^3b^2 \times 3ab \div 6a^2b = \frac{8a^3b^2 \times 3ab}{6a^2b} = 4a^2b^2" />
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 다항식의 덧셈과 뺄셈">
        <SubSection title="(1) 동류항">
          <p>
            문자와 차수가 같은 항을 <strong>동류항</strong>이라고 합니다.
            동류항끼리만 덧셈·뺄셈이 가능합니다.
          </p>
          <BlockMath math="3x^2 + 5x^2 = 8x^2" />
          <BlockMath math="7xy - 2xy = 5xy" />
          <p className="mt-2">
            <InlineMath math="3x^2" />와 <InlineMath math="5x" />는 차수가
            달라 동류항이 아닙니다.
          </p>
        </SubSection>

        <SubSection title="(2) 다항식의 덧셈">
          <p>괄호를 풀고 동류항끼리 모아 계산합니다.</p>
          <BlockMath math="(3x^2 + 2x - 1) + (x^2 - 5x + 4)" />
          <BlockMath math="= 3x^2 + x^2 + 2x - 5x - 1 + 4 = 4x^2 - 3x + 3" />
        </SubSection>

        <SubSection title="(3) 다항식의 뺄셈">
          <p>
            빼는 다항식의 <strong>각 항의 부호를 바꾸어</strong> 더합니다.
          </p>
          <BlockMath math="(3x^2 + 2x - 1) - (x^2 - 5x + 4)" />
          <BlockMath math="= 3x^2 + 2x - 1 - x^2 + 5x - 4 = 2x^2 + 7x - 5" />
        </SubSection>
      </CalcBox>

      <CalcBox title="3. 단항식과 다항식의 곱셈·나눗셈">
        <SubSection title="(1) 단항식 × 다항식">
          <p>
            <strong>분배법칙</strong>을 이용하여 단항식을 다항식의 각 항에 곱합니다.
          </p>
          <BlockMath math="a(b + c) = ab + ac" />
          <BlockMath math="3x(2x^2 - 4x + 1) = 6x^3 - 12x^2 + 3x" />
        </SubSection>

        <SubSection title="(2) 다항식 ÷ 단항식">
          <p>다항식의 각 항을 단항식으로 나눕니다.</p>
          <BlockMath math="(6x^3 - 12x^2 + 3x) \div 3x = 2x^2 - 4x + 1" />
          <BlockMath math="(8a^2b - 4ab^2) \div 2ab = 4a - 2b" />
        </SubSection>

        <Insight>
          분배법칙은 곱셈을 전개할 때도, 공통인수를 묶어낼 때도 사용하는
          가장 중요한 계산 법칙입니다.
        </Insight>
      </CalcBox>

      <CalcBox title="4. 등식의 변형">
        <SubSection title="(1) 등식의 성질">
          <p>등식의 양변에 같은 수를 더하거나, 빼거나, 곱하거나, 나누어도 등식은 성립합니다.</p>
          <div className="mt-2 space-y-1">
            <BlockMath math="a = b \implies a + c = b + c" />
            <BlockMath math="a = b \implies a - c = b - c" />
            <BlockMath math="a = b \implies ac = bc" />
            <BlockMath math="a = b \implies \frac{a}{c} = \frac{b}{c} \quad (c \neq 0)" />
          </div>
        </SubSection>

        <SubSection title="(2) 등식 변형 예시">
          <p>
            <InlineMath math="S = \dfrac{1}{2}ah" />에서{" "}
            <InlineMath math="h" />에 대해 풀면:
          </p>
          <BlockMath math="2S = ah \quad \Rightarrow \quad h = \frac{2S}{a}" />
          <p className="mt-2">
            <InlineMath math="v = v_0 + at" />에서{" "}
            <InlineMath math="t" />에 대해 풀면:
          </p>
          <BlockMath math="v - v_0 = at \quad \Rightarrow \quad t = \frac{v - v_0}{a}" />
        </SubSection>
      </CalcBox>
    </div>
  );
}
