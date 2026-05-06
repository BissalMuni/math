import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중3 > Ⅳ. 이차함수 > 1. 이차함수와 그래프 */
export default function QuadraticFuncGraph() {
  return (
    <div className="space-y-8">
      <CalcBox title="■ 이차함수 y = ax²의 그래프">
        <SubSection title="● 이차함수의 뜻">
          <p>
            <InlineMath math="y = ax^2 + bx + c" /> (
            <InlineMath math="a \neq 0" />) 꼴로 나타내어지는 함수를{" "}
            <strong>이차함수</strong>라고 합니다. 그래프는 <strong>포물선</strong>
            이라 부르는 곡선입니다.
          </p>
        </SubSection>

        <SubSection title="● y = ax²의 그래프 성질">
          <p>
            <InlineMath math="y = ax^2" />의 그래프는 원점을 꼭짓점으로 하고,{" "}
            <InlineMath math="y" />축을 축으로 하는 포물선입니다.
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>
              <InlineMath math="a > 0" />: 아래로 볼록 (위로 열림)
            </li>
            <li>
              <InlineMath math="a < 0" />: 위로 볼록 (아래로 열림)
            </li>
            <li>
              <InlineMath math="|a|" />가 클수록 그래프의 폭이 좁아짐
            </li>
          </ul>
        </SubSection>

        <SubSection title="● y = ax²과 y = -ax²의 관계">
          <p>
            <InlineMath math="y = ax^2" />과 <InlineMath math="y = -ax^2" />의
            그래프는 <InlineMath math="x" />축에 대하여 서로 대칭입니다.
          </p>
          <div className="mt-3 space-y-1">
            <p>
              예: <InlineMath math="y = 2x^2" />과{" "}
              <InlineMath math="y = -2x^2" />은 <InlineMath math="x" />축 대칭
            </p>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 이차함수 y = a(x - p)² + q의 그래프">
        <SubSection title="● y = ax² + q의 그래프">
          <p>
            <InlineMath math="y = ax^2" />의 그래프를{" "}
            <InlineMath math="y" />축 방향으로 <InlineMath math="q" />만큼
            평행이동한 것입니다.
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>
              꼭짓점: <InlineMath math="(0, q)" />
            </li>
            <li>
              축: <InlineMath math="y" />축 (직선 <InlineMath math="x = 0" />)
            </li>
          </ul>
          <p className="mt-2">
            예: <InlineMath math="y = x^2 + 3" /> → 꼭짓점{" "}
            <InlineMath math="(0, 3)" />
          </p>
        </SubSection>

        <SubSection title="● y = a(x - p)²의 그래프">
          <p>
            <InlineMath math="y = ax^2" />의 그래프를{" "}
            <InlineMath math="x" />축 방향으로 <InlineMath math="p" />만큼
            평행이동한 것입니다.
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>
              꼭짓점: <InlineMath math="(p, 0)" />
            </li>
            <li>
              축: 직선 <InlineMath math="x = p" />
            </li>
          </ul>
          <p className="mt-2">
            예: <InlineMath math="y = 2(x - 3)^2" /> → 꼭짓점{" "}
            <InlineMath math="(3, 0)" />
          </p>
        </SubSection>

        <SubSection title="● y = a(x - p)² + q의 그래프">
          <p>
            <InlineMath math="y = ax^2" />의 그래프를{" "}
            <InlineMath math="x" />축 방향으로 <InlineMath math="p" />,{" "}
            <InlineMath math="y" />축 방향으로 <InlineMath math="q" />만큼
            평행이동한 것입니다.
          </p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p>
              꼭짓점: <InlineMath math="(p, q)" />
            </p>
            <p>
              축: 직선 <InlineMath math="x = p" />
            </p>
          </div>
          <div className="mt-3 space-y-1">
            <p>
              예: <InlineMath math="y = -2(x - 1)^2 + 3" /> → 꼭짓점{" "}
              <InlineMath math="(1, 3)" />, 축{" "}
              <InlineMath math="x = 1" />, 위로 볼록
            </p>
          </div>
        </SubSection>

        <Insight>
          평행이동 방향을 기억하세요: <InlineMath math="y = a(x - p)^2 + q" />
          에서 <InlineMath math="p" />는 <strong>오른쪽</strong>,{" "}
          <InlineMath math="q" />는 <strong>위쪽</strong>으로의 이동량입니다.
          부호에 주의하세요!
        </Insight>
      </CalcBox>

      <CalcBox title="■ 이차함수 y = ax² + bx + c의 그래프">
        <SubSection title="● 표준형으로 변환">
          <p>
            <InlineMath math="y = ax^2 + bx + c" />를 완전제곱식으로 변환하여
            꼭짓점과 축을 구합니다.
          </p>
          <BlockMath math="y = a\left(x + \frac{b}{2a}\right)^2 - \frac{b^2 - 4ac}{4a}" />
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 space-y-2">
            <p>
              꼭짓점: <InlineMath math="\left(-\dfrac{b}{2a}, \; -\dfrac{b^2 - 4ac}{4a}\right)" />
            </p>
            <p>
              축: 직선 <InlineMath math="x = -\dfrac{b}{2a}" />
            </p>
          </div>
        </SubSection>

        <SubSection title="● 변환 예시">
          <p>
            <InlineMath math="y = 2x^2 - 8x + 5" />를 표준형으로 바꾸면:
          </p>
          <BlockMath math="y = 2(x^2 - 4x) + 5 = 2(x^2 - 4x + 4 - 4) + 5" />
          <BlockMath math="= 2(x - 2)^2 - 8 + 5 = 2(x - 2)^2 - 3" />
          <p className="mt-2">
            꼭짓점 <InlineMath math="(2, -3)" />, 축{" "}
            <InlineMath math="x = 2" />, 아래로 볼록
          </p>
        </SubSection>

        <SubSection title="● 그래프의 성질 정리">
          <div className="rounded-lg border border-sidebar-border p-4 space-y-2 text-sm">
            <p>
              <InlineMath math="y" />축과의 교점: <InlineMath math="(0, c)" />
            </p>
            <p>
              <InlineMath math="x" />축과의 교점: <InlineMath math="ax^2 + bx + c = 0" />의
              실수 해
            </p>
            <p>
              <InlineMath math="a > 0" />이면 아래로 볼록, 꼭짓점에서 최솟값
            </p>
            <p>
              <InlineMath math="a < 0" />이면 위로 볼록, 꼭짓점에서 최댓값
            </p>
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
