# Plan

## Architecture

```
src/
├── app/
│   ├── layout.tsx                          # 루트 레이아웃 (사이드바 + 메인 콘텐츠)
│   ├── page.tsx                            # 랜딩 페이지 (카테고리 선택)
│   ├── middle/
│   │   └── [grade]/[chapter]/[section]/[topic]/
│   │       └── page.tsx                    # 중학교 소단원 콘텐츠
│   ├── high/
│   │   └── [subject]/[chapter]/[section]/[topic]/
│   │       └── page.tsx                    # 고등학교 소단원 콘텐츠
│   └── llm/
│       ├── page.tsx                        # LLM 수학 개요
│       ├── [field]/page.tsx                # 분야별 (선형대수, 미적분 등)
│       └── pipeline/[stage]/page.tsx       # 절차별 (토큰화, 임베딩 등)
├── components/
│   ├── tree-nav.tsx                        # 트리 사이드바 네비게이션
│   ├── breadcrumb.tsx                      # 현재 위치 표시
│   ├── content-page.tsx                    # 소단원 콘텐츠 레이아웃
│   ├── math-formula.tsx                    # KaTeX 수식 렌더링 래퍼
│   ├── math-viz.tsx                        # Mafs 시각화 래퍼
│   └── progress-check.tsx                  # 완료 체크 토글
├── data/
│   ├── types.ts                            # 트리 노드 타입 정의
│   ├── middle-school.ts                    # 중학교 교육과정 트리 데이터
│   ├── high-school.ts                      # 고등학교 교육과정 트리 데이터
│   └── llm-math.ts                         # LLM 수학 데이터
├── content/
│   ├── middle/                             # 중학교 소단원별 콘텐츠 (TSX)
│   │   ├── grade1/
│   │   ├── grade2/
│   │   └── grade3/
│   ├── high/                               # 고등학교 소단원별 콘텐츠 (TSX)
│   │   ├── common-math1/
│   │   ├── common-math2/
│   │   └── ...
│   └── llm/                                # LLM 수학 콘텐츠 (TSX)
└── lib/
    └── progress.ts                         # localStorage 진도 관리 유틸
```

## Key Design Decisions

### 콘텐츠 구조: TSX 파일로 관리

각 소단원 콘텐츠를 `src/content/` 하위에 TSX 컴포넌트로 작성.
- 개념 설명 + KaTeX 수식 + Mafs 시각화를 하나의 컴포넌트에 포함
- JSON으로는 인터랙티브 시각화 표현 불가 → TSX가 적합
- 트리 데이터(`src/data/`)는 목차 구조만 담당, 콘텐츠는 분리

### 라우팅: 동적 세그먼트 + slug 매핑

- URL: `/middle/1/number-operation/prime-factorization/prime-composite`
- 트리 데이터의 각 노드에 `slug` 필드 → URL 세그먼트로 사용
- 동적 라우트 페이지에서 slug로 콘텐츠 컴포넌트를 동적 import

### 트리 데이터 타입

```typescript
interface TreeNode {
  id: string;           // 고유 ID
  slug: string;         // URL 세그먼트
  title: string;        // 표시 이름
  children?: TreeNode[];
  contentPath?: string; // leaf node만: 콘텐츠 컴포넌트 경로
}
```

### 진도 추적

- `localStorage` key: `math-progress`
- 값: `Set<string>` (완료한 소단원 id 배열을 JSON으로 저장)
- custom hook: `useProgress(topicId)` → `{ completed, toggle }`

## Dependencies

| 패키지 | 용도 | 비고 |
|--------|------|------|
| next 16 | 프레임워크 | 설치됨 |
| tailwindcss v4 | 스타일링 | 설치됨 |
| katex | 수식 렌더링 | SSR 지원 |
| react-katex | KaTeX React 래퍼 | `<InlineMath>`, `<BlockMath>` |
| mafs | 인터랙티브 시각화 | React 네이티브 |
| vitest | 테스트 | 추가 필요 |

## Implementation Order

### Phase 1: Setup

1. 추가 패키지 설치 (katex, react-katex, mafs, vitest)
2. 트리 노드 타입 정의 (`src/data/types.ts`)
3. 교육과정 트리 데이터 작성 (`src/data/middle-school.ts`, `high-school.ts`, `llm-math.ts`)

### Phase 2: Core Layout

4. 루트 레이아웃 — 사이드바 + 메인 콘텐츠 영역
5. 트리 네비게이션 컴포넌트 (펼치기/접기, 현재 위치 하이라이트)
6. Breadcrumb 컴포넌트
7. 동적 라우트 페이지 (middle, high, llm)

### Phase 3: Content Infrastructure

8. KaTeX 수식 렌더링 래퍼 (`math-formula.tsx`)
9. Mafs 시각화 래퍼 (`math-viz.tsx`)
10. 콘텐츠 페이지 레이아웃 (개념 + 공식 + 시각화)
11. 진도 추적 hook + UI (`progress-check.tsx`, `lib/progress.ts`)

### Phase 4: Content Authoring

12. 중학교 1학년 소단원 콘텐츠 작성 (파일럿)
13. 나머지 중학교 콘텐츠
14. 고등학교 콘텐츠
15. LLM 수학 콘텐츠

### Phase 5: Polish

16. 반응형 사이드바 (모바일 drawer)
17. 접근성 점검 (키보드 네비게이션, aria)
18. SEO 메타데이터 (각 소단원별 title, description)
