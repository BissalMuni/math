import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅲ. 컴프리헨션 — §1 리스트 컴프리헨션, §2 조건과 중첩, §3 딕셔너리·집합 컴프리헨션 */
export default function Comprehension() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        컴프리헨션(comprehension)은 반복문으로 리스트·딕셔너리·집합을 <span className="font-medium">한 줄로</span> 만드는 파이썬 특유의 문법이다.
        짧고 읽기 쉬우며 대개 일반 반복문보다 빠르다.
      </p>

      <CalcBox title="■ §1. 리스트 컴프리헨션">
        <SubSection title="● 기본 형태">
          <p className="text-sm">
            <code className="px-1 bg-sidebar-bg rounded">[식 for 변수 in 반복대상]</code> 형태다. 반복문을 뒤집어 놓은 모양으로 읽으면 된다.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`# 일반 반복문
squares = []
for x in range(5):
    squares.append(x ** 2)

# 컴프리헨션 — 위와 동일
squares = [x ** 2 for x in range(5)]
print(squares)   # [0, 1, 4, 9, 16]`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 문자열·리스트 변환">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
            <pre>{`words = ["apple", "banana", "cherry"]
lengths = [len(w) for w in words]
print(lengths)          # [5, 6, 6]

upper = [w.upper() for w in words]
print(upper)            # ['APPLE', 'BANANA', 'CHERRY']`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 조건과 중첩">
        <SubSection title="● 필터 조건 (뒤쪽 if)">
          <p className="text-sm">뒤에 <code className="px-1 bg-sidebar-bg rounded">if</code>를 붙이면 조건을 만족하는 값만 남긴다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`nums = range(10)
evens = [x for x in nums if x % 2 == 0]
print(evens)     # [0, 2, 4, 6, 8]`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 삼항 표현 (앞쪽 if-else)">
          <p className="text-sm">값 자체를 조건에 따라 바꾸려면 <code className="px-1 bg-sidebar-bg rounded">for</code> 앞에 <code className="px-1 bg-sidebar-bg rounded">A if 조건 else B</code>를 쓴다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`nums = range(5)
labels = ["짝" if x % 2 == 0 else "홀" for x in nums]
print(labels)    # ['짝', '홀', '짝', '홀', '짝']`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 중첩 반복">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
            <pre>{`pairs = [(x, y) for x in [1, 2] for y in ["a", "b"]]
print(pairs)     # [(1,'a'), (1,'b'), (2,'a'), (2,'b')]`}</pre>
          </div>
        </SubSection>

        <Insight>
          <span className="font-medium">위치가 중요하다.</span> 필터용 <code className="px-1 bg-sidebar-bg rounded">if</code>는 <code className="px-1 bg-sidebar-bg rounded">for</code> <span className="font-medium">뒤</span>에, 값 선택용 <code className="px-1 bg-sidebar-bg rounded">if-else</code>는 <code className="px-1 bg-sidebar-bg rounded">for</code> <span className="font-medium">앞</span>에 온다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ §3. 딕셔너리·집합 컴프리헨션">
        <p className="text-sm mb-2">중괄호를 쓰면 딕셔너리나 집합도 같은 방식으로 만든다.</p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
          <pre>{`# 딕셔너리 컴프리헨션 — key: value
squares = {x: x ** 2 for x in range(4)}
print(squares)   # {0: 0, 1: 1, 2: 4, 3: 9}

# 집합 컴프리헨션 — 중복 자동 제거
letters = {c for c in "banana"}
print(letters)   # {'b', 'a', 'n'}`}</pre>
        </div>
        <Insight>
          컴프리헨션은 간결함이 무기지만, 조건이 여러 개이거나 로직이 복잡해지면 오히려 읽기 어렵다.
          <span className="font-medium">한눈에 들어올 때만</span> 쓰고, 복잡하면 일반 반복문으로 되돌아가는 것이 좋다.
        </Insight>
      </CalcBox>
    </div>
  );
}
