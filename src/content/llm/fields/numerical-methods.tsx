"use client";

import { InlineMath, BlockMath } from "@/components/math-formula";

export default function NumericalMethods() {
  return (
    <div className="space-y-8">
      <section id="floating-point">
        <h2 className="text-xl font-semibold mb-3">부동소수점 산술 (Floating Point Arithmetic)</h2>
        <p>LLM에서는 다양한 정밀도를 사용합니다.</p>
        <div className="mt-3 overflow-x-auto">
          <table className="text-sm border-collapse w-full">
            <thead>
              <tr className="border-b border-sidebar-border">
                <th className="text-left p-2">형식</th>
                <th className="text-left p-2">비트</th>
                <th className="text-left p-2">용도</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-sidebar-border"><td className="p-2">FP32</td><td className="p-2">32</td><td className="p-2">학습 (기본)</td></tr>
              <tr className="border-b border-sidebar-border"><td className="p-2">FP16</td><td className="p-2">16</td><td className="p-2">Mixed Precision 학습</td></tr>
              <tr className="border-b border-sidebar-border"><td className="p-2">BF16</td><td className="p-2">16</td><td className="p-2">LLM 학습 (범위 넓음)</td></tr>
              <tr className="border-b border-sidebar-border"><td className="p-2">INT8</td><td className="p-2">8</td><td className="p-2">양자화 추론</td></tr>
              <tr><td className="p-2">INT4</td><td className="p-2">4</td><td className="p-2">극단적 양자화 (GPTQ, AWQ)</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 수치해석</p>
      </section>

      <section id="numerical-stability">
        <h2 className="text-xl font-semibold mb-3">수치 안정성 (Numerical Stability)</h2>
        <p>Softmax의 오버플로를 방지하기 위해 max를 빼는 트릭을 사용합니다.</p>
        <BlockMath math="\text{softmax}(x_i) = \frac{e^{x_i - \max(\mathbf{x})}}{\sum_j e^{x_j - \max(\mathbf{x})}}" />
        <div className="mt-3 rounded-lg bg-accent-light p-4 text-sm">
          <strong>LogSumExp 트릭:</strong> log-softmax를 직접 계산하여 언더플로도 방지합니다.
        </div>
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 수치해석</p>
      </section>

      <section id="lora">
        <h2 className="text-xl font-semibold mb-3">행렬 분해 / LoRA (Low-Rank Adaptation)</h2>
        <p>가중치 업데이트를 저랭크 행렬 2개의 곱으로 근사합니다. 파라미터 수를 극적으로 절감합니다.</p>
        <BlockMath math="W' = W + \Delta W = W + BA" />
        <p className="text-sm text-muted">
          B ∈ ℝ<sup>d×r</sup>, A ∈ ℝ<sup>r×d</sup>, r ≪ d
        </p>
        <div className="mt-3 rounded-lg bg-accent-light p-4 text-sm">
          <strong>파라미터 절감:</strong> 원래 <InlineMath math="d^2" />개 → LoRA: <InlineMath math="2dr" />개 (r=8이면 원래의 ~0.1%)
        </div>
        <p className="mt-2 text-sm text-muted">교육과정: 대학교 수치해석/선형대수</p>
      </section>
    </div>
  );
}
