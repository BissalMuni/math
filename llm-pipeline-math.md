# LLM 처리 절차별 수학 개념 매핑

## 전체 파이프라인 개요

```
입력 텍스트
  → ① 토큰화 (Tokenization)
  → ② 토큰 임베딩 (Token Embedding)
  → ③ 위치 인코딩 (Positional Encoding)
  → ④ Transformer Block × N 반복
      → ④-a. Layer Normalization (Pre-Norm)
      → ④-b. Multi-Head Self-Attention
          → Q, K, V 선형 투영 (Linear Projection)
          → Scaled Dot-Product Attention
          → Attention 출력 선형 투영
      → ④-c. Residual Connection (잔차 연결)
      → ④-d. Layer Normalization
      → ④-e. Feed-Forward Network (FFN)
          → Linear → 활성화 함수 (GELU/SwiGLU) → Linear
      → ④-f. Residual Connection (잔차 연결)
  → ⑤ 최종 Layer Normalization
  → ⑥ 출력 선형 변환 (LM Head)
  → ⑦ Softmax → 확률 분포
  → ⑧ 샘플링 / 디코딩 (Sampling)
  → 출력 토큰

[학습 시 추가]
  → ⑨ 손실 함수 (Cross-Entropy Loss)
  → ⑩ 역전파 (Backpropagation)
  → ⑪ 옵티마이저 (Adam/AdamW)
  → ⑫ 학습률 스케줄링 (LR Scheduling)

[후처리/미세조정]
  → ⑬ RLHF / DPO
  → ⑭ LoRA / 양자화 (Quantization)
```

---

## ① 토큰화 (Tokenization)

텍스트를 토큰(정수 ID) 시퀀스로 변환. BPE(Byte Pair Encoding) 등의 알고리즘 사용.

### 적용 수학

| 수학 개념 | 공식/설명 |
|-----------|----------|
| **집합론** (Set Theory) | 어휘집 V = {t₁, t₂, ..., tₙ}은 유한 집합. 부분 문자열 집합 관리 |
| **빈도/확률** (Frequency) | BPE: 가장 빈도 높은 바이트 쌍을 반복 병합. `freq(a,b) = count(ab) / total` |
| **조합론** (Combinatorics) | 어휘 크기 V, 시퀀스 길이 T → 가능한 시퀀스 수 = Vᵀ |
| **정보이론 — 부호화** (Coding Theory) | 최적 토큰 길이 ≈ `-log₂ P(token)` (Shannon 부호화) |
| **탐욕 알고리즘** (Greedy Algorithm) | BPE 병합 순서 결정. 매 단계 최대 빈도 쌍 선택 |

---

## ② 토큰 임베딩 (Token Embedding)

정수 토큰 ID → 고차원 실수 벡터. 임베딩 행렬에서 해당 행을 룩업.

### 적용 수학

| 수학 개념 | 공식/설명 |
|-----------|----------|
| **벡터** (Vector) | 각 토큰 → d차원 벡터. GPT-3: d=12,288 |
| **벡터 공간** (Vector Space) | 임베딩 공간에서 의미적 유사 단어가 가까이 위치. king - man + woman ≈ queen |
| **행렬** (Matrix) | 임베딩 행렬 E ∈ ℝ^(V×d). 룩업: `e = E[token_id]` |
| **코사인 유사도** (Cosine Similarity) | 임베딩 간 유사도: `cos(θ) = (a · b) / (‖a‖ × ‖b‖)` |
| **내적** (Dot Product) | 벡터 간 유사도의 기본 연산: `a · b = Σ aᵢbᵢ` |

---

## ③ 위치 인코딩 (Positional Encoding)

토큰의 순서 정보를 벡터에 주입. Sinusoidal PE 또는 RoPE 사용.

### 적용 수학

| 수학 개념 | 공식/설명 |
|-----------|----------|
| **삼각함수** (Trigonometric Functions) | Sinusoidal PE: `PE(pos, 2i) = sin(pos / 10000^(2i/d))`, `PE(pos, 2i+1) = cos(pos / 10000^(2i/d))` |
| **주기 함수** (Periodic Functions) | sin/cos의 주기성으로 상대적 위치 관계 표현. 주기 = `2π × 10000^(2i/d)` |
| **복소수** (Complex Numbers) | RoPE: 위치를 복소수 평면의 회전으로 표현. `e^(iθ) = cosθ + i·sinθ` (오일러 공식) |
| **회전 행렬** (Rotation Matrix) | RoPE: 2차원 회전 행렬 `R(θ) = [[cosθ, -sinθ], [sinθ, cosθ]]`을 벡터 쌍마다 적용 |
| **벡터 덧셈** (Vector Addition) | Sinusoidal PE: `x' = x + PE(pos)` (임베딩 + 위치 벡터) |
| **지수 함수** (Exponential) | 주파수 스케일: `10000^(2i/d)` — 다양한 스케일의 위치 정보 포착 |

