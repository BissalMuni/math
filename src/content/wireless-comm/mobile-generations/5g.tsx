"use client";

import { InlineMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅲ. 5G — 초고속·초저지연·초연결 */
export default function FiveGContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        5G는 단순히 &ldquo;빠른 4G&rdquo;가 아니라 패러다임 전환입니다.
        초고속·초저지연·초연결 세 축으로 구성됩니다.
      </p>

      <CalcBox title="1. 5G의 세 가지 축">
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold mb-1">① 초고속 (eMBB)</div>
            <p className="text-muted">최대 20Gbps. 영화 1편 다운 ~1초.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold mb-1">② 초저지연 (URLLC)</div>
            <p className="text-muted">1ms 이하. 자율주행차 실시간 판단 가능.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold mb-1">③ 초연결 (mMTC)</div>
            <p className="text-muted">1㎢당 100만 개 기기 동시 접속. IoT·스마트팩토리.</p>
          </div>
        </div>
      </CalcBox>

      <CalcBox title="2. 세대별 비교">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">구분</th>
                <th className="px-3 py-2 text-left">3G</th>
                <th className="px-3 py-2 text-left">4G</th>
                <th className="px-3 py-2 text-left">5G</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2 font-medium">상용화</td><td className="px-3 py-2">2000년대 초</td><td className="px-3 py-2">2010년대 초</td><td className="px-3 py-2">2019년~</td></tr>
              <tr><td className="px-3 py-2 font-medium">최대 속도</td><td className="px-3 py-2">~수십 Mbps</td><td className="px-3 py-2">~1 Gbps</td><td className="px-3 py-2">~20 Gbps</td></tr>
              <tr><td className="px-3 py-2 font-medium">지연시간</td><td className="px-3 py-2">100ms 이상</td><td className="px-3 py-2">30~50ms</td><td className="px-3 py-2">1ms 이하</td></tr>
              <tr><td className="px-3 py-2 font-medium">주요 용도</td><td className="px-3 py-2">음성+모바일 웹</td><td className="px-3 py-2">스트리밍, 영상</td><td className="px-3 py-2">IoT, 자율주행</td></tr>
            </tbody>
          </table>
        </div>
      </CalcBox>

      <CalcBox title="3. 왜 빠른가 — 핵심 기술 조합">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">기술</th>
                <th className="px-3 py-2 text-left">효과</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2">밀리미터파 (mmWave)</td><td className="px-3 py-2">넓은 대역폭 확보</td></tr>
              <tr><td className="px-3 py-2">1024QAM</td><td className="px-3 py-2">심볼당 10비트</td></tr>
              <tr><td className="px-3 py-2">Massive MIMO</td><td className="px-3 py-2">안테나 수백 개 병렬</td></tr>
              <tr><td className="px-3 py-2">빔포밍</td><td className="px-3 py-2">에너지 집중 → 효율 극대화</td></tr>
              <tr><td className="px-3 py-2">OFDM</td><td className="px-3 py-2">주파수 병렬 전송</td></tr>
            </tbody>
          </table>
        </div>
        <Insight>
          주파수 대역폭을 더 넓게 쓰고, 안테나 기술(MIMO)이 발전하고,
          신호 처리 방식이 효율적으로 개선되었기 때문입니다.
        </Insight>
      </CalcBox>

      <CalcBox title="4. 5G의 한계와 현실">
        <SubSection title="(1) 밀리미터파의 단점">
          <div className="text-sm space-y-1">
            <p>• 직진성이 강해 장애물에 약함 (벽, 건물, 비에 감쇠)</p>
            <p>• 기지국을 촘촘하게 세워야 함 → 비용 ↑</p>
            <p>• 전국 커버리지는 아직 4G보다 부족</p>
          </div>
        </SubSection>
        <SubSection title="(2) 5G 변조 자동 선택">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">거리/신호</th>
                  <th className="px-3 py-2 text-left">변조</th>
                  <th className="px-3 py-2 text-left">비트/심볼</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2">기지국 바로 옆</td><td className="px-3 py-2">1024QAM</td><td className="px-3 py-2">10</td></tr>
                <tr><td className="px-3 py-2">가까움</td><td className="px-3 py-2">256QAM</td><td className="px-3 py-2">8</td></tr>
                <tr><td className="px-3 py-2">멀음</td><td className="px-3 py-2">16QAM</td><td className="px-3 py-2">4</td></tr>
                <tr><td className="px-3 py-2">최악</td><td className="px-3 py-2">BPSK</td><td className="px-3 py-2">1</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="5. 이동통신 기술의 발전 흐름">
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
          <pre>{`1940년대  트랜지스터 발명
    ↓
1960년대  집적회로(IC) 발명
    ↓
1980년대  디지털 신호처리 칩
    ↓
1990년대  MIMO 이론 정립
    ↓
2000년대  칩 소형화로 구현 가능
    ↓
2010년대  Massive MIMO 상용화
    ↓
2019년    5G 기지국 출시`}</pre>
        </div>
        <p className="text-sm text-muted mt-3">
          이론은 수십 년 전에 나왔는데 칩 제조 기술이 따라올 때까지 기다린 것입니다.
          아이디어보다 제조 기술이 병목이었습니다.
        </p>
      </CalcBox>
    </div>
  );
}
