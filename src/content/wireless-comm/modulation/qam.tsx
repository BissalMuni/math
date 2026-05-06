"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅲ. QAM과 심볼 */
export default function QamContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        현대 통신(4G/5G)의 핵심 변조 방식 QAM을 다룹니다.
        진폭과 위상을 동시에 바꿔 파동 한 번에 여러 비트를 담습니다.
      </p>

      <CalcBox title="■ QAM이란">
        <SubSection title="● 약자 풀이">
          <div className="text-sm space-y-1">
            <p>• Q = Quadrature (직교) — sin과 cos 두 채널</p>
            <p>• A = Amplitude (진폭) — 높낮이를 단계적으로</p>
            <p>• M = Modulation (변조)</p>
          </div>
          <p className="text-sm text-muted mt-2">
            직교하는 두 파동에 각각 진폭 변조해서 동시에 보내는 것입니다.
          </p>
        </SubSection>
        <SubSection title="● AM + PM 동시">
          <p className="text-sm">
            진폭도 바꾸고 + 위상도 바꾸고 → 한 번에 더 많은 정보를 담습니다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 심볼(Symbol)이란">
        <p className="text-sm mb-3">
          <strong>심볼 = 파동 한 번의 상태 = 진폭 + 위상 조합 하나 = 비트 묶음 하나</strong>
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 mb-3">
          <pre>{`비트  =  글자 하나 (ㄱ, ㄴ, ㄷ...)
심볼  =  단어 하나 (여러 글자 묶음)

한 번 말할 때
글자 하나씩 말하면 느림
단어 하나씩 말하면 빠름`}</pre>
        </div>
        <Insight>
          1초에 전송 가능한 심볼 수는 정해져 있으므로,
          심볼 하나에 비트를 많이 담을수록 빠른 통신이 됩니다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ 16QAM 약속표">
        <p className="text-sm mb-3">
          4비트 = <InlineMath math="2^4" /> = 16가지 경우의 수. 각 조합에 파동 하나가 예약됩니다.
        </p>
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full text-center">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2"></th>
                <th className="px-3 py-2">0°</th>
                <th className="px-3 py-2">90°</th>
                <th className="px-3 py-2">180°</th>
                <th className="px-3 py-2">270°</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border font-mono text-xs">
              <tr><td className="px-3 py-2 font-semibold bg-sidebar-bg">진폭1</td><td className="px-3 py-2">0000</td><td className="px-3 py-2">0001</td><td className="px-3 py-2">0010</td><td className="px-3 py-2">0011</td></tr>
              <tr><td className="px-3 py-2 font-semibold bg-sidebar-bg">진폭2</td><td className="px-3 py-2">0100</td><td className="px-3 py-2">0101</td><td className="px-3 py-2">0110</td><td className="px-3 py-2">0111</td></tr>
              <tr><td className="px-3 py-2 font-semibold bg-sidebar-bg">진폭3</td><td className="px-3 py-2">1000</td><td className="px-3 py-2">1001</td><td className="px-3 py-2">1010</td><td className="px-3 py-2">1011</td></tr>
              <tr><td className="px-3 py-2 font-semibold bg-sidebar-bg">진폭4</td><td className="px-3 py-2">1100</td><td className="px-3 py-2">1101</td><td className="px-3 py-2">1110</td><td className="px-3 py-2">1111</td></tr>
            </tbody>
          </table>
        </div>
      </CalcBox>

      <CalcBox title="■ QAM 단계별 비교">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">방식</th>
                <th className="px-3 py-2 text-left">조합 수</th>
                <th className="px-3 py-2 text-left">비트/심볼</th>
                <th className="px-3 py-2 text-left">용도</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2">BPSK</td><td className="px-3 py-2">2</td><td className="px-3 py-2">1</td><td className="px-3 py-2">최악 환경</td></tr>
              <tr><td className="px-3 py-2">QPSK</td><td className="px-3 py-2">4</td><td className="px-3 py-2">2</td><td className="px-3 py-2">아주 멀음</td></tr>
              <tr><td className="px-3 py-2">16QAM</td><td className="px-3 py-2">16</td><td className="px-3 py-2">4</td><td className="px-3 py-2">멀음</td></tr>
              <tr><td className="px-3 py-2">64QAM</td><td className="px-3 py-2">64</td><td className="px-3 py-2">6</td><td className="px-3 py-2">중간</td></tr>
              <tr><td className="px-3 py-2">256QAM</td><td className="px-3 py-2">256</td><td className="px-3 py-2">8</td><td className="px-3 py-2">가까움</td></tr>
              <tr><td className="px-3 py-2 font-bold">1024QAM</td><td className="px-3 py-2">1024</td><td className="px-3 py-2">10</td><td className="px-3 py-2">5G 최고</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted mt-3">
          1024 = <InlineMath math="2^{10}" /> → 10비트/심볼. 폰이 기지국과의 신호 품질에 따라
          자동으로 변조 방식을 선택합니다(적응형 변조).
        </p>
      </CalcBox>

      <CalcBox title="■ 3GPP 표준 문서">
        <p className="text-sm mb-2">
          파형에 할당된 비트는 3GPP(3세대 파트너십 프로젝트)가 정합니다.
        </p>
        <div className="text-sm space-y-1">
          <p>• <strong>문서:</strong> 3GPP TS 38.211 &ldquo;5G NR; Physical channels and modulation&rdquo;</p>
          <p>• <strong>섹션 5.1.7:</strong> 1024QAM — 10비트 → 복소수 심볼 매핑 수식</p>
        </div>
        <p className="text-sm text-muted mt-2">
          전 세계 퀄컴, 삼성, 화웨이 칩이 이 문서 하나를 기준으로 만들어집니다.
        </p>
      </CalcBox>
    </div>
  );
}
