import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. PowerShell이란 — §1 객체 기반 셸, §2 왜 배우는가 */
export default function PowershellIntro() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        PowerShell은 마이크로소프트가 만든 <span className="font-medium">객체 기반 셸이자 스크립트 언어</span>다.
        전통적인 셸이 텍스트를 주고받는 데 비해, PowerShell은 <span className="font-medium">.NET 객체</span>를 주고받는 것이 가장 큰 차이다.
      </p>

      <CalcBox title="■ §1. 텍스트가 아닌 객체를 다룬다">
        <p className="text-sm">
          Bash에서 <code className="px-1 bg-sidebar-bg rounded">ls</code>는 화면에 <span className="font-medium">글자</span>를 출력한다. 파일 크기만 뽑으려면 텍스트를 잘라내야 한다.
          PowerShell의 <code className="px-1 bg-sidebar-bg rounded">Get-ChildItem</code>은 <span className="font-medium">파일 객체</span>를 돌려주므로 <code className="px-1 bg-sidebar-bg rounded">.Length</code> 속성으로 크기를 바로 얻는다.
        </p>

        <SubSection title="● cmdlet — 동사-명사 규칙">
          <p className="text-sm">
            PowerShell 명령은 <span className="font-medium">cmdlet(커맨드릿)</span>이라 부르며 <code className="px-1 bg-sidebar-bg rounded">동사-명사</code> 형식을 따른다.
          </p>
          <p className="text-sm">① <code className="px-1 bg-sidebar-bg rounded">Get-Process</code> — 프로세스 조회</p>
          <p className="text-sm">② <code className="px-1 bg-sidebar-bg rounded">Stop-Service</code> — 서비스 중지</p>
          <p className="text-sm">③ <code className="px-1 bg-sidebar-bg rounded">Set-Location</code> — 디렉터리 이동</p>
        </SubSection>

        <SubSection title="● 첫 명령">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
            <pre>{`# 파일을 크기 순으로 정렬해 상위 3개만
Get-ChildItem | Sort-Object Length -Descending | Select-Object -First 3`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 왜 PowerShell을 배우는가">
        <p className="text-sm mb-2">① 윈도우 서버·Active Directory·Azure 관리의 표준 자동화 도구.</p>
        <p className="text-sm mb-2">② 객체 파이프라인 덕분에 텍스트 파싱 없이 데이터를 정확히 다룬다.</p>
        <p className="text-sm">③ 윈도우·리눅스·macOS 모두에서 동작하는 크로스플랫폼(PowerShell 7+).</p>

        <Insight>
          핵심 사고 전환: &quot;출력은 <span className="font-medium">글자</span>가 아니라 <span className="font-medium">객체</span>다.&quot;
          파이프로 넘어가는 것이 속성과 메서드를 가진 객체라는 점만 이해하면 PowerShell의 절반을 배운 것이다.
        </Insight>
      </CalcBox>
    </div>
  );
}
