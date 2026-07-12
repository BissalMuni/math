import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 변수와 표현식 — §1 변수·대입, §2 자료형, §3 표현식·문자열 */
export default function AutohotkeyVariables() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        AutoHotkey v2에서 변수는 <span className="font-medium">이름에 값을 담는 상자</span>다.
        v1과 달리 v2에서는 변수와 문자열의 구분이 명확해져, 따옴표가 없으면 변수, 따옴표로 감싸면 문자열 리터럴이다.
      </p>

      <CalcBox title="■ §1. 변수와 대입">
        <p className="text-sm mb-2">
          <code className="px-1 bg-sidebar-bg rounded">:=</code> 연산자로 값을 대입한다. v2에서는 이 방식이 표준이다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`name := "홍길동"      ; 문자열은 따옴표
age  := 20            ; 숫자는 따옴표 없이
pi   := 3.14159

MsgBox name           ; 변수는 따옴표 없이 그대로 사용
MsgBox "이름: " name  ; 문자열 " " 뒤에 변수를 붙여 이어쓴다`}</pre>
        </div>

        <SubSection title="● 문자열 이어붙이기(연결)">
          <p className="text-sm">
            공백 하나 또는 <code className="px-1 bg-sidebar-bg rounded">.</code> 점 연산자로 값을 이어 붙인다.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`first := "Auto"
last  := "Hotkey"
full  := first . last      ; "AutoHotkey"
full2 := first last        ; 공백만으로도 연결 가능
MsgBox full "\\n" full2`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 자료형">
        <p className="text-sm mb-2">
          v2는 값의 타입을 구분한다. 대표 타입은 다음과 같다.
        </p>
        <p className="text-sm mb-2">① <span className="font-medium">Integer</span> — 정수: <code className="px-1 bg-sidebar-bg rounded">42</code>, <code className="px-1 bg-sidebar-bg rounded">-7</code></p>
        <p className="text-sm mb-2">② <span className="font-medium">Float</span> — 실수: <code className="px-1 bg-sidebar-bg rounded">3.14</code></p>
        <p className="text-sm mb-2">③ <span className="font-medium">String</span> — 문자열: <code className="px-1 bg-sidebar-bg rounded">"안녕"</code></p>
        <p className="text-sm">④ <span className="font-medium">Object / Array / Map</span> — 객체·배열·맵</p>

        <SubSection title="● 타입 확인과 변환">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`x := 10
MsgBox Type(x)          ; "Integer"
MsgBox IsNumber("3.5")  ; 1 (참)

s := "42"
n := Integer(s) + 8     ; 문자열 → 정수 변환 후 계산 → 50`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. 표현식과 연산">
        <p className="text-sm mb-2">
          산술·비교·논리 연산자를 조합해 표현식을 만든다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`sum   := 3 + 4 * 2      ; 11 (곱셈 우선)
power := 2 ** 10        ; 1024 (거듭제곱)
mod   := 17 // 5        ; 3 (정수 나눗셈), Mod(17,5)=2

; 비교·논리
ok := (age >= 18) && (age < 65)   ; 참이면 1
neg := !ok                        ; 논리 부정`}</pre>
        </div>

        <SubSection title="● 삼항 연산자와 내장 변수">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`label := (age >= 18) ? "성인" : "미성년"

; 내장 변수(A_ 접두)는 실행 환경 정보를 담는다
MsgBox A_UserName       ; 현재 윈도우 사용자명
MsgBox A_ScriptDir      ; 스크립트가 있는 폴더 경로
MsgBox A_Now            ; 현재 날짜/시각 (YYYYMMDDHH24MISS)`}</pre>
          </div>
        </SubSection>

        <Insight>
          v2의 철칙: <span className="font-medium">따옴표 없으면 변수, 따옴표 있으면 문자열</span>.
          <code className="px-1 bg-sidebar-bg rounded">MsgBox name</code>은 변수 값을,
          <code className="px-1 bg-sidebar-bg rounded">MsgBox &quot;name&quot;</code>은 글자 그대로 &quot;name&quot;을 출력한다.
        </Insight>
      </CalcBox>
    </div>
  );
}
