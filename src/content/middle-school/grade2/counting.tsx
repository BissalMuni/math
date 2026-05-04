import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중2 > Ⅵ. 확률 > 1. 경우의 수 */
export default function Counting() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 경우의 수">
        <SubSection title="(1) 경우의 수의 뜻">
          <p>
            어떤 사건이 일어날 수 있는 모든 가짓수를{" "}
            <strong>경우의 수</strong>라고 합니다.
          </p>
          <p className="mt-2">
            예: 동전 1개를 던질 때 나오는 경우의 수는{" "}
            <strong>2</strong> (앞면, 뒷면)
          </p>
          <p>
            예: 주사위 1개를 던질 때 나오는 경우의 수는{" "}
            <strong>6</strong> (1, 2, 3, 4, 5, 6)
          </p>
        </SubSection>

        <SubSection title="(2) 사건과 경우의 수">
          <div className="rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              주사위를 던져 짝수의 눈이 나오는 경우의 수는?
            </p>
            <p>
              짝수: 2, 4, 6 → <strong>3가지</strong>
            </p>
          </div>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              주사위를 던져 3 이하의 눈이 나오는 경우의 수는?
            </p>
            <p>
              3 이하: 1, 2, 3 → <strong>3가지</strong>
            </p>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 합의 법칙">
        <SubSection title="(1) 합의 법칙의 뜻">
          <p>
            두 사건 A, B가 <strong>동시에 일어나지 않을 때</strong> (배반사건),
            A 또는 B가 일어나는 경우의 수는:
          </p>
          <BlockMath math="\text{(A 또는 B의 경우의 수)} = m + n" />
          <p className="mt-2">
            (A의 경우의 수가 <InlineMath math="m" />, B의 경우의 수가{" "}
            <InlineMath math="n" />)
          </p>
        </SubSection>

        <SubSection title="(2) 예시">
          <div className="rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              주사위를 던져 3의 배수 또는 5의 배수가 나오는 경우의 수
            </p>
            <p>3의 배수: 3, 6 → 2가지</p>
            <p>5의 배수: 5 → 1가지</p>
            <p>(동시에 일어나지 않음)</p>
            <p className="font-medium">
              경우의 수: <InlineMath math="2 + 1 = 3" />
            </p>
          </div>
        </SubSection>

        <Insight>
          합의 법칙은 &ldquo;또는&rdquo;에 해당합니다. 두 사건이 동시에
          일어날 수 있는 경우에는 중복을 빼야 하므로 주의하세요.
        </Insight>
      </CalcBox>

      <CalcBox title="3. 곱의 법칙">
        <SubSection title="(1) 곱의 법칙의 뜻">
          <p>
            사건 A가 일어나는 경우가 <InlineMath math="m" />가지이고,
            그 각각에 대해 사건 B가 일어나는 경우가{" "}
            <InlineMath math="n" />가지이면, A와 B가{" "}
            <strong>동시에(잇달아)</strong> 일어나는 경우의 수는:
          </p>
          <BlockMath math="\text{(A 그리고 B의 경우의 수)} = m \times n" />
        </SubSection>

        <SubSection title="(2) 예시">
          <div className="rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              동전 1개와 주사위 1개를 동시에 던질 때의 경우의 수
            </p>
            <p>동전: 2가지 (앞, 뒤)</p>
            <p>주사위: 6가지 (1~6)</p>
            <p className="font-medium">
              경우의 수: <InlineMath math="2 \times 6 = 12" />
            </p>
          </div>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              A에서 B로 가는 길이 3가지, B에서 C로 가는 길이 4가지일 때,
              A에서 C로 가는 경우의 수
            </p>
            <p className="font-medium">
              경우의 수: <InlineMath math="3 \times 4 = 12" />
            </p>
          </div>
        </SubSection>

        <Insight>
          합의 법칙은 &ldquo;또는&rdquo; (덧셈), 곱의 법칙은
          &ldquo;그리고&rdquo; (곱셈)으로 기억하면 됩니다.
        </Insight>
      </CalcBox>

      <CalcBox title="4. 여러 가지 경우의 수">
        <SubSection title="(1) 한 줄로 세우기">
          <p>
            <InlineMath math="n" />명을 한 줄로 세우는 경우의 수는{" "}
            <InlineMath math="n" />의 <strong>계승(factorial)</strong>입니다.
          </p>
          <BlockMath math="n! = n \times (n-1) \times (n-2) \times \cdots \times 2 \times 1" />
          <p className="mt-2">
            예: 3명을 한 줄로 세우는 경우의 수:{" "}
            <InlineMath math="3! = 3 \times 2 \times 1 = 6" />
          </p>
        </SubSection>

        <SubSection title="(2) 대표 뽑기">
          <p>
            <InlineMath math="n" />명 중 <InlineMath math="r" />명의 대표를
            뽑는 경우의 수는 순서에 따라 달라집니다.
          </p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              5명 중 반장, 부반장 1명씩 뽑기 (순서 O)
            </p>
            <BlockMath math="5 \times 4 = 20 \text{ (가지)}" />
          </div>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p className="font-medium">
              5명 중 대표 2명 뽑기 (순서 X)
            </p>
            <BlockMath math="\frac{5 \times 4}{2 \times 1} = 10 \text{ (가지)}" />
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
