# Content File Rules

`src/content/` 내 TSX 콘텐츠 파일 작성 규칙.
GitHub Actions의 Claude Code가 콘텐츠를 생성·수정할 때 반드시 따른다.

## 파일 형식

- 확장자: `.tsx` (React 컴포넌트)
- `export default function` 으로 내보낸다
- `"use client"` 는 클라이언트 훅 사용 시에만 추가

## 헤딩 계층 (절대 규칙)

```
h1 — 페이지 제목 (TopicContent가 자동 렌더링, 콘텐츠 파일에서 절대 사용 금지)
  h2 — CalcBox title (소목차, 의견 버튼 자동 주입)
    h3 — SubSection title (소소목차, 의견 버튼 자동 주입)
```

- **h1 금지**: TopicContent 컴포넌트가 `node.title`을 h1으로 렌더링한다. 콘텐츠 파일에 h1을 쓰면 중복된다.
- **h2 금지**: 직접 `<h2>`를 쓰지 않는다. 반드시 `<CalcBox title="...">` 사용.
- **h3 금지**: 직접 `<h3>`를 쓰지 않는다. 반드시 `<SubSection title="...">` 사용.
- **`<section>` 금지**: 직접 `<section>` 태그를 쓰지 않는다. CalcBox가 내부적으로 생성한다.

## 제목 형식 (강제 규칙)

전체 명명 규칙은 [CONVENTION_TREE.md](./CONVENTION_TREE.md) 참조. 콘텐츠 작성 시 적용 부분만 요약:

| 단계 | 컴포넌트 | 제목 형식 | 강제 여부 | 예 |
|---|---|---|---|---|
| 페이지 제목 (auto) | (TopicContent → h1) | `Ⅰ. 이름` (Roman, 트리 데이터의 리프 title) | 강제 | `Ⅰ. 제곱근과 실수` |
| 1단계 | `CalcBox` (→ h2) | `N. 이름` (자연수 + 마침표) | **강제** — 모든 CalcBox에 번호 부여, 페이지 안 1부터 reset | `1. 제곱근의 뜻과 성질` |
| 2단계 | `SubSection` (→ h3) | `(N) 이름` (괄호 숫자) | **강제** — SubSection에 title이 있으면 항상 prefix. 부모 CalcBox 안 1부터 reset | `(1) 약수의 정의` |
| 3단계 | 마크다운 단락 또는 강조 텍스트 | `①②③ 이름` (원 숫자, 고정) | **형식 고정** — 3단계 사용 시 반드시 `①②③`. 단계 자체는 비강제 | `① 12의 약수: 1, 2, 3, 4, 6, 12` |

**번호 reset 원칙**: 같은 부모 안 형제끼리 1부터. 다른 부모로 넘어가면 다시 1부터.

## 헤딩 계층과 무관한 인라인 컴포넌트

`Step`, `Insight`, `Matrix`, `Arrow`, `InlineMath`, `BlockMath`는 본문 내 어디서나 사용 가능. 번호 prefix 규칙은 적용되지 않는다.

## 필수 컴포넌트

`@/components/content/shared` 에서 import:

| 컴포넌트 | 용도 | 렌더링 |
|---|---|---|
| `CalcBox` | 소목차 카드 | `<section><h2>` |
| `SubSection` | CalcBox 내 세부 주제 | `<div><h3>` |
| `Step` | 단계 번호 뱃지 | 번호 원형 + 라벨 |
| `Insight` | 핵심 인사이트 박스 | 💡 강조 박스 |
| `Matrix` | 행렬/벡터 시각화 | 표 형태 (5색 지원) |
| `Arrow` | 화살표 연산자 | → 기호 |
| `ComingSoon` | 준비 중 페이지 | 🚧 안내 |

`@/components/math/math-formula` 에서 import:

| 컴포넌트 | 용도 |
|---|---|
| `InlineMath` | 인라인 수식 (KaTeX) |
| `BlockMath` | 블록 수식 (KaTeX) |

