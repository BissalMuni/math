import { BlockMath, InlineMath } from "@/components/math/math-formula";
import { Step, Matrix, Arrow, CalcBox, Insight } from "@/components/content/shared";

/**
 * 문장: "나는 사과를 좋아한다"
 * 토큰: ["나는", "사과를", "좋아한다"] → ID [1, 2, 3]
 * 임베딩 차원: d_model = 4  (실제는 512, 여기선 4로 축소)
 *
 * 임베딩 벡터 (학습된 값 가정):
 *   나는      = [1.0,  0.0, -1.0,  0.5]
 *   사과를    = [0.5,  1.0,  0.0, -0.5]
 *   좋아한다  = [-0.5, 0.5,  1.0,  0.0]
 *
 * Wq = Wk = Wv = 4×4 단순 행렬 (실제는 학습됨)
 */

// ── 입력 임베딩 ───────────────────────────────────────────
const X = [
  [1.0,  0.0, -1.0,  0.5],   // 나는
  [0.5,  1.0,  0.0, -0.5],   // 사과를
  [-0.5, 0.5,  1.0,  0.0],   // 좋아한다
];

// ── Wq (4×4) ─────────────────────────────────────────────
const Wq = [
  [1, 0, 1, 0],
  [0, 1, 0, 1],
  [1, 0, 0, 1],
  [0, 1, 1, 0],
];

// ── Wk (4×4) ─────────────────────────────────────────────
const Wk = [
  [1, 1, 0, 0],
  [0, 0, 1, 1],
  [1, 0, 1, 0],
  [0, 1, 0, 1],
];

// ── Wv (4×4) ─────────────────────────────────────────────
const Wv = [
  [0.5, 0,   0.5, 0  ],
  [0,   0.5, 0,   0.5],
  [0.5, 0,   0,   0.5],
  [0,   0.5, 0.5, 0  ],
];

/** 행렬 곱: A (m×k) × B (k×n) → (m×n) */
function matMul(A: number[][], B: number[][]): number[][] {
  const m = A.length, k = A[0].length, n = B[0].length;
  return Array.from({ length: m }, (_, i) =>
    Array.from({ length: n }, (_, j) =>
      A[i].reduce((s, _, p) => s + A[i][p] * B[p][j], 0)
    )
  );
}

/** 행렬 전치 */
function transpose(A: number[][]): number[][] {
  return A[0].map((_, j) => A.map(row => row[j]));
}

/** 스케일링 */
function scale(A: number[][], s: number): number[][] {
  return A.map(row => row.map(v => v / s));
}

/** 행별 softmax */
function softmax(A: number[][]): number[][] {
  return A.map(row => {
    const exps = row.map(v => Math.exp(v));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map(e => e / sum);
  });
}

const Q = matMul(X, Wq);
const K = matMul(X, Wk);
const V = matMul(X, Wv);
const QKt = matMul(Q, transpose(K));
const dk = Math.sqrt(4); // √d_k = √4 = 2
const QKt_scaled = scale(QKt, dk);
const Attn = softmax(QKt_scaled);
const Output = matMul(Attn, V);

// 소프트맥스 단계별 표시용 (행 0)
const _exp0 = QKt_scaled[0].map(Math.exp);
const _expSum0 = _exp0.reduce((a, b) => a + b, 0);

/** 숫자 배열 → Matrix 형식 */
function toMatData(m: number[][]): number[][] { return m; }

