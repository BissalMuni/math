"use client";

import { BlockMath, InlineMath } from "@/components/math/math-formula";
import { Matrix, Arrow, CalcBox, Insight } from "@/components/content/shared";

/**
 * Multi-Head Attention 예제 (축소):
 *   d_model = 8, num_heads = 2, d_k = d_v = 4 (8 / 2)
 *   입력 X: 3토큰 × 8차원
 *
 * 실제 GPT-3: d_model=12288, num_heads=96, d_k=128
 * 예제 설명용: d_model=8, 2헤드, 각 헤드 4차원
 */

/** 행렬 곱: A(m×k) × B(k×n) → (m×n) */
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

/** 행별 softmax */
function softmax(A: number[][]): number[][] {
  return A.map(row => {
    const exps = row.map(v => Math.exp(v));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map(e => e / sum);
  });
}

/** 단순 어텐션 계산: Attention(Q,K,V) */
function attention(Q: number[][], K: number[][], V: number[][]): number[][] {
  const dk = Math.sqrt(Q[0].length);
  const scores = matMul(Q, transpose(K));
  const scaled = scores.map(row => row.map(v => v / dk));
  const weights = softmax(scaled);
  return matMul(weights, V);
}

// ── 입력 X: 3×8 ──────────────────────────────────────────
const X: number[][] = [
  [ 1.0,  0.0, -1.0,  0.5,  0.2, -0.3,  0.8,  0.1],  // 나는
  [ 0.5,  1.0,  0.0, -0.5,  0.7,  0.4, -0.2,  0.6],  // 사과를
  [-0.5,  0.5,  1.0,  0.0, -0.1,  0.9,  0.3, -0.4],  // 좋아한다
];

// ── Head 1용 가중치: Wq1, Wk1, Wv1 각 (8×4) ─────────────
const Wq1: number[][] = [
  [1, 0, 1, 0], [0, 1, 0, 1], [1, 0, 0, 1], [0, 1, 1, 0],
  [1, 1, 0, 0], [0, 0, 1, 1], [1, 0, 1, 0], [0, 1, 0, 1],
];
const Wk1: number[][] = [
  [1, 1, 0, 0], [0, 0, 1, 1], [1, 0, 1, 0], [0, 1, 0, 1],
  [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 0, 1], [1, 0, 1, 0],
];
const Wv1: number[][] = [
  [0.5, 0,   0.5, 0  ], [0,   0.5, 0,   0.5], [0.5, 0,   0,   0.5], [0,   0.5, 0.5, 0  ],
  [0.5, 0.5, 0,   0  ], [0,   0,   0.5, 0.5], [0.5, 0,   0,   0.5], [0,   0.5, 0.5, 0  ],
];

// ── Head 2용 가중치: Wq2, Wk2, Wv2 각 (8×4) ─────────────
const Wq2: number[][] = [
  [0, 1, 0, 1], [1, 0, 1, 0], [0, 1, 1, 0], [1, 0, 0, 1],
  [0, 0, 1, 1], [1, 1, 0, 0], [0, 1, 0, 1], [1, 0, 1, 0],
];
const Wk2: number[][] = [
  [0, 0, 1, 1], [1, 1, 0, 0], [0, 1, 0, 1], [1, 0, 1, 0],
  [1, 0, 0, 1], [0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 1, 1],
];
const Wv2: number[][] = [
  [0,   0.5, 0,   0.5], [0.5, 0,   0.5, 0  ], [0,   0.5, 0.5, 0  ], [0.5, 0,   0,   0.5],
  [0,   0,   0.5, 0.5], [0.5, 0.5, 0,   0  ], [0,   0.5, 0,   0.5], [0.5, 0,   0.5, 0  ],
];

// ── 각 헤드 계산 ──────────────────────────────────────────
const Q1 = matMul(X, Wq1);
const K1 = matMul(X, Wk1);
const V1 = matMul(X, Wv1);
const head1 = attention(Q1, K1, V1);  // 3×4

