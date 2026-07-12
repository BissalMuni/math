import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 반복문 — §1 for, §2 while, §3 흐름 제어 */
export default function Loops() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        반복문은 같은 작업을 여러 번 실행한다. 개수가 정해진 반복은 <code className="px-1 bg-sidebar-bg rounded">for</code>,
        조건이 유지되는 동안의 반복은 <code className="px-1 bg-sidebar-bg rounded">while</code>을 쓴다.
      </p>

      <CalcBox title="■ §1. for 반복문">
        <SubSection title="● 리스트·문자열 순회">
          <p className="text-sm">파이썬의 <code className="px-1 bg-sidebar-bg rounded">for</code>는 인덱스가 아니라 <span className="font-medium">원소 자체</span>를 하나씩 꺼낸다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`for fruit in ["사과", "배", "감"]:
    print(fruit)         # 사과 / 배 / 감

for ch in "abc":
    print(ch)            # a / b / c`}</pre>
          </div>
        </SubSection>

        <SubSection title="● range()로 횟수 반복">
          <p className="text-sm"><code className="px-1 bg-sidebar-bg rounded">range(시작, 끝, 간격)</code> — 끝은 <span className="font-medium">포함되지 않는다</span>.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`for i in range(5):       # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 10, 2): # 2, 4, 6, 8
    print(i)`}</pre>
          </div>
        </SubSection>

        <SubSection title="● enumerate와 zip">
          <p className="text-sm">① <code className="px-1 bg-sidebar-bg rounded">enumerate</code>: 인덱스와 값을 함께.</p>
          <p className="text-sm">② <code className="px-1 bg-sidebar-bg rounded">zip</code>: 여러 리스트를 나란히.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`names = ["지우", "이슬"]
for i, name in enumerate(names):
    print(i, name)       # 0 지우 / 1 이슬

ages = [15, 14]
for name, age in zip(names, ages):
    print(f"{name}: {age}살")  # 지우: 15살 / 이슬: 14살`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. while 반복문">
        <p className="text-sm mb-2">조건이 <code className="px-1 bg-sidebar-bg rounded">True</code>인 동안 계속 반복한다. 조건을 바꾸는 코드가 없으면 무한 루프가 되니 주의한다.</p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
          <pre>{`count = 3
while count > 0:
    print(count)         # 3 / 2 / 1
    count -= 1           # 조건을 언젠가 거짓으로 만들어야 함
print("발사!")

# 카운터를 줄이는 코드를 잊으면 무한 반복`}</pre>
        </div>
        <Insight>
          &quot;몇 번 반복할지 아는가?&quot;가 판단 기준이다. 아는 경우(리스트 순회, N번 반복)는 <code className="px-1 bg-sidebar-bg rounded">for</code>,
          모르는 경우(사용자 입력 대기, 조건 충족까지)는 <code className="px-1 bg-sidebar-bg rounded">while</code>이 자연스럽다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ §3. 흐름 제어: break · continue · else">
        <SubSection title="● break와 continue">
          <p className="text-sm">① <code className="px-1 bg-sidebar-bg rounded">break</code>: 반복을 즉시 완전히 종료.</p>
          <p className="text-sm">② <code className="px-1 bg-sidebar-bg rounded">continue</code>: 이번 회차만 건너뛰고 다음으로.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`for i in range(10):
    if i == 5:
        break            # 5에서 반복 종료
    if i % 2 == 0:
        continue         # 짝수는 건너뜀
    print(i)             # 1 / 3`}</pre>
          </div>
        </SubSection>

        <SubSection title="● for-else">
          <p className="text-sm"><code className="px-1 bg-sidebar-bg rounded">break</code> 없이 반복이 끝까지 돌면 <code className="px-1 bg-sidebar-bg rounded">else</code>가 실행된다. 탐색 성공/실패 판정에 유용하다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`target = 7
for n in [1, 2, 3]:
    if n == target:
        print("찾음")
        break
else:
    print("못 찾음")     # break가 안 걸려서 실행됨`}</pre>
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
