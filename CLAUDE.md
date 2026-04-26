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

## Tree Depth Structure

목차 depth: **4단계**

1. 학년/과목 (e.g., 중1, 수학Ⅰ)
2. 대단원 (e.g., Ⅰ. 수와 연산)
3. 중단원 (e.g., 1. 소인수분해)
4. 소단원 (e.g., 소수와 합성수) — leaf node, contains actual learning content

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

## Next.js Note

This project uses Next.js 16 which may have breaking changes from earlier versions. Read `node_modules/next/dist/docs/` before writing Next.js code.
