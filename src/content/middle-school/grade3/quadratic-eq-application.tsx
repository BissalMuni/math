import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중3 > Ⅲ. 이차방정식 > 2. 이차방정식의 활용 */
export default function QuadraticEqApplication() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 이차방정식의 활용 풀이 전략">
        <SubSection title="(1) 활용 문제 풀이 순서">
          <p>이차방정식 활용 문제는 다음 순서로 풀어갑니다.</p>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>① 구하려는 것을 <InlineMath math="x" />로 놓는다.</li>
            <li>② 조건에 맞게 이차방정식을 세운다.</li>
            <li>③ 이차방정식을 푼다.</li>
            <li>④ 구한 해가 문제의 조건에 맞는지 확인한다.</li>
          </ul>
        </SubSection>

        <SubSection title="(2) 해의 검증">
          <p>
            이차방정식의 두 근 중 문제의 조건(자연수, 양수, 길이 등)에
            맞지 않는 근은 <strong>버립니다</strong>. 반드시 해의 적합성을
            확인해야 합니다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 수에 관한 문제">
        <SubSection title="(1) 연속하는 자연수">
          <p>
            연속하는 두 자연수를 <InlineMath math="x" />,{" "}
            <InlineMath math="x + 1" />로 놓습니다.
          </p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">
              예제: 연속하는 두 자연수의 곱이 56일 때, 두 수를 구하여라.
            </p>
            <BlockMath math="x(x + 1) = 56" />
            <BlockMath math="x^2 + x - 56 = 0" />
            <BlockMath math="(x + 8)(x - 7) = 0" />
            <p className="mt-2">
              <InlineMath math="x = 7" /> 또는 <InlineMath math="x = -8" />
            </p>
            <p>
              자연수 조건에서 <InlineMath math="x = 7" />이므로 두 수는{" "}
              <strong>7과 8</strong>입니다.
            </p>
          </div>
        </SubSection>

        <SubSection title="(2) 제곱수 관련 문제">
          <div className="rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">
              예제: 어떤 자연수의 제곱에서 그 수의 3배를 빼면 28이다. 이 수를 구하여라.
            </p>
            <BlockMath math="x^2 - 3x = 28" />
            <BlockMath math="x^2 - 3x - 28 = 0 \implies (x - 7)(x + 4) = 0" />
            <p className="mt-2">
              자연수 조건에서 <InlineMath math="x = 7" />
            </p>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="3. 도형에 관한 문제">
        <SubSection title="(1) 넓이에 관한 문제">
          <div className="rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">
              예제: 가로가 세로보다 3cm 긴 직사각형의 넓이가{" "}
              <InlineMath math="54\text{cm}^2" />일 때, 가로와 세로의 길이를 구하여라.
            </p>
            <p className="mt-2">
              세로를 <InlineMath math="x" /> cm로 놓으면, 가로는{" "}
              <InlineMath math="(x + 3)" /> cm
            </p>
            <BlockMath math="x(x + 3) = 54" />
            <BlockMath math="x^2 + 3x - 54 = 0 \implies (x + 9)(x - 6) = 0" />
            <p className="mt-2">
              <InlineMath math="x > 0" />이므로 <InlineMath math="x = 6" />.
              세로 6cm, 가로 9cm입니다.
            </p>
          </div>
        </SubSection>

        <SubSection title="(2) 길 만들기 문제">
          <div className="rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">
              예제: 가로 20m, 세로 16m인 직사각형 모양의 땅에 폭이 같은 길을
              가로·세로로 내어 나머지 부분의 넓이를{" "}
              <InlineMath math="252\text{m}^2" />으로 만들려 한다. 길의 폭을 구하여라.
            </p>
            <p className="mt-2">
              길의 폭을 <InlineMath math="x" /> m로 놓으면
            </p>
            <BlockMath math="(20 - x)(16 - x) = 252" />
            <BlockMath math="x^2 - 36x + 320 = 252" />
            <BlockMath math="x^2 - 36x + 68 = 0 \implies (x - 2)(x - 34) = 0" />
            <p className="mt-2">
              <InlineMath math="0 < x < 16" />이므로{" "}
              <InlineMath math="x = 2" />. 길의 폭은 <strong>2m</strong>입니다.
            </p>
          </div>
        </SubSection>

        <Insight>
          도형 문제에서는 길이가 양수여야 하므로 음수 해는 반드시 버려야 합니다.
          또한 전체 크기를 넘지 않는지도 확인합니다.
        </Insight>
      </CalcBox>

      <CalcBox title="4. 동적인 상황의 문제">
        <SubSection title="(1) 물체의 운동">
          <div className="rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">
              예제: 지면에서 초속 <InlineMath math="20\text{m}" />로 위로 던진
              공의 <InlineMath math="t" />초 후 높이가{" "}
              <InlineMath math="h = 20t - 5t^2" /> (m)이다. 높이가 15m가 되는
              시각을 구하여라.
            </p>
            <BlockMath math="20t - 5t^2 = 15" />
            <BlockMath math="5t^2 - 20t + 15 = 0 \implies t^2 - 4t + 3 = 0" />
            <BlockMath math="(t - 1)(t - 3) = 0 \implies t = 1 \;\text{ 또는 }\; t = 3" />
            <p className="mt-2">
              1초 후(올라갈 때)와 3초 후(내려올 때) 높이가 15m입니다.
            </p>
          </div>
        </SubSection>

        <SubSection title="(2) 증가·감소 문제">
          <div className="rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">
              예제: 어느 물건의 가격이 매달 <InlineMath math="x" />%씩 인상되어
              2개월 후 가격이 처음의 1.21배가 되었다. 매달 인상률을 구하여라.
            </p>
            <BlockMath math="\left(1 + \frac{x}{100}\right)^2 = 1.21" />
            <p className="mt-2">
              <InlineMath math="1 + \dfrac{x}{100} = 1.1" /> (양수)이므로{" "}
              <InlineMath math="x = 10" />. 매달 <strong>10%</strong>씩 인상됩니다.
            </p>
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