const Q2 = matMul(X, Wq2);
const K2 = matMul(X, Wk2);
const V2 = matMul(X, Wv2);
const head2 = attention(Q2, K2, V2);  // 3×4

// ── Concat: [head1 | head2] → 3×8 ────────────────────────
const concat: number[][] = head1.map((row, i) => [...row, ...head2[i]]);

// ── Wo (8×8): 출력 투영 ───────────────────────────────────
const Wo: number[][] = [
  [1, 0, 0, 0, 0, 0, 0, 1], [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0], [0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 0, 1, 0], [1, 0, 0, 0, 0, 0, 0, 1],
];

const finalOutput = matMul(concat, Wo);  // 3×8

export default function MultiHeadContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        단일 어텐션 = "한 관점으로만" 문장을 읽는 것.
        멀티헤드 어텐션 = <strong>"8개의 관점으로 동시에"</strong> 문장을 읽는 것.
        각 헤드는 독립적인 가중치로 서로 다른 언어적 관계를 학습합니다.
      </p>

      {/* ── 왜 여러 헤드가 필요한가 ── */}
      <CalcBox title="왜 여러 헤드가 필요한가?">
        <p className="text-sm mb-3">
          "나는 사과를 좋아한다"에서 하나의 어텐션 헤드로는 모든 관계를 동시에 포착하기 어렵습니다.
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
            <div className="font-bold text-blue-700 dark:text-blue-300">Head 1 — 통사 관계</div>
            <div className="text-muted text-xs mt-1">"좋아한다" ← "나는" (주어-동사)</div>
          </div>
          <div className="p-3 rounded-lg border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <div className="font-bold text-green-700 dark:text-green-300">Head 2 — 의미 관계</div>
            <div className="text-muted text-xs mt-1">"좋아한다" ← "사과를" (동사-목적어)</div>
          </div>
          <div className="p-3 rounded-lg border border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
            <div className="font-bold text-orange-700 dark:text-orange-300">Head 3 — 지시 관계</div>
            <div className="text-muted text-xs mt-1">대명사가 가리키는 명사 추적</div>
          </div>
          <div className="p-3 rounded-lg border border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950">
            <div className="font-bold text-purple-700 dark:text-purple-300">Head 4 — 위치 관계</div>
            <div className="text-muted text-xs mt-1">인접 토큰 간 관계</div>
          </div>
        </div>
      </CalcBox>

      {/* ── 차원 분할 ── */}
      <CalcBox title="① 차원 분할: d_model → 헤드 수 × d_k">
        <p className="text-sm mb-4">
          d_model=512를 8개 헤드로 나누면 각 헤드가 64차원을 담당합니다.
          파라미터 수는 단일 헤드와 동일합니다.
        </p>
        <div className="text-sm font-mono space-y-2 p-4 rounded-lg bg-sidebar-bg border border-sidebar-border">
          <div>d_model = 512,  num_heads = 8</div>
          <div>d_k = d_v = 512 / 8 = <strong>64</strong></div>
          <div className="mt-2 text-muted">각 헤드별 Wq 크기: 512 × 64</div>
          <div className="text-muted">8개 헤드 합산: 8 × (512×64) = <strong>262,144</strong> 파라미터</div>
          <div className="text-muted">단일 헤드 Wq (512×512):         <strong>262,144</strong> 파라미터</div>
          <div className="text-green-700 dark:text-green-300 font-bold mt-1">→ 총 파라미터 수 동일! 단지 관점이 8개로 분리됨</div>
        </div>
        <p className="text-sm text-muted mt-3">
          이 아이디어는 대화 중 학습자가 독립적으로 도출했습니다: "Wq 크기가 512×64이어야 한다" ✓
        </p>
      </CalcBox>

      {/* ── STEP 2: 예제 (d_model=8, 2헤드) ── */}
      <CalcBox title="② 단계별 계산 (d_model=8, 2헤드, 각 4차원)">
        <p className="text-sm mb-4">
          입력 X: 3토큰 × 8차원. 각 헤드는 8×4 가중치 행렬로 4차원 공간에 투영합니다.
        </p>
        <div className="mb-4">
          <Matrix data={X} label="X 입력 (3×8)" color="default" />
        </div>

        <div className="flex flex-wrap gap-6">
          {/* Head 1 */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-2">Head 1</div>
            <div className="flex flex-wrap gap-2 items-center text-xs text-muted mb-2">
              <span>X(3×8)</span>
              <span>×</span>
              <span>Wq1(8×4)</span>
              <span>=</span>
              <span className="font-bold text-blue-700 dark:text-blue-300">Q1(3×4)</span>
            </div>
            <Matrix data={Q1} label="Q1" color="blue" />
            <div className="mt-2">
              <Matrix data={head1} label="Head1 출력 (3×4)" color="blue" />
            </div>
          </div>

          {/* Head 2 */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-green-700 dark:text-green-300 mb-2">Head 2</div>
            <div className="flex flex-wrap gap-2 items-center text-xs text-muted mb-2">
              <span>X(3×8)</span>
              <span>×</span>
              <span>Wq2(8×4)</span>
              <span>=</span>
              <span className="font-bold text-green-700 dark:text-green-300">Q2(3×4)</span>
            </div>
            <Matrix data={Q2} label="Q2" color="green" />
            <div className="mt-2">
              <Matrix data={head2} label="Head2 출력 (3×4)" color="green" />
            </div>
          </div>
        </div>
      </CalcBox>

      {/* ── STEP 3: Concat + Wo ── */}
      <CalcBox title="③ Concat → Wo 투영 → 최종 출력">
        <p className="text-sm mb-4">
          두 헤드 출력을 가로로 이어 붙인 후, Wo(8×8) 행렬로 최종 출력을 만듭니다.
        </p>
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <Matrix data={head1} label="Head1 (3×4)" color="blue" />
          <Arrow op="concat" />
          <Matrix data={head2} label="Head2 (3×4)" color="green" />
          <Arrow op="=" />
          <Matrix data={concat} label="Concat (3×8)" color="purple" />
        </div>
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <Matrix data={concat} label="Concat (3×8)" color="purple" />
          <Arrow op="× Wo(8×8)" />
          <Matrix data={finalOutput} label="최종 출력 (3×8)" color="orange" />
        </div>
        <p className="text-sm text-muted">
          최종 출력 크기 = 입력 X 크기 (3×8) — 크기가 보존됩니다.
        </p>
      </CalcBox>

      {/* ── 전체 공식 ── */}
      <CalcBox title="Multi-Head Attention 공식">
        <BlockMath math="\text{MultiHead}(Q,K,V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h) W^O" />
        <BlockMath math="\text{head}_i = \text{Attention}(Q W_i^Q,\ K W_i^K,\ V W_i^V)" />
        <div className="text-sm text-muted mt-3 space-y-1">
          <div>① X → Q, K, V 각 헤드별 투영 (Wq_i, Wk_i, Wv_i)</div>
          <div>② 각 헤드에서 독립적으로 Attention 계산</div>
          <div>③ 모든 헤드 출력을 concat</div>
          <div>④ Wo로 최종 투영 → 원래 차원 복원</div>
        </div>
      </CalcBox>

      <Insight>
        <strong>"8개의 관점으로 동시에 문장을 읽는 것"</strong>
        <br />
        각 헤드는 자신만의 Wq, Wk, Wv를 학습하며 서로 다른 언어 패턴을 포착합니다.
        단일 헤드로는 불가능한 구문론적 관계, 의미론적 관계, 지시 관계를
        동시에 포착할 수 있습니다.
        총 파라미터 수는 같으면서 표현력은 훨씬 풍부해집니다.
      </Insight>
    </div>
  );
}
