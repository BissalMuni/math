import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중1 > Ⅱ. 문자와 식 > 1. 문자의 사용과 식의 계산 */
export default function VariableExpression() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 문자의 사용">
        <SubSection title="(1) 문자를 사용한 식">
          <p>
            수량 사이의 관계를 나타낼 때, 알 수 없거나 변하는 값을{" "}
            <strong>문자</strong>로 나타냅니다.
          </p>
          <div className="mt-3 space-y-2">
            <p>
              예: 한 개에 <InlineMath math="a" />원인 사과 5개의 가격
            </p>
            <BlockMath math="a \times 5 \text{ (원)}" />
            <p>
              예: 가로가 <InlineMath math="x" />, 세로가 <InlineMath math="y" />
              인 직사각형의 넓이
            </p>
            <BlockMath math="x \times y" />
          </div>
        </SubSection>

        <SubSection title="(2) 곱셈 기호의 생략">
          <p>
            문자를 사용한 식에서는 곱셈 기호 <InlineMath math="\times" />를
            생략하여 간단히 나타냅니다.
          </p>
          <div className="mt-3 space-y-2">
            <p>
              ① 수와 문자의 곱: 수를 문자 앞에 씁니다.
            </p>
            <BlockMath math="a \times 3 = 3a, \quad x \times (-2) = -2x" />
            <p>
              ② 문자와 문자의 곱: 알파벳 순서로 씁니다.
            </p>
            <BlockMath math="y \times x = xy, \quad b \times a = ab" />
            <p>
              ③ 같은 문자의 곱: 거듭제곱으로 나타냅니다.
            </p>
            <BlockMath math="a \times a = a^2, \quad x \times x \times x = x^3" />
            <p>
              ④ 1 또는 -1과 문자의 곱: 1은 생략합니다.
            </p>
            <BlockMath math="1 \times x = x, \quad (-1) \times x = -x" />
          </div>
        </SubSection>

        <SubSection title="(3) 나눗셈 기호의 생략">
          <p>
            나눗셈은 <strong>분수 형태</strong>로 나타냅니다.
          </p>
          <BlockMath math="a \div b = \frac{a}{b}, \quad x \div 3 = \frac{x}{3}" />
          <p className="mt-2">
            예: <InlineMath math="(x + y) \div 2 = \frac{x + y}{2}" />
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 식의 값">
        <SubSection title="(1) 대입과 식의 값">
          <p>
            문자에 수를 넣는 것을 <strong>대입한다</strong>고 하고, 대입하여 계산한
            결과를 그 식의 <strong>값</strong>이라고 합니다.
          </p>
          <div className="mt-3 space-y-2">
            <p>
              예: <InlineMath math="2x + 3" />에 <InlineMath math="x = 4" />를
              대입하면
            </p>
            <BlockMath math="2 \times 4 + 3 = 8 + 3 = 11" />
          </div>
        </SubSection>

        <SubSection title="(2) 대입 시 주의사항">
          <p>
            ① 음수를 대입할 때는 반드시 <strong>괄호</strong>를 사용합니다.
          </p>
          <BlockMath math="x = -3 \;\Rightarrow\; x^2 = (-3)^2 = 9" />
          <p>
            ② 분수를 대입할 때도 괄호를 사용합니다.
          </p>
          <BlockMath math="x = \tfrac{1}{2} \;\Rightarrow\; 4x + 1 = 4 \times \tfrac{1}{2} + 1 = 2 + 1 = 3" />
        </SubSection>

        <Insight>
          대입할 때 음수나 분수에 괄호를 빠뜨리면 부호나 연산 순서가 달라져 오답이
          나올 수 있습니다. 항상 괄호를 쓰는 습관을 들이세요.
        </Insight>
      </CalcBox>

      <CalcBox title="3. 일차식의 계산">
        <SubSection title="(1) 항, 계수, 상수항">
          <p>
            식 <InlineMath math="3x + 5" />에서{" "}
            <InlineMath math="3x" />와 <InlineMath math="5" />를 각각{" "}
            <strong>항</strong>이라고 합니다.
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              <InlineMath math="3x" />에서 문자 앞의 수{" "}
              <InlineMath math="3" />을 <InlineMath math="x" />의{" "}
              <strong>계수</strong>라고 합니다.
            </li>
            <li>
              문자가 없는 항 <InlineMath math="5" />를{" "}
              <strong>상수항</strong>이라고 합니다.
            </li>
          </ul>
        </SubSection>

        <SubSection title="(2) 동류항과 일차식">
          <p>
            문자와 차수가 같은 항을 <strong>동류항</strong>이라고 합니다.
          </p>
          <p className="mt-2">
            예: <InlineMath math="3x" />와 <InlineMath math="-5x" />는 동류항,{" "}
            <InlineMath math="2x" />와 <InlineMath math="3x^2" />는 동류항이 아닙니다.
          </p>
          <p className="mt-2">
            문자의 차수가 1인 식을 <strong>일차식</strong>이라고 합니다.
          </p>
          <BlockMath math="2x + 1, \quad -3a + 7, \quad \frac{x}{2} - 4" />
        </SubSection>

        <SubSection title="(3) 일차식의 덧셈과 뺄셈">
          <p>
            <strong>동류항끼리 모아서</strong> 계수를 더하거나 뺍니다.
          </p>
          <BlockMath math="(3x + 2) + (5x - 4) = 3x + 5x + 2 - 4 = 8x - 2" />
          <BlockMath math="(7x - 1) - (2x + 3) = 7x - 1 - 2x - 3 = 5x - 4" />
        </SubSection>

        <SubSection title="(4) 일차식과 수의 곱셈·나눗셈">
          <p>
            분배법칙을 이용하여 각 항에 수를 곱하거나 나눕니다.
          </p>
          <BlockMath math="3(2x - 4) = 6x - 12" />
          <BlockMath math="(6x + 9) \div 3 = \frac{6x + 9}{3} = 2x + 3" />
        </SubSection>
      </CalcBox>
    </div>
  );
}