---

## ④-a. Layer Normalization (Pre-Norm)

각 서브레이어 입력의 평균을 0, 분산을 1로 정규화. 학습 안정성 확보.

### 적용 수학

| 수학 개념 | 공식/설명 |
|-----------|----------|
| **평균** (Mean) | `μ = (1/d) Σᵢ xᵢ` |
| **분산** (Variance) | `σ² = (1/d) Σᵢ (xᵢ - μ)²` |
| **표준편차** (Standard Deviation) | `σ = √(σ²)` |
| **정규화** (Normalization) | `LayerNorm(x) = γ × (x - μ) / √(σ² + ε) + β` |
| **노름** (Norm) | RMSNorm (LLaMA): `RMSNorm(x) = x / √((1/d)Σxᵢ²) × γ` — L2 노름 기반 |
| **스칼라 곱** (Scalar Multiplication) | 학습 가능한 스케일 γ와 시프트 β — 원소별 곱/덧셈 |

---

## ④-b. Multi-Head Self-Attention

입력 시퀀스의 모든 토큰 쌍 간 관련성을 계산하여 문맥을 반영.

### Q, K, V 선형 투영 (Linear Projection)

| 수학 개념 | 공식/설명 |
|-----------|----------|
| **선형 변환** (Linear Transformation) | `Q = XWq`, `K = XWk`, `V = XWv` (X: 입력, W: 가중치 행렬) |
| **행렬 곱셈** (Matrix Multiplication) | X ∈ ℝ^(n×d) × W ∈ ℝ^(d×dₖ) = 출력 ∈ ℝ^(n×dₖ) |
| **텐서 분할** (Tensor Reshape) | Multi-Head: (n, d) → (n, h, dₖ) 으로 h개 헤드로 분할. dₖ = d/h |

### Scaled Dot-Product Attention

| 수학 개념 | 공식/설명 |
|-----------|----------|
| **행렬 곱셈** (Matrix Multiplication) | `QKᵀ` — 모든 쿼리-키 쌍의 유사도를 한번에 계산 |
| **전치 행렬** (Transpose) | K를 전치하여 `(Aᵀ)ᵢⱼ = Aⱼᵢ` |
| **내적** (Dot Product) | 각 Q, K 벡터 쌍의 내적 = 유사도 점수 |
| **스케일링** (Scaling) | `QKᵀ / √dₖ` — 내적 값의 분산이 dₖ에 비례하므로 √dₖ로 나눔 |
| **분산의 성질** (Variance Property) | `Var(q·k) = dₖ` (각 요소가 독립이고 분산 1일 때) → √dₖ로 정규화 |
| **마스킹** (Masking) | Causal mask: 미래 토큰에 -∞ 적용 → softmax 후 0이 됨 |
| **Softmax** | `softmax(zᵢ) = eᶻⁱ / Σⱼ eᶻʲ` — 점수를 확률 분포로 변환 |
| **지수 함수** (Exponential) | softmax 내부의 eᶻ 계산 |
| **확률 분포** (Probability Distribution) | Attention weight: 각 토큰에 대한 가중치 합 = 1 |
| **가중 평균** (Weighted Average) | `Attention 출력 = Σ αᵢVᵢ` (αᵢ: attention weight) |
| **수치 안정성** (Numerical Stability) | 안정 softmax: `softmax(zᵢ) = e^(zᵢ - max(z)) / Σⱼ e^(zⱼ - max(z))` |

### 핵심 공식

```
Attention(Q, K, V) = softmax(QKᵀ / √dₖ) · V
MultiHead(X) = Concat(head₁, ..., headₕ) · Wₒ
  where headᵢ = Attention(XWqᵢ, XWkᵢ, XWvᵢ)
```

---

## ④-c / ④-f. Residual Connection (잔차 연결)

서브레이어의 출력에 입력을 더함. 그래디언트 소실 방지.

### 적용 수학

| 수학 개념 | 공식/설명 |
|-----------|----------|
| **벡터 덧셈** (Vector Addition) | `output = x + SubLayer(x)` |
| **항등 함수** (Identity Function) | 잔차 경로 = 항등 사상. 그래디언트가 최소 1의 크기로 전파 |
| **편미분** (Partial Derivative) | `∂output/∂x = 1 + ∂SubLayer(x)/∂x` — 그래디언트가 최소 1 보장 |

