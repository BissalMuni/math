import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 핫키 정의 — §1 수정자 기호, §2 정의 형태, §3 컨텍스트·특수키 */
export default function AutohotkeyHotkeys() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        핫키(hotkey)는 <span className="font-medium">키 조합에 동작을 연결</span>하는 AutoHotkey의 핵심 기능이다.
        <code className="px-1 bg-sidebar-bg rounded">키::동작</code> 형태로 정의하며, 두 개의 콜론이 &quot;누르면 실행&quot;을 뜻한다.
      </p>

      <CalcBox title="■ §1. 수정자 기호">
        <p className="text-sm mb-2">
          키 앞에 붙이는 기호로 Ctrl·Alt·Shift·Win 조합을 표현한다.
        </p>
        <p className="text-sm mb-1">① <code className="px-1 bg-sidebar-bg rounded">^</code> = Ctrl</p>
        <p className="text-sm mb-1">② <code className="px-1 bg-sidebar-bg rounded">!</code> = Alt</p>
        <p className="text-sm mb-1">③ <code className="px-1 bg-sidebar-bg rounded">+</code> = Shift</p>
        <p className="text-sm">④ <code className="px-1 bg-sidebar-bg rounded">#</code> = Win</p>

        <SubSection title="● 조합 예시">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`^n::Run "notepad.exe"        ; Ctrl + N
#e::Run "explorer.exe"       ; Win + E
^!t::Run "cmd.exe"           ; Ctrl + Alt + T
+#s::MsgBox "Shift+Win+S"    ; 여러 수정자 조합`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 핫키 정의 형태">
        <p className="text-sm mb-2">
          동작이 한 줄이면 콜론 뒤에 바로, 여러 줄이면 중괄호 블록으로 쓴다.
        </p>

        <SubSection title="● 한 줄 핫키">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`#c::Run "calc.exe"       ; Win + C 로 계산기`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 여러 줄 핫키(블록)">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`#m:: {
    MsgBox "메모장을 엽니다"
    Run "notepad.exe"
    Sleep 500
}`}</pre>
          </div>
          <p className="text-sm mt-2">
            v2에서는 <code className="px-1 bg-sidebar-bg rounded">키:: &#123; ... &#125;</code> 블록으로 여러 동작을 묶는다.
          </p>
        </SubSection>

        <SubSection title="● 조합키(A &amp; B)와 눌렀다 뗄 때">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`CapsLock & j::Send "{Down}"   ; CapsLock을 수정자로 사용

; 눌렀을 때 / 뗐을 때 각각 처리
#z::MsgBox "눌림"
#z Up::MsgBox "뗌"`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. 조건부 핫키와 특수키">
        <p className="text-sm mb-2">
          <code className="px-1 bg-sidebar-bg rounded">#HotIf</code>로 특정 창에서만 작동하는 핫키를 만든다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`; 메모장이 활성일 때만 F1이 저장 단축키로 동작
#HotIf WinActive("ahk_exe notepad.exe")
F1::Send "^s"
#HotIf   ; 조건 해제 (이 아래는 다시 전역)`}</pre>
        </div>

        <SubSection title="● 자주 쓰는 특수키 이름">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`Enter, Tab, Space, Esc, Backspace
F1 ~ F12, Left/Right/Up/Down
Media_Play_Pause, Volume_Up, Volume_Down

Media_Play_Pause::Run "spotify.exe"   ; 미디어 재생키 재할당`}</pre>
          </div>
        </SubSection>

        <Insight>
          <code className="px-1 bg-sidebar-bg rounded">키::</code>가 원래 키 동작을 <span className="font-medium">가로챈다</span>.
          원래 동작을 유지하고 싶으면 동작 안에서 <code className="px-1 bg-sidebar-bg rounded">Send</code>로 다시 보내거나 <code className="px-1 bg-sidebar-bg rounded">~</code>(틸드) 접두를 붙인다.
        </Insight>
      </CalcBox>
    </div>
  );
}
