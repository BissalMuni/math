import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중2 > Ⅴ. 도형의 닮음 > 2. 닮음 개념 */
export default function SimilarityConcept() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 닮음의 뜻">
        <SubSection title="(1) 닮은 도형">
          <p>
            한 도형을 일정한 비율로 확대 또는 축소한 것과 합동인 도형을{" "}
            <strong>닮은 도형</strong>이라 하고, 기호{" "}
            <InlineMath math="\sim" />를 사용합니다.
          </p>
          <BlockMath math="\triangle ABC \sim \triangle DEF" />
        </SubSection>

        <SubSection title="(2) 닮음비">
          <p>
            닮은 두 도형의 대응하는 변의 길이의 비를 <strong>닮음비</strong>라고
            합니다.
          </p>
          <p className="mt-2">
            <InlineMath math="\triangle ABC \sim \triangle DEF" />이고{" "}
            <InlineMath math="AB : DE = 2 : 3" />이면, 닮음비는{" "}
            <InlineMath math="2 : 3" />입니다.
          </p>
        </SubSection>

        <SubSection title="(3) 닮은 도형의 성질">
          <div className="space-y-1">
            <p>① 대응하는 변의 길이의 비가 모두 같다.</p>
            <p>② 대응하는 각의 크기가 각각 같다.</p>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 삼각형의 닮음 조건">
        <SubSection title="(1) AA 닮음">
          <p>
            두 쌍의 대응하는 각의 크기가 각각 같으면 두 삼각형은 닮음입니다.
          </p>
          <BlockMath math="\angle A = \angle D, \; \angle B = \angle E \implies \triangle ABC \sim \triangle DEF" />
          <p className="mt-2">
            (삼각형의 세 내각의 합이 <InlineMath math="180°" />이므로,
            두 각이 같으면 나머지 한 각도 자동으로 같습니다.)
          </p>
        </SubSection>

        <SubSection title="(2) SAS 닮음">
          <p>
            두 쌍의 대응하는 변의 길이의 비가 같고, 그 끼인각의 크기가 같으면
            두 삼각형은 닮음입니다.
          </p>
          <BlockMath math="AB : DE = AC : DF, \; \angle A = \angle D \implies \triangle ABC \sim \triangle DEF" />
        </SubSection>

        <SubSection title="(3) SSS 닮음">
          <p>
            세 쌍의 대응하는 변의 길이의 비가 모두 같으면 두 삼각형은
            닮음입니다.
          </p>
          <BlockMath math="AB : DE = BC : EF = CA : FD \implies \triangle ABC \sim \triangle DEF" />
        </SubSection>

        <Insight>
          닮음 조건 중 <strong>AA 닮음</strong>이 가장 자주 사용됩니다.
          평행선이 있으면 동위각·엇각이 같으므로 AA 닮음을 쉽게 찾을 수 있습니다.
        </Insight>
      </CalcBox>

      <CalcBox title="3. 닮음의 활용">
        <SubSection title="(1) 닮음비와 넓이비, 부피비">
          <p>
            닮음비가 <InlineMath math="m : n" />이면:
          </p>
          <div className="mt-2 space-y-1">
            <BlockMath math="\text{둘레의 비} = m : n" />
            <BlockMath math="\text{넓이의 비} = m^2 : n^2" />
            <BlockMath math="\text{부피의 비} = m^3 : n^3" />
          </div>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              예: 닮음비가 <InlineMath math="2 : 3" />인 두 삼각형
            </p>
            <p>
              넓이의 비: <InlineMath math="2^2 : 3^2 = 4 : 9" />
            </p>
          </div>
        </SubSection>

        <SubSection title="(2) 직각삼각형에서의 닮음">
          <p>
            직각삼각형의 직각 꼭짓점에서 빗변에 내린 수선은 두 개의 작은
            직각삼각형을 만들고, 이 세 삼각형은 모두 닮음입니다.
          </p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              <InlineMath math="\triangle ABC" /> (
              <InlineMath math="\angle C = 90°" />)에서{" "}
              <InlineMath math="CH \perp AB" />일 때:
            </p>
            <BlockMath math="\triangle ABC \sim \triangle ACH \sim \triangle CBH" />
            <p>이로부터 다음 관계가 성립합니다:</p>
            <BlockMath math="CH^2 = AH \times BH" />
            <BlockMath math="AC^2 = AH \times AB" />
            <BlockMath math="BC^2 = BH \times AB" />
          </div>
        </SubSection>

        <SubSection title="(3) 실생활 활용">
          <div className="rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              건물의 높이 구하기: 같은 시각에 길이 1m인 막대의 그림자가 0.8m이고,
              건물의 그림자가 12m일 때 건물의 높이는?
            </p>
            <BlockMath math="1 : 0.8 = h : 12" />
            <BlockMath math="0.8h = 12 \implies h = 15 \text{ (m)}" />
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
