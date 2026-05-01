---
date: 2026-04-30
time: 08:02
session_id: 2026-04-30-0802
title: "Positional Encoding 피드백 손실 복구 + 자동 리뷰 워크플로 권한 수정"
slug: "pe-feedback-recovery-and-workflow-fix"
tags: [github-actions, feedback-loop, content-recovery, positional-encoding, workflow-permissions]
files_changed:
  - path: .github/workflows/review-feedback.yml
    change: modified
    summary: job에 permissions.contents=write 추가 (사용자 원격 커밋 80da7da와 동일 → rebase 시 자동 정리)
  - path: src/content/llm-learn/ch3-positional-encoding.tsx
    change: modified
    summary: 4 Step 구조 → 17개 CalcBox 섹션으로 전면 재구성 (사용자 댓글 목차 그대로 + 세부 불릿 포함)
related_sessions: []
---

# Positional Encoding 피드백 손실 복구 + 자동 리뷰 워크플로 권한 수정

## 🎯 목표

- 사용자가 댓글로 남긴 Positional Encoding 17섹션 목차 피드백이 [review-feedback.yml](../../.github/workflows/review-feedback.yml) 자동 워크플로로 실제 반영됐는지 확인
- 반영 안 됐다면 원인 규명 + 복구

## 📖 배경

직전 세션(`4ee5cc8` 커밋)에서 Supabase 댓글을 GitHub Actions가 시간마다 가져와 Claude Code로 콘텐츠에 자동 반영하는 시스템을 도입함. 사용자가 챕터 3(Positional Encoding) 페이지에서 17개 항목·세부 불릿이 포함된 상세 목차를 댓글로 남김 (KST 2026-04-29 08:16).

이번 세션에서 사용자가 "처리됐는지 확인해달라"고 요청.

## 🔍 진행 과정

### 1. 워크플로 실행 이력 조사

`gh run list --workflow=review-feedback.yml`로 최근 실행 확인:

| 실행 시각 (UTC) | 결과 | 소요 | 의미 |
|---|---|---|---|
| 2026-04-29 04:01 | ✅ | 29s | 미처리 의견 2건 ("Hi", "ㄱ") — 단순 감상으로 판단, processed 마킹만 |
| 2026-04-29 03:13 | ✅ | 16s | 수동 실행, 미처리 없음 |
| **2026-04-29 00:06** | **❌** | **7m19s** | **실제 처리 시도 → 푸시 실패** |
| 2026-04-29 23:09 (전날) | ✅ | 13s | 미처리 없음 (사용자 댓글 직전 실행) |

타이밍 매핑:
- 사용자 댓글: 2026-04-28 23:16 UTC (= KST 04-29 08:16)
- 다음 스케줄 실행: 2026-04-29 00:06 UTC (= KST 09:06) ← **여기서 처리 시도**

### 2. 실패 실행(25084122868) 로그 분석

`gh run view 25084122868 --log-failed` 결과:

```
2026-04-29T00:13:21.5285Z 처리한 피드백: ll-ch3-1 "3-1. 왜 필요한가" — 목차 재구성 + 예제 중심 설명 요청
2026-04-29T00:13:21.5286Z 변경 내용 (src/content/llm-learn/ch3-positional-encoding.tsx):
2026-04-29T00:13:21.5287Z 기존 4개 Step 구조 → 14개 CalcBox 섹션으로 전면 재구성
... (14개 섹션 나열)
2026-04-29T00:13:21.6970Z [main df0d212] Apply user feedback (1 comments)
2026-04-29T00:13:21.6971Z  1 file changed, 395 insertions(+), 120 deletions(-)
2026-04-29T00:13:21.9563Z remote: Permission to BissalMuni/math.git denied to github-actions[bot].
2026-04-29T00:13:21.9564Z fatal: ... 403
```

**핵심 발견**:
1. Claude Code는 워크플로 안에서 정상 동작 — 댓글 의도 파악 + 14섹션 재구성 + 로컬 커밋 (`df0d212`) 모두 성공
2. **마지막 `git push`가 403으로 거부됨** → 변경이 GitHub에 반영되지 않음
3. 러너는 작업 종료와 함께 사라져 `df0d212` 커밋도 함께 증발
4. 더 나쁜 점: 워크플로 흐름상 `--mark-all-unprocessed`가 push **이전**에 실행됨 → Supabase에는 processed=true로 마킹된 채로 남음 → 후속 워크플로가 같은 댓글을 다시 안 잡음 (= 피드백이 영구 손실 상태)

