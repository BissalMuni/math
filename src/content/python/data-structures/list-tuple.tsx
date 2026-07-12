import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 리스트와 튜플 — §1 리스트, §2 리스트 조작, §3 튜플 */
export default function ListTuple() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        리스트와 튜플은 여러 값을 순서대로 담는 자료구조다.
        리스트는 <span className="font-medium">수정 가능(mutable)</span>, 튜플은 <span className="font-medium">수정 불가(immutable)</span>라는 점이 핵심 차이다.
      </p>

      <CalcBox title="■ §1. 리스트 (list)">
        <SubSection title="● 만들기와 접근">
          <p className="text-sm">대괄호 <code className="px-1 bg-sidebar-bg rounded">[]</code>로 만들고, 인덱스로 접근한다. 서로 다른 자료형을 섞어 담을 수 있다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`fruits = ["사과", "배", "감"]
print(fruits[0])     # 사과
print(fruits[-1])    # 감  (뒤에서 첫 번째)
print(fruits[1:])    # ['배', '감']  (슬라이싱)
print(len(fruits))   # 3

nums = [1, "둘", 3.0, True]   # 혼합 가능`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 값 변경">
          <p className="text-sm">리스트는 인덱스로 값을 바꿀 수 있다(문자열과의 결정적 차이).</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`fruits = ["사과", "배", "감"]
fruits[1] = "포도"
print(fruits)        # ['사과', '포도', '감']`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 리스트 조작 메서드">
        <SubSection title="● 추가·삭제">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
            <pre>{`nums = [3, 1, 2]
nums.append(5)       # 끝에 추가    -> [3, 1, 2, 5]
nums.insert(0, 9)    # 0번에 삽입   -> [9, 3, 1, 2, 5]
nums.remove(1)       # 값 1 제거    -> [9, 3, 2, 5]
last = nums.pop()    # 끝 값 꺼내기 -> last=5, [9, 3, 2]
print(nums)`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 정렬과 탐색">
          <p className="text-sm">① <code className="px-1 bg-sidebar-bg rounded">sort()</code>는 원본을 바꾸고, <code className="px-1 bg-sidebar-bg rounded">sorted()</code>는 새 리스트를 반환한다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`nums = [3, 1, 2]
nums.sort()              # 원본 정렬 -> [1, 2, 3]
nums.sort(reverse=True)  # 내림차순  -> [3, 2, 1]
print(sorted([3, 1, 2])) # [1, 2, 3]  (원본 유지)
print(2 in nums)         # True  (포함 여부)
print(nums.index(2))     # 1     (2의 위치)`}</pre>
          </div>
        </SubSection>

        <Insight>
          <code className="px-1 bg-sidebar-bg rounded">b = a</code>는 복사가 아니라 <span className="font-medium">같은 리스트에 이름 하나 더 붙이기</span>다.
          진짜 복사는 <code className="px-1 bg-sidebar-bg rounded">b = a.copy()</code> 또는 <code className="px-1 bg-sidebar-bg rounded">b = a[:]</code>를 쓴다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ §3. 튜플 (tuple)">
        <p className="text-sm mb-2">소괄호 <code className="px-1 bg-sidebar-bg rounded">()</code>로 만들며, 한 번 만들면 <span className="font-medium">수정할 수 없다</span>. 변하면 안 되는 데이터(좌표, 설정값)에 적합하다.</p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
          <pre>{`point = (3, 5)
print(point[0])      # 3
# point[0] = 9       # TypeError! 수정 불가

x, y = point         # 언패킹 — 각 값을 변수로 분해
print(x, y)          # 3 5

one = (42,)          # 원소 1개 튜플은 콤마 필수`}</pre>
        </div>
        <Insight>
          함수가 여러 값을 <code className="px-1 bg-sidebar-bg rounded">return a, b</code>로 반환하면 실제로는 <span className="font-medium">튜플 하나</span>를 돌려주는 것이다.
          받는 쪽에서 <code className="px-1 bg-sidebar-bg rounded">x, y = func()</code>로 언패킹한다.
        </Insight>
      </CalcBox>
    </div>
  );
}
