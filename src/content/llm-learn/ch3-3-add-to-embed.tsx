"use client";

import { Matrix, Arrow, CalcBox, Insight } from "./shared";

/**
 * 예제 설정:
 * 문장: "나는 빨간 사과를 좋아한다" → 4개 토큰
 * d_model = 4
 */

const d_model = 4;

// PE 행렬: 4토큰 × 4차원
const PE: number[][] = [0, 1, 2, 3].map(pos =>
  [0, 1, 2, 3].map(dim => {
    const i = Math.floor(dim / 2);
    const denom = Math.pow(10000, (2 * i) / d_model);
    return dim % 2 === 0 ? Math.sin(pos / denom) : Math.cos(pos / denom);
  })
);

// 임베딩 벡터 (학습된 값 가정)
const X_embed: number[][] = [
  [1.0,  0.0, -1.0,  0.5],  // 나는
  [0.3, -0.4,  0.7,  0.2],  // 빨간
  [0.5,  1.0,  0.0, -0.5],  // 사과를
  [-0.5, 0.5,  1.0,  0.0],  // 좋아한다
];

const X_final: number[][] = X_embed.map((row, i) =>
  row.map((v, j) => v + PE[i][j])
);

/** 작은 불릿 리스트 */
function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="text-sm list-disc list-inside space-y-1 text-muted">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

export default function AddToEmbedContent() {
  return (
    <article className="prose-like max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">3-3. 임베딩에 더하기</h1>
      <p className="text-muted mb-8">
        계산된 위치 인코딩 벡터를 단어 임베딩 벡터에 더합니다.
        이후 학습 과정에서 PE는 고정이지만 단어 벡터는 계속 갱신됩니다.
      </p>

      {/* 1 */}
      <CalcBox title="1. 단어 벡터에 더하기">
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <Matrix data={X_embed} label="X_embed (4×4)" color="orange" />
          <Arrow op="+" />
          <Matrix data={PE} label="PE (4×4)" color="blue" />
          <Arrow op="=" />
          <Matrix data={X_final} label="X_final (4×4)" color="green" />
        </div>
        <Bullets items={[
          "같은 차원끼리 원소별(element-wise) 덧셈",
          "같은 단어라도 위치가 다르면 X_final이 달라짐",
          "한 벡터 안에 의미(임베딩) + 위치(PE)가 동시에 표현됨",
        ]} />
      </CalcBox>

      {/* 2 */}
      <CalcBox title="2. 트랜스포머 블록마다 더하나? (한 번만)">
        <Bullets items={[
          "맨 처음 입력 단계에서 단 한 번만 PE를 더함",
          "그 위치 정보가 attention/FFN 블록을 통과하면서도 유지됨",
          "블록마다 PE를 다시 더하지 않음",
        ]} />
      </CalcBox>

      {/* 3 */}
      <CalcBox title="3. 더하고 학습하고 반복">
        <div className="text-sm mb-3 font-mono bg-sidebar-bg rounded-lg p-3 border border-sidebar-border">
          단어벡터 + PE → 모델 통과 → 오차 계산 → 가중치 수정 &nbsp; (한 세트)
        </div>
        <Bullets items={[
          "이 한 세트(forward + backward)를 수천~수억 번 반복",
          "PE 더하기와 학습은 번갈아 하는 게 아니라 한 세트 안에서 같이 일어남",
          "매 반복마다 PE는 똑같이 더해지고, 그 위에서 학습이 누적됨",
        ]} />
      </CalcBox>

      {/* 4 */}
      <CalcBox title="4. 학습 중 바뀌는 것 vs 안 바뀌는 것">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-3">
          <div className="rounded-lg border border-orange-300 bg-orange-50 dark:border-orange-700 dark:bg-orange-950 p-3">
            <div className="font-semibold text-orange-700 dark:text-orange-300 mb-1">단어 벡터 (임베딩)</div>
            <div className="text-muted">학습 도중 계속 갱신됨</div>
          </div>
          <div className="rounded-lg border border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-950 p-3">
            <div className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Sinusoidal PE</div>
            <div className="text-muted">수식으로 고정 — 절대 안 바뀜</div>
          </div>
        </div>
        <Bullets items={[
          "단어 벡터는 학습으로 계속 바뀌어 의미를 점점 잘 표현하게 됨",
          "PE는 sin/cos 수식으로 고정 — 학습으로 바뀌지 않음",
          "PE는 닻(anchor)처럼 위치 좌표계를 고정시켜주는 역할",
        ]} />
      </CalcBox>

      <Insight>
        <strong>핵심:</strong> PE는 입력 단계에서 단 한 번만 더해진다.
        이후 모든 블록에 위치 정보가 흘러가며, PE 자체는 고정이지만 단어 벡터는 학습으로 계속 갱신된다.
      </Insight>
    </article>
  );
}
