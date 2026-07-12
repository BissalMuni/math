import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 함수와 매개변수 — §1 함수 정의, §2 param 블록, §3 반환값과 파이프라인 */
export default function PowershellFunctions() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        반복되는 로직을 <code className="px-1 bg-sidebar-bg rounded">function</code>으로 묶으면 재사용할 수 있다.
        <code className="px-1 bg-sidebar-bg rounded">param()</code> 블록으로 입력을 받고, 타입·필수 여부·기본값을 정교하게 제어한다.
      </p>

      <CalcBox title="■ §1. 함수 정의와 호출">
        <p className="text-sm">
          <code className="px-1 bg-sidebar-bg rounded">function 이름 &#123; ... &#125;</code> 형식으로 정의한다. 호출할 때는 <span className="font-medium">괄호 없이</span> 이름 뒤에 인자를 나열한다 (cmdlet처럼).
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`function Get-Greeting {
    param($Name)
    "안녕하세요, $Name 님!"
}

# 호출 — 괄호 없이 매개변수 이름 또는 위치로
Get-Greeting -Name "Alice"
Get-Greeting "Bob"`}</pre>
        </div>
        <p className="text-sm mt-2">
          함수 이름도 cmdlet처럼 <code className="px-1 bg-sidebar-bg rounded">동사-명사</code> 규칙을 따르면 일관성이 좋다.
        </p>
      </CalcBox>

      <CalcBox title="■ §2. param 블록 — 매개변수 제어">
        <p className="text-sm">
          <code className="px-1 bg-sidebar-bg rounded">param()</code> 블록에서 매개변수마다 타입, 기본값, 필수 여부를 지정한다.
        </p>

        <SubSection title="● 타입과 기본값">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
            <pre>{`function Add-Numbers {
    param(
        [int]$A,
        [int]$B = 0    # 기본값 0
    )
    $A + $B
}

Add-Numbers -A 5 -B 3    # 8
Add-Numbers -A 5         # 5 (B 는 기본값)`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 필수·검증 속성">
          <p className="text-sm">
            <code className="px-1 bg-sidebar-bg rounded">[Parameter(Mandatory)]</code>로 필수 지정, <code className="px-1 bg-sidebar-bg rounded">[ValidateSet]</code>로 허용 값을 제한한다.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`function Set-Mode {
    param(
        [Parameter(Mandatory)]
        [ValidateSet("dev", "prod")]
        [string]$Env
    )
    "환경: $Env"
}`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. 반환값과 파이프라인 입력">
        <p className="text-sm">
          함수는 <span className="font-medium">출력된 모든 값</span>을 반환한다. <code className="px-1 bg-sidebar-bg rounded">return</code>은 흐름을 끝낼 뿐, 출력 자체는 문장이 값을 내보내기만 하면 반환된다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`function Square {
    param([int]$X)
    $X * $X        # return 없이도 반환됨
}
Square 4           # 16`}</pre>
        </div>

        <SubSection title="● 파이프라인을 받는 함수">
          <p className="text-sm">
            <code className="px-1 bg-sidebar-bg rounded">ValueFromPipeline</code>과 <code className="px-1 bg-sidebar-bg rounded">process</code> 블록을 쓰면 함수가 파이프라인 입력을 객체마다 처리한다.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`function Double-It {
    param([Parameter(ValueFromPipeline)][int]$N)
    process { $N * 2 }
}
1, 2, 3 | Double-It    # 2, 4, 6`}</pre>
          </div>
        </SubSection>

        <Insight>
          함수는 &quot;<span className="font-medium">출력하면 곧 반환</span>&quot;이 원칙이다. 중간에 무심코 값을 출력하면 반환값에 섞이니, 로그는 <code className="px-1 bg-sidebar-bg rounded">Write-Verbose</code>·<code className="px-1 bg-sidebar-bg rounded">Write-Host</code>로 분리하자.
        </Insight>
      </CalcBox>
    </div>
  );
}
