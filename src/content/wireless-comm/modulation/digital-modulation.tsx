"use client";

import { InlineMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅳ. 디지털 변조와 비트 전송 */
export default function DigitalModulationContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        아날로그(1G)에서 디지털(2G~)로의 전환, 그리고 비트 전송이 문자·영상·음악을 가능케 한 원리입니다.
      </p>

      <CalcBox title="1. 아날로그 vs 디지털">
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 mb-3">
          <pre>{`아날로그   ~~~~/~~~~  연속, 무한히 쪼갤 수 있음
디지털     1 0 1 1 0  끊어진 덩어리, 양자화`}</pre>
        </div>
        <SubSection title="(1) 문자는 태생이 디지털(양자)">
          <p className="text-sm mb-2">
            &ldquo;A&rdquo;는 A일 뿐, A와 B 사이에 중간값이 없습니다.
            연속적인 파동으로 직접 표현할 방법이 없어 반드시 비트로 변환해야 합니다.
          </p>
          <Insight>
            소리는 아날로그로 그대로 보낼 수 있지��, 문자는 디지털 인프라가 먼저 갖춰져야 했습니다.
            데이터 크기가 작다고 먼저 가능한 게 아닙니다.
          </Insight>
        </SubSection>
      </CalcBox>

      <CalcBox title="2. FSK — FM의 디지털 버전">
        <p className="text-sm mb-2">
          FSK(Frequency Shift Keying): 주파수 빠르기로 0과 1을 구분합니다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
          <pre>{`보낼 데이터: 1 0 1 1 0

1 → 빠른 주파수 (고주파)
0 → 느린 주파수 (저주파)

1        0        1   1        0
/\\/\\/\\/\\ 〜〜〜〜 /\\/\\/\\/\\ /\\/\\/\\/\\ 〜〜〜〜
  빠름     느림    빠름     빠름     느림`}</pre>
        </div>
      </CalcBox>

      <CalcBox title="3. 비트가 문자가 되는 과정">
        <SubSection title="(1) 아스키코드 / 유니코드">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`A = 01000001
B = 01000010
C = 01000011
...
가 = 11101010 10110000 80  (UTF-8)
나 = 11101011 10000010 98  (UTF-8)`}</pre>
          </div>
          <p className="text-sm text-muted mt-2">문자도 결국 비트의 약속표입니다.</p>
        </SubSection>
        <SubSection title="(2) 문자 전송 전체 흐름">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`"안녕" 입력
    ↓
폰이 비트로 변환
    ↓
QAM 변조로 파동에 얹음
    ↓
전파로 전송
    ↓
상대방 폰이 파동 수신
    ↓
복조해서 비트 추출
    ↓
약속표로 문자 복원 → "안녕"`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="4. 모든 것이 비트">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">콘텐츠</th>
                <th className="px-3 py-2 text-left">비트 변환</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2">문자</td><td className="px-3 py-2">아스키/유니코드</td></tr>
              <tr><td className="px-3 py-2">소리</td><td className="px-3 py-2">PCM 샘플링 (MP3)</td></tr>
              <tr><td className="px-3 py-2">영상</td><td className="px-3 py-2">프레임 압축 (MP4)</td></tr>
              <tr><td className="px-3 py-2">사진</td><td className="px-3 py-2">픽셀 압축 (JPG)</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted mt-3">
          전부 비트로 바꾼 뒤 파동에 얹어서 보냅니다.
          1G가 아날로그였던 것과 달리 2G부터 이게 가능해진 이유입니다.
        </p>
      </CalcBox>

      <CalcBox title="5. 변조 속도">
        <p className="text-sm mb-3">
          5G 주파수 28GHz일 때, 1초에 280억 번 진동합니다.
          각 심볼마다 10비트씩 담으면 엄청난 전송량입니다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 mb-3">
          <pre>{`사람 눈 깜빡임        0.1초
5G 심볼 전환 속도  0.000000001초

눈 한 번 깜빡이는 동안
심볼 1억 번 전환`}</pre>
        </div>
        <Insight>
          변조는 단순한 작업이지만 극도로 빠른 속도로 반복되므로
          전용 하드웨어 칩(베이스밴드 프로세서)이 필요합니다.
        </Insight>
      </CalcBox>

      <CalcBox title="6. 디지털 통신 발전 흐름">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">연대</th>
                <th className="px-3 py-2 text-left">기술</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2">1837년</td><td className="px-3 py-2">모스부호(전신) — 최초의 디지털 ON/OFF</td></tr>
              <tr><td className="px-3 py-2">1960년대</td><td className="px-3 py-2">FSK 모뎀 — FM 방식 디지털 전송</td></tr>
              <tr><td className="px-3 py-2">1980년대</td><td className="px-3 py-2">전화선 모뎀 — FSK → QAM 발전</td></tr>
              <tr><td className="px-3 py-2">현재</td><td className="px-3 py-2">4G/5G QAM — 1024QAM 10비트/심볼</td></tr>
            </tbody>
          </table>
        </div>
      </CalcBox>
    </div>
  );
}
