import { CalcBox, Insight } from "@/components/content/shared";

/** 서막 0-1: 왜 LLM인가 */
export default function WhyLlmContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        대규모 언어 모델(Large Language Model)이 왜 중요한지,
        이 가이드에서 무엇을 배우게 되는지 큰 그림을 그립니다.
      </p>

      {/* ── LLM이란 ── */}
      <CalcBox title="LLM이란 무엇인가">
        <p className="text-sm mb-3">
          LLM은 수십억 개의 파라미터를 가진 신경망으로,
          방대한 텍스트를 학습해 <strong>다음에 올 단어를 예측</strong>하는 모델입니다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 mb-3">
          <div className="text-muted">입력: &quot;오늘 날씨가 정말&quot;</div>
          <div className="text-accent font-bold">→ 예측: &quot;좋다&quot; (확률 72%)</div>
        </div>
        <p className="text-sm text-muted">
          ChatGPT, Claude, Gemini 등이 모두 이 구조입니다.
          단순한 &ldquo;다음 단어 예측&rdquo;이 대화, 번역, 코딩, 추론까지 가능하게 합니다.
        </p>
      </CalcBox>

      {/* ── 왜 지금인가 ── */}
      <CalcBox title="왜 지금 LLM이 폭발적으로 성장했나">
        <div className="space-y-3 text-sm">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-lg border border-sidebar-border p-3">
              <div className="font-semibold mb-1">① 데이터</div>
              <p className="text-muted">인터넷의 수조 단어가 학습 데이터로 사용 가능해짐.</p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3">
              <div className="font-semibold mb-1">② 컴퓨팅</div>
              <p className="text-muted">GPU/TPU 발전으로 수천억 파라미터 학습이 현실적으로 가능.</p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3">
              <div className="font-semibold mb-1">③ 트랜스포머</div>
              <p className="text-muted">2017년 등장한 트랜스포머 구조가 병렬 처리에 최적화.</p>
            </div>
          </div>
        </div>
        <Insight>
          이 세 요소가 동시에 갖춰진 2020년대부터 LLM이 실용화되었습니다.
        </Insight>
      </CalcBox>

      {/* ── 이 가이드에서 배울 것 ── */}
      <CalcBox title="이 가이드에서 배울 것">
        <p className="text-sm mb-4">
          트랜스포머 기반 LLM이 텍스트를 처리하는 전체 과정을 단계별로 따라갑니다.
        </p>
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <div className="bg-accent-light px-4 py-2 font-semibold">학습 로드맵</div>
          <div className="divide-y divide-sidebar-border">
            {[
              ["0. 서막", "LLM·신경망·파라미터·행렬 기초 개념"],
              ["1. 토큰화", "텍스트를 숫자 조각으로 쪼개기"],
              ["2. 임베딩", "숫자 ID를 의미 벡터로 변환"],
              ["3. 위치 인코딩", "단어 순서 정보 주입"],
              ["4~6. 어텐션", "단어 간 관계 계산 (핵심!)"],
              ["7~9. 트랜스포머 블록", "잔차연결, 정규화, FFN"],
              ["10. 출력", "다음 토큰 확률 생성"],
              ["11~13. 학습", "역전파, 옵티마이저, 구조 비교"],
            ].map(([step, desc]) => (
              <div key={step} className="flex px-4 py-2 gap-4">
                <span className="font-mono text-accent w-28 shrink-0">{step}</span>
                <span className="text-muted">{desc}</span>
              </div>
            ))}
          </div>
        </div>
        <Insight>
          수학을 두려워할 필요 없습니다. 각 단계마다 실제 숫자 예제로 계산 과정을 보여줍니다.
        </Insight>
      </CalcBox>

      {/* ── LLM이 바꾸는 것들 ── */}
      <CalcBox title="LLM이 바꾸는 것들">
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            ["코딩", "자연어로 설명하면 코드를 생성"],
            ["교육", "1:1 맞춤 튜터링"],
            ["의료", "논문 분석, 진단 보조"],
            ["법률", "판례 검색, 문서 초안"],
            ["창작", "글쓰기, 번역, 요약"],
            ["과학", "가설 생성, 데이터 분석"],
          ].map(([field, desc]) => (
            <div key={field} className="rounded-lg border border-sidebar-border p-3">
              <span className="font-semibold">{field}</span>
              <span className="text-muted ml-2">{desc}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted mt-4">
          이 모든 것이 &ldquo;다음 단어 예측&rdquo; 하나의 원리에서 나옵니다.
          그 원리를 이해하는 것이 이 가이드의 목표입니다.
        </p>
      </CalcBox>
    </div>
  );
}
