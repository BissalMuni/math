import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중1 > Ⅴ. 평면도형과 입체도형 > 2. 입체도형의 성질 */
export default function SolidFigure() {
  return (
    <div className="space-y-8">
      <CalcBox title="■ 다면체와 회전체">
        <SubSection title="● 다면체">
          <p>
            다각형인 면으로만 둘러싸인 입체도형을{" "}
            <strong>다면체</strong>라고 합니다.
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              <strong>각기둥</strong>: 두 밑면이 서로 합동인 다각형이고, 옆면이
              직사각형인 다면체
            </li>
            <li>
              <strong>각뿔</strong>: 밑면이 다각형이고, 옆면이 삼각형인 다면체
              (꼭짓점이 하나)
            </li>
            <li>
              <strong>각뿔대</strong>: 각뿔을 밑면에 평행한 평면으로 자른 아래
              부분
            </li>
          </ul>
        </SubSection>

        <SubSection title="● 다면체의 꼭짓점·모서리·면의 수">
          <div className="rounded-lg border border-sidebar-border p-4">
            <table className="w-full text-center text-sm">
              <thead>
                <tr className="border-b border-sidebar-border">
                  <td className="py-2 font-medium">도형</td>
                  <td className="py-2 font-medium">꼭짓점</td>
                  <td className="py-2 font-medium">모서리</td>
                  <td className="py-2 font-medium">면</td>
                </tr>
              </thead>
              <tbody className="space-y-1">
                <tr className="border-b border-sidebar-border">
                  <td className="py-2"><InlineMath math="n" />각기둥</td>
                  <td className="py-2"><InlineMath math="2n" /></td>
                  <td className="py-2"><InlineMath math="3n" /></td>
                  <td className="py-2"><InlineMath math="n + 2" /></td>
                </tr>
                <tr>
                  <td className="py-2"><InlineMath math="n" />각뿔</td>
                  <td className="py-2"><InlineMath math="n + 1" /></td>
                  <td className="py-2"><InlineMath math="2n" /></td>
                  <td className="py-2"><InlineMath math="n + 1" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="● 정다면체">
          <p>
            모든 면이 합동인 정다각형이고, 각 꼭짓점에 모이는 면의 수가 같은
            다면체를 <strong>정다면체</strong>라고 합니다. 정다면체는{" "}
            <strong>5가지</strong>뿐입니다.
          </p>
          <div className="mt-2 rounded-lg border border-sidebar-border p-4">
            <ul className="space-y-1 text-sm">
              <li>정사면체: 정삼각형 4개</li>
              <li>정육면체: 정사각형 6개</li>
              <li>정팔면체: 정삼각형 8개</li>
              <li>정십이면체: 정오각형 12개</li>
              <li>정이십면체: 정삼각형 20개</li>
            </ul>
          </div>
        </SubSection>

        <SubSection title="● 회전체">
          <p>
            평면도형을 한 직선(회전축)을 중심으로 1회전 시켜 생기는 입체도형을{" "}
            <strong>회전체</strong>라고 합니다.
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              직사각형 → <strong>원기둥</strong>
            </li>
            <li>
              직각삼각형 → <strong>원뿔</strong>
            </li>
            <li>
              반원 → <strong>구</strong>
            </li>
          </ul>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 입체도형의 겉넓이와 부피">
        <SubSection title="● 기둥의 겉넓이와 부피">
          <p>
            밑면의 넓이를 <InlineMath math="S" />, 높이를{" "}
            <InlineMath math="h" />, 밑면의 둘레를{" "}
            <InlineMath math="l" />이라 하면:
          </p>
          <BlockMath math="\text{겉넓이} = 2S + lh" />
          <BlockMath math="\text{부피} = Sh" />
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">원기둥 (반지름 <InlineMath math="r" />, 높이 <InlineMath math="h" />)</p>
            <BlockMath math="\text{겉넓이} = 2\pi r^2 + 2\pi r h = 2\pi r(r + h)" />
            <BlockMath math="\text{부피} = \pi r^2 h" />
          </div>
        </SubSection>

        <SubSection title="● 뿔의 겉넓이와 부피">
          <p>
            뿔의 부피는 같은 밑면과 높이를 가진 기둥의{" "}
            <InlineMath math="\frac{1}{3}" />입니다.
          </p>
          <BlockMath math="\text{부피} = \frac{1}{3} Sh" />
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">원뿔 (반지름 <InlineMath math="r" />, 높이 <InlineMath math="h" />, 모선 <InlineMath math="l" />)</p>
            <BlockMath math="\text{겉넓이} = \pi r^2 + \pi r l = \pi r(r + l)" />
            <BlockMath math="\text{부피} = \frac{1}{3} \pi r^2 h" />
          </div>
        </SubSection>

        <SubSection title="● 구의 겉넓이와 부피">
          <p>
            반지름이 <InlineMath math="r" />인 구:
          </p>
          <BlockMath math="\text{겉넓이} = 4\pi r^2" />
          <BlockMath math="\text{부피} = \frac{4}{3} \pi r^3" />
          <div className="mt-3 rounded-lg border border-sidebar-border p-4">
            <p>
              예: 반지름 3cm인 구
            </p>
            <BlockMath math="\text{겉넓이} = 4\pi \times 3^2 = 36\pi \;\text{(cm}^2\text{)}" />
            <BlockMath math="\text{부피} = \frac{4}{3}\pi \times 3^3 = 36\pi \;\text{(cm}^3\text{)}" />
          </div>
        </SubSection>

        <Insight>
          기둥·뿔·구의 부피 관계를 기억하세요: 같은 반지름·높이일 때{" "}
          <InlineMath math="\text{원뿔} : \text{원기둥} : \text{구} = 1 : 3 : 2" />
          (단, <InlineMath math="h = 2r" />일 때)
        </Insight>
      </CalcBox>
    </div>
  );
}
