import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 인자와 종료 상태 — §1 위치 인자, §2 반환값, §3 종료 상태 다루기 */
export default function BashArguments() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        함수와 스크립트는 <span className="font-medium">위치 인자</span>로 값을 받고, <span className="font-medium">종료 상태</span>로 성공·실패를 알린다.
        Bash 함수는 값을 <code className="px-1 bg-sidebar-bg rounded">return</code>하지 않고 <span className="font-medium">출력</span>으로 돌려준다는 점이 핵심이다.
      </p>

      <CalcBox title="■ §1. 위치 인자">
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`show() {
    echo "함수 이름과 무관, 첫째: $1, 둘째: $2"
    echo "인자 개수: $#"
    echo "모든 인자: $@"
}
show a b c    # 첫째: a, 둘째: b / 개수: 3 / 모든 인자: a b c`}</pre>
        </div>
        <p className="text-sm mt-2">
          함수 안의 <code className="px-1 bg-sidebar-bg rounded">$1</code>, <code className="px-1 bg-sidebar-bg rounded">$2</code>는 <span className="font-medium">함수에 전달된 인자</span>다 (스크립트 인자와 별개). <code className="px-1 bg-sidebar-bg rounded">$0</code>만 항상 스크립트 이름이다.
        </p>

        <SubSection title="● &quot;$@&quot; vs &quot;$*&quot;">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`# 인자가 "a b" "c" 두 개일 때
"$@"  →  "a b"  "c"     # 각 인자를 개별 단어로 (정석)
"$*"  →  "a b c"        # 전부 하나의 문자열로 합침`}</pre>
          </div>
          <p className="text-sm mt-2">
            반복이나 재전달에는 <span className="font-medium"><code className="px-1 bg-sidebar-bg rounded">&quot;$@&quot;</code></span>를 쓴다. 각 인자의 경계를 보존하기 때문이다.
          </p>
        </SubSection>

        <SubSection title="● shift — 인자 소비">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`while [ "$#" -gt 0 ]; do
    echo "처리: $1"
    shift            # $2가 $1로, 인자 목록 한 칸 이동
done`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 함수의 반환 — 출력으로 돌려준다">
        <p className="text-sm mb-2">
          <code className="px-1 bg-sidebar-bg rounded">return</code>은 0~255의 <span className="font-medium">종료 상태</span>만 반환한다. 계산 결과 같은 <span className="font-medium">값</span>은 <code className="px-1 bg-sidebar-bg rounded">echo</code>로 출력하고 호출 측에서 명령 치환으로 받는다.
        </p>

        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`add() { echo $(( $1 + $2 )); }   # 값은 echo로 출력

result=$(add 3 4)                # 명령 치환으로 받는다
echo "$result"                   # 7`}</pre>
        </div>
        <p className="text-sm mt-2">
          <code className="px-1 bg-sidebar-bg rounded">return 7</code>로 쓰면 <span className="font-medium">종료 상태</span>가 7이 될 뿐 값이 아니다. 값은 반드시 출력을 통해 전달한다.
        </p>
      </CalcBox>

      <CalcBox title="■ §3. 종료 상태 다루기">
        <SubSection title="● $? 로 직전 결과 확인">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`grep -q "root" /etc/passwd
if [ "$?" -eq 0 ]; then echo "찾음"; fi

# 보통은 if에 명령을 직접 넣는 편이 낫다
if grep -q "root" /etc/passwd; then echo "찾음"; fi`}</pre>
          </div>
          <p className="text-sm mt-2">
            종료 상태 <code className="px-1 bg-sidebar-bg rounded">0</code>은 성공, <code className="px-1 bg-sidebar-bg rounded">1~255</code>는 실패다.
          </p>
        </SubSection>

        <SubSection title="● 방어적 스크립트 옵션">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`set -e            # 명령이 실패(0 아님)하면 즉시 종료
set -u            # 정의 안 된 변수 사용 시 에러
set -o pipefail   # 파이프 중간 실패도 감지
set -euo pipefail # 세 개를 한 번에 (권장 프리앰블)`}</pre>
          </div>
        </SubSection>

        <Insight>
          Bash 함수는 <span className="font-medium">값이 아니라 &quot;출력&quot;을 반환</span>한다: 값은 <code className="px-1 bg-sidebar-bg rounded">echo</code> + <code className="px-1 bg-sidebar-bg rounded">$(...)</code>로, 성공/실패는 <code className="px-1 bg-sidebar-bg rounded">return</code> + <code className="px-1 bg-sidebar-bg rounded">$?</code>로. 견고한 스크립트는 첫 줄에 <code className="px-1 bg-sidebar-bg rounded">set -euo pipefail</code>을 둔다.
        </Insight>
      </CalcBox>
    </div>
  );
}
