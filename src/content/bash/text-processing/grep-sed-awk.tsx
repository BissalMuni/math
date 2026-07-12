import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. grep·sed·awk — §1 grep 검색, §2 sed 치환, §3 awk 필드 처리 */
export default function BashGrepSedAwk() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        텍스트 처리 삼총사: <span className="font-medium">grep</span>은 찾고, <span className="font-medium">sed</span>는 바꾸고, <span className="font-medium">awk</span>는 열 단위로 계산한다.
        세 도구를 파이프로 이으면 대부분의 로그·데이터 처리가 한 줄로 끝난다.
      </p>

      <CalcBox title="■ §1. grep — 패턴으로 줄 찾기">
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`grep "error" log.txt        # error 포함 줄
grep -i "error" log.txt     # 대소문자 무시
grep -v "debug" log.txt     # debug 없는 줄 (반전)
grep -n "TODO" *.js         # 줄 번호와 함께
grep -r "apiKey" src/       # 디렉터리 재귀 검색
grep -c "404" access.log    # 매칭된 줄 개수만`}</pre>
        </div>

        <SubSection title="● 정규식 grep">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`grep -E "warn|error|fatal" log.txt   # -E: 확장 정규식, | 로 OR
grep -E "^[0-9]{3}" data.txt          # 세 자리 숫자로 시작하는 줄
grep -oE "[0-9]+" data.txt            # -o: 매칭 부분만 추출`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. sed — 줄 편집·치환">
        <SubSection title="● 치환 (s 명령)">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`sed 's/foo/bar/' file       # 각 줄 첫 foo → bar
sed 's/foo/bar/g' file      # g: 줄 안의 모든 foo 치환
sed 's/foo/bar/gi' file     # i: 대소문자 무시
sed -i 's/foo/bar/g' file   # -i: 파일을 직접 수정 (제자리)`}</pre>
          </div>
          <p className="text-sm mt-2">
            형식은 <code className="px-1 bg-sidebar-bg rounded">s/찾을것/바꿀것/플래그</code>다. <code className="px-1 bg-sidebar-bg rounded">-i</code>는 원본을 덮어쓰므로 먼저 백업(<code className="px-1 bg-sidebar-bg rounded">-i.bak</code>)을 권장한다.
          </p>
        </SubSection>

        <SubSection title="● 줄 선택·삭제·출력">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`sed -n '5,10p' file      # 5~10번째 줄만 출력 (-n: 자동출력 끔, p: 출력)
sed '3d' file            # 3번째 줄 삭제
sed '/^#/d' file         # # 로 시작하는 주석 줄 삭제`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. awk — 필드 단위 처리">
        <p className="text-sm mb-2">
          awk는 각 줄을 <span className="font-medium">필드(열)</span>로 쪼개 <code className="px-1 bg-sidebar-bg rounded">$1</code>, <code className="px-1 bg-sidebar-bg rounded">$2</code>...로 다룬다. <code className="px-1 bg-sidebar-bg rounded">$0</code>은 줄 전체, <code className="px-1 bg-sidebar-bg rounded">NR</code>은 줄 번호다.
        </p>

        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`awk '{print $1}' file            # 첫째 열만
awk '{print $1, $3}' file        # 1·3열
awk -F: '{print $1}' /etc/passwd # -F: 구분자를 : 로 (사용자명)
awk 'NR==1 {print}' file         # 첫째 줄만`}</pre>
        </div>

        <SubSection title="● 조건과 계산">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`awk '$3 > 100 {print $1}' data     # 3열이 100 초과인 줄의 1열
awk '{sum += $2} END {print sum}' data   # 2열 합계
awk '{count++} END {print count}' file   # 줄 수 세기 (wc -l 대용)`}</pre>
          </div>
          <p className="text-sm mt-2">
            <code className="px-1 bg-sidebar-bg rounded">END {'{...}'}</code> 블록은 <span className="font-medium">모든 줄을 다 읽은 뒤</span> 한 번 실행된다. 합계·평균·집계에 쓴다.
          </p>
        </SubSection>

        <Insight>
          <span className="font-medium">역할 분담을 기억하자</span>: 줄을 <span className="font-medium">찾을 때 grep</span>, 문자열을 <span className="font-medium">바꿀 때 sed</span>, 열을 <span className="font-medium">골라 계산할 때 awk</span>. 셋을 파이프로 잇는 <code className="px-1 bg-sidebar-bg rounded">grep ... | awk ...</code>가 Bash 데이터 처리의 표준 문법이다.
        </Insight>
      </CalcBox>
    </div>
  );
}
