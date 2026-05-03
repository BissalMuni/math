"use client";

import { CalcBox, Insight } from "@/components/content/shared";

/** 3-1. 왜 필요한가 */
function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="text-sm list-disc list-inside space-y-1 text-muted">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

export default function WhyPositionContent() {
  return (
    <article className="prose-like max-w-3xl">
      <p className="text-muted mb-8">
        트랜스포머는 모든 토큰을 <strong>동시에</strong> 처리합니다 — RNN처럼 순서대로 읽지 않습니다.
        그래서 "나는 사과를 좋아한다"와 "사과를 나는 좋아한다"를 구분할 수 없습니다.
        위치 정보를 임베딩에 더해 이 문제를 해결합니다.
      </p>

      {/* 1 */}
      <CalcBox title="1. Positional Encoding이 필요한 이유">
        <div className="text-sm space-y-3">
          <div className="flex gap-3 items-stretch">
            <div className="bg-red-100 dark:bg-red-950 rounded-lg p-3 flex-1">
              <div className="font-semibold text-red-700 dark:text-red-300 mb-1">RNN</div>
              <div className="text-muted">토큰 1 → 토큰 2 → 토큰 3 (순차)</div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-950 rounded-lg p-3 flex-1">
              <div className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Transformer</div>
              <div className="text-muted">모든 토큰을 동시에 처리 (병렬)</div>
            </div>
          </div>
          <Bullets items={[
            "Transformer는 단어를 동시에 처리한다",
            "그래서 순서 정보가 전혀 없다",
            "위치를 숫자(벡터)로 만들어 임베딩에 더해줘야 한다",
          ]} />
        </div>
      </CalcBox>

      {/* 2 */}
      <CalcBox title="2. 비트 플래그와 비교">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-3">
          <div className="rounded-lg border border-sidebar-border bg-sidebar-bg p-3">
            <div className="font-semibold mb-1">비트 플래그</div>
            <div className="text-muted font-mono">[0, 1, 1, 0] — 0/1만 사용</div>
            <div className="text-muted">2⁴=16개 조합으로 16개 상태 구분</div>
          </div>
          <div className="rounded-lg border border-sidebar-border bg-sidebar-bg p-3">
            <div className="font-semibold mb-1">Positional Encoding</div>
            <div className="text-muted font-mono">[0.84, 0.54, 0.01, 1.00]</div>
            <div className="text-muted">각 차원이 −1 ~ 1 연속값</div>
          </div>
        </div>
        <Bullets items={[
          "비트 플래그 = 0 또는 1 (이산)",
          "PE = −1 ~ 1 사이의 연속값",
          "둘 다 독립적인 채널의 조합으로 고유값을 만든다는 원리는 같음",
          "차원이 섞여 있어도 각 채널은 독립적으로 구분 가능",
        ]} />
      </CalcBox>

      {/* 3 */}
      <CalcBox title="3. 주행거리계 비유">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-3">
          <div className="rounded-lg border border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950 p-3">
            <div className="font-semibold text-red-700 dark:text-red-300 mb-1">시계 (부적절)</div>
            <div className="text-muted">12시간마다 같은 자리로 돌아옴 → 위치가 고유하지 않다</div>
          </div>
          <div className="rounded-lg border border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950 p-3">
            <div className="font-semibold text-green-700 dark:text-green-300 mb-1">주행거리계 (적합)</div>
            <div className="text-muted">자리수마다 회전 주기가 달라 조합이 절대 겹치지 않음</div>
          </div>
        </div>
        <Bullets items={[
          "시계는 12시간마다 반복되어 위치를 고유하게 표현하지 못함",
          "주행거리계는 자리수마다 주기가 10배씩 차이 → 조합이 겹치지 않음",
          "PE도 차원마다 주기가 극단적으로 달라(1 vs 100 vs 10000…) 위치 조합이 고유함",
        ]} />
      </CalcBox>

      {/* 4 */}
      <CalcBox title="4. 크기 순서로 정렬되나? (벡터 거리 개념)">
        <Bullets items={[
          "각 차원의 값 크기는 들쭉날쭉 — 단순 정렬되지 않음",
          "가까운 위치(pos=2 ↔ pos=3) → 벡터가 비슷함",
          "먼 위치(pos=0 ↔ pos=10) → 벡터가 많이 다름",
          "트랜스포머는 값 크기가 아니라 패턴 유사도(내적)로 순서를 파악",
        ]} />
      </CalcBox>

      <Insight>
        <strong>핵심:</strong> 트랜스포머는 모든 토큰을 동시에 처리해 순서를 알 수 없다.
        위치 인코딩은 각 위치에 고유한 벡터를 부여해 이 문제를 해결한다.
      </Insight>
    </article>
  );
}
