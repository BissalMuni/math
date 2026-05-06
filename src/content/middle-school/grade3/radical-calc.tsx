import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중3 > Ⅰ. 실수와 그 계산 > 2. 근호를 포함한 식의 계산 */
export default function RadicalCalc() {
  return (
    <div className="space-y-8">
      <CalcBox title="■ 제곱근의 곱셈과 나눗셈">
        <SubSection title="● 제곱근의 곱셈">
          <p>
            <InlineMath math="a > 0" />, <InlineMath math="b > 0" />일 때:
          </p>
          <BlockMath math="\sqrt{a} \times \sqrt{b} = \sqrt{ab}" />
          <div className="mt-3 space-y-2">
            <p>
              예: <InlineMath math="\sqrt{2} \times \sqrt{3} = \sqrt{6}" />
            </p>
            <p>
              예: <InlineMath math="\sqrt{5} \times \sqrt{5} = \sqrt{25} = 5" />
            </p>
          </div>
        </SubSection>

        <SubSection title="● 제곱근의 나눗셈">
          <p>
            <InlineMath math="a > 0" />, <InlineMath math="b > 0" />일 때:
          </p>
          <BlockMath math="\frac{\sqrt{a}}{\sqrt{b}} = \sqrt{\frac{a}{b}}" />
          <div className="mt-3 space-y-2">
            <p>
              예:{" "}
              <InlineMath math="\dfrac{\sqrt{12}}{\sqrt{3}} = \sqrt{\dfrac{12}{3}} = \sqrt{4} = 2" />
            </p>
          </div>
        </SubSection>

        <SubSection title="● 근호 안의 수 간단히 하기">
          <p>
            근호 안의 수에서 제곱인 인수를 근호 밖으로 꺼냅니다.
          </p>
          <BlockMath math="\sqrt{a^2 b} = a\sqrt{b} \quad (a > 0, \; b > 0)" />
          <div className="mt-3 space-y-2">
            <p>
              예: <InlineMath math="\sqrt{12} = \sqrt{4 \times 3} = 2\sqrt{3}" />
            </p>
            <p>
              예: <InlineMath math="\sqrt{48} = \sqrt{16 \times 3} = 4\sqrt{3}" />
            </p>
            <p>
              예: <InlineMath math="\sqrt{75} = \sqrt{25 \times 3} = 5\sqrt{3}" />
            </p>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 분모의 유리화">
        <SubSection title="● 분모의 유리화란">
          <p>
            분모에 근호가 있는 식에서, 분모를 유리수로 만드는 과정을{" "}
            <strong>분모의 유리화</strong>라고 합니다.
          </p>
          <BlockMath math="\frac{a}{\sqrt{b}} = \frac{a}{\sqrt{b}} \times \frac{\sqrt{b}}{\sqrt{b}} = \frac{a\sqrt{b}}{b}" />
        </SubSection>

        <SubSection title="● 분모의 유리화 예시">
          <div className="space-y-3">
            <BlockMath math="\frac{1}{\sqrt{3}} = \frac{\sqrt{3}}{3}" />
            <BlockMath math="\frac{6}{\sqrt{2}} = \frac{6\sqrt{2}}{2} = 3\sqrt{2}" />
            <BlockMath math="\frac{2}{3\sqrt{5}} = \frac{2\sqrt{5}}{15}" />
          </div>
        </SubSection>

        <Insight>
          분모의 유리화는 분모·분자에 같은 수를 곱하는 것이므로 분수의 값은
          변하지 않습니다. 계산 결과를 깔끔하게 정리할 때 자주 사용합니다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ 제곱근의 덧셈과 뺄셈">
        <SubSection title="● 같은 근호끼리의 덧셈·뺄셈">
          <p>
            근호 안의 수가 같은 항끼리 계수를 더하거나 뺍니다. 문자의
            동류항 계산과 같은 원리입니다.
          </p>
          <BlockMath math="a\sqrt{c} + b\sqrt{c} = (a + b)\sqrt{c}" />
          <div className="mt-3 space-y-2">
            <p>
              예:{" "}
              <InlineMath math="3\sqrt{2} + 5\sqrt{2} = 8\sqrt{2}" />
            </p>
            <p>
              예:{" "}
              <InlineMath math="7\sqrt{3} - 2\sqrt{3} = 5\sqrt{3}" />
            </p>
          </div>
        </SubSection>

        <SubSection title="● 근호 안을 간단히 한 뒤 계산">
          <p>
            근호 안의 수가 다르더라도, 간단히 하면 같아지는 경우가 있습니다.
          </p>
          <div className="mt-3 space-y-3">
            <BlockMath math="\sqrt{12} + \sqrt{27} = 2\sqrt{3} + 3\sqrt{3} = 5\sqrt{3}" />
            <BlockMath math="\sqrt{50} - \sqrt{8} = 5\sqrt{2} - 2\sqrt{2} = 3\sqrt{2}" />
            <BlockMath math="3\sqrt{2} + \sqrt{18} - \sqrt{32} = 3\sqrt{2} + 3\sqrt{2} - 4\sqrt{2} = 2\sqrt{2}" />
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 근호를 포함한 식의 혼합 계산">
        <SubSection title="● 분배법칙의 활용">
          <p>
            근호를 포함한 식에서도 분배법칙이 성립합니다.
          </p>
          <BlockMath math="\sqrt{2}(\sqrt{3} + \sqrt{5}) = \sqrt{6} + \sqrt{10}" />
          <BlockMath math="(\sqrt{3} + 1)(\sqrt{3} - 2) = 3 - 2\sqrt{3} + \sqrt{3} - 2 = 1 - \sqrt{3}" />
        </SubSection>

        <SubSection title="● 혼합 계산 예시">
          <div className="space-y-3">
            <p>
              예: <InlineMath math="\dfrac{\sqrt{6} + \sqrt{3}}{\sqrt{3}}" />
              을 간단히 하면
            </p>
            <BlockMath math="\frac{\sqrt{6} + \sqrt{3}}{\sqrt{3}} = \frac{\sqrt{6}}{\sqrt{3}} + \frac{\sqrt{3}}{\sqrt{3}} = \sqrt{2} + 1" />
          </div>
        </SubSection>

        <Insight>
          근호를 포함한 식의 계산은 ① 근호 안 간단히 하기 → ② 분모의 유리화 →
          ③ 동류항 정리 순으로 진행하면 실수를 줄일 수 있습니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
