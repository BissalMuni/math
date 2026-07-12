import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅲ. GUI 만들기 — §1 Gui 객체, §2 컨트롤, §3 이벤트·값 읽기 */
export default function AutohotkeyGui() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        AutoHotkey는 <span className="font-medium">나만의 작은 창(GUI)</span>도 만들 수 있다.
        v2에서는 <code className="px-1 bg-sidebar-bg rounded">Gui()</code> 객체를 생성하고 컨트롤을 추가하는 객체 지향 방식으로 통일됐다.
      </p>

      <CalcBox title="■ §1. Gui 객체 생성">
        <p className="text-sm mb-2">
          <code className="px-1 bg-sidebar-bg rounded">Gui()</code>로 창을 만들고 <code className="px-1 bg-sidebar-bg rounded">.Show()</code>로 표시한다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`myGui := Gui("+Resize", "내 첫 창")   ; 옵션, 제목
myGui.Add("Text", , "안녕하세요!")     ; 텍스트 라벨 추가
myGui.Show("w300 h150")                ; 너비300 높이150 로 표시`}</pre>
        </div>
        <p className="text-sm mt-2">
          첫 인수는 창 옵션(<code className="px-1 bg-sidebar-bg rounded">+Resize</code> 크기 조절 허용 등), 둘째는 제목 표시줄 텍스트다.
        </p>
      </CalcBox>

      <CalcBox title="■ §2. 컨트롤 추가">
        <p className="text-sm mb-2">
          <code className="px-1 bg-sidebar-bg rounded">.Add(종류, 옵션, 내용)</code>으로 입력창·버튼 등을 배치한다.
        </p>
        <p className="text-sm mb-1">① <code className="px-1 bg-sidebar-bg rounded">"Text"</code> — 설명 라벨</p>
        <p className="text-sm mb-1">② <code className="px-1 bg-sidebar-bg rounded">"Edit"</code> — 텍스트 입력창</p>
        <p className="text-sm mb-1">③ <code className="px-1 bg-sidebar-bg rounded">"Button"</code> — 버튼</p>
        <p className="text-sm">④ <code className="px-1 bg-sidebar-bg rounded">"CheckBox"</code> / <code className="px-1 bg-sidebar-bg rounded">"DropDownList"</code> — 체크박스·목록</p>

        <SubSection title="● 입력 폼 예시">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`myGui := Gui(, "이름 입력")
myGui.Add("Text", , "이름:")
nameEdit := myGui.Add("Edit", "w200")   ; 입력창 (변수에 저장)
okBtn := myGui.Add("Button", "Default", "확인")
myGui.Show()`}</pre>
          </div>
          <p className="text-sm mt-2">
            컨트롤을 변수에 담아 두면 나중에 값을 읽거나 이벤트를 연결할 수 있다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. 이벤트 처리와 값 읽기">
        <p className="text-sm mb-2">
          버튼 클릭 등 이벤트에 함수를 연결하고, 입력창 값을 읽어 처리한다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`myGui := Gui(, "인사 프로그램")
myGui.Add("Text", , "이름을 입력하세요:")
nameEdit := myGui.Add("Edit", "w200")
btn := myGui.Add("Button", "Default", "인사하기")

; 버튼 클릭 → SayHello 함수 실행
btn.OnEvent("Click", SayHello)
myGui.Show()

SayHello(*) {
    name := nameEdit.Value          ; 입력창의 현재 값
    MsgBox "안녕하세요, " name "님!"
}`}</pre>
        </div>
        <p className="text-sm mt-2">
          <code className="px-1 bg-sidebar-bg rounded">.OnEvent("Click", 함수)</code>로 동작을 연결하고, <code className="px-1 bg-sidebar-bg rounded">컨트롤.Value</code>로 입력값을 읽는다. 콜백의 <code className="px-1 bg-sidebar-bg rounded">(*)</code>는 자동 전달되는 인수를 무시한다는 뜻이다.
        </p>

        <SubSection title="● 창 닫기 이벤트">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`; X 버튼으로 창을 닫으면 스크립트도 종료
myGui.OnEvent("Close", (*) => ExitApp())`}</pre>
          </div>
        </SubSection>

        <Insight>
          v2의 GUI는 <span className="font-medium">모두 객체</span>다.
          <code className="px-1 bg-sidebar-bg rounded">Gui()</code>로 창을, <code className="px-1 bg-sidebar-bg rounded">.Add()</code>로 컨트롤을 만들고, <code className="px-1 bg-sidebar-bg rounded">.OnEvent()</code>로 동작을 연결하는 세 단계만 기억하면 도구형 스크립트를 얼마든지 확장할 수 있다.
        </Insight>
      </CalcBox>
    </div>
  );
}
