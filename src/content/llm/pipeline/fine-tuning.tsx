"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox } from "@/components/content/shared";

export default function FineTuning() {
  return (
    <div className="space-y-8">
      <p className="text-muted">사전 학습된 모델을 특정 태스크/도메인에 맞게 추가 학습합니다.</p>

      <CalcBox title="SFT (Supervised Fine-Tuning)">
        <p>명령-응답 쌍 데이터로 Cross-Entropy Loss를 최소화합니다:</p>
        <BlockMath math="\mathcal{L}_{\text{SFT}} = -\sum_{t \in \text{response}} \log P(y_t \mid x, y_{<t}; \theta)" />
        <p className="text-sm text-muted">질문 토큰의 손실은 마스킹 (응답 토큰만 학습)</p>
      </CalcBox>

      <CalcBox title="LoRA — 효율적 파인튜닝">
        <p>가중치 업데이트를 저랭크 행렬 분해로 근사합니다:</p>
        <BlockMath math="W' = W_0 + \Delta W = W_0 + BA" />
        <p className="mt-1 text-sm text-muted">B ∈ ℝ<sup>d×r</sup>, A ∈ ℝ<sup>r×d</sup>, r ≪ d</p>
        <div className="mt-3 rounded-lg bg-accent-light p-3 text-sm">
          r=8로 설정하면 파라미터 수가 원래의 ~0.01%
        </div>
      </CalcBox>

      <CalcBox title="Catastrophic Forgetting">
        <p>파인튜닝 시 사전 학습 지식이 손상되는 문제. LoRA + KL Divergence 제약으로 방지합니다:</p>
        <BlockMath math="\mathcal{L} = \mathcal{L}_{\text{SFT}} + \beta D_{KL}(P_{\theta_0} \| P_\theta)" />
      </CalcBox>
    </div>
  );
}
