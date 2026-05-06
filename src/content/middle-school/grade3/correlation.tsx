import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중3 > Ⅵ. 통계 > 2. 상관관계 */
export default function Correlation() {
  return (
    <div className="space-y-8">
      <CalcBox title="■ 산점도">
        <SubSection title="● 산점도의 뜻">
          <p>
            두 변량 <InlineMath math="x" />, <InlineMath math="y" />의 순서쌍{" "}
            <InlineMath math="(x, y)" />를 좌표평면 위에 점으로 나타낸 그래프를{" "}
            <strong>산점도</strong>(scatter plot)라고 합니다.
          </p>
          <p className="mt-2">
            산점도를 통해 두 변량 사이의 관계를 시각적으로 파악할 수 있습니다.
          </p>
        </SubSection>

        <SubSection title="● 산점도 그리기">
          <p>산점도를 그리는 순서:</p>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>① 가로축과 세로축에 각각의 변량을 정한다.</li>
            <li>② 눈금의 크기와 범위를 적절히 정한다.</li>
            <li>③ 각 자료의 순서쌍을 좌표평면 위에 점으로 찍는다.</li>
          </ul>
        </SubSection>

        <SubSection title="● 산점도 읽기">
          <div className="rounded-lg border border-sidebar-border p-4 text-sm space-y-2">
            <p>
              예: 학생 5명의 키(cm)와 몸무게(kg)
            </p>
            <p>
              <InlineMath math="(155, 48)" />, <InlineMath math="(160, 52)" />,{" "}
              <InlineMath math="(165, 55)" />, <InlineMath math="(170, 62)" />,{" "}
              <InlineMath math="(175, 68)" />
            </p>
            <p className="mt-1">
              → 키가 클수록 몸무게가 증가하는 경향을 확인할 수 있습니다.
            </p>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 상관관계">
        <SubSection title="● 양의 상관관계">
          <p>
            한 변량이 증가할 때 다른 변량도 <strong>증가하는 경향</strong>이
            있으면 두 변량 사이에 <strong>양의 상관관계</strong>가 있다고 합니다.
          </p>
          <p className="mt-2">
            산점도에서 점들이 <strong>오른쪽 위</strong>로 향하는 형태입니다.
          </p>
          <p className="mt-2 text-sm text-muted">
            예: 키와 몸무게, 공부 시간과 성적
          </p>
        </SubSection>

        <SubSection title="● 음의 상관관계">
          <p>
            한 변량이 증가할 때 다른 변량이 <strong>감소하는 경향</strong>이
            있으면 두 변량 사이에 <strong>음의 상관관계</strong>가 있다고 합니다.
          </p>
          <p className="mt-2">
            산점도에서 점들이 <strong>오른쪽 아래</strong>로 향하는 형태입니다.
          </p>
          <p className="mt-2 text-sm text-muted">
            예: 운동 시간과 체지방률, 자동차 연식과 가격
          </p>
        </SubSection>

        <SubSection title="● 상관관계가 없는 경우">
          <p>
            한 변량이 변해도 다른 변량이 증가하거나 감소하는 경향이{" "}
            <strong>뚜렷하지 않으면</strong> 상관관계가 없다고 합니다.
          </p>
          <p className="mt-2">
            산점도에서 점들이 불규칙하게 흩어져 있는 형태입니다.
          </p>
          <p className="mt-2 text-sm text-muted">
            예: 키와 성적, 신발 크기와 수학 점수
          </p>
        </SubSection>

        <Insight>
          상관관계는 두 변량 사이의 경향을 나타낼 뿐, 인과관계를 의미하지는
          않습니다. &ldquo;아이스크림 판매량과 익사 사고&rdquo;처럼 제3의 요인(여름
          더위)이 원인인 경우도 있습니다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ 상관관계의 강도">
        <SubSection title="● 상관관계의 강약">
          <p>
            산점도에서 점들이 일직선에 가까울수록 상관관계가{" "}
            <strong>강하다</strong>고 하고, 흩어져 있을수록{" "}
            <strong>약하다</strong>고 합니다.
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>강한 양의 상관관계: 점들이 오른쪽 위로 밀집</li>
            <li>약한 양의 상관관계: 오른쪽 위 경향은 있으나 흩어짐</li>
            <li>강한 음의 상관관계: 점들이 오른쪽 아래로 밀집</li>
            <li>상관관계 없음: 특별한 경향 없이 흩어짐</li>
          </ul>
        </SubSection>

        <SubSection title="● 상관표">
          <p>
            두 변량의 자료를 도수분포표 형태로 정리한 표를{" "}
            <strong>상관표</strong>라고 합니다. 상관표에서 대각선 방향으로
            도수가 집중되면 상관관계가 있음을 알 수 있습니다.
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>왼쪽 위 → 오른쪽 아래 대각선: 양의 상관관계</li>
            <li>오른쪽 위 → 왼쪽 아래 대각선: 음의 상관관계</li>
          </ul>
        </SubSection>

        <SubSection title="● 상관관계 판단 시 주의점">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>인과관계와 구별</strong>: 상관관계가 있다고 해서 반드시
              원인과 결과 관계가 있는 것은 아닙니다.
            </li>
            <li>
              <strong>자료의 범위</strong>: 자료의 범위가 좁으면 상관관계가
              뚜렷하게 나타나지 않을 수 있습니다.
            </li>
            <li>
              <strong>이상치의 영향</strong>: 극단적인 값이 있으면 상관관계
              판단에 왜곡을 줄 수 있습니다.
            </li>
          </ul>
        </SubSection>
      </CalcBox>
    </div>
  );
}
