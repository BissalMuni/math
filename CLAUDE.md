# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

학습한 지식을 **바구니 → 책 → 단원 트리 → 콘텐츠** 4계층으로 정리·축적하는 개인 학습 지식 관리 체계.
각 소단원(leaf)은 KaTeX 수식과 Mafs 시각화를 활용한 단일 TSX 파일 — AI가 댓글 기반으로 단원 단위 편집 가능.

### 4계층 모델

| 계층 | 책임 | 위치 |
|---|---|---|
| **basket** | 책을 묶는 UX 라벨 (책 ID 참조만) | `src/basket/` |
| **book** | 학습 단위. URL·폴더·관리의 독립 기준 | `src/book/` |
| **content** | leaf별 단일 TSX 파일 | `src/content/` |
| **map** | book + leaf → content 컴포넌트 | `src/map/` |

### 현재 책 (4권)

| 책 | URL | 소속 바구니 |
|---|---|---|
| **중등수학** | `/middle-school` | 수학 |
| **고등수학** | `/high-school` | 수학 |
| **LLM 수학** | `/llm-math` | 수학 |
| **LLM 학습** | `/llm-learning` | AI/LLM |

새 주제(국어·영어·역사 등)는 별도의 책(`Book`)으로 추가하고, 적절한 바구니에 ID 등록.

## Spec-Driven Development

Follow spec-kit workflow: constitution → spec → plan → implement.
Refer to `.spec/` for project specifications.

- `.spec/constitution.md` — 프로젝트 원칙 (기술 스택, 컨벤션, 비기능 요구사항)
- `.spec/spec.md` — 기능 명세 (유저 스토리, 요구사항)
- `.spec/plan.md` — 기술 계획 (아키텍처, 의존성, 구현 순서)

## Codebase Layout

> 트리 구조 모델·깊이 규칙·노드 명명·콘텐츠 헤딩 형식은 모두 `CONVENTION_TREE.md`와 `CONVENTION_CONTENT.md`에 정의됨. 이 섹션은 **이 코드베이스에서의 위치와 라우팅**만 다룬다.

### book/ — 책 데이터·로더
- `src/book/data/*.json` — 책별 원본 트리 (`middle-school.json`, `high-school.json`, `llm-math.json`, `llm-learning.json`)
- `src/book/<book-id>.ts` — 각 JSON을 `Book`으로 import하는 얇은 로더 (4개)
- `src/book/llm-curriculum.ts` — LLM 수학 노드 ↔ 교육과정(고등/대학) 매핑 보조 데이터
- `src/book/index.ts` — `allBooks` (4권), `getBookByPath` 노출. `allCategories`/`getCategoryByPath`는 deprecated 별칭
- `src/book/types.ts` — `Book`, `TreeNode` 타입 + `findNodePath`, `findNodeBySlugs`, `isLeafNode` 유틸. `CategoryRoot`는 deprecated 별칭

### basket/ — 바구니 메타
- `src/basket/<basket-id>.ts` — 한 바구니 정의 (`{ id, title, bookIds }`)
- `src/basket/index.ts` — `allBaskets`, `getBasketsForBook` 노출
- `src/basket/types.ts` — `Basket` 타입

### content/ — leaf TSX
- `src/content/<book-id>/.../<leaf-slug>.tsx` — 1 leaf = 1 파일
- 작성 규칙: `CONVENTION_CONTENT.md`

### map/ — 라우팅 컨벤션
- `src/map/index.ts` — book + leaf → content 컴포넌트 동적 import (`getContentComponent`)
- 책별 path 도출 함수 4개 (middle-school은 `grade${slug}` prefix 변환 있음)

### URL 매핑
- 책 `basePath`가 URL prefix: `/middle-school/...`, `/high-school/...`, `/llm-math/...`, `/llm-learning/...`
- TreeNode의 `slug`가 각 세그먼트로 이어짐

## Tech Stack

- **Framework:** Next.js 16 (App Router, src directory) + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Package manager:** pnpm
- **Testing:** vitest
- **Math rendering:** KaTeX
- **Visualization:** Mafs (React 수학 시각화)
- **Backend:** Supabase (`math` 스키마) — 댓글·이미지·콘텐츠 변경 이력
- **Auth:** 자체 세션 (`jose` / JWT) + 역할 기반 권한 (admin 등)
- **Tree/Content data:** JSON/TS 파일 (DB 아님)
- **Progress storage:** localStorage
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

콘텐츠 또는 구조를 생성·수정할 때 반드시 다음을 먼저 참조:

- **TSX 작성 규칙**: `CONVENTION_CONTENT.md`
- **트리 구조·명명 규칙**: `CONVENTION_TREE.md`

기존 단원 구조·명칭의 단일 진실은 `src/book/data/*.json`.

### 새 책 추가
1. `src/book/data/<book-id>.json` 작성 — `id`, `basePath` (모두 동일 이름), `title`, `description`, `children`
2. `src/book/<book-id>.ts` 로더 작성 (5줄)
3. `src/book/index.ts` `allBooks`에 추가
4. `src/map/index.ts`에 derive 함수 + switch case 추가
5. `src/app/<book-id>/page.tsx` + `[...slugs]/page.tsx` 생성
6. `src/content/<book-id>/` 폴더에 leaf TSX 작성
7. `src/basket/<basket>.ts` `bookIds`에 등록 (≥1개 바구니 필수)

## Next.js Note

This project uses Next.js 16 which may have breaking changes from earlier versions. Read `node_modules/next/dist/docs/` before writing Next.js code.
