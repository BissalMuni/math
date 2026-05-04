# 수학 학습 (Korean Math Study)

학습한 지식을 **바구니 → 책 → 단원 트리 → 콘텐츠** 4계층으로 정리·축적하는 개인 학습 지식 관리 체계.
각 소단원은 KaTeX 수식과 Mafs 시각화를 활용한 단일 TSX 파일 — AI가 댓글 기반으로 단원 단위 편집 가능.

## 4계층 모델

| 계층 | 책임 | 위치 |
|---|---|---|
| **basket** | 책을 묶는 UX 라벨 (책 ID 참조만, 사이드바 그룹) | `src/basket/` |
| **book** | 학습 단위. URL·폴더·관리의 독립 기준 | `src/book/` |
| **content** | leaf별 단일 TSX 파일 | `src/content/` |
| **map** | book + leaf → content 컴포넌트 (라우팅 컨벤션) | `src/map/` |

## 현재 책 (4권, 계속 추가 예정)

| 책 | URL | 소속 바구니 |
|---|---|---|
| **중등수학** | `/middle-school` | 수학 |
| **고등수학** | `/high-school` | 수학 |
| **LLM 수학** | `/llm-math` | 수학, AI/LLM |
| **LLM 학습** | `/llm-learning` | AI/LLM |

새 주제(국어·영어·역사 등)는 별도의 책(`Book`)으로 추가하고, 적절한 바구니에 ID 등록. 자세한 트리·명명 규칙은 [CONVENTION_TREE.md](CONVENTION_TREE.md) 참조.

## 개발

```bash
pnpm install
pnpm dev            # 개발 서버 (http://localhost:3000)
pnpm build          # 프로덕션 빌드
pnpm lint           # ESLint
```

## 기술 스택

Next.js 16 (App Router) + React 19 · TypeScript · Tailwind CSS v4 · KaTeX · Mafs · pnpm · vitest · Supabase (`math` 스키마)

트리·콘텐츠는 JSON/TS 파일로 관리. 댓글·이미지·콘텐츠 변경 이력은 Supabase. 인증은 자체 세션 (jose / JWT). 학습 진도는 localStorage.

## 문서

- [CLAUDE.md](CLAUDE.md) — 아키텍처·코드베이스 위치·개발 가이드
- [.spec/](.spec/) — 명세 (constitution / spec / plan / tasks)
- [CONVENTION_CONTENT.md](CONVENTION_CONTENT.md) — 콘텐츠 TSX 작성 규칙
- [CONVENTION_TREE.md](CONVENTION_TREE.md) — 트리 구조·명명 규칙

## 디렉토리 구조

```
src/
├── basket/       # 바구니 메타 (책 묶음 라벨)
├── book/         # 책 데이터·로더 (트리 JSON + 타입)
├── content/      # 학습 콘텐츠 TSX (소단원 1개 = 파일 1개)
├── map/          # book + leaf → content 라우팅
├── app/          # Next.js App Router 라우트 (책당 1폴더)
├── components/   # 도메인별 컴포넌트 (navigation/content/math/feedback/progress/admin)
├── lib/          # 인프라 (auth, supabase, ...)
└── proxy.ts
```
