"use client";

import { useState } from "react";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

type EraKey = "pioneer" | "deep" | "nlp" | "llm";
type Filter = "all" | EraKey;

const ERA_KEYS: EraKey[] = ["pioneer", "deep", "nlp", "llm"];

const ERA_META: Record<
  EraKey,
  { label: string; years: string; color: string; badgeCls: string; techs: string[] }
> = {
  pioneer: {
    label: "신경망 선구기",
    years: "1958 – 1995",
    color: "#6366f1",
    badgeCls:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
    techs: ["퍼셉트론", "역전파", "SVM"],
  },
  deep: {
    label: "딥러닝 전환기",
    years: "1997 – 2012",
    color: "#10b981",
    badgeCls:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    techs: ["LSTM", "LeNet", "AlexNet"],
  },
  nlp: {
    label: "표현 학습기",
    years: "2013 – 2017",
    color: "#f59e0b",
    badgeCls:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    techs: ["Word2Vec", "Seq2Seq", "어텐션", "ResNet", "트랜스포머"],
  },
  llm: {
    label: "LLM 시대",
    years: "2018 – 2023",
    color: "#ef4444",
    badgeCls:
      "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
    techs: ["ELMo", "BERT", "GPT-1/2/3", "스케일링 법칙", "InstructGPT", "GPT-4"],
  },
};

interface Paper {
  roman: string;
  year: number;
  tech: string;
  paper: string;
  era: EraKey;
  desc: string;
}

const PAPERS: Paper[] = [
  {
    roman: "Ⅲ",
    year: 1958,
    tech: "퍼셉트론",
    paper: "Rosenblatt (1958), Psychological Review",
    era: "pioneer",
    desc: "최초의 신경망 수학 모델 — 입력 가중합으로 이진 분류",
  },
  {
    roman: "Ⅳ",
    year: 1986,
    tech: "역전파",
    paper: "Rumelhart, Hinton & Williams (1986), Nature",
    era: "pioneer",
    desc: "연쇄법칙으로 오차 역전파 — 다층 네트워크 학습 가능",
  },
  {
    roman: "Ⅴ",
    year: 1995,
    tech: "SVM",
    paper: "Cortes & Vapnik (1995), Machine Learning",
    era: "pioneer",
    desc: "최대 마진 초평면 + 커널 트릭 — 고전 ML의 정점",
  },
  {
    roman: "Ⅸ",
    year: 1997,
    tech: "LSTM",
    paper: "Hochreiter & Schmidhuber (1997), Neural Computation",
    era: "deep",
    desc: "입력·망각·출력 게이트로 장기 의존성 — RNN 기울기 소실 해결",
  },
  {
    roman: "Ⅵ",
    year: 1998,
    tech: "LeNet",
    paper: "LeCun et al. (1998), Proc. IEEE",
    era: "deep",
    desc: "합성곱 + 풀링 반복 구조 — CNN(합성곱 신경망)의 원형",
  },
  {
    roman: "Ⅶ",
    year: 2012,
    tech: "AlexNet",
    paper: "Krizhevsky, Sutskever & Hinton (2012), NeurIPS",
    era: "deep",
    desc: "GPU + ReLU + 드롭아웃으로 ImageNet 오류율 극적 감소",
  },
  {
    roman: "Ⅹ",
    year: 2013,
    tech: "Word2Vec",
    paper: "Mikolov et al. (2013), arXiv:1301.3781",
    era: "nlp",
    desc: "단어를 고밀도 벡터로 — 의미 연산(왕−남자+여자≈여왕) 가능",
  },
  {
    roman: "Ⅺ",
    year: 2014,
    tech: "Seq2Seq",
    paper: "Sutskever, Vinyals & Le (2014), arXiv:1409.3215",
    era: "nlp",
    desc: "인코더-디코더 LSTM으로 임의 길이 시퀀스 변환 — 신경망 기계번역",
  },
  {
    roman: "Ⅻ",
    year: 2014,
    tech: "어텐션",
    paper: "Bahdanau, Cho & Bengio (2014), arXiv:1409.0473",
    era: "nlp",
    desc: "출력 각 단계가 입력 전체를 동적 참조 — 고정 벡터 병목 해결",
  },
  {
    roman: "Ⅷ",
    year: 2015,
    tech: "ResNet",
    paper: "He et al. (2015), arXiv:1512.03385",
    era: "nlp",
    desc: "잔차 연결(skip connection)로 150층+ 학습 가능 — ImageNet 2015 우승",
  },
  {
    roman: "ⅩⅢ",
    year: 2017,
    tech: "트랜스포머",
    paper: "Vaswani et al. (2017), arXiv:1706.03762",
    era: "nlp",
    desc: "셀프 어텐션만으로 RNN 완전 대체 — 병렬 학습·장거리 의존성 동시 해결",
  },
  {
    roman: "ⅩⅣ",
    year: 2018,
    tech: "ELMo",
    paper: "Peters et al. (2018), arXiv:1802.05365",
    era: "llm",
    desc: "양방향 LSTM 사전학습 — 문맥 의존 임베딩의 시작",
  },
  {
    roman: "ⅩⅤ",
    year: 2018,
    tech: "BERT",
    paper: "Devlin et al. (2018), arXiv:1810.04805",
    era: "llm",
    desc: "마스크드 언어모델로 양방향 사전학습 — 11개 NLP 태스크 최고 성능",
  },
  {
    roman: "ⅩⅥ",
    year: 2018,
    tech: "GPT-1",
    paper: "Radford et al. (2018), OpenAI",
    era: "llm",
    desc: "트랜스포머 디코더로 생성적 사전학습 + 파인튜닝 전이학습",
  },
  {
    roman: "ⅩⅦ",
    year: 2019,
    tech: "GPT-2",
    paper: "Radford et al. (2019), OpenAI",
    era: "llm",
    desc: "1.5B 파라미터 — 별도 파인튜닝 없이 다양한 NLP 태스크 수행",
  },
  {
    roman: "ⅩⅧ",
    year: 2020,
    tech: "GPT-3",
    paper: "Brown et al. (2020), arXiv:2005.14165",
    era: "llm",
    desc: "175B 파라미터 — few-shot 프롬프팅으로 일반화",
  },
  {
    roman: "ⅩⅨ",
    year: 2020,
    tech: "스케일링 법칙",
    paper: "Kaplan et al. (2020), arXiv:2001.08361",
    era: "llm",
    desc: "성능 ∝ 파라미터·데이터·연산의 거듭제곱 — 모델 설계 예측 가능",
  },
  {
    roman: "ⅩⅩ",
    year: 2022,
    tech: "InstructGPT",
    paper: "Ouyang et al. (2022), arXiv:2203.02155",
    era: "llm",
    desc: "인간 피드백 강화학습(RLHF)으로 인간 의도에 정렬",
  },
  {
    roman: "ⅩⅩⅠ",
    year: 2023,
    tech: "GPT-4",
    paper: "OpenAI (2023), arXiv:2303.08774",
    era: "llm",
    desc: "멀티모달(이미지+텍스트) + 강화된 추론·안전성",
  },
];

