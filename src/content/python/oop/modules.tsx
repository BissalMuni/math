import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 모듈과 패키지 — §1 import, §2 표준 라이브러리, §3 패키지와 pip */
export default function Modules() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        모듈은 함수·클래스를 담은 <span className="font-medium">.py 파일 하나</span>, 패키지는 여러 모듈을 묶은 <span className="font-medium">폴더</span>다.
        <code className="px-1 bg-sidebar-bg rounded">import</code>로 남이 만든 코드를 가져와 재사용한다.
      </p>

      <CalcBox title="■ §1. import 방식">
        <SubSection title="● 세 가지 import 형태">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
            <pre>{`import math                 # 모듈 전체
print(math.sqrt(16))        # 4.0  (math. 접두사 필요)

from math import sqrt, pi   # 특정 이름만
print(sqrt(16), pi)         # 4.0 3.141592653589793

import math as m            # 별칭
print(m.factorial(5))       # 120`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 내 모듈 만들기">
          <p className="text-sm"><code className="px-1 bg-sidebar-bg rounded">mymath.py</code>를 만들면 같은 폴더에서 <code className="px-1 bg-sidebar-bg rounded">import mymath</code>로 불러온다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`# mymath.py
def add(a, b):
    return a + b

# main.py (같은 폴더)
import mymath
print(mymath.add(2, 3))     # 5`}</pre>
          </div>
        </SubSection>

        <Insight>
          <code className="px-1 bg-sidebar-bg rounded">from module import *</code>(전부 가져오기)는 어떤 이름이 딸려오는지 불투명해 이름 충돌을 일으키기 쉽다. 필요한 것만 명시하는 편이 안전하다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ §2. 표준 라이브러리">
        <p className="text-sm mb-2">파이썬은 &quot;배터리 포함(batteries included)&quot; 철학으로, 설치 없이 바로 쓰는 유용한 모듈이 많다.</p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
          <pre>{`import random
print(random.randint(1, 6))       # 1~6 주사위
print(random.choice(["가", "나"])) # 무작위 선택

import datetime
print(datetime.date.today())      # 2026-07-11

import json
data = json.dumps({"name": "지우"})  # 딕셔너리 -> JSON 문자열

import os
print(os.getcwd())                # 현재 작업 폴더`}</pre>
        </div>
        <Insight>
          자주 쓰이는 표준 모듈: <code className="px-1 bg-sidebar-bg rounded">math</code>(수학), <code className="px-1 bg-sidebar-bg rounded">random</code>(난수), <code className="px-1 bg-sidebar-bg rounded">datetime</code>(날짜), <code className="px-1 bg-sidebar-bg rounded">json</code>(직렬화), <code className="px-1 bg-sidebar-bg rounded">os</code>·<code className="px-1 bg-sidebar-bg rounded">sys</code>(시스템), <code className="px-1 bg-sidebar-bg rounded">collections</code>(자료구조).
        </Insight>
      </CalcBox>

      <CalcBox title="■ §3. 외부 패키지와 pip">
        <SubSection title="● pip으로 설치">
          <p className="text-sm">표준 라이브러리에 없는 기능은 PyPI에서 <code className="px-1 bg-sidebar-bg rounded">pip</code>으로 설치한다(터미널에서 실행).</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`pip install requests      # 설치
pip list                  # 설치된 패키지 목록
pip install requests==2.31.0   # 버전 지정`}</pre>
          </div>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`import requests
r = requests.get("https://api.github.com")
print(r.status_code)      # 200`}</pre>
          </div>
        </SubSection>

        <SubSection title="● __name__ == &quot;__main__&quot;">
          <p className="text-sm">파일이 직접 실행됐는지, import된 건지 구분하는 관용구다. 모듈로 불러올 때는 아래 블록이 실행되지 않는다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`def main():
    print("프로그램 시작")

if __name__ == "__main__":
    main()   # 이 파일을 직접 실행할 때만 동작`}</pre>
          </div>
        </SubSection>

        <Insight>
          프로젝트마다 <span className="font-medium">가상환경(venv)</span>을 따로 두면 패키지 버전이 프로젝트별로 격리된다:
          <code className="px-1 bg-sidebar-bg rounded">python -m venv .venv</code> 후 활성화하고 <code className="px-1 bg-sidebar-bg rounded">pip install</code>. 협업 시엔 <code className="px-1 bg-sidebar-bg rounded">requirements.txt</code>로 의존성을 공유한다.
        </Insight>
      </CalcBox>
    </div>
  );
}