### 3. 원인 추적

워크플로 YAML에 `permissions:` 블록이 누락. 로그의 `GITHUB_TOKEN Permissions`는 `Contents: write`로 표시됐으나 실제 push는 거부됨 — 레포 Settings의 워크플로 권한이 read-only로 제한됐거나, 명시적 job-level permissions 부재가 원인일 가능성.

### 4. 복구 작업

**(a) 워크플로 권한 추가**:
```yaml
jobs:
  review:
    runs-on: ubuntu-latest
    permissions:           # ← 추가
      contents: write      # ← 추가
    steps:
```

**(b) 콘텐츠 17섹션 재구성**: 사용자 댓글 목차를 그대로 따라 [ch3-positional-encoding.tsx](../../src/content/llm-learn/ch3-positional-encoding.tsx)를 4 Step → 17 CalcBox로 전면 재작성. 각 CalcBox에 `Bullets` 보조 컴포넌트로 세부 항목까지 포함. 예제도 3토큰 → 4토큰(pos=0,1,2,3)으로 확장.

17섹션 목록:
1. 필요한 이유 (RNN vs Transformer)
2. 공식 설명 (pos, i, d_model)
3. 각 차원별 주파수
4. sin만 쓰면 안 되는 이유 (pos=0)
5. pos별 실제 계산 예제
6. 단어 벡터에 더하기
7. 비트 플래그와 비교
8. 주행거리계 비유 (시계 → 주행거리계 수정)
9. 크기 순서로 정렬되나 (벡터 거리)
10. 주기는 다르지만 계산은 매번
11. 분모가 크면 0에 가까워짐
12. 느린 차원의 긴 문장 역할
13. 블록마다 더하나 (한 번만)
14. 더하고 학습하고 반복
15. 학습 중 바뀌는 것 vs 안 바뀌는 것
16. fp16/fp4/int8 긴 주기 잘림 문제
17. 양자화 개념

### 5. 커밋 + 푸시 (경합 발생)

`git push` 시 거부:
```
! [rejected]  main -> main (fetch first)
```

`git fetch` 결과 — 사용자가 같은 워크플로 권한 수정을 원격에 먼저 푸시:
```
80da7da Add write permissions for contents in review job
Author: BissalMuni <haeryongdoryong@gmail.com>
Date:   Wed Apr 29 12:09:36 2026 +0900
```

`git rebase origin/main`으로 충돌 없이 정리 (양쪽 워크플로 변경이 동일 → git이 자동 처리, 결과 커밋에는 콘텐츠 변경만 남음). `git stash`로 미커밋 settings.json은 잠시 보관 후 복원.

최종 푸시: `ab97be9 Restructure positional-encoding into 17 sections + fix workflow push permission`

## 🐛 디버깅 기록

### 문제 1: 워크플로가 변경을 반영했다고 했는데 실제 코드는 그대로

- **증상**: 사용자가 17섹션 댓글을 남겼고, 4시간 뒤 `04:01` 워크플로 실행은 "미처리 2건만 있고 모두 단순 감상" 보고. 그러나 실제로는 17섹션 댓글이 처리된 흔적이 어디에도 없음
- **원인**: `00:06` 실행에서 처리는 됐지만 `git push`가 403으로 막힘 + Supabase 마킹은 push 이전에 일어나 피드백이 "처리됨"으로 박힌 채 코드 미반영 상태로 굳음
- **해결**: 워크플로에 `permissions: contents: write` 추가 + 손실된 콘텐츠 변경을 사용자 댓글에서 직접 복원
- **교훈**: 외부 상태(Supabase processed 플래그)를 갱신하는 단계와 코드 상태(git push)를 갱신하는 단계가 분리돼 있으면, 후자가 실패할 때 두 상태가 영구 어긋남. 향후 워크플로 개선 방향 — push 성공을 확인한 뒤에 processed 마킹을 하는 순서로 변경 권장

### 문제 2: 푸시 시 main 브랜치 거부

- **증상**: 로컬에서 작업 후 `git push` 시 `[rejected] main -> main (fetch first)`
- **원인**: 같은 시간에 사용자가 다른 환경에서 `80da7da` 커밋을 원격에 푸시
- **해결**: `git stash` → `git rebase origin/main` → `git push` → `git stash pop`. rebase 중 양쪽이 동일한 워크플로 변경을 했음을 git이 인식해 자동 정리
- **교훈**: 이런 우연한 동시 작업은 흔하지 않지만 발생 시 rebase가 안전한 처리 경로

