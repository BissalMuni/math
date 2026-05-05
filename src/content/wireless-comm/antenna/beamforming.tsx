"use client";

import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 빔포밍과 위상 배열 */
export default function BeamformingContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        5G 기지국이 특정 방향으로만 전파를 집중해서 쏘는 빔포밍 기술과,
        그 핵심인 위상 배열 안테나를 다룹니다.
      </p>

      <CalcBox title="1. 빔포밍이란">
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 mb-3">
          <pre>{`기존 방식 (전방향)
기지국 ))))))))))))
       사방으로 퍼짐 → 에너지 분산

빔포밍
기지국 ────────→ 📱
       특정 방향 집중 → 에너지 강함`}</pre>
        </div>
        <SubSection title="(1) 비유">
          <div className="text-sm space-y-1">
            <p>• 전방향 = 전구 (방 전체를 희미하게 밝힘)</p>
            <p>• 빔포밍 = 레이저 포인터 (한 점만 강하게 비춤)</p>
          </div>
        </SubSection>
        <Insight>
          좁게 조준 = 에너지 집중 = 더 강하게 도달.
          손전등보다 레이저가 멀리 가는 것과 같은 원리입니다.
        </Insight>
      </CalcBox>

      <CalcBox title="2. 폰 위치를 어떻게 아나">
        <SubSection title="(1) 폰이 먼저 신호를 보냄">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`1. 폰이 기지국으로 약한 신호 송신
2. 기지국이 신호 도착 방향 감지
3. 기지국이 그 방향으로 빔 조준
4. 폰 위치 바뀌면 1번부터 반복`}</pre>
          </div>
        </SubSection>
        <SubSection title="(2) 방향 감지 원리">
          <p className="text-sm mb-2">
            안테나 배열의 각 안테나에 신호가 도달하는 시간차로 계산합니다.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`         📱
        /
기지국 안테나 배열
[1][2][3][4][5]

폰이 왼쪽에 있으면
1번에 신호가 가장 먼저 도착
5번에 가장 늦게 도착
→ 시간차로 각도 계산`}</pre>
          </div>
          <p className="text-sm text-muted mt-2">
            눈 감고 소리 들을 때 양쪽 귀에 도달하는 시간차로 방향을 아는 것과 같은 원리입니다.
            기지국은 안테나가 수백 개라서 훨씬 정밀합니다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="3. 보강간섭 — 빔포밍의 핵심">
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 mb-3">
          <pre>{`안테나 여러 개가 위상 맞춰서 동시에 쏘면

→ → → → →   (다 같은 방향)
합쳐져서 강해짐  ← 보강간섭

→ ← → ← →   (엇박자)
서로 상쇄됨      ← 상쇄간섭`}</pre>
        </div>
        <p className="text-sm">
          원하는 방향만 보강, 나머지는 상쇄시켜서 빔을 만듭니다.
          각 안테나 소자의 위상을 미세하게 조절하면 빔 방향을 실시간으로 바꿀 수 있습니다.
        </p>
      </CalcBox>

      <CalcBox title="4. 기지국 안테나 구조">
        <SubSection title="(1) 3면 120° 배치">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 mb-2">
            <pre>{`         앞 (120°)
        /────────\\
       /    📡    \\
      /             \\
왼쪽 ←     기지국    → 오른쪽
(120°)             (120°)

기지국 삼각형 철탑에 3면으로 안테나판 장착`}</pre>
          </div>
          <p className="text-sm text-muted">
            도시 고층빌딩 옥상에 삼각형으로 3면 안테나판 붙어있는 것이 바로 이것입니다.
          </p>
        </SubSection>
        <SubSection title="(2) 각 면 안에 수백 개 소자">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`한 면 (120° 담당)
┌─────────────┐
│ □□□□□□□□□□ │  ← 안테나 수백개 배열
│ □□□□□□□□□□ │     각각 위상조절 칩 내장
│ □□□□□□□□□□ │
└─────────────┘

이 안에서 위상 조절로
120° 범위 내 어디든 조준`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="5. 옛날 vs 지금 기지국">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left"></th>
                <th className="px-3 py-2 text-left">3G 이전</th>
                <th className="px-3 py-2 text-left">4G/5G</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2 font-medium">안테나 내부</td><td className="px-3 py-2">평평한 판</td><td className="px-3 py-2">수백 개 소자 배열</td></tr>
              <tr><td className="px-3 py-2 font-medium">방향</td><td className="px-3 py-2">전방향 그냥 뿌림</td><td className="px-3 py-2">빔포밍 정밀 조준</td></tr>
              <tr><td className="px-3 py-2 font-medium">가격</td><td className="px-3 py-2">저렴</td><td className="px-3 py-2">고가 (정밀 하드웨어)</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted mt-3">
          5G 기지국이 비싼 이유는 단순 안테나가 아니라
          수백 개 소자 + 각각 위상조절 칩 + 실시간 계산이 들어간 정밀 하드웨어이기 때문입니다.
        </p>
      </CalcBox>
    </div>
  );
}
