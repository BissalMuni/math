import { CalcBox, Insight, Matrix, Arrow } from "./shared";

/** 서막 0-2: 신경망이란 */
export default function NeuralNetContent() {
  // 간단한 뉴런 계산 예시
  const inputs = [0.5, 0.8];
  const weights = [0.6, 0.4];
  const bias = 0.1;
  const weighted = inputs.map((x, i) => x * weights[i]);
  const sum = weighted.reduce((a, b) => a + b, 0) + bias;
  const output = Math.max(0, sum); // ReLU

  return (
    <article className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">0-2. 신경망이란</h1>
      <p className="text-muted mb-8">
        LLM의 기반인 인공 신경망의 핵심 아이디어를 이해합니다.
        복잡해 보이지만 기본 단위는 <strong>곱하고 더하는 것</strong>뿐입니다.
      </p>

      {/* ── 뉴런 = 곱하고 더하기 ── */}
      <CalcBox title="뉴런 하나 = 곱하고 더하기">
        <p className="text-sm mb-4">
          인공 뉴런은 입력값에 가중치(weight)를 곱하고, 편향(bias)을 더한 뒤,
          활성화 함수를 통과시킵니다.
        </p>
        <div className="space-y-2 text-sm font-mono bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
          <div>입력: [{inputs.join(", ")}]</div>
          <div>가중치: [{weights.join(", ")}]</div>
          <div>편향: {bias}</div>
          <div className="border-t border-sidebar-border pt-2 mt-2">
            가중합 = ({inputs[0]}×{weights[0]}) + ({inputs[1]}×{weights[1]}) + {bias}
          </div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = {weighted[0].toFixed(2)} + {weighted[1].toFixed(2)} + {bias} = {sum.toFixed(2)}</div>
          <div>ReLU({sum.toFixed(2)}) = <strong>{output.toFixed(2)}</strong></div>
        </div>
        <Insight>
          신경망의 모든 연산은 이 &ldquo;곱하고 더하기&rdquo;의 반복입니다.
          LLM의 수십억 파라미터도 결국 이 가중치와 편향의 모음입니다.
        </Insight>
      </CalcBox>

      {/* ── 층을 쌓는다 ── */}
      <CalcBox title="층(Layer)을 쌓으면 신경망">
        <p className="text-sm mb-4">
          뉴런을 여러 개 나란히 놓으면 <strong>층(layer)</strong>,
          층을 여러 개 쌓으면 <strong>신경망(neural network)</strong>입니다.
        </p>
        <div className="font-mono text-xs text-center text-muted bg-sidebar-bg border border-sidebar-border rounded-lg p-4 space-y-1">
          <div>[입력층] → [은닉층 1] → [은닉층 2] → ... → [출력층]</div>
          <div className="text-accent pt-2">&ldquo;깊게&rdquo; 쌓을수록 = Deep Learning</div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 text-sm mt-4">
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold mb-1">입력층</div>
            <p className="text-muted">데이터를 받는 층 (토큰 임베딩 등)</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold mb-1">은닉층</div>
            <p className="text-muted">패턴을 학습하는 층 (트랜스포머 블록)</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold mb-1">출력층</div>
            <p className="text-muted">결과를 내놓는 층 (다음 토큰 확률)</p>
          </div>
        </div>
      </CalcBox>

      {/* ── 학습 = 가중치 조정 ── */}
      <CalcBox title="학습 = 가중치 조정">
        <p className="text-sm mb-3">
          처음에 가중치는 무작위입니다. 학습이란 <strong>정답과의 차이(손실)를 줄이는 방향으로
          가중치를 조금씩 조정</strong>하는 과정입니다.
        </p>
        <div className="font-mono text-xs text-muted bg-sidebar-bg border border-sidebar-border rounded-lg p-4 space-y-1">
          <div>1. 입력 → 예측 출력 (순전파)</div>
          <div>2. 정답과 비교 → 손실(Loss) 계산</div>
          <div>3. 손실을 줄이는 방향 계산 (역전파)</div>
          <div>4. 가중치 업데이트</div>
          <div>5. 1~4를 수억 번 반복</div>
        </div>
        <Insight>
          GPT-4는 이 과정을 수조 개의 토큰에 대해 반복해서 만들어졌습니다.
          수학적 원리는 11장(역전파)에서 자세히 다룹니다.
        </Insight>
      </CalcBox>

      {/* ── LLM에서의 신경망 ── */}
      <CalcBox title="LLM 속 신경망 = 트랜스포머">
        <p className="text-sm mb-3">
          LLM이 사용하는 신경망 구조를 <strong>트랜스포머(Transformer)</strong>라고 합니다.
          일반 신경망과 다른 핵심은 <strong>어텐션(Attention)</strong> 메커니즘입니다.
        </p>
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <div className="divide-y divide-sidebar-border">
            {[
              ["일반 신경망", "입력을 순서대로 처리 (느림)"],
              ["트랜스포머", "모든 위치를 동시에 비교 (병렬, 빠름)"],
            ].map(([name, desc]) => (
              <div key={name} className="flex px-4 py-2 gap-4">
                <span className="font-semibold w-28 shrink-0">{name}</span>
                <span className="text-muted">{desc}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-muted mt-3">
          이 가이드의 4~9장이 트랜스포머 블록 내부를 단계별로 해부합니다.
        </p>
      </CalcBox>
    </article>
  );
}