## 🔑 핵심 결정

| 결정 | 선택안 | 기각안 | 이유 |
|---|---|---|---|
| 손실된 피드백 복구 방법 | 사용자 댓글 그대로 17섹션 직접 작성 | Supabase processed 되돌리고 워크플로 재실행 | 워크플로 한 번 더 도는 동안 사용자가 결과 검수 못함 + 권한 수정이 즉시 적용될지 불확실. 직접 작성이 빠르고 확정적 |
| CalcBox 개수 | 17개 (사용자 목차 그대로) | 14개 (이전 워크플로가 한 처리 방식) | 사용자가 17개 항목 명시. 실패 실행에서 14개로 합친 것은 모델의 자율 판단이었음 — 이번엔 사용자 목차 충실 우선 |
| 예제 토큰 수 | 4토큰 (pos=0,1,2,3) | 3토큰 유지 | 사용자 목차 5번이 "pos=0,1,2,3" 명시 |
| settings.json 함께 커밋 | 제외 | 포함 | 사용자가 진행 중인 별도 편집(additionalDirectories 정리)으로 보이고 본 작업과 무관. stash로 보관만 |

## 📂 변경된 파일

- `.github/workflows/review-feedback.yml` — `permissions: contents: write` 추가 (사용자 원격 커밋과 동일 → rebase 시 자동 정리)
- `src/content/llm-learn/ch3-positional-encoding.tsx` — 4 Step → 17 CalcBox, 4토큰 예제, Bullets 보조 컴포넌트 추가 (+267 / -114)

## ✅ 완료된 것 / 🚧 남은 것

### 완료
- [x] 손실 원인 규명 (push 403 + processed 마킹 순서 문제)
- [x] 워크플로 권한 수정 (`permissions: contents: write`)
- [x] 17섹션 콘텐츠 직접 복원 + 푸시 (`ab97be9`)

### 후속 과제
- [ ] **`pnpm install && pnpm build`로 타입/렌더 검증** — 이번 세션에서는 node_modules 부재로 미검증
- [ ] 레포 Settings → Actions → General → Workflow permissions 확인 ("Read and write permissions"가 아니면 YAML 권한만으로는 부족할 수 있음)
- [ ] 워크플로 step 순서 개선: `git push` 성공 확인 후 `--mark-all-unprocessed` 실행되도록 재배치 (처리 정합성)
- [ ] [ch3-positional-encoding.tsx](../../src/content/llm-learn/ch3-positional-encoding.tsx) 페이지에서 17개 섹션의 💬 의견 버튼이 모두 자동 주입되는지 시각 확인 (CLAUDE.md 콘텐츠 작성 규칙)

## 💡 인사이트

- **외부 상태 갱신과 코드 상태 갱신의 원자성 부재가 피드백 시스템의 가장 취약한 지점.** Supabase의 processed 플래그는 git push 성공을 보장하지 않는데, 현재 워크플로는 이 둘을 별도 step으로 분리해 처리 → push 실패 시 상태가 영구 어긋남. "transactional outbox" 패턴에 가까운 재설계가 필요. 즉시 적용 가능한 최소 수정은 step 6(commit & push) 성공 후에 별도 step에서 processed 마킹을 호출하는 것.
- **자동화 파이프라인의 디버깅은 로그가 전부.** GitHub Actions 러너는 일회용이라 실패 시 작업 결과(이번엔 `df0d212` 로컬 커밋)가 사라진다. 이번에는 로그에 14섹션 목록이 텍스트로 남아 있었고, 그보다 더 결정적으로 사용자가 댓글 본문을 보존하고 있어 복구 가능했음. 운이 좋았던 케이스.
- **사용자가 다른 환경에서 같은 수정을 동시 진행하는 상황**이 실제로 벌어졌음 (작성자 본인의 `80da7da`). git rebase가 양쪽 동일 변경을 감지해 깔끔하게 처리해줌 — 이런 경우 force push로 우회하지 말고 fetch + rebase가 안전한 기본값.

## 🔗 관련 문서

- [ch3-positional-encoding.tsx](../../src/content/llm-learn/ch3-positional-encoding.tsx) — 복원된 콘텐츠
- [review-feedback.yml](../../.github/workflows/review-feedback.yml) — 권한 수정된 워크플로
- [fetch-feedback.sh](../../scripts/fetch-feedback.sh) — Supabase 의견 조회/마킹 스크립트
- [CLAUDE.md](../../CLAUDE.md) — 콘텐츠 작성 규칙 (소목차 의견 버튼 필수)
