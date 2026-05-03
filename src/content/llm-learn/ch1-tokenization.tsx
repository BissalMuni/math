import { CalcBox, Insight, Matrix, Arrow } from "@/components/content/shared";

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
    <div className="space-y-8">
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
      <CalcBox title="① &ldquo;나는 사과를 좋아한다&rdquo; 토큰화">
        <p className="text-sm mb-4">BPE(Byte Pair Encoding)는 자주 붙어 나오는 글자쌍을 합쳐 토큰을 만듭니다.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tokens.map((t, i) => (
            <div key={i} className="rounded-lg border border-accent bg-accent-light px-3 py-2 text-sm">
              <div className="font-mono font-bold">{t}</div>
              <div className="text-xs text-muted text-center">ID {ids[i]}</div>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted mb-3">
          &ldquo;##&rdquo;는 앞 토큰에 붙는 조각을 의미합니다. &ldquo;사과&rdquo;+&ldquo;##를&rdquo; = &ldquo;사과를&rdquo;
        </p>
        <div className="rounded-lg border border-sidebar-border bg-sidebar-bg p-4 text-sm space-y-2">
          <p className="font-semibold text-accent">왜 &ldquo;나는&rdquo;은 안 쪼개질까?</p>
          <p className="text-muted">
            &ldquo;사과를&rdquo;은 &ldquo;사과&rdquo;+&ldquo;를&rdquo;로 쪼개지는데
            &ldquo;나는&rdquo;은 하나의 토큰입니다.
            이유: <strong>BPE는 학습 데이터에서 자주 등장하는 조합을 하나로 유지</strong>합니다.
          </p>
          <p className="text-muted">
            &ldquo;나는&rdquo;은 한국어 텍스트에서 매우 빈번하므로 그 자체가 하나의 토큰으로 등록됩니다.
            반면 &ldquo;사과를&rdquo;은 상대적으로 드물어 &ldquo;사과&rdquo;+&ldquo;##를&rdquo;로 분리됩니다.
          </p>
          <div className="font-mono text-xs bg-black/5 dark:bg-white/5 rounded p-3 space-y-1">
            <div>&ldquo;나는&rdquo; — 빈도 매우 높음 → 토큰 1개로 유지</div>
            <div>&ldquo;사과를&rdquo; — 빈도 낮음 → &ldquo;사과&rdquo; + &ldquo;##를&rdquo;로 분리</div>
            <div>&ldquo;좋아한다&rdquo; — 빈도 낮음 → &ldquo;좋아&rdquo; + &ldquo;##한다&rdquo;로 분리</div>
          </div>
        </div>
      </CalcBox>

      {/* ── BPE 병합 과정 예제 ── */}
      <CalcBox title="BPE 병합 과정 — 단계별 예제">
        <p className="text-sm mb-4">
          BPE가 어떻게 글자 단위에서 시작해 토큰을 만들어가는지 &ldquo;low&rdquo;, &ldquo;lower&rdquo;, &ldquo;newest&rdquo;
          세 단어로 따라가 봅시다.
        </p>
        <div className="text-sm text-muted bg-sidebar-bg border border-sidebar-border rounded-lg p-4 mb-3">
          <p className="font-medium mb-1">전제</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>대규모 텍스트(코퍼스)에서 단어별 등장 횟수를 먼저 셉니다.</li>
            <li>아래 숫자는 예시를 위한 가정입니다 — 실제 BPE 훈련에서는 수십억 단어에서 빈도를 집계합니다.</li>
            <li>각 단어를 글자 단위로 쪼갠 뒤, 빈도가 가장 높은 인접 쌍부터 하나씩 병합합니다.</li>
          </ul>
        </div>
        <div className="space-y-3 text-sm font-mono bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
          <div>
            <div className="text-muted font-sans mb-1">초기: 글자 단위로 분리 (코퍼스 등장 횟수)</div>
            <div>l o w  (5회)</div>
            <div>l o w e r  (2회)</div>
            <div>n e w e s t  (6회)</div>
          </div>
          <div className="border-t border-sidebar-border pt-3">
            <div className="text-accent font-sans mb-1">1회차: 가장 빈번한 쌍 = (w, e) → 8회 (lower×2 + newest×6)</div>
            <div>l o w  ·  l o <strong>we</strong> r  ·  n e <strong>we</strong> s t</div>
          </div>
          <div className="border-t border-sidebar-border pt-3">
            <div className="text-accent font-sans mb-1">2회차: (l, o) → 7회</div>
            <div><strong>lo</strong> w  ·  <strong>lo</strong> we r  ·  n e we s t</div>
          </div>
          <div className="border-t border-sidebar-border pt-3">
            <div className="text-accent font-sans mb-1">3회차: (we, s) → 6회 — 1회차 토큰 재활용</div>
            <div>lo w  ·  lo we r  ·  n e <strong>wes</strong> t</div>
          </div>
          <div className="border-t border-sidebar-border pt-3">
            <div className="text-accent font-sans mb-1">4회차: (wes, t) → 6회</div>
            <div>lo w  ·  lo we r  ·  n e <strong>west</strong></div>
          </div>
        </div>
        <Insight>
          이 과정을 수만 번 반복하면 자주 쓰이는 단어 조각이 자동으로 토큰이 됩니다.
          사람이 규칙을 정하는 게 아니라 <strong>빈도 통계가 토큰을 결정</strong>합니다.
        </Insight>
      </CalcBox>

      {/* ── 어휘 사전 ── */}
      <CalcBox title="② 어휘 사전(Vocabulary) 조회">
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
      <CalcBox title="③ 문장 → 숫자 ID 배열">
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
    </div>
  );
}
