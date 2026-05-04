import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection } from "@/components/content/shared";

/** 중1 > Ⅰ. 수와 연산 > 2. 정수와 유리수 > 정수와 유리수의 개념 */
export default function IntegerRationalConcept() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        자연수만으로는 표현할 수 없는 수(0, 음수, 분수)를 다루기 위해 수의 범위를 확장합니다.
      </p>

      <CalcBox title="1. 양수와 음수">
        <SubSection title="(1) 부호를 가진 수">
          <p>
            0보다 큰 수에는 <strong>양의 부호 +</strong>를, 0보다 작은 수에는{" "}
            <strong>음의 부호 −</strong>를 붙여 나타냅니다.
          </p>
          <p className="mt-2">
            예: 영상 5℃ → <InlineMath math="+5" />, 영하 3℃ →{" "}
            <InlineMath math="-3" />
          </p>
        </SubSection>

        <SubSection title="(2) 서로 반대되는 양">
          <p>
            기준점(0)을 기준으로 서로 반대되는 양은 양수와 음수로 표현합니다.
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>해발 100m → <InlineMath math="+100" />, 해저 50m → <InlineMath math="-50" /></li>
            <li>수입 1000원 → <InlineMath math="+1000" />, 지출 500원 → <InlineMath math="-500" /></li>
            <li>3시간 후 → <InlineMath math="+3" />, 3시간 전 → <InlineMath math="-3" /></li>
          </ul>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 정수">
        <SubSection title="(1) 정수의 정의">
          <p>
            <strong>양의 정수</strong>(자연수), <strong>0</strong>,{" "}
            <strong>음의 정수</strong>를 통틀어 <strong>정수</strong>라고 합니다.
          </p>
          <BlockMath math="\text{정수} = \{\ldots, -3, -2, -1, 0, 1, 2, 3, \ldots\}" />
        </SubSection>

        <SubSection title="(2) 정수의 분류">
          <ul className="list-disc pl-6 space-y-1">
            <li>양의 정수: <InlineMath math="+1, +2, +3, \ldots" /> (자연수와 같음)</li>
            <li>0: 양수도 음수도 아닌 수</li>
            <li>음의 정수: <InlineMath math="-1, -2, -3, \ldots" /></li>
          </ul>
        </SubSection>
      </CalcBox>

      <CalcBox title="3. 유리수">
        <SubSection title="(1) 유리수의 정의">
          <p>
            <strong>유리수</strong>는 분자와 분모가 정수이고 분모가 0이 아닌
            분수로 나타낼 수 있는 수입니다.
          </p>
          <BlockMath math="\text{유리수} = \left\{ \frac{a}{b} \mid a, b \text{는 정수}, b \neq 0 \right\}" />
        </SubSection>

        <SubSection title="(2) 유리수의 분류">
          <ul className="list-disc pl-6 space-y-1">
            <li>양의 유리수: <InlineMath math="+\frac{1}{2}, +0.7, +3" /></li>
            <li>0</li>
            <li>음의 유리수: <InlineMath math="-\frac{2}{3}, -1.5, -2" /></li>
          </ul>
          <div className="mt-3 rounded-lg bg-accent-light p-4 text-sm">
            <strong>참고:</strong> 모든 정수는 유리수입니다 (예:{" "}
            <InlineMath math="3 = \frac{3}{1}" />).
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="4. 수직선">
        <SubSection title="(1) 수직선의 표현">
          <p>
            직선 위에 기준점(0)을 정하고 일정한 간격으로 양수는 오른쪽,
            음수는 왼쪽에 대응시킨 직선을 <strong>수직선</strong>이라 합니다.
          </p>
          <pre className="mt-3 font-mono text-sm overflow-x-auto">
            ─┬───┬───┬───┬───┬───┬───┬─{"\n"}
            {" "}-3{"  "}-2{"  "}-1{"   "}0{"   "}+1{"  "}+2{"  "}+3
          </pre>
        </SubSection>

        <SubSection title="(2) 수직선과 유리수">
          <p>
            모든 유리수는 수직선 위의 점에 대응됩니다. 예를 들어{" "}
            <InlineMath math="\frac{3}{2}" />는 1과 2 사이의 점에,{" "}
            <InlineMath math="-\frac{1}{2}" />는 −1과 0 사이의 점에 대응됩니다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="5. 절댓값">
        <SubSection title="(1) 절댓값의 정의">
          <p>
            수직선 위에서 어떤 수에 대응하는 점과 원점(0) 사이의 거리를{" "}
            <strong>절댓값</strong>이라 하고, 기호{" "}
            <InlineMath math="|\, |" />로 나타냅니다.
          </p>
          <BlockMath math="|+5| = 5, \quad |-5| = 5, \quad |0| = 0" />
        </SubSection>

        <SubSection title="(2) 절댓값의 성질">
          <ul className="list-disc pl-6 space-y-1">
            <li>절댓값은 항상 0 이상 (음수가 될 수 없음): <InlineMath math="|a| \geq 0" /></li>
            <li>절댓값이 같은 두 수는 부호만 다름: <InlineMath math="|a| = |-a|" /></li>
            <li>절댓값이 0인 수는 0뿐: <InlineMath math="|a| = 0 \iff a = 0" /></li>
          </ul>
        </SubSection>
      </CalcBox>

      <CalcBox title="6. 수의 대소 관계">
        <SubSection title="(1) 기본 원리">
          <p>수직선 위에서 <strong>오른쪽에 있는 수가 더 크다.</strong></p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>양수는 0보다 크다</li>
            <li>음수는 0보다 작다</li>
            <li>양수가 음수보다 크다</li>
          </ul>
        </SubSection>

        <SubSection title="(2) 절댓값과 대소 관계">
          <p>
            <strong>① 양수끼리</strong>는 절댓값이 클수록 크다.
          </p>
          <BlockMath math="+3 < +5 \quad (|+3| = 3 < 5 = |+5|)" />
          <p>
            <strong>② 음수끼리</strong>는 절댓값이 클수록 작다.
          </p>
          <BlockMath math="-5 < -3 \quad (|-5| = 5 > 3 = |-3|)" />
        </SubSection>

        <SubSection title="(3) 부등호의 사용">
          <ul className="list-disc pl-6 space-y-1">
            <li><InlineMath math="a < b" />: a는 b보다 작다</li>
            <li><InlineMath math="a \leq b" />: a는 b보다 작거나 같다</li>
            <li><InlineMath math="a > b" />: a는 b보다 크다</li>
            <li><InlineMath math="a \geq b" />: a는 b보다 크거나 같다</li>
          </ul>
        </SubSection>
      </CalcBox>
    </div>
  );
}
