import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 연산자 — §1 산술/대입, §2 비교, §3 논리/기타 */
export default function PowershellOperators() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        PowerShell의 비교 연산자는 대부분의 언어와 다르게 <span className="font-medium">기호 대신 이름</span>을 쓴다
        (<code className="px-1 bg-sidebar-bg rounded">-eq</code>, <code className="px-1 bg-sidebar-bg rounded">-gt</code> 등). 이 관례에 익숙해지는 것이 이 단원의 목표다.
      </p>

      <CalcBox title="■ §1. 산술과 대입 연산자">
        <p className="text-sm">산술 연산자는 익숙한 기호를 그대로 쓴다.</p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`5 + 3      # 8
10 - 4     # 6
6 * 7      # 42
17 / 5     # 3.4
17 % 5     # 2  (나머지)

# 대입 연산자
$x = 10
$x += 5    # 15
$x -= 3    # 12
$x *= 2    # 24`}</pre>
        </div>
        <p className="text-sm mt-2">
          <code className="px-1 bg-sidebar-bg rounded">+</code>는 문자열·배열에도 동작한다. <code className="px-1 bg-sidebar-bg rounded">&quot;ab&quot; + &quot;cd&quot;</code>는 <code className="px-1 bg-sidebar-bg rounded">abcd</code>, 배열끼리 더하면 이어 붙는다.
        </p>
      </CalcBox>

      <CalcBox title="■ §2. 비교 연산자">
        <p className="text-sm">
          <code className="px-1 bg-sidebar-bg rounded">&gt;</code>·<code className="px-1 bg-sidebar-bg rounded">&lt;</code>는 리디렉션에 쓰이므로, 비교에는 <span className="font-medium">하이픈 + 약어</span>를 쓴다.
        </p>

        <SubSection title="● 기본 비교">
          <p className="text-sm">① <code className="px-1 bg-sidebar-bg rounded">-eq</code> 같다 / <code className="px-1 bg-sidebar-bg rounded">-ne</code> 다르다</p>
          <p className="text-sm">② <code className="px-1 bg-sidebar-bg rounded">-gt</code> 초과 / <code className="px-1 bg-sidebar-bg rounded">-ge</code> 이상</p>
          <p className="text-sm">③ <code className="px-1 bg-sidebar-bg rounded">-lt</code> 미만 / <code className="px-1 bg-sidebar-bg rounded">-le</code> 이하</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`10 -eq 10    # True
10 -ne 5     # True
7  -gt 3     # True
2  -le 2     # True`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 문자열·컬렉션 비교">
          <p className="text-sm">
            문자열 매칭과 배열 포함 여부도 이름 연산자로 처리한다. 기본은 대소문자 무시이며, <code className="px-1 bg-sidebar-bg rounded">c</code> 접두사(<code className="px-1 bg-sidebar-bg rounded">-clike</code>)로 대소문자를 구분한다.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`"PowerShell" -like "Power*"     # True (와일드카드)
"abc123"     -match "\\d+"        # True (정규식)
1 -in @(1, 2, 3)                # True (포함)
@(1,2,3) -contains 2            # True`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. 논리 연산자와 기타">
        <p className="text-sm">여러 조건을 결합하거나 뒤집을 때 논리 연산자를 쓴다.</p>
        <p className="text-sm mt-2">① <code className="px-1 bg-sidebar-bg rounded">-and</code> 그리고 / <code className="px-1 bg-sidebar-bg rounded">-or</code> 또는 / <code className="px-1 bg-sidebar-bg rounded">-not</code> (또는 <code className="px-1 bg-sidebar-bg rounded">!</code>) 부정</p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`($age -gt 18) -and ($age -lt 65)   # 성인 판정
($x -eq 0) -or ($y -eq 0)          # 하나라도 0
-not ($ok)                         # 부정

# 범위 연산자와 문자열 분할/결합
1..5                # 1, 2, 3, 4, 5
"a,b,c" -split ","  # a  b  c (배열)
@("a","b") -join "-" # a-b`}</pre>
        </div>

        <Insight>
          <span className="font-medium">기억법</span>: 비교는 이름(<code className="px-1 bg-sidebar-bg rounded">-eq/-gt/-lt</code>), 산술은 기호(<code className="px-1 bg-sidebar-bg rounded">+ - * /</code>). <code className="px-1 bg-sidebar-bg rounded">==</code>를 쓰면 오류이니 반드시 <code className="px-1 bg-sidebar-bg rounded">-eq</code>를 쓴다.
        </Insight>
      </CalcBox>
    </div>
  );
}
