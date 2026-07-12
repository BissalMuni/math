import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅲ. 정렬·그룹·측정 — §1 Sort-Object, §2 Group-Object, §3 Measure-Object */
export default function PowershellSorting() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        객체 컬렉션을 <span className="font-medium">정렬</span>하고, 값별로 <span className="font-medium">묶고</span>, 합계·평균 같은 <span className="font-medium">통계</span>를 내는 세 cmdlet을 다룬다.
        데이터를 요약해 보고서로 만드는 핵심 도구다.
      </p>

      <CalcBox title="■ §1. Sort-Object — 정렬">
        <p className="text-sm">
          지정한 속성을 기준으로 오름차순 정렬한다. <code className="px-1 bg-sidebar-bg rounded">-Descending</code>으로 내림차순, 여러 속성을 나열하면 다중 기준 정렬이 된다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`# 파일 크기 내림차순
Get-ChildItem | Sort-Object Length -Descending

# 확장자 오름차순, 같은 확장자 안에서는 크기 내림차순
Get-ChildItem |
  Sort-Object Extension, @{ Expression = "Length"; Descending = $true }

# 중복 제거 정렬
1, 3, 2, 3, 1 | Sort-Object -Unique   # 1, 2, 3`}</pre>
        </div>
      </CalcBox>

      <CalcBox title="■ §2. Group-Object — 그룹화">
        <p className="text-sm">
          같은 값을 가진 객체끼리 묶어 <code className="px-1 bg-sidebar-bg rounded">Count</code>(개수)와 <code className="px-1 bg-sidebar-bg rounded">Group</code>(구성원)을 돌려준다. 빈도 분석에 제격이다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`# 확장자별 파일 개수
Get-ChildItem | Group-Object Extension

# 서비스 상태별 개수 (Running / Stopped)
Get-Service | Group-Object Status`}</pre>
        </div>

        <SubSection title="● -NoElement 로 개수만">
          <p className="text-sm">
            구성원 목록이 필요 없고 개수만 보고 싶다면 <code className="px-1 bg-sidebar-bg rounded">-NoElement</code>를 붙인다.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`Get-Process | Group-Object Company -NoElement |
  Sort-Object Count -Descending`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. Measure-Object — 측정과 통계">
        <p className="text-sm">
          개수·합계·평균·최소·최대를 계산한다. 숫자 속성에는 <code className="px-1 bg-sidebar-bg rounded">-Sum</code>·<code className="px-1 bg-sidebar-bg rounded">-Average</code> 등을, 텍스트에는 줄/단어/문자 수 측정을 쓸 수 있다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`# 폴더 전체 용량 합계·평균·최대
Get-ChildItem -File |
  Measure-Object Length -Sum -Average -Maximum

# 로그 파일의 줄 수
Get-Content app.log | Measure-Object -Line`}</pre>
        </div>
        <p className="text-sm mt-2">
          결과 객체의 <code className="px-1 bg-sidebar-bg rounded">.Sum</code>, <code className="px-1 bg-sidebar-bg rounded">.Average</code> 속성으로 값 하나만 꺼낼 수 있다.
        </p>

        <Insight>
          <span className="font-medium">요약 3종</span>: 순서는 <code className="px-1 bg-sidebar-bg rounded">Sort</code>, 분류는 <code className="px-1 bg-sidebar-bg rounded">Group</code>, 집계는 <code className="px-1 bg-sidebar-bg rounded">Measure</code>. 세 cmdlet을 파이프로 이으면 SQL의 <code className="px-1 bg-sidebar-bg rounded">ORDER BY</code>·<code className="px-1 bg-sidebar-bg rounded">GROUP BY</code>·집계 함수를 셸에서 그대로 구현할 수 있다.
        </Insight>
      </CalcBox>
    </div>
  );
}
