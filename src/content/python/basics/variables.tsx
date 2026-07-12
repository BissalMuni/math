import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 변수와 자료형 — §1 변수, §2 기본 자료형, §3 형 변환 */
export default function Variables() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        변수는 값에 붙이는 <span className="font-medium">이름표</span>이고, 자료형은 그 값의 종류다.
        파이썬은 타입을 미리 선언하지 않아도 대입하는 순간 자료형이 결정된다.
      </p>

      <CalcBox title="■ §1. 변수와 대입">
        <SubSection title="● 이름표로서의 변수">
          <p className="text-sm">
            <code className="px-1 bg-sidebar-bg rounded">=</code>는 &quot;같다&quot;가 아니라 <span className="font-medium">대입(assignment)</span> 연산자다.
            오른쪽 값을 계산해 왼쪽 이름에 붙인다.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`age = 20            # 정수를 age라는 이름에 대입
name = "지우"        # 문자열
age = age + 1       # 오른쪽(21)을 계산해 다시 age에 대입
print(age)          # 21`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 이름 규칙">
          <p className="text-sm">① 영문자·숫자·밑줄(<code className="px-1 bg-sidebar-bg rounded">_</code>) 사용, 숫자로 시작 불가.</p>
          <p className="text-sm">② 대소문자 구분 — <code className="px-1 bg-sidebar-bg rounded">age</code>와 <code className="px-1 bg-sidebar-bg rounded">Age</code>는 다른 변수.</p>
          <p className="text-sm">③ 관례상 소문자와 밑줄을 이어 쓴다(snake_case): <code className="px-1 bg-sidebar-bg rounded">user_name</code>.</p>
        </SubSection>

        <SubSection title="● 여러 변수 한 번에">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
            <pre>{`x, y = 1, 2         # 각각 1, 2 대입
x, y = y, x         # 값 교환 (swap) — 임시 변수 불필요
print(x, y)         # 2 1`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 기본 자료형">
        <p className="text-sm mb-2">파이썬의 대표 4가지 기본 자료형이다.</p>

        <SubSection title="● 숫자형 (int, float)">
          <p className="text-sm">① <code className="px-1 bg-sidebar-bg rounded">int</code>: 정수. 크기 제한 없음.</p>
          <p className="text-sm">② <code className="px-1 bg-sidebar-bg rounded">float</code>: 실수(소수점).</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`n = 10 ** 100       # 매우 큰 정수도 OK
pi = 3.14           # float
print(type(n))      # <class 'int'>
print(type(pi))     # <class 'float'>`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 문자열 (str)과 불리언 (bool)">
          <p className="text-sm">③ <code className="px-1 bg-sidebar-bg rounded">str</code>: 따옴표로 감싼 텍스트. 작은따옴표·큰따옴표 모두 가능.</p>
          <p className="text-sm">④ <code className="px-1 bg-sidebar-bg rounded">bool</code>: 참/거짓. <code className="px-1 bg-sidebar-bg rounded">True</code> 또는 <code className="px-1 bg-sidebar-bg rounded">False</code> (첫 글자 대문자).</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`msg = "안녕하세요"
is_ready = True
print(type(msg))    # <class 'str'>
print(type(is_ready))  # <class 'bool'>`}</pre>
          </div>
        </SubSection>

        <Insight>
          <code className="px-1 bg-sidebar-bg rounded">type(값)</code>으로 언제든 자료형을 확인할 수 있다.
          <code className="px-1 bg-sidebar-bg rounded">None</code>은 &quot;값이 없음&quot;을 나타내는 특별한 값으로, 자료형은 <code className="px-1 bg-sidebar-bg rounded">NoneType</code>이다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ §3. 형 변환 (type casting)">
        <p className="text-sm mb-2">자료형이 다르면 연산이 막힌다. 필요할 때 명시적으로 변환한다.</p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
          <pre>{`age = input("나이? ")    # input()은 항상 str 반환
age = int(age)          # 문자열 "20" -> 정수 20
print(age + 1)          # 21

x = 3.9
print(int(x))           # 3  (버림)
print(str(x) + "살")     # "3.9살"  (숫자를 문자열로)`}</pre>
        </div>
        <Insight>
          <code className="px-1 bg-sidebar-bg rounded">int("abc")</code>처럼 변환 불가능한 값을 넣으면 <code className="px-1 bg-sidebar-bg rounded">ValueError</code>가 발생한다.
          사용자 입력은 반드시 형 변환을 거쳐야 숫자 연산이 가능하다.
        </Insight>
      </CalcBox>
    </div>
  );
}
