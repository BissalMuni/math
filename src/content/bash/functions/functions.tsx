import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 함수 정의 — §1 정의 문법, §2 지역 변수, §3 구성과 재사용 */
export default function BashFunctions() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        함수는 명령들의 묶음에 이름을 붙여 <span className="font-medium">재사용</span>하는 도구다.
        긴 스크립트를 의미 단위로 쪼개면 읽기 쉽고 고치기 쉬워진다.
      </p>

      <CalcBox title="■ §1. 함수 정의 문법">
        <p className="text-sm">두 가지 문법이 있으며, 아래 방식이 이식성이 좋아 권장된다.</p>

        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`# 권장 문법
greet() {
    echo "안녕하세요, $1님"
}

# 또는 function 키워드 (bash 전용)
function greet {
    echo "안녕하세요, $1님"
}

greet 철수    # 함수 호출 — 괄호 없이 인자만 나열
# → 안녕하세요, 철수님`}</pre>
        </div>
        <p className="text-sm mt-2">
          함수 <span className="font-medium">정의는 호출보다 먼저</span> 나와야 한다. 호출할 때는 다른 명령처럼 <code className="px-1 bg-sidebar-bg rounded">greet 철수</code>로 쓴다 — 괄호 안에 인자를 넣지 않는다.
        </p>
      </CalcBox>

      <CalcBox title="■ §2. 지역 변수 — local">
        <p className="text-sm mb-2">
          Bash 변수는 기본적으로 <span className="font-medium">전역</span>이다. 함수 안에서 <code className="px-1 bg-sidebar-bg rounded">local</code>을 쓰지 않으면 바깥 변수를 덮어써 버린다.
        </p>

        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`count=100

bad() { count=5; }          # 전역 count를 덮어씀
good() { local count=5; }   # 함수 안에서만 유효

bad;  echo "$count"   # 5  (오염됨!)
count=100
good; echo "$count"   # 100 (안전)`}</pre>
        </div>

        <Insight>
          함수 안에서 만드는 변수는 <span className="font-medium">항상 <code className="px-1 bg-sidebar-bg rounded">local</code>로 선언</span>하는 습관을 들이자. 전역 오염은 큰 스크립트에서 추적하기 어려운 버그의 단골 원인이다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ §3. 함수로 스크립트 구성하기">
        <SubSection title="● 의미 단위로 분해">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`log()   { echo "[$(date +%T)] $*"; }
backup() {
    local src="$1" dest="$2"
    log "백업 시작: $src"
    cp -r "$src" "$dest"
    log "완료: $dest"
}

main() {
    backup /etc /backup/etc
    backup /home /backup/home
}

main "$@"   # 스크립트 진입점`}</pre>
          </div>
          <p className="text-sm mt-2">
            <code className="px-1 bg-sidebar-bg rounded">main &quot;$@&quot;</code>를 마지막 줄에 두는 패턴은 <span className="font-medium">함수를 위에 모아두고 실행은 맨 아래</span>로 몰아, 구조를 파악하기 쉽게 만든다.
          </p>
        </SubSection>

        <SubSection title="● 함수 목록 확인">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`declare -F        # 정의된 함수 이름 나열
declare -f greet  # greet 함수의 정의 내용 출력
unset -f greet    # 함수 제거`}</pre>
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
