import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 연산자와 문자열 — §1 산술·비교·논리, §2 문자열 다루기, §3 f-문자열 */
export default function Operators() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        연산자는 값을 계산·비교·조합하는 기호다. 문자열도 연산자로 이어 붙이고 잘라낼 수 있다.
        여기서는 파이썬의 핵심 연산자와 문자열 다루기를 정리한다.
      </p>

      <CalcBox title="■ §1. 연산자">
        <SubSection title="● 산술 연산자">
          <p className="text-sm">일반 사칙연산에 더해 <code className="px-1 bg-sidebar-bg rounded">//</code>(몫), <code className="px-1 bg-sidebar-bg rounded">%</code>(나머지), <code className="px-1 bg-sidebar-bg rounded">**</code>(거듭제곱)이 있다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`print(7 / 2)    # 3.5   (일반 나눗셈, 결과는 float)
print(7 // 2)   # 3     (몫)
print(7 % 2)    # 1     (나머지)
print(2 ** 10)  # 1024  (거듭제곱)`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 비교 연산자와 논리 연산자">
          <p className="text-sm">① 비교: <code className="px-1 bg-sidebar-bg rounded">== != &gt; &lt; &gt;= &lt;=</code> — 결과는 항상 <code className="px-1 bg-sidebar-bg rounded">bool</code>.</p>
          <p className="text-sm">② 논리: <code className="px-1 bg-sidebar-bg rounded">and</code>, <code className="px-1 bg-sidebar-bg rounded">or</code>, <code className="px-1 bg-sidebar-bg rounded">not</code> — 기호가 아닌 영어 단어를 쓴다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`age = 20
print(age >= 18)              # True
print(age >= 18 and age < 65) # True
print(not (age == 20))        # False
print(1 <= age <= 100)        # True  (연쇄 비교 가능)`}</pre>
          </div>
        </SubSection>

        <Insight>
          <code className="px-1 bg-sidebar-bg rounded">and</code>/<code className="px-1 bg-sidebar-bg rounded">or</code>는 <span className="font-medium">단축 평가(short-circuit)</span>를 한다.
          <code className="px-1 bg-sidebar-bg rounded">x != 0 and 10 / x &gt; 1</code>에서 <code className="px-1 bg-sidebar-bg rounded">x</code>가 0이면 앞이 거짓이라 뒤 나눗셈은 아예 실행되지 않는다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ §2. 문자열 다루기">
        <SubSection title="● 연결·반복·인덱싱">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
            <pre>{`s = "Python"
print(s + "3")     # Python3   (연결)
print("=" * 10)    # ==========  (반복)
print(s[0])        # P         (0번부터 시작)
print(s[-1])       # n         (음수는 뒤에서부터)
print(len(s))      # 6         (길이)`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 슬라이싱 [시작:끝:간격]">
          <p className="text-sm">끝 인덱스는 <span className="font-medium">포함되지 않는다</span>. 생략하면 처음/끝까지.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`s = "Python"
print(s[0:3])   # Pyt   (0,1,2번)
print(s[2:])    # thon  (2번부터 끝까지)
print(s[:2])    # Py    (처음부터 1번까지)
print(s[::-1])  # nohtyP  (역순)`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 유용한 메서드">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
            <pre>{`text = "  Hello World  "
print(text.strip())        # "Hello World" (양끝 공백 제거)
print(text.upper())        # "  HELLO WORLD  "
print("a,b,c".split(","))  # ['a', 'b', 'c']
print("-".join(["x","y"])) # "x-y"
print("World" in text)     # True (포함 여부)`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. f-문자열 (f-string)">
        <p className="text-sm mb-2">
          문자열 앞에 <code className="px-1 bg-sidebar-bg rounded">f</code>를 붙이면 중괄호 <code className="px-1 bg-sidebar-bg rounded">{`{}`}</code> 안에 변수와 식을 바로 넣을 수 있다. 가장 권장되는 포매팅 방식이다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
          <pre>{`name, score = "지우", 87.5
print(f"{name}님의 점수는 {score}점")   # 지우님의 점수는 87.5점
print(f"합계: {10 + 20}")               # 합계: 30  (식도 가능)
print(f"{score:.1f}")                   # 87.5      (소수 1자리)
print(f"{1234567:,}")                   # 1,234,567 (천 단위 콤마)`}</pre>
        </div>
        <Insight>
          <code className="px-1 bg-sidebar-bg rounded">{`{값:.2f}`}</code>는 소수 둘째 자리, <code className="px-1 bg-sidebar-bg rounded">{`{값:,}`}</code>는 천 단위 콤마, <code className="px-1 bg-sidebar-bg rounded">{`{값:>10}`}</code>는 폭 10칸 오른쪽 정렬. 콜론 뒤 <span className="font-medium">서식 지정자</span>로 출력 형태를 정밀하게 제어한다.
        </Insight>
      </CalcBox>
    </div>
  );
}
