import { CalcBox, SubSection, Step, Insight } from "@/components/content/shared";

/** Ⅱ. 실행과 REPL — §1 코드를 실행하는 세 가지 방법, §2 REPL 다루기, §3 스크립트와 진입점 */
export default function PythonExecution() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        파이썬 코드는 <span className="font-medium">인터프리터</span>가 한 줄씩 읽어 즉시 실행한다.
        컴파일 단계가 겉으로 드러나지 않으므로, 짧은 실험은 <span className="font-medium">REPL</span>에서
        바로 확인하고 긴 프로그램은 <code className="px-1 bg-sidebar-bg rounded">.py</code> 파일로 저장해 실행한다.
      </p>

      <CalcBox title="■ §1. 코드를 실행하는 세 가지 방법">
        <SubSection title="● 방법 비교">
          <p className="text-sm">① <span className="font-medium">REPL(대화형)</span>: 터미널에서 <code className="px-1 bg-sidebar-bg rounded">python</code>을 실행하면 <code className="px-1 bg-sidebar-bg rounded">{`>>>`}</code> 프롬프트가 뜬다. 한 줄 입력 → 즉시 결과. 빠른 실험용.</p>
          <p className="text-sm">② <span className="font-medium">스크립트 파일</span>: <code className="px-1 bg-sidebar-bg rounded">hello.py</code>로 저장 후 <code className="px-1 bg-sidebar-bg rounded">python hello.py</code>. 재사용·배포에 적합.</p>
          <p className="text-sm">③ <span className="font-medium">노트북(Jupyter)</span>: 셀 단위 실행 + 결과·그래프 인라인 표시. 데이터 분석·학습용.</p>
        </SubSection>

        <SubSection title="● 첫 스크립트 실행">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`# hello.py
print("Hello, Python!")`}</pre>
          </div>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`$ python hello.py
Hello, Python!`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. REPL 다루기">
        <SubSection title="● 값을 바로 확인한다">
          <p className="text-sm">REPL에서는 <code className="px-1 bg-sidebar-bg rounded">print()</code> 없이 식만 입력해도 결과가 출력된다. 계산기처럼 즉시 실험할 수 있다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`>>> 3 + 4 * 2
11
>>> name = "파이썬"
>>> len(name)
3
>>> _        # _ 는 직전 결과값
3`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 도움말과 종료">
          <p className="text-sm">① <code className="px-1 bg-sidebar-bg rounded">help(len)</code> — 함수·객체 설명을 본다.</p>
          <p className="text-sm">② <code className="px-1 bg-sidebar-bg rounded">dir(str)</code> — 사용 가능한 메서드 목록을 본다.</p>
          <p className="text-sm">③ <code className="px-1 bg-sidebar-bg rounded">exit()</code> 또는 <code className="px-1 bg-sidebar-bg rounded">Ctrl-D</code>(Windows는 <code className="px-1 bg-sidebar-bg rounded">Ctrl-Z</code>) — REPL 종료.</p>
        </SubSection>

        <Insight>
          REPL은 &quot;문서를 찾기 전에 먼저 물어보는&quot; 도구다. 낯선 함수를 만나면 <code className="px-1 bg-sidebar-bg rounded">help()</code>와 <code className="px-1 bg-sidebar-bg rounded">dir()</code>로 직접 실험해 보는 습관이 학습 속도를 크게 높인다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ §3. 스크립트의 진입점">
        <p className="text-sm mb-2">파일이 <span className="font-medium">직접 실행</span>될 때와 다른 파일에서 <span className="font-medium">import</span>될 때를 구분하는 관용구가 있다.</p>

        <Step n={1} label="__name__ 이해하기" />
        <p className="text-sm">파이썬은 실행 중인 모듈에 <code className="px-1 bg-sidebar-bg rounded">__name__</code> 값을 자동으로 넣는다. 직접 실행하면 <code className="px-1 bg-sidebar-bg rounded">&quot;__main__&quot;</code>, import되면 모듈 이름이 된다.</p>

        <Step n={2} label="진입점 관용구" />
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`# calc.py
def add(a, b):
    return a + b

if __name__ == "__main__":
    # python calc.py 로 직접 실행할 때만 동작
    print(add(3, 4))   # 7`}</pre>
        </div>
        <p className="text-sm mt-2">이 덕분에 <code className="px-1 bg-sidebar-bg rounded">add</code> 함수는 다른 파일에서 재사용하면서도, 직접 실행할 때만 테스트 코드가 돌게 만들 수 있다.</p>

        <Insight>
          <code className="px-1 bg-sidebar-bg rounded">if __name__ == &quot;__main__&quot;:</code>는 파이썬에서 가장 자주 보게 될 관용구다. &quot;이 파일을 직접 실행했는가?&quot;를 묻는 스위치라고 기억하면 된다.
        </Insight>
      </CalcBox>
    </div>
  );
}
