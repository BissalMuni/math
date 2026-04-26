# Specification

## Overview

2022 개정 교육과정 기준 중·고등 수학과 LLM 수학을 인터랙티브 웹으로 학습하는 앱.

## User Stories

- As a 학습자, I want to 트리 형태의 목차에서 원하는 단원을 탐색 so that 빠르게 학습할 내용을 찾을 수 있다
- As a 학습자, I want to 각 소단원의 개념 설명과 공식을 KaTeX로 렌더링된 형태로 확인 so that 수학 개념을 이해할 수 있다
- As a 학습자, I want to 모든 소단원에서 Mafs 인터랙티브 시각화를 체험 so that 직관적으로 이해할 수 있다
- As a 학습자, I want to LLM 파이프라인별 수학 매핑을 확인 so that 수학이 AI에서 어떻게 쓰이는지 알 수 있다
- As a 학습자, I want to 완료한 소단원을 체크 so that 학습 진도를 파악할 수 있다

## Requirements

### R001: Tree Navigation

- 4단계 depth 트리 구조 (학년/과목 → 대단원 → 중단원 → 소단원)
- 펼치기/접기 가능한 사이드바 네비게이션
- 현재 위치 표시 (breadcrumb)
- 소단원(leaf node) 클릭 시 콘텐츠 페이지로 이동

### R002: Curriculum Data

- 중학교 1~3학년 (2022 개정 교육과정)
- 고등학교: 공통수학1/2, 대수, 미적분Ⅰ/Ⅱ, 확률과통계, 기하, 경제수학, 인공지능수학, 직무수학
- LLM 수학: 수학 분야별 + 파이프라인 절차별
- 데이터는 JSON/TS 파일로 관리

### R003: Content Pages

- 모든 소단원(leaf node)에 학습 콘텐츠 표시
- 각 소단원 콘텐츠 구성:
  - 개념 설명 (직접 작성)
  - 공식 (KaTeX 렌더링)
  - 인터랙티브 시각화 (Mafs, 모든 소단원에 포함)
- 연습 문제 없음

### R004: LLM Math Section

- LLM 처리 절차 14단계별 수학 개념 매핑
- 각 수학 개념의 공식과 교육과정 위치 표시
- 교육과정 ↔ LLM 활용 연결 표시

### R005: Progress Tracking

- 소단원 완료 체크 (토글)
- localStorage에 완료 상태 저장
- 트리 네비게이션에 완료 표시 반영
- 문제 풀이 기록 없음, 체크만

## Clarifications

- **시각화 범위**: 모든 소단원에 Mafs 인터랙티브 시각화 포함
- **콘텐츠 작성**: 개념 설명을 직접 작성 (템플릿 아님)
- **연습 문제**: 포함하지 않음
- **진도 추적**: 소단원 완료 체크만 (문제 풀이 기록 없음)
- **검색 기능**: 불필요
