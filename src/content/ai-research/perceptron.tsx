"use client";

import { useState } from "react";
import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

type GateKey = "and" | "or" | "xor";

interface GatePoint {
  x: 0 | 1;
  y: 0 | 1;
  label: 0 | 1;
}

interface GateDef {
  key: GateKey;
  label: string;
  points: GatePoint[];
  separable: boolean;
  // 직선 w1*x + w2*y = theta 를 단위 정사각형과의 교점 두 개로 표현
  line?: { x1: number; y1: number; x2: number; y2: number };
}

const GATES: GateDef[] = [
  {
    key: "and",
    label: "AND",
    points: [
      { x: 0, y: 0, label: 0 },
      { x: 0, y: 1, label: 0 },
      { x: 1, y: 0, label: 0 },
      { x: 1, y: 1, label: 1 },
    ],
    separable: true,
    // x + y = 1.5
    line: { x1: 0.5, y1: 1, x2: 1, y2: 0.5 },
  },
  {
    key: "or",
    label: "OR",
    points: [
      { x: 0, y: 0, label: 0 },
      { x: 0, y: 1, label: 1 },
      { x: 1, y: 0, label: 1 },
      { x: 1, y: 1, label: 1 },
    ],
    separable: true,
    // x + y = 0.5
    line: { x1: 0, y1: 0.5, x2: 0.5, y2: 0 },
  },
  {
    key: "xor",
    label: "XOR",
    points: [
      { x: 0, y: 0, label: 0 },
      { x: 0, y: 1, label: 1 },
      { x: 1, y: 0, label: 1 },
      { x: 1, y: 1, label: 0 },
    ],
    separable: false,
  },
];

// 단위 정사각형 [0,1]x[0,1] 좌표 → SVG 픽셀 좌표 (여백 30, 크기 140, y축 반전)
const PAD = 30;
const SIZE = 140;
function toPx(x: number, y: number) {
  return { px: PAD + x * SIZE, py: PAD + (1 - y) * SIZE };
}

