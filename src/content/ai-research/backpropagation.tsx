"use client";

import { useState } from "react";
import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

type Phase = "forward1" | "forward2" | "error" | "backward1" | "backward2";

interface StepDef {
  phase: Phase;
  label: string;
  desc: string;
}

const STEPS: StepDef[] = [
  {
    phase: "forward1",
    label: "① 순전파: 입력 → 은닉층",
    desc: "입력값이 가중치를 거쳐 은닉층으로 흘러가고, 각 은닉 뉴런은 가중합을 활성화 함수에 통과시켜 출력을 만든다.",
  },
  {
    phase: "forward2",
    label: "② 순전파: 은닉층 → 출력층",
    desc: "은닉층의 출력이 다시 가중치를 거쳐 최종 출력 뉴런까지 전달된다. 여기까지는 퍼셉트론과 동일한 방향의 계산이다.",
  },
  {
    phase: "error",
    label: "③ 오차 계산",
    desc: "출력값과 정답의 차이로 오차 E를 계산한다. 문제는 다음 단계 — 이 오차를 은닉층 가중치의 책임으로 어떻게 나눌 것인가.",
  },
  {
    phase: "backward1",
    label: "④ 역전파: 출력층 → 은닉층",
    desc: "연쇄법칙(chain rule)으로 출력층 오차를, 그 오차에 기여한 정도(가중치 크기)에 비례해 은닉층 각 뉴런에 거꾸로 나눠준다.",
  },
  {
    phase: "backward2",
    label: "⑤ 역전파: 은닉층 → 입력층 방향 가중치 갱신",
    desc: "은닉층에 전달된 오차로 입력–은닉 가중치까지 갱신한다. 이제 모든 층의 가중치가 오차 방향으로 조금씩 이동한다.",
  },
];

const INPUT_NODES = [
  { x: 40, y: 70 },
  { x: 40, y: 150 },
];
const HIDDEN_NODES = [
  { x: 200, y: 40 },
  { x: 200, y: 110 },
  { x: 200, y: 180 },
];
const OUTPUT_NODE = { x: 360, y: 110 };

function edgeColor(active: boolean, colorWhenActive: string) {
  return active ? colorWhenActive : "currentColor";
}

function NetworkDiagram({ stepIndex }: { stepIndex: number }) {
  const phase = STEPS[stepIndex].phase;
  const forwardActive = phase === "forward1" || phase === "forward2";
  const backwardActive = phase === "backward1" || phase === "backward2";

  const inputHiddenActive = phase === "forward1" || phase === "backward2";
  const hiddenOutputActive = phase === "forward2" || phase === "backward1";

  const blue = "#3b82f6";
  const red = "#ef4444";

  return (
    <svg width="100%" viewBox="0 0 400 220" style={{ maxWidth: 420, margin: "0 auto", display: "block" }}>
      {/* 입력 -> 은닉 엣지 */}
      {INPUT_NODES.map((inp, i) =>
        HIDDEN_NODES.map((h, j) => (
          <line
            key={`ih-${i}-${j}`}
            x1={inp.x}
            y1={inp.y}
            x2={h.x}
            y2={h.y}
            stroke={edgeColor(inputHiddenActive, forwardActive ? blue : red)}
            strokeOpacity={inputHiddenActive ? 0.9 : 0.15}
            strokeWidth={inputHiddenActive ? 2 : 1}
          />
        ))
      )}
      {/* 은닉 -> 출력 엣지 */}
      {HIDDEN_NODES.map((h, j) => (
        <line
          key={`ho-${j}`}
          x1={h.x}
          y1={h.y}
          x2={OUTPUT_NODE.x}
          y2={OUTPUT_NODE.y}
          stroke={edgeColor(hiddenOutputActive, forwardActive ? blue : red)}
          strokeOpacity={hiddenOutputActive ? 0.9 : 0.15}
          strokeWidth={hiddenOutputActive ? 2 : 1}
        />
      ))}

      {/* 입력 노드 */}
      {INPUT_NODES.map((n, i) => (
        <circle key={`in-${i}`} cx={n.x} cy={n.y} r={12} fill="#f1f5f9" stroke="#94a3b8" strokeWidth={1.5} />
      ))}
      {/* 은닉 노드 */}
      {HIDDEN_NODES.map((n, i) => (
        <circle key={`hn-${i}`} cx={n.x} cy={n.y} r={12} fill="#f1f5f9" stroke="#94a3b8" strokeWidth={1.5} />
      ))}
      {/* 출력 노드 */}
      <circle
        cx={OUTPUT_NODE.x}
        cy={OUTPUT_NODE.y}
        r={14}
        fill={phase === "error" ? "#fecaca" : "#f1f5f9"}
        stroke={phase === "error" ? red : "#94a3b8"}
        strokeWidth={2}
      />

      {/* 라벨 */}
      <text x={40} y={20} textAnchor="middle" fontSize={11} fill="currentColor" opacity={0.6}>입력층</text>
      <text x={200} y={20} textAnchor="middle" fontSize={11} fill="currentColor" opacity={0.6}>은닉층</text>
      <text x={360} y={20} textAnchor="middle" fontSize={11} fill="currentColor" opacity={0.6}>출력층</text>

      {phase === "error" && (
        <text x={OUTPUT_NODE.x} y={OUTPUT_NODE.y + 32} textAnchor="middle" fontSize={11} fill={red}>
          E = ½(y − d)²
        </text>
      )}
      {backwardActive && (
        <text x={200} y={205} textAnchor="middle" fontSize={10} fill={red}>
          ← 오차가 거꾸로 전파되는 방향
        </text>
      )}
      {forwardActive && (
        <text x={200} y={205} textAnchor="middle" fontSize={10} fill={blue}>
          입력 → 출력 방향으로 계산 진행 →
        </text>
      )}
    </svg>
  );
}

