"use client";

import { InlineMath, BlockMath } from "@/components/math-formula";

export default function Calculus() {
  return (
    <div className="space-y-8">
      <section id="partial-derivative">
        <h2 className="text-xl font-semibold mb-3">편미분 (Partial Derivative)</h2>
        <p>역전파(Backpropagation)의 핵심입니다. 손실 함수를 각 가중치에 대해 편미분하여 그래디언트를 계산합니다.</p>
        <BlockMath math="\frac{\partial f}{\partial x_i}" />
        <p className="text-sm text-muted">다른 변수를 고정하고 x_i에 대해 미분</p>
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 다변수 미적분학</p>
      </section>

      <section id="chain-rule">
        <h2 className="text-xl font-semibold mb-3">연쇄 법칙 (Chain Rule)</h2>
        <p>역전파 알고리즘의 수학적 기반입니다. 합성 함수의 미분을 레이어별로 전파합니다.</p>
        <BlockMath math="\frac{df}{dx} = \frac{df}{dg} \times \frac{dg}{dx}" />
        <p className="mt-2">다변수 확장:</p>
        <BlockMath math="\frac{\partial L}{\partial w} = \frac{\partial L}{\partial y} \cdot \frac{\partial y}{\partial w}" />
        <p className="mt-2 text-sm text-muted">교육과정: 고등학교 미적분Ⅱ / 대학교</p>
      </section>

      <section id="gradient">
        <h2 className="text-xl font-semibold mb-3">그래디언트 (Gradient)</h2>
        <p>모든 파라미터에 대한 손실 함수의 편미분 벡터입니다. 파라미터 업데이트 방향을 결정합니다.</p>
        <BlockMath math="\nabla f = \left(\frac{\partial f}{\partial x_1}, \frac{\partial f}{\partial x_2}, \ldots, \frac{\partial f}{\partial x_n}\right)" />
        <p className="mt-2">파라미터 업데이트:</p>
        <BlockMath math="\theta \leftarrow \theta - \eta \nabla L" />
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 다변수 미적분학</p>
      </section>

      <section id="exponential">
        <h2 className="text-xl font-semibold mb-3">지수 함수 (Exponential Function)</h2>
        <p>Softmax 함수의 핵심 구성요소입니다. 확률 분포를 생성합니다.</p>
        <BlockMath math="\text{softmax}(x_i) = \frac{e^{x_i}}{\sum_j e^{x_j}}" />
        <p className="mt-2 text-sm text-muted">교육과정: 고등학교 대수</p>
      </section>

      <section id="logarithm">
        <h2 className="text-xl font-semibold mb-3">로그 함수 (Logarithm)</h2>
        <p>Cross-Entropy Loss에서 log 확률을 계산합니다. Log-softmax로 수치 안정성을 확보합니다.</p>
        <BlockMath math="L = -\sum y \cdot \log(\hat{y})" />
        <p className="mt-2 text-sm text-muted">교육과정: 고등학교 대수</p>
      </section>

      <section id="taylor-series">
        <h2 className="text-xl font-semibold mb-3">테일러 급수 (Taylor Series)</h2>
        <p>GELU 등 활성화 함수의 근사와 최적화 알고리즘의 이론적 분석에 사용됩니다.</p>
        <BlockMath math="f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x - a)^n" />
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 미적분학</p>
      </section>
    </div>
  );
}
