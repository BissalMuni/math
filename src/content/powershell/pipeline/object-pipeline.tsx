import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 객체 파이프라인 — §1 파이프 기본, §2 객체 흐름, §3 ForEach-Object */
export default function PowershellObjectPipeline() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        파이프라인(<code className="px-1 bg-sidebar-bg rounded">|</code>)은 한 명령의 <span className="font-medium">출력 객체</span>를 다음 명령의 입력으로 넘긴다.
        텍스트가 아니라 객체가 흐른다는 점이 PowerShell 파이프라인의 본질이다.
      </p>

      <CalcBox title="■ §1. 파이프의 기본">
        <p className="text-sm">
          <code className="px-1 bg-sidebar-bg rounded">|</code> 왼쪽 명령의 결과가 오른쪽 명령으로 전달된다. 여러 단계를 이어 붙여 데이터를 점점 좁혀 나간다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`# 프로세스를 메모리 사용량 순으로 정렬해 상위 5개
Get-Process |
  Sort-Object WorkingSet -Descending |
  Select-Object -First 5`}</pre>
        </div>
        <p className="text-sm mt-2">
          각 단계는 <span className="font-medium">객체 컬렉션</span>을 받아 가공한 뒤 다시 객체를 내보낸다. 마지막에 남은 객체가 화면에 표로 출력된다.
        </p>
      </CalcBox>

      <CalcBox title="■ §2. 무엇이 흐르는가 — 객체 관찰">
        <p className="text-sm">
          파이프로 흐르는 객체가 가진 속성·메서드를 알아야 다음 단계를 설계할 수 있다. <code className="px-1 bg-sidebar-bg rounded">Get-Member</code>가 그 지도다.
        </p>

        <SubSection title="● Get-Member로 구조 파악">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
            <pre>{`# 서비스 객체가 가진 속성·메서드 목록
Get-Service | Get-Member

# 흔한 속성: Name, Status, DisplayName
Get-Service | Select-Object Name, Status`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 텍스트 셸과의 차이">
          <p className="text-sm">
            Bash라면 <code className="px-1 bg-sidebar-bg rounded">ps | awk</code>로 열 번호를 세어 잘라야 한다. PowerShell은 속성 이름으로 바로 접근하므로 열 위치가 바뀌어도 코드가 깨지지 않는다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. ForEach-Object — 객체마다 작업">
        <p className="text-sm">
          흘러온 객체 하나하나에 코드를 실행하려면 <code className="px-1 bg-sidebar-bg rounded">ForEach-Object</code>를 쓴다. 현재 객체는 <code className="px-1 bg-sidebar-bg rounded">$_</code> (또는 <code className="px-1 bg-sidebar-bg rounded">$PSItem</code>)로 참조한다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`# 각 파일 이름을 대문자로 출력
Get-ChildItem *.txt | ForEach-Object {
  $_.Name.ToUpper()
}

# 별칭 % 사용 — 각 프로세스 이름과 ID
Get-Process | % { "$($_.Name) : $($_.Id)" }`}</pre>
        </div>
        <p className="text-sm mt-2">
          중괄호 <code className="px-1 bg-sidebar-bg rounded">{ }</code> 안이 각 객체에 반복 실행되는 <span className="font-medium">스크립트 블록</span>이다.
        </p>

        <Insight>
          파이프라인을 읽는 법: &quot;<span className="font-medium">얻고</span>(Get) → <span className="font-medium">거르고</span>(Where) → <span className="font-medium">정렬하고</span>(Sort) → <span className="font-medium">뽑는다</span>(Select).&quot; 각 단계 사이를 흐르는 것은 언제나 객체다.
        </Insight>
      </CalcBox>
    </div>
  );
}
