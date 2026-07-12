import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 셸·터미널·스크립트 실행 — §1 터미널과 셸, §2 스크립트 실행 방법, §3 실행 흐름 */
export default function BashExecution() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        Bash 명령은 <span className="font-medium">터미널</span>에 직접 입력하거나 <span className="font-medium">스크립트 파일</span>로 실행한다.
        같은 명령이라도 어떻게 실행하느냐에 따라 권한·환경·프로세스가 달라진다.
      </p>

      <CalcBox title="■ §1. 터미널·터미널 에뮬레이터·셸">
        <p className="text-sm">
          세 용어를 자주 혼동하지만 역할이 다르다.
        </p>

        <SubSection title="● 구분">
          <p className="text-sm">① <span className="font-medium">터미널 에뮬레이터</span>: 화면에 글자를 띄우고 키 입력을 받는 프로그램 (예: GNOME Terminal, iTerm2, Windows Terminal).</p>
          <p className="text-sm">② <span className="font-medium">셸</span>: 그 안에서 명령을 해석·실행하는 프로그램 (예: bash, zsh, fish).</p>
          <p className="text-sm">③ 즉, <span className="font-medium">터미널 안에서 셸이 돌아가는</span> 구조다. 터미널은 창, 셸은 두뇌.</p>
        </SubSection>

        <SubSection title="● 현재 셸 확인">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`echo "$SHELL"      # 로그인 셸 경로 (예: /bin/bash)
bash --version     # bash 버전 확인
ps -p $$           # 현재 실행 중인 셸 프로세스 확인`}</pre>
          </div>
          <p className="text-sm mt-2">
            <code className="px-1 bg-sidebar-bg rounded">$$</code>는 현재 셸의 프로세스 ID(PID)다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 스크립트를 실행하는 세 가지 방법">
        <SubSection title="● ① 실행 권한 + 직접 실행">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`chmod +x script.sh   # 실행 권한 부여
./script.sh          # 셔뱅(#!)에 지정된 인터프리터로 실행`}</pre>
          </div>
          <p className="text-sm mt-2">
            파일 첫 줄의 셔뱅 <code className="px-1 bg-sidebar-bg rounded">#!/usr/bin/env bash</code>이 인터프리터를 결정한다.
            현재 디렉터리의 파일은 반드시 <code className="px-1 bg-sidebar-bg rounded">./</code>를 붙여야 실행된다 (PATH에 <code className="px-1 bg-sidebar-bg rounded">.</code>이 없기 때문).
          </p>
        </SubSection>

        <SubSection title="● ② 인터프리터에 명시적으로 전달">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`bash script.sh       # 셔뱅·실행권한 없어도 실행됨
bash -x script.sh    # -x: 실행되는 각 줄을 출력 (디버깅)`}</pre>
          </div>
          <p className="text-sm mt-2">
            이 방식은 실행 권한이 없어도 되며, 셔뱅을 무시하고 지정한 bash로 실행한다.
          </p>
        </SubSection>

        <SubSection title="● ③ source (현재 셸에서 실행)">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`source script.sh     # 또는  . script.sh
# 새 프로세스 없이 현재 셸에서 실행 → 변수·함수가 현재 셸에 남는다`}</pre>
          </div>
          <p className="text-sm mt-2">
            <code className="px-1 bg-sidebar-bg rounded">source</code>는 <span className="font-medium">서브셸을 만들지 않고</span> 현재 셸에서 명령을 읽어 실행한다.
            그래서 스크립트가 정의한 변수·함수가 실행 후에도 살아남는다. <code className="px-1 bg-sidebar-bg rounded">.bashrc</code>를 적용할 때 쓰는 방식.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. 실행 흐름과 서브셸">
        <p className="text-sm mb-2">
          <code className="px-1 bg-sidebar-bg rounded">./script.sh</code>나 <code className="px-1 bg-sidebar-bg rounded">bash script.sh</code>는 <span className="font-medium">새 서브셸(자식 프로세스)</span>을 만들어 그 안에서 실행한다.
          스크립트가 끝나면 서브셸이 종료되고, 그 안의 변수 변경은 부모 셸에 반영되지 않는다.
        </p>

        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`# set.sh 내용:  FOO=hello
bash set.sh        # 서브셸에서 실행 → 부모 셸의 FOO는 그대로
echo "$FOO"        # (빈 값)

source set.sh      # 현재 셸에서 실행
echo "$FOO"        # hello`}</pre>
        </div>

        <Insight>
          변수를 <span className="font-medium">현재 셸에 남기려면 source</span>, 격리된 환경에서 실행하려면 <code className="px-1 bg-sidebar-bg rounded">bash</code>·<code className="px-1 bg-sidebar-bg rounded">./</code>. 이 차이를 모르면 &quot;스크립트에서 cd 했는데 왜 원래 위치냐&quot; 같은 혼란이 생긴다.
        </Insight>
      </CalcBox>
    </div>
  );
}
