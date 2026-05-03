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

      {/* 소목차 1 */}
      <CalcBox title="첫 번째 주제">
        <p>내용...</p>
        <BlockMath math="E = mc^2" />
      </CalcBox>

      {/* 소목차 2 — 세부 주제 포함 */}
      <CalcBox title="두 번째 주제">
        <p>개요 설명...</p>

        <SubSection title="① 세부 주제 A">
          <p>세부 내용...</p>
        </SubSection>

        <SubSection title="② 세부 주제 B">
          <p>세부 내용...</p>
        </SubSection>
      </CalcBox>

      {/* 소목차 3 — 단계별 설명 */}
      <CalcBox title="세 번째 주제">
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