export default function AirHistoryMap() {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered =
    filter === "all" ? PAPERS : PAPERS.filter((p) => p.era === filter);

  const filterButtons = [
    {
      key: "all" as Filter,
      label: "전체",
      cls: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    },
    ...ERA_KEYS.map((k) => ({
      key: k as Filter,
      label: ERA_META[k].label,
      cls: ERA_META[k].badgeCls,
    })),
  ];

  return (
    <div className="space-y-8">
      <p className="text-muted">
        머신러닝이 탄생한 1950년대부터 GPT-4가 등장한 2023년까지 — AI 핵심 기술
        19개를 발전 사슬로 연결한 전체 지도. 각 leaf 는 기술 1개·논문 1편을
        깊이 다루며, 이 개관은 전체 흐름과 시대 구분을 한눈에 보여준다.
      </p>

      {/* 1: 4 paradigm eras */}
      <CalcBox title="■ 네 개의 패러다임 시대">
        <p className="mb-4">
          AI 역사를 가르는 네 개의 큰 전환점 — 각각 다른 핵심 질문을 풀었다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {ERA_KEYS.map((key) => {
            const e = ERA_META[key];
            return (
              <div
                key={key}
                className="rounded-lg p-4 border"
                style={{ borderColor: e.color, borderLeftWidth: 4 }}
              >
                <div className="text-xs text-muted mb-1">{e.years}</div>
                <div
                  className="font-semibold text-sm mb-2"
                  style={{ color: e.color }}
                >
                  {e.label}
                </div>
                <div className="flex flex-wrap gap-1">
                  {e.techs.map((t) => (
                    <span
                      key={t}
                      className={`text-xs px-1.5 py-0.5 rounded-full ${e.badgeCls}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <SubSection title="● 선구기 (1958–1995) — 계산 가능한가?">
          <p>
            퍼셉트론(1958)이 뉴런을 수식으로 모델링하며 시작. 역전파(1986)가
            다층 네트워크 학습을 가능하게 했고, SVM(1995)이 통계적으로 엄밀한
            최대 마진 분류기로 고전 ML의 정점을 찍었다. 핵심 질문:{" "}
            <em>"기계가 데이터에서 패턴을 학습할 수 있는가?"</em>
          </p>
        </SubSection>

        <SubSection title="● 딥러닝 전환기 (1997–2012) — 깊이 쌓을 수 있는가?">
          <p>
            LSTM(1997)이 게이트로 장기 기억 문제를 해결. LeNet(1998)이 시각
            특징을 계층적으로 추출. AlexNet(2012)이 GPU 병렬 학습 + ReLU +
            드롭아웃으로 ImageNet 오류율을 전년 대비 대폭 낮추며 딥러닝 빅뱅을
            촉발했다. 핵심 질문:{" "}
            <em>"깊은 네트워크를 실제로 훈련할 수 있는가?"</em>
          </p>
        </SubSection>

        <SubSection title="● 표현 학습기 (2013–2017) — 의미를 벡터로?">
          <p>
            Word2Vec(2013)이 단어를 의미 공간으로 배치. Seq2Seq(2014)와
            어텐션(2014)이 번역 품질을 높이고, ResNet(2015)이 잔차 연결로
            초심층 네트워크를 가능하게 했다. 2017년 트랜스포머가 RNN 없이 셀프
            어텐션만으로 언어 모델링을 재정의. 핵심 질문:{" "}
            <em>"언어와 이미지의 의미를 어떻게 표현하는가?"</em>
          </p>
        </SubSection>

        <SubSection title="● LLM 시대 (2018–2023) — 범용 AI로?">
          <p>
            ELMo·BERT·GPT 계열이 사전학습-파인튜닝 패러다임을 확립. 스케일링
            법칙(2020)이 규모와 성능의 거듭제곱 관계를 수식화.
            InstructGPT(2022)가 RLHF로 인간 의도에 정렬. GPT-4(2023)가
            멀티모달로 확장. 핵심 질문:{" "}
            <em>"대규모 언어모델이 범용 지능에 얼마나 다가갔는가?"</em>
          </p>
        </SubSection>
      </CalcBox>

      {/* 2: Full paper map with era filter */}
      <CalcBox title="■ 전체 논문 지도 (19편)">
        <div className="flex flex-wrap gap-2 mb-4">
          {filterButtons.map(({ key, label, cls }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-opacity ${cls} ${
                filter === key
                  ? "opacity-100 ring-2 ring-current"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              {label} (
              {key === "all"
                ? PAPERS.length
                : PAPERS.filter((p) => p.era === key).length}
              )
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs text-muted">
                <th className="py-2 pr-3 font-medium w-8">#</th>
                <th className="py-2 pr-3 font-medium w-12">연도</th>
                <th className="py-2 pr-3 font-medium">기술</th>
                <th className="py-2 pr-3 font-medium hidden sm:table-cell">
                  논문
                </th>
                <th className="py-2 font-medium hidden md:table-cell">
                  핵심 기여
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const e = ERA_META[p.era];
                return (
                  <tr
                    key={p.roman}
                    className="border-b last:border-0 hover:bg-sidebar-bg transition-colors"
                  >
                    <td className="py-2 pr-3 font-mono text-xs text-muted">
                      {p.roman}
                    </td>
                    <td className="py-2 pr-3 text-muted">{p.year}</td>
                    <td className="py-2 pr-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium">{p.tech}</span>
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded-full hidden sm:inline-flex ${e.badgeCls}`}
                        >
                          {e.label}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 pr-3 text-muted hidden sm:table-cell text-xs">
                      {p.paper}
                    </td>
                    <td className="py-2 text-muted hidden md:table-cell text-xs">
                      {p.desc}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CalcBox>

      {/* 3: How to read */}
      <CalcBox title="■ 발전 사슬 — 이 시리즈 읽는 법">
        <p className="mb-4">
          각 leaf 는{" "}
          <strong>① 출처 → ② 핵심 발췌(원문) → ③ 번역 → ④ 해설 → ⑤ 발전 사슬
          연결</strong>{" "}
          순으로 구성된다. 논문을 처음 읽는 분도, 다시 정리하는 분도 발전
          사슬을 따라가면 각 기술이 왜 등장했는지 연속적으로 이해할 수 있다.
        </p>

        <SubSection title="● 주요 연결점">
          <p>
            ① 퍼셉트론 → 단층 한계 노출 →{" "}
            <strong>역전파</strong>가 다층 네트워크를 학습 가능하게.
          </p>
          <p>
            ② 역전파 → 깊어질수록 기울기 소실 →{" "}
            <strong>LSTM</strong>(순서 데이터)·<strong>ResNet</strong>
            (이미지)이 각자의 방식으로 해결.
          </p>
          <p>
            ③ RNN 순차 처리 병목 → <strong>어텐션</strong>이 병렬 참조 가능하게
            → <strong>트랜스포머</strong>가 RNN을 완전 대체.
          </p>
          <p>
            ④ 트랜스포머 위에 사전학습 → <strong>BERT</strong>·
            <strong>GPT</strong> 계열 → <strong>스케일링 법칙</strong>으로 설계
            최적화 → <strong>RLHF</strong>로 인간과 정렬.
          </p>
        </SubSection>

        <Insight>
          각 leaf 의 마지막 단락 "발전 사슬에서의 위치"가 이 연결을 더 자세히
          설명한다.
        </Insight>
      </CalcBox>
    </div>
  );
}
