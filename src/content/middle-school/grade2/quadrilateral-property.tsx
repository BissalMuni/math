import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중2 > Ⅳ. 도형의 성질 > 2. 사각형의 성질 */
export default function QuadrilateralProperty() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 평행사변형">
        <SubSection title="(1) 평행사변형의 정의">
          <p>
            두 쌍의 대변이 각각 <strong>평행</strong>한 사각형을{" "}
            <strong>평행사변형</strong>이라고 합니다.
          </p>
          <BlockMath math="AB \parallel DC, \quad AD \parallel BC" />
        </SubSection>

        <SubSection title="(2) 평행사변형의 성질">
          <div className="space-y-1">
            <p>① 두 쌍의 대변의 길이가 각각 같다: <InlineMath math="AB = DC" />, <InlineMath math="AD = BC" /></p>
            <p>② 두 쌍의 대각의 크기가 각각 같다: <InlineMath math="\angle A = \angle C" />, <InlineMath math="\angle B = \angle D" /></p>
            <p>③ 두 대각선은 서로 다른 것을 이등분한다: <InlineMath math="OA = OC" />, <InlineMath math="OB = OD" /></p>
            <p>④ 이웃하는 두 내각의 합은 <InlineMath math="180°" /></p>
          </div>
        </SubSection>

        <SubSection title="(3) 평행사변형이 되는 조건">
          <p>다음 중 하나를 만족하면 평행사변형입니다.</p>
          <div className="mt-2 space-y-1">
            <p>① 두 쌍의 대변이 각각 평행하다.</p>
            <p>② 두 쌍의 대변의 길이가 각각 같다.</p>
            <p>③ 두 쌍의 대각의 크기가 각각 같다.</p>
            <p>④ 두 대각선이 서로 다른 것을 이등분한다.</p>
            <p>⑤ 한 쌍의 대변이 평행하고 그 길이가 같다.</p>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 여러 가지 사각형">
        <SubSection title="(1) 직사각형">
          <p>
            네 각이 모두 <strong>직각</strong>인 사각형입니다.
            (평행사변형 + 한 내각이 직각)
          </p>
          <div className="mt-2 space-y-1">
            <p>성질: 두 대각선의 길이가 같다. (<InlineMath math="AC = BD" />)</p>
            <p>성질: 두 대각선이 서로 다른 것을 이등분한다.</p>
          </div>
        </SubSection>

        <SubSection title="(2) 마름모">
          <p>
            네 변의 길이가 모두 <strong>같은</strong> 사각형입니다.
            (평행사변형 + 이웃하는 두 변의 길이가 같음)
          </p>
          <div className="mt-2 space-y-1">
            <p>성질: 두 대각선이 서로 다른 것을 수직이등분한다. (<InlineMath math="AC \perp BD" />)</p>
          </div>
        </SubSection>

        <SubSection title="(3) 정사각형">
          <p>
            네 변의 길이가 모두 같고 네 각이 모두 직각인 사각형입니다.
            (직사각형이면서 마름모)
          </p>
          <div className="mt-2 space-y-1">
            <p>성질: 두 대각선의 길이가 같다.</p>
            <p>성질: 두 대각선이 서로 다른 것을 수직이등분한다.</p>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="3. 사각형 사이의 관계">
        <SubSection title="(1) 포함 관계">
          <p>
            사각형들 사이에는 다음과 같은 포함 관계가 성립합니다.
          </p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p>정사각형 ⊂ 직사각형 ⊂ 평행사변형 ⊂ 사다리꼴</p>
            <p>정사각형 ⊂ 마름모 ⊂ 평행사변형 ⊂ 사다리꼴</p>
          </div>
          <div className="mt-2 space-y-1">
            <p>
              평행사변형에서 한 내각이 <InlineMath math="90°" />이면 → 직사각형
            </p>
            <p>
              평행사변형에서 이웃하는 두 변이 같으면 → 마름모
            </p>
            <p>
              직사각형이면서 마름모 → 정사각형
            </p>
          </div>
        </SubSection>

        <SubSection title="(2) 대각선 성질로 구분">
          <div className="overflow-x-auto">
            <table className="text-sm text-center mt-2">
              <thead>
                <tr className="border-b border-sidebar-border">
                  <td className="px-3 py-2 font-medium">사각형</td>
                  <td className="px-3 py-2 font-medium">대각선이 이등분</td>
                  <td className="px-3 py-2 font-medium">대각선 길이 같음</td>
                  <td className="px-3 py-2 font-medium">대각선이 수직</td>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-sidebar-border">
                  <td className="px-3 py-2">평행사변형</td>
                  <td className="px-3 py-2">O</td>
                  <td className="px-3 py-2">X</td>
                  <td className="px-3 py-2">X</td>
                </tr>
                <tr className="border-b border-sidebar-border">
                  <td className="px-3 py-2">직사각형</td>
                  <td className="px-3 py-2">O</td>
                  <td className="px-3 py-2">O</td>
                  <td className="px-3 py-2">X</td>
                </tr>
                <tr className="border-b border-sidebar-border">
                  <td className="px-3 py-2">마름모</td>
                  <td className="px-3 py-2">O</td>
                  <td className="px-3 py-2">X</td>
                  <td className="px-3 py-2">O</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">정사각형</td>
                  <td className="px-3 py-2">O</td>
                  <td className="px-3 py-2">O</td>
                  <td className="px-3 py-2">O</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <Insight>
          정사각형은 직사각형의 성질과 마름모의 성질을 모두 가지고 있습니다.
          사각형의 포함 관계를 그림으로 정리해 두면 기억하기 쉽습니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
