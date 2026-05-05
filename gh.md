# GitHub Actions 명령어

## Review Feedback 워크플로우

```bash
# 실행 목록 조회
gh run list --workflow="Review Feedback"

# 특정 실행 로그 확인
gh run view <run-id> --log

# 수동 실행
gh workflow run "Review Feedback"

# 실행 상태 실시간 확인
gh run watch <run-id> --exit-status
```
