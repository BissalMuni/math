---
date: 2026-04-30
time: 20:33
session_id: 2026-04-30-2033
title: "Supabase 스키마 격리 + 댓글 권한/UI 역할별 분리"
slug: "tenant-isolation-and-rbac-comments"
tags: [supabase, schema-isolation, rbac, auth, comments, nextjs-16, multi-tenant]
files_changed:
  - path: supabase/migrations/005_namespace_to_math_schema.sql
    change: created
    summary: math 전용 스키마 + 빈 테이블 3개(comments/topic_images/content_changes) + math-topic-images 버킷
  - path: src/lib/supabase/client.ts
    change: modified
    summary: createClient 에 db.schema='math' 옵션 추가
  - path: src/lib/supabase/images.ts
    change: modified
    summary: BUCKET 상수를 'math-topic-images' 로 변경
  - path: src/lib/supabase/comments.ts
    change: modified
    summary: deleteComment 의 author 일치 체크 제거 (가드는 API 레이어로 이동)
  - path: scripts/fetch-feedback.sh
    change: modified
    summary: PostgREST 호출에 Accept-Profile/Content-Profile=math 헤더 추가
  - path: scripts/log-content-changes.sh
    change: modified
    summary: 동일 헤더 추가
  - path: src/proxy.ts
    change: modified
    summary: matcher 를 /api/* 전체로 확장. 일반 API 는 차단 없이 x-user-role 헤더만 주입
  - path: src/app/api/comments/route.ts
    change: modified
    summary: POST 에 requirePermission 가드. feedback_type → edit_content/edit_structure 매핑. author 자동 기록
  - path: src/app/api/comments/[id]/route.ts
    change: modified
    summary: DELETE 는 rollback 권한(super_admin) 만 허용
  - path: src/components/section-comment.tsx
    change: modified
    summary: 편집 종류 토글 제거. 역할별 버튼 분기. 단일 종류 폼을 FeedbackButton 으로 분리
  - path: src/components/sidebar.tsx
    change: modified
    summary: 우상단에 SidebarAuth 통합
  - path: src/components/sidebar-auth.tsx
    change: created
    summary: 사이드바 로그인/역할/로그아웃 버튼
  - path: src/lib/auth/use-session.ts
    change: created
    summary: 단일 세션 캐시 공유 훅 (useSession + invalidateSession)
  - path: src/app/login/page.tsx
    change: modified
    summary: ?next= 쿼리 지원. 로그인 후 invalidateSession() 호출
related_sessions:
  - 2026-04-30-0802-pe-feedback-recovery-and-workflow-fix
---

# Supabase 스키마 격리 + 댓글 권한/UI 역할별 분리

## 🎯 목표

1. SectionComment 의 "내용 편집" / "구조 편집" 두 종류 의견을 **로그인 권한별로 완전히 분리**
2. 같은 Supabase 프로젝트를 다른 앱(`g-taxwiki`)과 공유하면서 발생할 수 있는 **테이블 충돌 차단**
3. 비로그인 상태에서 누구나 의견을 등록/삭제할 수 있던 보안 구멍 닫기

## 📖 배경

세션 직전 상태:

- [src/components/section-comment.tsx](../../src/components/section-comment.tsx) 의 의견 폼이 한 컴포넌트에서 토글로 `feedback_type` 을 고르게 돼 있음 (스크린샷 기준 "편집 종류: [내용 편집] [구조 편집]")
- [src/lib/auth/](../../src/lib/auth/) 에 4-tier 역할 시스템(`reader` / `content_editor` / `structure_editor` / `super_admin`)이 이미 구현돼 있으나, **`/admin/*` 라우트만 보호**하고 댓글 API 에는 미적용
- Supabase 테이블 이름이 전부 generic(`comments`, `topic_images`, `content_changes`) → 공유 프로젝트에서 충돌 위험
- `.env.local` 에 `JWT_SECRET` 과 `ROLE_*_PASSWORD` 가 비어있어 로그인 자체가 작동 안 하는 상태

사용자가 먼저 "두 절차를 완전히 분리해야 한다, 팝업에 두 프롬프트를 구분해서 넣으면 안 된다, 로그인 권한 구분 절차가 있나?" 질문하면서 세션 시작.

## 🔍 진행 과정

### 1. 기존 권한 시스템 재발견

[src/lib/auth/constants.ts](../../src/lib/auth/constants.ts), [session.ts](../../src/lib/auth/session.ts), [require-role.ts](../../src/lib/auth/require-role.ts) 를 읽어 이미 만들어진 자산 확인:

| 역할 | 권한 |
|---|---|
| `reader` | read |
| `content_editor` | read + **edit_content** |
| `structure_editor` | read + **edit_structure** |
| `super_admin` | 모두 + view_audit, rollback |

JWT 쿠키 세션, login/logout/me API, `requirePermission` 가드까지 이미 존재. 다만 `requirePermission` 은 `x-user-role` 헤더를 읽는데 **그 헤더를 세팅하는 미들웨어가 없어** admin API 도 사실상 깨진 상태였음.

### 2. Supabase 공유 문제 발견

사용자가 "이 프로젝트가 연결된 supabase db 가 다른 프로젝트와 테이블을 공유한다 그러면 안 됨"이라고 알림. 이어서 **g-taxwiki** 라는 같은 개념의 프로젝트가 동일 Supabase 인스턴스를 사용 중이라고 추가 정보 제공.

`grep -r ".from(" src/lib/supabase/` 로 전체 식별자 점검:

| 종류 | 이름 | 충돌 위험 |
|---|---|---|
| 테이블 | `comments` | 100% (양쪽 다 댓글 기능) |
| 테이블 | `topic_images` | 양쪽 다 콘텐츠 이미지 |
| 테이블 | `content_changes` | 양쪽 다 변경 이력 |
| Storage 버킷 | `topic-images` | 동일 |

### 3. 격리 방법 비교 → 방법 A(전용 스키마) 채택

두 방법 제시:

**A. 전용 스키마**: `CREATE SCHEMA math` 후 `math.comments` 등으로 이동
- 장점: 이름 깔끔, Postgres 네이티브 격리, GRANT/RLS 스키마 단위 관리
- 단점: Supabase 대시보드에서 "Exposed schemas" 에 `math` 추가 필요, PostgREST 호출 시 `Accept-Profile`/`Content-Profile` 헤더 또는 client `db.schema` 옵션 필요

**B. 테이블 prefix**: `math_comments` 등으로 RENAME
- 장점: 인프라 설정 0, 단순 string 치환
- 단점: 이름 길어짐, prefix 관리 부담

사용자가 **A 선택**.

### 4. 첫 마이그레이션 시도 → 위험성 인지하고 재작성

처음 작성한 [005 파일](../../supabase/migrations/005_namespace_to_math_schema.sql) 은 `ALTER TABLE public.comments SET SCHEMA math` 였음. 그러나 사용자가 "**g-taxwiki 프로젝트가 사용하고 있음**" 이라고 알리는 시점에 멈춤 — `SET SCHEMA` 는 **이동**이지 복제가 아니므로 그대로 적용하면 그쪽 앱이 즉시 깨짐.

사용자에게 데이터 이관 여부 확인 → "**math 프로젝트 row 는 굳이 가지고 올 필요 없다, 새로 시작한지 얼마 안 됐다**" 답변.

→ 마이그레이션 전면 재작성: public 은 일절 건드리지 않고, math 스키마에 빈 테이블만 새로 만드는 방식.

```sql
CREATE SCHEMA IF NOT EXISTS math;
GRANT USAGE ON SCHEMA math TO anon, authenticated, service_role;

CREATE TABLE math.comments ( ... );  -- 001+002+004 통합 정의
CREATE TABLE math.topic_images ( ... );
CREATE TABLE math.content_changes ( ... );

INSERT INTO storage.buckets (id, name, public)
VALUES ('math-topic-images', 'math-topic-images', true)
ON CONFLICT (id) DO NOTHING;
```

기존 4개 마이그레이션(001~004)은 손대지 않음 — 이미 적용된 public 테이블은 g-taxwiki 가 이어서 사용.

### 5. 코드 측 스키마 연결

[src/lib/supabase/client.ts](../../src/lib/supabase/client.ts) 에 한 줄 추가만으로 모든 `.from("comments")` 호출이 `math.comments` 로 해석되게 함:

```typescript
_supabase = createClient(url, key, {
  db: { schema: "math" },
});
```

bash 스크립트는 client SDK 가 아니라 raw curl 이라 PostgREST 헤더로 처리:

```bash
HEADERS=(
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}"
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}"
  -H "Accept-Profile: math"   # GET 용
  -H "Content-Profile: math"  # POST/PATCH/DELETE 용
)
```

### 6. Supabase 대시보드 설정 + 마이그레이션 적용

사용자가 직접 수행:

1. **Project Settings → Data API → Settings** 페이지에서 `Exposed schemas` 에 `math` 추가 ("3 of 3 schemas exposed: graphql_public, math, public")
2. SQL Editor 에서 [005 마이그레이션](../../supabase/migrations/005_namespace_to_math_schema.sql) 실행 → 성공
3. Table Editor 에서 schema 셀렉터 `math` 선택 → 3개 테이블 확인됨
4. dev 서버에서 댓글 등록 테스트 → `math.comments` 에 row 2건("hello", "hi") 정상 입력 확인

### 7. 첫 번째 커밋·푸시

`refactor(supabase): isolate tables to dedicated math schema` (커밋 `ff898b7`)

### 8. 권한 가드 + UI 분리 시작

#### 8a. 미들웨어 신설 → proxy 충돌 발견 → 합치기

처음에 `src/middleware.ts` 를 만들어 `x-user-role` 주입 로직 추가. dev 서버 시작 시 즉시 에러:

```
⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.
Unhandled Rejection: Error: Both middleware file "./src\middleware.ts" and
proxy file "./src\proxy.ts" are detected. Please use "./src\proxy.ts" only.
```

→ Next.js 16 에서 `middleware.ts` 가 `proxy.ts` 로 rename. 그리고 이미 [src/proxy.ts](../../src/proxy.ts) 가 있어 `/admin/*` 만 보호 중이었음.

해결: middleware.ts 삭제, proxy.ts 의 matcher 와 분기 로직 확장.

```typescript
export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
```

분기:
- `/admin/*`, `/api/admin/*` → 강제 게이트 (비로그인은 redirect/401, super_admin 전용 가드 유지)
- 그 외 `/api/*` (예: `/api/comments`) → **차단 없이 헤더만 주입**, 차단은 핸들러의 `requirePermission` 이 결정
- 일반 페이지 → 통과

위조 방지를 위해 `requestHeaders.delete("x-user-role")` 를 모든 경로에서 먼저 실행.

#### 8b. 댓글 API 가드

[src/app/api/comments/route.ts](../../src/app/api/comments/route.ts) POST 에 한 줄로 권한 분기:

```typescript
const required = fbType === "structure" ? "edit_structure" : "edit_content";
const denied = requirePermission(request, required);
if (denied) return denied;

const role = getRoleFromRequest(request);
const trimmedAuthor = role ? ROLE_LABELS[role] : (author?.trim().slice(0, 50) || "익명");
```

author 는 클라이언트가 보낸 값이 아니라 **역할 라벨로 자동 기록** (위조 차단 + 익명 노이즈 제거).

[src/app/api/comments/[id]/route.ts](../../src/app/api/comments/[id]/route.ts) DELETE 는 `rollback` 권한 (= super_admin) 만:

```typescript
const denied = requirePermission(request, "rollback");
if (denied) return denied;
```

기존 [comments.ts](../../src/lib/supabase/comments.ts) 의 `deleteComment(id, author)` 에서 author 일치 체크가 있었는데, super_admin 라벨("최고 관리자")과 댓글의 author 라벨("내용 수정자" 등)이 달라 매번 실패 → author 인자와 체크 자체를 제거하고 가드를 API 레이어에 일임.

#### 8c. useSession 훅 + AutoSectionComment 다중 인스턴스 대응

`AutoSectionComment` 가 페이지마다 수십 개의 SectionComment 를 띄우므로 각자 `/api/auth/me` 를 부르면 호출이 폭발. 단일 캐시 + subscriber 패턴으로 1회만 호출되게 함:

```typescript
// src/lib/auth/use-session.ts
let cache: SessionInfo | null | undefined;
const subscribers = new Set<(s: SessionInfo | null) => void>();
let inFlight: Promise<SessionInfo | null> | null = null;
```

`invalidateSession()` 으로 로그인/로그아웃 직후 캐시 무효화 + 모든 구독자 갱신.

#### 8d. SectionComment 역할별 분기

기존: 한 `SectionComment` 안에서 `feedback_type` 토글로 종류 선택.

신규: SectionComment 는 wrapper 역할만 하고, 실제 폼은 `FeedbackButton` (단일 종류)으로 분리. 역할별로 어느 버튼을 띄울지 결정:

```typescript
if (!session) return <Link href="/login">🔒</Link>;

return (
  <>
    {canContent && <FeedbackButton feedbackType="content" ... />}
    {canStructure && <FeedbackButton feedbackType="structure" ... />}
  </>
);
```

| 역할 | 표시 |
|---|---|
| 비로그인 | 🔒 (클릭 시 /login) |
| content_editor | 💬 내용 편집 만 |
| structure_editor | 🏗️ 구조 편집 만 |
| super_admin | 둘 다 + 댓글 호버 시 삭제 버튼 |

서버 응답은 종류 무관하게 다 가져오므로 클라이언트에서 `feedback_type === feedbackType` 으로 필터.

#### 8e. SidebarAuth + 로그인 페이지 개선

전역 헤더가 없어서 사이드바 우상단에 통합. 로그인/로그아웃 + 현재 역할 라벨 표시.

[login/page.tsx](../../src/app/login/page.tsx) 는 로그인 후 무조건 `/admin` 으로 보내고 있었는데 → `?next=` 쿼리 받게 수정 + `invalidateSession()` 호출 추가.

### 9. 두 번째 커밋·푸시

`feat(auth): split content/structure feedback by role permissions` (커밋 `2e437c1`)

## 🐛 디버깅 기록

### 문제 1: middleware vs proxy 충돌 (Next.js 16)

- **증상**: `Both middleware file "./src\middleware.ts" and proxy file "./src\proxy.ts" are detected`
- **원인**: Next.js 16 에서 `middleware.ts` deprecated → `proxy.ts` 로 rename. 프로젝트에 이미 admin 보호용 `proxy.ts` 가 있었음.
- **해결**: middleware.ts 삭제. proxy.ts 의 matcher 를 `/api/:path*` 까지 확장하고, admin 외 API 는 차단 대신 헤더 주입만 하도록 분기.
- **교훈**: 새 미들웨어를 만들기 전에 `src/proxy.ts` 가 있는지 먼저 확인. Next.js 버전(>=16) 에서는 무조건 `proxy.ts` 사용.

### 문제 2: 첫 마이그레이션이 다른 프로젝트를 깨뜨릴 뻔함

- **증상**: 처음 작성한 005 가 `ALTER TABLE public.comments SET SCHEMA math` — 이동 명령
- **원인**: 같은 Supabase 인스턴스를 g-taxwiki 가 사용 중이라는 사실을 늦게 알게 됨. 이동시키면 그쪽 `/rest/v1/comments` 가 즉시 404.
- **해결**: 사용자 알림 시점에 멈추고 의도 확인. 데이터 이관 불필요 응답을 받고 "빈 테이블 신설" 방식으로 재작성.
- **교훈**: 멀티-테넌트 환경에서는 `SET SCHEMA`/`RENAME`/`DROP` 같은 파괴 작업 전에 **누가 그 객체를 쓰는지** 먼저 확인. 새로 시작하는 프로젝트는 처음부터 전용 스키마로.

### 문제 3: ESLint `react-hooks/set-state-in-effect`

- **증상**: 새로 만든 `use-session.ts` 와 SectionComment 양쪽에서 lint error
- **원인**:
  - useSession: `useEffect` 안에서 `if (cache !== undefined) setSession(cache)` 동기 호출
  - SectionComment: `useEffect` 안에서 fetch 트리거 (toggle 패턴)
- **해결**:
  - useSession: `useState(() => cache)` 의 lazy initializer 로 옮겨 effect 에서는 setState 안 함
  - SectionComment: `useEffect` 자체를 없애고 toggle 클릭 핸들러에서 fetch 트리거
- **교훈**: React 19+/Next.js 16 의 lint 규칙은 effect 본문 동기 setState 를 적극 차단. 초기값은 lazy initializer, 외부 트리거는 이벤트 핸들러로.

## 🔑 핵심 결정

| 결정 | 선택안 | 기각안 | 이유 |
|---|---|---|---|
| 멀티-테넌트 격리 | 전용 스키마 (`math`) | 테이블 prefix (`math_*`) | 향후 RLS/GRANT 를 스키마 단위로 깔끔히 관리하려고. 이름도 깨끗 유지. |
| 마이그레이션 데이터 처리 | 빈 테이블 신설 | public 의 row 일부 복사 | 사용자가 "새로 시작한지 얼마 안 됐다" — 복사할 가치 있는 데이터 없음. 단순 < 안전. |
| 권한 헤더 주입 위치 | proxy.ts 통합 | 별도 middleware.ts | Next.js 16 deprecation + 기존 admin 게이트와 동일 채널 공유로 일관성 |
| 댓글 author 기록 방식 | 역할 라벨 자동 기록 | 클라이언트 입력 유지 | 위조 차단 + "익명" 노이즈 제거. 어차피 권한 게이트로 누가 등록하는지 보장됨 |
| AutoSectionComment 의 세션 조회 | 단일 캐시 + subscriber | 컴포넌트마다 독립 fetch | 페이지당 수십 개 인스턴스에서 `/api/auth/me` 폭발 방지 |
| FeedbackButton 분리 단위 | 종류별 별개 컴포넌트 | 한 컴포넌트에서 type prop 분기 | 사용자 요구가 "두 절차를 완전히 분리, 같은 팝업에 두지 말 것" — 인스턴스 자체를 분리해 같은 폼을 공유하지 않음 |

## 📂 변경된 파일

### 마이그레이션·인프라

- [supabase/migrations/005_namespace_to_math_schema.sql](../../supabase/migrations/005_namespace_to_math_schema.sql) — math 스키마 + 빈 테이블 3개 + 신규 버킷
- [src/lib/supabase/client.ts](../../src/lib/supabase/client.ts) — `db.schema='math'` 옵션
- [src/lib/supabase/images.ts](../../src/lib/supabase/images.ts) — `BUCKET = 'math-topic-images'`
- [src/lib/supabase/comments.ts](../../src/lib/supabase/comments.ts) — `deleteComment` 에서 author 체크 제거
- [scripts/fetch-feedback.sh](../../scripts/fetch-feedback.sh) — `Accept-Profile`/`Content-Profile` 헤더
- [scripts/log-content-changes.sh](../../scripts/log-content-changes.sh) — 동일

### 권한·미들웨어

- [src/proxy.ts](../../src/proxy.ts) — matcher `/api/:path*` 까지 확장 + 일반 API 분기
- [src/app/api/comments/route.ts](../../src/app/api/comments/route.ts) — POST 가드 + 자동 author
- [src/app/api/comments/[id]/route.ts](../../src/app/api/comments/[id]/route.ts) — DELETE 는 super_admin

### 클라이언트

- [src/lib/auth/use-session.ts](../../src/lib/auth/use-session.ts) — 단일 캐시 + invalidate
- [src/components/sidebar-auth.tsx](../../src/components/sidebar-auth.tsx) — 로그인/로그아웃 affordance
- [src/components/sidebar.tsx](../../src/components/sidebar.tsx) — SidebarAuth 통합
- [src/components/section-comment.tsx](../../src/components/section-comment.tsx) — 종류 토글 제거 + FeedbackButton 분리
- [src/app/login/page.tsx](../../src/app/login/page.tsx) — `?next=` + 캐시 무효화

## ✅ 완료된 것 / 🚧 남은 것

### 완료

- [x] math 스키마 + 빈 테이블 신설, Supabase 대시보드 expose, 마이그레이션 적용 검증
- [x] 코드/스크립트의 PostgREST 호출이 math 스키마 바라보게 전환
- [x] proxy.ts 에서 JWT → `x-user-role` 주입 (admin 외 API 도)
- [x] 댓글 API POST/DELETE 권한 가드
- [x] SectionComment 역할별 버튼 분기 + 종류 토글 제거
- [x] 단일 세션 캐시 훅
- [x] 사이드바 로그인 affordance
- [x] 두 차례 커밋·푸시 (`ff898b7`, `2e437c1`)

### 후속 과제

- [ ] **사용자 직접 작업**: `.env.local` 에 `JWT_SECRET` + 4개 `ROLE_*_PASSWORD` 추가 (이거 없으면 로그인 자체가 작동 안 함)
- [ ] **단계 C — AI 처리 분리**: [.github/workflows/review-feedback.yml](../../.github/workflows/review-feedback.yml) 의 step 을 `--type=content` / `--type=structure` 두 step 으로 나누고 각각 다른 시스템 프롬프트
  - 내용 편집 step: "src/content/ 의 텍스트·수식만 수정. 파일 추가·이동·삭제 금지"
  - 구조 편집 step: "src/content/ 파일 추가·이동 허용. 목차 재배치 가능"
- [ ] (선택) g-taxwiki 도 `tax` 같은 전용 스키마로 격리 — 현재는 public 에 그대로 남아있음
- [ ] (선택) RLS 정책 도입 — 지금은 service_role 만 사용해서 RLS 무관하지만, 추후 anon/authenticated 키 쓰게 되면 필요
- [ ] (선택) topic_images 버킷의 public 여부 재검토 — 현재 public, 의견 첨부에 민감 데이터 들어갈 수 있음

## 💡 인사이트

### 1. "공유 Supabase 프로젝트" 는 흔하지만 위험

비용 절감 목적으로 한 Supabase 프로젝트에 여러 앱을 올리는 게 일반적인데, 기본값(public 스키마)으로 시작하면 **두 번째 앱이 추가될 때 이미 늦음**. 처음부터 앱마다 스키마를 분리하는 게 안전. 이번처럼 한쪽이 새로 시작하는 단계라 재구축이 쉬웠지만, 양쪽 다 운영 중이었으면 데이터 분리만 며칠 걸렸을 것.

### 2. 권한 시스템이 "절반만" 만들어지면 거의 항상 깨져있음

- 4-tier 역할 + JWT 세션 + ROLE_PERMISSIONS 매핑까지 정교하게 구현돼 있음
- 그런데 `requirePermission` 이 헤더를 읽는 구조였고, **그 헤더를 세팅하는 미들웨어가 없어서** admin API 도 사실상 작동 안 했음
- 검증할 통합 테스트가 없으니 "있어 보이는데 안 되는" 상태가 오래 유지됨

교훈: 권한 체계를 설계할 때는 **end-to-end 흐름(쿠키 → 미들웨어 → 헤더 → 가드 → 응답)을 한 번에 통과시키는 smoke test** 한 개라도 있어야 함.

### 3. 클라이언트 입력 author 의 위험성

기존: 클라이언트가 `author: "익명"` 을 전송 → 서버가 그대로 저장. 누구든 다른 사람의 author 로 위장 가능했고, 댓글 삭제 권한도 author 일치로만 체크.

변경 후: author 는 **서버에서 역할 라벨로 자동 기록**. 클라이언트가 보내도 무시.

이런 패턴은 author/owner/created_by 가 있는 거의 모든 테이블에 적용해야 함.

### 4. AutoSectionComment 의 N+1 함정

페이지마다 SectionComment 인스턴스가 수십 개 — 각자 `/api/auth/me` 를 부르면 페이지 진입 시 30~50개 동시 요청. 서버 부하 + 캐시 헤더 미적용 시 매번 JWT 검증.

**단일 캐시 + subscriber 패턴**으로 1회 호출. SWR/React Query 같은 라이브러리가 같은 문제를 풀지만, 이 정도 작은 케이스는 60줄 hook 으로 충분.

### 5. Next.js 16 의 deprecations 가 조용함

- `middleware` → `proxy` rename 은 **새 파일 만들 때 lint 가 잡지 않음**. dev 서버 켜야 빨간 줄.
- ESLint 의 `react-hooks/set-state-in-effect` 도 React 19 와 함께 등장한 새 규칙. 기존 코드도 다수 위반 중 (`src/lib/progress.ts:29` 등 — 이번엔 손대지 않음).

업그레이드 시 deprecation 노트를 한 번 훑어두는 게 좋음. 특히 파일 컨벤션 변경(`middleware`→`proxy`).

## 🔗 관련 문서

- [선행 세션: PE 피드백 복구 + 워크플로 권한 수정](./2026-04-30-0802-pe-feedback-recovery-and-workflow-fix.md)
- [.spec/constitution.md](../../.spec/constitution.md)
- [CLAUDE.md](../../CLAUDE.md) — 콘텐츠 작성 규칙 (의견 버튼 자동 주입)