---

## ④-e. Feed-Forward Network (FFN)

토큰별 독립적인 비선형 변환. 위치별(position-wise) 적용.

### 적용 수학

| 수학 개념 | 공식/설명 |
|-----------|----------|
| **선형 변환** (Linear Transformation) | `Linear₁: h = xW₁ + b₁` (d → 4d 확장), `Linear₂: y = h'W₂ + b₂` (4d → d 축소) |
| **행렬 곱셈** (Matrix Multiplication) | W₁ ∈ ℝ^(d×4d), W₂ ∈ ℝ^(4d×d) |
| **GELU 활성화 함수** | `GELU(x) = x × Φ(x) = x × ½[1 + erf(x/√2)]` |
| **정규 분포 CDF** (Gaussian CDF) | Φ(x) = 가우시안 누적분포함수. GELU의 핵심 |
| **오차 함수** (Error Function) | `erf(x) = (2/√π) ∫₀ˣ e^(-t²) dt` |
| **SwiGLU** (LLaMA 등) | `SwiGLU(x) = (xW₁ ⊙ Swish(xWg)) W₂`, Swish: `x × σ(βx)` |
| **시그모이드** (Sigmoid) | `σ(x) = 1 / (1 + e⁻ˣ)` — SwiGLU의 게이트 함수 |
| **아다마르 곱** (Hadamard Product) | `⊙` — 원소별 곱셈. GLU 계열에서 게이팅에 사용 |

---

## ⑤ 최종 Layer Normalization

마지막 Transformer Block 출력에 대한 정규화. (④-a와 동일한 수학)

---

## ⑥ 출력 선형 변환 (LM Head)

hidden state → 어휘 크기 차원의 로짓(logits)으로 변환.

### 적용 수학

| 수학 개념 | 공식/설명 |
|-----------|----------|
| **선형 변환** (Linear Transformation) | `logits = hWₑᵀ` (h ∈ ℝ^d → logits ∈ ℝ^V) |
| **전치 행렬** (Transpose) | Weight Tying: 임베딩 행렬 E를 전치하여 재사용. Wₑᵀ = Eᵀ |
| **행렬 곱셈** (Matrix Multiplication) | h ∈ ℝ^(1×d) × Eᵀ ∈ ℝ^(d×V) = logits ∈ ℝ^(1×V) |
| **내적** (Dot Product) | 각 로짓 = hidden state와 해당 토큰 임베딩의 내적 (유사도) |

---

## ⑦ Softmax → 확률 분포

로짓을 확률 분포로 변환.

### 적용 수학

| 수학 개념 | 공식/설명 |
|-----------|----------|
| **Softmax** | `P(xᵢ) = e^(zᵢ) / Σⱼ e^(zⱼ)` |
| **지수 함수** (Exponential) | 모든 로짓을 양수로 변환 |
| **정규화** (Normalization) | 합이 1이 되도록 나눔 → 확률 분포 |
| **수치 안정성** (Numerical Stability) | `max(z)`를 빼서 오버플로 방지 |
| **조건부 확률** (Conditional Probability) | 출력 = `P(xₜ | x₁, ..., xₜ₋₁)` — 이전 토큰들이 주어졌을 때 다음 토큰의 확률 |

---

## ⑧ 샘플링 / 디코딩 (Sampling)

확률 분포에서 다음 토큰을 선택.

### 적용 수학

| 수학 개념 | 공식/설명 |
|-----------|----------|
| **Temperature Scaling** | `P(xᵢ) = e^(zᵢ/T) / Σⱼ e^(zⱼ/T)` — T↓: 결정적, T↑: 무작위 |
| **누적 분포 함수** (CDF) | Top-p (Nucleus): 누적 확률이 p 이하인 토큰만 선택 |
| **순서 통계량** (Order Statistics) | Top-k: 확률 상위 k개 토큰만 후보로 선정 |
| **결합 확률** (Joint Probability) | 전체 시퀀스 확률: `P(x₁,...,xₙ) = ∏ P(xₜ | x<ₜ)` |
| **로그 확률** (Log Probability) | Beam Search: `score = Σ log P(xₜ)` — 곱셈을 덧셈으로 변환 |
| **Argmax** | Greedy Decoding: `xₜ = argmax P(xᵢ | x<ₜ)` — 최고 확률 토큰 선택 |
| **반복 페널티** (Repetition Penalty) | 이미 생성된 토큰의 로짓을 나누거나 빼서 반복 억제 |

