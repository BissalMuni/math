"use client";

import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. OFDM과 주파수 병렬 */
export default function OfdmContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        OFDM은 넓은 주파수 대역을 수천 개의 좁은 부반송파로 나눠 동시에 데이터를 보내는 기술입���다.
        4G/5G의 물리 계층 핵심입니다.
      </p>

      <CalcBox title="■ OFDM이란">
        <p className="text-sm mb-2">
          <strong>O</strong>rthogonal <strong>F</strong>requency <strong>D</strong>ivision <strong>M</strong>ultiplexing
          = 직교 주파수 분할 다중화
        </p>
        <SubSection title="● 핵심 아이디어">
          <p className="text-sm mb-2">
            넓은 주파수를 쪼개서 여러 개의 좁은 채널(부반송파)을 만들고,
            각각에 ���이터를 실어 동시에 보냅니���.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`기존: 하나의 넓은 채널로 한 번에 보냄
      ════════════════════════

OFDM: 수천 개 좁은 채널로 동시에 보냄
      ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
      각각이 독립적인 부반송파`}</pre>
          </div>
        </SubSection>
        <SubSection title="● 왜 직교(Orthogonal)인가">
          <p className="text-sm">
            각 부반송파가 서로 간섭 없이 독립적입니다.
            sin과 cos가 직교하는 것처럼, 주파수가 정수배 간격이면 서로 간섭하지 않습니다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ OFDM의 장점">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">장점</th>
                <th className="px-3 py-2 text-left">설명</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2">주파수 효율</td><td className="px-3 py-2">부반송파가 겹치지만 직교라서 간��� 없음</td></tr>
              <tr><td className="px-3 py-2">다중경로 강건성</td><td className="px-3 py-2">건물 반사 등으로 늦게 도착하는 신호에 강함</td></tr>
              <tr><td className="px-3 py-2">적응형 전송</td><td className="px-3 py-2">부반송파마다 다른 변조 가능</td></tr>
            </tbody>
          </table>
        </div>
      </CalcBox>

      <CalcBox title="■ 5G의 시간×주파수 격자">
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 mb-3">
          <pre>{`주파수 ↑
       │ □ □ □ □ □ □ □  ← 부반송파 N
       │ □ □ □ □ □ □ □
       │ □ □ □ □ □ □ □
       │ □ □ □ □ □ □ □
       │ □ □ □ □ □ □ □  ← 부반송파 1
       └──────────────→ 시간
         심볼1  ...  심볼7

각 □ = 1심볼 (진폭+위상 = 최대 10비트)`}</pre>
        </div>
        <p className="text-sm">
          이 2차원 격자에 MIMO(안테나 축)까지 추가하면 3차원 전송이 됩니다.
        </p>
        <Insight>
          OFDM은 푸리에 변환의 실용적 응용입니다.
          복잡한 신호를 주파수 ���분으로 분해하는 수학이 통신의 물리 계층이 된 것입니다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ 일상에서의 OFDM">
        <div className="text-sm space-y-1">
          <p>• 4G LTE — OFDMA (하향링크)</p>
          <p>• 5G NR — OFDM (상·하향 모두)</p>
          <p>• WiFi (802.11a/g/n/ac/ax) — OFDM</p>
          <p>• 디지털 TV (DVB-T) — OFDM</p>
        </div>
        <p className="text-sm text-muted mt-3">
          현대의 거의 모든 무선 통신이 OFDM 기반입니다.
        </p>
      </CalcBox>
    </div>
  );
}
