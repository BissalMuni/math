"use client";

import { InlineMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 주파수와 전자기 스펙트럼 */
export default function FrequencySpectrumContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        주파수 단위와 전자기 스펙트럼의 대역별 용도를 정리합니다.
      </p>

      <CalcBox title="1. 주파수 단위">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">약자</th>
                <th className="px-3 py-2 text-left">풀이</th>
                <th className="px-3 py-2 text-left">크기</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2">Hz</td><td className="px-3 py-2">Hertz</td><td className="px-3 py-2">1</td></tr>
              <tr><td className="px-3 py-2">kHz</td><td className="px-3 py-2">kilohertz</td><td className="px-3 py-2">1,000 Hz</td></tr>
              <tr><td className="px-3 py-2">MHz</td><td className="px-3 py-2">megahertz</td><td className="px-3 py-2">1,000,000 Hz</td></tr>
              <tr><td className="px-3 py-2">GHz</td><td className="px-3 py-2">gigahertz</td><td className="px-3 py-2">1,000,000,000 Hz</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted mt-3">
          Hz는 독일 물리학자 헤르츠의 이름에서 유래. 1초에 몇 번 진동하는지를 나타냅니다.
        </p>
      </CalcBox>

      <CalcBox title="2. 전자기 스펙트럼">
        <p className="text-sm mb-3">
          전파·빛·X선 모두 전자기파이며, 주파수에 따라 성질이 달라집니다.
        </p>
        <div className="font-mono text-xs bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
          <pre>{`← 저주파                              고주파 →
← 파장 길다                           파장 짧다 →

라디오  마이크로파  적외선  가시광  자외선  X선  감마선
 AM FM   WiFi 5G    열     빛     일광    의료   핵`}</pre>
        </div>
      </CalcBox>

      <CalcBox title="3. 왜 고주파가 통신에 유리한가">
        <SubSection title="(1) 대역폭이 넓다">
          <p className="text-sm mb-2">
            파장이 짧을수록 한 번에 실어 나를 수 있는 정보량(대역폭)이 많아집니다.
          </p>
          <div className="text-sm space-y-1">
            <p>• 저주파: 1초에 100번 진동 → 100번 변조 기회</p>
            <p>• 고주파: 1초에 10,000번 진동 → 10,000번 변조 기회</p>
          </div>
        </SubSection>
        <SubSection title="(2) 도로 비유">
          <div className="text-sm space-y-1">
            <p>• 저주파 = 왕복 2차선 도로 → 차(데이터)가 조금 지나감</p>
            <p>• 고주파 = 왕복 10차선 고속도로 → 차가 훨씬 많이 지나감</p>
          </div>
        </SubSection>
        <SubSection title="(3) 단점: 직진성">
          <p className="text-sm">
            고주파는 직진성이 강하고 장애물에 약합니다.
            벽, 건물, 비에도 감쇠되어 기지국을 촘촘히 세워야 합니다.
          </p>
        </SubSection>
        <Insight>
          진동 횟수가 많을수록 정보를 실을 기회가 많아지는 것이 핵심입니다.
        </Insight>
      </CalcBox>

      <CalcBox title="4. AM과 FM 라디오 대역">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left"></th>
                <th className="px-3 py-2 text-left">AM 라디오</th>
                <th className="px-3 py-2 text-left">FM 라디오</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2 font-medium">주파수 대역</td><td className="px-3 py-2">530~1600 kHz</td><td className="px-3 py-2">88~108 MHz</td></tr>
              <tr><td className="px-3 py-2 font-medium">파장</td><td className="px-3 py-2">수백 m</td><td className="px-3 py-2">수 m</td></tr>
              <tr><td className="px-3 py-2 font-medium">도달 거리</td><td className="px-3 py-2">수백~수천 km</td><td className="px-3 py-2">수십 km</td></tr>
              <tr><td className="px-3 py-2 font-medium">음질</td><td className="px-3 py-2">낮음</td><td className="px-3 py-2">높음</td></tr>
              <tr><td className="px-3 py-2 font-medium">잡음 강도</td><td className="px-3 py-2">약함</td><td className="px-3 py-2">강함</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted mt-3">
          AM은 저주파라 파장이 길어 지구 곡면을 타고 멀리 갑니다.
          FM은 고주파라 직진성이 강해 산이나 건물에 막히지만 음질이 좋습니다.
        </p>
      </CalcBox>
    </div>
  );
}
