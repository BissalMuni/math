import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중3 > Ⅳ. 이차함수 > 2. 이차함수의 활용 */
export default function QuadraticFuncApplication() {
  return (
    <div className="space-y-8">
      <CalcBox title="■ 이차함수의 최댓값과 최솟값">
        <SubSection title="● 최솟값 (a > 0)">
          <p>
            <InlineMath math="a > 0" />일 때,{" "}
            <InlineMath math="y = a(x - p)^2 + q" />는{" "}
            <InlineMath math="x = p" />에서 <strong>최솟값</strong>{" "}
            <InlineMath math="q" />를 가집니다.
          </p>
          <BlockMath math="y = 2(x - 3)^2 + 1 \;\Rightarrow\; \text{최솟값} = 1 \;\;(x = 3)" />
        </SubSection>

        <SubSection title="● 최댓값 (a < 0)">
          <p>
            <InlineMath math="a < 0" />일 때,{" "}
            <InlineMath math="y = a(x - p)^2 + q" />는{" "}
            <InlineMath math="x = p" />에서 <strong>최댓값</strong>{" "}
            <InlineMath math="q" />를 가집니다.
          </p>
          <BlockMath math="y = -(x + 1)^2 + 5 \;\Rightarrow\; \text{최댓값} = 5 \;\;(x = -1)" />
        </SubSection>

        <SubSection title="● 일반형에서 최댓값·최솟값 구하기">
          <p>
            <InlineMath math="y = ax^2 + bx + c" />를 표준형으로 변환하여 구합니다.
          </p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">
              예: <InlineMath math="y = -x^2 + 4x + 1" />의 최댓값
            </p>
            <BlockMath math="y = -(x^2 - 4x) + 1 = -(x - 2)^2 + 4 + 1 = -(x - 2)^2 + 5" />
            <p className="mt-2">
              <InlineMath math="x = 2" />일 때 최댓값 <strong>5</strong>
            </p>
          </div>
        </SubSection>

        <Insight>
          이차함수의 최댓값·최솟값은 항상 꼭짓점에서 나타납니다. 표준형으로
          바꾸는 연습이 핵심입니다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ 이차함수의 식 구하기">
        <SubSection title="● 꼭짓점과 한 점이 주어진 경우">
          <p>
            <InlineMath math="y = a(x - p)^2 + q" />에 꼭짓점{" "}
            <InlineMath math="(p, q)" />를 대입하고, 지나는 점으로{" "}
            <InlineMath math="a" />를 구합니다.
          </p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">
              예: 꼭짓점 <InlineMath math="(1, -2)" />, 점{" "}
              <InlineMath math="(3, 6)" />을 지나는 이차함수
            </p>
            <BlockMath math="y = a(x - 1)^2 - 2" />
            <p className="mt-2">
              <InlineMath math="(3, 6)" /> 대입: <InlineMath math="6 = 4a - 2" />,{" "}
              <InlineMath math="a = 2" />
            </p>
            <BlockMath math="y = 2(x - 1)^2 - 2" />
          </div>
        </SubSection>

        <SubSection title="● 축과 한 점이 주어진 경우">
          <p>
            축 <InlineMath math="x = p" />를 알면{" "}
            <InlineMath math="y = a(x - p)^2 + q" />로 놓고 조건을 대입합니다.
          </p>
        </SubSection>

        <SubSection title="● 세 점이 주어진 경우">
          <p>
            <InlineMath math="y = ax^2 + bx + c" />에 세 점을 대입하여
            연립방정식을 풀면 <InlineMath math="a" />, <InlineMath math="b" />,{" "}
            <InlineMath math="c" />를 구할 수 있습니다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 이차함수의 활용">
        <SubSection title="● 포물선 운동">
          <div className="rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">
              예제: 공을 던졌을 때 수평 거리 <InlineMath math="x" /> m에서의 높이가{" "}
              <InlineMath math="y = -\dfrac{1}{5}x^2 + 2x" /> (m)이다. 최대 높이를 구하여라.
            </p>
            <BlockMath math="y = -\frac{1}{5}(x^2 - 10x) = -\frac{1}{5}(x - 5)^2 + 5" />
            <p className="mt-2">
              <InlineMath math="x = 5" />일 때 최대 높이 <strong>5m</strong>
            </p>
          </div>
        </SubSection>

        <SubSection title="● 넓이의 최댓값">
          <div className="rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">
              예제: 둘레의 길이가 20cm인 직사각형의 넓이의 최댓값을 구하여라.
            </p>
            <p className="mt-2">
              가로를 <InlineMath math="x" /> cm로 놓으면 세로는{" "}
              <InlineMath math="(10 - x)" /> cm
            </p>
            <BlockMath math="S = x(10 - x) = -x^2 + 10x = -(x - 5)^2 + 25" />
            <p className="mt-2">
              <InlineMath math="x = 5" />일 때 넓이의 최댓값은{" "}
              <InlineMath math="25\text{cm}^2" /> (정사각형일 때)
            </p>
          </div>
        </SubSection>

        <SubSection title="● 매출·이익 문제">
          <div className="rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">
              예제: 개당 1000원인 물건을 100원씩 올릴 때마다 판매량이 5개씩
              줄어든다. 현재 판매량이 100개일 때, 매출이 최대가 되는 가격을
              구하여라.
            </p>
            <p className="mt-2">
              <InlineMath math="x" />번 올리면 가격{" "}
              <InlineMath math="(1000 + 100x)" />원, 판매량{" "}
              <InlineMath math="(100 - 5x)" />개
            </p>
            <BlockMath math="y = (1000 + 100x)(100 - 5x)" />
            <BlockMath math="= -500x^2 + 5000x + 100000" />
            <BlockMath math="= -500(x - 5)^2 + 112500" />
            <p className="mt-2">
              <InlineMath math="x = 5" />일 때, 가격 <strong>1500원</strong>에서 매출 최대
            </p>
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
