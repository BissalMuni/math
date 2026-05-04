import { BlockMath } from "@/components/math/math-formula";
import { Matrix, Arrow, CalcBox, Insight } from "@/components/content/shared";

/**
 * 임베딩 예제
 * 어휘 크기 V=5, 임베딩 차원 d=4 (실제: V=100000, d=512~4096)
 */

// 임베딩 테이블 (5×4) — 각 행 = 토큰 1개의 벡터
const embTable = [
  [ 0.10,  0.22, -0.15,  0.08],  // ID 0 <PAD>
  [ 1.00,  0.00, -1.00,  0.50],  // ID 1 "나는"
  [ 0.50,  1.00,  0.00, -0.50],  // ID 2 "사과를"
  [-0.50,  0.50,  1.00,  0.00],  // ID 3 "좋아한다"
  [ 0.30, -0.80,  0.20,  0.70],  // ID 4 "먹었다"
];

// 입력 토큰 ID
const tokenIds = [1, 2, 3];  // 나는, 사과를, 좋아한다

// 조회된 임베딩
const looked = tokenIds.map(id => embTable[id]);

export default function EmbeddingContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        토큰 ID(숫자)는 순서 정보뿐입니다. ID 1과 ID 2의 차이 1은 아무 의미가 없습니다.
        임베딩은 각 ID를 <strong>의미가 담긴 고차원 벡터</strong>로 변환합니다.
      </p>

      {/* ── ID만으로는 부족하다 ── */}
      <CalcBox title="왜 ID만으로는 부족한가">
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-semibold mb-2 text-red-500">❌ ID 그대로 사용</div>
            <div className="font-mono bg-sidebar-bg border border-sidebar-border rounded p-3">
              나는    = 1<br/>
              사과를  = 2<br/>
              먹었다  = 4<br/>
              좋아한다 = 3<br/>
            </div>
            <p className="text-muted mt-2">
              "사과를"(2)이 "먹었다"(4)보다 "나는"(1)에 가깝다?<br/>
              의미 관계가 전혀 반영 안 됨.
            </p>
          </div>
          <div>
            <div className="font-semibold mb-2 text-green-600">✅ 임베딩 벡터 사용</div>
            <div className="font-mono bg-sidebar-bg border border-sidebar-border rounded p-3 text-xs">
              나는    = [1.0, 0.0,-1.0, 0.5]<br/>
              사과를  = [0.5, 1.0, 0.0,-0.5]<br/>
              먹었다  = [0.3,-0.8, 0.2, 0.7]<br/>
              좋아한다= [-0.5,0.5, 1.0, 0.0]<br/>
            </div>
            <p className="text-muted mt-2">
              비슷한 의미의 단어 = 가까운 벡터.<br/>
              코사인 유사도로 의미 거리 측정 가능.
            </p>
          </div>
        </div>
        <Insight>
          임베딩 테이블은 처음에 무작위로 초기화된 후, 학습을 통해 의미 관계가
          벡터 거리에 반영되도록 업데이트됩니다.
        </Insight>
      </CalcBox>

      {/* ── 임베딩 테이블 구조 ── */}
      <CalcBox title="임베딩 테이블 (어휘 크기 × 임베딩 차원)">
        <p className="text-sm mb-4">
          실제: <strong>100,000 × 512</strong> 행렬 (GPT-2 기준).
          여기선 5 × 4로 축소.
        </p>
        <Matrix
          data={embTable}
          label="임베딩 테이블 E (5×4)"
          color="default"
        />
        <p className="text-sm text-muted mt-3">
          각 행 = 토큰 1개의 4차원 의미 벡터.<br/>
          총 파라미터: 5 × 4 = 20개 (실제: 100,000 × 512 = 51,200,000개)
        </p>
      </CalcBox>

      {/* ── 조회 과정 ── */}
      <CalcBox title="① 토큰 ID → 임베딩 벡터 조회 (단순 인덱스 접근)">
        <p className="text-sm mb-4">
          임베딩 조회는 복잡한 계산 없이 <strong>테이블에서 해당 행을 꺼내는 것</strong>입니다.
        </p>
        <div className="space-y-3">
          {tokenIds.map((id, i) => {
            const labels = ["나는", "사과를", "좋아한다"];
            return (
              <div key={i} className="flex flex-wrap items-center gap-3 text-sm">
                <span className="font-mono bg-sidebar-bg border border-sidebar-border rounded px-2 py-1">
                  ID {id} ({labels[i]})
                </span>
                <Arrow op={`E[${id}]`} />
                <Matrix data={[looked[i]]} color="blue" />
              </div>
            );
          })}
        </div>
      </CalcBox>

      {/* ── 최종 행렬 ── */}
      <CalcBox title="② 문장 전체 임베딩 행렬 X (3×4)">
        <p className="text-sm mb-4">
          3개 토큰의 임베딩 벡터를 쌓으면 입력 행렬 X가 됩니다.
          이 X가 어텐션 연산의 실제 입력입니다.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <div className="font-mono text-xs">
            <div>ID [1, 2, 3]</div>
            <div>↓ 조회</div>
          </div>
          <Matrix data={looked} label="X = 임베딩 행렬 (3×4)" color="blue" />
        </div>
        <div className="mt-4 text-sm">
          <BlockMath math="X = E[\text{token\_ids}] \quad \in \mathbb{R}^{T \times d}" />
          <p className="text-muted mt-1">T = 토큰 수(3), d = 임베딩 차원(4)</p>
        </div>
        <Insight>
          위치 인코딩(다음 챕터)을 X에 더하면 트랜스포머 블록으로 들어갑니다.
        </Insight>
      </CalcBox>

      {/* ── 수식 요소 설명 ── */}
      <CalcBox title="수식 요소 하나씩 뜯어보기">
        <div className="mb-4">
          <BlockMath math="X = E[\text{token\_ids}] \quad \in \mathbb{R}^{T \times d}" />
        </div>
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <div className="divide-y divide-sidebar-border">
            {[
              ["X", "임베딩 결과 행렬 — 문장 전체의 벡터 표현"],
              ["E", "임베딩 테이블 (V×d 행렬) — 학습으로 결정되는 파라미터"],
              ["token_ids", "토큰화 결과 ID 배열 — 예: [1, 2, 3]"],
              ["E[token_ids]", "테이블에서 해당 ID의 행을 꺼내서 쌓는 연산"],
              ["ℝ^{T×d}", "결과의 크기: T개 토큰 × d차원 벡터"],
              ["T", "토큰 수 (문장 길이). 예: 3"],
              ["d", "임베딩 차원 (벡터 길이). 예: 4 (실제: 512~4096)"],
            ].map(([sym, desc]) => (
              <div key={sym} className="flex px-4 py-2 gap-4">
                <span className="font-mono text-accent w-24 shrink-0">{sym}</span>
                <span className="text-muted">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </CalcBox>

      {/* ── 코사인 유사도 ── */}
      <CalcBox title="코사인 유사도로 의미 거리 측정">
        <p className="text-sm mb-3">
          두 벡터가 얼마나 비슷한 방향인지를 <strong>코사인 유사도</strong>로 측정합니다.
          값이 1에 가까우면 비슷, 0이면 무관, -1이면 반대입니다.
        </p>
        <BlockMath math="\cos(\theta) = \frac{\mathbf{a} \cdot \mathbf{b}}{\|\mathbf{a}\| \, \|\mathbf{b}\|}" />
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 mt-4 space-y-3">
          <div>
            <div className="text-muted font-sans mb-1">&ldquo;나는&rdquo; vs &ldquo;사과를&rdquo;</div>
            <div>a = [1.00, 0.00, -1.00, 0.50]</div>
            <div>b = [0.50, 1.00, 0.00, -0.50]</div>
            <div className="mt-1">a·b = (1×0.5) + (0×1) + (-1×0) + (0.5×-0.5) = 0.25</div>
            <div>|a| = √(1+0+1+0.25) = 1.50</div>
            <div>|b| = √(0.25+1+0+0.25) = 1.22</div>
            <div className="text-accent font-bold mt-1">cos(θ) = 0.25 / (1.50 × 1.22) ≈ 0.14 (거의 무관)</div>
          </div>
          <div className="border-t border-sidebar-border pt-3">
            <div className="text-muted font-sans mb-1">유사한 단어끼리는 cos ≈ 0.8~0.95 (매우 가까움)</div>
            <div className="text-muted font-sans">예: &ldquo;왕&rdquo;과 &ldquo;여왕&rdquo;, &ldquo;강아지&rdquo;와 &ldquo;개&rdquo;</div>
          </div>
        </div>
      </CalcBox>

      {/* ── 위치 인코딩 연결 ── */}
      <CalcBox title="다음 단계: 위치 인코딩 더하기">
        <p className="text-sm mb-3">
          임베딩 행렬 X에는 <strong>단어의 순서 정보가 없습니다</strong>.
          &ldquo;나는 사과를 좋아한다&rdquo;와 &ldquo;사과를 나는 좋아한다&rdquo;의 X가 같은 행으로 구성됩니다
          (순서만 다를 뿐).
        </p>
        <p className="text-sm mb-3">
          그래서 <strong>위치 인코딩(Positional Encoding)</strong> 벡터 P를 더해줍니다:
        </p>
        <BlockMath math="X_{\text{final}} = E[\text{token\_ids}] + P" />
        <div className="font-mono text-xs text-muted bg-sidebar-bg border border-sidebar-border rounded-lg p-4 space-y-1">
          <div>E[token_ids] = 의미 정보 (어떤 단어인가)</div>
          <div>P&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = 순서 정보 (몇 번째 위치인가)</div>
          <div className="text-accent pt-1">X_final&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = 의미 + 순서 → 트랜스포머 블록 입력</div>
        </div>
        <Insight>
          위치 인코딩의 자세한 계산 방법은 다음 챕터(3. 위치 인코딩)에서 다룹니다.
        </Insight>
      </CalcBox>

      {/* ── 의미 공간 직관 ── */}
      <CalcBox title="임베딩 공간 직관">
        <p className="text-sm mb-3">
          학습이 끝난 임베딩에서는 의미 관계가 벡터 연산으로 나타납니다:
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded p-4 space-y-1">
          <div>v(&ldquo;왕&rdquo;) - v(&ldquo;남자&rdquo;) + v(&ldquo;여자&rdquo;) ≈ v(&ldquo;여왕&rdquo;)</div>
          <div>v(&ldquo;서울&rdquo;) - v(&ldquo;한국&rdquo;) + v(&ldquo;일본&rdquo;) ≈ v(&ldquo;도쿄&rdquo;)</div>
        </div>
        <p className="text-sm text-muted mt-3">
          이 관계는 누가 프로그래밍한 게 아니라, 수십억 문장에서 다음 토큰 예측 학습을 통해
          자동으로 형성됩니다.
        </p>
      </CalcBox>
    </div>
  );
}
