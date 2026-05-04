import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중3 > Ⅴ. 피타고라스 정리 > 2. 피타고라스 정리의 활용 */
export default function PythagoreanApplication() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 평면도형에서의 활용">
        <SubSection title="(1) 직각삼각형의 높이">
          <p>
            이등변삼각형이나 정삼각형의 높이를 피타고라스 정리로 구할 수 있습니다.
          </p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">
              한 변의 길이가 <InlineMath math="a" />인 정삼각형의 높이
            </p>
            <p>
              밑변의 중점까지 거리가 <InlineMath math="\dfrac{a}{2}" />이므로:
            </p>
            <BlockMath math="h = \sqrt{a^2 - \left(\frac{a}{2}\right)^2} = \sqrt{\frac{3a^2}{4}} = \frac{\sqrt{3}}{2}a" />
            <p className="mt-2">넓이:</p>
            <BlockMath math="S = \frac{1}{2} \times a \times \frac{\sqrt{3}}{2}a = \frac{\sqrt{3}}{4}a^2" />
          </div>
        </SubSection>

        <SubSection title="(2) 직사각형의 대각선">
          <p>
            가로 <InlineMath math="a" />, 세로 <InlineMath math="b" />인
            직사각형의 대각선 <InlineMath math="d" />:
          </p>
          <BlockMath math="d = \sqrt{a^2 + b^2}" />
          <p className="mt-2">
            예: 가로 6, 세로 8 → <InlineMath math="d = \sqrt{36 + 64} = 10" />
          </p>
        </SubSection>

        <SubSection title="(3) 원과 현">
          <p>
            반지름 <InlineMath math="r" />인 원에서, 원의 중심에서 현까지의
            거리가 <InlineMath math="d" />이면 현의 길이 <InlineMath math="l" />은:
          </p>
          <BlockMath math="\frac{l}{2} = \sqrt{r^2 - d^2} \implies l = 2\sqrt{r^2 - d^2}" />
          <div className="mt-3 space-y-1">
            <p>
              예: <InlineMath math="r = 5" />, <InlineMath math="d = 3" />일 때
            </p>
            <BlockMath math="l = 2\sqrt{25 - 9} = 2\sqrt{16} = 8" />
          </div>
        </SubSection>

        <Insight>
          평면도형 문제에서는 수선을 그어 직각삼각형을 만드는 것이 핵심
          전략입니다. 정삼각형의 높이 <InlineMath math="\dfrac{\sqrt{3}}{2}a" />는
          자주 사용되므로 암기하면 편리합니다.
        </Insight>
      </CalcBox>

      <CalcBox title="2. 좌표평면에서 두 점 사이의 거리">
        <SubSection title="(1) 두 점 사이의 거리 공식">
          <p>
            좌표평면 위의 두 점{" "}
            <InlineMath math="A(x_1, y_1)" />, <InlineMath math="B(x_2, y_2)" />{" "}
            사이의 거리는:
          </p>
          <BlockMath math="AB = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}" />
          <p className="mt-2">
            이 공식은 피타고라스 정리를 좌표평면에 적용한 것입니다.
          </p>
        </SubSection>

        <SubSection title="(2) 거리 공식 예시">
          <div className="space-y-4">
            <div>
              <p>
                두 점 <InlineMath math="A(1, 2)" />,{" "}
                <InlineMath math="B(4, 6)" /> 사이의 거리:
              </p>
              <BlockMath math="AB = \sqrt{(4-1)^2 + (6-2)^2} = \sqrt{9 + 16} = \sqrt{25} = 5" />
            </div>
            <div>
              <p>
                두 점 <InlineMath math="A(-2, 3)" />,{" "}
                <InlineMath math="B(1, -1)" /> 사이의 거리:
              </p>
              <BlockMath math="AB = \sqrt{(1+2)^2 + (-1-3)^2} = \sqrt{9 + 16} = 5" />
            </div>
          </div>
        </SubSection>

        <SubSection title="(3) 특수한 경우">
          <p>
            원점 <InlineMath math="O(0, 0)" />과 점{" "}
            <InlineMath math="P(a, b)" /> 사이의 거리:
          </p>
          <BlockMath math="OP = \sqrt{a^2 + b^2}" />
          <p className="mt-2">
            같은 축 위의 두 점: 한 좌표가 같으면 다른 좌표의 차의 절댓값이
            거리입니다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="3. 입체도형에서의 활용">
        <SubSection title="(1) 직육면체의 대각선">
          <p>
            가로 <InlineMath math="a" />, 세로 <InlineMath math="b" />,
            높이 <InlineMath math="c" />인 직육면체의 대각선 <InlineMath math="d" />:
          </p>
          <BlockMath math="d = \sqrt{a^2 + b^2 + c^2}" />
          <p className="mt-2">
            예: <InlineMath math="a = 3" />, <InlineMath math="b = 4" />,{" "}
            <InlineMath math="c = 12" />
          </p>
          <BlockMath math="d = \sqrt{9 + 16 + 144} = \sqrt{169} = 13" />
        </SubSection>

        <SubSection title="(2) 원뿔의 모선 길이">
          <p>
            밑면의 반지름 <InlineMath math="r" />, 높이 <InlineMath math="h" />인
            원뿔의 모선 <InlineMath math="l" />:
          </p>
          <BlockMath math="l = \sqrt{r^2 + h^2}" />
          <p className="mt-2">
            예: <InlineMath math="r = 3" />, <InlineMath math="h = 4" /> →{" "}
            <InlineMath math="l = 5" />
          </p>
        </SubSection>

        <SubSection title="(3) 최단 거리 문제">
          <p>
            원기둥이나 직육면체의 겉면을 따라 최단 거리를 구할 때는 전개도를
            펼쳐 직선 거리(피타고라스 정리)로 계산합니다.
          </p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">
              예: 밑면 한 변 4, 높이 3인 정사각기둥의 밑면 꼭짓점에서 대각
              꼭짓점까지의 겉면 최단 거리
            </p>
            <p>전개도에서 가로 <InlineMath math="4 + 4 = 8" />, 세로 3</p>
            <BlockMath math="d = \sqrt{8^2 + 3^2} = \sqrt{73}" />
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
