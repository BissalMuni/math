import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 반복문 — §1 for, §2 while·until, §3 제어 (break·continue·읽기) */
export default function BashLoops() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        반복문은 파일 목록 처리, 줄 단위 읽기, 조건 대기 등 자동화의 심장이다.
        Bash에는 <code className="px-1 bg-sidebar-bg rounded">for</code>, <code className="px-1 bg-sidebar-bg rounded">while</code>, <code className="px-1 bg-sidebar-bg rounded">until</code> 세 가지가 있다.
      </p>

      <CalcBox title="■ §1. for 반복문">
        <SubSection title="● 목록 순회">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`for fruit in 사과 배 감; do
    echo "과일: $fruit"
done

# 파일 글로빙 순회 — 공백 있는 이름도 안전
for f in *.txt; do
    echo "처리 중: $f"
done`}</pre>
          </div>
          <p className="text-sm mt-2">
            글로빙 <code className="px-1 bg-sidebar-bg rounded">*.txt</code>가 파일 목록으로 확장된다. <span className="font-medium">따옴표로 감싼 <code className="px-1 bg-sidebar-bg rounded">&quot;$f&quot;</code></span>를 써야 공백 있는 이름이 쪼개지지 않는다.
          </p>
        </SubSection>

        <SubSection title="● 숫자 범위와 C 스타일">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`for i in {1..5}; do echo "$i"; done      # 1 2 3 4 5
for i in {0..10..2}; do echo "$i"; done  # 0 2 4 6 8 10 (간격 2)

# C 스타일 (산술)
for (( i = 0; i < 5; i++ )); do
    echo "i=$i"
done`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. while과 until">
        <SubSection title="● while — 조건이 참인 동안">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`count=1
while [ "$count" -le 3 ]; do
    echo "회차 $count"
    (( count++ ))
done`}</pre>
          </div>
        </SubSection>

        <SubSection title="● until — 조건이 참이 될 때까지">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`# 서버가 뜰 때까지 대기
until curl -s http://localhost:8080 > /dev/null; do
    echo "대기 중..."
    sleep 2
done
echo "서버 준비 완료"`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 파일을 한 줄씩 읽기">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`while IFS= read -r line; do
    echo "줄: $line"
done < input.txt`}</pre>
          </div>
          <p className="text-sm mt-2">
            <code className="px-1 bg-sidebar-bg rounded">IFS=</code>는 앞뒤 공백 보존, <code className="px-1 bg-sidebar-bg rounded">-r</code>는 역슬래시 해석 방지. 줄 단위 처리의 <span className="font-medium">정석 패턴</span>이다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. break와 continue">
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`for i in {1..10}; do
    if [ "$i" -eq 3 ]; then continue; fi   # 3은 건너뜀
    if [ "$i" -eq 6 ]; then break; fi      # 6에서 중단
    echo "$i"
done
# 출력: 1 2 4 5`}</pre>
        </div>

        <Insight>
          파일 목록은 <span className="font-medium"><code className="px-1 bg-sidebar-bg rounded">for f in *.ext</code> 글로빙</span>으로, 파일 <span className="font-medium">내용</span>은 <code className="px-1 bg-sidebar-bg rounded">while read</code>로 순회한다. <code className="px-1 bg-sidebar-bg rounded">for line in $(cat file)</code>는 공백·글로빙 때문에 깨지므로 피한다.
        </Insight>
      </CalcBox>
    </div>
  );
}
