import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 함수와 인자 — §1 정의와 반환, §2 인자 종류, §3 스코프 */
export default function Functions() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        함수는 반복되는 작업에 <span className="font-medium">이름을 붙여 재사용</span>하는 도구다.
        입력(인자)을 받아 처리하고 결과(반환값)를 돌려준다.
      </p>

      <CalcBox title="■ §1. 정의와 반환">
        <SubSection title="● def로 정의하기">
          <p className="text-sm"><code className="px-1 bg-sidebar-bg rounded">def 이름(인자):</code>로 정의하고 <code className="px-1 bg-sidebar-bg rounded">return</code>으로 값을 돌려준다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`def add(a, b):
    return a + b

result = add(3, 5)
print(result)        # 8`}</pre>
          </div>
        </SubSection>

        <SubSection title="● return의 특성">
          <p className="text-sm">① <code className="px-1 bg-sidebar-bg rounded">return</code>을 만나면 함수는 즉시 종료된다.</p>
          <p className="text-sm">② <code className="px-1 bg-sidebar-bg rounded">return</code>이 없으면 <code className="px-1 bg-sidebar-bg rounded">None</code>을 반환한다.</p>
          <p className="text-sm">③ 콤마로 여러 값을 반환하면 튜플로 묶여 돌아온다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`def divmod2(a, b):
    return a // b, a % b   # 튜플로 반환

q, r = divmod2(17, 5)      # 언패킹
print(q, r)                # 3 2`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 인자 전달 방식">
        <SubSection title="● 위치 인자와 키워드 인자">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
            <pre>{`def greet(name, msg):
    print(f"{name}님, {msg}")

greet("지우", "환영합니다")        # 위치 인자 (순서대로)
greet(msg="안녕", name="이슬")     # 키워드 인자 (순서 무관)`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 기본값 인자">
          <p className="text-sm">인자에 기본값을 주면 호출 시 생략할 수 있다. 기본값 인자는 <span className="font-medium">항상 뒤쪽</span>에 놓는다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`def power(base, exp=2):
    return base ** exp

print(power(3))      # 9   (exp 생략 -> 2)
print(power(3, 3))   # 27`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 가변 인자 *args, **kwargs">
          <p className="text-sm">개수가 정해지지 않은 인자를 받는다. <code className="px-1 bg-sidebar-bg rounded">*args</code>는 튜플, <code className="px-1 bg-sidebar-bg rounded">**kwargs</code>는 딕셔너리로 모인다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`def total(*args):
    return sum(args)

print(total(1, 2, 3, 4))   # 10

def info(**kwargs):
    for k, v in kwargs.items():
        print(f"{k}={v}")

info(name="지우", age=15)   # name=지우 / age=15`}</pre>
          </div>
        </SubSection>

        <Insight>
          기본값으로 <span className="font-medium">리스트·딕셔너리 같은 가변 객체를 쓰면 안 된다</span>(<code className="px-1 bg-sidebar-bg rounded">def f(x=[])</code>).
          호출들끼리 그 리스트를 공유해 버그가 생긴다. <code className="px-1 bg-sidebar-bg rounded">def f(x=None)</code>로 두고 함수 안에서 <code className="px-1 bg-sidebar-bg rounded">if x is None: x = []</code>로 처리한다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ §3. 변수 스코프">
        <p className="text-sm mb-2">함수 안에서 만든 변수는 그 안에서만 유효하다(<span className="font-medium">지역 변수</span>). 밖에서는 보이지 않는다.</p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
          <pre>{`x = 10               # 전역 변수

def f():
    x = 99           # 이건 별개의 지역 변수
    print(x)         # 99

f()
print(x)             # 10  (전역은 그대로)`}</pre>
        </div>
        <Insight>
          함수는 전역 변수를 <span className="font-medium">읽을</span> 수는 있지만, 안에서 대입하면 새 지역 변수가 만들어진다.
          정말 전역을 수정해야 한다면 <code className="px-1 bg-sidebar-bg rounded">global</code> 키워드가 필요하지만, 대개 인자와 반환값으로 주고받는 편이 안전하다.
        </Insight>
      </CalcBox>
    </div>
  );
}
