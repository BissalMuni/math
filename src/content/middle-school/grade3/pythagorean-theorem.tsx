import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중3 > Ⅴ. 피타고라스 정리 > 1. 피타고라스 정리 */
export default function PythagoreanTheorem() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 피타고라스 정리">
        <SubSection title="(1) 피타고라스 정리의 뜻">
          <p>
            직각삼각형에서 빗변의 길이를 <InlineMath math="c" />, 나머지 두 변의
            길이를 <InlineMath math="a" />, <InlineMath math="b" />라 하면:
          </p>
          <BlockMath math="a^2 + b^2 = c^2" />
          <p className="mt-2">
            즉, <strong>직각을 낀 두 변</strong> 위의 정사각형 넓이의 합은{" "}
            <strong>빗변</strong> 위의 정사각형 넓이와 같습니다.
          </p>
        </SubSection>

        <SubSection title="(2) 변의 길이 구하기">
          <div className="mt-3 space-y-4">
            <div>
              <p className="font-medium">빗변 구하기:</p>
              <p>
                <InlineMath math="a = 3" />, <InlineMath math="b = 4" />일 때
              </p>
              <BlockMath math="c = \sqrt{a^2 + b^2} = \sqrt{9 + 16} = \sqrt{25} = 5" />
            </div>
            <div>
              <p className="font-medium">다른 변 구하기:</p>
              <p>
                <InlineMath math="a = 5" />, <InlineMath math="c = 13" />일 때
              </p>
              <BlockMath math="b = \sqrt{c^2 - a^2} = \sqrt{169 - 25} = \sqrt{144} = 12" />
            </div>
          </div>
        </SubSection>

        <SubSection title="(3) 대표적인 피타고라스 수">
          <p>
            피타고라스 정리를 만족하는 자연수의 조합을{" "}
            <strong>피타고라스 수</strong>라고 합니다.
          </p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 text-sm">
            <div className="space-y-1">
              <p>
                <InlineMath math="(3, 4, 5)" />,{" "}
                <InlineMath math="(5, 12, 13)" />,{" "}
                <InlineMath math="(8, 15, 17)" />
              </p>
              <p>
                <InlineMath math="(7, 24, 25)" />,{" "}
                <InlineMath math="(6, 8, 10)" />,{" "}
                <InlineMath math="(9, 12, 15)" />
              </p>
            </div>
          </div>
          <p className="mt-2 text-sm text-muted">
            피타고라스 수의 각 수에 같은 수를 곱해도 피타고라스 수입니다.
            예: <InlineMath math="(3, 4, 5) \times 2 = (6, 8, 10)" />
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 피타고라스 정리의 역">
        <SubSection title="(1) 정리의 역">
          <p>
            삼각형의 세 변의 길이가 <InlineMath math="a" />,{" "}
            <InlineMath math="b" />, <InlineMath math="c" /> (
            <InlineMath math="c" />가 가장 긴 변)일 때:
          </p>
          <BlockMath math="a^2 + b^2 = c^2 \implies \text{직각삼각형}" />
          <p className="mt-2">
            즉, <InlineMath math="a^2 + b^2 = c^2" />이면 가장 긴 변 대각의
            크기가 <InlineMath math="90°" />인 직각삼각형입니다.
          </p>
        </SubSection>

        <SubSection title="(2) 삼각형의 종류 판별">
          <p>
            세 변 <InlineMath math="a" />, <InlineMath math="b" />,{" "}
            <InlineMath math="c" /> (<InlineMath math="c" />가 가장 긴 변)에서:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-2">
            <li>
              <InlineMath math="a^2 + b^2 = c^2" /> → 직각삼각형
            </li>
            <li>
              <InlineMath math="a^2 + b^2 > c^2" /> → 예각삼각형
            </li>
            <li>
              <InlineMath math="a^2 + b^2 < c^2" /> → 둔각삼각형
            </li>
          </ul>
        </SubSection>

        <SubSection title="(3) 판별 예시">
          <div className="space-y-3">
            <p>
              세 변이 <InlineMath math="5, 7, 9" />인 삼각형:
            </p>
            <BlockMath math="5^2 + 7^2 = 25 + 49 = 74, \quad 9^2 = 81" />
            <p>
              <InlineMath math="74 < 81" />이므로 <strong>둔각삼각형</strong>
            </p>
          </div>
        </SubSection>

        <Insight>
          피타고라스 정리의 역을 이용하면 세 변의 길이만으로 삼각형의 종류를
          알 수 있습니다. 반드시 가장 긴 변을 <InlineMath math="c" />로 놓아야
          합니다.
        </Insight>
      </CalcBox>

      <CalcBox title="3. 직각삼각형의 성질">
        <SubSection title="(1) 직각삼각형의 닮음">
          <p>
            직각삼각형의 빗변 위에 꼭짓점에서 수선을 내리면, 원래 삼각형과
            닮음인 두 삼각형이 만들어집니다.
          </p>
          <p className="mt-2">
            직각삼각형 ABC에서 꼭짓점 A에서 빗변 BC에 수선 AH를 내리면:
          </p>
          <BlockMath math="AH^2 = BH \times HC" />
          <BlockMath math="AB^2 = BH \times BC, \quad AC^2 = HC \times BC" />
        </SubSection>

        <SubSection title="(2) 계산 예시">
          <div className="rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">
              직각삼각형에서 <InlineMath math="BH = 4" />,{" "}
              <InlineMath math="HC = 9" />일 때 수선 AH의 길이
            </p>
            <BlockMath math="AH^2 = BH \times HC = 4 \times 9 = 36" />
            <BlockMath math="AH = 6" />
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
