import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중1 > Ⅳ. 기본 도형과 작도 > 1. 기본 도형 */
export default function BasicFigureConcept() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 점, 선, 면, 각">
        <SubSection title="(1) 점, 선, 면">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>점</strong>: 크기가 없고 위치만 있는 것. 도형의 가장 기본
              요소입니다.
            </li>
            <li>
              <strong>선</strong>: 점이 움직인 자취. 곧은 선(직선)과 굽은 선(곡선)이
              있습니다.
            </li>
            <li>
              <strong>면</strong>: 선이 움직인 자취. 평평한 면(평면)과 굽은
              면(곡면)이 있습니다.
            </li>
          </ul>
        </SubSection>

        <SubSection title="(2) 직선, 반직선, 선분">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>직선 AB</strong>: 두 점 A, B를 지나며 양쪽으로 끝없이
              뻗은 곧은 선
            </li>
            <li>
              <strong>반직선 AB</strong>: 점 A에서 시작하여 점 B 쪽으로 끝없이
              뻗은 곧은 선
            </li>
            <li>
              <strong>선분 AB</strong>: 두 점 A, B를 양 끝점으로 하는 곧은 선
            </li>
          </ul>
          <p className="mt-3">
            선분 AB의 길이를 <InlineMath math="\overline{AB}" />로 나타냅니다.
          </p>
        </SubSection>

        <SubSection title="(3) 두 점 사이의 거리">
          <p>
            두 점 A, B를 잇는 선 중 <strong>선분 AB</strong>의 길이가 가장
            짧습니다. 이를 <strong>두 점 사이의 거리</strong>라고 합니다.
          </p>
        </SubSection>

        <SubSection title="(4) 각">
          <p>
            한 점에서 시작하는 두 반직선이 이루는 도형을 <strong>각</strong>이라
            하고, 그 한 점을 <strong>꼭짓점</strong>, 두 반직선을{" "}
            <strong>변</strong>이라고 합니다.
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              예각: <InlineMath math="0° < \angle < 90°" />
            </li>
            <li>
              직각: <InlineMath math="\angle = 90°" />
            </li>
            <li>
              둔각: <InlineMath math="90° < \angle < 180°" />
            </li>
            <li>
              평각: <InlineMath math="\angle = 180°" />
            </li>
          </ul>
        </SubSection>

        <SubSection title="(5) 맞꼭지각">
          <p>
            두 직선이 만날 때 마주 보는 두 각을{" "}
            <strong>맞꼭지각</strong>이라 합니다.
          </p>
          <BlockMath math="\text{맞꼭지각의 크기는 서로 같습니다.}" />
          <p className="mt-2">
            예: 두 직선이 만들어 <InlineMath math="\angle a = 70°" />이면, 맞꼭지각도{" "}
            <InlineMath math="70°" />이고, 이웃한 각은{" "}
            <InlineMath math="180° - 70° = 110°" />입니다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 위치 관계">
        <SubSection title="(1) 점과 직선의 위치 관계">
          <p>
            점은 직선 위에 있거나 직선 위에 있지 않습니다. 직선 위에 있지 않은
            점에서 직선에 <strong>수선</strong>(수직인 선)을 내렸을 때, 그
            길이를 <strong>점과 직선 사이의 거리</strong>라고 합니다.
          </p>
        </SubSection>

        <SubSection title="(2) 두 직선의 위치 관계 (평면)">
          <p>같은 평면 위의 두 직선은 다음 세 가지 중 하나입니다.</p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              <strong>만난다</strong> — 한 점에서 교차 (수직일 수도 있음)
            </li>
            <li>
              <strong>평행하다</strong> — 만나지 않고 항상 같은 거리를 유지
            </li>
            <li>
              <strong>일치한다</strong> — 완전히 겹침
            </li>
          </ul>
        </SubSection>

        <SubSection title="(3) 두 직선의 위치 관계 (공간)">
          <p>공간에서 두 직선의 위치 관계에는 한 가지가 더 있습니다.</p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>만난다</li>
            <li>평행하다</li>
            <li>
              <strong>꼬인 위치에 있다</strong> — 만나지도 않고 평행하지도 않음
            </li>
          </ul>
        </SubSection>

        <SubSection title="(4) 수직과 수선">
          <p>
            두 직선이 만나서 이루는 각이 <InlineMath math="90°" />일 때, 두
            직선은 <strong>수직</strong>이라 하고, 기호{" "}
            <InlineMath math="\perp" />로 나타냅니다.
          </p>
          <BlockMath math="l \perp m" />
          <p className="mt-2">
            직선 <InlineMath math="l" /> 위에 있지 않은 점 P에서 직선{" "}
            <InlineMath math="l" />에 수선을 그으면, 수선의 발까지의 거리가{" "}
            <strong>점과 직선 사이의 최단 거리</strong>입니다.
          </p>
        </SubSection>

        <Insight>
          평행한 두 직선 사이의 거리는 어느 점에서 수선을 내려도 항상 같습니다.
          이것이 &ldquo;평행&rdquo;의 핵심 성질입니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
