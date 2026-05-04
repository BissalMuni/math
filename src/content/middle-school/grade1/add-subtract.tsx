import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중1 > Ⅰ. 수와 연산 > 2. 정수와 유리수 > 정수와 유리수의 덧셈과 뺄셈 */
export default function AddSubtract() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        부호가 있는 수의 덧셈·뺄셈은 <strong>부호 결정</strong>과{" "}
        <strong>절댓값 계산</strong>의 두 단계로 이루어집니다.
      </p>

      <CalcBox title="1. 덧셈">
        <SubSection title="(1) 부호가 같은 두 수의 덧셈">
          <p>
            절댓값을 더한 뒤, <strong>공통의 부호</strong>를 붙입니다.
          </p>
          <BlockMath math="(+3) + (+5) = +(3+5) = +8" />
          <BlockMath math="(-3) + (-5) = -(3+5) = -8" />
        </SubSection>

        <SubSection title="(2) 부호가 다른 두 수의 덧셈">
          <p>
            절댓값이 큰 수에서 작은 수를 빼고,{" "}
            <strong>절댓값이 큰 수의 부호</strong>를 붙입니다.
          </p>
          <BlockMath math="(+7) + (-3) = +(7-3) = +4" />
          <BlockMath math="(-7) + (+3) = -(7-3) = -4" />
          <p className="mt-2">절댓값이 같으면 합은 0입니다.</p>
          <BlockMath math="(+5) + (-5) = 0" />
        </SubSection>

        <SubSection title="(3) 덧셈의 계산 법칙">
          <p>
            <strong>① 교환법칙</strong>: 두 수의 자리를 바꾸어 더해도 같다.
          </p>
          <BlockMath math="a + b = b + a" />
          <p>
            <strong>② 결합법칙</strong>: 세 수 이상을 더할 때 어느 두 수를 먼저
            더해도 같다.
          </p>
          <BlockMath math="(a + b) + c = a + (b + c)" />
          <p className="mt-2">
            예: <InlineMath math="(-7) + (+5) + (+7) = (-7) + (+7) + (+5) = 0 + (+5) = +5" />
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 뺄셈">
        <SubSection title="(1) 뺄셈의 원리">
          <p>
            <strong>빼는 수의 부호를 바꾸어 더한다.</strong>
          </p>
          <BlockMath math="a - b = a + (-b)" />
          <p className="mt-2">즉, 모든 뺄셈은 덧셈으로 바꿀 수 있습니다.</p>
        </SubSection>

        <SubSection title="(2) 계산 예시">
          <BlockMath math="(+7) - (+3) = (+7) + (-3) = +4" />
          <BlockMath math="(+7) - (-3) = (+7) + (+3) = +10" />
          <BlockMath math="(-7) - (+3) = (-7) + (-3) = -10" />
          <BlockMath math="(-7) - (-3) = (-7) + (+3) = -4" />
        </SubSection>

        <Insight>
          뺄셈의 부호 처리는 <InlineMath math="-(-a) = +a" />,{" "}
          <InlineMath math="-(+a) = -a" />로 기억하면 편합니다.
        </Insight>
      </CalcBox>

      <CalcBox title="3. 덧셈과 뺄셈의 혼합 계산">
        <SubSection title="(1) 계산 순서">
          <p>덧셈과 뺄셈만 있는 식은 <strong>왼쪽부터 차례로</strong> 계산합니다.</p>
          <p className="mt-2">
            단, 모든 뺄셈을 덧셈으로 바꾼 뒤 교환·결합법칙을 활용하면 더 간단해집니다.
          </p>
        </SubSection>

        <SubSection title="(2) 계산 예시">
          <p>
            <InlineMath math="(+5) - (+8) + (-3) - (-2)" />를 계산해 봅시다.
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>① 모두 덧셈으로: <InlineMath math="(+5) + (-8) + (-3) + (+2)" /></li>
            <li>② 양수끼리, 음수끼리: <InlineMath math="\{(+5) + (+2)\} + \{(-8) + (-3)\}" /></li>
            <li>③ 각각 계산: <InlineMath math="(+7) + (-11)" /></li>
            <li>④ 결과: <InlineMath math="-4" /></li>
          </ul>
        </SubSection>

        <SubSection title="(3) 부호 생략">
          <p>
            식에서 양의 부호 <InlineMath math="+" />와 괄호는 생략할 수 있습니다.
          </p>
          <BlockMath math="(+5) - (+8) + (-3) - (-2) = 5 - 8 - 3 + 2 = -4" />
        </SubSection>
      </CalcBox>

      <CalcBox title="4. 유리수의 덧셈과 뺄셈">
        <SubSection title="(1) 분수의 덧셈·뺄셈">
          <p>
            분모를 통일(통분)한 뒤, 정수의 덧셈·뺄셈과 같은 방법으로 계산합니다.
          </p>
          <BlockMath math="\left(-\tfrac{1}{2}\right) + \left(+\tfrac{1}{3}\right) = -\tfrac{3}{6} + \tfrac{2}{6} = -\tfrac{1}{6}" />
        </SubSection>

        <SubSection title="(2) 소수의 덧셈·뺄셈">
          <p>소수점의 자리를 맞추어 계산합니다.</p>
          <BlockMath math="(-1.5) + (+0.7) = -(1.5 - 0.7) = -0.8" />
        </SubSection>

        <SubSection title="(3) 분수와 소수의 혼합">
          <p>분수를 소수로 바꾸거나, 소수를 분수로 바꾸어 통일합니다.</p>
          <BlockMath math="\left(-\tfrac{1}{2}\right) + (+0.3) = -0.5 + 0.3 = -0.2" />
        </SubSection>
      </CalcBox>
    </div>
  );
}
