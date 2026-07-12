import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. cmdlet과 실행 정책 — §1 cmdlet 구조, §2 도움말, §3 실행 정책 */
export default function PowershellCmdlets() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        PowerShell 명령의 기본 단위는 <span className="font-medium">cmdlet</span>이다.
        일관된 <code className="px-1 bg-sidebar-bg rounded">동사-명사</code> 명명, 내장 도움말, 그리고 스크립트 실행을 통제하는 <span className="font-medium">실행 정책(Execution Policy)</span>을 이 단원에서 익힌다.
      </p>

      <CalcBox title="■ §1. cmdlet의 구조">
        <p className="text-sm">
          cmdlet은 항상 <code className="px-1 bg-sidebar-bg rounded">Verb-Noun</code> 형식이다. 동사는 표준 목록에서만 골라 쓰므로 이름만 봐도 동작을 예측할 수 있다.
        </p>

        <SubSection title="● 표준 동사">
          <p className="text-sm">① <code className="px-1 bg-sidebar-bg rounded">Get</code> — 조회 (Get-Process, Get-Service)</p>
          <p className="text-sm">② <code className="px-1 bg-sidebar-bg rounded">Set</code> — 값 지정 (Set-Location, Set-Content)</p>
          <p className="text-sm">③ <code className="px-1 bg-sidebar-bg rounded">New</code> / <code className="px-1 bg-sidebar-bg rounded">Remove</code> — 생성 / 삭제</p>
          <p className="text-sm">④ <code className="px-1 bg-sidebar-bg rounded">Start</code> / <code className="px-1 bg-sidebar-bg rounded">Stop</code> — 시작 / 중지</p>
          <p className="text-sm mt-2">
            승인된 동사 전체는 <code className="px-1 bg-sidebar-bg rounded">Get-Verb</code>로 확인한다.
          </p>
        </SubSection>

        <SubSection title="● 매개변수와 별칭">
          <p className="text-sm">
            cmdlet에 값을 넘길 때는 <code className="px-1 bg-sidebar-bg rounded">-이름 값</code> 형식의 매개변수를 쓴다.
            자주 쓰는 cmdlet에는 <span className="font-medium">별칭(alias)</span>이 있어 짧게 부를 수 있다.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`# 매개변수: -Name, -First
Get-Process -Name pwsh
Get-ChildItem -Path C:\\Windows | Select-Object -First 5

# 별칭: gci = Get-ChildItem, ls, dir 도 동일
gci
Get-Alias ls        # ls 가 어떤 cmdlet의 별칭인지 확인`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 도움말로 스스로 배우기">
        <p className="text-sm">
          모든 cmdlet은 내장 도움말을 갖는다. 명령 이름을 외울 필요 없이 <code className="px-1 bg-sidebar-bg rounded">Get-Command</code>로 찾고 <code className="px-1 bg-sidebar-bg rounded">Get-Help</code>로 사용법을 읽는다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`# 이름에 'service' 가 들어간 명령 찾기
Get-Command *service*

# 특정 cmdlet의 사용법·예제 보기
Get-Help Get-Process -Examples
Get-Help Get-Process -Full

# 객체가 가진 속성·메서드 살펴보기
Get-Process | Get-Member`}</pre>
        </div>
        <Insight>
          막힐 때의 3종 세트: <code className="px-1 bg-sidebar-bg rounded">Get-Command</code>(찾기) → <code className="px-1 bg-sidebar-bg rounded">Get-Help</code>(쓰는 법) → <code className="px-1 bg-sidebar-bg rounded">Get-Member</code>(무엇을 돌려주나). 이 셋이면 문서 없이도 대부분 해결된다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ §3. 실행 정책 (Execution Policy)">
        <p className="text-sm">
          윈도우는 기본적으로 스크립트(<code className="px-1 bg-sidebar-bg rounded">.ps1</code>) 실행을 제한한다. 이를 통제하는 것이 실행 정책이며, 악성 스크립트가 무단 실행되는 것을 막는 안전장치다.
        </p>

        <SubSection title="● 주요 정책 값">
          <p className="text-sm">① <code className="px-1 bg-sidebar-bg rounded">Restricted</code> — 스크립트 실행 전면 금지 (기본값)</p>
          <p className="text-sm">② <code className="px-1 bg-sidebar-bg rounded">RemoteSigned</code> — 로컬 스크립트는 허용, 인터넷 다운로드본은 서명 필요</p>
          <p className="text-sm">③ <code className="px-1 bg-sidebar-bg rounded">AllSigned</code> — 모든 스크립트에 신뢰된 서명 필요</p>
          <p className="text-sm">④ <code className="px-1 bg-sidebar-bg rounded">Bypass</code> — 아무 제한 없음 (주의해서 사용)</p>
        </SubSection>

        <SubSection title="● 정책 확인·변경">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
            <pre>{`# 현재 정책 확인
Get-ExecutionPolicy

# 현재 사용자 범위에서 RemoteSigned 로 변경 (관리자 불필요)
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`}</pre>
          </div>
          <p className="text-sm mt-2">
            실무 권장은 <code className="px-1 bg-sidebar-bg rounded">RemoteSigned</code>다. 내가 짠 스크립트는 자유롭게 돌리되, 외부에서 받은 것은 서명을 요구해 안전과 편의의 균형을 맞춘다.
          </p>
        </SubSection>
      </CalcBox>
    </div>
  );
}
