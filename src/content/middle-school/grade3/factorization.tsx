import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중3 > Ⅱ. 다항식의 곱셈과 인수분해 > 2. 인수분해 */
export default function Factorization() {
  return (
    <div className="space-y-8">
      <CalcBox title="■ 인수분해의 뜻">
        <SubSection title="● 인수와 인수분해">
          <p>
            하나의 다항식을 두 개 이상의 다항식의 곱으로 나타내는 것을{" "}
            <strong>인수분해</strong>라고 하고, 이때 각각의 식을{" "}
            <strong>인수</strong>라고 합니다.
          </p>
          <BlockMath math="x^2 + 5x + 6 = (x + 2)(x + 3)" />
          <p className="mt-2">
            위 식에서 <InlineMath math="(x + 2)" />와{" "}
            <InlineMath math="(x + 3)" />이 인수입니다.
          </p>
        </SubSection>

        <SubSection title="● 공통인수 묶기">
          <p>
            각 항에 공통으로 포함된 인수를 괄호 밖으로 꺼냅니다.
          </p>
          <BlockMath math="ma + mb = m(a + b)" />
          <div className="mt-3 space-y-2">
            <p>
              예: <InlineMath math="2x^2 + 6x = 2x(x + 3)" />
            </p>
            <p>
              예: <InlineMath math="3a^2b - 6ab^2 = 3ab(a - 2b)" />
            </p>
          </div>
        </SubSection>

        <Insight>
          인수분해는 곱셈 공식의 역과정입니다. 전개(곱셈)의 결과를 다시 곱의
          형태로 되돌리는 것이라고 생각하면 됩니다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ 인수분해 공식">
        <SubSection title="● 완전제곱식">
          <BlockMath math="a^2 + 2ab + b^2 = (a + b)^2" />
          <BlockMath math="a^2 - 2ab + b^2 = (a - b)^2" />
          <div className="mt-3 space-y-2">
            <p>
              예: <InlineMath math="x^2 + 6x + 9 = (x + 3)^2" />
            </p>
            <p>
              예: <InlineMath math="4x^2 - 12x + 9 = (2x - 3)^2" />
            </p>
          </div>
        </SubSection>

        <SubSection title="● 제곱의 차">
          <BlockMath math="a^2 - b^2 = (a + b)(a - b)" />
          <div className="mt-3 space-y-2">
            <p>
              예: <InlineMath math="x^2 - 25 = (x + 5)(x - 5)" />
            </p>
            <p>
              예: <InlineMath math="9x^2 - 16 = (3x + 4)(3x - 4)" />
            </p>
          </div>
        </SubSection>

        <SubSection title="● x² + (a+b)x + ab 꼴">
          <BlockMath math="x^2 + (a + b)x + ab = (x + a)(x + b)" />
          <p className="mt-2">
            곱이 상수항, 합이 일차항의 계수가 되는 두 수를 찾습니다.
          </p>
          <div className="mt-3 space-y-2">
            <p>
              예: <InlineMath math="x^2 + 7x + 12 = (x + 3)(x + 4)" />{" "}
              (곱 12, 합 7 → 3과 4)
            </p>
            <p>
              예: <InlineMath math="x^2 - x - 6 = (x + 2)(x - 3)" />{" "}
              (곱 -6, 합 -1 → 2와 -3)
            </p>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 인수분해 공식의 활용">
        <SubSection title="● 복잡한 식의 인수분해">
          <p>
            공통인수를 먼저 묶은 뒤, 인수분해 공식을 적용합니다.
          </p>
          <div className="mt-3 space-y-3">
            <p>
              예: <InlineMath math="2x^2 - 8 = 2(x^2 - 4) = 2(x + 2)(x - 2)" />
            </p>
            <p>
              예: <InlineMath math="3x^2 + 12x + 12 = 3(x^2 + 4x + 4) = 3(x + 2)^2" />
            </p>
          </div>
        </SubSection>

        <SubSection title="● 수의 계산에의 활용">
          <p>
            인수분해를 이용하면 복잡한 수의 계산을 간단히 할 수 있습니다.
          </p>
          <div className="mt-3 space-y-3">
            <p>
              예: <InlineMath math="57^2 - 43^2" />
            </p>
            <BlockMath math="57^2 - 43^2 = (57 + 43)(57 - 43) = 100 \times 14 = 1400" />
          </div>
        </SubSection>

        <SubSection title="● 식의 값 구하기">
          <p>
            주어진 조건을 인수분해된 식에 대입하면 계산이 간편해집니다.
          </p>
          <div className="mt-3 space-y-2">
            <p>
              예: <InlineMath math="x = 102" />일 때{" "}
              <InlineMath math="x^2 - 4x + 4" />의 값
            </p>
            <BlockMath math="x^2 - 4x + 4 = (x - 2)^2 = (102 - 2)^2 = 100^2 = 10000" />
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
