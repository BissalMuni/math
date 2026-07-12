import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 파이프와 리다이렉션 — §1 표준 스트림, §2 리다이렉션, §3 파이프 */
export default function BashPipesRedirection() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        모든 명령에는 <span className="font-medium">입력 하나, 출력 둘</span>(정상·에러)의 스트림이 있다.
        이들을 파일로 돌리거나(리다이렉션) 다른 명령에 흘려보내는(파이프) 것이 유닉스 조합의 핵심이다.
      </p>

      <CalcBox title="■ §1. 세 가지 표준 스트림">
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`0  stdin   표준 입력  (키보드)
1  stdout  표준 출력  (정상 결과)
2  stderr  표준 에러  (에러 메시지)`}</pre>
        </div>
        <p className="text-sm mt-2">
          숫자 <code className="px-1 bg-sidebar-bg rounded">0 1 2</code>는 <span className="font-medium">파일 디스크립터</span>다. 리다이렉션은 이 번호로 어느 스트림을 어디로 보낼지 지정한다. 정상 결과와 에러가 <span className="font-medium">분리</span>되어 있어 각각 따로 다룰 수 있다.
        </p>
      </CalcBox>

      <CalcBox title="■ §2. 리다이렉션 — 파일로 방향 바꾸기">
        <SubSection title="● 출력 저장">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`echo "hi" > out.txt    # 덮어쓰기 (기존 내용 삭제)
echo "hi" >> out.txt   # 이어 붙이기 (append)
sort < data.txt        # 파일을 표준 입력으로`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 에러 스트림 다루기">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`cmd 2> error.log       # 에러만 파일로
cmd > out.txt 2>&1     # 정상+에러 모두 out.txt로 (순서 중요)
cmd &> all.txt         # 위와 동일한 축약형 (bash)
cmd 2> /dev/null       # 에러 버리기 (블랙홀)`}</pre>
          </div>
          <p className="text-sm mt-2">
            <code className="px-1 bg-sidebar-bg rounded">2&gt;&amp;1</code>은 &quot;2번(에러)을 1번(정상)이 가는 곳으로&quot;라는 뜻이다. <code className="px-1 bg-sidebar-bg rounded">&gt; out.txt</code>가 <span className="font-medium">먼저</span> 와야 에러도 파일로 간다.
          </p>
        </SubSection>

        <SubSection title="● 히어독 (여러 줄 입력)">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`cat << 'EOF' > config.txt
host = localhost
port = 8080
EOF`}</pre>
          </div>
          <p className="text-sm mt-2">
            <code className="px-1 bg-sidebar-bg rounded">&lt;&lt; EOF</code>는 <code className="px-1 bg-sidebar-bg rounded">EOF</code>가 나올 때까지의 여러 줄을 입력으로 준다. 구분자를 <code className="px-1 bg-sidebar-bg rounded">&apos;EOF&apos;</code>처럼 따옴표로 감싸면 변수 확장을 막는다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. 파이프 — 명령을 잇는다">
        <p className="text-sm mb-2">
          <code className="px-1 bg-sidebar-bg rounded">|</code>는 왼쪽 명령의 <span className="font-medium">표준 출력</span>을 오른쪽 명령의 <span className="font-medium">표준 입력</span>으로 연결한다. 작은 도구를 조합해 큰 처리를 만든다.
        </p>

        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`# 접속 로그에서 IP별 접속 수 상위 5개
cat access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -5

# 프로세스 중 nginx만 세기
ps aux | grep nginx | grep -v grep | wc -l`}</pre>
        </div>

        <SubSection title="● tee — 흐름을 파일에도 복사">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`make 2>&1 | tee build.log   # 화면에 보이면서 파일에도 저장`}</pre>
          </div>
        </SubSection>

        <Insight>
          파이프는 &quot;작은 도구 여럿을 조합하라&quot;는 <span className="font-medium">유닉스 철학의 실체</span>다. <code className="px-1 bg-sidebar-bg rounded">|</code>는 stdout만 넘긴다는 점을 기억하자 — 에러(stderr)도 넘기려면 <code className="px-1 bg-sidebar-bg rounded">2&gt;&amp;1</code>을 앞에 붙인다.
        </Insight>
      </CalcBox>
    </div>
  );
}
