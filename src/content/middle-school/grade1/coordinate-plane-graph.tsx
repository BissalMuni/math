import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중1 > Ⅲ. 좌표평면과 그래프 > 1. 좌표평면과 그래프 */
export default function CoordinatePlaneGraph() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 순서쌍과 좌표평면">
        <SubSection title="(1) 순서쌍">
          <p>
            두 수의 쌍 <InlineMath math="(a, b)" />에서 순서를 생각하여 나타낸
            것을 <strong>순서쌍</strong>이라고 합니다.
          </p>
          <p className="mt-2">
            <InlineMath math="(2, 3)" />과 <InlineMath math="(3, 2)" />는 서로
            다른 순서쌍입니다.
          </p>
        </SubSection>

        <SubSection title="(2) 좌표평면">
          <p>
            수직으로 만나는 두 수직선을 그어 평면 위의 점의 위치를 순서쌍으로
            나타낼 수 있는 평면을 <strong>좌표평면</strong>이라 합니다.
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              가로 수직선: <strong>x축</strong> (가로축)
            </li>
            <li>
              세로 수직선: <strong>y축</strong> (세로축)
            </li>
            <li>
              두 축의 교점: <strong>원점</strong> <InlineMath math="O(0, 0)" />
            </li>
          </ul>
        </SubSection>

        <SubSection title="(3) 사분면">
          <p>좌표평면은 x축과 y축에 의해 네 부분으로 나뉩니다.</p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4">
            <ul className="space-y-1">
              <li>
                제1사분면: <InlineMath math="x > 0, \; y > 0" /> — 예: <InlineMath math="(2, 3)" />
              </li>
              <li>
                제2사분면: <InlineMath math="x < 0, \; y > 0" /> — 예: <InlineMath math="(-1, 4)" />
              </li>
              <li>
                제3사분면: <InlineMath math="x < 0, \; y < 0" /> — 예: <InlineMath math="(-3, -2)" />
              </li>
              <li>
                제4사분면: <InlineMath math="x > 0, \; y < 0" /> — 예: <InlineMath math="(5, -1)" />
              </li>
            </ul>
          </div>
          <div className="mt-3 rounded-lg bg-accent-light p-4 text-sm">
            <strong>참고:</strong> x축 또는 y축 위의 점은 어떤 사분면에도 속하지
            않습니다.
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 그래프의 해석">
        <SubSection title="(1) 그래프의 뜻">
          <p>
            순서쌍 <InlineMath math="(x, y)" />에 대응하는 점을 좌표평면 위에
            나타낸 것을 <strong>그래프</strong>라고 합니다.
          </p>
          <p className="mt-2">
            예: <InlineMath math="y = x + 1" />에서 몇 가지 순서쌍을 구하면
          </p>
          <div className="mt-2 rounded-lg border border-sidebar-border p-4">
            <table className="w-full text-center text-sm">
              <thead>
                <tr className="border-b border-sidebar-border">
                  <td className="py-1 font-medium"><InlineMath math="x" /></td>
                  <td className="py-1">-2</td>
                  <td className="py-1">-1</td>
                  <td className="py-1">0</td>
                  <td className="py-1">1</td>
                  <td className="py-1">2</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1 font-medium"><InlineMath math="y" /></td>
                  <td className="py-1">-1</td>
                  <td className="py-1">0</td>
                  <td className="py-1">1</td>
                  <td className="py-1">2</td>
                  <td className="py-1">3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="(2) 그래프 해석의 핵심">
          <ul className="list-disc pl-6 space-y-1">
            <li>그래프가 오른쪽 위로 향하면 x가 증가할 때 y도 증가합니다.</li>
            <li>그래프가 오른쪽 아래로 향하면 x가 증가할 때 y는 감소합니다.</li>
            <li>그래프가 수평이면 y의 값이 변하지 않습니다.</li>
          </ul>
        </SubSection>
      </CalcBox>

      <CalcBox title="3. 정비례와 반비례">
        <SubSection title="(1) 정비례">
          <p>
            <InlineMath math="y" />가 <InlineMath math="x" />에{" "}
            <strong>정비례</strong>한다는 것은 다음과 같은 관계를 뜻합니다.
          </p>
          <BlockMath math="y = ax \quad (a \neq 0)" />
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              그래프는 <strong>원점을 지나는 직선</strong>입니다.
            </li>
            <li>
              <InlineMath math="a > 0" />이면 오른쪽 위로,{" "}
              <InlineMath math="a < 0" />이면 오른쪽 아래로 향합니다.
            </li>
            <li>
              <InlineMath math="|a|" />가 클수록 y축에 가깝게 서 있습니다.
            </li>
          </ul>
          <div className="mt-3">
            <p>예:</p>
            <BlockMath math="y = 2x \quad \rightarrow \quad (1, 2),\; (2, 4),\; (-1, -2)" />
          </div>
        </SubSection>

        <SubSection title="(2) 반비례">
          <p>
            <InlineMath math="y" />가 <InlineMath math="x" />에{" "}
            <strong>반비례</strong>한다는 것은 다음과 같은 관계를 뜻합니다.
          </p>
          <BlockMath math="y = \frac{a}{x} \quad (a \neq 0)" />
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              그래프는 원점에 대해 대칭인 <strong>쌍곡선</strong>입니다.
            </li>
            <li>
              <InlineMath math="a > 0" />이면 제1·3사분면,{" "}
              <InlineMath math="a < 0" />이면 제2·4사분면을 지납니다.
            </li>
            <li>
              그래프는 x축, y축과 만나지 않습니다.
            </li>
          </ul>
          <div className="mt-3">
            <p>예:</p>
            <BlockMath math="y = \frac{6}{x} \quad \rightarrow \quad (1, 6),\; (2, 3),\; (3, 2),\; (6, 1)" />
          </div>
        </SubSection>

        <SubSection title="(3) 정비례·반비례 관계식 구하기">
          <p>
            한 점의 좌표를 알면 비례상수 <InlineMath math="a" />를 구할 수
            있습니다.
          </p>
          <div className="mt-2 rounded-lg border border-sidebar-border p-4 space-y-3">
            <p>
              점 <InlineMath math="(3, 12)" />를 지나는 정비례 관계식:
            </p>
            <BlockMath math="12 = a \times 3 \;\Rightarrow\; a = 4 \;\Rightarrow\; y = 4x" />
            <p>
              점 <InlineMath math="(2, 5)" />를 지나는 반비례 관계식:
            </p>
            <BlockMath math="5 = \frac{a}{2} \;\Rightarrow\; a = 10 \;\Rightarrow\; y = \frac{10}{x}" />
          </div>
        </SubSection>

        <Insight>
          정비례 <InlineMath math="y = ax" />에서 <InlineMath math="x" />가 2배,
          3배가 되면 <InlineMath math="y" />도 2배, 3배가 됩니다. 반비례{" "}
          <InlineMath math="y = \frac{a}{x}" />에서는{" "}
          <InlineMath math="x" />가 2배가 되면 <InlineMath math="y" />는{" "}
          <InlineMath math="\frac{1}{2}" />배가 됩니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
