import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 조건문과 test — §1 if 구조, §2 test와 [ ], §3 [[ ]] 확장 */
export default function BashConditionals() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        Bash의 조건문은 <span className="font-medium">명령의 종료 상태(exit status)</span>로 판단한다.
        <code className="px-1 bg-sidebar-bg rounded">0</code>이면 참, 0이 아니면 거짓 — 일반 프로그래밍 언어와 반대라 처음엔 헷갈린다.
      </p>

      <CalcBox title="■ §1. if 구조">
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`if [ "$age" -ge 18 ]; then
    echo "성인"
elif [ "$age" -ge 13 ]; then
    echo "청소년"
else
    echo "어린이"
fi`}</pre>
        </div>
        <p className="text-sm mt-2">
          <code className="px-1 bg-sidebar-bg rounded">if</code> 뒤에는 <span className="font-medium">명령</span>이 온다. <code className="px-1 bg-sidebar-bg rounded">[ ... ]</code> 자체가 <code className="px-1 bg-sidebar-bg rounded">test</code>라는 명령이다. <code className="px-1 bg-sidebar-bg rounded">then</code> 앞의 세미콜론에 주의.
        </p>

        <SubSection title="● 종료 상태로 바로 분기">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`if grep -q "error" log.txt; then
    echo "에러 발견"
fi

# && (성공 시), || (실패 시) 로 짧게도 가능
mkdir build && cd build
ping -c1 host || echo "연결 실패"`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. test와 [ ] — 비교 연산자">
        <SubSection title="● 숫자 비교">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`[ "$a" -eq "$b" ]   # 같다 (equal)
[ "$a" -ne "$b" ]   # 다르다 (not equal)
[ "$a" -lt "$b" ]   # 작다 (less than)
[ "$a" -le "$b" ]   # 작거나 같다
[ "$a" -gt "$b" ]   # 크다 (greater than)
[ "$a" -ge "$b" ]   # 크거나 같다`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 문자열 비교">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`[ "$s" = "hello" ]  # 문자열 같다
[ "$s" != "bye" ]   # 문자열 다르다
[ -z "$s" ]         # 비었다 (zero length)
[ -n "$s" ]         # 비어있지 않다 (non-zero)`}</pre>
          </div>
          <p className="text-sm mt-2">문자열 비교에는 <code className="px-1 bg-sidebar-bg rounded">=</code>, 숫자 비교에는 <code className="px-1 bg-sidebar-bg rounded">-eq</code>를 쓴다. 섞으면 원치 않는 결과가 난다.</p>
        </SubSection>

        <SubSection title="● 파일 검사">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`[ -e path ]   # 존재 (exist)
[ -f path ]   # 일반 파일
[ -d path ]   # 디렉터리
[ -r path ]   # 읽기 가능
[ -w path ]   # 쓰기 가능
[ -x path ]   # 실행 가능
[ -s path ]   # 존재하고 크기 > 0`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. [[ ]] — Bash 확장 조건식">
        <p className="text-sm mb-2">
          <code className="px-1 bg-sidebar-bg rounded">[[ ]]</code>는 Bash 전용으로, <code className="px-1 bg-sidebar-bg rounded">[ ]</code>보다 안전하고 강력하다.
        </p>

        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`# 따옴표 없이도 빈 값에 안전, && || 사용 가능
if [[ -f "$file" && -r "$file" ]]; then
    echo "읽을 수 있는 파일"
fi

# 패턴 매칭 (=~ 는 정규식, == 는 글로브)
if [[ "$name" == 김* ]]; then echo "김씨"; fi
if [[ "$email" =~ ^[a-z]+@[a-z]+\\.com$ ]]; then echo "이메일 형식"; fi`}</pre>
        </div>

        <Insight>
          새 스크립트에서는 <span className="font-medium"><code className="px-1 bg-sidebar-bg rounded">[[ ]]</code>를 기본으로</span> 쓰자. 단어 분리·글로빙 걱정이 없고 <code className="px-1 bg-sidebar-bg rounded">&amp;&amp;</code>, <code className="px-1 bg-sidebar-bg rounded">||</code>, 패턴 매칭(<code className="px-1 bg-sidebar-bg rounded">==</code>, <code className="px-1 bg-sidebar-bg rounded">=~</code>)까지 지원한다. 이식성이 중요한 POSIX sh 스크립트에서만 <code className="px-1 bg-sidebar-bg rounded">[ ]</code>를 쓴다.
        </Insight>
      </CalcBox>
    </div>
  );
}
