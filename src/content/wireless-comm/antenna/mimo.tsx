"use client";

import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅲ. MIMO와 병렬 전송 */
export default function MimoContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        MIMO(Multiple Input Multiple Output)는 안테나 여러 개로 동시에 다른 데이터를 송수신하는 기술입니다.
        현대 기술의 핵심 — 병렬 처리를 다룹니다.
      </p>

      <CalcBox title="■ MIMO란">
        <p className="text-sm mb-2">
          <strong>M</strong>ultiple <strong>I</strong>nput <strong>M</strong>ultiple <strong>O</strong>utput = 다중 입출력
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
          <pre>{`안테나 1개   →  데이터 1차선
안테나 4개   →  데이터 4차선 동시
안테나 16개  →  데이터 16차선 동시`}</pre>
        </div>
        <p className="text-sm text-muted mt-3">
          속도가 안테나 수에 비례해서 올라갑니다.
        </p>
      </CalcBox>

      <CalcBox title="■ 5G Massive MIMO">
        <SubSection title="● 규모">
          <div className="text-sm space-y-1">
            <p>• 기지국 쪽: 안테나 수백 개</p>
            <p>• 스마트폰: 안테나 수십 개</p>
          </div>
        </SubSection>
        <SubSection title="● 스마트폰 안의 안테나">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`스마트폰 안 5G 안테나 배열

[ ][ ][ ][ ]
[ ][ ][ ][ ]   ← 수mm짜리 안테나들
[ ][ ][ ][ ]      촘촘히 배열`}</pre>
          </div>
          <p className="text-sm text-muted mt-2">
            밀리미터파(mmWave)라서 안테나가 작아져 스마트폰 안에 수십 개를 넣는 게 가능합니다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 5G의 3차원 병렬">
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 mb-3">
          <pre>{`시간 축     심볼1  심볼2  심볼3 ... (직렬)

주파수 축   ──  ──  ──  ──  ← 주파수3
            ──  ──  ──  ──  ← 주파수2  (OFDM 병렬)
            ──  ──  ──  ──  ← 주파수1

안테나 축   안테나1  ──  ──  ──
            안테나2  ──  ──  ──  (MIMO 병렬)
            안테나3  ──  ──  ──`}</pre>
        </div>
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">축</th>
                <th className="px-3 py-2 text-left">기술</th>
                <th className="px-3 py-2 text-left">방식</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2">시간</td><td className="px-3 py-2">심볼 직렬</td><td className="px-3 py-2">10비트씩 연속 전송</td></tr>
              <tr><td className="px-3 py-2">주파수</td><td className="px-3 py-2">OFDM 병렬</td><td className="px-3 py-2">여러 주파수 동시 사용</td></tr>
              <tr><td className="px-3 py-2">안테나</td><td className="px-3 py-2">MIMO 병렬</td><td className="px-3 py-2">안테나마다 다른 데이터</td></tr>
            </tbody>
          </table>
        </div>
        <Insight>
          세 방향으로 동시에 쏟아붓는 구조. 이것이 5G 속도의 비밀입니다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ 병렬은 현대 기술의 핵심">
        <p className="text-sm mb-3">
          단일 성능 향상에는 한계가 있어, 여러 개를 동시에 하는 병렬로 해결합니다.
        </p>
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">분야</th>
                <th className="px-3 py-2 text-left">병렬 방식</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2">5G</td><td className="px-3 py-2">시간 × 주파수 × 안테나 병렬</td></tr>
              <tr><td className="px-3 py-2">GPU</td><td className="px-3 py-2">수천 개 코어 병렬</td></tr>
              <tr><td className="px-3 py-2">CPU</td><td className="px-3 py-2">멀티코어 병렬</td></tr>
              <tr><td className="px-3 py-2">SSD</td><td className="px-3 py-2">낸드플래시 병렬 읽기/쓰기</td></tr>
              <tr><td className="px-3 py-2">뇌</td><td className="px-3 py-2">뉴런 860억 개 병렬</td></tr>
            </tbody>
          </table>
        </div>
        <Insight>
          자연은 원래 병렬입니다. 인간이 직렬(순서/논리)로 이해하려 했고,
          기술이 발전할수록 다시 병렬로 돌아가고 있습니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