## 파일 템플릿

```tsx
"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Step, Insight } from "@/components/content/shared";

export default function TopicName() {
  return (
    <div className="space-y-8">
      {/* 도입 설명 (선택) */}
      <p className="text-muted">이 단원의 한 줄 요약.</p>

      {/* 1단계 — 단순 내용 */}
      <CalcBox title="1. 첫 번째 주제">
        <p>내용...</p>
        <BlockMath math="E = mc^2" />
      </CalcBox>

      {/* 1단계 — SubSection이 목차 역할 (괄호 숫자 강제) */}
      <CalcBox title="2. 두 번째 주제">
        <p>개요 설명...</p>

        <SubSection title="(1) 세부 주제 A">
          <p>세부 내용...</p>
          <p>① 항목 1: 3단계는 원 숫자로 고정</p>
          <p>② 항목 2</p>
        </SubSection>

        <SubSection title="(2) 세부 주제 B">
          <p>세부 내용...</p>
        </SubSection>
      </CalcBox>

      {/* 1단계 — SubSection이 단순 내용 wrapper (prefix 없음) */}
      <CalcBox title="3. 세 번째 주제">
        <Step n={1} label="첫 번째 단계" />
        <p>설명...</p>

        <Step n={2} label="두 번째 단계" />
        <p>설명...</p>

        <Insight>핵심 포인트를 여기에.</Insight>
      </CalcBox>
    </div>
  );
}
```

## 의견 버튼 규칙

- `AutoSectionComment`가 콘텐츠 내 모든 `<h2>`, `<h3>`를 감지해 의견 버튼을 자동 주입한다.
- CalcBox와 SubSection을 사용하면 자동 적용된다.
- **`<p>`, `<div>`, `<strong>` 등으로 제목을 쓰면 의견 버튼이 붙지 않는다** — 반드시 CalcBox 또는 SubSection 사용.

## 금지 패턴

```tsx
// ✗ 직접 h1 — TopicContent와 중복
<h1>제목</h1>

// ✗ 직접 section + h2 — CalcBox 사용
<section><h2 className="...">제목</h2>...</section>

// ✗ 직접 h3 — SubSection 사용
<h3 className="...">소제목</h3>

// ✗ p/div로 제목 — 의견 버튼 미표시
<p className="font-medium">요약 제목</p>

// ✗ article 래퍼 — div 사용
<article className="max-w-3xl">...</article>
```

## 컨테이너

- 최상위 래퍼: `<div className="space-y-8">` (통일)
- `<article>` 사용 금지

## 시각화 기법

텍스트 + KaTeX만으로 부족할 때, 내용에 맞는 시각화를 **적극 활용**한다.
단, CalcBox/SubSection 헤딩 규칙은 시각화 내부에도 그대로 적용된다.

### 사용 가능 기법

| 기법 | 기술 | 적합한 콘텐츠 | 구현 방식 |
| --- | --- | --- | --- |
| **SVG 플로우 다이어그램** | `<svg>` + 노드/엣지 직접 그리기 | 프로세스 흐름, 개념 관계도, 계층 구조 | 컴포넌트 내부에 SVG 인라인. 노드 좌표는 상수로 정의 |
| **SVG 막대/원 그래프** | `<svg>` + `<rect>` / `<circle>` | 빈도, 비율, 분포 비교 | 데이터 배열 → `.map()`으로 도형 생성 |
| **Mafs 좌표 그래프** | `@/components/math/` (Mafs 라이브러리) | 함수 그래프, 좌표 위 점/벡터, 기하 도형 | `<Mafs>` + `<Plot.OfX>`, `<Point>`, `<Line>` 등 |
| **인터랙티브 슬라이더** | `useState` + `<input type="range">` | 파라미터 변화에 따른 결과 실시간 확인 | 상태값이 수식/그래프에 바인딩 |
| **호버/클릭 하이라이트** | `useState` + `onMouseEnter`/`onClick` | 데이터와 시각화 간 연결, 단계별 설명 | 활성 항목에 스타일 토글 |
| **탭 UI** | `useState<TabKey>` + 조건부 렌더링 | 같은 주제의 다른 관점 (표 vs 그래프 vs 구조도) | 탭 버튼 배열 → 활성 탭에 따라 패널 전환 |
| **아코디언 (펼치기/접기)** | `useState` + `onClick` 토글 | 심화 설명, 증명, 연결 개념 | 클릭 시 상세 영역 표시/숨김 |
| **단계별 애니메이션** | `useState<number>` (현재 스텝) | 알고리즘 진행, 연쇄법칙 전파, 풀이 과정 | "다음" 버튼으로 스텝 전진, 각 스텝마다 시각 변화 |