function GatePlot({ gate }: { gate: GateDef }) {
  return (
    <svg width="100%" viewBox="0 0 200 200" style={{ maxWidth: 260, margin: "0 auto", display: "block" }}>
      {/* 축 */}
      <rect x={PAD} y={PAD} width={SIZE} height={SIZE} fill="none" stroke="currentColor" strokeOpacity={0.2} />
      {/* 분리선 */}
      {gate.separable && gate.line && (
        <line
          x1={toPx(gate.line.x1, gate.line.y1).px}
          y1={toPx(gate.line.x1, gate.line.y1).py}
          x2={toPx(gate.line.x2, gate.line.y2).px}
          y2={toPx(gate.line.x2, gate.line.y2).py}
          stroke="#10b981"
          strokeWidth={2.5}
        />
      )}
      {/* XOR: 분리 불가 표시 — 두 클래스를 잇는 대각선을 점선/붉은색으로 교차 표시 */}
      {!gate.separable && (
        <>
          <line
            x1={toPx(0, 0).px}
            y1={toPx(0, 0).py}
            x2={toPx(1, 1).px}
            y2={toPx(1, 1).py}
            stroke="#ef4444"
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
          <line
            x1={toPx(0, 1).px}
            y1={toPx(0, 1).py}
            x2={toPx(1, 0).px}
            y2={toPx(1, 0).py}
            stroke="#ef4444"
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
        </>
      )}
      {/* 점 */}
      {gate.points.map((p) => {
        const { px, py } = toPx(p.x, p.y);
        return (
          <g key={`${p.x}-${p.y}`}>
            <circle
              cx={px}
              cy={py}
              r={8}
              fill={p.label === 1 ? "#6366f1" : "#f1f5f9"}
              stroke={p.label === 1 ? "#6366f1" : "#94a3b8"}
              strokeWidth={1.5}
            />
            <text x={px} y={py - 12} textAnchor="middle" fontSize={9} fill="currentColor" opacity={0.7}>
              ({p.x},{p.y})
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function AirPerceptron() {
  const [gateKey, setGateKey] = useState<GateKey>("and");
  const gate = GATES.find((g) => g.key === gateKey)!;

  return (
    <div className="space-y-8">
      <p className="text-muted">
        &ldquo;AI 발전 지도&rdquo; 시리즈 Ⅲ — 신경망의 출발점. 1958년 프랭크 로젠블랫이
        제안한 퍼셉트론은 생물학적 뉴런을 최초로 수학적으로 모델링하고, 데이터로부터
        가중치를 학습하는 알고리즘까지 제시했다.
      </p>

      <CalcBox title="■ 한눈에">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="text-xs text-muted mb-1">출처</div>
            <div className="font-medium">
              F. Rosenblatt (1958), &ldquo;The Perceptron: A Probabilistic
              Model for Information Storage and Organization in the
              Brain,&rdquo; <em>Psychological Review</em>, 65(6), 386–408.
            </div>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="text-xs text-muted mb-1">한 줄 기여</div>
            <div className="font-medium">
              가중합 + 임계값으로 이진 분류하는 단일 뉴런 모델과, 오차에
              비례해 가중치를 갱신하는 학습 규칙을 함께 제시.
            </div>
          </div>
        </div>
      </CalcBox>

      <CalcBox title="■ 핵심 아이디어 — 원문·번역·해설">
        <SubSection title="● 문제의식: 뇌는 어떻게 기억하고 인식하는가">
          <blockquote className="border-l-4 border-sidebar-border pl-4 italic text-sm text-muted my-3">
            &ldquo;If we are eventually to understand the capability of
            higher organisms for perceptual recognition, generalization,
            recall, and thinking, we must first have answers to three
            fundamental questions: 1. How is information about the physical
            world sensed, or detected, by the biological system? 2. In what
            form is information stored, or remembered? 3. How does
            information contained in storage, or in memory, influence
            recognition and behavior?&rdquo;
          </blockquote>
          <p className="text-sm text-muted mb-3">
            <strong>번역</strong> — &ldquo;만약 우리가 궁극적으로 고등
            유기체의 지각적 인식, 일반화, 회상, 사고 능력을 이해하고자
            한다면, 먼저 세 가지 근본적인 질문에 답해야 한다. 1. 물리적
            세계에 대한 정보는 생물학적 시스템에 의해 어떻게 감지되는가?
            2. 정보는 어떤 형태로 저장, 즉 기억되는가? 3. 저장된 정보는
            어떻게 인식과 행동에 영향을 미치는가?&rdquo;
          </p>
          <p>
            로젠블랫은 신경과학의 질문(뇌는 어떻게 학습하는가)을 공학적으로
            풀 수 있는 형태로 옮겼다. 퍼셉트론은 &ldquo;생물학적으로
            정확한 뇌 모델&rdquo;이 아니라, 이 질문에 답하기 위한{" "}
            <strong>단순화된 계산 모델</strong>이었다는 점이 이후 신경망
            연구 전체의 출발 태도가 되었다.
          </p>
        </SubSection>

        <SubSection title="● 설계 의도: 특정 생물이 아닌 지능 일반의 모델">
          <blockquote className="border-l-4 border-sidebar-border pl-4 italic text-sm text-muted my-3">
            &ldquo;The perceptron is designed to illustrate some of the
            fundamental properties of intelligent systems in general,
            without becoming too deeply enmeshed in the special, and
            frequently unknown, conditions which hold for particular
            biological organisms.&rdquo;
          </blockquote>
          <p className="text-sm text-muted mb-3">
            <strong>번역</strong> — &ldquo;퍼셉트론은 특정 생물학적
            유기체에게만 해당하는, 대개는 알려지지도 않은 특수 조건에
            지나치게 얽매이지 않으면서, 지능 시스템 일반의 근본적 속성
            일부를 예시하기 위해 설계되었다.&rdquo;
          </p>
          <p>
            이 문장이 곧 퍼셉트론을 &ldquo;하나의 뉴런&rdquo;이 아니라{" "}
            <strong>범용 계산 모델</strong>로 만든 선언이다. 구체적으로는
            입력을 가중합하고, 임계값과 비교해 두 그룹으로 나누는 아주 단순한
            함수로 정의된다.
          </p>
        </SubSection>

        <SubSection title="● 수학적 모델">
          <p className="mb-3">
            입력 <InlineMath math="x_1, \dots, x_n" />에 가중치{" "}
            <InlineMath math="w_1, \dots, w_n" />을 곱해 더하고, 편향{" "}
            <InlineMath math="b" />를 더한 뒤 계단 함수(step function)를
            통과시켜 0 또는 1의 이진 출력을 낸다.
          </p>
          <BlockMath math="y = f\left(\sum_{i=1}^{n} w_i x_i + b\right), \quad f(z) = \begin{cases} 1 & z \ge 0 \\ 0 & z < 0 \end{cases}" />
          <p>
            기하학적으로 이는 입력 공간을 <InlineMath math="\sum w_i x_i + b = 0" />
            라는 <strong>하나의 초평면(직선/평면)</strong>으로 둘로 나누는
            것과 같다. 즉 퍼셉트론 하나는 딱 그만큼의 표현력만 가진다 —
            아래 &ldquo;선형 분리가능성&rdquo; 절에서 직접 확인할 수 있다.
          </p>
        </SubSection>

        <SubSection title="● 학습 규칙: 틀린 만큼만 고친다">
          <p className="mb-3">
            정답(desired output) <InlineMath math="d" />와 실제 출력{" "}
            <InlineMath math="y" />가 다를 때만, 그 오차에 비례해 가중치를
            갱신한다.
          </p>
          <BlockMath math="w_i \leftarrow w_i + \eta\,(d - y)\,x_i, \qquad b \leftarrow b + \eta\,(d - y)" />
          <p>
            <InlineMath math="\eta" />는 학습률. 로젠블랫은 이 갱신을 반복하면
            데이터가 선형 분리 가능할 때 유한 번 안에 반드시 정답 가중치로
            수렴한다는 것(퍼셉트론 수렴 정리)까지 함께 제시했다 — &ldquo;오차가
            있으면 그 방향으로 가중치를 조금씩 옮긴다&rdquo;는 이 아이디어는
            이후 경사하강법 기반 학습 전체의 원형이 된다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 선형 분리가능성 — 논리 게이트로 직접 확인">
        <p className="mb-4">
          퍼셉트론 하나가 그릴 수 있는 경계는 직선(초평면) 하나뿐이다.
          AND·OR는 직선 하나로 두 그룹을 나눌 수 있지만, XOR는{" "}
          <strong>어떤 직선으로도 나눌 수 없다</strong>. 아래 탭을 눌러
          직접 비교해 보자. (파란 점 = 출력 1, 흰 점 = 출력 0)
        </p>

        <div className="flex gap-1 bg-sidebar-bg rounded-lg p-1 mb-4 max-w-xs mx-auto">
          {GATES.map((g) => (
            <button
              key={g.key}
              onClick={() => setGateKey(g.key)}
              className={`flex-1 py-1.5 rounded-md text-sm transition-colors ${
                gateKey === g.key
                  ? "bg-white dark:bg-gray-800 font-semibold shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        <GatePlot gate={gate} />

        <p className="text-center text-sm mt-3">
          {gate.separable ? (
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              녹색 직선 하나로 완전히 분리 가능 — 퍼셉트론이 학습할 수 있다.
            </span>
          ) : (
            <span className="text-red-600 dark:text-red-400 font-medium">
              어떤 직선을 그어도 두 클래스를 분리할 수 없다 — 퍼셉트론 1개로는 학습 불가능.
            </span>
          )}
        </p>
      </CalcBox>

      <CalcBox title="■ 의미와 한계">
        <SubSection title="● 기여">
          <p>
            ① 생물학적 뉴런을 &ldquo;가중합 + 임계값&rdquo;이라는 계산
            가능한 수식으로 최초 정식화. ② 데이터로부터 가중치를 자동으로
            찾는 학습 알고리즘과 그 수렴 증명을 함께 제시 — 이후 모든 신경망
            학습의 원형. ③ 하드웨어(Mark I Perceptron)로 직접 구현해 기계가
            패턴을 학습할 수 있음을 실증.
          </p>
        </SubSection>
        <SubSection title="● 한계 — 선형 분리가능성의 벽">
          <p>
            민스키(Marvin Minsky)와 페퍼트(Seymour Papert)는 1969년 저서{" "}
            <em>Perceptrons</em>에서, 단층 퍼셉트론이 XOR처럼{" "}
            <strong>선형 분리 불가능한 문제를 원리적으로 풀 수 없음</strong>을
            수학적으로 증명했다. 이는 신경망 연구 자금과 관심이 급격히
            식는 첫 번째 &ldquo;AI 겨울&rdquo;의 주요 계기가 되었다. 문제
            해결의 열쇠는 은닉층을 추가한 다층 신경망에 있었지만, 당시에는
            다층 네트워크를 학습시킬 방법이 없었다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 발전 사슬에서의 위치">
        <p className="mb-3">
          퍼셉트론은 이 시리즈의 출발점 — <strong>이전 leaf 없음</strong>.
        </p>
        <p>
          <strong>이 기술이 푼 문제</strong>: 뉴런의 학습을 수식과
          알고리즘으로 정식화. →{" "}
          <strong>남긴 한계</strong>: 단층 구조로는 선형 분리 가능한 문제밖에
          풀 수 없고, 다층으로 쌓아도 학습시킬 방법이 없었음. →{" "}
          <strong>다음 leaf(Ⅳ. 역전파)로 이어짐</strong>: 1986년 럼멜하트·힌턴·윌리엄스가
          연쇄법칙(chain rule)으로 오차를 여러 층에 걸쳐 역전파시키는 방법을
          제시하며, 다층 신경망이 비로소 학습 가능해진다.
        </p>
        <Insight>
          &ldquo;틀린 만큼만 가중치를 고친다&rdquo;는 퍼셉트론의 학습
          규칙은, 층이 하나에서 여러 개로 늘어나는 순간 &ldquo;그 오차를
          어느 층의 어느 가중치 탓으로 돌릴 것인가&rdquo;라는 질문이 되고,
          이것이 바로 역전파가 푸는 문제다.
        </Insight>
      </CalcBox>
    </div>
  );
}
