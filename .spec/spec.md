# Specification

## Overview

2022 개정 교육과정 기준 중·고등 수학과 LLM 수학을 인터랙티브 웹으로 학습하는 앱.

## User Stories

- As a 학생, I want to 트리 형태의 목차에서 원하는 단원을 탐색 so that 빠르게 학습할 내용을 찾을 수 있다
- As a 학생, I want to 각 소단원의 개념 설명과 공식을 확인 so that 수학 개념을 이해할 수 있다
- As a 학생, I want to 인터랙티브 시각화로 수학 개념을 체험 so that 직관적으로 이해할 수 있다
- As a 학생, I want to LLM 파이프라인별 수학 매핑을 확인 so that 수학이 AI에서 어떻게 쓰이는지 알 수 있다

## Requirements

### R001: Tree Navigation

- 4단계 depth 트리 구조 (학년/과목 → 대단원 → 중단원 → 소단원)
- 펼치기/접기 가능한 사이드바 네비게이션
- 현재 위치 표시 (breadcrumb)

### R002: Curriculum Data

- 중학교 1~3학년 (2022 개정 교육과정)
- 고등학교: 공통수학1/2, 대수, 미적분Ⅰ/Ⅱ, 확률과통계, 기하, 경제수학, 인공지능수학, 직무수학
- LLM 수학: 수학 분야별 + 파이프라인 절차별

### R003: Content Pages

- 소단원(leaf node)에 학습 콘텐츠 표시
- 개념 설명, 공식, 예제
- [NEEDS CLARIFICATION] 인터랙티브 시각화 범위

### R004: LLM Math Section

- LLM 처리 절차 14단계별 수학 개념 매핑
- 각 수학 개념의 공식과 교육과정 위치 표시
- 교육과정 ↔ LLM 활용 연결 표시
