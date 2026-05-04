import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중2 > Ⅵ. 확률 > 2. 확률 개념 */
export default function ProbabilityConcept() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 확률의 뜻">
        <SubSection title="(1) 확률의 정의">
          <p>
            어떤 실험이나 관찰에서 각 경우가 일어날 가능성이 같을 때,
            사건 A가 일어날 <strong>확률</strong>은:
          </p>
          <BlockMath math="P(A) = \frac{\text{(사건 A가 일어나는 경우의 수)}}{\text{(모든 경우의 수)}}" />
        </SubSection>

        <SubSection title="(2) 확률의 범위">
          <p>
            모든 확률 <InlineMath math="P(A)" />는 다음 범위에 있습니다.
          </p>
          <BlockMath math="0 \leq P(A) \leq 1" />
          <div className="mt-2 space-y-1">
            <p>
              <InlineMath math="P(A) = 0" />: 사건 A가 절대 일어나지 않음
            </p>
            <p>
              <InlineMath math="P(A) = 1" />: 사건 A가 반드시 일어남
            </p>
          </div>
        </SubSection>

        <SubSection title="(3) 확률 계산 예시">
          <div className="rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              주사위 1개를 던질 때, 짝수의 눈이 나올 확률
            </p>
            <p>짝수: 2, 4, 6 → 3가지</p>
            <p>전체: 1, 2, 3, 4, 5, 6 → 6가지</p>
            <BlockMath math="P(\text{짝수}) = \frac{3}{6} = \frac{1}{2}" />
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 확률의 성질">
        <SubSection title="(1) 여사건의 확률">
          <p>
            사건 A가 일어나지 않는 사건을 A의 <strong>여사건</strong>이라 하고{" "}
            <InlineMath math="A^c" />로 나타냅니다.
          </p>
          <BlockMath math="P(A^c) = 1 - P(A)" />
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              주사위를 던져 1이 나오지 않을 확률
            </p>
            <BlockMath math="P(\text{1이 아님}) = 1 - P(\text{1}) = 1 - \frac{1}{6} = \frac{5}{6}" />
          </div>
        </SubSection>

        <SubSection title="(2) &ldquo;적어도&rdquo;의 확률">
          <p>
            &ldquo;적어도 하나&rdquo;가 일어날 확률은 여사건을 이용하면
            간단합니다.
          </p>
          <BlockMath math="P(\text{적어도 하나}) = 1 - P(\text{하나도 아닌})" />
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              동전 2개를 던질 때, 적어도 하나가 앞면일 확률
            </p>
            <p>전체: (앞앞, 앞뒤, 뒤앞, 뒤뒤) → 4가지</p>
            <p>모두 뒷면: (뒤뒤) → 1가지</p>
            <BlockMath math="P(\text{적어도 한 앞면}) = 1 - \frac{1}{4} = \frac{3}{4}" />
          </div>
        </SubSection>

        <Insight>
          &ldquo;적어도 하나&rdquo;를 직접 구하면 경우가 복잡할 수 있지만,
          여사건(하나도 없는 경우)은 보통 간단합니다. 여사건의 확률을
          활용하는 습관을 들이세요.
        </Insight>
      </CalcBox>

      <CalcBox title="3. 확률의 계산">
        <SubSection title="(1) 사건이 동시에 일어나지 않을 때 (합의 법칙)">
          <p>
            두 사건 A, B가 동시에 일어나지 않을 때(배반사건):
          </p>
          <BlockMath math="P(A \text{ 또는 } B) = P(A) + P(B)" />
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              주사위를 던져 1 또는 6이 나올 확률
            </p>
            <BlockMath math="P(1 \text{ 또는 } 6) = \frac{1}{6} + \frac{1}{6} = \frac{2}{6} = \frac{1}{3}" />
          </div>
        </SubSection>

        <SubSection title="(2) 연속으로 일어나는 사건의 확률">
          <p>
            두 사건 A, B가 서로 영향을 주지 않을 때(독립사건),
            A와 B가 동시에(잇달아) 일어날 확률:
          </p>
          <BlockMath math="P(A \text{ 그리고 } B) = P(A) \times P(B)" />
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              동전을 2번 던져 모두 앞면이 나올 확률
            </p>
            <BlockMath math="P(\text{앞}) \times P(\text{앞}) = \frac{1}{2} \times \frac{1}{2} = \frac{1}{4}" />
          </div>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              주사위를 2번 던져 모두 짝수가 나올 확률
            </p>
            <BlockMath math="\frac{1}{2} \times \frac{1}{2} = \frac{1}{4}" />
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="4. 확률의 활용">
        <SubSection title="(1) 표·나무그림을 이용한 확률">
          <div className="rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              빨간 공 3개, 파란 공 2개가 든 주머니에서 공 1개를 꺼낼 때
            </p>
            <BlockMath math="P(\text{빨간}) = \frac{3}{5}, \quad P(\text{파란}) = \frac{2}{5}" />
          </div>
        </SubSection>

        <SubSection title="(2) 기하학적 확률">
          <p>
            면적이나 길이의 비를 이용하여 확률을 구할 수도 있습니다.
          </p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              반지름 5cm인 원 안에 반지름 2cm인 원이 있을 때,
              화살이 작은 원 안에 꽂힐 확률
            </p>
            <BlockMath math="P = \frac{\pi \times 2^2}{\pi \times 5^2} = \frac{4}{25}" />
          </div>
        </SubSection>

        <Insight>
          확률 문제를 풀 때는 먼저 &ldquo;전체 경우의 수&rdquo;를 파악하고,
          &ldquo;원하는 사건의 경우의 수&rdquo;를 구하는 순서로 접근하세요.
          복잡한 문제일수록 여사건을 활용하는 것이 효율적입니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
