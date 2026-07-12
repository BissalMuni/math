import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 반복문 — §1 Loop, §2 while·until, §3 for·흐름 제어 */
export default function AutohotkeyLoops() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        반복문은 <span className="font-medium">같은 동작을 여러 번</span> 실행한다.
        AutoHotkey v2는 횟수 반복 <code className="px-1 bg-sidebar-bg rounded">Loop</code>, 조건 반복 <code className="px-1 bg-sidebar-bg rounded">while</code>, 원소 순회 <code className="px-1 bg-sidebar-bg rounded">for</code>를 제공한다.
      </p>

      <CalcBox title="■ §1. Loop — 횟수 반복">
        <p className="text-sm mb-2">
          <code className="px-1 bg-sidebar-bg rounded">Loop 횟수</code>로 지정한 만큼 반복한다. 몇 번째인지는 <code className="px-1 bg-sidebar-bg rounded">A_Index</code>로 안다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`Loop 5 {
    MsgBox A_Index "번째 반복"   ; 1 ~ 5
}

; 특수 Loop: 파일·폴더 순회
Loop Files, "C:\\Docs\\*.txt" {
    MsgBox A_LoopFileName        ; 텍스트 파일 이름을 하나씩
}`}</pre>
        </div>
        <p className="text-sm mt-2">
          <code className="px-1 bg-sidebar-bg rounded">Loop Files</code>, <code className="px-1 bg-sidebar-bg rounded">Loop Read</code> 등 특수 Loop로 파일·텍스트 라인을 순회할 수 있다.
        </p>
      </CalcBox>

      <CalcBox title="■ §2. while 와 until">
        <p className="text-sm mb-2">
          조건이 참인 동안 반복한다. <code className="px-1 bg-sidebar-bg rounded">Loop ... until</code>은 최소 한 번 실행 후 조건을 검사한다.
        </p>

        <SubSection title="● while — 선검사 반복">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`i := 1
while (i <= 3) {
    MsgBox "i = " i
    i += 1
}`}</pre>
          </div>
        </SubSection>

        <SubSection title="● Loop … until — 후검사 반복">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`n := 0
Loop {
    n += 1
} until (n >= 5)     ; 조건을 마지막에 검사`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. for 와 흐름 제어">
        <p className="text-sm mb-2">
          <code className="px-1 bg-sidebar-bg rounded">for</code>는 배열·맵의 원소를 하나씩 꺼낸다.
        </p>

        <SubSection title="● 배열·맵 순회">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`fruits := ["사과", "바나나", "포도"]
for index, value in fruits
    MsgBox index ": " value       ; 1: 사과 …

scores := Map("국어", 90, "수학", 85)
for subject, score in scores
    MsgBox subject " = " score`}</pre>
          </div>
        </SubSection>

        <SubSection title="● break 와 continue">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`Loop 10 {
    if (A_Index = 5)
        break        ; 반복 즉시 종료
    if (Mod(A_Index, 2) = 0)
        continue     ; 다음 반복으로 건너뜀
    MsgBox A_Index   ; 1, 3 만 출력
}`}</pre>
          </div>
          <p className="text-sm mt-2">
            <code className="px-1 bg-sidebar-bg rounded">break</code>는 반복을 완전히 끝내고, <code className="px-1 bg-sidebar-bg rounded">continue</code>는 이번 회차만 건너뛴다.
          </p>
        </SubSection>

        <Insight>
          무한 반복을 만들 때는 반드시 <code className="px-1 bg-sidebar-bg rounded">Sleep</code>과 종료 조건을 넣어라.
          쉼 없이 도는 <code className="px-1 bg-sidebar-bg rounded">Loop</code>는 CPU를 100%까지 올리고 스크립트를 멈추기 어렵게 만든다.
        </Insight>
      </CalcBox>
    </div>
  );
}
