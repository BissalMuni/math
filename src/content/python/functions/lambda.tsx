import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 람다와 고차함수 — §1 람다, §2 map·filter, §3 sorted key */
export default function Lambda() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        람다는 이름 없는 <span className="font-medium">한 줄짜리 함수</span>이고, 고차함수는 <span className="font-medium">함수를 인자로 받는 함수</span>다.
        둘을 결합하면 데이터 변환을 간결하게 표현할 수 있다.
      </p>

      <CalcBox title="■ §1. 람다 표현식">
        <SubSection title="● def와 비교">
          <p className="text-sm"><code className="px-1 bg-sidebar-bg rounded">lambda 인자: 식</code> 형태다. <code className="px-1 bg-sidebar-bg rounded">return</code> 없이 식의 값이 곧 반환값이다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`# 일반 함수
def square(x):
    return x ** 2

# 람다 — 동일한 기능
square = lambda x: x ** 2
print(square(5))     # 25

add = lambda a, b: a + b
print(add(3, 4))     # 7`}</pre>
          </div>
        </SubSection>

        <Insight>
          람다는 <span className="font-medium">간단한 함수를 잠깐 쓸 때</span>만 유용하다. 로직이 조금이라도 복잡하면 <code className="px-1 bg-sidebar-bg rounded">def</code>로 이름을 붙이는 게 읽기 좋다.
          이름표처럼 <code className="px-1 bg-sidebar-bg rounded">square = lambda ...</code>로 변수에 담는 건 사실상 권장되지 않는다 — 그럴 거면 <code className="px-1 bg-sidebar-bg rounded">def</code>를 써라.
        </Insight>
      </CalcBox>

      <CalcBox title="■ §2. 고차함수: map과 filter">
        <SubSection title="● map — 모든 원소 변환">
          <p className="text-sm">각 원소에 함수를 적용한 결과를 만든다. 결과를 리스트로 보려면 <code className="px-1 bg-sidebar-bg rounded">list()</code>로 감싼다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`nums = [1, 2, 3, 4]
squared = list(map(lambda x: x ** 2, nums))
print(squared)       # [1, 4, 9, 16]

# 컴프리헨션으로도 동일
squared = [x ** 2 for x in nums]`}</pre>
          </div>
        </SubSection>

        <SubSection title="● filter — 조건 만족만 추출">
          <p className="text-sm">함수가 <code className="px-1 bg-sidebar-bg rounded">True</code>를 반환하는 원소만 남긴다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`nums = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)         # [2, 4, 6]`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. 정렬의 key — 람다의 진짜 쓸모">
        <p className="text-sm mb-2">
          <code className="px-1 bg-sidebar-bg rounded">sorted()</code>·<code className="px-1 bg-sidebar-bg rounded">max()</code>·<code className="px-1 bg-sidebar-bg rounded">min()</code>의 <code className="px-1 bg-sidebar-bg rounded">key</code>에 람다를 넘기면 &quot;무엇을 기준으로&quot; 비교할지 지정할 수 있다. 여기서 람다가 가장 빛난다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
          <pre>{`students = [
    {"name": "지우", "score": 85},
    {"name": "이슬", "score": 92},
    {"name": "민준", "score": 78},
]

# 점수 기준 내림차순 정렬
ranked = sorted(students, key=lambda s: s["score"], reverse=True)
print([s["name"] for s in ranked])   # ['이슬', '지우', '민준']

# 최고 득점자
top = max(students, key=lambda s: s["score"])
print(top["name"])                    # 이슬

# 이름 길이 기준 정렬
words = ["banana", "kiwi", "apple"]
print(sorted(words, key=len))         # ['kiwi', 'apple', 'banana']`}</pre>
        </div>
        <Insight>
          <code className="px-1 bg-sidebar-bg rounded">key=람다</code>는 &quot;각 원소를 무엇으로 바꿔 비교할지&quot;를 정한다.
          튜플을 반환하면 <span className="font-medium">다중 기준 정렬</span>도 된다: <code className="px-1 bg-sidebar-bg rounded">key=lambda s: (s[&quot;grade&quot;], -s[&quot;score&quot;])</code>.
        </Insight>
      </CalcBox>
    </div>
  );
}
