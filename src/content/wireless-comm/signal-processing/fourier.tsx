"use client";

import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 푸리에 변환과 음색 */
export default function FourierContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        어떤 복잡한 파형도 단순한 sin 파동들의 합으로 분해할 수 있습��다.
        이것이 음색의 비밀이자 현대 통신의 수학적 기초입니다.
      </p>

      <CalcBox title="■ 푸리에 변환이란">
        <p className="text-sm mb-3">
          복잡한 파형을 단순한 sin/cos ���동들의 합으로 분해하는 수학 도구입니다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
          <pre>{`복잡한 소리파형
〜∿〜∿〜∿〜
    =
440Hz  /\\/\\/\\        (기본음)
+ 880Hz /\\/\\/\\/\\/\\   (2배음)
+ 1320Hz /\\/\\/\\/\\/\\/\\ (3배음)
+ ...`}</pre>
        </div>
      </CalcBox>

      <CalcBox title="■ 음색은 주파수 조합의 지문">
        <SubSection title="● 악기마다 배음 구성이 다름">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`플루트   기본음 ████░░░░░░
         배음   █░░░░░░░░░  → 맑고 단순

바이올린 기본음 ████░░░░░░
         배음   ████░░░░░░  → 풍부하고 복잡

클라리넷 기��음 ████░░░░░░
         배음   ██████████  → 날카롭고 강렬`}</pre>
          </div>
        </SubSection>
        <SubSection title="● 시간 변화도 음색의 일부 — ADSR">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">단계</th>
                  <th className="px-3 py-2 text-left">이름</th>
                  <th className="px-3 py-2 text-left">설명</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2">A</td><td className="px-3 py-2">Attack</td><td className="px-3 py-2">치는 순간 빠르게 커짐</td></tr>
                <tr><td className="px-3 py-2">D</td><td className="px-3 py-2">Decay</td><td className="px-3 py-2">최고점에서 약간 줄어듦</td></tr>
                <tr><td className="px-3 py-2">S</td><td className="px-3 py-2">Sustain</td><td className="px-3 py-2">누르는 동안 유지</td></tr>
                <tr><td className="px-3 py-2">R</td><td className="px-3 py-2">Release</td><td className="px-3 py-2">떼는 순간 사라짐</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-2">
            같은 주파수 조합이라도 ADSR이 다르면 다른 악기처럼 들립니다.
          </p>
        </SubSection>
        <Insight>
          음색 = 주파수 조��(재료) + 시간에 따른 변화(요리법)
        </Insight>
      </CalcBox>

      <CalcBox title="■ 통신에서의 푸리에 변환">
        <p className="text-sm mb-3">
          푸리에 변환은 음색 분석뿐 아니라 현대 통신(OFDM)의 핵심 수학입니다.
        </p>
        <div className="text-sm space-y-2">
          <p>• ���잡한 신호를 주파��� 성분으로 분해</p>
          <p>• 각 주파수에 독립적으로 데이터를 실을 수 있음</p>
          <p>• 이것이 OFDM(주파수 분할 다중화)의 원리</p>
        </div>
      </CalcBox>

      <CalcBox title="■ 철학적 관점">
        <p className="text-sm mb-3">
          ��리에 변환은 자연이 주파수로 이루어진 게 아니라,
          인간이 복잡한 파형을 이해하기 쉽게 분해하는 도구입니다.
        </p>
        <div className="text-sm space-y-1 text-muted">
          <p>• 자연: 그냥 압력이 출렁일 뿐</p>
          <p>• 인간: 그걸 주파수 성분으로 분해해서 이해</p>
          <p>• 통신: 분해한 주파수에 각각 데이터를 실어 보냄</p>
        </div>
        <Insight>
          인간의 인식 자체가 연속적 자연을 분절해서 이해하는 행위입니다.
          도가도 비상도(道可道 非常道) — 이름 붙일 수 있으면 이미 영원한 이름이 아닙니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
