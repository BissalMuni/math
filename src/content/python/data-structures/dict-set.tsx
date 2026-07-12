import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 딕셔너리와 집합 — §1 딕셔너리, §2 딕셔너리 순회, §3 집합 */
export default function DictSet() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        딕셔너리는 <span className="font-medium">키(key) → 값(value)</span> 쌍으로 데이터를 저장하고, 집합은 <span className="font-medium">중복 없는</span> 값의 모음이다.
        둘 다 중괄호 <code className="px-1 bg-sidebar-bg rounded">{`{}`}</code>를 쓰지만 용도가 완전히 다르다.
      </p>

      <CalcBox title="■ §1. 딕셔너리 (dict)">
        <SubSection title="● 만들기와 접근">
          <p className="text-sm">키로 값을 조회한다. 리스트의 &quot;인덱스&quot; 자리에 &quot;의미 있는 키&quot;를 쓰는 셈이다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`student = {"name": "지우", "age": 15, "grade": "A"}
print(student["name"])   # 지우
print(student.get("phone"))          # None  (없어도 오류 X)
print(student.get("phone", "미등록")) # 미등록  (기본값)`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 추가·수정·삭제">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
            <pre>{`student = {"name": "지우", "age": 15}
student["age"] = 16       # 수정
student["city"] = "서울"   # 없는 키에 대입하면 추가
del student["name"]       # 삭제
print("city" in student)  # True  (키 존재 확인)
print(student)            # {'age': 16, 'city': '서울'}`}</pre>
          </div>
        </SubSection>

        <Insight>
          키는 문자열·숫자·튜플처럼 <span className="font-medium">변하지 않는(immutable) 값</span>만 가능하다. 리스트는 키가 될 수 없다.
          값에는 어떤 자료형이든(리스트·딕셔너리 포함) 넣을 수 있다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ §2. 딕셔너리 순회">
        <p className="text-sm mb-2">키·값·쌍을 각각 반복할 수 있다.</p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
          <pre>{`scores = {"국어": 90, "수학": 85}

for k in scores:            # 기본은 키를 순회
    print(k)                # 국어 / 수학

for k, v in scores.items(): # 키-값 쌍
    print(f"{k}: {v}")      # 국어: 90 / 수학: 85

print(list(scores.keys()))   # ['국어', '수학']
print(list(scores.values())) # [90, 85]`}</pre>
        </div>
        <Insight>
          <code className="px-1 bg-sidebar-bg rounded">.items()</code>로 키와 값을 동시에 꺼내는 것이 가장 흔한 패턴이다.
          파이썬 3.7+ 딕셔너리는 <span className="font-medium">삽입 순서를 유지</span>한다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ §3. 집합 (set)">
        <SubSection title="● 중복 제거">
          <p className="text-sm">집합은 순서가 없고 중복을 허용하지 않는다. 중복 제거에 자주 쓰인다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`nums = [1, 2, 2, 3, 3, 3]
unique = set(nums)
print(unique)              # {1, 2, 3}
print(len(unique))         # 3

s = {1, 2}
s.add(3)                   # {1, 2, 3}
s.discard(1)               # {2, 3}  (없어도 오류 X)`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 집합 연산">
          <p className="text-sm">교집합·합집합·차집합을 수학처럼 직접 계산한다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`a = {1, 2, 3}
b = {2, 3, 4}
print(a & b)   # {2, 3}      교집합
print(a | b)   # {1, 2, 3, 4} 합집합
print(a - b)   # {1}          차집합
print(a ^ b)   # {1, 4}       대칭차`}</pre>
          </div>
        </SubSection>

        <Insight>
          빈 집합은 <code className="px-1 bg-sidebar-bg rounded">{`{}`}</code>가 아니라 <code className="px-1 bg-sidebar-bg rounded">set()</code>으로 만든다.
          <code className="px-1 bg-sidebar-bg rounded">{`{}`}</code>는 빈 딕셔너리이기 때문이다.
        </Insight>
      </CalcBox>
    </div>
  );
}
