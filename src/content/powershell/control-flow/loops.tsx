import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 반복문 — §1 foreach/for, §2 while/do, §3 흐름 제어 */
export default function PowershellLoops() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        컬렉션을 순회하는 <code className="px-1 bg-sidebar-bg rounded">foreach</code>, 횟수 기반 <code className="px-1 bg-sidebar-bg rounded">for</code>,
        조건 기반 <code className="px-1 bg-sidebar-bg rounded">while</code>·<code className="px-1 bg-sidebar-bg rounded">do</code>까지 반복 구문을 정리한다.
      </p>

      <CalcBox title="■ §1. foreach 와 for">
        <p className="text-sm">
          컬렉션의 각 요소를 순회할 때는 <code className="px-1 bg-sidebar-bg rounded">foreach</code> 문을 쓴다. 파이프라인의 <code className="px-1 bg-sidebar-bg rounded">ForEach-Object</code>와 이름은 비슷하지만 <span className="font-medium">별개</span>다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`$fruits = @("사과", "배", "감")

foreach ($f in $fruits) {
    "과일: $f"
}

# for — 인덱스 기반 반복
for ($i = 0; $i -lt 5; $i++) {
    "카운트 $i"
}`}</pre>
        </div>

        <SubSection title="● foreach 문 vs ForEach-Object">
          <p className="text-sm">① <span className="font-medium">foreach 문</span>: 컬렉션을 메모리에 두고 반복. 변수는 <code className="px-1 bg-sidebar-bg rounded">$f</code>처럼 직접 이름 지정.</p>
          <p className="text-sm">② <span className="font-medium">ForEach-Object</span>: 파이프라인용. 현재 항목은 <code className="px-1 bg-sidebar-bg rounded">$_</code>. 스트리밍 처리에 유리.</p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. while 과 do">
        <p className="text-sm">
          조건이 참인 동안 반복한다. <code className="px-1 bg-sidebar-bg rounded">while</code>은 <span className="font-medium">조건을 먼저</span> 검사하고, <code className="px-1 bg-sidebar-bg rounded">do</code>는 <span className="font-medium">본문을 먼저</span> 실행한 뒤 검사한다(최소 1회 실행).
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`# while — 조건 선검사
$n = 1
while ($n -le 3) {
    "n = $n"
    $n++
}

# do-while — 본문 선실행
do {
    $answer = Read-Host "계속?(y/n)"
} while ($answer -eq "y")

# do-until — 조건이 참이 될 때까지
do { $x++ } until ($x -ge 10)`}</pre>
        </div>
      </CalcBox>

      <CalcBox title="■ §3. 흐름 제어 — break / continue">
        <p className="text-sm">
          반복 도중 빠져나오거나 다음 회차로 건너뛸 때 쓴다.
        </p>
        <p className="text-sm mt-2">① <code className="px-1 bg-sidebar-bg rounded">break</code> — 반복문을 즉시 종료</p>
        <p className="text-sm">② <code className="px-1 bg-sidebar-bg rounded">continue</code> — 현재 회차를 건너뛰고 다음으로</p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`foreach ($i in 1..10) {
    if ($i -eq 7) { break }       # 7에서 완전히 중단
    if ($i % 2 -eq 0) { continue } # 짝수는 건너뜀
    "홀수: $i"                     # 1, 3, 5 출력
}`}</pre>
        </div>

        <Insight>
          <span className="font-medium">선택 기준</span>: 컬렉션 순회는 <code className="px-1 bg-sidebar-bg rounded">foreach</code>, 정해진 횟수는 <code className="px-1 bg-sidebar-bg rounded">for</code>, 조건이 끝을 정하면 <code className="px-1 bg-sidebar-bg rounded">while</code>. 무한 루프를 막으려면 조건 변수를 반드시 갱신하자.
        </Insight>
      </CalcBox>
    </div>
  );
}
