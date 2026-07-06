"use client";

import { useState } from "react";
import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

interface Pt {
  x: number;
  y: number;
  cls: "blue" | "red";
}

const BLUE_POINTS: Pt[] = [
  { x: 80, y: 80, cls: "blue" },
  { x: 105, y: 60, cls: "blue" },
  { x: 125, y: 100, cls: "blue" },
  { x: 90, y: 140, cls: "blue" },
  { x: 115, y: 150, cls: "blue" },
];

const RED_POINTS: Pt[] = [
  { x: 270, y: 90, cls: "red" },
  { x: 300, y: 130, cls: "red" },
  { x: 255, y: 160, cls: "red" },
  { x: 295, y: 195, cls: "red" },
  { x: 325, y: 150, cls: "red" },
];

// 파란 무리 한가운데 섞여 들어온 "빨강" 라벨의 이상치 — 소프트 마진이 다루는 대상
const OUTLIER: Pt = { x: 150, y: 90, cls: "red" };

// 두 결정 경계: t=0(하드 마진에 가깝게 이상치까지 맞추려는 경우) ↔ t=1(소프트 마진, 이상치 포기)
const HARD_LINE = { top: { x: 140, y: 0 }, bottom: { x: 110, y: 260 }, margin: 12 };
const SOFT_LINE = { top: { x: 195, y: 0 }, bottom: { x: 195, y: 260 }, margin: 35 };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lineXAt(line: { top: { x: number; y: number }; bottom: { x: number; y: number } }, y: number) {
  const ratio = y / 260;
  return line.top.x + (line.bottom.x - line.top.x) * ratio;
}

function MarginDiagram({ t }: { t: number }) {
  const top = { x: lerp(HARD_LINE.top.x, SOFT_LINE.top.x, t), y: 0 };
  const bottom = { x: lerp(HARD_LINE.bottom.x, SOFT_LINE.bottom.x, t), y: 260 };
  const margin = lerp(HARD_LINE.margin, SOFT_LINE.margin, t);

  const dx = bottom.x - top.x;
  const dy = bottom.y - top.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = (dy / len) * margin;
  const ny = (-dx / len) * margin;

  const outlierLineX = lineXAt({ top, bottom }, OUTLIER.y);
  const outlierMisclassified = OUTLIER.x < outlierLineX;

  const isSV = (p: Pt) => p === BLUE_POINTS[2] || p === RED_POINTS[0];

  return (
    <svg width="100%" viewBox="0 0 400 260" style={{ maxWidth: 440, margin: "0 auto", display: "block" }}>
      {/* 마진 영역 */}
      <polygon
        points={`${top.x - nx},${top.y - ny} ${top.x + nx},${top.y + ny} ${bottom.x + nx},${bottom.y + ny} ${bottom.x - nx},${bottom.y - ny}`}
        fill="#a855f7"
        fillOpacity={0.08}
      />
      {/* 결정 경계 + 마진 경계선 */}
      <line x1={top.x} y1={top.y} x2={bottom.x} y2={bottom.y} stroke="#a855f7" strokeWidth={2} />
      <line
        x1={top.x - nx}
        y1={top.y - ny}
        x2={bottom.x - nx}
        y2={bottom.y - ny}
        stroke="#a855f7"
        strokeWidth={1}
        strokeDasharray="4 3"
        opacity={0.6}
      />
      <line
        x1={top.x + nx}
        y1={top.y + ny}
        x2={bottom.x + nx}
        y2={bottom.y + ny}
        stroke="#a855f7"
        strokeWidth={1}
        strokeDasharray="4 3"
        opacity={0.6}
      />

      {/* 정상 데이터 점 */}
      {[...BLUE_POINTS, ...RED_POINTS].map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={isSV(p) ? 8 : 6}
          fill={p.cls === "blue" ? "#3b82f6" : "#ef4444"}
          stroke={isSV(p) ? "currentColor" : "none"}
          strokeWidth={isSV(p) ? 2 : 0}
        />
      ))}

      {/* 이상치 */}
      <circle
        cx={OUTLIER.x}
        cy={OUTLIER.y}
        r={8}
        fill="#ef4444"
        stroke={outlierMisclassified ? "#f59e0b" : "currentColor"}
        strokeWidth={2.5}
      />
      {outlierMisclassified && (
        <text x={OUTLIER.x} y={OUTLIER.y - 14} textAnchor="middle" fontSize={11} fill="#f59e0b">
          ξ &gt; 0 (여유 변수, 마진 위반)
        </text>
      )}

      <text x={40} y={20} textAnchor="middle" fontSize={11} fill="#3b82f6" opacity={0.8}>+1 무리</text>
      <text x={360} y={20} textAnchor="middle" fontSize={11} fill="#ef4444" opacity={0.8}>−1 무리</text>
    </svg>
  );
}

