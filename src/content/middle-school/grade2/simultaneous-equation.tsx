import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중2 > Ⅱ. 방정식과 부등식 > 1. 연립방정식 */
export default function SimultaneousEquation() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 미지수가 2개인 일차방정식">
        <SubSection title="(1) 미지수가 2개인 일차방정식">
          <p>
            미지수가 2개이고 그 각각의 차수가 1인 방정식을{" "}
            <strong>미지수가 2개인 일차방정식</strong>이라고 합니다.
          </p>
          <BlockMath math="ax + by + c = 0 \quad (a \neq 0, \, b \neq 0)" />
          <p className="mt-2">
            예: <InlineMath math="x + 2y = 5" />,{" "}
            <InlineMath math="3x - y = 1" />
          </p>
        </SubSection>

        <SubSection title="(2) 해(순서쌍)">
          <p>
            미지수가 2개인 일차방정식을 참이 되게 하는{" "}
            <InlineMath math="x" />, <InlineMath math="y" />의 값의 쌍{" "}
            <InlineMath math="(x, y)" />를 그 방정식의 <strong>해</strong>라고
            합니다.
          </p>
          <p className="mt-2">
            <InlineMath math="x + 2y = 5" />의 해:{" "}
            <InlineMath math="(1, 2)" />, <InlineMath math="(3, 1)" />,{" "}
            <InlineMath math="(5, 0)" />, ... (무수히 많음)
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 연립방정식과 그 풀이">
        <SubSection title="(1) 연립방정식의 뜻">
          <p>
            미지수가 2개인 일차방정식 2개를 한 쌍으로 묶은 것을{" "}
            <strong>연립방정식</strong>이라 하고, 두 방정식을 동시에 만족하는
            해를 연립방정식의 <strong>해</strong>라고 합니다.
          </p>
          <BlockMath math="\begin{cases} x + y = 5 \\ x - y = 1 \end{cases}" />
          <p className="mt-2">
            위 연립방정식의 해는 <InlineMath math="x = 3, \, y = 2" />,
            즉 <InlineMath math="(3, 2)" />입니다.
          </p>
        </SubSection>

        <SubSection title="(2) 대입법">
          <p>
            한 방정식에서 한 미지수를 다른 미지수로 나타낸 뒤, 다른 방정식에{" "}
            <strong>대입</strong>하여 푸는 방법입니다.
          </p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <BlockMath math="\begin{cases} y = 2x - 1 \quad \cdots\, ① \\ 3x + 2y = 12 \quad \cdots\, ② \end{cases}" />
            <p>①을 ②에 대입:</p>
            <BlockMath math="3x + 2(2x - 1) = 12" />
            <BlockMath math="3x + 4x - 2 = 12 \implies 7x = 14 \implies x = 2" />
            <p>
              <InlineMath math="x = 2" />를 ①에 대입:{" "}
              <InlineMath math="y = 2(2) - 1 = 3" />
            </p>
            <p className="font-medium">
              해: <InlineMath math="(x, y) = (2, 3)" />
            </p>
          </div>
        </SubSection>

        <SubSection title="(3) 가감법">
          <p>
            두 방정식을 <strong>더하거나 빼서</strong> 한 미지수를 없애는
            방법입니다.
          </p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <BlockMath math="\begin{cases} 2x + 3y = 13 \quad \cdots\, ① \\ 2x - y = 1 \quad \cdots\, ② \end{cases}" />
            <p>① - ②:</p>
            <BlockMath math="(2x + 3y) - (2x - y) = 13 - 1" />
            <BlockMath math="4y = 12 \implies y = 3" />
            <p>
              <InlineMath math="y = 3" />을 ②에 대입:{" "}
              <InlineMath math="2x - 3 = 1 \implies x = 2" />
            </p>
            <p className="font-medium">
              해: <InlineMath math="(x, y) = (2, 3)" />
            </p>
          </div>
        </SubSection>

        <Insight>
          대입법은 한 식이 이미 <InlineMath math="y = \cdots" /> 꼴일 때
          편리하고, 가감법은 같은 미지수의 계수를 맞추기 쉬울 때 편리합니다.
        </Insight>
      </CalcBox>

      <CalcBox title="3. 여러 가지 연립방정식">
        <SubSection title="(1) 괄호가 있는 연립방정식">
          <p>괄호를 먼저 풀고 정리한 뒤 대입법 또는 가감법으로 풉니다.</p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <BlockMath math="\begin{cases} 2(x + y) - 3 = 7 \\ 3x - (y + 1) = 8 \end{cases}" />
            <p>정리하면:</p>
            <BlockMath math="\begin{cases} 2x + 2y = 10 \implies x + y = 5 \\ 3x - y = 9 \end{cases}" />
          </div>
        </SubSection>

        <SubSection title="(2) 계수가 분수 또는 소수인 연립방정식">
          <p>
            양변에 적절한 수를 곱하여 <strong>계수를 정수</strong>로 바꾼 뒤 풉니다.
          </p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <BlockMath math="\frac{x}{2} + \frac{y}{3} = 2 \quad \xrightarrow{\times 6} \quad 3x + 2y = 12" />
            <BlockMath math="0.3x - 0.2y = 0.1 \quad \xrightarrow{\times 10} \quad 3x - 2y = 1" />
          </div>
        </SubSection>

        <SubSection title="(3) 해가 특수한 경우">
          <p>
            두 방정식이 <strong>같은 직선</strong>을 나타내면 해가 무수히 많고,{" "}
            <strong>평행한 직선</strong>을 나타내면 해가 없습니다.
          </p>
          <div className="mt-2 space-y-1">
            <p>
              해가 무수히 많음:{" "}
              <InlineMath math="x + y = 3" />,{" "}
              <InlineMath math="2x + 2y = 6" /> (같은 식)
            </p>
            <p>
              해가 없음:{" "}
              <InlineMath math="x + y = 3" />,{" "}
              <InlineMath math="x + y = 5" /> (모순)
            </p>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="4. 연립방정식의 활용">
        <SubSection title="(1) 풀이 과정">
          <div className="space-y-1">
            <p>① 구하려는 것을 미지수 <InlineMath math="x" />, <InlineMath math="y" />로 놓는다.</p>
            <p>② 조건에 맞게 연립방정식을 세운다.</p>
            <p>③ 연립방정식을 푼다.</p>
            <p>④ 해가 문제의 뜻에 맞는지 확인한다.</p>
          </div>
        </SubSection>

        <SubSection title="(2) 활용 예시">
          <div className="rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              사과 3개와 배 2개의 값은 5,800원이고, 사과 2개와 배 3개의 값은
              6,700원일 때, 사과와 배 한 개의 값을 구하시오.
            </p>
            <BlockMath math="\begin{cases} 3x + 2y = 5800 \\ 2x + 3y = 6700 \end{cases}" />
            <p>
              가감법으로 풀면:{" "}
              <InlineMath math="x = 600" /> (사과),{" "}
              <InlineMath math="y = 1\,900" /> (배) [단위: 원]
            </p>
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
