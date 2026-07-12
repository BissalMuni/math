import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 조건문 — §1 if·else, §2 비교·논리, §3 switch */
export default function AutohotkeyConditionals() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        조건문은 <span className="font-medium">상황에 따라 다른 코드를 실행</span>하게 한다.
        AutoHotkey v2는 <code className="px-1 bg-sidebar-bg rounded">if</code> / <code className="px-1 bg-sidebar-bg rounded">else</code> / <code className="px-1 bg-sidebar-bg rounded">switch</code>를 표준 표현식 문법으로 제공한다.
      </p>

      <CalcBox title="■ §1. if 와 else">
        <p className="text-sm mb-2">
          조건이 참(0이 아닌 값)이면 블록을 실행한다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`score := 85

if (score >= 90) {
    MsgBox "A"
} else if (score >= 80) {
    MsgBox "B"          ; 이 분기 실행
} else {
    MsgBox "C"
}`}</pre>
        </div>

        <SubSection title="● 한 줄 if">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`if (age >= 18)
    MsgBox "성인"

; 삼항 연산자로 더 짧게
msg := (age >= 18) ? "성인" : "미성년"`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 비교·논리 연산">
        <p className="text-sm mb-2">
          조건식에는 비교·논리 연산자를 조합한다.
        </p>
        <p className="text-sm mb-1">① 비교: <code className="px-1 bg-sidebar-bg rounded">=</code> <code className="px-1 bg-sidebar-bg rounded">!=</code> <code className="px-1 bg-sidebar-bg rounded">&gt;</code> <code className="px-1 bg-sidebar-bg rounded">&lt;</code> <code className="px-1 bg-sidebar-bg rounded">&gt;=</code> <code className="px-1 bg-sidebar-bg rounded">&lt;=</code></p>
        <p className="text-sm mb-1">② 논리: <code className="px-1 bg-sidebar-bg rounded">&&</code>(그리고) <code className="px-1 bg-sidebar-bg rounded">||</code>(또는) <code className="px-1 bg-sidebar-bg rounded">!</code>(부정)</p>
        <p className="text-sm">③ 문자열 포함: <code className="px-1 bg-sidebar-bg rounded">InStr</code></p>

        <SubSection title="● 복합 조건">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`name := "AutoHotkey"

if (StrLen(name) > 5 && InStr(name, "Hot"))
    MsgBox "길고 Hot을 포함한 이름"

; 값이 비었는지 검사
if (input = "")
    MsgBox "입력이 없습니다"`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. switch 문">
        <p className="text-sm mb-2">
          하나의 값을 여러 경우와 비교할 때 <code className="px-1 bg-sidebar-bg rounded">if-else</code> 사슬 대신 <code className="px-1 bg-sidebar-bg rounded">switch</code>가 깔끔하다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`day := "월"

switch day {
    case "토", "일":
        MsgBox "주말"
    case "월", "화", "수", "목", "금":
        MsgBox "평일"       ; 이 분기 실행
    default:
        MsgBox "알 수 없음"
}`}</pre>
        </div>
        <p className="text-sm mt-2">
          v2의 <code className="px-1 bg-sidebar-bg rounded">switch</code>는 한 <code className="px-1 bg-sidebar-bg rounded">case</code>에 여러 값을 쉼표로 나열할 수 있고, C처럼 <code className="px-1 bg-sidebar-bg rounded">break</code>를 쓰지 않아도 자동으로 다음 case로 흘러가지 않는다.
        </p>

        <Insight>
          v2에서는 조건을 반드시 <span className="font-medium">표현식</span>으로 쓴다.
          <code className="px-1 bg-sidebar-bg rounded">if (x = 5)</code>처럼 괄호로 감싸는 습관이 v1의 낡은 명령형 <code className="px-1 bg-sidebar-bg rounded">if x = 5</code>와의 혼동을 막는다.
        </Insight>
      </CalcBox>
    </div>
  );
}
