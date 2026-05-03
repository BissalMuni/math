"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox } from "@/components/content/shared";

export default function RLHF() {
  return (
    <div className="space-y-8">
      <p className="text-muted">인간 피드백으로 학습된 보상 모델로 강화 학습을 수행합니다. ChatGPT 핵심 기술입니다.</p>

      <CalcBox title="보상 모델 (Reward Model)">
        <p>인간이 선호하는 응답을 학습합니다. Bradley-Terry 모델 기반:</p>
        <BlockMath math="P(y_1 \succ y_2) = \frac{e^{r(x,y_1)}}{e^{r(x,y_1)} + e^{r(x,y_2)}}" />
        <p className="mt-2">최대 우도 학습:</p>
        <BlockMath math="\mathcal{L}_{\text{RM}} = -E_{(x,y_w,y_l)}\left[\log \sigma\left(r(x,y_w) - r(x,y_l)\right)\right]" />
      </CalcBox>

      <CalcBox title="PPO (Proximal Policy Optimization)">
        <p>보상을 최대화하되 KL 발산으로 원래 모델에서 벗어나지 않도록 제약합니다:</p>
        <BlockMath math="\mathcal{L}_{\text{PPO}} = E\left[r_\phi(x, y) - \beta D_{KL}(P_\theta \| P_{\theta_0})\right]" />
        <p className="mt-2">Clip 기반 업데이트:</p>
        <BlockMath math="\mathcal{L}_{\text{clip}} = E\left[\min\left(\rho_t A_t,\; \text{clip}(\rho_t, 1-\epsilon, 1+\epsilon)A_t\right)\right]" />
        <p className="text-sm text-muted"><InlineMath math="\rho_t = \frac{\pi_\theta(a_t|s_t)}{\pi_{\theta_\text{old}}(a_t|s_t)}" /></p>
      </CalcBox>

      <CalcBox title="DPO (Direct Preference Optimization)">
        <p>보상 모델 없이 직접 선호도를 학습합니다 (PPO 대체):</p>
        <BlockMath math="\mathcal{L}_{\text{DPO}} = -E\left[\log \sigma\left(\beta \log \frac{\pi_\theta(y_w|x)}{\pi_\text{ref}(y_w|x)} - \beta \log \frac{\pi_\theta(y_l|x)}{\pi_\text{ref}(y_l|x)}\right)\right]" />
      </CalcBox>
    </div>
  );
}
