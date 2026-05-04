import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중1 > Ⅳ. 기본 도형과 작도 > 2. 작도와 합동 */
export default function ConstructionCongruence() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 삼각형의 작도">
        <SubSection title="(1) 작도란">
          <p>
            눈금 없는 자와 컴퍼스만을 사용하여 도형을 그리는 것을{" "}
            <strong>작도</strong>라고 합니다.
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>눈금 없는 자: 두 점을 잇는 직선(선분)을 그을 때 사용</li>
            <li>컴퍼스: 원을 그리거나 선분의 길이를 옮길 때 사용</li>
          </ul>
        </SubSection>

        <SubSection title="(2) 기본 작도">
          <p>다음은 기본적인 작도 방법입니다.</p>
          <div className="mt-3 space-y-4">
            <div className="rounded-lg border border-sidebar-border p-4">
              <p className="font-medium mb-2">① 선분의 길이 옮기기</p>
              <p>
                컴퍼스로 주어진 선분의 길이를 잰 뒤, 다른 위치에 같은 길이의
                선분을 그립니다.
              </p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-4">
              <p className="font-medium mb-2">② 각의 크기 옮기기</p>
              <p>
                컴퍼스를 이용하여 주어진 각과 크기가 같은 각을 작도합니다.
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title="(3) 삼각형의 작도 조건">
          <p>
            삼각형은 다음 세 가지 조건 중 하나가 주어지면 작도할 수 있습니다.
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              <strong>세 변의 길이</strong>가 주어질 때 (단, 가장 긴 변의
              길이가 나머지 두 변의 길이의 합보다 작아야 함)
            </li>
            <li>
              <strong>두 변의 길이와 그 끼인각</strong>의 크기가 주어질 때
            </li>
            <li>
              <strong>한 변의 길이와 그 양 끝각</strong>의 크기가 주어질 때
            </li>
          </ul>
        </SubSection>

        <SubSection title="(4) 삼각형이 만들어지는 조건">
          <p>
            세 변의 길이가 <InlineMath math="a, b, c" />일 때, 삼각형이
            만들어지려면:
          </p>
          <BlockMath math="\text{가장 긴 변의 길이} < \text{나머지 두 변의 길이의 합}" />
          <div className="mt-2 space-y-1">
            <p>
              예: <InlineMath math="3, 4, 5" /> → <InlineMath math="5 < 3 + 4 = 7" /> ✓ 가능
            </p>
            <p>
              예: <InlineMath math="2, 3, 7" /> → <InlineMath math="7 < 2 + 3 = 5" /> ✗ 불가능
            </p>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 삼각형의 합동 조건">
        <SubSection title="(1) 합동의 뜻">
          <p>
            모양과 크기가 같아서 완전히 포개어지는 두 도형을{" "}
            <strong>합동</strong>이라고 합니다. 기호 <InlineMath math="\equiv" />
            로 나타냅니다.
          </p>
          <BlockMath math="\triangle ABC \equiv \triangle DEF" />
          <p className="mt-2">
            합동인 두 도형에서 서로 겹쳐지는 꼭짓점, 변, 각을 각각{" "}
            <strong>대응점</strong>, <strong>대응변</strong>,{" "}
            <strong>대응각</strong>이라고 합니다.
          </p>
        </SubSection>

        <SubSection title="(2) 합동인 도형의 성질">
          <ul className="list-disc pl-6 space-y-1">
            <li>대응변의 길이가 서로 같습니다.</li>
            <li>대응각의 크기가 서로 같습니다.</li>
          </ul>
        </SubSection>

        <SubSection title="(3) 삼각형의 합동 조건">
          <p>
            두 삼각형이 합동이 되기 위한 조건은 다음 세 가지입니다.
          </p>
          <div className="mt-3 space-y-4">
            <div className="rounded-lg border border-sidebar-border p-4">
              <p className="font-medium text-accent mb-1">SSS 합동</p>
              <p>
                세 쌍의 대응변의 길이가 각각 같을 때
              </p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-4">
              <p className="font-medium text-accent mb-1">SAS 합동</p>
              <p>
                두 쌍의 대응변의 길이가 각각 같고, 그 끼인각의 크기가 같을 때
              </p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-4">
              <p className="font-medium text-accent mb-1">ASA 합동</p>
              <p>
                한 쌍의 대응변의 길이가 같고, 그 양 끝각의 크기가 각각 같을 때
              </p>
            </div>
          </div>
        </SubSection>

        <Insight>
          합동 조건에서 SSA(두 변과 끼이지 않는 각)는 합동 조건이{" "}
          <strong>아닙니다</strong>. 끼인각이 아닌 각이 주어지면 삼각형이 하나로
          결정되지 않을 수 있습니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
