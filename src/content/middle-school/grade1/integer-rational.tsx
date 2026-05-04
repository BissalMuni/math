import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중1 > Ⅰ. 수와 연산 > 2. 정수와 유리수 */
export default function IntegerRational() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 정수와 유리수의 개념">
        <SubSection title="(1) 양수와 음수">
          <p>
            0보다 큰 수를 <strong>양수</strong>, 0보다 작은 수를{" "}
            <strong>음수</strong>라고 합니다.
          </p>
          <div className="mt-3 space-y-1">
            <p>
              양수: <InlineMath math="+1, +2, +3, \ldots" /> (부호 <InlineMath math="+" />는 생략 가능)
            </p>
            <p>
              음수: <InlineMath math="-1, -2, -3, \ldots" /> (부호 <InlineMath math="-" />는 생략 불가)
            </p>
          </div>
          <div className="mt-3 rounded-lg bg-accent-light p-4 text-sm">
            <strong>참고:</strong> 0은 양수도 음수도 아닙니다.
          </div>
        </SubSection>

        <SubSection title="(2) 정수">
          <p>
            양의 정수(자연수), 0, 음의 정수를 통틀어 <strong>정수</strong>라고 합니다.
          </p>
          <BlockMath math="\text{정수} = \{ \ldots, -3, -2, -1, 0, 1, 2, 3, \ldots \}" />
        </SubSection>

        <SubSection title="(3) 유리수">
          <p>
            <InlineMath math="\frac{a}{b}" /> (<InlineMath math="a" />,{" "}
            <InlineMath math="b" />는 정수, <InlineMath math="b \neq 0" />)
            꼴로 나타낼 수 있는 수를 <strong>유리수</strong>라고 합니다.
          </p>
          <div className="mt-3 space-y-1">
            <p>
              양의 유리수: <InlineMath math="\tfrac{1}{2},\; 0.3,\; 5" />
            </p>
            <p>0</p>
            <p>
              음의 유리수: <InlineMath math="-\tfrac{3}{4},\; -1.5,\; -2" />
            </p>
          </div>
        </SubSection>

        <SubSection title="(4) 수의 대소 관계">
          <p>수직선에서 오른쪽에 있는 수가 더 큽니다.</p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>양수는 0보다 크고, 음수는 0보다 작습니다.</li>
            <li>양수는 어떤 음수보다도 큽니다.</li>
            <li>
              두 음수 중 절댓값이 큰 수가 더 작습니다.{" "}
              <InlineMath math="-5 < -3" />
            </li>
          </ul>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 절댓값">
        <SubSection title="(1) 절댓값의 뜻">
          <p>
            수직선에서 어떤 수가 <strong>원점에서 떨어진 거리</strong>를 그 수의{" "}
            <strong>절댓값</strong>이라 하고, 기호 <InlineMath math="| \; |" />로
            나타냅니다.
          </p>
          <BlockMath math="|+3| = 3, \quad |-3| = 3, \quad |0| = 0" />
        </SubSection>

        <SubSection title="(2) 절댓값의 성질">
          <ul className="list-disc pl-6 space-y-1">
            <li>절댓값은 항상 0 이상입니다.</li>
            <li>
              부호가 반대이고 절댓값이 같은 두 수는 수직선에서 원점으로부터 같은
              거리에 있습니다.
            </li>
            <li>
              절댓값이 <InlineMath math="a" /> (<InlineMath math="a > 0" />)인 수는{" "}
              <InlineMath math="+a" />와 <InlineMath math="-a" />의 두 개입니다.
            </li>
          </ul>
        </SubSection>

        <Insight>
          절댓값은 &ldquo;거리&rdquo; 개념이므로 항상 0 이상입니다. 음수의
          절댓값은 그 수에서 부호를 뗀 값과 같습니다.
        </Insight>
      </CalcBox>

      <CalcBox title="3. 정수와 유리수의 사칙연산">
        <SubSection title="(1) 곱셈의 부호 규칙">
          <p>두 수의 곱에서 부호는 다음과 같이 결정됩니다.</p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              같은 부호: <InlineMath math="(+) \times (+) = (+)" />,{" "}
              <InlineMath math="(-) \times (-) = (+)" />
            </li>
            <li>
              다른 부호: <InlineMath math="(+) \times (-) = (-)" />,{" "}
              <InlineMath math="(-) \times (+) = (-)" />
            </li>
          </ul>
          <BlockMath math="(-3) \times (-4) = +12, \quad (+3) \times (-4) = -12" />
        </SubSection>

        <SubSection title="(2) 거듭제곱과 부호">
          <p>
            음수의 거듭제곱에서, 지수가 <strong>짝수</strong>이면 결과는 양수,{" "}
            <strong>홀수</strong>이면 결과는 음수입니다.
          </p>
          <BlockMath math="(-2)^2 = 4, \quad (-2)^3 = -8, \quad (-2)^4 = 16" />
          <div className="mt-3 rounded-lg bg-accent-light p-4 text-sm">
            <strong>주의:</strong> <InlineMath math="(-2)^2 = 4" />이지만{" "}
            <InlineMath math="-2^2 = -(2^2) = -4" />입니다. 괄호 유무에 주의하세요.
          </div>
        </SubSection>

        <SubSection title="(3) 나눗셈">
          <p>
            나눗셈의 부호 규칙은 곱셈과 같습니다. 나눗셈은{" "}
            <strong>역수를 곱하는 것</strong>으로 바꿀 수 있습니다.
          </p>
          <BlockMath math="a \div b = a \times \frac{1}{b} \quad (b \neq 0)" />
          <BlockMath math="(-6) \div (+2) = -3, \quad (-6) \div (-2) = +3" />
          <p className="mt-2">
            예:{" "}
            <InlineMath math="(-\tfrac{3}{4}) \div (+\tfrac{1}{2}) = (-\tfrac{3}{4}) \times (+2) = -\tfrac{3}{2}" />
          </p>
        </SubSection>

        <SubSection title="(4) 혼합 계산의 순서">
          <p>사칙연산이 섞인 식의 계산 순서:</p>
          <ul className="mt-2 list-decimal pl-6 space-y-1">
            <li>괄호 안을 먼저 계산합니다.</li>
            <li>거듭제곱을 계산합니다.</li>
            <li>곱셈·나눗셈을 왼쪽부터 계산합니다.</li>
            <li>덧셈·뺄셈을 왼쪽부터 계산합니다.</li>
          </ul>
          <div className="mt-3">
            <p>
              예: <InlineMath math="(-2)^2 + 3 \times (-4) - 1" />
            </p>
            <BlockMath math="= 4 + (-12) - 1 = 4 - 12 - 1 = -9" />
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
