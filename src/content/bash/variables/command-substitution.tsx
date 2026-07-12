import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅲ. 명령 치환과 산술 — §1 명령 치환, §2 산술 확장, §3 실전 조합 */
export default function BashCommandSubstitution() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        <span className="font-medium">명령 치환</span>은 명령의 출력을 문자열로 받아 변수에 담고,
        <span className="font-medium"> 산술 확장</span>은 정수 계산을 셸 내부에서 처리한다. 둘 다 스크립트의 핵심 재료다.
      </p>

      <CalcBox title="■ §1. 명령 치환">
        <p className="text-sm">
          명령의 표준 출력을 그 자리에 <span className="font-medium">문자열로 끼워 넣는다</span>. 두 문법이 있다.
        </p>

        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`today=$(date +%Y-%m-%d)     # 권장: $(...) — 중첩 가능, 가독성 좋음
today=` + "`date +%Y-%m-%d`" + `     # 옛 방식: 백틱 — 중첩 어려움
echo "오늘은 $today"

count=$(ls *.txt | wc -l)  # txt 파일 개수를 변수에 저장`}</pre>
        </div>

        <SubSection title="● $(...) 를 권장하는 이유">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`# 중첩할 때 차이가 극명하다
dir=$(basename "$(pwd)")   # $(...) 는 자연스럽게 중첩
# 백틱은 안쪽을 역슬래시로 이스케이프해야 해서 읽기 어렵다`}</pre>
          </div>
          <p className="text-sm mt-2">
            치환 결과는 <span className="font-medium">항상 큰따옴표로</span> 감싸 단어 분리를 막는다: <code className="px-1 bg-sidebar-bg rounded">&quot;$(cmd)&quot;</code>.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 산술 확장">
        <p className="text-sm mb-2">
          <code className="px-1 bg-sidebar-bg rounded">$((...))</code> 안에서는 정수 사칙연산·비교·비트 연산을 할 수 있다. 내부에서는 변수에 <code className="px-1 bg-sidebar-bg rounded">$</code>를 생략해도 된다.
        </p>

        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`a=7; b=3
echo $(( a + b ))     # 10
echo $(( a * b ))     # 21
echo $(( a / b ))     # 2   (정수 나눗셈, 소수점 버림)
echo $(( a % b ))     # 1   (나머지)
echo $(( a ** b ))    # 343 (거듭제곱)`}</pre>
        </div>

        <SubSection title="● 변수 증감과 (( )) 명령">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`i=0
(( i++ ))         # i를 1 증가 (값 대입 문맥 아님)
(( i += 5 ))      # i = 6
echo "$i"         # 6

# 조건에도 활용
(( i > 3 )) && echo "3보다 큼"`}</pre>
          </div>
          <p className="text-sm mt-2">
            산술은 <span className="font-medium">정수 전용</span>이다. 소수 계산이 필요하면 <code className="px-1 bg-sidebar-bg rounded">bc</code>나 <code className="px-1 bg-sidebar-bg rounded">awk</code>를 쓴다: <code className="px-1 bg-sidebar-bg rounded">echo &quot;scale=2; 7/3&quot; | bc</code>.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. 실전 조합">
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`# 백업 파일 이름에 날짜 붙이기
cp report.txt "report_$(date +%Y%m%d).bak"

# 파일 개수를 세어 계산에 사용
n=$(ls -1 *.log | wc -l)
echo "로그 $n 개, 처리 예상 $(( n * 2 ))초"

# 디스크 사용량 퍼센트
used=$(df / | awk 'NR==2 {print $5}')
echo "루트 파티션 사용률: $used"`}</pre>
        </div>

        <Insight>
          <span className="font-medium">명령 치환 <code className="px-1 bg-sidebar-bg rounded">$(...)</code>과 산술 <code className="px-1 bg-sidebar-bg rounded">$((...))</code>은 괄호 개수로 구분</span>한다. 하나면 명령의 출력, 둘이면 정수 계산. 헷갈리면 &quot;계산은 괄호 두 개&quot;로 기억하자.
        </Insight>
      </CalcBox>
    </div>
  );
}
