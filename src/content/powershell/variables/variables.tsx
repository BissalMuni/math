import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 변수와 타입 — §1 변수 선언, §2 데이터 타입, §3 자동/특수 변수 */
export default function PowershellVariables() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        PowerShell의 변수는 모두 <code className="px-1 bg-sidebar-bg rounded">$</code>로 시작한다.
        타입을 명시하지 않아도 자동 추론되지만, 필요하면 <span className="font-medium">.NET 타입</span>을 강제할 수 있다.
      </p>

      <CalcBox title="■ §1. 변수 선언과 대입">
        <p className="text-sm">
          변수 이름 앞에 <code className="px-1 bg-sidebar-bg rounded">$</code>를 붙이고 <code className="px-1 bg-sidebar-bg rounded">=</code>로 값을 대입한다. 별도의 선언 키워드는 없다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`$name = "Alice"      # 문자열
$age  = 30            # 정수
$pi   = 3.14          # 실수
$ok   = $true         # 불리언

# 값을 화면에 출력
$name
Write-Output "이름은 $name, 나이는 $age"`}</pre>
        </div>
        <p className="text-sm mt-2">
          큰따옴표 문자열 안에서는 <code className="px-1 bg-sidebar-bg rounded">$name</code>처럼 변수가 <span className="font-medium">전개(interpolation)</span>된다.
          작은따옴표 문자열은 전개하지 않고 글자 그대로 출력한다.
        </p>
      </CalcBox>

      <CalcBox title="■ §2. 데이터 타입">
        <p className="text-sm">
          PowerShell 값은 모두 .NET 타입을 갖는다. 타입을 알고 싶으면 <code className="px-1 bg-sidebar-bg rounded">.GetType()</code>을 호출한다.
        </p>

        <SubSection title="● 타입 확인과 강제">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
            <pre>{`(42).GetType().Name          # Int32
("hi").GetType().Name        # String

# 타입 강제(형변환) — [int], [string], [datetime]
[int]$n = "100"              # 문자열을 정수로
[datetime]$d = "2026-07-11"  # 날짜로 변환`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 배열과 해시테이블">
          <p className="text-sm">① <span className="font-medium">배열</span>: 값을 쉼표로 나열</p>
          <p className="text-sm">② <span className="font-medium">해시테이블</span>: 키-값 쌍의 모음</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`$fruits = @("사과", "배", "감")
$fruits[0]              # 사과
$fruits.Count          # 3
$fruits += "포도"       # 요소 추가

$user = @{ Name = "Bob"; Age = 25 }
$user["Name"]          # Bob
$user.Age              # 25`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. 자동 변수와 특수 변수">
        <p className="text-sm">
          PowerShell이 미리 채워 두는 <span className="font-medium">자동 변수</span>가 있다. 대표적인 것만 알아두면 파이프라인과 스크립트에서 매우 유용하다.
        </p>
        <p className="text-sm mt-2">① <code className="px-1 bg-sidebar-bg rounded">$_</code> 또는 <code className="px-1 bg-sidebar-bg rounded">$PSItem</code> — 파이프라인의 현재 객체</p>
        <p className="text-sm">② <code className="px-1 bg-sidebar-bg rounded">$?</code> — 직전 명령의 성공 여부(불리언)</p>
        <p className="text-sm">③ <code className="px-1 bg-sidebar-bg rounded">$args</code> — 함수에 전달된 인자 목록</p>
        <p className="text-sm">④ <code className="px-1 bg-sidebar-bg rounded">$null</code> — 값 없음</p>
        <p className="text-sm">⑤ <code className="px-1 bg-sidebar-bg rounded">$PSVersionTable</code> — PowerShell 버전 정보</p>

        <Insight>
          <code className="px-1 bg-sidebar-bg rounded">$_</code>는 파이프라인을 이해하는 핵심이다. &quot;지금 흘러온 객체 하나&quot;를 가리키며 <code className="px-1 bg-sidebar-bg rounded">Where-Object</code>·<code className="px-1 bg-sidebar-bg rounded">ForEach-Object</code>에서 끊임없이 등장한다.
        </Insight>
      </CalcBox>
    </div>
  );
}
