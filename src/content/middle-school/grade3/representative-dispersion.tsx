import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중3 > Ⅵ. 통계 > 1. 대푯값과 산포도 */
export default function RepresentativeDispersion() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 대푯값">
        <SubSection title="(1) 평균">
          <p>
            자료의 <strong>평균</strong>은 모든 변량의 합을 변량의 개수로
            나눈 값입니다.
          </p>
          <BlockMath math="\bar{x} = \frac{x_1 + x_2 + \cdots + x_n}{n}" />
          <div className="mt-3 rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">
              예: 자료 3, 5, 7, 8, 7의 평균
            </p>
            <BlockMath math="\bar{x} = \frac{3 + 5 + 7 + 8 + 7}{5} = \frac{30}{5} = 6" />
          </div>
        </SubSection>

        <SubSection title="(2) 중앙값 (중위수)">
          <p>
            자료를 크기순으로 나열했을 때 <strong>한가운데</strong>에 오는
            값입니다.
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>
              자료의 개수가 홀수: 가운데 값
            </li>
            <li>
              자료의 개수가 짝수: 가운데 두 값의 평균
            </li>
          </ul>
          <div className="mt-3 space-y-2">
            <p>
              예: 3, 5, 7, 7, 8 → 중앙값 = <strong>7</strong>
            </p>
            <p>
              예: 2, 4, 6, 8 → 중앙값 ={" "}
              <InlineMath math="\dfrac{4 + 6}{2} = 5" />
            </p>
          </div>
        </SubSection>

        <SubSection title="(3) 최빈값">
          <p>
            자료에서 <strong>가장 많이 나타나는</strong> 값을{" "}
            <strong>최빈값</strong>이라고 합니다.
          </p>
          <p className="mt-2">
            예: 3, 5, 7, 7, 8에서 7이 2번으로 가장 많으므로 최빈값 ={" "}
            <strong>7</strong>
          </p>
          <div className="mt-3 rounded-lg bg-accent-light p-4 text-sm">
            <strong>참고:</strong> 최빈값은 두 개 이상일 수도 있고, 모든 값이
            한 번씩만 나오면 최빈값이 없을 수도 있습니다.
          </div>
        </SubSection>

        <Insight>
          극단적인 값(이상치)이 있을 때 평균은 크게 영향을 받지만, 중앙값과
          최빈값은 거의 변하지 않습니다. 자료의 특성에 따라 적절한 대푯값을
          선택해야 합니다.
        </Insight>
      </CalcBox>

      <CalcBox title="2. 산포도">
        <SubSection title="(1) 산포도의 뜻">
          <p>
            자료가 대푯값(평균) 주위에 얼마나 퍼져 있는지를 나타내는 값을{" "}
            <strong>산포도</strong>라고 합니다. 산포도가 작을수록 자료가 평균
            주위에 밀집해 있습니다.
          </p>
        </SubSection>

        <SubSection title="(2) 편차">
          <p>
            각 변량에서 평균을 뺀 값을 <strong>편차</strong>라고 합니다.
          </p>
          <BlockMath math="\text{편차} = x_i - \bar{x}" />
          <div className="mt-3 rounded-lg bg-accent-light p-4 text-sm">
            <strong>중요:</strong> 편차의 합은 항상 0입니다.
            <BlockMath math="\sum_{i=1}^{n}(x_i - \bar{x}) = 0" />
          </div>
        </SubSection>

        <SubSection title="(3) 분산">
          <p>
            편차의 제곱의 평균을 <strong>분산</strong>이라고 합니다.
          </p>
          <BlockMath math="V = \frac{(x_1 - \bar{x})^2 + (x_2 - \bar{x})^2 + \cdots + (x_n - \bar{x})^2}{n}" />
          <p className="mt-2">간단히 쓰면:</p>
          <BlockMath math="V = \frac{1}{n}\sum_{i=1}^{n}(x_i - \bar{x})^2" />
        </SubSection>

        <SubSection title="(4) 표준편차">
          <p>
            분산의 양의 제곱근을 <strong>표준편차</strong>라고 합니다.
          </p>
          <BlockMath math="\sigma = \sqrt{V}" />
          <p className="mt-2">
            표준편차는 원래 자료와 같은 단위를 가지므로 해석이 편리합니다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="3. 분산과 표준편차의 계산">
        <SubSection title="(1) 계산 예시">
          <div className="rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">
              자료: 2, 4, 6, 8, 10의 분산과 표준편차
            </p>
            <p>
              평균: <InlineMath math="\bar{x} = \dfrac{2+4+6+8+10}{5} = 6" />
            </p>
            <div className="mt-2 space-y-1 text-sm">
              <p>편차: -4, -2, 0, 2, 4</p>
              <p>편차의 제곱: 16, 4, 0, 4, 16</p>
            </div>
            <BlockMath math="V = \frac{16+4+0+4+16}{5} = \frac{40}{5} = 8" />
            <BlockMath math="\sigma = \sqrt{8} = 2\sqrt{2} \approx 2.83" />
          </div>
        </SubSection>

        <SubSection title="(2) 분산의 간편 공식">
          <p>
            분산은 다음과 같이 간편하게 계산할 수도 있습니다.
          </p>
          <BlockMath math="V = \overline{x^2} - (\bar{x})^2" />
          <p className="mt-2 text-sm text-muted">
            (제곱의 평균) - (평균의 제곱)
          </p>
        </SubSection>

        <SubSection title="(3) 산포도의 비교">
          <p>
            두 자료의 흩어진 정도를 비교할 때는 표준편차를 비교합니다.
            표준편차가 작은 자료가 더 균일합니다.
          </p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4 text-sm space-y-2">
            <p>A반 수학 점수 표준편차: 5.2점 → 점수가 비교적 균일</p>
            <p>B반 수학 점수 표준편차: 12.8점 → 점수가 넓게 분포</p>
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
