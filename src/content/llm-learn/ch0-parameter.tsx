import { CalcBox, Insight, Matrix } from "@/components/content/shared";

/** 서막 0-3: 파라미터란 */
export default function ParameterContent() {
  // GPT 모델별 파라미터 수
  const models = [
    ["GPT-2", "1.5억", "2019"],
    ["GPT-3", "1,750억", "2020"],
    ["GPT-4", "~1.8조 (추정)", "2023"],
    ["Llama 3", "700억", "2024"],
    ["Claude 3.5", "비공개", "2024"],
  ];

  return (
    <article className="max-w-3xl">
      <p className="text-muted mb-8">
        &ldquo;GPT-4는 1조 8천억 개의 파라미터를 가지고 있다&rdquo; —
        이 파라미터가 정확히 무엇인지 이해합니다.
      </p>

      {/* ── 파라미터 = 가중치 + 편향 ── */}
      <CalcBox title="파라미터 = 학습으로 결정되는 숫자">
        <p className="text-sm mb-4">
          신경망에서 파라미터는 <strong>가중치(weight)</strong>와 <strong>편향(bias)</strong>을 합친 것입니다.
          학습 과정에서 자동으로 조정되는 모든 숫자를 파라미터라고 부릅니다.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold mb-1">가중치 (Weight)</div>
            <p className="text-muted">입력에 곱해지는 숫자. 뉴런 간 연결 강도.</p>
            <div className="font-mono text-xs mt-2 text-muted">예: 0.73, -0.12, 1.45 ...</div>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold mb-1">편향 (Bias)</div>
            <p className="text-muted">가중합에 더해지는 숫자. 기준점 조정.</p>
            <div className="font-mono text-xs mt-2 text-muted">예: 0.05, -0.30 ...</div>
          </div>
        </div>
        <Insight>
          &ldquo;175B 파라미터&rdquo;는 이런 숫자가 1,750억 개라는 뜻입니다.
          각 숫자는 보통 16비트(2바이트)로 저장됩니다.
        </Insight>
      </CalcBox>

      {/* ── 구체적 예시 ── */}
      <CalcBox title="파라미터가 실제로 하는 일">
        <p className="text-sm mb-4">
          임베딩 테이블만 봐도 파라미터 수를 쉽게 계산할 수 있습니다:
        </p>
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <div className="bg-accent-light px-4 py-2 font-semibold">임베딩 테이블의 파라미터 수</div>
          <div className="divide-y divide-sidebar-border">
            {[
              ["어휘 크기 (V)", "100,000개 토큰"],
              ["임베딩 차원 (d)", "512"],
              ["파라미터 수", "V × d = 51,200,000개"],
              ["메모리", "약 97MB (FP16 기준)"],
            ].map(([label, value]) => (
              <div key={label} className="flex px-4 py-2 gap-4">
                <span className="font-mono text-accent w-40 shrink-0">{label}</span>
                <span className="text-muted">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-muted mt-3">
          그리고 이건 임베딩 테이블 <em>하나</em>의 파라미터입니다.
          트랜스포머 블록 안에는 어텐션 가중치, FFN 가중치 등이 수십 층 쌓여 있습니다.
        </p>
      </CalcBox>

      {/* ── 모델별 비교 ── */}
      <CalcBox title="모델별 파라미터 수 비교">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-accent-light">
              <tr>
                <th className="text-left px-4 py-2 font-medium">모델</th>
                <th className="text-left px-4 py-2 font-medium">파라미터 수</th>
                <th className="text-left px-4 py-2 font-medium">출시</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border text-muted">
              {models.map(([name, params, year]) => (
                <tr key={name}>
                  <td className="px-4 py-2 font-medium text-foreground">{name}</td>
                  <td className="px-4 py-2 font-mono">{params}</td>
                  <td className="px-4 py-2">{year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CalcBox>

      {/* ── 파라미터 많으면 좋은가 ── */}
      <CalcBox title="파라미터가 많으면 무조건 좋은가?">
        <div className="space-y-3 text-sm">
          <div className="rounded-lg border border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950 p-3">
            <div className="font-semibold text-green-700 dark:text-green-300 mb-1">장점</div>
            <p className="text-muted">더 복잡한 패턴을 학습할 수 있음. 더 다양한 지식 저장 가능.</p>
          </div>
          <div className="rounded-lg border border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950 p-3">
            <div className="font-semibold text-red-700 dark:text-red-300 mb-1">단점</div>
            <p className="text-muted">더 많은 학습 데이터·시간·비용 필요. 추론 속도 느림. 과적합 위험.</p>
          </div>
        </div>
        <Insight>
          최근 연구는 파라미터 수보다 <strong>학습 데이터의 양과 질</strong>이 더 중요하다고 밝히고 있습니다
          (Chinchilla 논문, 2022). 작은 모델도 좋은 데이터로 잘 학습하면 큰 모델을 이길 수 있습니다.
        </Insight>
      </CalcBox>
    </article>
  );
}
