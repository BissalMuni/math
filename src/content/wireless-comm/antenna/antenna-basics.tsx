"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 안테나 원리와 공진 */
export default function AntennaBasicsContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        안테나 길이와 주파수는 반비례합니다. 공진 원리와 반파장/쿼터파장 안테나를 다룹니다.
      </p>

      <CalcBox title="■ 안테나 길이와 주파수">
        <BlockMath math="\text{안테나 길이} = \frac{\lambda}{4} = \frac{c}{4f}" />
        <p className="text-sm text-muted mt-3">
          주파수 ↑ → 파장 ↓ → 안테나 ↓
        </p>
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm mt-4">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">대역</th>
                <th className="px-3 py-2 text-left">주파수</th>
                <th className="px-3 py-2 text-left">파장</th>
                <th className="px-3 py-2 text-left">안테나 길이</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2">AM 라디오</td><td className="px-3 py-2">1 MHz</td><td className="px-3 py-2">300m</td><td className="px-3 py-2">75m</td></tr>
              <tr><td className="px-3 py-2">FM 라디오</td><td className="px-3 py-2">100 MHz</td><td className="px-3 py-2">3m</td><td className="px-3 py-2">75cm</td></tr>
              <tr><td className="px-3 py-2">4G LTE</td><td className="px-3 py-2">1.8 GHz</td><td className="px-3 py-2">17cm</td><td className="px-3 py-2">4cm</td></tr>
              <tr><td className="px-3 py-2">5G mmWave</td><td className="px-3 py-2">28 GHz</td><td className="px-3 py-2">1cm</td><td className="px-3 py-2">2.5mm</td></tr>
            </tbody>
          </table>
        </div>
      </CalcBox>

      <CalcBox title="■ 공진이란">
        <p className="text-sm mb-3">
          안테나가 파장의 1/4일 때 공진이 일어나서 전파를 가장 효율적으로 송수신합니다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 mb-3">
          <pre>{`파동이 안테나 끝에서 반사되어
올라오는 파와 내려오는 파가
딱 맞아떨어지는 길이 = λ/4`}</pre>
        </div>
        <p className="text-sm text-muted">
          기타 줄도 특정 길이일 때 특정 음이 잘 울리는 것과 같은 원리입니다.
        </p>
        <Insight>
          공진이 안 맞으면(예: λ/8) 반사파와 입사파가 엇박자로 서로 상쇄되어 효율이 떨어집니다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ 반파장 안테나 (Half-wave dipole)">
        <SubSection title="● 구조">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`      급전점
  ↑       ↑
λ/4     λ/4
위쪽     아래쪽

전체 길이 = λ/2`}</pre>
          </div>
          <p className="text-sm text-muted mt-2">
            두 개의 λ/4 막대를 반대 방향으로 붙인 형태입니다.
          </p>
        </SubSection>
        <SubSection title="● 비교">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left"></th>
                  <th className="px-3 py-2 text-left">쿼터파장(λ/4)</th>
                  <th className="px-3 py-2 text-left">반파장(λ/2)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">구조</td><td className="px-3 py-2">막대 1개 + 땅(거울)</td><td className="px-3 py-2">막대 2개</td></tr>
                <tr><td className="px-3 py-2 font-medium">땅 필요</td><td className="px-3 py-2">필요</td><td className="px-3 py-2">불필요</td></tr>
                <tr><td className="px-3 py-2 font-medium">용도</td><td className="px-3 py-2">AM 송신탑, 차 안테나</td><td className="px-3 py-2">TV 안테나, 다이폴</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 땅이 거울 역할">
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 mb-3">
          <pre>{`실제 안테나   75m  (땅 위)
──────────────────  땅 (거울)
가상 안테나   75m  (땅 아래 반사)
합치면 150m = 파장/2 로 작동`}</pre>
        </div>
        <p className="text-sm mb-2">
          그래서 땅에 세운 75m 안테나는 실질적으로 반파장 안테나가 됩니다.
          AM 송신탑 주변에 접지선을 땅속에 방사형으로 매설해 거울 효과를 극대화합니다.
        </p>
      </CalcBox>

      <CalcBox title="■ 과거 방송국 철탑이 높았던 이유">
        <SubSection title="● 파장이 워낙 길어서">
          <p className="text-sm">
            AM 1MHz → 파장 300m → 안테나 이상적 길이 75m.
            공진 효율을 높이려면 안테나 자체가 길어야 했습니다.
          </p>
        </SubSection>
        <SubSection title="● 높이 올릴수록 멀리 퍼짐">
          <p className="text-sm">
            지구가 둥그니까 높이 올릴수록 지평선 너머까지 전파가 닿습니다.
            에펠탑(324m), 도쿄타워(333m), 남산타워(236m) 모두 방송 송신이 핵심 목적이었습니다.
          </p>
        </SubSection>
        <SubSection title="● 지금은 왜 작아졌나">
          <p className="text-sm">
            FM·디지털·5G로 올수록 주파수가 높아져서 안테나가 작아지고,
            대신 기지국을 촘촘하게 많이 세우는 방식으로 바뀌었습니다.
          </p>
        </SubSection>
      </CalcBox>
    </div>
  );
}
