"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";

export default function Quantization() {
  return (
    <div className="space-y-8">
      <p className="text-muted">FP32 가중치를 INT8/INT4로 압축합니다. 메모리와 추론 속도를 개선합니다.</p>

      <section>
        <h2 className="text-xl font-semibold mb-3">선형 양자화 (Linear Quantization)</h2>
        <BlockMath math="x_q = \text{round}\left(\frac{x}{\text{scale}} + \text{zero\_point}\right)" />
        <BlockMath math="\text{scale} = \frac{x_{\max} - x_{\min}}{2^b - 1}" />
        <p className="text-sm text-muted">b: 비트 수</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">양자화 오차</h2>
        <p>역양자화 시 오차가 발생합니다:</p>
        <BlockMath math="\hat{x} = (x_q - \text{zero\_point}) \times \text{scale}" />
        <BlockMath math="\text{오차} = |x - \hat{x}| \leq \frac{\text{scale}}{2}" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">주요 방법</h2>
        <div className="overflow-x-auto">
          <table className="text-sm border-collapse w-full">
            <thead>
              <tr className="border-b border-sidebar-border">
                <th className="text-left p-2">방법</th>
                <th className="text-left p-2">비트</th>
                <th className="text-left p-2">특징</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-sidebar-border"><td className="p-2">GPTQ</td><td className="p-2">INT4</td><td className="p-2">역헤시안 기반 최적 양자화</td></tr>
              <tr className="border-b border-sidebar-border"><td className="p-2">AWQ</td><td className="p-2">INT4</td><td className="p-2">가중치 중요도 기반</td></tr>
              <tr><td className="p-2">bitsandbytes</td><td className="p-2">INT8</td><td className="p-2">Mixed-Precision 추론</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
