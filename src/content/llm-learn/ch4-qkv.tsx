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

/** 숫자 배열 → Matrix 형식 */
function toMatData(m: number[][]): number[][] { return m; }

export default function QkvContent() {
  return (
    <article className="prose-like max-w-3xl">
      <p className="text-muted mb-8">
        예제 문장 <strong>"나는 사과를 좋아한다"</strong>로 Q·K·V 계산을 처음부터 끝까지 따라갑니다.
        차원은 실제(512) 대신 <strong>4</strong>로 축소했습니다.
      </p>

      {/* ── STEP 0: 준비 ── */}
      <CalcBox title="준비 — 입력 임베딩 X (3토큰 × 4차원)">
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
      <Step n={1} label="Wq · Wk · Wv 행렬로 Q, K, V 생성" />
      <CalcBox>
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
        <p className="text-sm mb-3">X · Wq = Q, X · Wk = K, X · Wv = V 계산 결과:</p>
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
      <Step n={2} label="Q · Kᵀ — 어텐션 점수 계산" />
      <CalcBox>
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
      </CalcBox>

      {/* ── STEP 3: √dk 스케일링 ── */}
      <Step n={3} label="√dk 스케일링" />
      <CalcBox>
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
      </CalcBox>

      {/* ── STEP 4: Softmax ── */}
      <Step n={4} label="Softmax → 어텐션 가중치" />
      <CalcBox>
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
      </CalcBox>

      {/* ── STEP 5: × V ── */}
      <Step n={5} label="A × V — 최종 출력 (가중합)" />
      <CalcBox>
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
      <CalcBox title="전체 공식">
        <BlockMath math="\text{Attention}(Q,K,V) = \text{softmax}\!\left(\frac{QK^T}{\sqrt{d_k}}\right)V" />
        <div className="mt-4 text-sm space-y-1 text-muted">
          <div>① X → Q, K, V (각각 Wq, Wk, Wv 곱셈)</div>
          <div>② Q · Kᵀ → 3×3 점수 행렬</div>
          <div>③ ÷ √dk → 스케일 조정</div>
          <div>④ softmax → 확률 분포 (행합=1)</div>
          <div>⑤ × V → 최종 출력 (문장 정보가 압축된 벡터)</div>
        </div>
      </CalcBox>
    </article>
  );
}
