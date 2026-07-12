import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 필터링과 선택 — §1 Where-Object, §2 Select-Object, §3 계산 속성 */
export default function PowershellFiltering() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        파이프라인에서 원하는 객체만 <span className="font-medium">고르고</span>(Where-Object) 원하는 속성만 <span className="font-medium">뽑는</span>(Select-Object) 두 cmdlet은 실무에서 가장 자주 쓰인다.
      </p>

      <CalcBox title="■ §1. Where-Object — 조건으로 거르기">
        <p className="text-sm">
          조건이 참인 객체만 통과시킨다. 조건 안에서 현재 객체는 <code className="px-1 bg-sidebar-bg rounded">$_</code>로 참조한다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`# CPU 를 100 이상 쓴 프로세스만
Get-Process | Where-Object { $_.CPU -gt 100 }

# 실행 중인 서비스만
Get-Service | Where-Object { $_.Status -eq "Running" }

# 별칭 ? 사용
Get-Process | ? { $_.WorkingSet -gt 100MB }`}</pre>
        </div>

        <SubSection title="● 간이 구문 (PowerShell 3+)">
          <p className="text-sm">
            단순 비교라면 스크립트 블록 없이 매개변수 형태로 짧게 쓸 수 있다.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`# 위와 동일하지만 더 간결
Get-Service | Where-Object Status -eq "Running"`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. Select-Object — 속성·개수 선택">
        <p className="text-sm">
          객체에서 특정 속성만 추리거나, 앞/뒤 몇 개만 잘라낼 때 쓴다.
        </p>
        <p className="text-sm mt-2">① <code className="px-1 bg-sidebar-bg rounded">-Property</code> — 원하는 속성만</p>
        <p className="text-sm">② <code className="px-1 bg-sidebar-bg rounded">-First</code> / <code className="px-1 bg-sidebar-bg rounded">-Last</code> — 앞/뒤 N개</p>
        <p className="text-sm">③ <code className="px-1 bg-sidebar-bg rounded">-Unique</code> — 중복 제거</p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`# 이름과 ID 만, 상위 3개
Get-Process |
  Select-Object Name, Id |
  Select-Object -First 3

# 확장자 목록에서 중복 제거
Get-ChildItem | Select-Object -ExpandProperty Extension -Unique`}</pre>
        </div>
        <p className="text-sm mt-2">
          <code className="px-1 bg-sidebar-bg rounded">-ExpandProperty</code>는 속성 하나를 <span className="font-medium">값 그 자체</span>로 펼쳐 준다. 객체 래핑 없이 순수 값 배열을 얻을 때 유용하다.
        </p>
      </CalcBox>

      <CalcBox title="■ §3. 계산 속성 (Calculated Property)">
        <p className="text-sm">
          기존 속성을 가공해 <span className="font-medium">새 열</span>을 만들 수 있다. 해시테이블로 <code className="px-1 bg-sidebar-bg rounded">Name</code>(열 이름)과 <code className="px-1 bg-sidebar-bg rounded">Expression</code>(계산식)을 지정한다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`# 메모리를 MB 단위 열로 새로 만들기
Get-Process | Select-Object Name,
  @{ Name = "MemoryMB"; Expression = { [math]::Round($_.WorkingSet / 1MB, 1) } }`}</pre>
        </div>

        <Insight>
          <span className="font-medium">Where 먼저, Select 나중.</span> 필요한 객체를 먼저 걸러 데이터 양을 줄인 뒤 속성을 추리면 파이프라인이 빠르고 읽기 쉬워진다.
        </Insight>
      </CalcBox>
    </div>
  );
}
