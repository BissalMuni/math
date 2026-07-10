import { InlineMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

interface LayerBox {
  label: string;
  dims: string;
  w: number;
  h: number;
  fill: string;
  gpu: 1 | 2 | 0;
}

// AlexNet 8계층(5 conv + 3 fc) 개념도 — 폭/높이는 시각적 비례(실제 파라미터 크기 아님).
// gpu: 1998년 LeNet과 달리, 논문 원본은 두 GTX 580(3GB) GPU에 층을 나눠 학습(gpu=1/2), 일부 층은 GPU 간 통신(gpu=0)
const LAYERS: LayerBox[] = [
  { label: "INPUT", dims: "224×224×3", w: 60, h: 60, fill: "#94a3b8", gpu: 0 },
  { label: "Conv1", dims: "96 커널\n11×11 stride4", w: 52, h: 52, fill: "#3b82f6", gpu: 0 },
  { label: "Conv2", dims: "256 커널\n5×5", w: 44, h: 44, fill: "#3b82f6", gpu: 0 },
  { label: "Conv3", dims: "384 커널\n3×3", w: 36, h: 36, fill: "#2563eb", gpu: 0 },
  { label: "Conv4", dims: "384 커널\n3×3", w: 32, h: 32, fill: "#2563eb", gpu: 0 },
  { label: "Conv5", dims: "256 커널\n3×3", w: 28, h: 28, fill: "#2563eb", gpu: 0 },
  { label: "FC6", dims: "완전연결\n4096", w: 10, h: 56, fill: "#a855f7", gpu: 0 },
  { label: "FC7", dims: "완전연결\n4096", w: 10, h: 56, fill: "#a855f7", gpu: 0 },
  { label: "OUTPUT", dims: "softmax\n1000", w: 10, h: 20, fill: "#ef4444", gpu: 0 },
];

const LAYER_GAP = 34;
const LAYER_START_X = 20;

function computeLayerPositions(): { positions: number[]; totalWidth: number } {
  const positions: number[] = [];
  const totalWidth = LAYERS.reduce((x, layer) => {
    positions.push(x + layer.w / 2);
    return x + layer.w + LAYER_GAP;
  }, LAYER_START_X);
  return { positions, totalWidth };
}

function AlexNetDiagram() {
  const baseline = 100;
  const { positions, totalWidth } = computeLayerPositions();

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${totalWidth} 220`}
      style={{ maxWidth: 760, margin: "0 auto", display: "block" }}
    >
      {LAYERS.map((layer, i) =>
        i < LAYERS.length - 1 ? (
          <line
            key={`arrow-${i}`}
            x1={positions[i] + layer.w / 2}
            y1={baseline}
            x2={positions[i + 1] - LAYERS[i + 1].w / 2}
            y2={baseline}
            stroke="currentColor"
            strokeOpacity={0.35}
            strokeWidth={1.5}
            markerEnd="url(#arrowhead-alexnet)"
          />
        ) : null
      )}
      <defs>
        <marker id="arrowhead-alexnet" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" opacity={0.35} />
        </marker>
      </defs>
      {LAYERS.map((layer, i) => (
        <g key={layer.label}>
          <rect
            x={positions[i] - layer.w / 2}
            y={baseline - layer.h / 2}
            width={layer.w}
            height={layer.h}
            fill={layer.fill}
            fillOpacity={0.75}
            rx={3}
          />
          <text
            x={positions[i]}
            y={baseline - layer.h / 2 - 8}
            textAnchor="middle"
            fontSize={10.5}
            fontWeight={600}
            fill="currentColor"
          >
            {layer.label}
          </text>
          {layer.dims.split("\n").map((line, li) => (
            <text
              key={li}
              x={positions[i]}
              y={baseline + layer.h / 2 + 14 + li * 12}
              textAnchor="middle"
              fontSize={9}
              fill="currentColor"
              opacity={0.7}
            >
              {line}
            </text>
          ))}
        </g>
      ))}
      <text
        x={totalWidth / 2}
        y={200}
        textAnchor="middle"
        fontSize={10}
        fill="currentColor"
        opacity={0.55}
      >
        (실제 논문 구조는 Conv1~Conv5·FC6~7 다수를 GTX 580 GPU 두 대에 나눠 병렬 학습)
      </text>
    </svg>
  );
}

interface ErrorBar {
  label: string;
  value: number;
  fill: string;
}

// ILSVRC-2012 대회 top-5 오류율(%) — Krizhevsky et al. 2012 논문에 명시된 두 수치
const ERROR_BARS: ErrorBar[] = [
  { label: "AlexNet (1위)", value: 15.3, fill: "#3b82f6" },
  { label: "2위 팀", value: 26.2, fill: "#94a3b8" },
];

function ErrorRateChart() {
  const chartWidth = 360;
  const barHeight = 28;
  const gap = 22;
  const maxValue = 30;
  const scale = (chartWidth - 90) / maxValue;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${chartWidth} ${ERROR_BARS.length * (barHeight + gap)}`}
      style={{ maxWidth: 460, margin: "0 auto", display: "block" }}
    >
      {ERROR_BARS.map((bar, i) => {
        const y = i * (barHeight + gap) + gap / 2;
        return (
          <g key={bar.label}>
            <text x={0} y={y + barHeight / 2 + 4} fontSize={11} fill="currentColor">
              {bar.label}
            </text>
            <rect x={90} y={y} width={bar.value * scale} height={barHeight} fill={bar.fill} fillOpacity={0.8} rx={3} />
            <text
              x={90 + bar.value * scale + 8}
              y={y + barHeight / 2 + 4}
              fontSize={11}
              fontWeight={600}
              fill="currentColor"
            >
              {bar.value}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function AirAlexnet() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        &ldquo;AI 발전 지도&rdquo; 시리즈 Ⅶ — LeNet-5는 합성곱 신경망이
        데이터로부터 특징을 스스로 학습할 수 있음을 보였지만, 얕은 구조와
        1990년대 컴퓨터·데이터 한계로 작은 흑백 이미지 이상 확장되지
        못했다. 2012년, 크리제프스키·서츠케버·힌튼은 대규모 라벨 데이터셋
        ImageNet과 GPU 연산이 갖춰진 시점에 훨씬 깊은 CNN을 훈련시켜, 이미지
        인식 대회를 압도적 격차로 우승하며 딥러닝 시대를 열었다.
      </p>

      <CalcBox title="■ 한눈에">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="text-xs text-muted mb-1">출처</div>
            <div className="font-medium">
              A. Krizhevsky, I. Sutskever, G. E. Hinton (2012),
              &ldquo;ImageNet Classification with Deep Convolutional
              Neural Networks,&rdquo; <em>Advances in Neural Information
              Processing Systems (NeurIPS) 25</em>.
            </div>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="text-xs text-muted mb-1">한 줄 기여</div>
            <div className="font-medium">
              8개 층(5 합성곱+3 완전연결)·6천만 파라미터의 깊은 CNN을 GPU로
              학습시켜, ILSVRC-2012 이미지 분류 대회에서 2위를 큰 격차로
              따돌리며 우승 — 딥러닝이 산업 표준으로 떠오르는 계기.
            </div>
          </div>
        </div>
      </CalcBox>

      <CalcBox title="■ 핵심 아이디어 — 원문·번역·해설">
        <SubSection title="● 문제의식: 왜 2012년인가 — 데이터와 연산의 만남">
          <blockquote className="border-l-4 border-sidebar-border pl-4 italic text-sm text-muted my-3">
            &ldquo;We trained a large, deep convolutional neural network to
            classify the 1.2 million high-resolution images in the ImageNet
            LSVRC-2010 contest into the 1000 different classes.&rdquo;
          </blockquote>
          <p className="text-sm text-muted mb-3">
            <strong>번역</strong> — &ldquo;우리는 ImageNet LSVRC-2010
            대회의 1000개 클래스로 나뉜 120만 장의 고해상도 이미지를
            분류하기 위해, 크고 깊은 합성곱 신경망을 훈련시켰다.&rdquo;
          </p>
          <p>
            LeNet-5 시절에는 존재하지 않았던 두 조건이 2012년에 갖춰졌다 —
            ① 수백만 장·1000개 클래스 규모의 라벨된 이미지 데이터셋
            ImageNet, ② 합성곱 연산을 병렬로 빠르게 처리하는 GPU. 저자들은
            이 두 조건 위에서 LeNet과 같은 CNN 구조를 훨씬 깊고 크게
            키우면, 사람이 설계한 특징(SVM 시대의 접근)을 능가하는 성능을
            낼 수 있다고 봤다.
          </p>
        </SubSection>

        <SubSection title="● ReLU와 두 GPU: 깊은 네트워크를 실제로 학습시키기">
          <blockquote className="border-l-4 border-sidebar-border pl-4 italic text-sm text-muted my-3">
            &ldquo;To make training faster, we used non-saturating neurons
            and a very efficient GPU implementation of the convolution
            operation.&rdquo;
          </blockquote>
          <p className="text-sm text-muted mb-3">
            <strong>번역</strong> — &ldquo;학습을 더 빠르게 하기 위해,
            우리는 비포화(non-saturating) 뉴런과 매우 효율적인 GPU 기반
            합성곱 연산 구현을 사용했다.&rdquo;
          </p>
          <p>
            &ldquo;비포화 뉴런&rdquo;은 <InlineMath math="f(x) = \max(0, x)" />
            {" "}형태의 ReLU(Rectified Linear Unit)를 가리킨다. 기존
            주류였던 <InlineMath math="\tanh" />·시그모이드는 입력이 커지면
            기울기가 0에 가까워져(포화) 역전파 신호가 사라지는 문제가
            있었는데, ReLU는 양수 구간에서 기울기가 항상 1이라 깊은
            네트워크에서도 학습이 훨씬 빨랐다. 또한 3GB 메모리의 GPU
            한 장에 전체 네트워크가 들어가지 않아, 저자들은 두 GPU에 층을
            나누어 병렬로 학습시키는 방식을 택했다 — 이는 이후 대규모
            모델을 여러 장치에 분산 학습시키는 관행의 초기 사례이기도 하다.
          </p>
        </SubSection>

        <SubSection title="● 과적합 방지: 데이터 증강과 드롭아웃">
          <p className="mb-3">
            6천만 개 파라미터를 가진 네트워크를 120만 장으로 학습시키면
            과적합이 심각한 문제가 된다. 저자들은 두 기법으로 이를 억제했다
            — ① 이미지를 무작위로 잘라내거나 좌우 반전시켜 학습 데이터를
            사실상 늘리는 <strong>데이터 증강(data augmentation)</strong>,
            ② 학습 중 각 은닉 뉴런의 출력을 확률적으로 꺼버리는{" "}
            <strong>드롭아웃(dropout)</strong>.
          </p>
          <blockquote className="border-l-4 border-sidebar-border pl-4 italic text-sm text-muted my-3">
            &ldquo;This technique, which is called &lsquo;dropout&rsquo;,
            consists of setting to zero the output of each hidden neuron
            with probability 0.5.&rdquo;
          </blockquote>
          <p className="text-sm text-muted">
            <strong>번역</strong> — &ldquo;&lsquo;드롭아웃&rsquo;이라
            불리는 이 기법은, 각 은닉 뉴런의 출력을 0.5의 확률로 0으로
            만드는 것으로 이루어진다.&rdquo;
          </p>
          <p className="mt-3">
            매번 다른 뉴런 부분집합만 켜진 상태로 학습되므로, 특정 뉴런
            조합에 과도하게 의존하는 것을 막는 효과가 있다 — 완전연결
            층(FC6·FC7)처럼 파라미터가 많은 층에 특히 효과적이었다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ AlexNet 아키텍처 — 8개 층의 흐름">
        <p className="mb-4">
          224×224 컬러 이미지가 5개의 합성곱 층(일부는 최대 풀링 동반)을
          거쳐 점점 추상적인 특징으로 압축되고, 마지막 3개의 완전연결
          층(FC6·FC7·1000-way softmax)이 1000개 클래스 중 하나로 분류한다.
        </p>
        <AlexNetDiagram />
      </CalcBox>

      <CalcBox title="■ ILSVRC-2012 결과 — 압도적 격차">
        <p className="mb-4">
          AlexNet은 2012년 ImageNet 대규모 시각 인식 대회(ILSVRC)에서
          top-5 오류율 15.3%를 기록해, 전통적인 컴퓨터 비전 기법을 쓴
          2위 팀(26.2%)을 큰 격차로 앞서며 우승했다. 이 한 번의 결과가
          이후 컴퓨터 비전 연구 대부분을 CNN 기반으로 전환시켰다.
        </p>
        <ErrorRateChart />
      </CalcBox>

      <CalcBox title="■ 의미와 한계">
        <SubSection title="● 기여">
          <p>
            ① &ldquo;깊은 CNN + 대규모 데이터 + GPU&rdquo; 조합이 사람이
            설계한 특징 기반 기법(SVM 등)을 압도적으로 능가함을 실증해,
            컴퓨터 비전 연구의 흐름을 CNN으로 전환시킨 &ldquo;딥러닝
            빅뱅&rdquo;. ② ReLU·드롭아웃·데이터 증강·GPU 병렬 학습 등,
            이후 거의 모든 딥러닝 모델의 표준 도구가 된 기법들을 하나의
            시스템으로 결합해 검증. ③ ILSVRC 대회 자체를 CNN 경쟁의 장으로
            바꿔, 이후 수년간 VGG·GoogLeNet·ResNet 등 더 깊은 구조의
            연쇄적 경쟁을 촉발.
          </p>
        </SubSection>
        <SubSection title="● 한계 — 깊이의 한계와 수작업 튜닝">
          <p>
            8개 층은 이후 기준으로는 얕은 편이었고, 네트워크를 더 깊게
            쌓으면 오히려 학습이 불안정해지고 성능이 나빠지는 현상(기울기
            소실·폭발)이 곧 드러났다. 또한 층 구성·커널 크기·학습률 등
            많은 하이퍼파라미터를 여전히 사람이 시행착오로 정해야 했다.
            &ldquo;더 깊게 쌓으면 왜, 어떻게 안정적으로 학습되는가&rdquo;라는
            질문이 다음 세대 연구의 핵심 과제로 남았다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 발전 사슬에서의 위치">
        <p className="mb-3">
          이전 leaf(<strong>Ⅵ. LeNet</strong>): 합성곱 신경망이 이미지에서
          특징을 스스로 학습할 수 있음을 보였지만, 얕은 구조와 당시
          연산·데이터 부족으로 작은 흑백 이미지 이상 확장되지 못했다.
        </p>
        <p>
          <strong>이 기술이 푼 문제</strong>: ImageNet 규모의 데이터와
          GPU 연산으로 CNN을 8개 층까지 확장하고, ReLU·드롭아웃·데이터
          증강으로 깊은 네트워크를 안정적으로 학습시켜 압도적 성능을
          입증. →{" "}
          <strong>남긴 한계</strong>: 층을 더 깊게 쌓으면 학습이
          불안정해지는 문제, 여전히 많은 하이퍼파라미터 수작업. →{" "}
          <strong>다음 leaf(Ⅷ. ResNet)로 이어짐</strong>: 잔차
          연결(residual connection)로 훨씬 더 깊은 네트워크(수십~수백 층)도
          안정적으로 학습시키는 방법이 등장한다.
        </p>
        <Insight>
          AlexNet 자체의 아키텍처 아이디어(합성곱+풀링+완전연결)는
          LeNet과 본질적으로 같다 — 바뀐 것은 규모(데이터·파라미터)와
          학습을 가능하게 한 공학적 장치(ReLU·GPU·드롭아웃)다. &ldquo;같은
          아이디어라도 규모와 공학이 갖춰지면 질적으로 다른 결과를
          낸다&rdquo;는 것이 이 leaf가 지도에 남기는 교훈이다.
        </Insight>
      </CalcBox>
    </div>
  );
}
