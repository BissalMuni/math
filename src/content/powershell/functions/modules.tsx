import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 스크립트와 모듈 — §1 .ps1 스크립트, §2 모듈, §3 배포와 가져오기 */
export default function PowershellModules() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        코드를 파일로 저장한 것이 <span className="font-medium">스크립트</span>(<code className="px-1 bg-sidebar-bg rounded">.ps1</code>),
        함수들을 재사용 가능한 꾸러미로 묶은 것이 <span className="font-medium">모듈</span>(<code className="px-1 bg-sidebar-bg rounded">.psm1</code>)이다.
      </p>

      <CalcBox title="■ §1. 스크립트 파일 (.ps1)">
        <p className="text-sm">
          명령을 텍스트 파일에 저장하고 <code className="px-1 bg-sidebar-bg rounded">.ps1</code> 확장자를 붙이면 스크립트가 된다. 파일 이름 앞에 경로를 붙여 실행한다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`# backup.ps1 내용
param([string]$Path = ".")
Get-ChildItem $Path -File |
  Measure-Object Length -Sum

# 실행 (현재 폴더의 스크립트)
.\\backup.ps1 -Path C:\\data`}</pre>
        </div>
        <p className="text-sm mt-2">
          스크립트 실행이 막히면 실행 정책을 <code className="px-1 bg-sidebar-bg rounded">RemoteSigned</code>로 조정한다(Ⅱ. cmdlet과 실행 정책 참고). 스크립트 맨 위 <code className="px-1 bg-sidebar-bg rounded">param()</code>은 스크립트 전체의 매개변수가 된다.
        </p>
      </CalcBox>

      <CalcBox title="■ §2. 모듈 (.psm1)">
        <p className="text-sm">
          관련 함수 여러 개를 하나의 <code className="px-1 bg-sidebar-bg rounded">.psm1</code> 파일에 모으면 모듈이 된다. <code className="px-1 bg-sidebar-bg rounded">Export-ModuleMember</code>로 외부에 공개할 함수를 정한다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`# MyTools.psm1
function Get-DiskFree {
    Get-PSDrive -PSProvider FileSystem |
      Select-Object Name, Free
}

function Get-Uptime {
    (Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime
}

# 공개할 함수 지정
Export-ModuleMember -Function Get-DiskFree, Get-Uptime`}</pre>
        </div>

        <SubSection title="● 모듈 매니페스트 (.psd1)">
          <p className="text-sm">
            버전·작성자·의존성 등 메타데이터는 <code className="px-1 bg-sidebar-bg rounded">.psd1</code> 매니페스트에 담는다. <code className="px-1 bg-sidebar-bg rounded">New-ModuleManifest</code>로 만든다.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`New-ModuleManifest -Path .\\MyTools.psd1 \`
  -RootModule MyTools.psm1 -ModuleVersion "1.0.0"`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. 모듈 가져오기와 배포">
        <p className="text-sm">
          모듈을 현재 세션으로 불러오려면 <code className="px-1 bg-sidebar-bg rounded">Import-Module</code>을 쓴다. 표준 경로(<code className="px-1 bg-sidebar-bg rounded">$env:PSModulePath</code>)에 두면 이름만으로 자동 로드된다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`# 경로로 가져오기
Import-Module .\\MyTools.psm1

# 사용 가능한 모듈·명령 확인
Get-Module -ListAvailable
Get-Command -Module MyTools

# 갤러리에서 설치
Install-Module -Name Pester -Scope CurrentUser`}</pre>
        </div>
        <p className="text-sm mt-2">
          <code className="px-1 bg-sidebar-bg rounded">Install-Module</code>은 PowerShell 갤러리에서 공개 모듈을 내려받는다. 팀 배포는 모듈 폴더를 <code className="px-1 bg-sidebar-bg rounded">$env:PSModulePath</code> 하위에 복사하는 방식이 일반적이다.
        </p>

        <Insight>
          <span className="font-medium">성장 경로</span>: 명령 한 줄 → 스크립트(<code className="px-1 bg-sidebar-bg rounded">.ps1</code>) → 함수 → 모듈(<code className="px-1 bg-sidebar-bg rounded">.psm1</code> + <code className="px-1 bg-sidebar-bg rounded">.psd1</code>). 재사용 빈도가 높아질수록 위 단계로 승격시키면 자동화 자산이 쌓인다.
        </Insight>
      </CalcBox>
    </div>
  );
}
