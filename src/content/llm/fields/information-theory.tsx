"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox } from "@/components/content/shared";

export default function InformationTheory() {
  return (
    <div className="space-y-8">
      <CalcBox title="엔트로피 (Entropy)">
        <p>확률 분포의 불확실성을 측정합니다. 생성 텍스트의 다양성을 평가하는 데 사용됩니다.</p>
        <BlockMath math="H(X) = -\sum P(x) \log P(x)" />
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 정보이론</p>
      </CalcBox>

      <CalcBox title="교차 엔트로피 (Cross-Entropy)">
        <p><strong>LLM의 주요 손실 함수</strong>입니다. 모델 예측 분포와 실제 분포 간의 차이를 측정합니다.</p>
        <BlockMath math="H(p, q) = -\sum p(x) \log q(x)" />
        <div className="mt-3 rounded-lg bg-accent-light p-4 text-sm">
          Cross-Entropy = 엔트로피 + KL 발산: <InlineMath math="H(p,q) = H(p) + D_{KL}(p \| q)" />
        </div>
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 정보이론</p>
      </CalcBox>

      <CalcBox title="KL 발산 (KL Divergence)">
        <p>RLHF에서 미세조정 모델이 원래 모델에서 벗어나지 않도록 KL 페널티를 적용합니다. 지식 증류에도 사용됩니다.</p>
        <BlockMath math="D_{KL}(P \| Q) = \sum P(x) \log \frac{P(x)}{Q(x)}" />
        <div className="mt-3 rounded-lg bg-accent-light p-4 text-sm">
          <strong>비대칭:</strong> <InlineMath math="D_{KL}(P \| Q) \neq D_{KL}(Q \| P)" />
        </div>
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 정보이론</p>
      </CalcBox>

      <CalcBox title="퍼플렉시티 (Perplexity)">
        <p>LLM 성능의 핵심 평가 지표입니다. 모델이 다음 토큰을 얼마나 잘 예측하는지 측정합니다. 낮을수록 좋습니다.</p>
        <BlockMath math="\text{PPL} = e^H \quad \text{또는} \quad \text{PPL} = 2^H" />
        <p className="text-sm text-muted">H = cross-entropy</p>
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 정보이론/NLP</p>
      </CalcBox>

      <CalcBox title="상호 정보량 (Mutual Information)">
        <p>토큰 간 의존성을 분석합니다. 모델이 학습한 표현의 품질을 평가합니다.</p>
        <BlockMath math="I(X;Y) = H(X) - H(X|Y) = \sum P(x,y) \log \frac{P(x,y)}{P(x)P(y)}" />
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 정보이론</p>
      </CalcBox>
    </div>
  );
}
