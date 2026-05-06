import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중2 > Ⅱ. 방정식과 부등식 > 2. 일차부등식 */
export default function LinearInequality() {
  return (
    <div className="space-y-8">
      <CalcBox title="■ 부등식의 뜻과 성질">
        <SubSection title="● 부등식">
          <p>
            부등호(<InlineMath math="<" />, <InlineMath math=">" />,{" "}
            <InlineMath math="\leq" />, <InlineMath math="\geq" />)를
            사용하여 수의 대소 관계를 나타낸 식을 <strong>부등식</strong>이라고
            합니다.
          </p>
          <div className="mt-2 space-y-1">
            <p>
              <InlineMath math="x + 3 > 7" />: &ldquo;
              <InlineMath math="x + 3" />은 7보다 크다&rdquo;
            </p>
            <p>
              <InlineMath math="2x - 1 \leq 5" />: &ldquo;
              <InlineMath math="2x - 1" />은 5 이하이다&rdquo;
            </p>
          </div>
        </SubSection>

        <SubSection title="● 부등식의 성질">
          <p>부등식의 양변에 같은 수를 더하거나 빼도 부등호의 방향은 변하지 않습니다.</p>
          <BlockMath math="a < b \implies a + c < b + c" />
          <p className="mt-2">
            양변에 같은 <strong>양수</strong>를 곱하거나 나누어도 부등호의 방향은 변하지 않습니다.
          </p>
          <BlockMath math="a < b, \; c > 0 \implies ac < bc" />
          <p className="mt-2">
            양변에 같은 <strong>음수</strong>를 곱하거나 나누면 부등호의{" "}
            <strong>방향이 바뀝니다</strong>.
          </p>
          <BlockMath math="a < b, \; c < 0 \implies ac > bc" />
        </SubSection>

        <Insight>
          부등식에서 음수를 곱하거나 나눌 때 부등호 방향이 바뀌는 것은
          가장 흔한 실수 포인트입니다. 항상 주의하세요!
        </Insight>
      </CalcBox>

      <CalcBox title="■ 일차부등식의 풀이">
        <SubSection title="● 일차부등식">
          <p>
            부등식에서 부등호를 등호로 바꾸었을 때 일차방정식이 되는 부등식을{" "}
            <strong>일차부등식</strong>이라고 합니다.
          </p>
          <BlockMath math="ax + b > 0, \quad ax + b \leq 0 \quad (a \neq 0)" />
        </SubSection>

        <SubSection title="● 풀이 순서">
          <p>일차방정식을 풀 때와 같은 방법으로 풀되, 음수로 나눌 때 부등호 방향에 주의합니다.</p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              예: <InlineMath math="3x - 5 \leq 7" />
            </p>
            <BlockMath math="3x \leq 12" />
            <BlockMath math="x \leq 4" />
          </div>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              예: <InlineMath math="-2x + 3 > 9" />
            </p>
            <BlockMath math="-2x > 6" />
            <BlockMath math="x < -3 \quad \text{(음수로 나누어 부등호 방향 변경)}" />
          </div>
        </SubSection>

        <SubSection title="● 해의 표현">
          <p>
            일차부등식의 해는 수직선 위에 나타낼 수 있습니다.
          </p>
          <div className="mt-2 space-y-1">
            <p>
              <InlineMath math="x < 3" />: 3 미포함 (빈 원, 왼쪽으로 화살표)
            </p>
            <p>
              <InlineMath math="x \leq 3" />: 3 포함 (채운 원, 왼쪽으로 화살표)
            </p>
            <p>
              <InlineMath math="x > 3" />: 3 미포함 (빈 원, 오른쪽으로 화살표)
            </p>
            <p>
              <InlineMath math="x \geq 3" />: 3 포함 (채운 원, 오른쪽으로 화살표)
            </p>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 여러 가지 일차부등식">
        <SubSection title="● 괄호가 있는 부등식">
          <div className="rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              예: <InlineMath math="2(x - 3) > 3(x + 1)" />
            </p>
            <BlockMath math="2x - 6 > 3x + 3" />
            <BlockMath math="2x - 3x > 3 + 6" />
            <BlockMath math="-x > 9 \implies x < -9" />
          </div>
        </SubSection>

        <SubSection title="● 계수가 분수·소수인 부등식">
          <div className="rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              예: <InlineMath math="\dfrac{x - 1}{2} \geq \dfrac{x + 3}{3}" />
            </p>
            <p>양변에 6을 곱하면:</p>
            <BlockMath math="3(x - 1) \geq 2(x + 3)" />
            <BlockMath math="3x - 3 \geq 2x + 6 \implies x \geq 9" />
          </div>
        </SubSection>

        <SubSection title="● 연립부등식">
          <p>두 개 이상의 부등식을 동시에 만족하는 해를 구합니다.</p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <BlockMath math="\begin{cases} 2x + 1 > 5 \\ x - 3 \leq 4 \end{cases}" />
            <BlockMath math="\begin{cases} x > 2 \\ x \leq 7 \end{cases}" />
            <p className="font-medium">
              공통 해: <InlineMath math="2 < x \leq 7" />
            </p>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 일차부등식의 활용">
        <SubSection title="● 풀이 과정">
          <div className="space-y-1">
            <p>① 구하려는 것을 미지수 <InlineMath math="x" />로 놓는다.</p>
            <p>② 조건에 맞게 일차부등식을 세운다.</p>
            <p>③ 부등식을 푼다.</p>
            <p>④ 해가 문제의 뜻에 맞는지 확인한다.</p>
          </div>
        </SubSection>

        <SubSection title="● 활용 예시">
          <div className="rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              한 개에 500원인 사탕을 <InlineMath math="x" />개 사고 3,000원을
              내면 거스름돈이 남을 때, 사탕을 최대 몇 개 살 수 있는가?
            </p>
            <BlockMath math="500x < 3000 \implies x < 6" />
            <p>
              <InlineMath math="x" />는 자연수이므로, 최대{" "}
              <strong>5개</strong>를 살 수 있습니다.
            </p>
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
