import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

function MemoryCellDiagram() {
  return (
    <svg
      width="100%"
      viewBox="0 0 380 260"
      style={{ maxWidth: 380, margin: "0 auto", display: "block" }}
    >
      <defs>
        <marker id="arrowhead-lstm" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" opacity={0.5} />
        </marker>
        <marker id="arrowhead-lstm-red" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#ef4444" opacity={0.85} />
        </marker>
      </defs>

      {/* 셀 상태 하이웨이 (Constant Error Carousel) */}
      <text x={40} y={30} textAnchor="middle" fontSize={11} fontWeight={700} fill="currentColor">
        c(t-1)
      </text>
      <path
        d="M 40,40 L 340,40"
        fill="none"
        stroke="#ef4444"
        strokeOpacity={0.85}
        strokeWidth={2}
        markerEnd="url(#arrowhead-lstm-red)"
      />
      <text x={130} y={32} textAnchor="middle" fontSize={9.5} fill="#ef4444" opacity={0.9}>
        자기연결 가중치 = 1 (CEC)
      </text>
      <text x={340} y={30} textAnchor="middle" fontSize={11} fontWeight={700} fill="currentColor">
        c(t)
      </text>

      {/* + 합류 노드 */}
      <circle cx={190} cy={40} r={11} fill="none" stroke="currentColor" strokeWidth={1.5} />
      <text x={190} y={44} textAnchor="middle" fontSize={13} fill="currentColor">+</text>
      <line x1={190} y1={51} x2={190} y2={95} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.5} markerEnd="url(#arrowhead-lstm)" />

      {/* ⊗ 곱셈 노드 (input gate × candidate) */}
      <circle cx={190} cy={112} r={11} fill="none" stroke="currentColor" strokeWidth={1.5} />
      <text x={190} y={116} textAnchor="middle" fontSize={12} fill="currentColor">×</text>

      {/* candidate g 박스 */}
      <rect x={70} y={150} width={90} height={30} rx={4} fill="#3b82f6" fillOpacity={0.75} />
      <text x={115} y={169} textAnchor="middle" fontSize={10.5} fill="#fff">g (tanh)</text>
      <path d="M 115,150 L 175,120" fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.5} markerEnd="url(#arrowhead-lstm)" />

      {/* input gate i 박스 */}
      <rect x={175} y={150} width={90} height={30} rx={4} fill="#3b82f6" fillOpacity={0.75} />
      <text x={220} y={169} textAnchor="middle" fontSize={10} fill="#fff">
        i_t (σ)
      </text>
      <path d="M 210,150 L 197,120" fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.5} markerEnd="url(#arrowhead-lstm)" />

      {/* output gate o 박스 */}
      <rect x={280} y={150} width={90} height={30} rx={4} fill="#3b82f6" fillOpacity={0.75} />
      <text x={325} y={169} textAnchor="middle" fontSize={10} fill="#fff">
        o_t (σ)
      </text>

      {/* 입력 x_t, h_(t-1) */}
      <text x={220} y={225} textAnchor="middle" fontSize={10.5} fill="currentColor" opacity={0.8}>
        x(t), h(t-1)
      </text>
      <path d="M 220,218 L 115,152" fill="none" stroke="currentColor" strokeOpacity={0.35} strokeWidth={1.2} markerEnd="url(#arrowhead-lstm)" />
      <path d="M 220,218 L 220,152" fill="none" stroke="currentColor" strokeOpacity={0.35} strokeWidth={1.2} markerEnd="url(#arrowhead-lstm)" />
      <path d="M 220,218 L 325,152" fill="none" stroke="currentColor" strokeOpacity={0.35} strokeWidth={1.2} markerEnd="url(#arrowhead-lstm)" />

      {/* 오른쪽: c(t) -> h() -> ⊗(output gate) -> h_t */}
      <path d="M 300,40 L 300,90" fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.5} markerEnd="url(#arrowhead-lstm)" />
      <rect x={260} y={92} width={80} height={26} rx={4} fill="#94a3b8" fillOpacity={0.6} />
      <text x={300} y={110} textAnchor="middle" fontSize={10} fill="#fff">h(c(t))</text>
      <circle cx={300} cy={135} r={11} fill="none" stroke="currentColor" strokeWidth={1.5} />
      <text x={300} y={139} textAnchor="middle" fontSize={12} fill="currentColor">×</text>
      <path d="M 300,118 L 300,124" fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.5} />
      <path d="M 325,150 L 305,144" fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.5} markerEnd="url(#arrowhead-lstm)" />
      <path d="M 300,146 L 300,230" fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.5} markerEnd="url(#arrowhead-lstm)" />
      <text x={300} y={248} textAnchor="middle" fontSize={11} fontWeight={700} fill="currentColor">
        h(t)
      </text>
    </svg>
  );
}

