import { Step, CalcBox, Insight, Matrix, Arrow } from "./shared";

/** 토큰화 — 컴퓨터는 글자를 모른다 */
export default function TokenizationContent() {
  // 예시: "나는 사과를 좋아한다" BPE 결과
  const sentence = "나는 사과를 좋아한다";
  const tokens = ["나는", "사과", "##를", "좋아", "##한다"];
  const ids     = [   1,     47,    203,    88,     312   ];

  // 어휘 사전 (축소)
  const vocab = [
    ["0", "  <PAD>"],
    ["1", "  나는"],
    ["47", "  사과"],
    ["88", "  좋아"],
    ["203", " ##를"],
    ["312", " ##한다"],
    ["...", "  ..."],
  ];

  return (
    <article className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">1. 토큰화</h1>
      <p className="text-muted mb-8">
        LLM은 텍스트를 바로 읽지 못합니다. 먼저 문장을 <strong>토큰(조각)</strong>으로 쪼개고,
        각 토큰을 <strong>숫자 ID</strong>로 바꿔야 합니다.
      </p>

      {/* ── 왜 글자를 못 읽나 ── */}
      <CalcBox title="컴퓨터는 숫자만 안다">
        <p className="text-sm mb-3">
          컴퓨터는 모든 정보를 0과 1(이진수)로 처리합니다.
          문자 "가"도 결국 숫자 44032(유니코드)입니다.
          하지만 <em>문자 코드 번호</em>만으로는 의미를 파악할 수 없습니다.
          "가"(44032)와 "나"(45208)의 차이 1176이 아무 의미도 없듯이.
        </p>
        <Insight>
          그래서 LLM은 문자 코드 대신, <strong>의미 있는 조각(토큰)</strong>으로 쪼개고
          각 토큰에 <strong>어휘 사전 번호(ID)</strong>를 부여합니다.
        </Insight>
      </CalcBox>

      {/* ── 세 가지 방식 ── */}
      <CalcBox title="세 가지 토큰화 방식">
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold mb-1">① 글자 단위</div>
            <div className="font-mono text-muted">"사과" → ["사","과"]</div>
            <div className="mt-2 text-muted">단순하지만 어휘 사전이 작아짐.
            의미 파악 어려움.</div>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold mb-1">② 단어 단위</div>
            <div className="font-mono text-muted">"사과를" → ["사과를"]</div>
            <div className="mt-2 text-muted">직관적이지만 어휘 사전이 수백만 개로 폭발.</div>
          </div>
          <div className="rounded-lg border border-accent bg-accent-light p-3">
            <div className="font-semibold mb-1">③ BPE (GPT 방식) ✓</div>
            <div className="font-mono text-muted">"사과를" → ["사과","##를"]</div>
            <div className="mt-2 text-muted">자주 쓰이는 조각을 하나의 토큰으로.
            균형 잡힌 어휘 크기.</div>
          </div>
        </div>
      </CalcBox>

      {/* ── BPE 과정 ── */}
      <Step n={1} label={`"${sentence}" 토큰화`} />
      <CalcBox>
        <p className="text-sm mb-4">BPE(Byte Pair Encoding)는 자주 붙어 나오는 글자쌍을 합쳐 토큰을 만듭니다.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tokens.map((t, i) => (
            <div key={i} className="rounded-lg border border-accent bg-accent-light px-3 py-2 text-sm">
              <div className="font-mono font-bold">{t}</div>
              <div className="text-xs text-muted text-center">ID {ids[i]}</div>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted">
          "##"는 앞 토큰에 붙는 조각을 의미합니다. "사과"+"##를" = "사과를"
        </p>
      </CalcBox>

      {/* ── 어휘 사전 ── */}
      <Step n={2} label="어휘 사전(Vocabulary) 조회" />
      <CalcBox>
        <p className="text-sm mb-4">
          GPT-4는 약 <strong>100,000개</strong>의 토큰을 가진 어휘 사전을 씁니다.
          토큰 → ID 변환은 이 사전에서 단순 조회(O(1)).
        </p>
        <div className="font-mono text-sm border border-sidebar-border rounded-lg overflow-hidden">
          <div className="bg-sidebar-border px-3 py-1 text-xs">어휘 사전 (일부)</div>
          {vocab.map(([id, token]) => (
            <div key={id} className="flex px-3 py-1 border-t border-sidebar-border hover:bg-accent-light">
              <span className="w-12 text-muted">{id}</span>
              <span>{token}</span>
            </div>
          ))}
        </div>
      </CalcBox>

      {/* ── 최종 결과 ── */}
      <Step n={3} label="문장 → 숫자 ID 배열" />
      <CalcBox>
        <div className="flex flex-wrap items-center gap-3">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg px-4 py-3">
            "{sentence}"
          </div>
          <Arrow op="토큰화" />
          <Matrix
            data={[ids]}
            label="토큰 ID 배열"
            color="blue"
          />
        </div>
        <Insight>
          이 숫자 배열이 LLM의 실제 입력입니다. 다음 단계(임베딩)에서 각 ID를
          의미 벡터로 변환합니다.
        </Insight>
      </CalcBox>
    </article>
  );
}
