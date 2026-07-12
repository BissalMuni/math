"use client";

import { CalcBox, SubSection, Insight, Step } from "@/components/content/shared";
import { InlineMath, BlockMath } from "@/components/math/math-formula";

/** Ⅱ. Mixture-of-Experts — 희소 라우팅과 DeepSeek-V3
 *  조사 시점: 2026-07. 출처: DeepSeek-V3 Technical Report(arXiv:2412.19437),
 *  Sebastian Raschka "The Big LLM Architecture Comparison". */
export default function MoeSparseRouting() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        2024~2025년에 공개된 대부분의 프런티어 오픈소스 LLM(DeepSeek-R1, Kimi K2, Mistral Large 3 등)은
        <span className="font-medium"> Mixture-of-Experts(MoE)</span> 구조를 쓴다. 이 노트는 MoE의 핵심 아이디어와
        DeepSeek-V3가 도입한 <span className="font-medium">보조손실 없는(auxiliary-loss-free) 로드 밸런싱</span>을 정리한다.
      </p>

      <CalcBox title="■ 왜 MoE인가 — 희소 활성화">
        <SubSection title="● 밀집(dense) vs 희소(sparse)">
          <p className="text-sm mb-2">
            일반적인 트랜스포머의 FFN은 <span className="font-medium">모든 토큰</span>이 <span className="font-medium">모든 파라미터</span>를 통과한다(밀집).
            MoE는 FFN을 여러 개의 <span className="font-medium">전문가(expert)</span>로 쪼개고, 라우터가 토큰마다 그중 <InlineMath math="k" />개만 골라 통과시킨다(희소).
          </p>
          <Insight>
            &quot;희소&quot;는 모델이 작다는 뜻이 아니다. 전체 파라미터는 거대하지만, <span className="font-medium">토큰 하나가 실제로 쓰는 파라미터는 일부뿐</span>이라는 의미다.
            그래서 <span className="font-medium">총 파라미터(용량)</span>와 <span className="font-medium">활성 파라미터(연산량)</span>가 분리된다.
          </Insight>
        </SubSection>

        <SubSection title="● DeepSeek-V3의 규모">
          <p className="text-sm">① 총 파라미터 <span className="font-medium">671B</span> — 토큰당 활성 파라미터는 <span className="font-medium">37B</span> (약 5.5%)</p>
          <p className="text-sm">② MoE 레이어마다 <span className="font-medium">공유 전문가 1개 + 라우팅 전문가 256개</span></p>
          <p className="text-sm">③ 라우팅 전문가 256개 중 토큰마다 <span className="font-medium">상위 8개</span>만 활성화</p>
          <p className="text-sm mt-2 text-muted">
            → 용량은 671B급이지만 연산 비용은 37B급. MoE가 &quot;싸게 크게&quot;를 가능케 하는 핵심.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 라우터 — 토큰을 전문가에 배정하기">
        <p className="text-sm mb-3">
          라우터(게이트)는 작은 선형층이다. 토큰 표현 <InlineMath math="x" />와 각 전문가 <InlineMath math="i" />의 친화도(affinity)를 계산한다.
        </p>
        <BlockMath math="s_i = \mathrm{Sigmoid}\!\left(x^\top e_i\right)" />
        <p className="text-sm mb-2">
          친화도 상위 <InlineMath math="k" />개 전문가만 선택하고, 그 게이트 값으로 가중합해 출력을 만든다.
        </p>
        <BlockMath math="y = \sum_{i \in \text{Top-}k} g_i \, \mathrm{FFN}_i(x) \; + \; \mathrm{FFN}_{\text{shared}}(x)" />
        <p className="text-sm text-muted">
          공유 전문가는 모든 토큰이 항상 통과해 공통 패턴을 담고, 라우팅 전문가는 토큰별로 동적으로 전문화된다.
        </p>
      </CalcBox>

      <CalcBox title="■ 핵심 문제 — 로드 밸런싱(load balancing)">
        <SubSection title="● 무엇이 문제인가">
          <p className="text-sm mb-2">
            학습을 방치하면 라우터가 <span className="font-medium">소수의 인기 전문가에만 토큰을 몰아준다</span>(routing collapse).
            나머지 전문가는 거의 학습되지 않아 용량이 낭비되고, 병렬 처리 시 특정 GPU만 과부하가 된다.
          </p>
        </SubSection>

        <SubSection title="● 전통적 해법과 그 부작용">
          <p className="text-sm">
            기존 MoE는 <span className="font-medium">보조손실(auxiliary loss)</span>을 더해 전문가 사용량을 균등하게 강제했다.
            문제는 이 균등화 압력이 <span className="font-medium">본래의 언어모델링 목표와 충돌</span>해 품질을 떨어뜨린다는 점이다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ DeepSeek-V3의 혁신 — 보조손실 없는 밸런싱">
        <p className="text-sm mb-3">
          DeepSeek-V3는 손실 함수를 건드리지 않고, 각 전문가에 <span className="font-medium">편향항(bias)</span> <InlineMath math="b_i" />를
          더해 <span className="font-medium">선택(routing)에만</span> 개입한다.
        </p>
        <BlockMath math="\text{Top-}k \text{ 선택 기준: } \; s_i + b_i \qquad(\text{가중치는 여전히 } s_i \text{ 사용})" />

        <Step n={1} label="편향으로 선택만 조정" />
        <p className="text-sm mb-2 ml-10">
          전문가를 고를 때는 <InlineMath math="s_i + b_i" />로 순위를 매긴다. 하지만 실제 출력 가중치 <InlineMath math="g_i" />는
          편향 없는 원래 친화도 <InlineMath math="s_i" />에서 나온다. 즉 편향은 &quot;누구를 뽑느냐&quot;만 바꾸고 &quot;얼마나 반영하느냐&quot;는 건드리지 않는다.
        </p>

        <Step n={2} label="스텝마다 편향을 되먹임" />
        <p className="text-sm mb-2 ml-10">
          매 학습 스텝 후, <span className="font-medium">과부하 전문가는 </span><InlineMath math="b_i" /><span className="font-medium">를 내리고</span>,
          <span className="font-medium"> 저부하 전문가는 올린다</span>(폭은 하이퍼파라미터 <InlineMath math="\gamma" />로 조절).
          다음 스텝에서 몰림이 자연히 완화된다.
        </p>

        <Insight>
          손실 항이 아니라 <span className="font-medium">라우팅 편향의 피드백 제어</span>로 균형을 잡기 때문에,
          본래 학습 신호를 오염시키지 않고 로드 밸런싱을 달성한다. 논문의 ablation에서 보조손실 방식보다 일관되게 나은 성능을 보였다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ 정리 — 한 줄 요약">
        <p className="text-sm">
          MoE는 <span className="font-medium">총 용량과 연산량을 분리</span>해 &quot;싸게 크게&quot;를 만든다.
          그 대가인 <span className="font-medium">로드 밸런싱</span> 문제를, DeepSeek-V3는 손실이 아닌
          <span className="font-medium"> 라우팅 편향의 되먹임 제어</span>로 품질 손해 없이 해결했다.
        </p>
        <p className="text-xs text-muted mt-3">
          출처: DeepSeek-V3 Technical Report (arXiv:2412.19437) · Sebastian Raschka, &quot;The Big LLM Architecture Comparison&quot; (2025).
        </p>
      </CalcBox>
    </div>
  );
}
