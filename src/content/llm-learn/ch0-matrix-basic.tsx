import { BlockMath, InlineMath } from "@/components/math/math-formula";
import { Step, CalcBox, Insight, Matrix, Arrow } from "./shared";

/** 서막 0-4: 행렬 곱셈 기초 */
export default function MatrixBasicContent() {
  // 2×3 행렬 × 3×2 행렬 = 2×2 행렬
  const A = [
    [1, 2, 3],
    [4, 5, 6],
  ];
  const B = [
    [7, 8],
    [9, 10],
    [11, 12],
  ];
  // 결과
  const C = [
    [1*7 + 2*9 + 3*11, 1*8 + 2*10 + 3*12],
    [4*7 + 5*9 + 6*11, 4*8 + 5*10 + 6*12],
  ];

  return (
    <article className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">0-4. 행렬 곱셈 기초</h1>
      <p className="text-muted mb-8">
        트랜스포머의 모든 연산은 <strong>행렬 곱셈</strong>입니다.
        어텐션, 임베딩, FFN — 전부 행렬을 곱합니다.
        여기서 핵심 규칙만 익히면 이후 챕터가 편해집니다.
      </p>

      {/* ── 행렬이란 ── */}
      <CalcBox title="행렬 = 숫자를 격자로 배열한 것">
        <p className="text-sm mb-4">
          행렬은 숫자를 행(가로)과 열(세로)로 정리한 표입니다.
          <InlineMath math="m \times n" /> 행렬은 m개의 행과 n개의 열을 가집니다.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <Matrix data={A} label="A (2×3)" color="blue" />
          <Matrix data={B} label="B (3×2)" color="green" />
        </div>
        <p className="text-sm text-muted mt-3">
          A는 2행 3열, B는 3행 2열입니다.
        </p>
      </CalcBox>

      {/* ── 곱셈 규칙 ── */}
      <CalcBox title="행렬 곱셈의 핵심 규칙">
        <div className="space-y-3 text-sm">
          <div className="rounded-lg border border-accent bg-accent-light p-3">
            <strong>규칙:</strong> A의 <strong>열 수</strong>와 B의 <strong>행 수</strong>가 같아야 곱할 수 있다.
          </div>
          <BlockMath math="A_{(m \times \mathbf{n})} \times B_{(\mathbf{n} \times p)} = C_{(m \times p)}" />
          <p className="text-muted">
            결과 행렬 C의 크기: A의 행 수(m) × B의 열 수(p)
          </p>
        </div>
      </CalcBox>

      {/* ── 실제 계산 ── */}
      <Step n={1} label="행렬 곱셈 계산 — 행 × 열을 내적" />
      <CalcBox>
        <p className="text-sm mb-4">
          C의 각 원소는 A의 <strong>한 행</strong>과 B의 <strong>한 열</strong>을 원소별로 곱해서 합산한 것입니다.
        </p>
        <div className="space-y-4 text-sm font-mono bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
          <div>
            <div className="text-muted mb-1">C[0][0] = A의 0행 · B의 0열</div>
            <div>= (1×7) + (2×9) + (3×11) = 7 + 18 + 33 = <strong>58</strong></div>
          </div>
          <div>
            <div className="text-muted mb-1">C[0][1] = A의 0행 · B의 1열</div>
            <div>= (1×8) + (2×10) + (3×12) = 8 + 20 + 36 = <strong>64</strong></div>
          </div>
          <div>
            <div className="text-muted mb-1">C[1][0] = A의 1행 · B의 0열</div>
            <div>= (4×7) + (5×9) + (6×11) = 28 + 45 + 66 = <strong>139</strong></div>
          </div>
          <div>
            <div className="text-muted mb-1">C[1][1] = A의 1행 · B의 1열</div>
            <div>= (4×8) + (5×10) + (6×12) = 32 + 50 + 72 = <strong>154</strong></div>
          </div>
        </div>
      </CalcBox>

      <Step n={2} label="결과" />
      <CalcBox>
        <div className="flex flex-wrap items-center gap-4">
          <Matrix data={A} label="A (2×3)" color="blue" />
          <Arrow op="×" />
          <Matrix data={B} label="B (3×2)" color="green" />
          <Arrow op="=" />
          <Matrix data={C} label="C (2×2)" color="orange" />
        </div>
      </CalcBox>

      {/* ── LLM에서의 의미 ── */}
      <CalcBox title="트랜스포머에서 행렬 곱셈이 쓰이는 곳">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <div className="divide-y divide-sidebar-border">
            {[
              ["임베딩 조회", "토큰 ID → 임베딩 벡터 (사실상 행렬의 행 선택)"],
              ["Q·K·V 생성", "임베딩 × 가중치 행렬 → Query, Key, Value"],
              ["어텐션 점수", "Q × Kᵀ → 단어 간 관련도 행렬"],
              ["FFN", "행렬 × 가중치 → 비선형 변환"],
              ["출력층", "은닉 상태 × 가중치 → 어휘 확률"],
            ].map(([where, desc]) => (
              <div key={where} className="flex px-4 py-2 gap-4">
                <span className="font-semibold w-28 shrink-0">{where}</span>
                <span className="text-muted">{desc}</span>
              </div>
            ))}
          </div>
        </div>
        <Insight>
          트랜스포머를 이해하는 핵심은 행렬 곱셈입니다.
          &ldquo;행 × 열 내적&rdquo;만 기억하면 이후 모든 챕터를 따라갈 수 있습니다.
        </Insight>
      </CalcBox>
    </article>
  );
}
