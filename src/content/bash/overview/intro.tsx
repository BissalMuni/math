import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. Bash란 무엇인가 — §1 셸의 정체, §2 왜 Bash를 배우는가 */
export default function BashIntro() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        Bash(Bourne-Again SHell)는 리눅스와 macOS의 기본 <span className="font-medium">셸(shell)</span>이다.
        키보드로 입력한 명령을 해석해 운영체제에 전달하는 프로그램이자, 그 명령들을 파일에 모아 자동 실행하는 스크립트 언어다.
      </p>

      <CalcBox title="■ §1. 셸이란 무엇인가">
        <p className="text-sm">
          셸은 사용자와 운영체제 커널 사이의 <span className="font-medium">대화 창구</span>다.
          사용자가 <code className="px-1 bg-sidebar-bg rounded">ls</code>를 입력하면 셸이 이를 해석해 커널에 &quot;디렉터리 목록을 달라&quot;고 요청하고, 결과를 화면에 돌려준다.
        </p>

        <SubSection title="● 대화형 vs 스크립트">
          <p className="text-sm">① <span className="font-medium">대화형(interactive)</span>: 터미널에 한 줄씩 입력하고 즉시 결과를 본다.</p>
          <p className="text-sm">② <span className="font-medium">스크립트(script)</span>: 여러 명령을 <code className="px-1 bg-sidebar-bg rounded">.sh</code> 파일에 저장해 한 번에 실행한다. 반복 작업 자동화의 핵심.</p>
        </SubSection>

        <SubSection title="● 첫 스크립트">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
            <pre>{`#!/usr/bin/env bash
# 셔뱅(#!)은 이 파일을 bash로 실행하라는 지시
echo "안녕하세요, Bash!"`}</pre>
          </div>
          <p className="text-sm mt-2">
            첫 줄 <span className="font-medium">셔뱅(shebang)</span> <code className="px-1 bg-sidebar-bg rounded">#!/usr/bin/env bash</code>은 이 파일을 어떤 프로그램으로 실행할지 지정한다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 왜 Bash를 배우는가">
        <p className="text-sm mb-2">① 서버 운영·배포·CI 파이프라인 대부분이 Bash 스크립트로 돌아간다.</p>
        <p className="text-sm mb-2">② 작은 명령들을 <span className="font-medium">파이프(|)</span>로 조합해 강력한 데이터 처리를 만든다.</p>
        <p className="text-sm">③ 별도 설치 없이 거의 모든 유닉스 계열 시스템에서 바로 쓸 수 있다.</p>

        <Insight>
          Bash의 철학은 &quot;한 가지 일을 잘 하는 작은 도구들을 조합하라&quot;(유닉스 철학). 큰 프로그램 하나보다 <code className="px-1 bg-sidebar-bg rounded">grep · sort · awk</code>를 파이프로 잇는 편이 빠르고 유연하다.
        </Insight>
      </CalcBox>
    </div>
  );
}
