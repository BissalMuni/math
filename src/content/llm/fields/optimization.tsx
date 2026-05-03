"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";

export default function Optimization() {
  return (
    <div className="space-y-8">
      <section id="gradient-descent">
        <h2 className="text-xl font-semibold mb-3">경사 하강법 (Gradient Descent)</h2>
        <p>모든 딥러닝 학습의 기본입니다. 손실 함수를 줄이는 방향으로 파라미터를 반복 업데이트합니다.</p>
        <BlockMath math="\theta_{t+1} = \theta_t - \eta \nabla L(\theta_t)" />
        <p className="text-sm text-muted">η: 학습률 (learning rate)</p>
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 최적화이론</p>
      </section>

      <section id="sgd">
        <h2 className="text-xl font-semibold mb-3">확률적 경사 하강법 (SGD)</h2>
        <p>전체 데이터 대신 미니배치로 그래디언트를 추정합니다. 계산 효율성 + 정규화 효과를 얻습니다.</p>
        <BlockMath math="\theta_{t+1} = \theta_t - \eta \nabla L_{\text{batch}}(\theta_t)" />
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 최적화이론</p>
      </section>

      <section id="adam">
        <h2 className="text-xl font-semibold mb-3">Adam 옵티마이저 (Adam/AdamW)</h2>
        <p>LLM 학습의 사실상 표준입니다. 1차/2차 모멘트의 지수 이동 평균으로 적응적 학습률을 계산합니다.</p>
        <BlockMath math="m_t = \beta_1 m_{t-1} + (1 - \beta_1) g_t" />
        <p className="text-sm text-muted text-center">1차 모멘트 (그래디언트 방향)</p>
        <BlockMath math="v_t = \beta_2 v_{t-1} + (1 - \beta_2) g_t^2" />
        <p className="text-sm text-muted text-center">2차 모멘트 (그래디언트 크기)</p>
        <BlockMath math="\theta_{t+1} = \theta_t - \eta \cdot \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon}" />
        <div className="mt-3 rounded-lg bg-accent-light p-4 text-sm">
          <strong>AdamW:</strong> Weight Decay를 분리 적용 — <InlineMath math="\theta \leftarrow \theta - \eta\left(\frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon} + \lambda\theta\right)" />
        </div>
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 최적화이론</p>
      </section>

      <section id="lr-scheduling">
        <h2 className="text-xl font-semibold mb-3">학습률 스케줄링 (Learning Rate Scheduling)</h2>
        <p>Warmup + Cosine Decay가 표준입니다. 초기에 학습률을 서서히 올리고 코사인 형태로 감소시킵니다.</p>
        <BlockMath math="\eta_t = \eta_{\min} + \frac{1}{2}(\eta_{\max} - \eta_{\min})\left(1 + \cos\frac{\pi t}{T}\right)" />
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 최적화이론</p>
      </section>

      <section id="regularization">
        <h2 className="text-xl font-semibold mb-3">정규화 (Regularization)</h2>
        <p>Weight Decay, Dropout, Label Smoothing 등으로 과적합을 방지합니다.</p>
        <BlockMath math="L_{\text{total}} = L + \lambda \sum w_i^2" />
        <p className="text-sm text-muted">L2 정규화</p>
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 통계학/기계학습</p>
      </section>
    </div>
  );
}
