import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 변수와 따옴표 — §1 변수 선언·참조, §2 따옴표 세 종류, §3 특수 변수 */
export default function BashVariables() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        Bash에서 변수는 <span className="font-medium">타입이 없는 문자열</span>이 기본이다.
        선언·참조 문법은 간단하지만, 따옴표를 잘못 쓰면 공백·특수문자에서 예상 못한 버그가 난다.
      </p>

      <CalcBox title="■ §1. 변수 선언과 참조">
        <p className="text-sm">
          대입할 때는 <span className="font-medium">등호 양옆에 공백이 없어야</span> 한다. 참조할 때는 <code className="px-1 bg-sidebar-bg rounded">$</code>를 붙인다.
        </p>

        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`name="철수"       # O: 공백 없음
name = "철수"     # X: name이라는 명령을 찾으려 함 → 에러
echo "$name"      # 철수
echo "\${name}!"   # 철수!  중괄호로 이름 경계 명확히`}</pre>
        </div>

        <SubSection title="● 중괄호로 이름 경계 표시">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`file="report"
echo "$file_final"   # file_final 이라는 (없는) 변수 → 빈 값
echo "\${file}_final" # report_final  중괄호로 경계 지정`}</pre>
          </div>
          <p className="text-sm mt-2">
            변수 이름 뒤에 문자가 이어질 때는 <code className="px-1 bg-sidebar-bg rounded">{'${file}'}</code>처럼 중괄호로 감싸 어디까지가 이름인지 알려준다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 따옴표 세 종류">
        <p className="text-sm mb-2">
          따옴표는 단순 장식이 아니라 <span className="font-medium">확장(expansion) 여부를 결정</span>하는 문법이다.
        </p>

        <SubSection title="● 큰따옴표 (변수 확장 O)">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`name="철수"
echo "안녕 $name"      # 안녕 철수  (변수 확장됨)
echo "오늘은 $(date)"  # 명령 치환도 됨`}</pre>
          </div>
          <p className="text-sm mt-2">변수·명령 치환은 하되 단어 분리와 글로빙(<code className="px-1 bg-sidebar-bg rounded">*</code>)은 막는다. <span className="font-medium">가장 자주 쓰는 안전한 기본값.</span></p>
        </SubSection>

        <SubSection title="● 작은따옴표 (확장 없음, 그대로)">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`echo '안녕 $name'   # 안녕 $name   (문자 그대로)`}</pre>
          </div>
          <p className="text-sm mt-2">내부의 모든 문자를 <span className="font-medium">문자 그대로</span> 취급한다. <code className="px-1 bg-sidebar-bg rounded">$</code>, <code className="px-1 bg-sidebar-bg rounded">*</code>도 특수 의미가 사라진다.</p>
        </SubSection>

        <SubSection title="● 따옴표 없음 (단어 분리 + 글로빙 발생)">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`files="a.txt b.txt"
rm $files    # rm a.txt b.txt 로 분리됨 (의도적일 때만)

path="/tmp/my dir"
cd $path     # cd /tmp/my  dir → 인자 2개로 쪼개져 실패
cd "$path"   # O: 공백 있는 경로 안전`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. 자주 쓰는 특수 변수">
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`$0    # 스크립트 이름
$1 $2 # 첫째·둘째 인자
$#    # 인자 개수
$@    # 모든 인자 (개별 단어로) — "$@" 형태가 정석
$?    # 직전 명령의 종료 상태 (0=성공)
$$    # 현재 셸의 PID
$!    # 마지막 백그라운드 프로세스의 PID`}</pre>
        </div>

        <Insight>
          <span className="font-medium">변수는 항상 큰따옴표로 감싸라</span>: <code className="px-1 bg-sidebar-bg rounded">&quot;$var&quot;</code>, <code className="px-1 bg-sidebar-bg rounded">&quot;$@&quot;</code>. 공백·빈 값·특수문자로 인한 버그의 대부분이 따옴표 누락에서 온다. 의도적으로 분리·글로빙을 원할 때만 따옴표를 뺀다.
        </Insight>
      </CalcBox>
    </div>
  );
}