---

## ⑨ 손실 함수 (Cross-Entropy Loss) — 학습 시

모델 예측과 정답 간의 차이를 수치화.

### 적용 수학

| 수학 개념 | 공식/설명 |
|-----------|----------|
| **교차 엔트로피** (Cross-Entropy) | `L = -(1/T) Σₜ log P(x*ₜ | x<ₜ)` (x*: 정답 토큰) |
| **로그 함수** (Logarithm) | 확률의 로그 → 곱을 합으로 변환, 수치 안정성 |
| **조건부 확률** (Conditional Probability) | `P(x*ₜ | x₁,...,xₜ₋₁; θ)` — 모델 파라미터 θ로 계산 |
| **최대 우도 추정** (MLE) | Cross-Entropy 최소화 = 로그 우도 최대화와 동치 |
| **KL 발산** (KL Divergence) | `H(p,q) = H(p) + D_KL(p‖q)` — CE = 엔트로피 + KL 발산 |
| **엔트로피** (Entropy) | `H(p) = -Σ p(x) log p(x)` — 불확실성의 하한 |
| **퍼플렉시티** (Perplexity) | `PPL = e^L` — 모델 성능 지표. 낮을수록 좋음 |

---

## ⑩ 역전파 (Backpropagation) — 학습 시

손실 함수의 그래디언트를 모든 파라미터에 전파.

### 적용 수학

| 수학 개념 | 공식/설명 |
|-----------|----------|
| **연쇄 법칙** (Chain Rule) | `∂L/∂w = (∂L/∂y)(∂y/∂h)(∂h/∂w)` — 레이어별 미분의 곱 |
| **편미분** (Partial Derivative) | 손실을 각 가중치에 대해 편미분 |
| **그래디언트** (Gradient) | `∇L = (∂L/∂w₁, ∂L/∂w₂, ..., ∂L/∂wₙ)` — 모든 파라미터의 편미분 벡터 |
| **야코비안 행렬** (Jacobian Matrix) | 벡터 함수의 미분. 레이어 간 그래디언트 변환 |
| **연산 그래프** (Computational Graph) | 순전파의 역순으로 그래디언트 전파. 그래프 이론 기반 |
| **곱의 미분법** (Product Rule) | Attention, Residual 등 곱/합 연산의 미분 |
| **그래디언트 클리핑** (Gradient Clipping) | `g' = g × (max_norm / ‖g‖)` if `‖g‖ > max_norm` — 폭발 방지 |
| **노름** (Norm) | 그래디언트 크기 측정: `‖g‖₂ = √(Σ gᵢ²)` |

---

## ⑪ 옵티마이저 (Adam/AdamW) — 학습 시

그래디언트를 이용해 파라미터를 실제로 업데이트.

### 적용 수학

| 수학 개념 | 공식/설명 |
|-----------|----------|
| **경사 하강법** (Gradient Descent) | `θ ← θ - η∇L` (기본 원리) |
| **지수 이동 평균** (Exponential Moving Average) | `mₜ = β₁mₜ₋₁ + (1-β₁)gₜ` (1차 모멘트 — 그래디언트 방향) |
| **2차 모멘트** (Second Moment) | `vₜ = β₂vₜ₋₁ + (1-β₂)gₜ²` (그래디언트 크기의 이동 평균) |
| **편향 보정** (Bias Correction) | `m̂ₜ = mₜ/(1-β₁ᵗ)`, `v̂ₜ = vₜ/(1-β₂ᵗ)` — 초기 편향 제거 |
| **적응적 학습률** (Adaptive LR) | `θ ← θ - η × m̂ₜ / (√v̂ₜ + ε)` — 파라미터별 자동 학습률 조절 |
| **가중치 감쇠** (Weight Decay) | AdamW: `θ ← θ - η(m̂ₜ/(√v̂ₜ + ε) + λθ)` — L2 정규화를 분리 적용 |
| **제곱근** (Square Root) | `√v̂ₜ` — 2차 모멘트의 제곱근으로 스케일링 |

---

## ⑫ 학습률 스케줄링 (LR Scheduling) — 학습 시

학습 진행에 따라 학습률을 동적으로 조절.

### 적용 수학

