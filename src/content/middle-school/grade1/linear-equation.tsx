import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중1 > Ⅱ. 문자와 식 > 2. 일차방정식 */
export default function LinearEquation() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 방정식과 그 해">
        <SubSection title="(1) 등식과 방정식">
          <p>
            등호 <InlineMath math="=" />를 사용하여 나타낸 식을{" "}
            <strong>등식</strong>이라고 합니다.
          </p>
          <BlockMath math="2x + 3 = 7, \quad a + b = 10" />
          <p className="mt-2">
            등식 중에서 미지수의 값에 따라 참이 되기도 하고 거짓이 되기도 하는
            식을 <strong>방정식</strong>이라고 합니다.
          </p>
        </SubSection>

        <SubSection title="(2) 해(근)와 풀이">
          <p>
            방정식을 참이 되게 하는 미지수의 값을 그 방정식의{" "}
            <strong>해</strong> 또는 <strong>근</strong>이라 하고, 해를 구하는
            것을 방정식을 <strong>푼다</strong>고 합니다.
          </p>
          <p className="mt-2">
            예: <InlineMath math="x + 3 = 7" />에서{" "}
            <InlineMath math="x = 4" />가 해입니다.
          </p>
        </SubSection>

        <SubSection title="(3) 항등식과 방정식의 차이">
          <p>
            미지수에 어떤 값을 대입하여도 항상 참인 등식을{" "}
            <strong>항등식</strong>이라고 합니다.
          </p>
          <BlockMath math="2(x + 1) = 2x + 2 \;\;\text{(항등식)}" />
          <BlockMath math="2x + 1 = 5 \;\;\text{(방정식, } x = 2 \text{일 때만 참)}" />
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 일차방정식의 풀이">
        <SubSection title="(1) 등식의 성질">
          <p>
            등식의 양변에 같은 수를 더하거나, 빼거나, 곱하거나, 0이 아닌 같은
            수로 나누어도 등식은 성립합니다.
          </p>
          <div className="mt-3 space-y-1">
            <BlockMath math="a = b \;\Rightarrow\; a + c = b + c" />
            <BlockMath math="a = b \;\Rightarrow\; a - c = b - c" />
            <BlockMath math="a = b \;\Rightarrow\; ac = bc" />
            <BlockMath math="a = b \;\Rightarrow\; \frac{a}{c} = \frac{b}{c} \quad (c \neq 0)" />
          </div>
        </SubSection>

        <SubSection title="(2) 이항">
          <p>
            등식에서 한 항을 부호를 바꾸어 다른 변으로 옮기는 것을{" "}
            <strong>이항</strong>이라고 합니다.
          </p>
          <BlockMath math="x + 3 = 7 \;\Rightarrow\; x = 7 - 3 \;\Rightarrow\; x = 4" />
          <BlockMath math="x - 5 = 2 \;\Rightarrow\; x = 2 + 5 \;\Rightarrow\; x = 7" />
        </SubSection>

        <SubSection title="(3) 일차방정식의 풀이 절차">
          <p>
            <InlineMath math="ax + b = 0" /> (<InlineMath math="a \neq 0" />)
            꼴의 방정식을 <strong>일차방정식</strong>이라고 합니다.
          </p>
          <div className="mt-3">
            <p>
              예: <InlineMath math="3x - 2 = 7" />
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>
                ① 이항: <InlineMath math="3x = 7 + 2 = 9" />
              </li>
              <li>
                ② 양변을 계수로 나눔:{" "}
                <InlineMath math="x = \frac{9}{3} = 3" />
              </li>
            </ul>
          </div>
        </SubSection>

        <SubSection title="(4) 복잡한 일차방정식">
          <p>괄호가 있는 경우 — 분배법칙으로 괄호를 풉니다.</p>
          <BlockMath math="2(x - 3) = 4x + 2" />
          <BlockMath math="2x - 6 = 4x + 2" />
          <BlockMath math="2x - 4x = 2 + 6" />
          <BlockMath math="-2x = 8 \;\Rightarrow\; x = -4" />

          <p className="mt-4">계수에 분수가 있는 경우 — 양변에 분모의 최소공배수를 곱합니다.</p>
          <BlockMath math="\frac{x}{2} - \frac{x - 1}{3} = 1" />
          <p>양변에 6을 곱하면:</p>
          <BlockMath math="3x - 2(x - 1) = 6" />
          <BlockMath math="3x - 2x + 2 = 6 \;\Rightarrow\; x = 4" />
        </SubSection>

        <Insight>
          일차방정식은 &ldquo;미지수가 있는 항은 좌변에, 상수항은 우변에&rdquo;
          모으는 것이 핵심입니다. 이항할 때 부호 변환을 잊지 마세요.
        </Insight>
      </CalcBox>

      <CalcBox title="3. 일차방정식의 활용">
        <SubSection title="(1) 문제 풀이 단계">
          <ul className="list-decimal pl-6 space-y-1">
            <li>미지수를 정합니다 (구하려는 값을 <InlineMath math="x" />로 놓기).</li>
            <li>조건에 맞게 방정식을 세웁니다.</li>
            <li>방정식을 풉니다.</li>
            <li>구한 해가 문제의 조건에 맞는지 확인합니다.</li>
          </ul>
        </SubSection>

        <SubSection title="(2) 활용 예시 — 수에 대한 문제">
          <p>어떤 수에 5를 더한 것의 2배는 그 수의 3배보다 4만큼 크다. 어떤 수를 구하시오.</p>
          <div className="mt-2 rounded-lg border border-sidebar-border p-4">
            <p>어떤 수를 <InlineMath math="x" />로 놓으면:</p>
            <BlockMath math="2(x + 5) = 3x + 4" />
            <BlockMath math="2x + 10 = 3x + 4" />
            <BlockMath math="2x - 3x = 4 - 10" />
            <BlockMath math="-x = -6 \;\Rightarrow\; x = 6" />
            <p className="mt-2">
              검산: <InlineMath math="2(6 + 5) = 22" />,{" "}
              <InlineMath math="3 \times 6 + 4 = 22" /> ✓
            </p>
          </div>
        </SubSection>

        <SubSection title="(3) 활용 예시 — 거리·속력·시간">
          <p>
            거리, 속력, 시간 관계:{" "}
            <InlineMath math="\text{(거리)} = \text{(속력)} \times \text{(시간)}" />
          </p>
          <div className="mt-2 rounded-lg border border-sidebar-border p-4">
            <p>
              집에서 학교까지 시속 4km로 걸으면 시속 12km로 자전거를 타는 것보다 20분 더 걸린다.
              집에서 학교까지 거리를 구하시오.
            </p>
            <p className="mt-2">
              거리를 <InlineMath math="x" /> km로 놓으면:
            </p>
            <BlockMath math="\frac{x}{4} - \frac{x}{12} = \frac{20}{60} = \frac{1}{3}" />
            <p>양변에 12를 곱하면:</p>
            <BlockMath math="3x - x = 4 \;\Rightarrow\; 2x = 4 \;\Rightarrow\; x = 2" />
            <p className="mt-2">따라서 집에서 학교까지 거리는 2km입니다.</p>
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
