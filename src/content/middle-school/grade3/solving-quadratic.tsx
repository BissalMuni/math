import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중3 > Ⅲ. 이차방정식 > 1. 이차방정식의 풀이 */
export default function SolvingQuadratic() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 이차방정식과 그 해">
        <SubSection title="(1) 이차방정식의 뜻">
          <p>
            <InlineMath math="x" />에 대한 방정식이{" "}
            <InlineMath math="ax^2 + bx + c = 0" /> (
            <InlineMath math="a \neq 0" />) 꼴일 때, 이를{" "}
            <strong>이차방정식</strong>이라고 합니다.
          </p>
          <div className="mt-3 space-y-1">
            <p>
              예: <InlineMath math="x^2 - 5x + 6 = 0" />,{" "}
              <InlineMath math="2x^2 + 3x = 0" />,{" "}
              <InlineMath math="x^2 - 4 = 0" />
            </p>
          </div>
        </SubSection>

        <SubSection title="(2) 이차방정식의 해(근)">
          <p>
            이차방정식을 참이 되게 하는 <InlineMath math="x" />의 값을 그
            방정식의 <strong>해</strong> 또는 <strong>근</strong>이라 하고,
            해를 구하는 것을 방정식을 <strong>푼다</strong>고 합니다.
          </p>
          <p className="mt-2">
            예: <InlineMath math="x^2 - 5x + 6 = 0" />에{" "}
            <InlineMath math="x = 2" />를 대입하면{" "}
            <InlineMath math="4 - 10 + 6 = 0" /> ✓
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 인수분해를 이용한 풀이">
        <SubSection title="(1) 풀이 원리">
          <p>
            <InlineMath math="AB = 0" />이면{" "}
            <InlineMath math="A = 0" /> 또는 <InlineMath math="B = 0" />
            임을 이용합니다.
          </p>
          <BlockMath math="x^2 - 5x + 6 = 0 \implies (x - 2)(x - 3) = 0" />
          <BlockMath math="\therefore \; x = 2 \;\text{ 또는 }\; x = 3" />
        </SubSection>

        <SubSection title="(2) 다양한 예시">
          <div className="space-y-4">
            <div>
              <p className="font-medium">
                <InlineMath math="x^2 + 4x = 0" />
              </p>
              <BlockMath math="x(x + 4) = 0 \implies x = 0 \;\text{ 또는 }\; x = -4" />
            </div>
            <div>
              <p className="font-medium">
                <InlineMath math="x^2 - 9 = 0" />
              </p>
              <BlockMath math="(x + 3)(x - 3) = 0 \implies x = \pm 3" />
            </div>
            <div>
              <p className="font-medium">
                <InlineMath math="x^2 - 6x + 9 = 0" />
              </p>
              <BlockMath math="(x - 3)^2 = 0 \implies x = 3 \;\text{(중근)}" />
            </div>
          </div>
        </SubSection>

        <Insight>
          이차방정식의 해가 하나(중근)인 경우는 완전제곱식으로 인수분해되는
          경우입니다.
        </Insight>
      </CalcBox>

      <CalcBox title="3. 제곱근을 이용한 풀이">
        <SubSection title="(1) x² = k 꼴">
          <p>
            <InlineMath math="x^2 = k" /> (<InlineMath math="k > 0" />)이면{" "}
            <InlineMath math="x = \pm\sqrt{k}" />입니다.
          </p>
          <div className="mt-3 space-y-2">
            <p>
              예: <InlineMath math="x^2 = 7 \implies x = \pm\sqrt{7}" />
            </p>
            <p>
              예: <InlineMath math="3x^2 = 12 \implies x^2 = 4 \implies x = \pm 2" />
            </p>
          </div>
        </SubSection>

        <SubSection title="(2) (x + p)² = k 꼴">
          <p>
            <InlineMath math="(x + p)^2 = k" /> (
            <InlineMath math="k > 0" />)이면{" "}
            <InlineMath math="x + p = \pm\sqrt{k}" />입니다.
          </p>
          <div className="mt-3 space-y-2">
            <p>
              예: <InlineMath math="(x - 1)^2 = 5" />
            </p>
            <BlockMath math="x - 1 = \pm\sqrt{5} \implies x = 1 \pm \sqrt{5}" />
          </div>
        </SubSection>

        <SubSection title="(3) 완전제곱식 만들기">
          <p>
            <InlineMath math="x^2 + bx" /> 꼴에{" "}
            <InlineMath math="\left(\dfrac{b}{2}\right)^2" />을 더하면
            완전제곱식이 됩니다.
          </p>
          <div className="mt-3 space-y-2">
            <p>
              예: <InlineMath math="x^2 + 6x - 2 = 0" />
            </p>
            <BlockMath math="x^2 + 6x = 2" />
            <BlockMath math="x^2 + 6x + 9 = 2 + 9 = 11" />
            <BlockMath math="(x + 3)^2 = 11 \implies x = -3 \pm \sqrt{11}" />
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="4. 이차방정식의 근의 공식">
        <SubSection title="(1) 근의 공식">
          <p>
            이차방정식 <InlineMath math="ax^2 + bx + c = 0" /> (
            <InlineMath math="a \neq 0" />)의 근은:
          </p>
          <BlockMath math="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" />
          <div className="mt-3 rounded-lg bg-accent-light p-4 text-sm">
            <strong>참고:</strong> <InlineMath math="b^2 - 4ac \geq 0" />
            일 때 실수 해가 존재합니다.
          </div>
        </SubSection>

        <SubSection title="(2) 근의 공식 활용 예시">
          <p>
            <InlineMath math="2x^2 + 5x - 3 = 0" />에서{" "}
            <InlineMath math="a = 2" />, <InlineMath math="b = 5" />,{" "}
            <InlineMath math="c = -3" />
          </p>
          <BlockMath math="x = \frac{-5 \pm \sqrt{25 + 24}}{4} = \frac{-5 \pm 7}{4}" />
          <BlockMath math="x = \frac{1}{2} \;\text{ 또는 }\; x = -3" />
        </SubSection>

        <SubSection title="(3) 짝수 공식">
          <p>
            <InlineMath math="b" />가 짝수(
            <InlineMath math="b = 2b'" />)일 때 간단한 공식을 쓸 수 있습니다.
          </p>
          <BlockMath math="x = \frac{-b' \pm \sqrt{b'^2 - ac}}{a}" />
          <div className="mt-3 space-y-2">
            <p>
              예: <InlineMath math="x^2 - 4x + 1 = 0" /> (
              <InlineMath math="b' = -2" />)
            </p>
            <BlockMath math="x = \frac{2 \pm \sqrt{4 - 1}}{1} = 2 \pm \sqrt{3}" />
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
