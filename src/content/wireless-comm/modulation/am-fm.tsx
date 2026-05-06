"use client";

import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. AM·FM 변조 */
export default function AmFmContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        변조란 파동의 모양을 바꿔서 정보를 숨기는 것입니다. 가장 기본적인 AM과 FM을 다룹니다.
      </p>

      <CalcBox title="■ 변조란">
        <p className="text-sm mb-3">
          변조(Modulation) = 정보를 전파에 얹는 것
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
          <pre>{`반송파    ────────────────  (아무 정보 없는 빈 트럭)
변조 후   ─╮─╯─╮──╯─╮─    (정보 실은 트럭)`}</pre>
        </div>
        <Insight>
          파동 자체에 정보가 새겨져 있는 게 아닙니다. 파동의 모양(진폭·주파수·위상)을 특정 값으로 약속한 것입니다. 신호등이 빨간색 = 정지인 것과 같은 원리입니다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ AM (Amplitude Modulation) — 진폭 변조">
        <SubSection title="● 원리">
          <p className="text-sm mb-2">
            파동의 높낮이(진폭)를 바꿔서 정보를 담습니다.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`크게 = 1, 작게 = 0

〜‿〜‿〜〜‿〜‿〜
크 작 크크 작 크
1  0  1 1  0  1`}</pre>
          </div>
        </SubSection>
        <SubSection title="● AM은 아날로그">
          <p className="text-sm mb-2">
            소리 자체가 공기 압력의 연속적 파동이고, AM은 그걸 그대로 전파에 얹습니다.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`소리 파형   →  그 모양대로
반송파 진폭을 변형  →  전파로 송신`}</pre>
          </div>
          <p className="text-sm text-muted mt-2">
            소리 파형의 모양 자체를 전파 진폭에 복사하는 것입니다. 디지털 변환 없이 그대로 실어 나릅니다.
          </p>
        </SubSection>
        <SubSection title="● AM 음질이 나쁜 이유">
          <p className="text-sm">
            AM 라디오 전송 대역폭은 약 10kHz입니다. 사람 귀가 듣는 범위(~20kHz)보다 좁아서
            고음역 배음이 잘려 음색이 탁하게 들립니다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ FM (Frequency Modulation) — 주파수 변조">
        <SubSection title="● 원리">
          <p className="text-sm mb-2">
            파동의 빠르기(주파수)를 바꿔서 정보를 담습니다.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`빠르게 = 1, 느리게 = 0

〜〜〜/\\/\\/\\/\\/\\〜〜〜/\\/\\〜〜〜
느림    빠름      느림  중간  느림
 0      1        0          0`}</pre>
          </div>
        </SubSection>
        <SubSection title="● FM이 음질 좋은 이유">
          <p className="text-sm">
            FM은 대역폭이 200kHz로 넓어서 고음역 배음까지 보존됩니다.
            또한 잡음(번개·전기기기)이 주파수가 아닌 진폭을 간섭하기 때문에 FM은 상대적으로 깨끗합니다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ AM → FM 발전사">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">연도</th>
                <th className="px-3 py-2 text-left">사건</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2">1906년</td><td className="px-3 py-2">AM 라디오 방송 시작 (페센든)</td></tr>
              <tr><td className="px-3 py-2">1933년</td><td className="px-3 py-2">FM 방식 발명 (암스트롱)</td></tr>
              <tr><td className="px-3 py-2">1940년대</td><td className="px-3 py-2">FM 상용 방송 시작</td></tr>
              <tr><td className="px-3 py-2">1950~60년대</td><td className="px-3 py-2">FM이 음악 방송 주류로</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted mt-3">
          AM이 먼저 쓰인 이유는 구조가 단순해서(진폭만 바꾸면 됨) 당시 기술로 구현 가능했기 때문입니다.
          FM은 주파수를 정밀하게 실시간으로 바꿔야 해서 회로가 복잡했습니다.
        </p>
      </CalcBox>

      <CalcBox title="■ 약자 정리">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">약자</th>
                <th className="px-3 py-2 text-left">풀이</th>
                <th className="px-3 py-2 text-left">뜻</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2">AM</td><td className="px-3 py-2">Amplitude Modulation</td><td className="px-3 py-2">진폭 변조</td></tr>
              <tr><td className="px-3 py-2">FM</td><td className="px-3 py-2">Frequency Modulation</td><td className="px-3 py-2">주파수 변조</td></tr>
              <tr><td className="px-3 py-2">Mbps</td><td className="px-3 py-2">Megabits per second</td><td className="px-3 py-2">초당 메가비트</td></tr>
              <tr><td className="px-3 py-2">Gbps</td><td className="px-3 py-2">Gigabits per second</td><td className="px-3 py-2">초당 기가비트</td></tr>
            </tbody>
          </table>
        </div>
      </CalcBox>
    </div>
  );
}
