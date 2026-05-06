import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중3 > Ⅱ. 다항식의 곱셈과 인수분해 > 1. 다항식의 곱셈 */
export default function PolynomialMultiplication() {
  return (
    <div className="space-y-8">
      <CalcBox title="■ 다항식의 곱셈">
        <SubSection title="● 단항식과 다항식의 곱셈">
          <p>
            분배법칙을 이용하여 단항식을 다항식의 각 항에 곱합니다.
          </p>
          <BlockMath math="a(b + c) = ab + ac" />
          <div className="mt-3 space-y-2">
            <p>
              예: <InlineMath math="2x(3x + 5) = 6x^2 + 10x" />
            </p>
            <p>
              예: <InlineMath math="-3a(2a - 4b) = -6a^2 + 12ab" />
            </p>
          </div>
        </SubSection>

        <SubSection title="● 다항식과 다항식의 곱셈">
          <p>
            각 항끼리 모두 곱한 뒤 동류항을 정리합니다.
          </p>
          <BlockMath math="(a + b)(c + d) = ac + ad + bc + bd" />
          <div className="mt-3 space-y-2">
            <p>
              예: <InlineMath math="(x + 2)(x + 3) = x^2 + 3x + 2x + 6 = x^2 + 5x + 6" />
            </p>
            <p>
              예: <InlineMath math="(2x - 1)(x + 4) = 2x^2 + 8x - x - 4 = 2x^2 + 7x - 4" />
            </p>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 곱셈 공식">
        <SubSection title="● 합·차의 제곱">
          <BlockMath math="(a + b)^2 = a^2 + 2ab + b^2" />
          <BlockMath math="(a - b)^2 = a^2 - 2ab + b^2" />
          <div className="mt-3 space-y-2">
            <p>
              예: <InlineMath math="(x + 3)^2 = x^2 + 6x + 9" />
            </p>
            <p>
              예: <InlineMath math="(2x - 5)^2 = 4x^2 - 20x + 25" />
            </p>
          </div>
        </SubSection>

        <SubSection title="● 합과 차의 곱">
          <BlockMath math="(a + b)(a - b) = a^2 - b^2" />
          <div className="mt-3 space-y-2">
            <p>
              예: <InlineMath math="(x + 4)(x - 4) = x^2 - 16" />
            </p>
            <p>
              예: <InlineMath math="(3x + 2)(3x - 2) = 9x^2 - 4" />
            </p>
          </div>
        </SubSection>

        <SubSection title="● x의 일차식의 곱">
          <BlockMath math="(x + a)(x + b) = x^2 + (a + b)x + ab" />
          <div className="mt-3 space-y-2">
            <p>
              예: <InlineMath math="(x + 2)(x + 5) = x^2 + 7x + 10" />
            </p>
            <p>
              예: <InlineMath math="(x - 3)(x + 7) = x^2 + 4x - 21" />
            </p>
          </div>
        </SubSection>

        <Insight>
          곱셈 공식은 전개와 인수분해 양방향으로 활용됩니다. 공식의 좌변·우변을
          모두 익혀 두면 계산 속도가 크게 향상됩니다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ 곱셈 공식의 변환">
        <SubSection title="● 곱셈 공식을 이용한 수의 계산">
          <p>
            복잡한 수의 계산도 곱셈 공식을 활용하면 간단해집니다.
          </p>
          <div className="mt-3 space-y-3">
            <p>
              예: <InlineMath math="101^2 = (100 + 1)^2 = 10000 + 200 + 1 = 10201" />
            </p>
            <p>
              예: <InlineMath math="99 \times 101 = (100 - 1)(100 + 1) = 10000 - 1 = 9999" />
            </p>
            <p>
              예: <InlineMath math="53 \times 47 = (50 + 3)(50 - 3) = 2500 - 9 = 2491" />
            </p>
          </div>
        </SubSection>

        <SubSection title="● 식의 값 구하기">
          <p>
            곱셈 공식의 변형을 이용하면 식의 값을 효율적으로 구할 수 있습니다.
          </p>
          <BlockMath math="a^2 + b^2 = (a + b)^2 - 2ab = (a - b)^2 + 2ab" />
          <div className="mt-3 space-y-2">
            <p>
              예: <InlineMath math="a + b = 5" />,{" "}
              <InlineMath math="ab = 3" />일 때
            </p>
            <BlockMath math="a^2 + b^2 = (a + b)^2 - 2ab = 25 - 6 = 19" />
          </div>
        </SubSection>

        <SubSection title="● 곱셈 공식의 변형 정리">
          <div className="rounded-lg border border-sidebar-border p-4 space-y-2 text-sm">
            <BlockMath math="(a + b)^2 = (a - b)^2 + 4ab" />
            <BlockMath math="(a - b)^2 = (a + b)^2 - 4ab" />
            <BlockMath math="a^2 + b^2 = (a + b)^2 - 2ab" />
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
