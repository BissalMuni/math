import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중2 > Ⅲ. 일차함수 > 2. 일차함수와 방정식 */
export default function LinearFuncEquation() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 일차함수와 일차방정식의 관계">
        <SubSection title="(1) 일차방정식의 그래프">
          <p>
            미지수가 2개인 일차방정식{" "}
            <InlineMath math="ax + by + c = 0" />의 해{" "}
            <InlineMath math="(x, y)" />를 좌표평면 위에 나타내면{" "}
            <strong>직선</strong>이 됩니다.
          </p>
          <p className="mt-2">
            <InlineMath math="b \neq 0" />일 때,{" "}
            <InlineMath math="y = -\dfrac{a}{b}x - \dfrac{c}{b}" /> 꼴로
            변형하면 일차함수가 됩니다.
          </p>
        </SubSection>

        <SubSection title="(2) 예시">
          <div className="rounded-lg border border-sidebar-border p-4 space-y-2">
            <p>
              <InlineMath math="2x + y - 4 = 0" />을 변형하면:
            </p>
            <BlockMath math="y = -2x + 4" />
            <p>
              기울기 <InlineMath math="-2" />, y절편{" "}
              <InlineMath math="4" />인 직선입니다.
            </p>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 특수한 일차방정식의 그래프">
        <SubSection title="(1) x = p 꼴의 그래프">
          <p>
            <InlineMath math="x = p" />의 그래프는{" "}
            <InlineMath math="y" />축에 <strong>평행한</strong> (
            <InlineMath math="x" />축에 수직인) 직선입니다.
          </p>
          <p className="mt-2">
            예: <InlineMath math="x = 3" />은 점{" "}
            <InlineMath math="(3, 0)" />을 지나고{" "}
            <InlineMath math="y" />축에 평행한 직선
          </p>
        </SubSection>

        <SubSection title="(2) y = q 꼴의 그래프">
          <p>
            <InlineMath math="y = q" />의 그래프는{" "}
            <InlineMath math="x" />축에 <strong>평행한</strong> (
            <InlineMath math="y" />축에 수직인) 직선입니다.
          </p>
          <p className="mt-2">
            예: <InlineMath math="y = -2" />는 점{" "}
            <InlineMath math="(0, -2)" />를 지나고{" "}
            <InlineMath math="x" />축에 평행한 직선
          </p>
        </SubSection>

        <Insight>
          <InlineMath math="x = p" />는 함수가 아닙니다. 하나의{" "}
          <InlineMath math="x" /> 값에 <InlineMath math="y" /> 값이 무수히 많기
          때문입니다. 그러나 일차방정식의 그래프로는 그릴 수 있습니다.
        </Insight>
      </CalcBox>

      <CalcBox title="3. 연립방정식과 그래프">
        <SubSection title="(1) 연립방정식의 해와 두 직선의 교점">
          <p>
            연립방정식의 해는 두 일차방정식의 그래프(직선)가 만나는{" "}
            <strong>교점의 좌표</strong>와 같습니다.
          </p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <BlockMath math="\begin{cases} x + y = 4 \\ x - y = 2 \end{cases}" />
            <p>
              두 직선의 교점은 <InlineMath math="(3, 1)" />이고,
              이것이 연립방정식의 해입니다.
            </p>
          </div>
        </SubSection>

        <SubSection title="(2) 두 직선의 위치 관계">
          <div className="space-y-3">
            <div>
              <p className="font-medium">① 한 점에서 만남 (해가 1개)</p>
              <p className="mt-1">
                기울기가 다름: <InlineMath math="a_1 \neq a_2" />
              </p>
            </div>
            <div>
              <p className="font-medium">② 평행 (해가 없음)</p>
              <p className="mt-1">
                기울기가 같고 y절편이 다름:{" "}
                <InlineMath math="a_1 = a_2" />,{" "}
                <InlineMath math="b_1 \neq b_2" />
              </p>
            </div>
            <div>
              <p className="font-medium">③ 일치 (해가 무수히 많음)</p>
              <p className="mt-1">
                기울기와 y절편이 모두 같음:{" "}
                <InlineMath math="a_1 = a_2" />,{" "}
                <InlineMath math="b_1 = b_2" />
              </p>
            </div>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="4. 일차함수의 활용">
        <SubSection title="(1) 일차함수의 식 구하기">
          <p>다음 조건으로 일차함수의 식을 구할 수 있습니다.</p>
          <div className="mt-2 space-y-2">
            <div className="rounded-lg border border-sidebar-border p-4 space-y-1">
              <p className="font-medium">기울기와 y절편을 알 때</p>
              <p>
                기울기 <InlineMath math="2" />, y절편{" "}
                <InlineMath math="-3" /> →{" "}
                <InlineMath math="y = 2x - 3" />
              </p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-4 space-y-1">
              <p className="font-medium">기울기와 한 점을 알 때</p>
              <p>
                기울기 <InlineMath math="3" />, 점{" "}
                <InlineMath math="(1, 5)" />를 지남
              </p>
              <BlockMath math="y = 3x + b, \quad 5 = 3(1) + b \implies b = 2" />
              <p>
                따라서 <InlineMath math="y = 3x + 2" />
              </p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-4 space-y-1">
              <p className="font-medium">두 점을 알 때</p>
              <p>
                점 <InlineMath math="(1, 3)" />,{" "}
                <InlineMath math="(3, 7)" />을 지남
              </p>
              <BlockMath math="a = \frac{7 - 3}{3 - 1} = 2" />
              <BlockMath math="y = 2x + b, \quad 3 = 2(1) + b \implies b = 1" />
              <p>
                따라서 <InlineMath math="y = 2x + 1" />
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title="(2) 실생활 활용">
          <div className="rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              물탱크에 처음 20L의 물이 있고, 매분 3L씩 물을 넣을 때,{" "}
              <InlineMath math="x" />분 후 물의 양 <InlineMath math="y" />L을
              식으로 나타내시오.
            </p>
            <BlockMath math="y = 3x + 20" />
            <p>
              기울기 3 (분당 3L 증가), y절편 20 (처음 물의 양)
            </p>
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
