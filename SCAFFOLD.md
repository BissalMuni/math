# Scaffold Guide

이 프로젝트의 4계층 구조(basket/book/content/map)를 새 프로젝트에 그대로 적용하기 위한 가이드.

## 아키텍처 요약

```
basket/  → 책을 묶는 UX 라벨 (사이드바 그룹)
book/    → 책 정의 + 트리 데이터 (JSON)
content/ → leaf별 단일 TSX 파일
map/     → book + leaf → content 동적 import
```

## 그대로 복사하는 파일

아래 파일들은 도메인과 무관하게 동작한다. 새 프로젝트에 그대로 복사.

### 컴포넌트

```
src/components/
├── navigation/   # 사이드바, 브레드크럼, context provider
├── content/      # 페이지 뷰 (TopicPage, TopicContent, CategoryOverview)
├── math/         # KaTeX 수식, Mafs 시각화
├── feedback/     # 댓글, 이미지 그리드
├── progress/     # 학습 진도 체크
└── admin/        # 관리자 대시보드, 구조 편집기
```

### 인프라

```
src/lib/
├── auth/         # JWT 세션, 역할 기반 권한
├── supabase/     # DB 클라이언트, 댓글/이미지/변경이력 CRUD
├── types.ts      # 공통 타입
├── progress.ts   # localStorage 진도
└── structure-serializer.ts  # 트리 직렬화
```

### API 라우트

```
src/app/api/
├── auth/         # 로그인, 로그아웃, 현재 사용자
├── comments/     # 댓글 CRUD
├── images/       # 이미지 업로드/삭제
└── admin/        # 변경이력, 롤백, 구조 수정
```

### 기타

```
src/proxy.ts                # JWT 미들웨어
src/app/admin/              # 관리자 페이지
src/app/login/              # 로그인 페이지
src/app/layout.tsx          # 루트 레이아웃 (Sidebar + main)
src/basket/types.ts         # Basket 타입
src/book/types.ts           # Book, TreeNode 타입 + 유틸
src/map/index.ts            # getContentComponent (패턴만 복사, case 수정)
supabase/migrations/005_*   # DB 최종 스키마
```

### 컨벤션 문서

```
CONVENTION_TREE.md           # 트리 구조, 명명, 깊이 규칙
CONVENTION_CONTENT.md        # TSX 콘텐츠 작성 규칙 (헤딩, 컴포넌트)
CLAUDE.md                    # Claude Code 지시사항 (프로젝트별 수정)
```

## 새 프로젝트에서 수정하는 부분

### 1. 바구니 정의 — `src/basket/`

기존 `math.ts`, `ai.ts`를 삭제하고 새 바구니 파일 생성.

```ts
// src/basket/lang.ts
import type { Basket } from "./types";

export const langBasket: Basket = {
  id: "lang",
  title: "언어",
  bookIds: ["korean", "english"],
};
```

`index.ts`에서 새 바구니를 등록:

```ts
// src/basket/index.ts
import { langBasket } from "./lang";

export const allBaskets: Basket[] = [langBasket];
```

### 2. 책 데이터 — `src/book/`

#### 2-1. 트리 JSON 작성

```jsonc
// src/book/data/korean.json
{
  "id": "korean",
  "basePath": "korean",
  "title": "국어",
  "description": "국어 학습",
  "children": [
    {
      "id": "kr-grammar",
      "slug": "grammar",
      "title": "1장. 문법",
      "children": [
        { "id": "kr-grammar-subject", "slug": "subject-predicate", "title": "Ⅰ. 주어와 서술어" },
        { "id": "kr-grammar-modifier", "slug": "modifier", "title": "Ⅱ. 수식어" }
      ]
    }
  ]
}
```

#### 2-2. 로더 작성

```ts
// src/book/korean.ts
import data from "./data/korean.json";
import type { Book } from "./types";

export const korean = data as Book;
```

#### 2-3. index.ts 수정

```ts
// src/book/index.ts
import { korean } from "./korean";

export const allBooks: Book[] = [korean];
```

### 3. 매핑 — `src/map/index.ts`

derive 함수 추가 + switch case 추가:

```ts
function deriveKoreanPath(book: Book, leaf: TreeNode): string | null {
  const path = findNodePath(book.children, leaf.id);
  if (!path || path.length < 2) return null;
  const chapter = path[0];
  return `korean/${chapter.slug}/${leaf.slug}`;
}

// derivePath 내 switch에 추가
case "korean": return deriveKoreanPath(book, leaf);
```

### 4. 라우트 — `src/app/<book-id>/`

```tsx
// src/app/korean/page.tsx
import { korean } from "@/book/korean";
import { CategoryOverview } from "@/components/content/category-overview";

export default function KoreanPage() {
  return <CategoryOverview book={korean} />;
}
```

```tsx
// src/app/korean/[...slugs]/page.tsx
import { notFound } from "next/navigation";
import { korean } from "@/book/korean";
import { findNodeBySlugs } from "@/book";
import { TopicPage } from "@/components/content/topic-page";

export default async function KoreanCatchAll({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const { slugs } = await params;
  const node = findNodeBySlugs(korean.children, slugs);
  if (!node) notFound();

  return <TopicPage node={node} slugs={slugs} basePath="korean" book={korean} />;
}
```

### 5. 콘텐츠 — `src/content/<book-id>/`

```tsx
// src/content/korean/grammar/subject-predicate.tsx
"use client";

import { CalcBox, SubSection } from "@/components/content/shared";

export default function SubjectPredicate() {
  return (
    <div className="space-y-8">
      <CalcBox title="1. 주어란?">
        <p>문장에서 동작이나 상태의 주체가 되는 말.</p>

        <SubSection title="(1) 주어의 형태">
          <p>체언 + 주격 조사(이/가, 은/는, 에서)</p>
        </SubSection>
      </CalcBox>
    </div>
  );
}
```

### 6. 환경변수 — `.env.local`

```env
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxx
JWT_SECRET=xxx
GITHUB_TOKEN=xxx          # 구조 편집 시 필요
GITHUB_REPO=owner/repo    # 구조 편집 시 필요
```

### 7. CLAUDE.md 수정

프로젝트 개요, 현재 책 목록, Codebase Layout을 새 프로젝트에 맞게 수정.

## 체크리스트

새 프로젝트 세팅 후 확인:

- [ ] `pnpm install` 성공
- [ ] `pnpm build` 에러 없음
- [ ] 바구니에 모든 책이 등록됨 (고아 책 없음)
- [ ] `allBooks`에 모든 책이 추가됨
- [ ] `map/index.ts`에 모든 책의 derive + switch case 있음
- [ ] 각 책의 `app/<book-id>/page.tsx` + `[...slugs]/page.tsx` 있음
- [ ] 콘텐츠 파일 경로가 map의 derive 결과와 일치
- [ ] `.env.local` 환경변수 설정 완료
- [ ] 사이드바에 바구니 → 책 → 트리 정상 표시
- [ ] leaf 클릭 시 콘텐츠 정상 렌더링
