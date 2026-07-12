import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 함수 — §1 정의·호출, §2 매개변수, §3 반환·스코프 */
export default function AutohotkeyFunctions() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        함수는 반복되는 동작을 이름 붙여 묶은 코드 덩어리다. AutoHotkey v2는 함수 문법이 정돈되어,
        <code className="px-1 bg-sidebar-bg rounded">이름(매개변수) &#123; ... &#125;</code> 형태로 정의한다.
      </p>

      <CalcBox title="■ §1. 함수 정의와 호출">
        <p className="text-sm mb-2">
          함수 이름 뒤에 괄호와 중괄호 블록을 쓴다. 호출은 <code className="px-1 bg-sidebar-bg rounded">이름(인수)</code>로 한다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`Greet(name) {
    MsgBox "안녕하세요, " name "님!"
}

Greet("홍길동")     ; → 안녕하세요, 홍길동님!
Greet("이순신")`}</pre>
        </div>

        <SubSection title="● 반환값이 있는 함수">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`Add(a, b) {
    return a + b
}

result := Add(3, 4)   ; result = 7
MsgBox Add(10, 20)    ; 30`}</pre>
          </div>
          <p className="text-sm mt-2">
            <code className="px-1 bg-sidebar-bg rounded">return</code>은 값을 돌려주고 함수를 즉시 끝낸다. 없으면 빈 문자열을 반환한다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 매개변수">
        <p className="text-sm mb-2">
          기본값·가변 인수 등으로 유연하게 인수를 받는다.
        </p>

        <SubSection title="● 기본값 매개변수">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`Power(base, exp := 2) {   ; exp 생략 시 2
    return base ** exp
}

MsgBox Power(5)      ; 25  (5의 제곱)
MsgBox Power(2, 10)  ; 1024`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 가변 인수(*)와 ByRef(&)">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`; 가변 인수: 개수가 정해지지 않은 값을 배열로 받음
Sum(numbers*) {
    total := 0
    for n in numbers
        total += n
    return total
}
MsgBox Sum(1, 2, 3, 4)   ; 10

; ByRef(&): 변수 자체를 넘겨 원본을 수정
Double(&x) {
    x := x * 2
}
v := 5
Double(&v)
MsgBox v                 ; 10`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. 스코프와 화살표 함수">
        <p className="text-sm mb-2">
          함수 안에서 만든 변수는 기본적으로 <span className="font-medium">지역(local)</span>이다. 함수 밖 변수와 이름이 겹쳐도 서로 영향을 주지 않는다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`count := 100        ; 전역

Test() {
    count := 1      ; 지역 (전역과 별개)
    MsgBox count    ; 1
}
Test()
MsgBox count        ; 100 (전역은 그대로)`}</pre>
        </div>

        <SubSection title="● 화살표 함수(짧은 함수)">
          <p className="text-sm">
            한 줄짜리 함수는 <code className="px-1 bg-sidebar-bg rounded">=&gt;</code>로 간결하게 쓴다. 콜백에 자주 쓰인다.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`square := (n) => n * n
MsgBox square(6)     ; 36

; 핫키에 즉석 함수를 붙이는 활용
#h::() => MsgBox("Win+H 눌림")`}</pre>
          </div>
        </SubSection>

        <Insight>
          전역 변수를 함수 안에서 수정하려면 <code className="px-1 bg-sidebar-bg rounded">global 변수명</code>을 선언해야 한다.
          기본이 지역이라는 점이 v2에서 버그를 줄이는 핵심 안전장치다.
        </Insight>
      </CalcBox>
    </div>
  );
}
