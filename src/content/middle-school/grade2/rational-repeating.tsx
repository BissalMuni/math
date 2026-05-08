import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중2 > Ⅰ. 수와 식 > 1. 유리수와 순환소수 */
export default function RationalRepeating() {
  return (
    <div className="space-y-8">
      <CalcBox title="■ 유리수와 소수">
        <SubSection title="● 유리수의 소수 표현">
          <p>
            <strong>유리수</strong>는 <InlineMath math="\dfrac{a}{b}" /> (
            <InlineMath math="a" />, <InlineMath math="b" />는 정수,{" "}
            <InlineMath math="b \neq 0" />)꼴로 나타낼 수 있는 수입니다.
          </p>
          <p className="mt-2">
            유리수를 소수로 나타내면 <strong>유한소수</strong> 또는{" "}
            <strong>순환소수</strong> 중 하나가 됩니다.
          </p>
        </SubSection>

        <SubSection title="● 유한소수">
          <p>
            소수점 아래의 숫자가 유한개인 소수를 <strong>유한소수</strong>라고
            합니다.
          </p>
          <BlockMath math="\frac{1}{4} = 0.25, \quad \frac{3}{8} = 0.375" />
          <p className="mt-2">
            <strong>기약분수</strong>란 분자와 분모의 공약수가 1뿐인 분수,
            즉 더 이상 약분할 수 없는 분수입니다.
          </p>
          <div className="mt-2 mb-3 text-sm p-3 rounded-lg bg-sidebar-bg border border-sidebar-border space-y-1">
            <p>
              <InlineMath math="\dfrac{6}{10}" /> →{" "}
              <InlineMath math="\dfrac{3}{5}" /> (분자·분모를 공약수 2로 나눠 기약분수로 변환)
            </p>
            <p>
              <InlineMath math="\dfrac{3}{5}" /> → 공약수가 1뿐이므로 <strong>기약분수</strong>
            </p>
          </div>
          <p className="mt-2">
            기약분수의 분모를 소인수분해했을 때,{" "}
            <InlineMath math="2" />와 <InlineMath math="5" />만으로 이루어지면
            유한소수로 나타낼 수 있습니다.
          </p>
          <BlockMath math="\frac{7}{20} = \frac{7}{2^2 \times 5} = 0.35 \quad \text{(유한소수)}" />
        </SubSection>

        <SubSection title="● 순환소수">
          <p>
            소수점 아래에서 같은 숫자 또는 숫자의 배열이 한없이 되풀이되는
            소수를 <strong>순환소수</strong>라고 합니다.
          </p>
          <BlockMath math="\frac{1}{3} = 0.333\cdots = 0.\dot{3}" />
          <BlockMath math="\frac{1}{11} = 0.090909\cdots = 0.\dot{0}\dot{9}" />
          <p className="mt-2">
            되풀이되는 숫자의 마디를 <strong>순환마디</strong>라 하고,
            순환마디의 양 끝 숫자 위에 점을 찍어 나타냅니다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 순환소수를 분수로 바꾸기">
        <SubSection title="● 기본 방법">
          <p>
            순환소수를 <InlineMath math="x" />로 놓고, 순환마디가 소수점
            아래에서 바로 시작되도록 적절한 10의 거듭제곱을 곱한 뒤 빼서
            분수를 구합니다.
          </p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              예: <InlineMath math="x = 0.\dot{3}" />
            </p>
            <BlockMath math="10x = 3.\dot{3}" />
            <BlockMath math="10x - x = 3.\dot{3} - 0.\dot{3}" />
            <BlockMath math="9x = 3 \quad \Rightarrow \quad x = \frac{3}{9} = \frac{1}{3}" />
          </div>
        </SubSection>

        <SubSection title="● 순환마디가 두 자리 이상인 경우">
          <div className="rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              예: <InlineMath math="x = 0.\dot{1}\dot{2}" /> (순환마디 12)
            </p>
            <BlockMath math="100x = 12.\dot{1}\dot{2}" />
            <BlockMath math="100x - x = 12" />
            <BlockMath math="99x = 12 \quad \Rightarrow \quad x = \frac{12}{99} = \frac{4}{33}" />
          </div>
        </SubSection>

        <SubSection title="● 순환마디 앞에 순환하지 않는 부분이 있는 경우">
          <div className="rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              예: <InlineMath math="x = 0.1\dot{6}" /> (순환마디 6)
            </p>
            <BlockMath math="10x = 1.\dot{6}" />
            <BlockMath math="100x = 16.\dot{6}" />
            <BlockMath math="100x - 10x = 15" />
            <BlockMath math="90x = 15 \quad \Rightarrow \quad x = \frac{15}{90} = \frac{1}{6}" />
          </div>
        </SubSection>

        <Insight>
          유한소수와 순환소수는 모두 분수로 나타낼 수 있으므로{" "}
          <strong>유리수</strong>입니다. 반대로,{" "}
          <InlineMath math="\pi" />, <InlineMath math="\sqrt{2}" /> 같은 수는
          순환하지 않는 무한소수이므로 <strong>무리수</strong>입니다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ 유한소수가 되는 조건">
        <SubSection title="● 판별법">
          <p>
            기약분수 <InlineMath math="\dfrac{a}{b}" />가 유한소수가 되려면,
            분모 <InlineMath math="b" />를 소인수분해했을 때{" "}
            <InlineMath math="2" />와 <InlineMath math="5" /> 이외의 소인수가
            없어야 합니다.
          </p>
          <BlockMath math="\frac{a}{b} \text{가 유한소수} \iff b = 2^m \times 5^n \quad (m, n \geq 0)" />
        </SubSection>

        <SubSection title="● 판별 예시">
          <div className="space-y-2">
            <p>
              <InlineMath math="\dfrac{7}{40} = \dfrac{7}{2^3 \times 5}" /> →
              분모가 2와 5만으로 이루어져 있으므로 <strong>유한소수</strong>
            </p>
            <p>
              <InlineMath math="\dfrac{5}{12} = \dfrac{5}{2^2 \times 3}" /> →
              분모에 3이 있으므로 <strong>순환소수</strong>
            </p>
            <p>
              <InlineMath math="\dfrac{9}{15} = \dfrac{3}{5}" /> →
              기약분수로 고치면 분모가 5만으로 이루어져 있으므로{" "}
              <strong>유한소수</strong>
            </p>
          </div>
        </SubSection>

        <Insight>
          기약분수인지 먼저 확인하는 것이 중요합니다. 약분하지 않으면
          분모에 불필요한 소인수가 남아 판별을 잘못할 수 있습니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
