import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. AutoHotkey란 — §1 정체, §2 왜 배우는가 */
export default function AutohotkeyIntro() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        AutoHotkey(AHK)는 윈도우 전용 <span className="font-medium">자동화·단축키 스크립트 언어</span>다.
        키 하나에 원하는 동작을 연결하고, 자주 치는 문장을 자동 완성하며, 반복 작업을 매크로로 묶는 데 특화돼 있다.
      </p>

      <CalcBox title="■ §1. AutoHotkey의 정체">
        <p className="text-sm">
          핵심 개념은 두 가지다. <span className="font-medium">핫키(hotkey)</span>는 키 조합에 동작을 매핑하고, <span className="font-medium">핫스트링(hotstring)</span>은 입력한 약어를 긴 문장으로 자동 치환한다.
        </p>

        <SubSection title="● 핫키 예시">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
            <pre>{`; Win + N 을 누르면 메모장 실행 (AutoHotkey v2)
#n::Run "notepad.exe"
;  ^ #는 Win, !는 Alt, ^는 Ctrl, +는 Shift`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 핫스트링 예시">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
            <pre>{`; "ots" 를 입력하면 자동으로 긴 문장으로 치환
::ots::수고하셨습니다. 감사합니다.`}</pre>
          </div>
          <p className="text-sm mt-2">
            이메일 서명, 자주 쓰는 경로, 반복 문구를 짧은 약어로 등록해 타이핑을 줄인다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 왜 AutoHotkey를 배우는가">
        <p className="text-sm mb-2">① 반복적인 클릭·타이핑을 몇 줄로 자동화해 업무 시간을 크게 줄인다.</p>
        <p className="text-sm mb-2">② 키 재배치·창 제어·입력 전송 등 윈도우 GUI 조작을 프로그램처럼 다룬다.</p>
        <p className="text-sm">③ 간단한 GUI 창까지 직접 만들어 나만의 도구로 확장한다.</p>

        <Insight>
          &quot;똑같은 동작을 세 번 이상 반복한다&quot;면 AutoHotkey로 자동화할 신호다.
          작은 스크립트 하나가 매일의 클릭 수백 번을 없앤다. (본 교재는 최신 문법인 <span className="font-medium">v2</span> 기준)
        </Insight>
      </CalcBox>
    </div>
  );
}
