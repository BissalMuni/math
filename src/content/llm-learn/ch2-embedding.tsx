import { BlockMath } from "@/components/math-formula";
import { Step, Matrix, Arrow, CalcBox, Insight } from "./shared";

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
    <article className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">2. 임베딩</h1>
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
      <Step n={1} label="토큰 ID → 임베딩 벡터 조회 (단순 인덱스 접근)" />
      <CalcBox>
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
      <Step n={2} label="문장 전체 임베딩 행렬 X (3×4)" />
      <CalcBox>
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

      {/* ── 의미 공간 직관 ── */}
      <CalcBox title="임베딩 공간 직관">
        <p className="text-sm mb-3">
          학습이 끝난 임베딩에서는 의미 관계가 벡터 연산으로 나타납니다:
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded p-4 space-y-1">
          <div>v("왕") - v("남자") + v("여자") ≈ v("여왕")</div>
          <div>v("서울") - v("한국") + v("일본") ≈ v("도쿄")</div>
        </div>
        <p className="text-sm text-muted mt-3">
          이 관계는 누가 프로그래밍한 게 아니라, 수십억 문장에서 다음 토큰 예측 학습을 통해
          자동으로 형성됩니다.
        </p>
      </CalcBox>
    </article>
  );
}
