import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 키·마우스 입력 전송 — §1 Send, §2 특수키·조합, §3 마우스 */
export default function AutohotkeySendInput() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        자동화의 핵심은 <span className="font-medium">사람 대신 키와 마우스를 조작</span>하는 것이다.
        AutoHotkey v2는 <code className="px-1 bg-sidebar-bg rounded">Send</code>로 키 입력을, <code className="px-1 bg-sidebar-bg rounded">Click</code>·<code className="px-1 bg-sidebar-bg rounded">MouseMove</code>로 마우스를 제어한다.
      </p>

      <CalcBox title="■ §1. Send — 키 입력 전송">
        <p className="text-sm mb-2">
          <code className="px-1 bg-sidebar-bg rounded">Send</code>는 문자열을 현재 활성 창에 타이핑한다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`Send "Hello World"          ; 글자 그대로 입력
Send "abc{Enter}"           ; abc 입력 후 엔터

; SendText 는 특수 기호 해석 없이 그대로 입력
SendText "1 + 2 = {3}"      ; 중괄호까지 글자 그대로`}</pre>
        </div>
        <p className="text-sm mt-2">
          <code className="px-1 bg-sidebar-bg rounded">Send</code>는 중괄호 <code className="px-1 bg-sidebar-bg rounded">&#123; &#125;</code> 안을 특수키로 해석하고, <code className="px-1 bg-sidebar-bg rounded">SendText</code>는 모든 문자를 문자 그대로 보낸다.
        </p>
      </CalcBox>

      <CalcBox title="■ §2. 특수키와 조합키">
        <p className="text-sm mb-2">
          엔터·탭 같은 특수키는 중괄호로, 수정자 조합은 기호로 표현한다.
        </p>
        <p className="text-sm mb-1">① <code className="px-1 bg-sidebar-bg rounded">&#123;Enter&#125; &#123;Tab&#125; &#123;Esc&#125; &#123;Backspace&#125;</code> — 특수키</p>
        <p className="text-sm mb-1">② <code className="px-1 bg-sidebar-bg rounded">^</code>Ctrl <code className="px-1 bg-sidebar-bg rounded">!</code>Alt <code className="px-1 bg-sidebar-bg rounded">+</code>Shift <code className="px-1 bg-sidebar-bg rounded">#</code>Win</p>
        <p className="text-sm">③ <code className="px-1 bg-sidebar-bg rounded">&#123;키 down&#125;</code> / <code className="px-1 bg-sidebar-bg rounded">&#123;키 up&#125;</code> — 누름/뗌 분리</p>

        <SubSection title="● 조합키 전송 예시">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`Send "^c"           ; Ctrl+C (복사)
Send "^v"           ; Ctrl+V (붙여넣기)
Send "!{F4}"        ; Alt+F4 (창 닫기)
Send "^a{Delete}"   ; 전체 선택 후 삭제

; 같은 키를 여러 번
Send "{Down 5}"     ; 아래 방향키 5번`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 클립보드 활용 붙여넣기">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`A_Clipboard := "붙여넣을 긴 텍스트"
Send "^v"           ; 긴 문자열은 Send보다 클립보드가 빠르고 안정적`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. 마우스 제어">
        <p className="text-sm mb-2">
          마우스 이동·클릭·드래그를 좌표 기반으로 자동화한다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`Click                  ; 현재 위치에서 왼쪽 클릭
Click 300, 200         ; (300,200) 좌표 클릭
Click "Right"          ; 우클릭
Click 2                ; 더블클릭

MouseMove 500, 400, 10 ; (500,400)으로 이동 (속도 10)

; 드래그: (100,100) → (400,400)
MouseClickDrag "Left", 100, 100, 400, 400`}</pre>
        </div>

        <SubSection title="● 현재 마우스 위치 얻기">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`MouseGetPos &x, &y     ; 현재 좌표를 x, y 변수에 저장
MsgBox "마우스: " x ", " y`}</pre>
          </div>
          <p className="text-sm mt-2">
            좌표 기준을 화면·창 중 무엇으로 볼지는 <code className="px-1 bg-sidebar-bg rounded">CoordMode "Mouse", "Screen"</code>으로 설정한다.
          </p>
        </SubSection>

        <Insight>
          긴 문자열이나 특수문자가 많은 텍스트는 <code className="px-1 bg-sidebar-bg rounded">Send</code> 대신 클립보드에 넣고 <code className="px-1 bg-sidebar-bg rounded">^v</code>로 붙여넣는 것이 훨씬 빠르고 오타가 없다.
          좌표 클릭은 화면 해상도·창 위치에 따라 어긋날 수 있으니 <code className="px-1 bg-sidebar-bg rounded">CoordMode</code>를 먼저 확인하라.
        </Insight>
      </CalcBox>
    </div>
  );
}