export default function QkvContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        예제 문장 <strong>"나는 사과를 좋아한다"</strong>로 Q·K·V 계산을 처음부터 끝까지 따라갑니다.
        차원은 실제(512) 대신 <strong>4</strong>로 축소했습니다.
      </p>

      {/* ── STEP 0: 준비 ── */}
      <CalcBox title="■ 준비 — 입력 임베딩 X (3토큰 × 4차원)">
        <p className="text-sm mb-4">
          토큰화 후 임베딩 테이블에서 각 토큰의 벡터를 가져옵니다.
          각 행 = 토큰 1개의 의미 벡터.
        </p>
        <div className="flex flex-wrap gap-6 items-start">
          <Matrix
            data={toMatData(X)}
            label='X = ["나는", "사과를", "좋아한다"]'
            color="default"
          />
          <div className="text-sm text-muted self-center">
            <div>행 0 → "나는"</div>
            <div>행 1 → "사과를"</div>
            <div>행 2 → "좋아한다"</div>
          </div>
        </div>
      </CalcBox>

      {/* ── STEP 1: Q, K, V 생성 ── */}
      <CalcBox title="■ Wq · Wk · Wv 행렬로 Q, K, V 생성">
        <p className="text-sm mb-4">
          Q = X · Wq &nbsp;|&nbsp; K = X · Wk &nbsp;|&nbsp; V = X · Wv
          <br />
          Wq, Wk, Wv는 각각 <strong>4×4</strong> 학습 파라미터입니다.
        </p>
        <div className="flex flex-wrap gap-4 items-start mb-6">
          <Matrix data={toMatData(Wq)} label="Wq (4×4)" color="blue" />
          <Matrix data={toMatData(Wk)} label="Wk (4×4)" color="green" />
          <Matrix data={toMatData(Wv)} label="Wv (4×4)" color="orange" />
        </div>
        <p className="text-sm mt-6 mb-3">X · Wq = Q, X · Wk = K, X · Wv = V 계산 결과:</p>
        <div className="flex flex-wrap gap-4 items-start">
          <Matrix data={toMatData(Q)} label="Q (3×4)" color="blue" />
          <Matrix data={toMatData(K)} label="K (3×4)" color="green" />
          <Matrix data={toMatData(V)} label="V (3×4)" color="orange" />
        </div>
        <Insight>
          Q = "내가 뭘 찾고 있나?", K = "나는 어떤 정보를 갖고 있나?", V = "실제로 전달할 내용".
          세 역할이 같은 입력 X에서 서로 다른 행렬(Wq/Wk/Wv)로 만들어집니다.
        </Insight>
      </CalcBox>

      {/* ── STEP 2: Q · Kᵀ ── */}
      <CalcBox title="■ Q · Kᵀ — 어텐션 점수 계산">
        <p className="text-sm mb-4">
          각 토큰의 Q와 모든 토큰의 K를 내적(dot product)합니다.
          결과는 <strong>3×3 점수 행렬</strong> — (i,j) = 토큰 i가 토큰 j에 얼마나 주목하는가.
        </p>
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <Matrix data={toMatData(Q)} label="Q (3×4)" color="blue" />
          <Arrow op="×" />
          <Matrix data={transpose(K)} label="Kᵀ (4×3)" color="green" />
          <Arrow op="=" />
          <Matrix data={toMatData(QKt)} label="Q·Kᵀ (3×3)" color="purple" />
        </div>
        <p className="text-sm text-muted">
          예: Q·Kᵀ[0][1] = "나는"이 "사과를"에 주는 점수 = <strong>{QKt[0][1].toFixed(2)}</strong>
        </p>
        <p className="text-sm mt-3">
          이 결과 행렬을 <strong>어텐션 점수 행렬(Attention Score Matrix)</strong>이라 부릅니다.
          스케일링·Softmax를 거치기 전의 날 것 유사도 값입니다.
        </p>
      </CalcBox>

      {/* ── STEP 3: √dk 스케일링 ── */}
      <CalcBox title="■ √dk 스케일링">
        <p className="text-sm mb-4">
          dk=4이므로 √dk=2. 모든 점수를 2로 나눕니다.
          <br />
          이유: 차원이 클수록 내적값이 커져 Softmax가 극단적이 되기 때문.
        </p>
        <div className="flex flex-wrap gap-3 items-center">
          <Matrix data={toMatData(QKt)} label="Q·Kᵀ" color="purple" />
          <Arrow op="÷ √4" />
          <Matrix data={toMatData(QKt_scaled)} label="스케일된 점수" color="purple" />
        </div>
        <Insight>
          스케일링이 끝나면 바로 <strong>Softmax</strong>를 적용합니다.
          ÷√d_k → Softmax 두 단계는 항상 세트로 동작하며, 결과가 어텐션 가중치(확률 분포)가 됩니다.
        </Insight>
      </CalcBox>

      {/* ── STEP 4: Softmax ── */}
      <CalcBox title="■ Softmax → 어텐션 가중치">
        <p className="text-sm mb-4">
          각 행(토큰)에 Softmax를 적용해 확률 분포로 변환.
          행의 합 = 1.0 (각 토큰이 다른 토큰에 쏟는 주의의 총합 = 100%).
        </p>
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <Matrix data={toMatData(QKt_scaled)} label="스케일된 점수" color="purple" />
          <Arrow op="softmax" />
          <Matrix data={toMatData(Attn)} label="어텐션 가중치 A" color="purple" />
        </div>
        <div className="text-sm text-muted">
          <BlockMath math="A_{ij} = \text{softmax}\!\left(\frac{Q K^T}{\sqrt{d_k}}\right)_{ij}" />
          <p className="mt-2">
            A[0] = [{Attn[0].map(v => v.toFixed(3)).join(", ")}] → 합 ≈ 1.0 ✓
          </p>
        </div>
        <p className="text-sm mt-3">
          <strong>A</strong>는 <strong>Attention</strong>의 첫 글자입니다.
          A<sub>ij</sub>는 토큰 i가 토큰 j에 쏟는 어텐션 가중치를 나타냅니다.
        </p>
        <div className="mt-6 border-t border-border pt-4 text-sm space-y-3">
          <p className="font-medium">"나는" 토큰(행 0) — 소프트맥스 3단계 계산</p>
          <p>입력: 스케일된 점수 = [{QKt_scaled[0].map(v => v.toFixed(3)).join(", ")}]</p>
          <Step n={1} label="각 값에 자연지수 e^x 적용" />
          <BlockMath math={`[e^{${QKt_scaled[0][0].toFixed(3)}},\\ e^{${QKt_scaled[0][1].toFixed(3)}},\\ e^{${QKt_scaled[0][2].toFixed(3)}}] = [${_exp0.map(v => v.toFixed(4)).join(",\\ ")}]`} />
          <Step n={2} label="합산 (분모 계산)" />
          <BlockMath math={`\\text{합} = ${_exp0.map(v => v.toFixed(4)).join(" + ")} = ${_expSum0.toFixed(4)}`} />
          <Step n={3} label="각 값 ÷ 합 (정규화)" />
          <BlockMath math={`\\left[${_exp0.map(v => `\\tfrac{${v.toFixed(4)}}{${_expSum0.toFixed(4)}}`).join(",\\ ")}\\right] = [${Attn[0].map(v => v.toFixed(4)).join(",\\ ")}]`} />
          <Insight>
            지수 함수는 큰 값을 더 크게 증폭시키고 작은 값을 0에 가깝게 만듭니다.
            스케일링(÷√d_k) 없이 점수가 너무 크면 한 방향으로 확률이 쏠려 학습이 불안정해집니다.
          </Insight>
        </div>
      </CalcBox>

      {/* ── STEP 5: × V ── */}
      <CalcBox title="■ A × V — 최종 출력 (가중합)">
        <p className="text-sm mb-4">
          어텐션 가중치로 V 벡터들을 가중 합산.
          각 토큰의 출력 벡터 = 전체 문장 정보를 담은 새 벡터.
        </p>
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <Matrix data={toMatData(Attn)} label="A (3×3)" color="purple" />
          <Arrow op="×" />
          <Matrix data={toMatData(V)} label="V (3×4)" color="orange" />
          <Arrow op="=" />
          <Matrix data={toMatData(Output)} label="Output (3×4)" color="blue" />
        </div>
        <Insight>
          Output[0] ("나는"의 출력 벡터) = [{Output[0].map(v => v.toFixed(3)).join(", ")}]
          <br />
          이 벡터에는 "나는"의 의미 + 문장 전체(사과를, 좋아한다)와의 관계가 압축되어 있습니다.
        </Insight>
      </CalcBox>

      {/* ── 전체 공식 요약 ── */}
      <CalcBox title="■ 전체 공식">
        <BlockMath math="\text{Attention}(Q,K,V) = \text{softmax}\!\left(\frac{QK^T}{\sqrt{d_k}}\right)V" />
        <div className="mt-4 text-sm space-y-1 text-muted">
          <div>① X → Q, K, V (각각 Wq, Wk, Wv 곱셈)</div>
          <div>② Q · Kᵀ → 3×3 점수 행렬</div>
          <div>③ ÷ √dk → 스케일 조정</div>
          <div>④ softmax → 확률 분포 (행합=1)</div>
          <div>⑤ × V → 최종 출력 (문장 정보가 압축된 벡터)</div>
        </div>
        <p className="mt-4 text-sm leading-relaxed">
          Q·Kᵀ로 모든 토큰 쌍의 유사도를 계산하고, √d_k로 나눠 값의 크기를 안정시킨 뒤,
          Softmax를 적용해 <strong>어텐션 가중치</strong>(각 행의 합 = 1인 확률 분포)를 얻습니다.
          이 가중치로 V 벡터들을 가중합산하면 "어떤 토큰에 얼마나 주목했는지"가 반영된
          출력 벡터가 완성되어 <strong>다음 레이어</strong>(피드포워드 또는 Multi-Head Attention)로 전달됩니다.
        </p>
      </CalcBox>

      {/* ── 다음 단계 ── */}
      <CalcBox title="■ 다음으로 — 멀티헤드 어텐션">
        <p className="text-sm mb-3">
          Single-Head Attention은 하나의 관점(Wq/Wk/Wv 한 세트)으로만 문장을 바라봅니다.
        </p>
        <p className="text-sm mb-3">
          <strong>Multi-Head Attention</strong>은 이 Q·K·V 어텐션을 <em>h</em>개 헤드로 병렬 실행해
          여러 관점(구문·의미·위치 등)의 정보를 동시에 포착합니다.
          각 헤드의 출력을 이어붙여(concatenate) 선형 변환하면 최종 Multi-Head 출력이 됩니다.
        </p>
        <Insight>
          Q·K·V 어텐션 한 번 = Single Head. h번 병렬 = Multi-Head.
          다음 단원에서 Multi-Head Attention을 다룹니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
