import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 조건문 — §1 if/elseif/else, §2 switch, §3 삼항 */
export default function PowershellConditionals() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        조건에 따라 코드 흐름을 나누는 <code className="px-1 bg-sidebar-bg rounded">if</code>, 여러 갈래를 깔끔하게 처리하는 <code className="px-1 bg-sidebar-bg rounded">switch</code>,
        그리고 PowerShell 7의 삼항 연산자를 익힌다.
      </p>

      <CalcBox title="■ §1. if / elseif / else">
        <p className="text-sm">
          조건은 소괄호 안에, 실행 블록은 중괄호 안에 둔다. 비교에는 <code className="px-1 bg-sidebar-bg rounded">-eq</code> 같은 이름 연산자를 쓴다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`$score = 85

if ($score -ge 90) {
    "A"
} elseif ($score -ge 80) {
    "B"
} else {
    "C"
}`}</pre>
        </div>

        <SubSection title="● 참/거짓 판정 규칙">
          <p className="text-sm">① <code className="px-1 bg-sidebar-bg rounded">$null</code>, <code className="px-1 bg-sidebar-bg rounded">0</code>, 빈 문자열, 빈 배열 → 거짓</p>
          <p className="text-sm">② 그 외 대부분의 값 → 참</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`if ($list) { "리스트에 요소가 있음" }
if (-not $result) { "결과가 비어 있음" }`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. switch — 다중 분기">
        <p className="text-sm">
          하나의 값을 여러 경우와 비교할 때 <code className="px-1 bg-sidebar-bg rounded">if-elseif</code>보다 읽기 쉽다. 와일드카드·정규식 매칭도 지원한다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`$day = "Sat"

switch ($day) {
    "Sat" { "주말" }
    "Sun" { "주말" }
    default { "평일" }
}

# 와일드카드 / 정규식 매칭
switch -Wildcard ($file) {
    "*.log" { "로그 파일" }
    "*.txt" { "텍스트 파일" }
}`}</pre>
        </div>
        <p className="text-sm mt-2">
          <code className="px-1 bg-sidebar-bg rounded">switch</code>는 <code className="px-1 bg-sidebar-bg rounded">break</code>가 없으면 이어지는 조건도 계속 검사한다. 배열을 넘기면 각 요소마다 반복 매칭하는 점도 유용하다.
        </p>
      </CalcBox>

      <CalcBox title="■ §3. 삼항 연산자 (PowerShell 7+)">
        <p className="text-sm">
          한 줄로 두 값 중 하나를 고를 때 <code className="px-1 bg-sidebar-bg rounded">조건 ? 참값 : 거짓값</code> 형식을 쓴다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`$status = ($count -gt 0) ? "있음" : "없음"

# null 병합 연산자 (?? / ??=)
$name = $input ?? "기본값"`}</pre>
        </div>

        <Insight>
          갈래가 2개면 <code className="px-1 bg-sidebar-bg rounded">if</code>, 3개 이상이면 <code className="px-1 bg-sidebar-bg rounded">switch</code>, 아주 짧은 양자택일이면 삼항 연산자. 가독성을 기준으로 고르면 유지보수가 쉬워진다.
        </Insight>
      </CalcBox>
    </div>
  );
}
