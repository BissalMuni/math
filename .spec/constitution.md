# Constitution

## Project

- **Name**: math
- **Description**: 중·고등 수학 + LLM 수학을 인터랙티브 웹으로 학습하는 앱

## Tech Stack

- **Framework**: Next.js 16 (App Router, src directory)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Package Manager**: pnpm
- **Testing**: vitest
- **Math Rendering**: KaTeX (SSR 지원, 빠른 렌더링)
- **Interactive Visualization**: Mafs (React 네이티브 수학 시각화)
- **Deployment**: Vercel (target)

## Data Management

- 교육과정 데이터: JSON/TS 파일로 관리 (DB 없음)
- 학습 진도: localStorage 저장 (인증 없음)

## Coding Conventions

- Code comments in Korean
- Commit messages in English
- File naming: kebab-case
- Component naming: PascalCase
- Import alias: `@/*` → `src/*`

## Non-Functional Requirements

- Mobile-first responsive design
- Accessible (WCAG 2.1 AA)
- Fast initial load (interactive math content)
- SEO-friendly curriculum pages