export default function AirSvm() {
  const [t, setT] = useState(0);

  return (
    <div className="space-y-8">
      <p className="text-muted">
        &ldquo;AI 발전 지도&rdquo; 시리즈 Ⅴ — 역전파가 다층 신경망 학습의
        원리를 열었지만, 국소 최적해와 느린 수렴이라는 벽에 부딪히자 1990년대
        머신러닝의 주류는 볼록 최적화로 전역 최적해가 보장되는 서포트 벡터
        머신(SVM)으로 옮겨갔다. 1995년 코르테스와 배프닉은 잡음 섞인 실제
        데이터를 다루기 위한 &ldquo;소프트 마진&rdquo;을 더해 SVM을 완성했다.
      </p>

      <CalcBox title="■ 한눈에">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="text-xs text-muted mb-1">출처</div>
            <div className="font-medium">
              C. Cortes, V. Vapnik (1995), &ldquo;Support-Vector
              Networks,&rdquo; <em>Machine Learning</em>, 20, 273–297.
            </div>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="text-xs text-muted mb-1">한 줄 기여</div>
            <div className="font-medium">
              여유 변수(slack)를 도입해, 완벽히 분리되지 않는 데이터에도
              최대 마진 분류기를 적용할 수 있도록 SVM을 확장.
            </div>
          </div>
        </div>
      </CalcBox>

      <CalcBox title="■ 핵심 아이디어 — 원문·번역·해설">
        <SubSection title="● 문제의식: 현실 데이터는 완벽히 나뉘지 않는다">
          <blockquote className="border-l-4 border-sidebar-border pl-4 italic text-sm text-muted my-3">
            &ldquo;The support-vector network is a new learning machine for
            two-group classification problems. The machine conceptually
            implements the following idea: input vectors are non-linearly
            mapped to a very high-dimension feature space. In this feature
            space a linear decision surface is constructed. […] The idea
            behind the support-vector network was previously implemented
            for the restricted case where the training data can be
            separated without errors. We here extend this result to
            non-separable training data.&rdquo;
          </blockquote>
          <p className="text-sm text-muted mb-3">
            <strong>번역</strong> — &ldquo;서포트 벡터 네트워크는 두 집단
            분류 문제를 위한 새로운 학습 기계다. 이 기계는 개념적으로 다음
            아이디어를 구현한다: 입력 벡터를 매우 고차원의 특징 공간으로
            비선형 사상시킨다. 이 특징 공간 안에서 선형 결정 경계를
            구성한다. […] 서포트 벡터 네트워크의 아이디어는 이전에는 학습
            데이터가 오류 없이 분리 가능한 제한된 경우에만 구현되었다. 우리는
            여기서 이 결과를 분리 불가능한 학습 데이터로 확장한다.&rdquo;
          </p>
          <p>
            1992년 보서·가이언·배프닉의 원조 SVM(하드 마진)은 두 무리가
            직선(초평면)으로 <strong>완벽히</strong> 갈라질 때만 동작했다.
            그러나 실제 데이터에는 라벨이 헷갈리는 이상치나 겹치는 영역이
            흔하다. 이 논문의 핵심은 &ldquo;약간의 오류를 허용하는 대가로
            대부분의 데이터에 대해 넓은 마진을 확보한다&rdquo;는 절충을
            수식으로 정식화한 것 — 이후 &ldquo;소프트 마진 SVM&rdquo;이라
            불리는 사실상의 표준이 됐다.
          </p>
        </SubSection>

        <SubSection title="● 소프트 마진: 여유 변수와 마진의 트레이드오프">
          <p className="mb-3">
            원조(하드 마진) SVM은 모든 점이 마진 바깥에 있어야 한다고
            강제한다.
          </p>
          <BlockMath math="\min_{w,b} \frac{1}{2}\|w\|^2 \quad \text{s.t. } y_i(w \cdot x_i + b) \ge 1 \;\; \forall i" />
          <p className="mb-3">
            소프트 마진은 각 점마다 &ldquo;얼마나 마진을 어겼는지&rdquo;를
            나타내는 여유 변수(slack) <InlineMath math="\xi_i \ge 0" />를
            추가하고, 그 위반의 총합에 벌점 <InlineMath math="C" />를 매겨
            마진 폭과 함께 최소화한다.
          </p>
          <BlockMath math="\min_{w,b,\xi} \frac{1}{2}\|w\|^2 + C\sum_i \xi_i \quad \text{s.t. } y_i(w \cdot x_i + b) \ge 1 - \xi_i,\;\; \xi_i \ge 0" />
          <p>
            <InlineMath math="C" />가 크면 오류에 대한 벌점이 커져 이상치까지
            맞히려고 마진이 좁아지고, <InlineMath math="C" />가 작으면 몇 개
            틀리더라도 넓은 마진(더 나은 일반화)을 택한다. 아래 시각화에서
            직접 그 트레이드오프를 확인할 수 있다.
          </p>
        </SubSection>

        <SubSection title="● 커널 트릭: 비선형 문제를 선형처럼 풀기">
          <p className="mb-3">
            위 최적화 문제를 라그랑주 쌍대(dual) 형태로 바꾸면, 데이터가
            항상 내적(dot product) <InlineMath math="x_i \cdot x_j" /> 형태로만
            등장한다는 사실이 드러난다.
          </p>
          <BlockMath math="\max_{\alpha} \sum_i \alpha_i - \frac{1}{2}\sum_{i,j} \alpha_i \alpha_j y_i y_j\, K(x_i, x_j) \quad \text{s.t. } 0 \le \alpha_i \le C,\;\; \sum_i \alpha_i y_i = 0" />
          <p>
            이 내적을 커널 함수 <InlineMath math="K(x_i,x_j)" />로 바꿔치기하면,
            데이터를 고차원 특징 공간으로 명시적으로 사상하지 않고도{" "}
            <strong>그 공간에서의 선형 분리</strong>를 계산할 수 있다(다항식
            커널, 가우시안/RBF 커널 등). 결정 함수는 학습 데이터 중 마진에
            걸린 점들(서포트 벡터)만으로 결정된다.
          </p>
          <BlockMath math="f(x) = \operatorname{sign}\Big(\sum_i \alpha_i y_i K(x_i, x) + b\Big)" />
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 마진과 서포트 벡터 — C의 트레이드오프 직접 보기">
        <p className="mb-4">
          파란 무리 한가운데 빨강 라벨의 이상치가 하나 섞여 있다. 슬라이더를
          움직여 <InlineMath math="C" />가 클 때(왼쪽, 이상치까지 맞추려는
          좁은 마진)와 작을 때(오른쪽, 이상치를 포기하는 넓은 마진)를
          비교해보자. 굵은 테두리 점이 마진을 결정하는 서포트 벡터다.
        </p>

        <MarginDiagram t={t} />

        <div className="mt-4 max-w-md mx-auto">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={t}
            onChange={(e) => setT(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted mt-1">
            <span>C 큼 (마진 좁음, 이상치까지 분류)</span>
            <span>C 작음 (마진 넓음, 이상치 포기)</span>
          </div>
        </div>
      </CalcBox>

      <CalcBox title="■ 의미와 한계">
        <SubSection title="● 기여">
          <p>
            ① 볼록 최적화 문제로 정식화되어 <strong>전역 최적해가 항상
            보장</strong>됨 — 신경망의 국소 최적해 문제에서 자유로움. ②
            마진 최대화가 통계적 학습 이론(VC 차원)과 직결되어{" "}
            <strong>일반화 성능의 이론적 근거</strong>를 제공. ③ 커널
            트릭으로 이미지·텍스트 등 다양한 비선형 문제에 폭넓게 적용되며
            1990년대 후반~2000년대 손글씨 인식, 텍스트 분류 등에서 신경망을
            능가하는 성능을 보임.
          </p>
        </SubSection>
        <SubSection title="● 한계 — 사람이 설계해야 하는 특징과 확장성">
          <p>
            커널 함수와 <InlineMath math="C" />, 커널 하이퍼파라미터는{" "}
            <strong>사람이 직접 고르고 튜닝</strong>해야 했다 — 데이터로부터
            특징을 스스로 학습하는 능력은 없었다. 또한 쌍대 문제 계산량이
            학습 데이터 수의 제곱~세제곱에 가까워, 데이터가 매우 커지면
            학습이 급격히 느려진다. 이 &ldquo;특징을 사람이 설계해야
            한다&rdquo;는 한계가, 이후 데이터로부터 특징을 직접 학습하는
            신경망(CNN)이 다시 주목받는 배경이 된다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 발전 사슬에서의 위치">
        <p className="mb-3">
          이전 leaf(<strong>Ⅳ. 역전파</strong>): 다층 신경망을 학습시키는
          원리는 나왔지만, 국소 최적해·느린 수렴·계산 자원 한계로 실전에서
          불안정했다.
        </p>
        <p>
          <strong>이 기술이 푼 문제</strong>: 볼록 최적화로 전역 최적해를
          보장하고, 소프트 마진으로 잡음 있는 현실 데이터까지, 커널
          트릭으로 비선형 문제까지 다루는 이론적으로 탄탄한 분류기를 제공. →{" "}
          <strong>남긴 한계</strong>: 특징·커널을 사람이 직접 설계해야 함
          (표현 학습의 부재), 대용량 데이터로의 확장성 문제. →{" "}
          <strong>다음 leaf(Ⅵ. LeNet)로 이어짐</strong>: 사람이 특징을
          설계하는 대신, 합성곱 신경망이 원본 이미지에서 특징을 직접 학습하는
          방향이 다시 떠오른다.
        </p>
        <Insight>
          SVM의 전성기는 &ldquo;이론적으로 탄탄하지만 특징은 사람이
          설계해야 하는&rdquo; 시대의 정점이었다. 이후 딥러닝은 정반대
          방향 — 이론적 보장은 약해도 특징 자체를 데이터로부터 학습 —
          으로 나아가 결국 SVM을 대부분의 영역에서 대체하게 된다.
        </Insight>
      </CalcBox>
    </div>
  );
}
