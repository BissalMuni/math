import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 창 제어 — §1 창 지정(ahk_), §2 활성화·상태, §3 이동·크기 */
export default function AutohotkeyWindow() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        창 제어는 <span className="font-medium">특정 프로그램 창을 찾아 활성화·이동·크기 조절·닫기</span>하는 자동화다.
        AutoHotkey v2는 <code className="px-1 bg-sidebar-bg rounded">WinActivate</code>, <code className="px-1 bg-sidebar-bg rounded">WinMove</code> 등 <code className="px-1 bg-sidebar-bg rounded">Win*</code> 함수군으로 창을 다룬다.
      </p>

      <CalcBox title="■ §1. 창 지정 방법">
        <p className="text-sm mb-2">
          어떤 창을 대상으로 할지 &quot;WinTitle&quot; 인수로 지정한다. 가장 정확한 방법은 <code className="px-1 bg-sidebar-bg rounded">ahk_</code> 기준이다.
        </p>
        <p className="text-sm mb-1">① <code className="px-1 bg-sidebar-bg rounded">"제목 일부"</code> — 창 제목에 포함된 텍스트</p>
        <p className="text-sm mb-1">② <code className="px-1 bg-sidebar-bg rounded">ahk_exe notepad.exe</code> — 실행 파일 이름(가장 안정적)</p>
        <p className="text-sm mb-1">③ <code className="px-1 bg-sidebar-bg rounded">ahk_class Notepad</code> — 창 클래스</p>
        <p className="text-sm">④ <code className="px-1 bg-sidebar-bg rounded">ahk_id</code> — 고유 창 핸들(HWND)</p>

        <SubSection title="● Window Spy 도구">
          <p className="text-sm">
            AutoHotkey에 딸린 <span className="font-medium">Window Spy</span>를 켜고 마우스를 창 위에 올리면 그 창의 제목·클래스·exe 이름을 바로 알 수 있다. 창 지정 문자열을 찾는 표준 방법이다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 활성화와 상태 확인">
        <p className="text-sm mb-2">
          창을 앞으로 가져오거나, 실행 여부·활성 여부를 검사한다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`; 메모장이 있으면 활성화, 없으면 실행
if WinExist("ahk_exe notepad.exe")
    WinActivate
else
    Run "notepad.exe"

; 특정 창이 활성 상태인지 검사
if WinActive("ahk_exe chrome.exe")
    MsgBox "크롬이 지금 활성 창"`}</pre>
        </div>
        <p className="text-sm mt-2">
          <code className="px-1 bg-sidebar-bg rounded">WinExist</code> / <code className="px-1 bg-sidebar-bg rounded">WinActivate</code> 직후에 인수를 생략하면, 바로 앞에서 찾은 창(&quot;Last Found Window&quot;)을 대상으로 한다.
        </p>

        <SubSection title="● 최소화·최대화·닫기">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`WinMinimize "ahk_exe notepad.exe"
WinMaximize "ahk_exe notepad.exe"
WinRestore  "ahk_exe notepad.exe"
WinClose    "ahk_exe notepad.exe"   ; 정상 닫기
WinKill     "ahk_exe notepad.exe"   ; 강제 종료`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. 창 이동과 크기 조절">
        <p className="text-sm mb-2">
          <code className="px-1 bg-sidebar-bg rounded">WinMove</code>로 위치와 크기를 한 번에 지정한다: <code className="px-1 bg-sidebar-bg rounded">WinMove X, Y, 너비, 높이, 창</code>
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`; 메모장을 (0,0)으로 옮기고 800x600 크기로
WinMove 0, 0, 800, 600, "ahk_exe notepad.exe"

; 현재 창 위치·크기 읽기
WinGetPos &x, &y, &w, &h, "A"   ; "A" = 활성 창
MsgBox "위치 " x "," y "  크기 " w "x" h`}</pre>
        </div>

        <SubSection title="● 화면 절반 배치 예시">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`; Win + Left : 활성 창을 화면 왼쪽 절반에
#Left:: {
    WinMove 0, 0, A_ScreenWidth // 2, A_ScreenHeight, "A"
}`}</pre>
          </div>
        </SubSection>

        <Insight>
          창 지정은 <span className="font-medium">제목 텍스트보다 <code className="px-1 bg-sidebar-bg rounded">ahk_exe</code></span>가 안정적이다.
          제목은 문서 이름에 따라 계속 바뀌지만 실행 파일 이름은 고정이기 때문이다. 창을 못 찾으면 먼저 Window Spy로 지정 문자열을 확인하라.
        </Insight>
      </CalcBox>
    </div>
  );
}
