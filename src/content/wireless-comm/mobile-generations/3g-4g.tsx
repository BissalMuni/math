"use client";

import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 3G·4G — 모바일 인터넷 */
export default function ThreeGFourGContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        3G로 모바일 인터넷이 시작되고, 4G/LTE로 스트리밍이 자연스러워진 시대입니다.
      </p>

      <CalcBox title="1. 3G — 모바일 인터넷의 시작 (2000년대 초)">
        <SubSection title="(1) 특징">
          <div className="text-sm space-y-1">
            <p>• 처음으로 &ldquo;진짜 모바일 인터넷&rdquo; 가능</p>
            <p>• 스마트폰 초기 시대 (아이폰 초기 모델)</p>
            <p>• 영상통화, 모바일 웹 브라우징 가능해짐</p>
            <p>• 최대 속도 ~수십 Mbps</p>
            <p>• 지연시간 100ms 이상</p>
          </div>
        </SubSection>
        <SubSection title="(2) 한계">
          <p className="text-sm">
            속도가 느려서 동영상 스트리밍은 버벅였습니다.
            유튜브를 모바일로 보기 어려운 시대였습니다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 4G/LTE — 스트리밍 시대 (2010년대 초)">
        <SubSection title="(1) LTE란">
          <p className="text-sm mb-2">
            <strong>L</strong>ong <strong>T</strong>erm <strong>E</strong>volution = 장기 진화.
            4G의 대표적인 기술 규격 이름입니다.
          </p>
        </SubSection>
        <SubSection title="(2) 특징">
          <div className="text-sm space-y-1">
            <p>• 유튜브·넷플릭스 모바일 스트리밍이 자연스러워진 세대</p>
            <p>• 속도가 3G 대비 10~50배 빨라짐</p>
            <p>• 최대 속도 ~1 Gbps</p>
            <p>• 지연시간 30~50ms</p>
            <p>• 현재 가장 널리 쓰이는 표준</p>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="3. 3G → 4G 발전 요인">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">기술</th>
                <th className="px-3 py-2 text-left">역할</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2">OFDM</td><td className="px-3 py-2">여러 주파수를 동시에 사용 (주파수 병렬)</td></tr>
              <tr><td className="px-3 py-2">MIMO</td><td className="px-3 py-2">안테나 여러 개로 동시 전송</td></tr>
              <tr><td className="px-3 py-2">고차 QAM</td><td className="px-3 py-2">심볼당 더 많은 비트 (64QAM→256QAM)</td></tr>
              <tr><td className="px-3 py-2">넓은 대역폭</td><td className="px-3 py-2">더 높은 주파수 대역 활용</td></tr>
            </tbody>
          </table>
        </div>
        <Insight>
          하나의 혁신이 아니라 여러 기술의 조합이 세대 도약을 만듭니다.
        </Insight>
      </CalcBox>

      <CalcBox title="4. 적응형 변조 (Adaptive Modulation)">
        <p className="text-sm mb-3">
          폰과 기지국이 실시간으로 신호 품질을 측정하여 변조 방식을 자동 선택합니다.
        </p>
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">신호 품질</th>
                <th className="px-3 py-2 text-left">변조</th>
                <th className="px-3 py-2 text-left">비트/심볼</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2">좋음 (가까움)</td><td className="px-3 py-2">256QAM</td><td className="px-3 py-2">8</td></tr>
              <tr><td className="px-3 py-2">중간</td><td className="px-3 py-2">64QAM</td><td className="px-3 py-2">6</td></tr>
              <tr><td className="px-3 py-2">나쁨 (멀음)</td><td className="px-3 py-2">16QAM</td><td className="px-3 py-2">4</td></tr>
              <tr><td className="px-3 py-2">최악</td><td className="px-3 py-2">QPSK</td><td className="px-3 py-2">2</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted mt-3">
          같은 주파수라도 변조 방식이 바뀌면 속도가 4배 차이 납니다.
          위치마다 LTE 속도가 다른 이유입니다.
        </p>
      </CalcBox>
    </div>
  );
}
