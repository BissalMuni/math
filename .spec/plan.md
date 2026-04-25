# Plan

## Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (sidebar + content)
│   ├── page.tsx            # Landing page
│   ├── middle/[grade]/[unit]/[sub]/page.tsx   # 중학교 콘텐츠
│   ├── high/[subject]/[unit]/[sub]/page.tsx    # 고등학교 콘텐츠
│   └── llm/[stage]/page.tsx                    # LLM 수학 콘텐츠
├── components/
│   ├── tree-nav/           # 트리 네비게이션 컴포넌트
│   ├── content/            # 콘텐츠 표시 컴포넌트
│   └── ui/                 # 공통 UI 컴포넌트
├── data/                   # 교육과정 데이터 (JSON/TS)
│   ├── middle-school.ts
│   ├── high-school.ts
│   └── llm-pipeline.ts
└── lib/                    # 유틸리티
```

## Dependencies

- Next.js 16 (installed)
- Tailwind CSS v4 (installed)
- (추후) KaTeX or MathJax — 수식 렌더링
- (추후) D3.js or Mafs — 인터랙티브 시각화

## Implementation Order

1. **Phase 1: Setup** — 데이터 구조 정의, 트리 네비게이션
2. **Phase 2: Core** — 라우팅, 콘텐츠 페이지 레이아웃
3. **Phase 3: Features** — 수식 렌더링, LLM 수학 섹션
4. **Phase 4: Polish** — 인터랙티브 시각화, 반응형, 접근성