### 적용 판단 기준

```text
1. 흐름/순서가 있는가?          → SVG 플로우 다이어그램 또는 단계별 애니메이션
2. 수치 비교/분포를 보여주는가?  → SVG 막대그래프 또는 Mafs 좌표 그래프
3. 파라미터를 바꿔보면 이해가 되는가? → 인터랙티브 슬라이더
4. 데이터와 표현의 대응을 보여주는가? → 호버/클릭 하이라이트
5. 관점이 여러 개인가?          → 탭 UI
6. 본문이 길어지지만 생략하기 아까운가? → 아코디언
7. 텍스트+수식만으로 충분한가?    → 시각화 불필요 (과잉 금지)
```

### 구현 규칙

- **`"use client"` 필수**: `useState` 등 훅을 쓰므로 파일 최상단에 선언
- **데이터는 컴포넌트 바깥 상수**: SVG 좌표, 색상, 라벨 등은 `const`로 분리
- **인라인 style 허용**: SVG/다이어그램은 Tailwind보다 인라인 `style`이 더 적합할 수 있음
- **반응형**: SVG는 `width="100%" viewBox="..."` 패턴 사용
- **다크모드 고려**: Tailwind 클래스(`dark:`) 또는 CSS 변수 활용. 하드코딩 색상 시 어두운 배경 기준으로 작성
- **접근성**: 인터랙티브 요소에 `cursor: "pointer"`, 호버 힌트 텍스트 제공
- **시각화는 CalcBox 안에 배치**: 헤딩 규칙 유지. 단, 페이지 전체가 하나의 시각화일 때는 예외

### 예시: 탭 + SVG 다이어그램 패턴

```tsx
"use client";

import { useState } from "react";
import { CalcBox, Insight } from "@/components/content/shared";
import { BlockMath } from "@/components/math/math-formula";

type TabKey = "formula" | "graph" | "diagram";

export default function ExampleTopic() {
  const [tab, setTab] = useState<TabKey>("formula");

  return (
    <div className="space-y-8">
      <CalcBox title="1. 핵심 개념">
        {/* 탭 버튼 */}
        <div className="flex gap-1 bg-sidebar-bg rounded-lg p-1 mb-4">
          {([
            ["formula", "수식"],
            ["graph",   "그래프"],
            ["diagram", "구조도"],
          ] as [TabKey, string][]).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex-1 py-1.5 rounded-md text-sm transition-colors ${
                tab === key
                  ? "bg-white dark:bg-gray-800 font-semibold shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}>
              {label}
            </button>
          ))}
        </div>

        {/* 탭 패널 */}
        {tab === "formula" && <BlockMath math="y = mx + b" />}
        {tab === "graph" && (
          <svg width="100%" viewBox="0 0 400 200">
            {/* Mafs 또는 직접 SVG */}
          </svg>
        )}
        {tab === "diagram" && (
          <svg width="100%" viewBox="0 0 400 200">
            {/* 노드 + 엣지 */}
          </svg>
        )}
      </CalcBox>

      <Insight>시각화와 수식을 함께 보면 이해가 빨라집니다.</Insight>
    </div>
  );
}
```
