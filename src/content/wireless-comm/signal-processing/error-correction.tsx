"use client";

import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅲ. 오류 정정과 표준화 */
export default function ErrorCorrectionContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        무선 환경에서는 비트가 깨질 수 있습니다. 오류 정정 기술과 이를 규정하는 표���화 기관을 다룹니다.
      </p>

      <CalcBox title="■ 왜 오류 정정�� 필요한가">
        <p className="text-sm mb-3">
          무선 환경에서 전파는 장애물 반사, 간섭, 감쇠 등을 겪습니다.
          수신기가 진폭·위상을 잘못 판독하면 비트가 틀어집니다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
          <pre>{`1024QAM — 점 1024개가 빽빽
→ 신호 조금만 흔들려도
→ 옆 점으로 오인
→ 오류 발생

고차 QAM일수록 오류 정정이 더 중요`}</pre>
        </div>
      </CalcBox>

      <CalcBox title="■ 오류 정정의 원리">
        <SubSection title="● 기본 아이디어 — 여분 비트 추가">
          <p className="text-sm mb-2">
            실제 데이터에 추가 비트(패리티)를 붙여서,
            수신 측이 오류를 감지하고 복원할 수 있게 합니다.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`보낼 데이터: 1010
인코딩 후:   1010 110  ← 뒤의 3비트가 오류 정정용

전송 중 깨짐: 1110 110  (첫째 비트 오류)
수신기가 계산: "첫째 비트가 틀렸구나" → 1010 복원`}</pre>
          </div>
        </SubSection>
        <SubSection title="● 5G에서 사용하는 코드">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">채널</th>
                  <th className="px-3 py-2 text-left">코드</th>
                  <th className="px-3 py-2 text-left">특징</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2">데이터 채널</td><td className="px-3 py-2">LDPC</td><td className="px-3 py-2">대용량 데이터에 효율적</td></tr>
                <tr><td className="px-3 py-2">제어 채널</td><td className="px-3 py-2">Polar Code</td><td className="px-3 py-2">짧은 메시지에 최적</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 표���화 기관">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">��관</th>
                <th className="px-3 py-2 text-left">풀이</th>
                <th className="px-3 py-2 text-left">역할</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2 font-medium">ITU</td><td className="px-3 py-2">국제전기통신연합</td><td className="px-3 py-2">UN 산하, 전 세계 통신 표준 총괄</td></tr>
              <tr><td className="px-3 py-2 font-medium">3GPP</td><td className="px-3 py-2">3세대 파트너십 프로젝트</td><td className="px-3 py-2">3G/4G/5G 이동통신 실질 표준 제정</td></tr>
              <tr><td className="px-3 py-2 font-medium">IEEE</td><td className="px-3 py-2">전기전자공학자협회</td><td className="px-3 py-2">WiFi(802.11) 등</td></tr>
            </tbody>
          </table>
        </div>
      </CalcBox>

      <CalcBox title="■ 표준이 정해지는 과정">
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 mb-3">
          <pre>{`기업들이 기술 제안서 제출
(삼성, 퀄컴, 에릭슨, 화웨이 등)
      ↓
3GPP 위원회에서 토론/투표
      ↓
표준 문서 발행 (TS 38.xxx 등)
      ↓
각 제조사가 그 표준대로 칩 설계
      ↓
한국 삼성폰 ↔ 미국 애플폰 ↔ 중국 화웨이 기지국
제조사가 달라도 같은 표준이라 통신 가능`}</pre>
        </div>
        <Insight>
          QAM 약속표, 오류 정정 방식, 주파수 배치 등 모든 세부사항이
          국제 표준 문서 한 장에 정의됩니다. 전 세계가 이 약속을 따르기에 통신이 됩니다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ 연속에서 분절로">
        <p className="text-sm mb-3">
          무선통신 기술의 역사는 연속(아날로그)에서 분절(디지털)로의 발전 과정입니다.
        </p>
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">영역</th>
                <th className="px-3 py-2 text-left">연속(아날로그)</th>
                <th className="px-3 py-2 text-left">분절(디지털)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2">물리학</td><td className="px-3 py-2">고전물리 (연속)</td><td className="px-3 py-2">양자역학 (불연속)</td></tr>
              <tr><td className="px-3 py-2">소리</td><td className="px-3 py-2">공기 압력 변화</td><td className="px-3 py-2">PCM 샘플링</td></tr>
              <tr><td className="px-3 py-2">통신</td><td className="px-3 py-2">AM/FM (1G)</td><td className="px-3 py-2">QAM (2G~5G)</td></tr>
              <tr><td className="px-3 py-2">문자</td><td className="px-3 py-2">—</td><td className="px-3 py-2">태생이 양자적</td></tr>
            </tbody>
          </table>
        </div>
        <Insight>
          분절할수록 더 정확해지고, 더 전달하기 쉬워지고, 더 복잡한 것을 표현할 수 있습니다.
          그러나 분절은 원래의 연속성을 잃습니다 — 지도는 땅이 아니고, 악보는 음악이 아닙니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
