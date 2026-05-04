import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중1 > Ⅴ. 평면도형과 입체도형 > 1. 평면도형의 성질 */
export default function PlaneFigure() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 다각형의 성질">
        <SubSection title="(1) 다각형의 대각선">
          <p>
            다각형에서 이웃하지 않는 두 꼭짓점을 잇는 선분을{" "}
            <strong>대각선</strong>이라고 합니다.
          </p>
          <p className="mt-2">
            <InlineMath math="n" />각형의 한 꼭짓점에서 그을 수 있는 대각선의
            수:
          </p>
          <BlockMath math="n - 3 \text{ (개)}" />
          <p>
            <InlineMath math="n" />각형의 대각선의 총 수:
          </p>
          <BlockMath math="\frac{n(n-3)}{2} \text{ (개)}" />
          <div className="mt-2 rounded-lg border border-sidebar-border p-4 text-sm">
            <p>
              예: 오각형 → <InlineMath math="\frac{5 \times 2}{2} = 5" />개,
              육각형 → <InlineMath math="\frac{6 \times 3}{2} = 9" />개
            </p>
          </div>
        </SubSection>

        <SubSection title="(2) 다각형의 내각의 합">
          <p>
            <InlineMath math="n" />각형의 내각의 합:
          </p>
          <BlockMath math="180° \times (n - 2)" />
          <div className="mt-2 space-y-1">
            <p>
              삼각형: <InlineMath math="180° \times 1 = 180°" />
            </p>
            <p>
              사각형: <InlineMath math="180° \times 2 = 360°" />
            </p>
            <p>
              오각형: <InlineMath math="180° \times 3 = 540°" />
            </p>
            <p>
              육각형: <InlineMath math="180° \times 4 = 720°" />
            </p>
          </div>
        </SubSection>

        <SubSection title="(3) 다각형의 외각의 합">
          <p>
            <strong>모든 다각형</strong>의 외각의 합은 항상:
          </p>
          <BlockMath math="360°" />
          <p className="mt-2">
            이는 삼각형이든 십각형이든 꼭짓점 수에 관계없이 항상 성립합니다.
          </p>
        </SubSection>

        <SubSection title="(4) 정다각형의 한 내각과 한 외각">
          <p>
            정<InlineMath math="n" />각형의 한 내각의 크기:
          </p>
          <BlockMath math="\frac{180° \times (n - 2)}{n}" />
          <p>
            정<InlineMath math="n" />각형의 한 외각의 크기:
          </p>
          <BlockMath math="\frac{360°}{n}" />
          <div className="mt-2 rounded-lg border border-sidebar-border p-4 text-sm">
            <p>
              예: 정육각형 → 한 내각 <InlineMath math="= \frac{720°}{6} = 120°" />,
              한 외각 <InlineMath math="= \frac{360°}{6} = 60°" />
            </p>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 원과 부채꼴의 성질">
        <SubSection title="(1) 원의 기본 용어">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>원</strong>: 한 점(중심)에서 같은 거리에 있는 점들의 모임
            </li>
            <li>
              <strong>반지름</strong>(<InlineMath math="r" />): 중심에서 원 위의 한 점까지의 거리
            </li>
            <li>
              <strong>지름</strong>: 원 위의 두 점을 잇는 선분 중 중심을 지나는 것 (<InlineMath math="= 2r" />)
            </li>
            <li>
              <strong>호</strong>: 원 위의 두 점 사이의 원의 일부분
            </li>
            <li>
              <strong>현</strong>: 원 위의 두 점을 잇는 선분
            </li>
          </ul>
        </SubSection>

        <SubSection title="(2) 부채꼴">
          <p>
            원에서 두 반지름과 호로 이루어진 도형을{" "}
            <strong>부채꼴</strong>이라 하고, 두 반지름이 이루는 각을{" "}
            <strong>중심각</strong>이라고 합니다.
          </p>
          <p className="mt-2">
            같은 원에서 중심각의 크기가 같으면 호의 길이와 부채꼴의 넓이도 같습니다.
          </p>
        </SubSection>

        <SubSection title="(3) 부채꼴의 호의 길이와 넓이">
          <p>
            반지름이 <InlineMath math="r" />, 중심각이{" "}
            <InlineMath math="x°" />인 부채꼴에서:
          </p>
          <p className="mt-2">호의 길이:</p>
          <BlockMath math="l = 2\pi r \times \frac{x}{360}" />
          <p>넓이:</p>
          <BlockMath math="S = \pi r^2 \times \frac{x}{360} = \frac{1}{2} l r" />
        </SubSection>

        <SubSection title="(4) 계산 예시">
          <div className="rounded-lg border border-sidebar-border p-4 space-y-3">
            <p>
              반지름 <InlineMath math="6" />cm, 중심각 <InlineMath math="120°" />인
              부채꼴
            </p>
            <p>호의 길이:</p>
            <BlockMath math="l = 2\pi \times 6 \times \frac{120}{360} = 12\pi \times \frac{1}{3} = 4\pi \;\text{(cm)}" />
            <p>넓이:</p>
            <BlockMath math="S = \pi \times 6^2 \times \frac{120}{360} = 36\pi \times \frac{1}{3} = 12\pi \;\text{(cm}^2\text{)}" />
          </div>
        </SubSection>

        <Insight>
          부채꼴의 넓이 공식 <InlineMath math="S = \frac{1}{2}lr" />은 삼각형의
          넓이 공식과 비슷한 형태입니다. 호의 길이{" "}
          <InlineMath math="l" />이 밑변, 반지름 <InlineMath math="r" />이
          높이에 대응합니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
