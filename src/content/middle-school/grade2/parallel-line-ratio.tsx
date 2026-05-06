import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중2 > Ⅴ. 도형의 닮음 > 1. 평행선과 비 */
export default function ParallelLineRatio() {
  return (
    <div className="space-y-8">
      <CalcBox title="■ 삼각형에서 평행선과 선분의 비">
        <SubSection title="● 삼각형의 한 변에 평행한 직선">
          <p>
            <InlineMath math="\triangle ABC" />에서{" "}
            <InlineMath math="BC \parallel DE" /> (
            <InlineMath math="D" />는 <InlineMath math="AB" /> 위,{" "}
            <InlineMath math="E" />는 <InlineMath math="AC" /> 위)이면:
          </p>
          <BlockMath math="AD : DB = AE : EC" />
          <BlockMath math="AD : AB = AE : AC = DE : BC" />
        </SubSection>

        <SubSection title="● 계산 예시">
          <div className="rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              <InlineMath math="\triangle ABC" />에서{" "}
              <InlineMath math="DE \parallel BC" />,{" "}
              <InlineMath math="AD = 4" />,{" "}
              <InlineMath math="DB = 6" />,{" "}
              <InlineMath math="AE = x" />,{" "}
              <InlineMath math="EC = 9" />일 때
            </p>
            <BlockMath math="AD : DB = AE : EC" />
            <BlockMath math="4 : 6 = x : 9" />
            <BlockMath math="6x = 36 \implies x = 6" />
          </div>
        </SubSection>

        <SubSection title="● 역: 선분의 비가 같으면 평행">
          <p>
            <InlineMath math="\triangle ABC" />에서{" "}
            <InlineMath math="AD : DB = AE : EC" />이면{" "}
            <InlineMath math="DE \parallel BC" />입니다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 평행선 사이의 선분의 길이의 비">
        <SubSection title="● 세 평행선과 두 직선">
          <p>
            세 직선 <InlineMath math="l \parallel m \parallel n" />이 두
            직선과 만날 때, 한 직선 위의 선분의 비와 다른 직선 위의 선분의
            비는 같습니다.
          </p>
          <BlockMath math="AB : BC = DE : EF" />
        </SubSection>

        <SubSection title="● 계산 예시">
          <div className="rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              <InlineMath math="l \parallel m \parallel n" />이고{" "}
              <InlineMath math="AB = 3" />,{" "}
              <InlineMath math="BC = 5" />,{" "}
              <InlineMath math="DE = 6" />일 때{" "}
              <InlineMath math="EF" />를 구하면:
            </p>
            <BlockMath math="3 : 5 = 6 : EF" />
            <BlockMath math="3 \times EF = 30 \implies EF = 10" />
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 삼각형의 각의 이등분선">
        <SubSection title="● 내각의 이등분선">
          <p>
            <InlineMath math="\triangle ABC" />에서{" "}
            <InlineMath math="\angle A" />의 이등분선이{" "}
            <InlineMath math="BC" />와 만나는 점을{" "}
            <InlineMath math="D" />라 하면:
          </p>
          <BlockMath math="BD : DC = AB : AC" />
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              예: <InlineMath math="AB = 6" />,{" "}
              <InlineMath math="AC = 4" />,{" "}
              <InlineMath math="BC = 10" />일 때
            </p>
            <BlockMath math="BD : DC = 6 : 4 = 3 : 2" />
            <BlockMath math="BD = 10 \times \frac{3}{5} = 6, \quad DC = 10 \times \frac{2}{5} = 4" />
          </div>
        </SubSection>

        <SubSection title="● 외각의 이등분선">
          <p>
            <InlineMath math="\triangle ABC" />에서{" "}
            <InlineMath math="\angle A" />의 외각의 이등분선이{" "}
            <InlineMath math="BC" />의 연장선과 만나는 점을{" "}
            <InlineMath math="D'" />라 하면:
          </p>
          <BlockMath math="BD' : D'C = AB : AC" />
          <p className="mt-2">
            (단, <InlineMath math="AB \neq AC" />일 때)
          </p>
        </SubSection>

        <Insight>
          내각의 이등분선은 대변을 <strong>내분</strong>하고, 외각의
          이등분선은 대변을 <strong>외분</strong>합니다. 비율은 같지만
          나누는 위치가 다릅니다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ 삼각형의 중점연결정리">
        <SubSection title="● 중점연결정리">
          <p>
            <InlineMath math="\triangle ABC" />에서 두 변{" "}
            <InlineMath math="AB" />, <InlineMath math="AC" />의 중점을 각각{" "}
            <InlineMath math="M" />, <InlineMath math="N" />이라 하면:
          </p>
          <div className="mt-2 space-y-1">
            <BlockMath math="MN \parallel BC" />
            <BlockMath math="MN = \frac{1}{2} BC" />
          </div>
        </SubSection>

        <SubSection title="● 계산 예시">
          <div className="rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              <InlineMath math="\triangle ABC" />에서{" "}
              <InlineMath math="BC = 12" />일 때, 두 변의 중점을 잇는 선분의
              길이는:
            </p>
            <BlockMath math="MN = \frac{1}{2} \times 12 = 6" />
          </div>
        </SubSection>

        <SubSection title="● 사다리꼴에서의 응용">
          <p>
            사다리꼴 <InlineMath math="ABCD" /> (
            <InlineMath math="AD \parallel BC" />)에서 양쪽 빗변의 중점을
            잇는 선분의 길이:
          </p>
          <BlockMath math="MN = \frac{AD + BC}{2}" />
          <p className="mt-2">
            예: <InlineMath math="AD = 4" />,{" "}
            <InlineMath math="BC = 10" />이면{" "}
            <InlineMath math="MN = \dfrac{4 + 10}{2} = 7" />
          </p>
        </SubSection>
      </CalcBox>
    </div>
  );
}
