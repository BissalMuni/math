import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 파라미터 확장 — §1 기본값·대체, §2 부분 문자열·길이, §3 패턴 제거·치환 */
export default function BashParameterExpansion() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        파라미터 확장은 <code className="px-1 bg-sidebar-bg rounded">{'${...}'}</code> 안에서 변수를 <span className="font-medium">가공·판별</span>하는 문법이다.
        기본값 설정, 문자열 잘라내기, 확장자 제거 등을 외부 명령 없이 셸 내부에서 처리한다.
      </p>

      <CalcBox title="■ §1. 기본값과 대체">
        <SubSection title="● 값이 없을 때 처리">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`\${var:-기본값}   # var가 비었으면 "기본값" 사용 (var는 그대로)
\${var:=기본값}   # var가 비었으면 "기본값"을 대입까지 함
\${var:+대체값}   # var가 있으면 "대체값", 없으면 빈 값
\${var:?메시지}   # var가 비었으면 메시지 출력 후 에러 종료`}</pre>
          </div>
          <p className="text-sm mt-2">
            예: <code className="px-1 bg-sidebar-bg rounded">{'name=${1:-anonymous}'}</code> — 첫 인자가 없으면 <code className="px-1 bg-sidebar-bg rounded">anonymous</code>를 쓴다.
          </p>
        </SubSection>

        <SubSection title="● 필수 인자 검증">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`: "\${1:?사용법: backup.sh <파일명>}"
# 첫 인자가 없으면 메시지 출력 후 스크립트 중단`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 길이와 부분 문자열">
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`str="hello world"
echo "\${#str}"        # 11   (문자열 길이)
echo "\${str:0:5}"     # hello  (0번부터 5글자)
echo "\${str:6}"       # world  (6번부터 끝까지)
echo "\${str: -5}"     # world  (뒤에서 5글자, 콜론 뒤 공백 주의)`}</pre>
        </div>
        <p className="text-sm mt-2">
          <code className="px-1 bg-sidebar-bg rounded">{'${#var}'}</code>는 길이, <code className="px-1 bg-sidebar-bg rounded">{'${var:시작:개수}'}</code>는 부분 문자열이다.
        </p>
      </CalcBox>

      <CalcBox title="■ §3. 패턴 제거와 치환">
        <p className="text-sm mb-2">
          파일 경로·확장자 처리에 가장 많이 쓰는 확장이다.
        </p>

        <SubSection title="● 앞/뒤에서 패턴 제거">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`path="/home/user/report.txt"
echo "\${path#*/}"    # home/user/report.txt  (앞에서 최소 매칭 제거)
echo "\${path##*/}"   # report.txt            (앞에서 최대 매칭 = basename)
echo "\${path%.txt}"  # /home/user/report     (뒤에서 최소 매칭 제거)
echo "\${path%/*}"    # /home/user            (뒤에서 = dirname)`}</pre>
          </div>
          <p className="text-sm mt-2">
            <code className="px-1 bg-sidebar-bg rounded">#</code>는 앞쪽, <code className="px-1 bg-sidebar-bg rounded">%</code>는 뒤쪽에서 제거한다. 하나면 최소, 둘이면 최대 매칭.
          </p>
        </SubSection>

        <SubSection title="● 문자열 치환">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`s="a-b-c-d"
echo "\${s/-/_}"    # a_b-c-d   (첫 번째만 치환)
echo "\${s//-/_}"   # a_b_c_d   (모두 치환)
echo "\${s^^}"      # A-B-C-D   (대문자로)
echo "\${s,,}"      # a-b-c-d   (소문자로)`}</pre>
          </div>
        </SubSection>

        <Insight>
          <code className="px-1 bg-sidebar-bg rounded">{'${file##*/}'}</code>는 <code className="px-1 bg-sidebar-bg rounded">basename</code>, <code className="px-1 bg-sidebar-bg rounded">{'${file%/*}'}</code>는 <code className="px-1 bg-sidebar-bg rounded">dirname</code>과 같다. 외부 프로그램을 부르지 않으니 반복문 안에서 훨씬 빠르다.
        </Insight>
      </CalcBox>
    </div>
  );
}
