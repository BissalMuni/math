import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 조건문 — §1 if-elif-else, §2 참·거짓 판단, §3 삼항·match */
export default function Conditionals() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        조건문은 상황에 따라 다른 코드를 실행하게 만든다. 파이썬은 들여쓰기로 블록을 구분하므로
        <code className="px-1 bg-sidebar-bg rounded">if</code> 뒤 콜론(<code className="px-1 bg-sidebar-bg rounded">:</code>)과 들여쓰기를 정확히 지켜야 한다.
      </p>

      <CalcBox title="■ §1. if · elif · else">
        <SubSection title="● 기본 구조">
          <p className="text-sm">조건이 <code className="px-1 bg-sidebar-bg rounded">True</code>인 첫 블록만 실행되고 나머지는 건너뛴다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`score = 82

if score >= 90:
    grade = "A"
elif score >= 80:       # 위 조건이 거짓일 때만 검사
    grade = "B"
elif score >= 70:
    grade = "C"
else:                   # 모두 거짓이면
    grade = "F"

print(grade)            # B`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 중첩과 논리 연산 결합">
          <p className="text-sm">깊은 중첩보다 <code className="px-1 bg-sidebar-bg rounded">and</code>/<code className="px-1 bg-sidebar-bg rounded">or</code>로 조건을 합치는 편이 읽기 쉽다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`age, has_ticket = 20, True

if age >= 18 and has_ticket:
    print("입장 가능")
else:
    print("입장 불가")`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 무엇이 참이고 무엇이 거짓인가">
        <p className="text-sm mb-2">
          파이썬은 <code className="px-1 bg-sidebar-bg rounded">bool</code>이 아니어도 조건에서 참/거짓으로 해석한다(<span className="font-medium">truthy / falsy</span>).
        </p>
        <p className="text-sm">① <span className="font-medium">거짓(falsy)</span>: <code className="px-1 bg-sidebar-bg rounded">0</code>, <code className="px-1 bg-sidebar-bg rounded">0.0</code>, <code className="px-1 bg-sidebar-bg rounded">&quot;&quot;</code>(빈 문자열), <code className="px-1 bg-sidebar-bg rounded">[]</code>·<code className="px-1 bg-sidebar-bg rounded">{`{}`}</code>(빈 컨테이너), <code className="px-1 bg-sidebar-bg rounded">None</code>, <code className="px-1 bg-sidebar-bg rounded">False</code>.</p>
        <p className="text-sm">② <span className="font-medium">참(truthy)</span>: 그 외 대부분의 값.</p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`name = ""
if name:               # 빈 문자열은 거짓
    print("이름 있음")
else:
    print("이름 없음")  # 이렇게 출력됨

items = [1, 2]
if items:              # 비어있지 않으면 참
    print("목록에 항목 있음")`}</pre>
        </div>
        <Insight>
          <code className="px-1 bg-sidebar-bg rounded">if len(items) &gt; 0:</code> 대신 <code className="px-1 bg-sidebar-bg rounded">if items:</code>를 쓰는 것이 파이썬다운(Pythonic) 방식이다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ §3. 삼항 표현식과 match">
        <SubSection title="● 삼항 표현식">
          <p className="text-sm">한 줄로 값을 조건에 따라 선택한다: <code className="px-1 bg-sidebar-bg rounded">A if 조건 else B</code>.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`score = 82
result = "합격" if score >= 60 else "불합격"
print(result)          # 합격`}</pre>
          </div>
        </SubSection>

        <SubSection title="● match-case (파이썬 3.10+)">
          <p className="text-sm">값을 여러 패턴과 비교한다. 다른 언어의 switch와 비슷하다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`command = "start"

match command:
    case "start":
        print("시작합니다")
    case "stop":
        print("멈춥니다")
    case _:              # _ 는 나머지 모두 (else 역할)
        print("알 수 없는 명령")`}</pre>
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