export default function AirLstm() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        &ldquo;AI 발전 지도&rdquo; 시리즈 Ⅸ — 지금까지의 Ⅲ~Ⅷ은 퍼셉트론에서
        ResNet까지, 정지된 입력(이미지 등)을 다루는 계열이었다. 이제 계열을
        바꿔 <strong>순서가 있는 데이터(문장·시계열)</strong>를 다루는 순환
        신경망(RNN)으로 넘어간다. RNN은 이론상 과거 정보를 계속 이어받아
        먼 과거까지 기억할 수 있지만, 실제로 오차역전파로 학습시키면
        먼 과거로 갈수록 오차 신호가 지수적으로 사라지거나 폭발해 몇
        step 이상은 사실상 학습이 안 됐다. 1997년, 제프 호크라이터와 위르겐
        슈미트후버는 게이트로 제어되는 메모리 셀이라는 장치로 이 문제를
        풀었다 — Long Short-Term Memory(LSTM)다.
      </p>

      <CalcBox title="■ 한눈에">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="text-xs text-muted mb-1">출처</div>
            <div className="font-medium">
              S. Hochreiter, J. Schmidhuber (1997), &ldquo;Long Short-Term
              Memory,&rdquo; Neural Computation, 9(8), 1735&ndash;1780.
            </div>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="text-xs text-muted mb-1">한 줄 기여</div>
            <div className="font-medium">
              자기연결 가중치를 1로 고정한 메모리 셀(&ldquo;상수 오차
              캐러셀&rdquo;)과 이를 여닫는 곱셈 게이트를 도입해, 오차 신호가
              사라지지도 폭발하지도 않게 만들어 1000 step이 넘는 시간 지연도
              학습 가능하게 만듦.
            </div>
          </div>
        </div>
      </CalcBox>

      <CalcBox title="■ 핵심 아이디어 — 원문·번역·해설">
        <SubSection title="● 문제의식: 오차역전파로는 먼 과거를 기억하지 못한다">
          <blockquote className="border-l-4 border-sidebar-border pl-4 italic text-sm text-muted my-3">
            &ldquo;Learning to store information over extended time
            intervals via recurrent backpropagation takes a very long
            time, mostly due to insufficient, decaying error
            back flow.&rdquo;
          </blockquote>
          <p className="text-sm text-muted mb-3">
            <strong>번역</strong> — &ldquo;순환 신경망의 역전파를 통해 정보를
            오랜 시간 간격에 걸쳐 저장하도록 학습시키는 데는 매우 오랜
            시간이 걸리는데, 이는 대체로 불충분하게 소실되는 오차 역류
            (error back flow) 때문이다.&rdquo;
          </p>
          <p>
            일반 RNN은 시각마다 같은 가중치 행렬을 반복 곱하며 과거로
            거슬러 오차를 전파한다. 이 반복 곱셈의 결과는 가중치 크기에
            따라 지수적으로 작아지거나(소실, vanishing) 커지는(폭발,
            exploding) 경향이 있다 — 저자들은 이전 분석(Hochreiter,
            1991)을 인용하며, 이 때문에 선행 연구들에서 RNN이 대략
            5~10 step보다 긴 시간 지연을 사실상 학습하지 못했다고
            지적한다.
          </p>
        </SubSection>

        <SubSection title="● Constant Error Carousel: 자기연결 가중치를 정확히 1로">
          <blockquote className="border-l-4 border-sidebar-border pl-4 italic text-sm text-muted my-3">
            &ldquo;This is achieved by an efficient, gradient-based
            algorithm for an architecture enforcing constant error flow
            through internal states of special units.&rdquo;
          </blockquote>
          <p className="text-sm text-muted mb-3">
            <strong>번역</strong> — &ldquo;이는 특수한 유닛의 내부 상태를
            통해 오차가 일정하게 흐르도록 강제하는 구조에 대한, 효율적인
            그레디언트 기반 알고리즘으로 달성된다.&rdquo;
          </p>
          <p className="mb-3">
            핵심 장치는 셀 상태(cell state) <InlineMath math="c(t)" />
            다. 다른 유닛과 달리 이 셀은 자기 자신으로 돌아오는 연결의
            가중치가 <InlineMath math="1" />로 고정되어 있어, 아무것도
            더해지지 않는 한 값을 그대로 다음 시각으로 넘긴다.
          </p>
          <BlockMath math="c(t) = c(t-1) + i(t) \odot g\big(x(t), h(t-1)\big)" />
          <p>
            이 경로를 거슬러 오차를 역전파하면 가중치 <InlineMath math="1" />
            를 반복해서 곱하는 셈이라 <strong>지수적으로 사라지지도
            폭발하지도 않는다</strong> — 저자들은 이 성질을 &ldquo;상수
            오차 캐러셀&rdquo;(Constant Error Carousel, CEC)이라 불렀다.
            새 정보가 얼마나 셀에 더해질지는 입력 게이트{" "}
            <InlineMath math="i(t)" />가 결정한다.
          </p>
        </SubSection>

        <SubSection title="● 곱셈 게이트: 셀에 대한 접근을 열고 닫는다">
          <blockquote className="border-l-4 border-sidebar-border pl-4 italic text-sm text-muted my-3">
            &ldquo;Multiplicative gate units learn to open and close
            access to constant error flow.&rdquo;
          </blockquote>
          <p className="text-sm text-muted mb-3">
            <strong>번역</strong> — &ldquo;곱셈 게이트 유닛은 상수 오차
            흐름에 대한 접근을 여닫는 법을 학습한다.&rdquo;
          </p>
          <p className="mb-3">
            1997년 원논문의 구조에는 두 개의 게이트가 있다. 입력 게이트{" "}
            <InlineMath math="i(t)" />는 지금 들어온 정보 중 얼마나 셀에
            새로 저장할지, 출력 게이트 <InlineMath math="o(t)" />는 저장된
            셀 값 중 얼마나 이번 시각의 출력으로 내보낼지를 결정한다.
            둘 다 시그모이드로 계산되어 0~1 사이 값을 가지며, 그 값만큼
            정보를 곱해서 통과시킨다.
          </p>
          <BlockMath math="h(t) = o(t) \odot \tanh\big(c(t)\big)" />
          <p>
            이렇게 CEC를 게이트로 감싸면, 셀은 필요할 때만 새 정보를
            받아들이고 필요할 때만 정보를 꺼내 쓸 수 있어 &ldquo;관련
            없는 입력이 셀 안의 오래된 정보를 덮어써 버리는&rdquo; 문제도
            함께 줄어든다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 메모리 셀 구조">
        <p className="mb-4">
          위쪽 빨간 선이 셀 상태가 흐르는 &ldquo;하이웨이&rdquo;(CEC)다.
          아래에서 입력 <InlineMath math="x(t), h(t-1)" />로부터 후보값{" "}
          <InlineMath math="g" />와 입력 게이트 <InlineMath math="i_t" />
          가 계산되어 곱해진 뒤 하이웨이에 더해지고, 오른쪽에서는 셀
          값이 <InlineMath math="\tanh" />를 거쳐 출력 게이트{" "}
          <InlineMath math="o_t" />와 곱해져 이번 시각의 출력{" "}
          <InlineMath math="h(t)" />가 된다.
        </p>
        <MemoryCellDiagram />
      </CalcBox>

      <CalcBox title="■ 왜 &ldquo;Long&rdquo; Short-Term Memory인가">
        <p>
          신경망에는 원래 두 종류의 기억이 있다고 여겨졌다 — 가중치에
          저장되어 학습 후 천천히만 바뀌는 <strong>장기 기억</strong>과,
          한 시퀀스가 진행되는 동안만 활성값으로 잠깐 유지되는{" "}
          <strong>단기 기억</strong>. RNN의 은닉 상태는 후자였지만
          몇 step 만에 정보가 씻겨나갔다. LSTM은 여전히 활성값 기반의
          &ldquo;단기 기억&rdquo;이지만, CEC 덕분에 그 지속 시간을 사실상
          장기간으로 늘렸다 — 그래서 &ldquo;오래가는 단기 기억&rdquo;,
          즉 Long Short-Term Memory라는 이름이 붙었다.
        </p>
      </CalcBox>

      <CalcBox title="■ 의미와 한계">
        <SubSection title="● 기여">
          <p>
            ① 오차역전파의 근본적 한계였던 소실/폭발 그레디언트 문제를
            게이트 달린 메모리 셀이라는 구조적 해법으로 풀어, 1000 step이
            넘는 시간 지연도 학습 가능함을 인공 과제로 실증. ② &ldquo;셀
            상태를 그대로 흘려보내고 게이트로 접근만 제어한다&rdquo;는
            아이디어는 이후 순차 데이터 모델링의 표준 구성 요소가 되어,
            음성 인식·기계 번역·언어 모델링 전반에서 수십 년간 지배적인
            아키텍처로 쓰임.
          </p>
        </SubSection>
        <SubSection title="● 한계 — 망각 게이트의 부재와 이후의 발전">
          <p>
            1997년 원논문의 셀에는 <strong>망각 게이트가 없었다</strong> —
            자기연결 가중치가 정확히 1이므로 셀 값은 계속 더해지기만
            할 뿐 스스로 지워지지 않는다. 끊김 없이 이어지는 긴
            시퀀스에서는 셀 값이 계속 커지며 포화되는 문제로 이어질 수
            있는데, 이는 이후 Gers, Schmidhuber &amp; Cummins(2000),
            &ldquo;Learning to Forget: Continual Prediction with
            LSTM&rdquo;에서 망각 게이트 <InlineMath math="f(t)" />를
            추가하며 보완되었다 — 오늘날 널리 쓰이는 &ldquo;표준
            LSTM&rdquo;은 대부분 이 망각 게이트 버전을 가리킨다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 발전 사슬에서의 위치">
        <p className="mb-3">
          이전 leaf(<strong>Ⅷ. ResNet</strong>): shortcut connection으로
          이미지 인식(CNN) 영역의 &ldquo;깊이의 역설&rdquo;은 풀었지만,
          순서가 있는 데이터를 다루는 순환 신경망은 여전히 오래된 정보를
          기억하지 못하는 별도의 장기 의존성 문제를 안고 있었다.
        </p>
        <p>
          <strong>이 기술이 푼 문제</strong>: 자기연결 가중치 1의 메모리
          셀(CEC)과 입력·출력 게이트로 오차가 소실·폭발하지 않게 만들어,
          RNN이 1000 step 넘는 시간 지연도 학습할 수 있게 함. →{" "}
          <strong>남긴 한계</strong>: LSTM은 &ldquo;정보를 오래 유지하는
          법&rdquo;은 풀었지만, 그 순환 신경망에 넣는 입력 자체 — 단어 하나
          하나 — 는 여전히 서로 얼마나 비슷한지 알 수 없는 원-핫 벡터에
          불과했다. →{" "}
          <strong>다음 leaf(Ⅹ. Word2Vec)로 이어짐</strong>: 단어를 의미가
          가까울수록 벡터도 가까워지는 밀집 벡터(임베딩)로 표현하는 방법이
          제안되어, 이후 LSTM을 비롯한 모든 시퀀스 모델의 입력 표현
          방식이 된다.
        </p>
        <Insight>
          CEC의 &ldquo;가중치 1의 자기연결&rdquo;은 이후 아키텍처에서
          모습을 바꿔 계속 등장하는 아이디어다. ResNet의 identity
          shortcut, 트랜스포머의 residual connection도 결국 &ldquo;정보를
          그대로 통과시키는 지름길을 마련하고, 그 위에 학습 가능한
          변화량만 얹는다&rdquo;는 같은 원리를 공유한다.
        </Insight>
      </CalcBox>
    </div>
  );
}
