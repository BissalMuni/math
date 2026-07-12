"use client";

import { BlockMath, InlineMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

interface ErrorBar {
  label: string;
  value: number;
  fill: string;
}

// ImageNet 검증셋 top-1 오류율(%, 10-crop) — He et al. 2015 논문 Table 2 보고 수치.
// plain-34가 plain-18보다 오류율이 높은 것(degradation)과, ResNet-34가 ResNet-18·plain-34를 모두 앞서는 역전 현상을 대비.
const ERROR_BARS: ErrorBar[] = [
  { label: "일반 18층 (plain-18)", value: 27.94, fill: "#94a3b8" },
  { label: "일반 34층 (plain-34)", value: 28.54, fill: "#94a3b8" },
  { label: "ResNet-18", value: 27.88, fill: "#3b82f6" },
  { label: "ResNet-34", value: 25.03, fill: "#2563eb" },
];

function ErrorComparisonChart() {
  const chartWidth = 400;
  const barHeight = 26;
  const gap = 20;
  const maxValue = 32;
  const scale = (chartWidth - 150) / maxValue;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${chartWidth} ${ERROR_BARS.length * (barHeight + gap)}`}
      style={{ maxWidth: 480, margin: "0 auto", display: "block" }}
    >
      {ERROR_BARS.map((bar, i) => {
        const y = i * (barHeight + gap) + gap / 2;
        return (
          <g key={bar.label}>
            <text x={0} y={y + barHeight / 2 + 4} fontSize={10.5} fill="currentColor">
              {bar.label}
            </text>
            <rect
              x={150}
              y={y}
              width={bar.value * scale}
              height={barHeight}
              fill={bar.fill}
              fillOpacity={0.8}
              rx={3}
            />
            <text
              x={150 + bar.value * scale + 8}
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

function ResidualBlockDiagram() {
  return (
    <svg
      width="100%"
      viewBox="0 0 320 260"
      style={{ maxWidth: 320, margin: "0 auto", display: "block" }}
    >
      <defs>
        <marker id="arrowhead-resnet" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" opacity={0.5} />
        </marker>
      </defs>

      {/* 입력 x */}
      <text x={160} y={18} textAnchor="middle" fontSize={13} fontWeight={700} fill="currentColor">
        x
      </text>
      <line x1={160} y1={26} x2={160} y2={48} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.5} markerEnd="url(#arrowhead-resnet)" />

      {/* weight layer 1 */}
      <rect x={95} y={50} width={130} height={32} rx={4} fill="#3b82f6" fillOpacity={0.75} />
      <text x={160} y={70} textAnchor="middle" fontSize={11} fill="#fff">weight layer</text>
      <line x1={160} y1={82} x2={160} y2={100} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.5} markerEnd="url(#arrowhead-resnet)" />

      <text x={160} y={98} textAnchor="middle" fontSize={10} fill="currentColor" opacity={0.7}>ReLU</text>

      {/* weight layer 2 */}
      <rect x={95} y={102} width={130} height={32} rx={4} fill="#3b82f6" fillOpacity={0.75} />
      <text x={160} y={122} textAnchor="middle" fontSize={11} fill="#fff">weight layer</text>
      <line x1={160} y1={134} x2={160} y2={156} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.5} markerEnd="url(#arrowhead-resnet)" />

      <text x={190} y={148} textAnchor="start" fontSize={11} fontStyle="italic" fill="currentColor" opacity={0.8}>F(x)</text>

      {/* skip connection: x가 옆으로 크게 돌아 합류 */}
      <path
        d="M 160,26 C 260,26 260,166 190,166"
        fill="none"
        stroke="#ef4444"
        strokeOpacity={0.75}
        strokeWidth={1.5}
        markerEnd="url(#arrowhead-resnet)"
      />
      <text x={252} y={96} textAnchor="middle" fontSize={10} fill="#ef4444" opacity={0.85}>identity</text>

      {/* + 합산 노드 */}
      <circle cx={160} cy={166} r={11} fill="none" stroke="currentColor" strokeWidth={1.5} />
      <text x={160} y={170} textAnchor="middle" fontSize={13} fill="currentColor">+</text>

      <line x1={160} y1={177} x2={160} y2={198} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.5} markerEnd="url(#arrowhead-resnet)" />
      <text x={160} y={214} textAnchor="middle" fontSize={10} fill="currentColor" opacity={0.7}>ReLU</text>

      <text x={160} y={238} textAnchor="middle" fontSize={13} fontWeight={700} fill="currentColor">
        F(x) + x
      </text>
    </svg>
  );
}

export default function AirResnet() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        &ldquo;AI 발전 지도&rdquo; 시리즈 Ⅷ — AlexNet은 &ldquo;깊은 CNN +
        대규모 데이터 + GPU&rdquo;로 딥러닝 시대를 열었지만, 층을 더
        쌓으면 성능이 오히려 나빠지는 현상이 곧 한계로 드러났다. 2015년,
        허카이밍 등 마이크로소프트 리서치 팀은 이 현상이 과적합이
        아니라 &ldquo;최적화의 어려움&rdquo;임을 밝히고, 잔차
        연결(residual connection)이라는 단순한 장치로 152층까지도
        안정적으로 학습시켜 ILSVRC-2015를 우승했다.
      </p>

      <CalcBox title="■ 한눈에">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="text-xs text-muted mb-1">출처</div>
            <div className="font-medium">
              K. He, X. Zhang, S. Ren, J. Sun (2015), &ldquo;Deep Residual
              Learning for Image Recognition,&rdquo; arXiv:1512.03385
              (CVPR 2016).
            </div>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="text-xs text-muted mb-1">한 줄 기여</div>
            <div className="font-medium">
              입력을 그대로 더해 보내는 &ldquo;shortcut connection&rdquo;으로
              층 <InlineMath math="F(x)" />가 <InlineMath math="0" />에
              가까워지기만 해도 항등함수를 학습할 수 있게 만들어, 152층
              네트워크도 안정적으로 학습시키고 ILSVRC-2015 분류·검출·인식
              전 부문을 석권.
            </div>
          </div>
        </div>
      </CalcBox>

      <CalcBox title="■ 핵심 아이디어 — 원문·번역·해설">
        <SubSection title="● 문제의식: 깊이의 역설 — 더 쌓을수록 나빠진다">
          <blockquote className="border-l-4 border-sidebar-border pl-4 italic text-sm text-muted my-3">
            &ldquo;When deeper networks are able to start converging, a
            degradation problem has been exposed: with the network depth
            increasing, accuracy gets saturated ... and then degrades
            rapidly. ... such degradation is not caused by
            overfitting.&rdquo;
          </blockquote>
          <p className="text-sm text-muted mb-3">
            <strong>번역</strong> — &ldquo;더 깊은 네트워크가 수렴을 시작할
            수 있게 되면, 성능 저하(degradation) 문제가 드러난다 — 네트워크
            깊이가 늘어남에 따라 정확도가 포화되다가 급격히
            나빠진다. ... 이 성능 저하는 과적합 때문이 아니다.&rdquo;
          </p>
          <p>
            AlexNet 이후 연구자들은 &ldquo;층을 더 쌓으면 더 잘 배우지
            않을까&rdquo;라고 기대했지만, 실제로는 56층 일반 CNN이 20층
            CNN보다 <strong>학습 데이터에서조차</strong> 오류율이 더
            높았다. 검증 성능이 아니라 학습 성능이 나빠졌다는 것은
            과적합(모델이 학습 데이터를 과도하게 외운 것)이 원인이 아니라,
            깊은 네트워크를 <strong>최적화 자체가 어렵다</strong>는 뜻이었다
            — 저자들은 이를 &ldquo;성능 저하 문제&rdquo;로 명명하고, 이것이
            바로 ResNet이 풀어야 할 문제라고 정의했다.
          </p>
        </SubSection>

        <SubSection title="● 잔차 학습: H(x) 대신 F(x) = H(x) − x 를 배운다">
          <blockquote className="border-l-4 border-sidebar-border pl-4 italic text-sm text-muted my-3">
            &ldquo;Instead of hoping each few stacked layers directly fit a
            desired underlying mapping, we explicitly let these layers fit a
            residual mapping. ... it is easier to optimize the residual
            mapping than to optimize the original, unreferenced
            mapping.&rdquo;
          </blockquote>
          <p className="text-sm text-muted mb-3">
            <strong>번역</strong> — &ldquo;몇 개의 층으로 이루어진 블록이
            원하는 근본 매핑을 곧바로 맞추기를 바라는 대신, 우리는 이
            층들이 명시적으로 잔차(residual) 매핑을 맞추도록 한다. ...
            원본의 참조 없는 매핑을 최적화하는 것보다 잔차 매핑을
            최적화하는 것이 더 쉽다.&rdquo;
          </p>
          <p className="mb-3">
            몇 개 층이 원하는 함수 <InlineMath math="H(x)" />를 직접
            배우게 하는 대신, 그 층들에게 <InlineMath math="F(x) := H(x) - x" />{" "}
            즉 <strong>차이(잔차)</strong>만 배우게 하고, 최종 출력은{" "}
            <InlineMath math="F(x) + x" />로 만든다.
          </p>
          <BlockMath math="H(x) = F(x) + x \quad\Longleftrightarrow\quad F(x) = H(x) - x" />
          <p>
            극단적인 경우, 항등함수 <InlineMath math="H(x) = x" />가
            최선이라면 일반 네트워크는 여러 비선형 층으로 이를 정교하게
            근사해야 하지만, 잔차 형태에서는 그저{" "}
            <InlineMath math="F(x) \to 0" />으로 만들면 된다 — 가중치를
            0에 가깝게 미는 것이 항등함수를 흉내내는 것보다 훨씬 쉬운
            최적화 문제이기 때문에, 깊은 네트워크도 &ldquo;최소한 얕은
            네트워크만큼은&rdquo; 학습되도록 보장된다.
          </p>
        </SubSection>

        <SubSection title="● shortcut connection: 파라미터도 연산량도 추가 없이 구현">
          <blockquote className="border-l-4 border-sidebar-border pl-4 italic text-sm text-muted my-3">
            &ldquo;The identity shortcut connections add neither extra
            parameter nor computational complexity.&rdquo;
          </blockquote>
          <p className="text-sm text-muted mb-3">
            <strong>번역</strong> — &ldquo;항등 shortcut 연결은 추가
            파라미터도, 추가 연산 복잡도도 더하지 않는다.&rdquo;
          </p>
          <p>
            <InlineMath math="F(x)+x" />는 몇 개 층을 건너뛰어 입력{" "}
            <InlineMath math="x" />를 출력에 그대로 더하는{" "}
            <strong>shortcut(skip) connection</strong>으로 구현된다.
            더하는 연산은 원소별(element-wise) 덧셈 하나뿐이라 학습할
            가중치가 전혀 늘지 않으며, 이 블록을 &ldquo;쌓기만&rdquo;
            해도 네트워크를 깊게 만들 수 있다 — 구조가 단순해 일반 CNN
            프레임워크로 별도 수정 없이 구현 가능하다는 점도 빠르게 널리
            퍼진 이유 중 하나였다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ Residual Block 구조">
        <p className="mb-4">
          입력 <InlineMath math="x" />가 두 개의 가중치 층(+ReLU)을 거쳐{" "}
          <InlineMath math="F(x)" />가 되는 동시에, shortcut 경로를 통해{" "}
          <InlineMath math="x" /> 자신도 그대로 합류 지점까지 전달된다.
          둘을 더한 <InlineMath math="F(x) + x" />에 마지막 ReLU를 적용한
          것이 이 블록의 출력이다.
        </p>
        <ResidualBlockDiagram />
      </CalcBox>

      <CalcBox title="■ 실험 결과 — 깊이의 역설이 사라지다">
        <p className="mb-4">
          ImageNet 검증셋에서, 일반(plain) CNN은 34층이 18층보다 오류율이
          더 높아 성능 저하 문제를 그대로 드러낸다. 반면 같은 구조에
          shortcut만 추가한 ResNet은 34층이 18층보다, 그리고 일반
          34층보다도 더 낮은 오류율을 기록한다 — &ldquo;더 깊을수록
          나빠진다&rdquo;는 역설이 shortcut 하나로 해소됨을 보여준다.
        </p>
        <ErrorComparisonChart />
        <p className="text-sm text-muted mt-4">
          이 구조를 152층까지 확장한 앙상블 모델은 ImageNet 테스트셋에서
          top-5 오류율 3.57%를 기록해 ILSVRC-2015 이미지 분류 부문
          1위를 차지했다 — VGG 계열(최대 19층)보다 8배 깊으면서도 연산
          복잡도는 더 낮았고, 같은 해 ImageNet 검출·인식, COCO
          검출·분할 부문에서도 모두 1위를 휩쓸었다.
        </p>
      </CalcBox>

      <CalcBox title="■ 의미와 한계">
        <SubSection title="● 기여">
          <p>
            ① 네트워크가 깊어질수록 성능이 나빠지는 현상이 과적합이 아닌
            최적화 난이도의 문제임을 규명. ② 잔차 학습이라는 단순한
            재구성만으로 이 문제를 해소해, 수십~수백 층 네트워크도
            안정적으로 학습 가능함을 실증. ③ shortcut connection은
            파라미터·연산량 증가가 없어 이후 사실상 모든 딥러닝
            아키텍처(트랜스포머 포함)의 표준 구성 요소로 자리잡음.
          </p>
        </SubSection>
        <SubSection title="● 한계 — 왜 잘 되는지는 경험적 관찰">
          <p>
            논문은 잔차 연결이 성능 저하를 해소한다는 것을 실험으로
            강하게 보였지만, &ldquo;왜 최적화가 쉬워지는가&rdquo;에 대한
            엄밀한 이론적 설명은 이후 연구 과제로 남았다. 또한 CNN
            기반의 이미지 인식 문제에 집중했을 뿐, 이 시점까지도 이미지가
            아닌 순차 데이터(텍스트·시계열)를 다루는 순환 신경망 계열의
            &ldquo;장기 의존성 학습&rdquo; 문제는 별도로 남아 있었다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 발전 사슬에서의 위치">
        <p className="mb-3">
          이전 leaf(<strong>Ⅶ. AlexNet</strong>): 깊은 CNN이 대규모 데이터와
          GPU로 압도적 성능을 낼 수 있음을 보였지만, 층을 더 쌓으면
          학습이 불안정해지는 성능 저하 문제가 새로운 한계로 드러났다.
        </p>
        <p>
          <strong>이 기술이 푼 문제</strong>: shortcut connection으로
          잔차 <InlineMath math="F(x) = H(x) - x" />만 학습하게 만들어,
          152층까지도 안정적으로 학습시키고 ILSVRC-2015를 석권. →{" "}
          <strong>남긴 한계</strong>: 이미지 인식(CNN) 영역의 깊이
          문제는 풀었지만, 순차 데이터를 다루는 순환 신경망은 여전히
          &ldquo;오래된 정보를 기억하지 못하는&rdquo; 별도의 장기 의존성
          문제를 안고 있었다. →{" "}
          <strong>다음 leaf(Ⅸ. LSTM)로 이어짐</strong>: 게이트 구조로
          정보를 선택적으로 기억·망각시켜, 순환 신경망의 장기 의존성
          문제를 다루는 방법이 이미 1997년에 제안되어 있었고, 이후
          시퀀스 모델링의 표준이 된다.
        </p>
        <Insight>
          ResNet의 shortcut connection은 &ldquo;더 어려운 문제를 직접
          풀지 말고, 이미 아는 답(항등함수)에서 얼마나 벗어나는지만
          배우게 하라&rdquo;는 아이디어다. 이후 트랜스포머의 residual
          connection·LayerNorm 배치 등, &ldquo;깊은 네트워크를 안정적으로
          쌓는 법&rdquo;은 대부분 이 원리 위에 세워진다.
        </Insight>
      </CalcBox>
    </div>
  );
}
