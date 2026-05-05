"use client";

import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 1G·2G — 아날로그에서 디지털로 */
export default function OneGTwoGContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        1G(아날로그 음성) → 2G(디지털 음성+문자)로의 전환은 이동통신 역사에서 가장 큰 도약이었습니다.
      </p>

      <CalcBox title="1. 1G — 아날로그 이동통신 (1980년대)">
        <SubSection title="(1) 특징">
          <div className="text-sm space-y-1">
            <p>• 완전 아날로그 — AM/FM 변조 그대로 사용, 0과 1 없음</p>
            <p>• 음성통화만 가능, 문자·인터넷 불가</p>
            <p>• 보안 없음 — 옆에서 같은 주파수 수신기로 남의 통화를 들을 수 있었음</p>
            <p>• 잡음 심함 — AM 방식이라 번개·간섭에 약함</p>
          </div>
        </SubSection>
        <SubSection title="(2) 한국 1G">
          <div className="text-sm space-y-1">
            <p>• 1984년 한국 1G 서비스 시작 (AMPS 방식, 미국 규격)</p>
            <p>• 단말기 가격 수백만 원, 통화료 분당 수백 원</p>
            <p>• 차량용 전화 / 벽돌만한 휴대용</p>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. 2G — 디지털 이동통신 (1990년대)">
        <SubSection title="(1) 아날로그 → 디지털의 핵심 변화">
          <div className="text-sm space-y-1">
            <p>• 소리를 0과 1로 변환 후 전송</p>
            <p>• 암호화 가능 → 도청 방지</p>
            <p>• 문자(SMS) 탄생 — 비트 전송이 가능해졌으므로</p>
            <p>• 잡음 줄어듦</p>
            <p>• 전 세계 표준 통일 (GSM)</p>
          </div>
        </SubSection>
        <SubSection title="(2) 단말기">
          <p className="text-sm">
            삼성 애니콜 벽돌폰(SCH-100 등) → 폴더폰 전성기로 이어짐
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="3. 왜 문자가 소리보다 늦게 가능했나">
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 mb-3">
          <pre>{`소리 전송 (1G)
→ 아날로그 그대로 얹으면 됨
→ 별도 변환 없음, 기술적으로 단순

문자 전송 (2G)
→ 문자를 비트로 변환해야 함
→ 비트를 파동에 정확히 얹어야 함
→ 디지털 변조 + 오류 정정 + 표준 통일 필요`}</pre>
        </div>
        <Insight>
          문자는 태생이 양자(量子)적 — A는 A, B는 B, 중간이 없습니다.
          아날로그로 직접 표현할 방법이 없어 디지털 인프라가 먼저 갖춰져야 했습니다.
        </Insight>
      </CalcBox>

      <CalcBox title="4. 세대별 단말기">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">세대</th>
                <th className="px-3 py-2 text-left">시기</th>
                <th className="px-3 py-2 text-left">단말기</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2">1G</td><td className="px-3 py-2">1984~</td><td className="px-3 py-2">카폰/차량용 전화</td></tr>
              <tr><td className="px-3 py-2">2G 초기</td><td className="px-3 py-2">1996~</td><td className="px-3 py-2">삼성 애니콜 벽돌폰</td></tr>
              <tr><td className="px-3 py-2">2G 후반</td><td className="px-3 py-2">2000~</td><td className="px-3 py-2">폴더폰 전성기</td></tr>
              <tr><td className="px-3 py-2">3G</td><td className="px-3 py-2">2003~</td><td className="px-3 py-2">바폰/슬라이드폰</td></tr>
              <tr><td className="px-3 py-2">4G</td><td className="px-3 py-2">2011~</td><td className="px-3 py-2">스마트폰 전성기</td></tr>
              <tr><td className="px-3 py-2">5G</td><td className="px-3 py-2">2019~</td><td className="px-3 py-2">현재</td></tr>
            </tbody>
          </table>
        </div>
      </CalcBox>
    </div>
  );
}
