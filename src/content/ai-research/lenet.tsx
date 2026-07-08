import { InlineMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

interface LayerBox {
  label: string;
  dims: string;
  w: number;
  h: number;
  fill: string;
  kind: "input" | "conv" | "pool" | "fc";
}

// LeNet-5 7계층 구성 (입력 제외 카운트 시 6계층) — 폭/높이는 시각적 비례(실제 픽셀 아님)
const LAYERS: LayerBox[] = [
  { label: "INPUT", dims: "32×32×1", w: 64, h: 64, fill: "#94a3b8", kind: "input" },
  { label: "C1", dims: "합성곱\n6@28×28", w: 56, h: 56, fill: "#3b82f6", kind: "conv" },
  { label: "S2", dims: "서브샘플링\n6@14×14", w: 28, h: 28, fill: "#60a5fa", kind: "pool" },
  { label: "C3", dims: "합성곱\n16@10×10", w: 20, h: 20, fill: "#3b82f6", kind: "conv" },
  { label: "S4", dims: "서브샘플링\n16@5×5", w: 10, h: 10, fill: "#60a5fa", kind: "pool" },
  { label: "C5", dims: "합성곱\n120@1×1", w: 8, h: 40, fill: "#3b82f6", kind: "conv" },
  { label: "F6", dims: "완전연결\n84", w: 8, h: 28, fill: "#a855f7", kind: "fc" },
  { label: "OUTPUT", dims: "RBF\n10", w: 8, h: 12, fill: "#ef4444", kind: "fc" },
];

const LAYER_GAP = 46;
const LAYER_START_X = 20;

function computeLayerPositions(): { positions: number[]; totalWidth: number } {
  const positions: number[] = [];
  const totalWidth = LAYERS.reduce((x, layer) => {
    positions.push(x + layer.w / 2);
    return x + layer.w + LAYER_GAP;
  }, LAYER_START_X);
  return { positions, totalWidth };
}

function LeNetDiagram() {
  const baseline = 90;
  const { positions, totalWidth } = computeLayerPositions();

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${totalWidth} 200`}
      style={{ maxWidth: 720, margin: "0 auto", display: "block" }}
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
            markerEnd="url(#arrowhead)"
          />
        ) : null
      )}
      <defs>
        <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
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
            fontSize={11}
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
              fontSize={9.5}
              fill="currentColor"
              opacity={0.7}
            >
              {line}
            </text>
          ))}
        </g>
      ))}
    </svg>
  );
}

export default function AirLenet() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        &ldquo;AI 발전 지도&rdquo; 시리즈 Ⅵ — SVM은 볼록 최적화로 이론적
        보장을 얻었지만, 커널·특징을 사람이 직접 설계해야 한다는 한계를
        남겼다. 얀 르쿤 등은 오히려 반대 방향 — 손으로 특징을 설계하지
        않고 이미지 원본에서 신경망이 직접 특징을 학습하도록 — 을 택해,
        1998년 문서·필기체 인식에 실전 배치된 최초의 합성곱 신경망
        LeNet-5를 완성했다.
      </p>

      <CalcBox title="■ 한눈에">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="text-xs text-muted mb-1">출처</div>
            <div className="font-medium">
              Y. LeCun, L. Bottou, Y. Bengio, P. Haffner (1998),
              &ldquo;Gradient-Based Learning Applied to Document
              Recognition,&rdquo; <em>Proceedings of the IEEE</em>, 86(11),
              2278–2324.
            </div>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="text-xs text-muted mb-1">한 줄 기여</div>
            <div className="font-medium">
              합성곱·서브샘플링·완전연결을 층층이 쌓아 이미지에서 특징을
              스스로 학습하는 LeNet-5를 제시하고, 실제 은행 수표 판독
              시스템에 배치.
            </div>
          </div>
        </div>
      </CalcBox>

      <CalcBox title="■ 핵심 아이디어 — 원문·번역·해설">
        <SubSection title="● 문제의식: 완전연결 신경망은 이미지에 맞지 않는다">
          <blockquote className="border-l-4 border-sidebar-border pl-4 italic text-sm text-muted my-3">
            &ldquo;Convolutional Neural Networks, which are specifically
            designed to deal with the variability of 2D shapes, are shown
            to outperform all other techniques.&rdquo;
          </blockquote>
          <p className="text-sm text-muted mb-3">
            <strong>번역</strong> — &ldquo;2차원 형태의 변형(variability)을
            다루도록 특별히 설계된 합성곱 신경망이, 다른 모든 기법을
            능가함이 확인되었다.&rdquo;
          </p>
          <p>
            당시 표준이던 완전연결(fully-connected) 다층 신경망은 입력
            이미지를 한 줄로 펼쳐 넣기 때문에, 같은 숫자라도 위치가 한
            픽셀만 옮겨져도 전혀 다른 입력으로 취급했다. 또한 모든
            픽셀-뉴런 쌍마다 독립된 가중치를 가져 파라미터 수가 폭발하고,
            학습 데이터가 본 적 없는 위치·크기·기울기 변형에 취약했다.
            LeCun 등은 이미지가 가진 &ldquo;근접 픽셀끼리 상관관계가
            높다&rdquo;, &ldquo;같은 패턴이 위치를 바꿔 여러 곳에
            나타난다&rdquo;는 구조적 사전 지식을 아키텍처 자체에
            새겨넣는 방향을 택했다.
          </p>
        </SubSection>

        <SubSection title="● 합성곱과 가중치 공유: 지역 수용장">
          <p className="mb-3">
            C1·C3 같은 합성곱 층은 이미지 전체가 아니라 작은 지역(예:
            5×5 &ldquo;지역 수용장(local receptive field)&rdquo;)만 보는
            뉴런들로 구성되고, 같은 층 안의 모든 뉴런이 <strong>동일한
            가중치(커널)</strong>를 공유한다. 그 결과 하나의 패턴(예: 세로
            선)을 이미지 어디서 찾든 같은 가중치가 재사용되어, ①
            파라미터 수가 크게 줄고 ② 패턴이 이동해도 같은 방식으로
            검출되는 <strong>이동 불변성(shift invariance)</strong>이
            생긴다. 이 가중치 공유 자체가 곧 &ldquo;합성곱
            연산(convolution)&rdquo;이며, 커널 하나가 이미지 전체를 훑어
            하나의 특징 지도(feature map)를 만든다.
          </p>
        </SubSection>

        <SubSection title="● 서브샘플링과 계층 구조: 점점 추상적인 특징">
          <blockquote className="border-l-4 border-sidebar-border pl-4 italic text-sm text-muted my-3">
            &ldquo;LeNet-5 comprises seven layers, not counting the input,
            all of which contain trainable parameters (weights).&rdquo;
          </blockquote>
          <p className="text-sm text-muted mb-3">
            <strong>번역</strong> — &ldquo;LeNet-5는 입력을 제외하고 일곱
            개의 층으로 구성되며, 그 모두가 학습 가능한 파라미터(가중치)를
            갖는다.&rdquo;
          </p>
          <p>
            C1(합성곱) 다음에는 S2(서브샘플링, 오늘날의 풀링) 층이 와서
            특징 지도의 해상도를 절반으로 줄인다. 이 과정을 C3·S4로
            한 번 더 반복하면, 뒤로 갈수록 <InlineMath math="6 \to 16" />
            개로 특징 지도 개수는 늘고 공간 해상도는 줄어 — 낮은 층은
            &ldquo;모서리·선&rdquo; 같은 저수준 패턴을, 깊은 층은 그것을
            조합한 &ldquo;고리·꼭짓점&rdquo; 같은 고수준 패턴을 검출하는
            계층적 표현이 만들어진다. 마지막 C5·F6은 사실상 완전연결
            층으로, 그때까지 뽑힌 특징을 종합해 10개 숫자 클래스에 대한
            점수(RBF 단위)로 매핑한다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ LeNet-5 아키텍처 — 7개 층의 흐름">
        <p className="mb-4">
          32×32 입력(28×28 숫자 이미지를 여백을 두고 배치)이 합성곱(C)과
          서브샘플링(S)을 번갈아 거치며 공간 해상도는 줄고 특징 지도
          개수는 늘어난다. 마지막 완전연결(F6)과 출력층이 10개 숫자
          클래스 중 하나를 판별한다.
        </p>
        <LeNetDiagram />
      </CalcBox>

      <CalcBox title="■ 의미와 한계">
        <SubSection title="● 기여">
          <p>
            ① 합성곱·서브샘플링·비선형성을 쌓은 구조로, 사람이 특징을
            설계하지 않고도 <strong>역전파만으로 이미지 특징을 스스로
            학습</strong>할 수 있음을 실증. ② 가중치 공유로 파라미터
            수를 줄여 당시 하드웨어로도 학습 가능한 크기를 유지하면서
            이동·왜곡에 견고한 인식 성능을 확보. ③ 실험실 성능에
            그치지 않고, 은행 수표의 손글씨 금액을 읽는 실제 상용
            시스템(미국에서 수표 상당수를 처리)으로 배치되어 CNN이
            &ldquo;산업에서 통한다&rdquo;는 것을 처음 증명.
          </p>
        </SubSection>
        <SubSection title="● 한계 — 얕은 네트워크와 부족한 데이터·연산">
          <p>
            LeNet-5는 층이 얕고(7층), 다룬 이미지도 32×32의 작은 흑백
            숫자였다. 자연 이미지처럼 크고 복잡한 컬러 이미지, 수백 개
            클래스로 확장하려면 훨씬 깊은 네트워크와 훨씬 많은 학습
            데이터·연산이 필요했지만, 1990년대 말~2000년대 컴퓨터
            성능과 대규모 라벨 데이터셋 모두 아직 갖춰지지 않아 CNN
            연구는 한동안 정체된다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 발전 사슬에서의 위치">
        <p className="mb-3">
          이전 leaf(<strong>Ⅴ. SVM</strong>): 볼록 최적화로 이론적 보장을
          갖춘 분류기를 제공했지만, 특징·커널을 사람이 설계해야 하는
          표현 학습의 부재가 한계였다.
        </p>
        <p>
          <strong>이 기술이 푼 문제</strong>: 합성곱·가중치 공유·
          서브샘플링으로 이미지 특징을 데이터로부터 직접 학습하고,
          이동·왜곡에 강인한 인식기를 실전에 배치. →{" "}
          <strong>남긴 한계</strong>: 얕은 구조와 당시의 연산·데이터
          부족으로 작은 흑백 이미지 이상으로 확장되지 못함. →{" "}
          <strong>다음 leaf(Ⅶ. AlexNet)로 이어짐</strong>: 2012년 GPU
          연산과 ImageNet 규모의 데이터가 갖춰지면서, LeNet과 같은 CNN
          구조가 훨씬 깊고 크게 확장되어 딥러닝 빅뱅을 일으킨다.
        </p>
        <Insight>
          LeNet-5의 합성곱·풀링·완전연결이라는 3종 조합은 30년 가까이
          지난 지금도 CNN 설계의 기본 골격으로 남아있다 — 바뀐 것은
          층 수·연산량·데이터 규모이지, 핵심 아이디어(지역 수용장 +
          가중치 공유 + 계층적 특징 학습)는 그대로다.
        </Insight>
      </CalcBox>
    </div>
  );
}
