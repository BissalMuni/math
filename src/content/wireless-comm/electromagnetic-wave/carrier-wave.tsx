"use client";

import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅲ. 반송파와 변조 원리 */
export default function CarrierWaveContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        무선통신의 핵심 구조: 반송파에 정보를 얹어(변조) 공중으로 보내고, 받는 쪽에서 떼어내는(복조) 원리입니다.
      </p>

      <CalcBox title="■ 반송파(Carrier wave)란">
        <SubSection title="● 한자 풀이">
          <div className="text-sm space-y-1">
            <p>• 搬(반) = 옮기다, 나르다</p>
            <p>• 送(송) = 보내다</p>
            <p>• 반송파 = <strong>실어 나르는 파동</strong></p>
          </div>
          <p className="text-sm text-muted mt-2">
            영어로는 Carrier wave. 택배 트럭과 같습니다.
          </p>
        </SubSection>
        <SubSection title="● 왜 반송파가 필요한가">
          <p className="text-sm mb-2">
            소리 파동(20Hz~20kHz)을 그대로 공중에 쏘려면 안테나 길이가 수 km 필요합니다.
            수백 kHz~MHz 대역 반송파에 얹으면 안테나가 수십 cm로 줄어듭니다.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`소리 파동 = 화물
반송파    = 트럭

화물만으론 스스로 못 달림
트럭에 실어야 도로(공중)를 달릴 수 있음`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 무선통신의 전체 흐름">
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
          <pre>{`보내는 쪽
────────────────────────────
소리/데이터
    ↓
전기신호로 변환
    ↓
고주파 반송파에 얹음 (변조)
    ↓
안테나로 공중에 쏨
────── 공중 ─────────────────
    ↓
받는 쪽 안테나가 잡음
    ↓
반송파 제거 (복조)
    ↓
소리/데이터 복원
────────────────────────────`}</pre>
        </div>
        <Insight>
          무선통신의 핵심은 딱 3줄: ① 전기신호는 공중에 못 날아감 ② 고주파 전파에 얹으면 날아감 ③ 받는 쪽에서 다시 떼어내면 끝
        </Insight>
      </CalcBox>

      <CalcBox title="■ 변조기와 복조기">
        <SubSection title="● 이름">
          <div className="text-sm space-y-1">
            <p>• Modulator (모듈레이터) = 변조기 → 정보를 파동에 얹음 (송신측)</p>
            <p>• Demodulator (디모듈레이터) = 복조기 → 파동에서 정보를 꺼냄 (수신측)</p>
          </div>
        </SubSection>
        <SubSection title="● 모뎀(Modem)">
          <p className="text-sm mb-2">
            <strong>Mo</strong>dulator + <strong>Dem</strong>odulator = Modem
          </p>
          <p className="text-sm text-muted">
            옛날 인터넷 연결할 때 삐리리릭 소리가 나던 그 장치입니다.
            현대 스마트폰의 베이스밴드 칩(퀄컴 스냅드래곤 X75 등)이 바로 이것입니다.
          </p>
        </SubSection>
        <SubSection title="● 방향별 구성">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">장치</th>
                  <th className="px-3 py-2 text-left">구성</th>
                  <th className="px-3 py-2 text-left">방향</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2">AM 라디오 수신기</td><td className="px-3 py-2">복조기만</td><td className="px-3 py-2">수신 전용</td></tr>
                <tr><td className="px-3 py-2">무전기</td><td className="px-3 py-2">둘 다</td><td className="px-3 py-2">번갈아 송수신</td></tr>
                <tr><td className="px-3 py-2">스마트폰</td><td className="px-3 py-2">둘 다</td><td className="px-3 py-2">동시 송수신</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 유선전화와의 차이">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left"></th>
                <th className="px-3 py-2 text-left">유선전화</th>
                <th className="px-3 py-2 text-left">AM 라디오</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2 font-medium">전달 매체</td><td className="px-3 py-2">구리선 (전류)</td><td className="px-3 py-2">공중 (전파)</td></tr>
              <tr><td className="px-3 py-2 font-medium">변조</td><td className="px-3 py-2">없음 (소리→전기 그대로)</td><td className="px-3 py-2">반송파에 얹음</td></tr>
              <tr><td className="px-3 py-2 font-medium">방향</td><td className="px-3 py-2">1:1 (양방향)</td><td className="px-3 py-2">1:다수 (단방향)</td></tr>
              <tr><td className="px-3 py-2 font-medium">발명</td><td className="px-3 py-2">1876년 (벨)</td><td className="px-3 py-2">1906년 (페센든)</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted mt-3">
          유선전화는 반송파 없이 소리 파형이 전류로 1:1 변환되어 선을 타고 갑니다.
          수도관으로 물을 보내는 것과 같습니다.
        </p>
      </CalcBox>
    </div>
  );
}
