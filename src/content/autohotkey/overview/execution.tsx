import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 스크립트 실행 — §1 파일 만들기·실행, §2 스크립트 구성, §3 재적재·종료 */
export default function AutohotkeyExecution() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        AutoHotkey 스크립트는 <span className="font-medium">.ahk</span> 확장자의 텍스트 파일이다.
        v2 인터프리터를 설치한 뒤 파일을 실행하면 트레이 아이콘으로 상주하며 정의한 핫키·핫스트링을 대기한다.
      </p>

      <CalcBox title="■ §1. 파일 만들기와 실행">
        <p className="text-sm mb-2">
          ① AutoHotkey v2를 설치한다(<code className="px-1 bg-sidebar-bg rounded">autohotkey.com</code>).
        </p>
        <p className="text-sm mb-2">
          ② 텍스트 편집기로 <code className="px-1 bg-sidebar-bg rounded">hello.ahk</code> 파일을 만든다.
        </p>
        <p className="text-sm">
          ③ 파일을 더블클릭하면 실행된다. 트레이에 초록색 <span className="font-medium">H</span> 아이콘이 뜨면 정상 상주 중이다.
        </p>

        <SubSection title="● 첫 스크립트">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`; hello.ahk — 실행하면 메시지 상자를 띄운다 (v2)
MsgBox "안녕하세요, AutoHotkey!"

; Win + J 를 누르면 인사말 출력
#j::MsgBox "핫키가 동작합니다."`}</pre>
          </div>
          <p className="text-sm mt-2">
            첫 줄의 <code className="px-1 bg-sidebar-bg rounded">MsgBox</code>는 스크립트가 로드될 때 곧바로 실행되고,
            <code className="px-1 bg-sidebar-bg rounded">#j::</code>는 실행 후 키 입력을 기다리는 핫키다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 스크립트의 구성">
        <p className="text-sm mb-2">
          스크립트는 위에서 아래로 로드된다. 크게 <span className="font-medium">자동 실행 구간</span>과 <span className="font-medium">핫키·함수 정의</span>로 나뉜다.
        </p>

        <SubSection title="● 자동 실행 구간(auto-execute)">
          <p className="text-sm">
            파일 맨 위, 첫 핫키·핫스트링·함수 정의를 만나기 전까지의 코드다. 스크립트가 로드되는 순간 한 번 실행되므로 전역 설정을 여기에 둔다.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`#Requires AutoHotkey v2.0   ; v2 인터프리터 강제
#SingleInstance Force        ; 중복 실행 시 이전 인스턴스 교체
SendMode "Input"             ; 빠르고 안정적인 입력 모드

; ↑ 여기까지가 자동 실행 구간

#n::Run "notepad.exe"        ; 이 아래부터 핫키 정의`}</pre>
          </div>
          <Insight>
            <code className="px-1 bg-sidebar-bg rounded">#Requires AutoHotkey v2.0</code>를 맨 위에 두면
            v1 인터프리터로 실수로 실행하는 사고를 막는다. v2 스크립트의 사실상 필수 헤더다.
          </Insight>
        </SubSection>

        <SubSection title="● 주석">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`; 세미콜론 한 줄 주석

/*
  여러 줄 주석은
  이렇게 감싼다
*/`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. 재적재·일시정지·종료">
        <p className="text-sm mb-2">
          스크립트를 수정한 뒤에는 다시 로드해야 반영된다. 트레이 아이콘 우클릭 메뉴 또는 명령으로 제어한다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`Reload()        ; 스크립트를 다시 읽어들여 수정 내용 반영
Suspend()       ; 모든 핫키를 일시 정지 / 다시 호출하면 해제
ExitApp()       ; 스크립트를 완전히 종료

; Ctrl + Alt + R 로 직접 재적재 핫키를 만들 수도 있다
^!r::Reload()`}</pre>
        </div>
        <Insight>
          트레이 아이콘 우클릭 → <span className="font-medium">Reload Script</span>가 가장 흔한 재적재 방법이다.
          핫키가 안 먹으면 먼저 재적재부터 확인하라.
        </Insight>
      </CalcBox>
    </div>
  );
}
