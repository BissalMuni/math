import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중2 > Ⅳ. 도형의 성질 > 1. 삼각형의 성질 */
export default function TriangleProperty() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 이등변삼각형">
        <SubSection title="(1) 이등변삼각형의 성질">
          <p>
            두 변의 길이가 같은 삼각형을 <strong>이등변삼각형</strong>이라고
            합니다.
          </p>
          <div className="mt-2 space-y-1">
            <p>
              <strong>성질 1:</strong> 두 밑각의 크기가 같다.
            </p>
            <p>
              <InlineMath math="AB = AC" />이면{" "}
              <InlineMath math="\angle B = \angle C" />
            </p>
            <p className="mt-2">
              <strong>성질 2:</strong> 꼭지각의 이등분선은 밑변을 수직이등분한다.
            </p>
          </div>
        </SubSection>

        <SubSection title="(2) 이등변삼각형이 되는 조건">
          <p>다음 중 하나를 만족하면 이등변삼각형입니다.</p>
          <div className="mt-2 space-y-1">
            <p>① 두 변의 길이가 같다.</p>
            <p>② 두 내각의 크기가 같다.</p>
          </div>
        </SubSection>

        <SubSection title="(3) 정삼각형">
          <p>
            세 변의 길이가 모두 같은 삼각형을 <strong>정삼각형</strong>이라 하며,
            세 내각의 크기가 모두 <InlineMath math="60°" />입니다.
          </p>
          <BlockMath math="\angle A = \angle B = \angle C = 60°" />
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 삼각형의 외심과 내심">
        <SubSection title="(1) 삼각형의 외심">
          <p>
            삼각형의 세 변의 <strong>수직이등분선</strong>은 한 점에서 만납니다.
            이 점을 삼각형의 <strong>외심</strong>이라 하고,
            외심에서 세 꼭짓점까지의 거리가 모두 같습니다.
          </p>
          <BlockMath math="OA = OB = OC = R \quad \text{(외접원의 반지름)}" />
          <div className="mt-2 space-y-1">
            <p>
              예각삼각형: 외심이 삼각형 <strong>내부</strong>에 있음
            </p>
            <p>
              직각삼각형: 외심이 <strong>빗변의 중점</strong>에 있음
            </p>
            <p>
              둔각삼각형: 외심이 삼각형 <strong>외부</strong>에 있음
            </p>
          </div>
        </SubSection>

        <SubSection title="(2) 삼각형의 내심">
          <p>
            삼각형의 세 내각의 <strong>이등분선</strong>은 한 점에서 만납니다.
            이 점을 삼각형의 <strong>내심</strong>이라 하고,
            내심에서 세 변까지의 거리가 모두 같습니다.
          </p>
          <BlockMath math="ID = IE = IF = r \quad \text{(내접원의 반지름)}" />
          <p className="mt-2">
            내심은 항상 삼각형의 <strong>내부</strong>에 있습니다.
          </p>
        </SubSection>

        <SubSection title="(3) 내심의 성질 활용">
          <p>
            삼각형 ABC의 내심을 I라 할 때:
          </p>
          <BlockMath math="\angle BIC = 90° + \frac{\angle A}{2}" />
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              예: <InlineMath math="\angle A = 80°" />일 때
            </p>
            <BlockMath math="\angle BIC = 90° + \frac{80°}{2} = 90° + 40° = 130°" />
          </div>
        </SubSection>

        <Insight>
          외심은 &ldquo;수직이등분선의 교점&rdquo;, 내심은 &ldquo;각의
          이등분선의 교점&rdquo;으로 구별하세요. 외심은 세 꼭짓점까지 거리가
          같고, 내심은 세 변까지 거리가 같습니다.
        </Insight>
      </CalcBox>

      <CalcBox title="3. 삼각형의 합동">
        <SubSection title="(1) 합동의 뜻">
          <p>
            모양과 크기가 같아서 포개었을 때 완전히 겹치는 두 도형을{" "}
            <strong>합동</strong>이라 합니다. 기호 <InlineMath math="\equiv" />를
            사용합니다.
          </p>
        </SubSection>

        <SubSection title="(2) 삼각형의 합동 조건">
          <p>다음 세 가지 중 하나를 만족하면 두 삼각형은 합동입니다.</p>
          <div className="mt-2 space-y-2">
            <p>
              <strong>SSS 합동:</strong> 세 변의 길이가 각각 같다.
            </p>
            <p>
              <strong>SAS 합동:</strong> 두 변의 길이와 그 끼인각의 크기가 각각 같다.
            </p>
            <p>
              <strong>ASA 합동:</strong> 한 변의 길이와 그 양 끝 각의 크기가 각각 같다.
            </p>
          </div>
        </SubSection>

        <SubSection title="(3) 합동 조건의 활용">
          <div className="rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              <InlineMath math="\triangle ABC" />에서{" "}
              <InlineMath math="M" />이 <InlineMath math="BC" />의 중점이고{" "}
              <InlineMath math="AM \perp BC" />이면,{" "}
              <InlineMath math="\triangle ABM \equiv \triangle ACM" /> (SAS 합동)
            </p>
            <p>
              <InlineMath math="BM = CM" />,{" "}
              <InlineMath math="\angle AMB = \angle AMC = 90°" />,{" "}
              <InlineMath math="AM" />은 공통
            </p>
            <p>
              따라서 <InlineMath math="AB = AC" /> (이등변삼각형)
            </p>
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
