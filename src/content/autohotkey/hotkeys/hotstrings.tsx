import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 핫스트링 — §1 기본 정의, §2 옵션, §3 실행형·활용 */
export default function AutohotkeyHotstrings() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        핫스트링(hotstring)은 <span className="font-medium">입력한 약어를 긴 문장으로 자동 치환</span>하는 기능이다.
        <code className="px-1 bg-sidebar-bg rounded">::약어::치환문</code> 형태로 정의하며, 이메일 서명·상용구·오타 교정에 강력하다.
      </p>

      <CalcBox title="■ §1. 기본 정의">
        <p className="text-sm mb-2">
          약어를 입력하고 종결 키(스페이스·엔터·구두점)를 누르면 치환된다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`::ots::수고하셨습니다. 감사합니다.
::btw::by the way
::mymail::hong@example.com

; 오타 자동 교정
::teh::the
::recieve::receive`}</pre>
        </div>
        <p className="text-sm mt-2">
          예를 들어 <code className="px-1 bg-sidebar-bg rounded">ots</code>를 치고 스페이스를 누르면 문장 전체로 바뀐다.
        </p>
      </CalcBox>

      <CalcBox title="■ §2. 옵션">
        <p className="text-sm mb-2">
          약어 앞 콜론 사이에 옵션 문자를 넣어 동작을 바꾼다: <code className="px-1 bg-sidebar-bg rounded">:옵션:약어::치환</code>
        </p>
        <p className="text-sm mb-1">① <code className="px-1 bg-sidebar-bg rounded">*</code> — 종결 키 없이 즉시 치환</p>
        <p className="text-sm mb-1">② <code className="px-1 bg-sidebar-bg rounded">?</code> — 단어 중간에서도 치환</p>
        <p className="text-sm mb-1">③ <code className="px-1 bg-sidebar-bg rounded">C</code> — 대소문자 정확히 구분</p>
        <p className="text-sm">④ <code className="px-1 bg-sidebar-bg rounded">O</code> — 종결 키를 지우지 않고 남김</p>

        <SubSection title="● 옵션 예시">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`:*:sig::홍길동 / 개발팀 / 010-0000-0000
;  ^ 스페이스 없이 sig 입력 즉시 치환

:?:ther::there   ; other, another 등 단어 안에서도 동작`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. 실행형 핫스트링과 활용">
        <p className="text-sm mb-2">
          치환문 대신 코드를 실행할 수도 있다. 날짜 삽입처럼 동적인 값에 유용하다.
        </p>

        <SubSection title="● 코드를 실행하는 핫스트링">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`; "today"를 입력하면 오늘 날짜를 삽입
::today::
{
    SendText FormatTime(A_Now, "yyyy-MM-dd")
}

; "now" → 현재 시각
::now::
{
    SendText FormatTime(A_Now, "HH:mm")
}`}</pre>
          </div>
          <p className="text-sm mt-2">
            블록 안에서는 <code className="px-1 bg-sidebar-bg rounded">SendText</code>로 계산된 문자열을 입력한다.
          </p>
        </SubSection>

        <SubSection title="● 여러 줄 치환">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`::addr::
(
서울특별시 중구 세종대로 110
우) 04524
)`}</pre>
          </div>
          <p className="text-sm mt-2">
            소괄호 <code className="px-1 bg-sidebar-bg rounded">( )</code> 블록으로 감싸면 줄바꿈이 포함된 긴 텍스트를 그대로 치환한다.
          </p>
        </SubSection>

        <Insight>
          핫스트링은 조용히 타이핑을 줄이는 <span className="font-medium">가장 실용적인 자동화</span>다.
          자주 치는 이메일·주소·인사말을 3~4글자 약어로 등록하는 것부터 시작하라.
        </Insight>
      </CalcBox>
    </div>
  );
}
