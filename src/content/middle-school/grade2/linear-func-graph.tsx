import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중2 > Ⅲ. 일차함수 > 1. 일차함수 그래프 */
export default function LinearFuncGraph() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 함수와 일차함수">
        <SubSection title="(1) 함수">
          <p>
            두 변수 <InlineMath math="x" />, <InlineMath math="y" />에서{" "}
            <InlineMath math="x" />의 값이 정해지면 <InlineMath math="y" />의
            값이 <strong>하나씩</strong> 정해지는 관계가 있을 때,{" "}
            <InlineMath math="y" />를 <InlineMath math="x" />의{" "}
            <strong>함수</strong>라고 합니다.
          </p>
          <BlockMath math="y = f(x)" />
        </SubSection>

        <SubSection title="(2) 일차함수의 뜻">
          <p>
            <InlineMath math="y = ax + b" /> (<InlineMath math="a \neq 0" />,{" "}
            <InlineMath math="a" />, <InlineMath math="b" />는 상수) 꼴로
            나타낼 수 있는 함수를 <strong>일차함수</strong>라고 합니다.
          </p>
          <p className="mt-2">
            예: <InlineMath math="y = 2x + 1" />,{" "}
            <InlineMath math="y = -3x + 5" />,{" "}
            <InlineMath math="y = \dfrac{1}{2}x" />
          </p>
        </SubSection>

        <SubSection title="(3) 함숫값">
          <p>
            <InlineMath math="x" />에 특정 값을 대입하여 얻는{" "}
            <InlineMath math="y" />의 값을 그 <InlineMath math="x" /> 값에서의{" "}
            <strong>함숫값</strong>이라 합니다.
          </p>
          <p className="mt-2">
            <InlineMath math="f(x) = 2x + 1" />일 때,{" "}
            <InlineMath math="f(3) = 2 \times 3 + 1 = 7" />
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 일차함수의 그래프">
        <SubSection title="(1) 그래프 그리기">
          <p>
            일차함수 <InlineMath math="y = ax + b" />의 그래프는{" "}
            <strong>직선</strong>입니다. 두 점만 알면 그래프를 그릴 수 있습니다.
          </p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">
              예: <InlineMath math="y = 2x - 1" />
            </p>
            <div className="overflow-x-auto">
              <table className="text-sm text-center">
                <thead>
                  <tr>
                    <td className="px-3 py-1 font-medium"><InlineMath math="x" /></td>
                    <td className="px-3 py-1">0</td>
                    <td className="px-3 py-1">1</td>
                    <td className="px-3 py-1">2</td>
                    <td className="px-3 py-1">3</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3 py-1 font-medium"><InlineMath math="y" /></td>
                    <td className="px-3 py-1">-1</td>
                    <td className="px-3 py-1">1</td>
                    <td className="px-3 py-1">3</td>
                    <td className="px-3 py-1">5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </SubSection>

        <SubSection title="(2) 기울기">
          <p>
            일차함수 <InlineMath math="y = ax + b" />에서{" "}
            <InlineMath math="a" />를 <strong>기울기</strong>라 합니다.
            기울기는 <InlineMath math="x" />의 값이 1 증가할 때{" "}
            <InlineMath math="y" />의 값의 변화량입니다.
          </p>
          <BlockMath math="a = \frac{y\text{의 증가량}}{x\text{의 증가량}} = \frac{y_2 - y_1}{x_2 - x_1}" />
          <div className="mt-2 space-y-1">
            <p>
              <InlineMath math="a > 0" />: 오른쪽 위로 올라가는 직선
            </p>
            <p>
              <InlineMath math="a < 0" />: 오른쪽 아래로 내려가는 직선
            </p>
            <p>
              <InlineMath math="|a|" />가 클수록 직선이 가파릅니다.
            </p>
          </div>
        </SubSection>

        <SubSection title="(3) y절편">
          <p>
            일차함수 <InlineMath math="y = ax + b" />에서{" "}
            <InlineMath math="b" />를 <strong>y절편</strong>이라 합니다.
            그래프가 <InlineMath math="y" />축과 만나는 점{" "}
            <InlineMath math="(0, b)" />의 <InlineMath math="y" /> 좌표입니다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="3. 일차함수 그래프의 성질">
        <SubSection title="(1) 기울기와 y절편에 따른 그래프 위치">
          <div className="space-y-2">
            <p>
              <InlineMath math="a > 0, \, b > 0" />: 제1, 2, 3사분면을 지남
            </p>
            <p>
              <InlineMath math="a > 0, \, b < 0" />: 제1, 3, 4사분면을 지남
            </p>
            <p>
              <InlineMath math="a < 0, \, b > 0" />: 제1, 2, 4사분면을 지남
            </p>
            <p>
              <InlineMath math="a < 0, \, b < 0" />: 제2, 3, 4사분면을 지남
            </p>
          </div>
        </SubSection>

        <SubSection title="(2) 평행과 일치">
          <p>
            두 일차함수 <InlineMath math="y = a_1 x + b_1" />,{" "}
            <InlineMath math="y = a_2 x + b_2" />에서:
          </p>
          <div className="mt-2 space-y-1">
            <p>
              <strong>평행</strong>: <InlineMath math="a_1 = a_2" />,{" "}
              <InlineMath math="b_1 \neq b_2" /> (기울기 같고 y절편 다름)
            </p>
            <p>
              <strong>일치</strong>: <InlineMath math="a_1 = a_2" />,{" "}
              <InlineMath math="b_1 = b_2" /> (기울기와 y절편 모두 같음)
            </p>
          </div>
        </SubSection>

        <SubSection title="(3) x절편">
          <p>
            그래프가 <InlineMath math="x" />축과 만나는 점, 즉{" "}
            <InlineMath math="y = 0" />일 때의 <InlineMath math="x" /> 값을{" "}
            <strong>x절편</strong>이라 합니다.
          </p>
          <BlockMath math="y = ax + b \text{에서 } y = 0 \implies x = -\frac{b}{a}" />
        </SubSection>

        <Insight>
          일차함수의 그래프는 기울기와 y절편 두 가지만 알면 완전히 결정됩니다.
          이 두 값을 빠르게 파악하는 연습을 하세요.
        </Insight>
      </CalcBox>
    </div>
  );
}
