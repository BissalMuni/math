"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";

export default function LinearAlgebra() {
  return (
    <div className="space-y-8">
      <section id="vector">
        <h2 className="text-xl font-semibold mb-3">벡터 (Vector)</h2>
        <p>단어를 고차원 벡터로 표현합니다 (Word Embedding). GPT-3는 12,288차원 벡터를 사용합니다.</p>
        <p className="mt-2 text-sm text-muted">교육과정: 고등학교 기하</p>
      </section>

      <section id="matrix">
        <h2 className="text-xl font-semibold mb-3">행렬 (Matrix)</h2>
        <p>모든 레이어의 가중치(Weight)가 행렬로 저장됩니다. 입력과 가중치의 행렬 곱으로 순전파를 수행합니다.</p>
        <BlockMath math="Y = WX + b" />
        <p className="text-sm text-muted">선형 변환의 기본 형태</p>
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 선형대수학</p>
      </section>

      <section id="matrix-multiplication">
        <h2 className="text-xl font-semibold mb-3">행렬 곱셈 (Matrix Multiplication)</h2>
        <p>Transformer의 핵심 연산입니다. Q, K, V 행렬의 곱으로 Attention Score를 계산하며, LLM 추론 비용의 대부분을 차지합니다.</p>
        <BlockMath math="(AB)_{ij} = \sum_{k} A_{ik} B_{kj}" />
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 선형대수학</p>
      </section>

      <section id="transpose">
        <h2 className="text-xl font-semibold mb-3">전치 행렬 (Transpose)</h2>
        <p>Attention에서 <InlineMath math="Q \cdot K^\top" /> 계산 시 Key 행렬을 전치합니다.</p>
        <BlockMath math="(A^\top)_{ij} = A_{ji}" />
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 선형대수학</p>
      </section>

      <section id="dot-product">
        <h2 className="text-xl font-semibold mb-3">내적 (Dot Product)</h2>
        <p>Scaled Dot-Product Attention의 핵심입니다. Query와 Key의 내적으로 토큰 간 유사도를 측정합니다.</p>
        <BlockMath math="\mathbf{a} \cdot \mathbf{b} = \sum_i a_i b_i = |\mathbf{a}||\mathbf{b}|\cos\theta" />
        <p className="mt-2 text-sm text-muted">교육과정: 고등학교 기하</p>
      </section>

      <section id="tensor">
        <h2 className="text-xl font-semibold mb-3">텐서 (Tensor)</h2>
        <p>배치 처리 시 3차원 이상의 다차원 배열을 사용합니다.</p>
        <p className="mt-2">형태: <InlineMath math="(\text{batch}, \text{sequence\_length}, \text{hidden\_dim})" /></p>
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 선형대수학/텐서해석</p>
      </section>

      <section id="eigenvalue">
        <h2 className="text-xl font-semibold mb-3">고유값/고유벡터 (Eigenvalue/Eigenvector)</h2>
        <p>가중치 행렬의 안정성 분석, PCA 기반 차원 축소, 모델 압축에 사용됩니다.</p>
        <BlockMath math="A\mathbf{v} = \lambda\mathbf{v}" />
        <p className="text-sm text-muted">A: 행렬, v: 고유벡터, λ: 고유값</p>
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 선형대수학</p>
      </section>

      <section id="svd">
        <h2 className="text-xl font-semibold mb-3">특이값 분해 (SVD)</h2>
        <p>LoRA(Low-Rank Adaptation)의 이론적 기반입니다. 가중치 행렬의 저랭크 근사에 사용됩니다.</p>
        <BlockMath math="A = U\Sigma V^\top" />
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 선형대수학</p>
      </section>

      <section id="cosine-similarity">
        <h2 className="text-xl font-semibold mb-3">코사인 유사도 (Cosine Similarity)</h2>
        <p>임베딩 벡터 간 의미적 유사도를 측정합니다. RAG에서 문서-쿼리 매칭에 사용됩니다.</p>
        <BlockMath math="\cos(\theta) = \frac{\mathbf{a} \cdot \mathbf{b}}{|\mathbf{a}| \times |\mathbf{b}|}" />
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 선형대수학</p>
      </section>

      <section id="norm">
        <h2 className="text-xl font-semibold mb-3">노름 (Norm)</h2>
        <p>Layer Normalization에서 벡터의 크기를 정규화합니다. Gradient Clipping에도 사용됩니다.</p>
        <BlockMath math="\|x\|_2 = \sqrt{\sum_i x_i^2}" />
        <p className="text-sm text-muted">L2 노름</p>
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 선형대수학</p>
      </section>
    </div>
  );
}
