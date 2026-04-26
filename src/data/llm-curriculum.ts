/** 교육과정별 LLM 수학 매핑 (분야별 leaf node ID → 교육과정 위치) */
export interface CurriculumSubject {
  subject: string;
  nodeIds: string[];
}

export interface CurriculumGrade {
  grade: string;
  subjects: CurriculumSubject[];
}

export const llmCurriculum: CurriculumGrade[] = [
  {
    grade: "고등학교",
    subjects: [
      {
        subject: "대수 — 지수/로그 함수",
        nodeIds: ["llm-f-calc-t4", "llm-f-calc-t5"],
      },
      {
        subject: "미적분Ⅱ — 합성함수 미분 (연쇄 법칙)",
        nodeIds: ["llm-f-calc-t2"],
      },
      {
        subject: "기하 — 벡터와 내적",
        nodeIds: ["llm-f-la-t1", "llm-f-la-t5"],
      },
      {
        subject: "확률과 통계 — 조건부 확률, 기대값, 분산",
        nodeIds: [
          "llm-f-prob-t1",
          "llm-f-prob-t2",
          "llm-f-prob-t3",
          "llm-f-prob-t4",
          "llm-f-prob-t5",
        ],
      },
    ],
  },
  {
    grade: "대학교",
    subjects: [
      {
        subject: "선형대수학 — 행렬, 고유값, SVD, 노름",
        nodeIds: [
          "llm-f-la-t2",
          "llm-f-la-t3",
          "llm-f-la-t4",
          "llm-f-la-t6",
          "llm-f-la-t7",
          "llm-f-la-t8",
          "llm-f-la-t9",
          "llm-f-la-t10",
        ],
      },
      {
        subject: "다변수 미적분 — 편미분, 그래디언트, 테일러 급수",
        nodeIds: ["llm-f-calc-t1", "llm-f-calc-t3", "llm-f-calc-t6"],
      },
      {
        subject: "확률과 통계 — 정규 분포, MLE, 샘플링",
        nodeIds: ["llm-f-prob-t6", "llm-f-prob-t7", "llm-f-prob-t8"],
      },
      {
        subject: "정보이론 — 엔트로피, Cross-Entropy, KL 발산",
        nodeIds: [
          "llm-f-info-t1",
          "llm-f-info-t2",
          "llm-f-info-t3",
          "llm-f-info-t4",
          "llm-f-info-t5",
        ],
      },
      {
        subject: "최적화이론 — 경사 하강법, Adam, LR 스케줄링",
        nodeIds: [
          "llm-f-opt-t1",
          "llm-f-opt-t2",
          "llm-f-opt-t3",
          "llm-f-opt-t4",
          "llm-f-opt-t5",
        ],
      },
      {
        subject: "수치해석 — 부동소수점, 수치 안정성, LoRA",
        nodeIds: ["llm-f-num-t1", "llm-f-num-t2", "llm-f-num-t3"],
      },
    ],
  },
];
