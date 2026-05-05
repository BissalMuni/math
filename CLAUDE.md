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

### 현재 책 (5권)

| 책 | URL | 소속 바구니 |
|---|---|---|
| **중등수학** | `/middle-school` | 수학 |
| **고등수학** | `/high-school` | 수학 |
| **LLM 수학** | `/llm-math` | 수학 |
| **LLM 학습** | `/llm-learning` | AI/LLM |
| **AI 메모리** | `/ai-memory` | AI/LLM |

새 주제(국어·영어·역사 등)는 별도의 책(`Book`)으로 추가하고, 적절한 바구니에 ID 등록.

## Codebase Layout

> 트리 구조 모델·깊이 규칙·노드 명명·콘텐츠 헤딩 형식은 모두 `CONVENTION_TREE.md`와 `CONVENTION_CONTENT.md`에 정의됨. 이 섹션은 **이 코드베이스에서의 위치와 라우팅**만 다룬다.

### book/ — 책 데이터·로더
- `src/book/data/*.json` — 책별 원본 트리 (`middle-school.json`, `high-school.json`, `llm-math.json`, `llm-learning.json`, `ai-memory.json`)
- `src/book/<book-id>.ts` — 각 JSON을 `Book`으로 import하는 얇은 로더 (5개)
- `src/book/index.ts` — `allBooks` (5권), `getBookByPath` 노출
- `src/book/types.ts` — `Book`, `TreeNode` 타입 + `findNodePath`, `findNodeBySlugs`, `isLeafNode` 유틸

### basket/ — 바구니 메타
- `src/basket/<basket-id>.ts` — 한 바구니 정의 (`{ id, title, bookIds }`)
- `src/basket/index.ts` — `allBaskets`, `getBasketsForBook` 노출
- `src/basket/types.ts` — `Basket` 타입

### content/ — leaf TSX
- `src/content/<book-id>/.../<leaf-slug>.tsx` — 1 leaf = 1 파일
- 작성 규칙: `CONVENTION_CONTENT.md`

### map/ — 라우팅 컨벤션
- `src/map/index.ts` — book + leaf → content 컴포넌트 동적 import (`getContentComponent`)
- 책별 path 도출 함수 5개 (middle-school은 `grade${slug}` prefix 변환 있음)

### URL 매핑
- 책 `basePath`가 URL prefix: `/middle-school/...`, `/high-school/...`, `/llm-math/...`, `/llm-learning/...`
- TreeNode의 `slug`가 각 세그먼트로 이어짐

### lib/ — 유틸리티·인프라

- `src/lib/types.ts` — 공통 타입 (`Comment`, `TopicImage`, `ContentChange` 등)
- `src/lib/progress.ts` — 학습 진도 (localStorage)
- `src/lib/structure-serializer.ts` — 트리 구조 직렬화 + 책 메타 매핑

#### lib/admin/ — 관리자 공통 유틸

- `src/lib/admin/github.ts` — GitHub API 공통 (커밋 헬퍼, blob/tree/ref 조작)
- `src/lib/admin/templates.ts` — 책/바구니 파일 자동 생성 템플릿 (로더, index.ts, map, 라우트 등)

#### lib/auth/ — 인증

- `src/lib/auth/constants.ts` — 역할 상수 (admin 등)
- `src/lib/auth/session.ts` — 서버 세션 (JWT/jose)
- `src/lib/auth/use-session.ts` — 클라이언트 세션 훅
- `src/lib/auth/require-role.ts` — 역할 기반 권한 체크

#### lib/supabase/ — DB 접근

- `src/lib/supabase/client.ts` — Supabase 클라이언트 (math 스키마, 싱글턴)
- `src/lib/supabase/comments.ts` — 댓글 CRUD
- `src/lib/supabase/content-changes.ts` — 콘텐츠 변경 이력 기록/조회/통계
- `src/lib/supabase/images.ts` — 이미지 업로드/삭제 (5MB, jpg/png/gif/webp)

### app/api/ — API 라우트

- `api/auth/` — 로그인·로그아웃·현재 사용자 (`login`, `logout`, `me`)
- `api/comments/` — 댓글 목록/등록/삭제
- `api/images/` — 이미지 목록/업로드/삭제
- `api/admin/changes/` — 변경 이력 목록/상세/통계
- `api/admin/rollback/` — 콘텐츠 롤백
- `api/admin/structure/` — 트리 구조 수정
- `api/admin/books/` — 새 책 생성 (POST: 7개 파일 자동 생성 + GitHub 커밋)
- `api/admin/baskets/` — 바구니 목록 조회(GET) / 전체 업데이트(PUT)

### app/admin/ — 관리자 페이지

- `admin/` — 대시보드 (변경 통계)
- `admin/changes/` — 변경 이력 목록 + `[id]` 상세
- `admin/structure/` — 구조 관리 (3탭: 구조 편집 / 책 관리 / 바구니 관리)

### proxy.ts — 미들웨어

- `src/proxy.ts` — JWT 인증 + 역할 기반 라우트 보호 (Next.js middleware)

### supabase/ — DB 마이그레이션

- `supabase/migrations/` — SQL 마이그레이션 5개 (최종: `005_namespace_to_math_schema.sql`에 통합)

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
└── admin/        # 관리자 대시보드, 변경내역, 롤백, 책/바구니 관리
```

When adding a new component, place it in the matching domain folder. If no existing folder fits, create a new domain folder with a clear purpose — do not place files directly under `src/components/`.

## Content Authoring Rules

콘텐츠 또는 구조를 생성·수정할 때 반드시 다음을 먼저 참조:

- **TSX 작성 규칙**: `CONVENTION_CONTENT.md`
- **트리 구조·명명 규칙**: `CONVENTION_TREE.md`

기존 단원 구조·명칭의 단일 진실은 `src/book/data/*.json`.

### 새 책 추가

**관리자 UI**: `/admin/structure` → "책 관리" 탭에서 ID·제목·경로패턴·바구니를 입력하면 아래 파일이 자동 생성되어 GitHub에 커밋됩니다.

수동으로 추가할 경우:
1. `src/book/data/<book-id>.json` 작성 — `id`, `basePath` (모두 동일 이름), `title`, `description`, `children`
2. `src/book/<book-id>.ts` 로더 작성 (5줄)
3. `src/book/index.ts` `allBooks`에 추가
4. `src/map/index.ts`에 derive 함수 + switch case 추가
5. `src/lib/structure-serializer.ts` BOOK_META에 추가
6. `src/app/<book-id>/page.tsx` + `[...slugs]/page.tsx` 생성
7. `src/content/<book-id>/` 폴더에 leaf TSX 작성
8. `src/basket/<basket>.ts` `bookIds`에 등록 (≥1개 바구니 필수)

### 바구니 관리

**관리자 UI**: `/admin/structure` → "바구니 관리" 탭에서 바구니 생성·삭제, 책 할당/해제가 가능합니다. 모든 책은 최소 1개 바구니에 소속되어야 합니다.

## Next.js Note

This project uses Next.js 16 which may have breaking changes from earlier versions. Read `node_modules/next/dist/docs/` before writing Next.js code.
