# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive web application for studying Korean middle school and high school mathematics. Each curriculum topic provides interactive content (visualizations, practice problems, step-by-step solutions) organized in a tree-structured table of contents.

## Spec-Driven Development

Follow spec-kit workflow: constitution → spec → plan → implement.
Refer to `.spec/` for project specifications.

- `.spec/constitution.md` — 프로젝트 원칙 (기술 스택, 컨벤션, 비기능 요구사항)
- `.spec/spec.md` — 기능 명세 (유저 스토리, 요구사항)
- `.spec/plan.md` — 기술 계획 (아키텍처, 의존성, 구현 순서)

## Curriculum Data

2022 개정 교육과정 기준:

- `middle-school-math.md` — 중학교 1~3학년 (대단원 → 중단원 → 소단원)
- `high-school-math.md` — 고등학교 (공통수학1/2, 대수, 미적분Ⅰ/Ⅱ, 확률과통계, 기하, 경제수학, 인공지능수학, 직무수학)

LLM 수학 레퍼런스:

- `llm-math.md` — 수학 분야별 분류 (선형대수, 미적분, 확률통계, 정보이론, 최적화, 수치해석)
- `llm-pipeline-math.md` — LLM 처리 절차 14단계별 수학 매핑

## Tree Structure

콘텐츠 트리는 **책 → 카테고리 → 학년/과목 → 대단원 → 중단원 → 소단원** 구조입니다.

### 책 (Book) — 최상위 컨테이너
`CategoryRoot` 타입으로 정의된 최상위 단위.

- **수학** (`math`) — 중등수학 + 고등수학 + LLM 수학을 한 권으로 묶음
- **LLM** (`llm-learn`) — 트랜스포머 입력→출력 학습서

새 과목(국어/영어 등)을 추가할 땐 별도의 `Subject` 타입을 도입하지 말고 새 책(CategoryRoot)을 추가합니다.

### 표준 트리 깊이 — **최대 5단계, 자연 깊이 우선**

CategoryRoot(책) 컨테이너 1개 안에 **최대 5단계**의 노드. 마지막이 leaf(실제 콘텐츠 1개 파일).

```
[수학 책 — 5단계]
1. 카테고리      예: 중등수학, 고등수학, LLM 수학
2. 학년/과목     예: 중1, 수학Ⅰ
3. 대단원        예: Ⅰ. 수와 연산
4. 중단원        예: 1. 소인수분해             ← 학교 수학은 여기가 leaf
5. (사용 안 함)

[LLM 수학 — 3단계]
1. 카테고리      예: LLM 수학
2. 분류          예: 분야별, 파이프라인
3. 분야          예: 1. 선형대수               ← LLM 수학은 여기가 leaf
```

- **5단계는 *상한*** — 자연 깊이가 더 얕으면 그 깊이에서 leaf로 둔다 (인위 레이어 추가 X)
- **leaf** = `children`이 없거나 빈 배열인 TreeNode → 실제 학습 콘텐츠 1개 파일 보유
- **내부 노드** = `children`이 있는 TreeNode → 네비게이션·목차 역할

### 콘텐츠 파일 깊이 — **최대 3 depth**

각 leaf 콘텐츠 TSX 파일 내부의 헤딩 계층:

```
h1 (자동)        node.title (TopicContent가 렌더링)
  h2             CalcBox title — 소목차
    h3           SubSection title — 세부 주제
```

- **3 depth는 *상한*** — h3가 필요 없으면 h2까지만 사용
- 자세한 작성 규칙은 `src/content/RULES.md`

### 노드 vs 리프
- **노드**: 트리의 모든 요소 (큰 개념)
- **리프**: 자식이 없는 말단 노드 = 소단원 (작은 개념, 노드의 부분집합)

### URL 매핑
- 책 basePath가 URL prefix가 됨: `/math/...`, `/llm-learn/...`
- TreeNode의 `slug`가 각 세그먼트: `/math/middle/1/number-operation/prime-factorization/prime-composite`

### 데이터 위치
- `src/structure/data/*.json` — 카테고리별 트리 데이터 (middle, high, llm-math, llm-learning)
- `src/structure/math.ts` — 중등/고등/LLM수학을 묶는 **수학 책** 런타임 조립
- `src/structure/index.ts` — `allBooks`(사이드바·홈), `allCategories`(어드민) 두 뷰 노출

## Tech Stack

- **Framework:** Next.js 16 (App Router, src directory)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Package manager:** pnpm
- **Testing:** vitest
- **Math rendering:** KaTeX
- **Visualization:** Mafs (React 수학 시각화)
- **Data:** JSON/TS files (no DB)
- **Progress storage:** localStorage (no auth)
- **Code comments:** Korean
- **Import alias:** `@/*` → `src/*`

## Commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Start dev server
pnpm build          # Production build
pnpm lint           # Run ESLint
pnpm test           # Run tests (vitest)
pnpm test -- --run  # Run tests once without watch
```

## Component Organization

`src/components/` is organized by **domain purpose**:

```text
src/components/
├── navigation/   # 사이드바, 브레드크럼, context provider
├── content/      # 페이지 뷰 (소단원, 카테고리 개요, LLM 뷰)
├── math/         # 수식 렌더링 (KaTeX), 시각화 (Mafs)
├── feedback/     # 의견 버튼, 댓글 폼/목록, 이미지 그리드
├── progress/     # 학습 진도 체크
└── admin/        # 관리자 대시보드, 변경내역, 롤백
```

When adding a new component, place it in the matching domain folder. If no existing folder fits, create a new domain folder with a clear purpose — do not place files directly under `src/components/`.

## Content Authoring Rules

콘텐츠 파일(TSX) 작성 규칙은 **`src/content/RULES.md`** 참조.
콘텐츠를 생성·수정할 때 반드시 이 파일을 읽고 따를 것.

## Next.js Note

This project uses Next.js 16 which may have breaking changes from earlier versions. Read `node_modules/next/dist/docs/` before writing Next.js code.