export default function AirBackpropagation() {
  const [stepIndex, setStepIndex] = useState(0);
  const step = STEPS[stepIndex];

  return (
    <div className="space-y-8">
      <p className="text-muted">
        &ldquo;AI 발전 지도&rdquo; 시리즈 Ⅳ — 퍼셉트론이 풀지 못했던 &ldquo;다층
        신경망을 어떻게 학습시키는가&rdquo;라는 질문에 대한 답. 1986년 럼멜하트,
        힌턴, 윌리엄스는 연쇄법칙으로 오차를 출력층에서 입력층 방향으로 거꾸로
        전파시키는 역전파(back-propagation) 절차를 제시했다.
      </p>

      <CalcBox title="■ 한눈에">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="text-xs text-muted mb-1">출처</div>
            <div className="font-medium">
              D. E. Rumelhart, G. E. Hinton, R. J. Williams (1986),
              &ldquo;Learning representations by back-propagating
              errors,&rdquo; <em>Nature</em>, 323, 533–536.
            </div>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="text-xs text-muted mb-1">한 줄 기여</div>
            <div className="font-medium">
              연쇄법칙으로 출력층 오차를 은닉층까지 거꾸로 전달해, 다층
              신경망의 모든 가중치를 동시에 경사하강법으로 학습시키는 절차를
              제시.
            </div>
          </div>
        </div>
      </CalcBox>

      <CalcBox title="■ 핵심 아이디어 — 원문·번역·해설">
        <SubSection title="● 문제의식: 은닉층은 스스로 무엇을 배워야 하는지 모른다">
          <blockquote className="border-l-4 border-sidebar-border pl-4 italic text-sm text-muted my-3">
            &ldquo;We describe a new learning procedure, back-propagation,
            for networks of neurone-like units. The procedure repeatedly
            adjusts the weights of the connections in the network so as to
            minimize a measure of the difference between the actual output
            vector of the net and the desired output vector. As a result of
            the weight adjustments, internal &lsquo;hidden&rsquo; units
            which are not part of the input or output come to represent
            important features of the task domain, and the regularities in
            the task are captured by the interactions of these units. The
            ability to create useful new features distinguishes
            back-propagation from earlier, simpler methods such as the
            perceptron-convergence procedure.&rdquo;
          </blockquote>
          <p className="text-sm text-muted mb-3">
            <strong>번역</strong> — &ldquo;우리는 뉴런과 유사한 단위들로
            이루어진 네트워크를 위한 새로운 학습 절차, 역전파를 기술한다. 이
            절차는 네트워크의 실제 출력 벡터와 원하는 출력 벡터 사이의 차이를
            나타내는 척도를 최소화하도록, 연결의 가중치를 반복적으로
            조정한다. 이 가중치 조정의 결과로, 입력이나 출력의 일부가 아닌
            내부의 &lsquo;은닉&rsquo; 단위들이 과제 영역의 중요한 특징을
            표현하게 되고, 과제의 규칙성은 이 단위들의 상호작용으로
            포착된다. 유용한 새 특징을 스스로 만들어내는 이 능력이,
            역전파를 퍼셉트론 수렴 절차 같은 이전의 더 단순한 방법들과
            구별짓는다.&rdquo;
          </p>
          <p>
            퍼셉트론의 학습 규칙(오차 = 정답 − 출력)은 정답을 알고 있는{" "}
            <strong>출력층에서만</strong> 성립했다. 은닉층에는 &ldquo;정답
            레이블&rdquo;이 없다 — 은닉 뉴런이 무엇을 출력해야 옳은지 아무도
            알려주지 않는다. 이 논문의 핵심은 그 &ldquo;알 수 없는 정답&rdquo;
            문제를, 출력층 오차를 가중치 크기에 비례해 거꾸로 나눠주는
            방식으로 우회한 것이다.
          </p>
        </SubSection>

        <SubSection title="● 연쇄법칙: 오차를 거꾸로 나눠주는 수학">
          <p className="mb-3">
            전체 오차는 출력 <InlineMath math="y_j" />와 정답{" "}
            <InlineMath math="d_j" />의 제곱 차이 합으로 정의한다.
          </p>
          <BlockMath math="E = \frac{1}{2}\sum_{j \in \text{output}} (y_j - d_j)^2" />
          <p className="mb-3">
            출력 뉴런의 오차 기여도는 간단하다 —{" "}
            <InlineMath math="\partial E / \partial y_j = y_j - d_j" />.
            핵심은 <strong>은닉 뉴런</strong> h의 오차 기여도인데, 연쇄법칙을
            적용하면 h가 연결된 모든 상위층 뉴런의 오차를, 그 사이 가중치{" "}
            <InlineMath math="w_{hk}" />로 가중합해 거꾸로 전달하면 된다는
            것이 도출된다.
          </p>
          <BlockMath math="\frac{\partial E}{\partial y_h} = \sum_{k \in \text{다음 층}} \frac{\partial E}{\partial x_k}\, w_{hk}, \qquad \frac{\partial E}{\partial x_j} = \frac{\partial E}{\partial y_j}\, f'(x_j)" />
          <p>
            여기서 <InlineMath math="x_j" />는 뉴런 j의 가중합(활성화 함수
            통과 전 값), <InlineMath math="f" />는 활성화 함수다. 이 두 식을
            출력층에서 입력층 방향으로 반복 적용하면, <strong>층이 몇 개든
            상관없이</strong> 모든 은닉 뉴런의 오차 기여도를 계산할 수 있다 —
            이것이 &ldquo;역전파&rdquo;라는 이름의 유래다.
          </p>
        </SubSection>

        <SubSection title="● 경사하강 + 모멘텀: 오차가 줄어드는 방향으로">
          <p className="mb-3">
            각 가중치는 자신이 오차에 기여한 만큼(그래디언트)에 비례해,
            오차가 줄어드는 방향으로 이동한다.
          </p>
          <BlockMath math="\Delta w_{ji}(t) = -\varepsilon\,\frac{\partial E}{\partial w_{ji}} + \alpha\,\Delta w_{ji}(t-1)" />
          <p>
            <InlineMath math="\varepsilon" />는 학습률, 두 번째 항은 논문이
            함께 제안한 <strong>모멘텀(momentum)</strong> 항이다 — 직전
            갱신 방향을 일부 유지해 진동을 줄이고 수렴을 앞당긴다. 퍼셉트론의
            &ldquo;틀린 만큼만 고친다&rdquo;는 규칙이, 여기서는 &ldquo;내
            잘못이 몇 층 위 오차에 얼마나 기여했는지 계산해서 고친다&rdquo;로
            일반화된 셈이다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 오차가 거꾸로 흐르는 과정 — 단계별로 보기">
        <p className="mb-4">
          아래 3층 네트워크(입력 2 · 은닉 3 · 출력 1)에서, 순전파(파란색,
          입력→출력)와 역전파(빨간색, 출력→입력)가 정반대 방향으로 진행되는
          것을 단계별로 확인해 보자.
        </p>

        <NetworkDiagram stepIndex={stepIndex} />

        <p className="text-center text-sm font-medium mt-3">{step.label}</p>
        <p className="text-center text-sm text-muted mt-1 mb-4">{step.desc}</p>

        <div className="flex justify-center gap-2">
          <button
            onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
            disabled={stepIndex === 0}
            className="px-3 py-1.5 rounded-md text-sm border border-sidebar-border disabled:opacity-30 hover:bg-sidebar-bg transition-colors"
          >
            이전
          </button>
          <button
            onClick={() => setStepIndex((i) => Math.min(STEPS.length - 1, i + 1))}
            disabled={stepIndex === STEPS.length - 1}
            className="px-3 py-1.5 rounded-md text-sm border border-sidebar-border disabled:opacity-30 hover:bg-sidebar-bg transition-colors"
          >
            다음
          </button>
          <button
            onClick={() => setStepIndex(0)}
            className="px-3 py-1.5 rounded-md text-sm border border-sidebar-border hover:bg-sidebar-bg transition-colors"
          >
            처음으로
          </button>
        </div>
      </CalcBox>

      <CalcBox title="■ 의미와 한계">
        <SubSection title="● 기여">
          <p>
            ① 층 수에 상관없이 모든 가중치를 동시에 학습시키는{" "}
            <strong>일반적 절차</strong>를 최초로 제시 — 이후 모든 딥러닝
            학습의 뼈대가 된다. ② 은닉 뉴런이 사람이 정해주지 않은{" "}
            <strong>유용한 특징을 스스로 발견</strong>한다는 것을 실제
            실험(대칭성 탐지, 가족관계 트리 등)으로 보였다. ③ 모멘텀 항을
            더해 실용적으로 더 빠르고 안정적인 수렴을 제공했다.
          </p>
        </SubSection>
        <SubSection title="● 한계 — 계산 자원과 깊은 네트워크의 벽">
          <p>
            1986년 당시 컴퓨팅 파워로는 은닉층을 몇 개만 늘려도 학습이 매우
            느렸고, 국소 최적해(local minimum)에 갇히는 문제도 흔했다. 층이
            깊어질수록 앞쪽 층까지 전달되는 그래디언트가 점점 작아지는
            현상(이후 &ldquo;그래디언트 소실&rdquo; 문제로 불림)도 실무에서는
            발목을 잡았다. 그 결과 1990년대에는 이론적 보장과 실전 성능 모두
            뛰어난 커널 기반 방법(SVM)이 신경망 대신 주류로 떠오르게 된다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 발전 사슬에서의 위치">
        <p className="mb-3">
          이전 leaf(<strong>Ⅲ. 퍼셉트론</strong>): 단층 신경망의 학습 규칙은
          있었지만, 은닉층을 가진 다층 신경망을 학습시킬 방법이 없었다.
        </p>
        <p>
          <strong>이 기술이 푼 문제</strong>: 연쇄법칙으로 오차를 여러 층에
          걸쳐 거꾸로 전파해, 다층 신경망 전체를 한 번에 학습 가능하게 함. →{" "}
          <strong>남긴 한계</strong>: 당시 컴퓨팅 자원 한계, 국소 최적해,
          깊은 네트워크에서의 느린 수렴. →{" "}
          <strong>다음 leaf(Ⅴ. SVM)로 이어짐</strong>: 1990년대에는 신경망의
          이런 불안정성 대신, 볼록 최적화로 전역 최적해가 보장되는 커널 기반
          방법(SVM)이 고전 머신러닝의 정점으로 떠오른다.
        </p>
        <Insight>
          역전파는 &ldquo;신경망을 몇 층까지 쌓을 수 있는가&rdquo;라는
          질문에 원리적인 답을 처음 제시했다. 그 답을 실전에서 쓸 만하게
          만드는 데는(GPU, 대규모 데이터, ReLU 등) 이후 수십 년이 더
          걸렸지만, 오차를 거꾸로 흘려보낸다는 이 아이디어 자체는 지금의
          거대 언어모델까지도 그대로 쓰인다.
        </Insight>
      </CalcBox>
    </div>
  );
}
