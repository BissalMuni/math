import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중1 > Ⅰ. 수와 연산 > 2. 정수와 유리수 > 정수와 유리수의 곱셈과 나눗셈 */
export default function MultiplyDivide() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        곱셈과 나눗셈은 <strong>부호 결정</strong> 후{" "}
        <strong>절댓값을 곱하거나 나누면</strong> 됩니다.
      </p>

      <CalcBox title="1. 곱셈의 부호 결정">
        <SubSection title="(1) 부호의 규칙">
          <ul className="list-disc pl-6 space-y-1">
            <li>① (양) × (양) = (양): <InlineMath math="(+) \times (+) = (+)" /></li>
            <li>② (음) × (음) = (양): <InlineMath math="(-) \times (-) = (+)" /></li>
            <li>③ (양) × (음) = (음): <InlineMath math="(+) \times (-) = (-)" /></li>
            <li>④ (음) × (양) = (음): <InlineMath math="(-) \times (+) = (-)" /></li>
          </ul>
          <Insight>
            <strong>같은 부호끼리 곱하면 +, 다른 부호끼리 곱하면 −</strong>
          </Insight>
        </SubSection>

        <SubSection title="(2) 계산 예시">
          <BlockMath math="(+3) \times (+4) = +12" />
          <BlockMath math="(-3) \times (-4) = +12" />
          <BlockMath math="(+3) \times (-4) = -12" />
          <BlockMath math="(-3) \times (+4) = -12" />
        </SubSection>

        <SubSection title="(3) 0과의 곱셈">
          <p>어떤 수와 0의 곱은 항상 0입니다.</p>
          <BlockMath math="a \times 0 = 0 \times a = 0" />
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 여러 수의 곱셈">
        <SubSection title="(1) 부호 결정 — 음수의 개수">
          <p>여러 수를 곱할 때, 부호는 <strong>음수의 개수</strong>에 따라 결정됩니다.</p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>① 음수가 짝수 개 → 부호는 <strong>+</strong></li>
            <li>② 음수가 홀수 개 → 부호는 <strong>−</strong></li>
          </ul>
        </SubSection>

        <SubSection title="(2) 계산 예시">
          <BlockMath math="(-2) \times (+3) \times (-4) = +24 \quad (\text{음수 2개})" />
          <BlockMath math="(-1) \times (-2) \times (-3) = -6 \quad (\text{음수 3개})" />
        </SubSection>

        <SubSection title="(3) 곱셈의 계산 법칙">
          <p>
            <strong>① 교환법칙</strong>: <InlineMath math="a \times b = b \times a" />
          </p>
          <p>
            <strong>② 결합법칙</strong>: <InlineMath math="(a \times b) \times c = a \times (b \times c)" />
          </p>
          <p>
            <strong>③ 분배법칙</strong>: <InlineMath math="a \times (b + c) = a \times b + a \times c" />
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="3. 거듭제곱">
        <SubSection title="(1) 거듭제곱의 정의">
          <p>같은 수를 여러 번 곱한 것을 <strong>거듭제곱</strong>이라 합니다.</p>
          <BlockMath math="a^n = \underbrace{a \times a \times \cdots \times a}_{n\text{개}}" />
          <p className="mt-2">
            <InlineMath math="a" />를 <strong>밑</strong>,{" "}
            <InlineMath math="n" />을 <strong>지수</strong>라고 합니다.
          </p>
        </SubSection>

        <SubSection title="(2) 음수의 거듭제곱">
          <p>
            지수가 짝수면 +, 홀수면 −가 됩니다.
          </p>
          <BlockMath math="(-2)^2 = (-2) \times (-2) = +4" />
          <BlockMath math="(-2)^3 = (-2) \times (-2) \times (-2) = -8" />
          <BlockMath math="(-2)^4 = +16, \quad (-2)^5 = -32" />
        </SubSection>

        <SubSection title="(3) 괄호의 위치 주의">
          <p>괄호의 유무에 따라 결과가 달라집니다.</p>
          <BlockMath math="(-2)^2 = (-2) \times (-2) = +4" />
          <BlockMath math="-2^2 = -(2 \times 2) = -4" />
          <Insight>
            괄호가 없으면 <strong>밑은 양수만</strong>이고 부호는 마지막에 붙습니다.
          </Insight>
        </SubSection>
      </CalcBox>

      <CalcBox title="4. 나눗셈">
        <SubSection title="(1) 부호의 규칙">
          <p>곱셈과 같은 규칙입니다.</p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>같은 부호끼리 나누면 +</li>
            <li>다른 부호끼리 나누면 −</li>
          </ul>
          <BlockMath math="(+6) \div (+2) = +3, \quad (-6) \div (-2) = +3" />
          <BlockMath math="(+6) \div (-2) = -3, \quad (-6) \div (+2) = -3" />
        </SubSection>

        <SubSection title="(2) 역수">
          <p>
            두 수의 곱이 1일 때, 한 수를 다른 수의 <strong>역수</strong>라 합니다.
          </p>
          <BlockMath math="\frac{2}{3} \times \frac{3}{2} = 1 \;\Longrightarrow\; \frac{2}{3}\text{의 역수는 } \frac{3}{2}" />
          <p className="mt-2">
            <strong>0은 역수가 없습니다.</strong> (0을 곱해서 1을 만들 수 없음)
          </p>
        </SubSection>

        <SubSection title="(3) 나눗셈을 곱셈으로">
          <p>
            <strong>나누는 수의 역수를 곱한다.</strong>
          </p>
          <BlockMath math="a \div b = a \times \frac{1}{b} \quad (b \neq 0)" />
          <BlockMath math="\left(-\tfrac{2}{3}\right) \div \left(+\tfrac{4}{5}\right) = \left(-\tfrac{2}{3}\right) \times \left(+\tfrac{5}{4}\right) = -\tfrac{10}{12} = -\tfrac{5}{6}" />
        </SubSection>
      </CalcBox>

      <CalcBox title="5. 사칙연산의 혼합 계산">
        <SubSection title="(1) 계산 순서">
          <ul className="list-disc pl-6 space-y-1">
            <li>① 거듭제곱을 먼저 계산</li>
            <li>② 괄호 안을 계산 (소괄호 → 중괄호 → 대괄호)</li>
            <li>③ 곱셈·나눗셈을 왼쪽부터</li>
            <li>④ 덧셈·뺄셈을 왼쪽부터</li>
          </ul>
        </SubSection>

        <SubSection title="(2) 계산 예시">
          <p>
            <InlineMath math="-2^2 + (-3) \times \{4 - (-1)\} \div 5" />를
            계산해 봅시다.
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>① 거듭제곱: <InlineMath math="-2^2 = -4" /></li>
            <li>② 괄호 안: <InlineMath math="4 - (-1) = 5" /></li>
            <li>③ 곱셈·나눗셈: <InlineMath math="(-3) \times 5 \div 5 = -3" /></li>
            <li>④ 덧셈: <InlineMath math="-4 + (-3) = -7" /></li>
          </ul>
        </SubSection>
      </CalcBox>
    </div>
  );
}
