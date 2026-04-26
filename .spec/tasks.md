# Tasks

## Phase 1: Setup

- [x] [T001] 추가 패키지 설치: katex, react-katex, mafs, vitest (`package.json`)
- [x] [T002] 트리 노드 타입 정의 (`src/data/types.ts`)
- [x] [T003] 중학교 교육과정 트리 데이터 작성 (`src/data/middle-school.ts`)
- [x] [T004] 고등학교 교육과정 트리 데이터 작성 (`src/data/high-school.ts`)
- [x] [T005] LLM 수학 트리 데이터 작성 (`src/data/llm-math.ts`)

## Phase 2: Core Layout

- [x] [T006] 루트 레이아웃 — 사이드바 + 메인 콘텐츠 영역 (`src/app/layout.tsx`)
- [x] [T007] 트리 네비게이션 컴포넌트 — 펼치기/접기, 현재 위치 하이라이트 (`src/components/sidebar.tsx`)
- [x] [T008] Breadcrumb 컴포넌트 (`src/components/breadcrumb.tsx`)
- [x] [T009] 랜딩 페이지 — 카테고리 선택 (`src/app/page.tsx`)
- [x] [T010] 중학교 동적 라우트 페이지 (`src/app/middle/[...slugs]/page.tsx`)
- [x] [T011] 고등학교 동적 라우트 페이지 (`src/app/high/[...slugs]/page.tsx`)
- [x] [T012] LLM 수학 라우트 페이지 — 개요, 분야별, 절차별 (`src/app/llm/[...slugs]/page.tsx`)

## Phase 3: Content Infrastructure

- [x] [T013] KaTeX 수식 렌더링 래퍼 컴포넌트 (`src/components/math-formula.tsx`)
- [x] [T014] Mafs 시각화 래퍼 컴포넌트 (`src/components/math-viz.tsx`)
- [x] [T015] 콘텐츠 페이지 레이아웃 — 개념 + 공식 + 시각화 (`src/components/topic-page.tsx`)
- [x] [T016] 진도 추적 유틸 — localStorage 관리 (`src/lib/progress.ts`)
- [x] [T017] 진도 추적 hook — useProgress (`src/lib/progress.ts`)
- [x] [T018] 완료 체크 토글 UI (`src/components/progress-check.tsx`)

## Phase 4: Content Authoring (Pilot)

- [x] [T019] 중1 소인수분해 — 소인수분해 콘텐츠 (`src/content/middle/grade1/prime-factorization-concept.tsx`)
- [x] [T020] 중1 소인수분해 — 최대공약수와 최소공배수 콘텐츠 (`src/content/middle/grade1/gcd-lcm.tsx`)
- [x] [T021] 콘텐츠 레지스트리 + 동적 로딩 (`src/content/registry.ts`, `src/components/topic-content.tsx`)
- [x] [T022] 빌드 + 동작 검증 (파일럿 소단원 E2E 확인)

## Phase 4: Content Authoring (Full)

- [ ] [T023] 중학교 1학년 나머지 소단원 콘텐츠 (`src/content/middle/grade1/`)
- [ ] [T024] 중학교 2학년 소단원 콘텐츠 (`src/content/middle/grade2/`)
- [ ] [T025] 중학교 3학년 소단원 콘텐츠 (`src/content/middle/grade3/`)
- [ ] [T026] 고등학교 공통수학1 소단원 콘텐츠 (`src/content/high/common-math1/`)
- [ ] [T027] 고등학교 공통수학2 소단원 콘텐츠 (`src/content/high/common-math2/`)
- [ ] [T028] 고등학교 대수 소단원 콘텐츠 (`src/content/high/algebra/`)
- [ ] [T029] 고등학교 미적분Ⅰ 소단원 콘텐츠 (`src/content/high/calculus1/`)
- [ ] [T030] 고등학교 미적분Ⅱ 소단원 콘텐츠 (`src/content/high/calculus2/`)
- [ ] [T031] 고등학교 확률과통계 소단원 콘텐츠 (`src/content/high/prob-stat/`)
- [ ] [T032] 고등학교 기하 소단원 콘텐츠 (`src/content/high/geometry/`)
- [ ] [T033] 고등학교 경제수학 소단원 콘텐츠 (`src/content/high/econ-math/`)
- [ ] [T034] 고등학교 인공지능수학 소단원 콘텐츠 (`src/content/high/ai-math/`)
- [ ] [T035] 고등학교 직무수학 소단원 콘텐츠 (`src/content/high/vocational-math/`)
- [ ] [T036] LLM 수학 분야별 콘텐츠 (`src/content/llm/fields/`)
- [ ] [T037] LLM 수학 파이프라인 절차별 콘텐츠 (`src/content/llm/pipeline/`)

## Phase 5: Polish

- [ ] [T038] 반응형 사이드바 — 모바일 drawer (`src/components/tree-nav.tsx`)
- [ ] [T039] 접근성 — 키보드 네비게이션, aria 속성 (전체)
- [ ] [T040] SEO 메타데이터 — 각 소단원별 title, description (동적 라우트 페이지)

## Summary

- **총 작업 수**: 40개
- **Phase 1 (Setup)**: 5개 — 패키지 + 데이터
- **Phase 2 (Core Layout)**: 7개 — 레이아웃 + 라우팅
- **Phase 3 (Content Infra)**: 6개 — KaTeX + Mafs + 진도추적
- **Phase 4 (Content)**: 19개 — 파일럿 4개 + 전체 15개
- **Phase 5 (Polish)**: 3개 — 반응형 + 접근성 + SEO
