import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 파이썬이란 — §1 특징, §2 왜 배우는가 */
export default function PythonIntro() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        Python은 <span className="font-medium">읽기 쉬운 문법</span>을 최우선으로 설계된 범용 프로그래밍 언어다.
        웹·데이터 분석·인공지능·자동화까지 폭넓게 쓰이며, 초보자의 첫 언어로 가장 널리 추천된다.
      </p>

      <CalcBox title="■ §1. 파이썬의 특징">
        <SubSection title="● 들여쓰기가 곧 문법">
          <p className="text-sm">
            중괄호 <code className="px-1 bg-sidebar-bg rounded">{`{}`}</code> 대신 <span className="font-medium">들여쓰기(indentation)</span>로 코드 블록을 구분한다. 강제된 정렬이 자연스레 가독성을 높인다.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`if score >= 60:
    print("합격")        # 4칸 들여쓰기 = if 블록
else:
    print("불합격")`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 동적 타입과 인터프리터">
          <p className="text-sm">① <span className="font-medium">동적 타입</span>: 변수에 타입을 미리 선언하지 않는다. <code className="px-1 bg-sidebar-bg rounded">x = 10</code>이면 알아서 정수.</p>
          <p className="text-sm">② <span className="font-medium">인터프리터</span>: 컴파일 없이 한 줄씩 즉시 실행. REPL에서 바로 실험 가능.</p>
        </SubSection>

        <SubSection title="● 첫 프로그램">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
            <pre>{`name = "파이썬"
print(f"안녕하세요, {name}!")   # f-문자열로 값 삽입`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 왜 파이썬을 배우는가">
        <p className="text-sm mb-2">① 방대한 라이브러리 생태계 — NumPy·pandas·PyTorch 등으로 거의 모든 분야 커버.</p>
        <p className="text-sm mb-2">② 데이터 과학·머신러닝의 사실상 표준 언어.</p>
        <p className="text-sm">③ 짧고 명확한 코드로 빠르게 프로토타입을 만든다.</p>

        <Insight>
          &quot;There should be one obvious way to do it&quot; — 파이썬의 철학(Zen of Python). 화려함보다 <span className="font-medium">명확함</span>을 택한 언어라, 남이 쓴 코드도 쉽게 읽힌다.
        </Insight>
      </CalcBox>
    </div>
  );
}