| 수학 개념 | 공식/설명 |
|-----------|----------|
| **삼각함수** (Trigonometric Functions) | Cosine Decay: `ηₜ = η_min + ½(η_max - η_min)(1 + cos(πt/T))` |
| **선형 함수** (Linear Function) | Warmup: `ηₜ = η_max × (t / t_warmup)` — 선형 증가 |
| **지수 감쇠** (Exponential Decay) | `ηₜ = η₀ × γᵗ` (매 스텝 γ 비율로 감소) |
| **구간 함수** (Piecewise Function) | Warmup + Decay를 구간별로 결합 |

---

## ⑬ RLHF / DPO — 후처리

인간 피드백을 반영한 미세조정.

### 적용 수학

| 수학 개념 | 공식/설명 |
|-----------|----------|
| **KL 발산** (KL Divergence) | `D_KL(π_θ ‖ π_ref)` — 미세조정 모델이 원래 모델에서 너무 벗어나지 않도록 제약 |
| **기대값** (Expected Value) | `J(θ) = E[R(x,y)]` — 보상의 기대값 최대화 |
| **베이즈 정리** (Bayes' Theorem) | 보상 모델의 이론적 기반. 선호 데이터로부터 사후 확률 추정 |
| **시그모이드** (Sigmoid) | Bradley-Terry 모델: `P(y₁ ≻ y₂) = σ(R(y₁) - R(y₂))` |
| **로그 확률** (Log Probability) | DPO: `L = -log σ(β(log π_θ(y_w)/π_ref(y_w) - log π_θ(y_l)/π_ref(y_l)))` |
| **제약 최적화** (Constrained Optimization) | PPO: KL 제약 하에서 보상 최대화 |
| **클리핑** (Clipping) | PPO: `min(rₜ(θ)Aₜ, clip(rₜ(θ), 1-ε, 1+ε)Aₜ)` — 급격한 업데이트 방지 |

---

## ⑭ LoRA / 양자화 (Quantization) — 효율화

모델 경량화 및 효율적 미세조정.

### 적용 수학

| 수학 개념 | 공식/설명 |
|-----------|----------|
| **저랭크 근사** (Low-Rank Approximation) | LoRA: `W' = W + BA` (B ∈ ℝ^(d×r), A ∈ ℝ^(r×d), r << d) |
| **특이값 분해** (SVD) | `W = UΣVᵀ` — 저랭크 근사의 이론적 기반 |
| **행렬의 랭크** (Matrix Rank) | rank(BA) = r << d → 파라미터 수: 2dr << d² |
| **양자화** (Quantization) | `q = round(w × s) + z` (s: 스케일, z: 영점). FP16 → INT8/INT4 |
| **반올림 오차** (Rounding Error) | 양자화 오차: `ε = w - (q-z)/s` |
| **부동소수점** (Floating Point) | FP32 (32bit), FP16 (16bit), BF16 (brain float), INT8, INT4 표현 범위와 정밀도 |
| **구간 분할** (Binning) | GPTQ/AWQ: 가중치를 구간별로 그룹화하여 양자화 오차 최소화 |

---

## 수학 개념 → 교육과정 매핑 요약

### 고등학교에서 배우는 것

| 수학 개념 | 과목 | 사용되는 단계 |
|-----------|------|-------------|
| 벡터, 내적 | 기하 | ②③④-b⑥ |
| 삼각함수 (sin, cos) | 미적분Ⅰ | ③⑫ |
| 지수/로그 함수 | 대수 | ④-b④-e⑦⑨ |
| 복소수 | 공통수학1 | ③ (RoPE) |
| 조건부 확률 | 확률과 통계 | ⑦⑨ |
| 기대값, 분산 | 확률과 통계 | ④-a⑬ |
| 순열, 조합 | 공통수학1 | ①⑧ |
| 연쇄 법칙 (미분) | 미적분Ⅱ | ⑩ |
| 시그모이드 | 미적분Ⅱ (지수함수 미분) | ④-e⑬ |

### 대학교에서 배우는 것

| 수학 개념 | 과목 | 사용되는 단계 |
|-----------|------|-------------|
| 행렬 곱셈, 전치 | 선형대수학 | ②④-b④-e⑥ |
| 선형 변환 | 선형대수학 | ④-b④-e⑥ |
| SVD, 고유값 분해 | 선형대수학 | ⑭ |
| 편미분, 그래디언트 | 다변수 미적분학 | ⑩ |
| MLE | 수리통계학 | ⑨ |
| 정규 분포 | 확률과 통계 | ④-e (GELU) |
| 교차 엔트로피, KL 발산 | 정보이론 | ⑨⑬ |
| 경사 하강법, Adam | 최적화이론 | ⑪ |
| 부동소수점, 수치 안정성 | 수치해석 | ④-b⑦⑭ |
