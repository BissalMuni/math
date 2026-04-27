import type { CategoryRoot } from "./types";

/** LLM 학습 — 트랜스포머 아키텍처 완전 가이드 (책 목차 기반) */
export const llmLearning: CategoryRoot = {
  id: "llm-learn",
  basePath: "llm-learn",
  title: "LLM",
  description: "트랜스포머 입력부터 출력까지 — 실제 벡터 예제로 이해하는 LLM",
  children: [
    // ── 서막 ──────────────────────────────────────────────
    {
      id: "ll-prologue",
      slug: "prologue",
      title: "0. 서막",
      children: [
        { id: "ll-p1", slug: "why-llm",      title: "0-1. 왜 LLM인가" },
        { id: "ll-p2", slug: "neural-net",   title: "0-2. 신경망이란" },
        { id: "ll-p3", slug: "parameter",    title: "0-3. 파라미터란" },
        { id: "ll-p4", slug: "matrix-basic", title: "0-4. 행렬 곱셈 기초" },
      ],
    },

    // ── 1부: 입력 처리 ────────────────────────────────────
    {
      id: "ll-part1",
      slug: "part1",
      title: "1부. 입력 처리",
      children: [
        {
          id: "ll-ch1",
          slug: "tokenization",
          title: "1. 토큰화",
          children: [
            { id: "ll-ch1-1", slug: "no-text",  title: "1-1. 컴퓨터는 글자를 모른다" },
            { id: "ll-ch1-2", slug: "three-way", title: "1-2. 세 가지 방식" },
            { id: "ll-ch1-3", slug: "bpe",       title: "1-3. BPE — 자주 쓰이는 조각으로" },
            { id: "ll-ch1-4", slug: "token-id",  title: "1-4. 토큰 → 숫자 ID" },
          ],
        },
        {
          id: "ll-ch2",
          slug: "embedding",
          title: "2. 임베딩",
          children: [
            { id: "ll-ch2-1", slug: "id-not-enough", title: "2-1. 숫자 ID만으로는 부족하다" },
            { id: "ll-ch2-2", slug: "what-is-vector", title: "2-2. 벡터란 무엇인가" },
            { id: "ll-ch2-3", slug: "id-to-vector",   title: "2-3. 숫자 ID → 벡터 변환" },
            { id: "ll-ch2-4", slug: "embedding-learn", title: "2-4. 임베딩 행렬은 학습된다" },
          ],
        },
        {
          id: "ll-ch3",
          slug: "positional-encoding",
          title: "3. 위치 인코딩",
          children: [
            { id: "ll-ch3-1", slug: "why-position",  title: "3-1. 왜 필요한가" },
            { id: "ll-ch3-2", slug: "sin-cos",       title: "3-2. sin/cos 함수로 위치 표현" },
            { id: "ll-ch3-3", slug: "add-to-embed",  title: "3-3. 임베딩에 더하기" },
          ],
        },
      ],
    },

    // ── 2부: 어텐션 메커니즘 ───────────────────────────────
    {
      id: "ll-part2",
      slug: "part2",
      title: "2부. 어텐션 메커니즘",
      children: [
        {
          id: "ll-ch4",
          slug: "qkv",
          title: "4. Q · K · V",
          children: [
            { id: "ll-ch4-1", slug: "wqkv",     title: "4-1. Wq · Wk · Wv 행렬" },
            { id: "ll-ch4-2", slug: "qkt",       title: "4-2. Q · Kᵀ 내적" },
            { id: "ll-ch4-3", slug: "scale",     title: "4-3. √dk 스케일링" },
            { id: "ll-ch4-4", slug: "softmax",   title: "4-4. Softmax → 어텐션 가중치" },
            { id: "ll-ch4-5", slug: "weighted-v", title: "4-5. × V → 가중합" },
          ],
        },
        {
          id: "ll-ch5",
          slug: "softmax",
          title: "5. Softmax",
          children: [
            { id: "ll-ch5-1", slug: "why-exp",       title: "5-1. 왜 eˣ 인가" },
            { id: "ll-ch5-2", slug: "negative-score", title: "5-2. 음수 점수 처리" },
            { id: "ll-ch5-3", slug: "prob-dist",      title: "5-3. 확률 분포 변환" },
          ],
        },
        {
          id: "ll-ch6",
          slug: "multi-head",
          title: "6. Multi-Head Attention",
          children: [
            { id: "ll-ch6-1", slug: "why-multi",  title: "6-1. 왜 여러 헤드인가" },
            { id: "ll-ch6-2", slug: "split-dim",  title: "6-2. 차원 쪼개기 (512 → 64 × 8)" },
            { id: "ll-ch6-3", slug: "per-head",   title: "6-3. 헤드별 독립 계산" },
            { id: "ll-ch6-4", slug: "concat",     title: "6-4. Concat" },
            { id: "ll-ch6-5", slug: "wo",         title: "6-5. Wo 통합" },
          ],
        },
      ],
    },

    // ── 3부: 트랜스포머 블록 ──────────────────────────────
    {
      id: "ll-part3",
      slug: "part3",
      title: "3부. 트랜스포머 블록",
      children: [
        {
          id: "ll-ch7",
          slug: "residual",
          title: "7. 잔차 연결",
          children: [
            { id: "ll-ch7-1", slug: "vanishing-grad", title: "7-1. 기울기 소실 문제" },
            { id: "ll-ch7-2", slug: "x-plus-fx",      title: "7-2. x + f(x) 단순 덧셈" },
            { id: "ll-ch7-3", slug: "backprop-signal", title: "7-3. 역전파 신호 유지" },
          ],
        },
        {
          id: "ll-ch8",
          slug: "layer-norm",
          title: "8. Layer Norm",
          children: [
            { id: "ll-ch8-1", slug: "mean",    title: "8-1. 평균" },
            { id: "ll-ch8-2", slug: "variance", title: "8-2. 분산" },
            { id: "ll-ch8-3", slug: "std",      title: "8-3. 표준편차" },
            { id: "ll-ch8-4", slug: "normalize", title: "8-4. 정규화" },
          ],
        },
        {
          id: "ll-ch9",
          slug: "feed-forward",
          title: "9. Feed Forward",
          children: [
            { id: "ll-ch9-1", slug: "expand",   title: "9-1. W1 확장 (512 → 2048)" },
            { id: "ll-ch9-2", slug: "relu",     title: "9-2. ReLU" },
            { id: "ll-ch9-3", slug: "compress", title: "9-3. W2 압축 (2048 → 512)" },
          ],
        },
      ],
    },

    // ── 4부: 출력 ─────────────────────────────────────────
    {
      id: "ll-part4",
      slug: "part4",
      title: "4부. 출력",
      children: [
        {
          id: "ll-ch10",
          slug: "output",
          title: "10. Linear + Softmax",
          children: [
            { id: "ll-ch10-1", slug: "expand-vocab",  title: "10-1. 벡터 → 어휘 수만큼 확장" },
            { id: "ll-ch10-2", slug: "prob-dist",     title: "10-2. Softmax → 확률 분포" },
            { id: "ll-ch10-3", slug: "word-select",   title: "10-3. 단어 선택" },
            { id: "ll-ch10-4", slug: "temperature",   title: "10-4. Temperature" },
          ],
        },
      ],
    },

    // ── 5부: 학습 ─────────────────────────────────────────
    {
      id: "ll-part5",
      slug: "part5",
      title: "5부. 학습",
      children: [
        {
          id: "ll-ch11",
          slug: "backprop",
          title: "11. 역전파 + 손실함수",
          children: [
            { id: "ll-ch11-1", slug: "loss-fn",    title: "11-1. 손실함수" },
            { id: "ll-ch11-2", slug: "gradient",   title: "11-2. 기울기란" },
            { id: "ll-ch11-3", slug: "chain-rule", title: "11-3. 연쇄법칙" },
            { id: "ll-ch11-4", slug: "update",     title: "11-4. 파라미터 업데이트" },
          ],
        },
        {
          id: "ll-ch12",
          slug: "training",
          title: "12. 학습 전체 과정",
          children: [
            { id: "ll-ch12-1", slug: "dataset",   title: "12-1. 데이터셋" },
            { id: "ll-ch12-2", slug: "batch",     title: "12-2. 배치 처리" },
            { id: "ll-ch12-3", slug: "epoch",     title: "12-3. 에폭" },
            { id: "ll-ch12-4", slug: "lr",        title: "12-4. 학습률" },
          ],
        },
      ],
    },

    // ── 에필로그 ──────────────────────────────────────────
    {
      id: "ll-epilogue",
      slug: "epilogue",
      title: "에필로그",
      children: [
        {
          id: "ll-ch13",
          slug: "enc-dec",
          title: "13. Encoder vs Decoder",
          children: [
            { id: "ll-ch13-1", slug: "encoder-only", title: "13-1. Encoder only (BERT)" },
            { id: "ll-ch13-2", slug: "decoder-only", title: "13-2. Decoder only (GPT)" },
            { id: "ll-ch13-3", slug: "enc-dec-both", title: "13-3. Encoder + Decoder (번역)" },
          ],
        },
      ],
    },
  ],
};
