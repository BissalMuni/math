"use client";

import { useState } from "react";
import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

const SVG_W = 500;
const SVG_H = 160;
const SVG_CY = SVG_H / 2;

function makeSinePath(amp: number, cycles: number): string {
  const steps = 400;
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const x = t * SVG_W;
    const y = SVG_CY - amp * Math.sin(t * cycles * 2 * Math.PI);
    return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
}

/** Ⅰ. 파동·파장·진폭 */
export default function WaveBasicsContent() {
  const [amp, setAmp] = useState(50);
  const [cycles, setCycles] = useState(2);
  const waveLen = SVG_W / cycles;

  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        무선통신의 출발점은 파동입니다. 파장과 진폭이 무엇이고, 왜 독립적인 개념인지 이해합니다.
      </p>

      <CalcBox title="■ 파동이란">
        <p className="text-sm mb-4">
          파동은 에너지가 공간을 따라 전달되는 현상입니다.
          물결, 소리, 빛, 전파 모두 파동입니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-4 text-sm">
          <label className="flex flex-col gap-1.5 flex-1">
            <span>진폭: <strong>{amp}</strong></span>
            <input
              type="range" min={15} max={65} value={amp}
              onChange={e => setAmp(Number(e.target.value))}
              style={{ accentColor: "#ef4444" }}
            />
          </label>
          <label className="flex flex-col gap-1.5 flex-1">
            <span>파장 수 (주기): <strong>{cycles}</strong></span>
            <input
              type="range" min={1} max={5} step={0.5} value={cycles}
              onChange={e => setCycles(Number(e.target.value))}
              style={{ accentColor: "#8b5cf6" }}
            />
          </label>
        </div>

        <div className="rounded-lg overflow-hidden border border-sidebar-border bg-sidebar-bg">
          <svg
            width="100%"
            viewBox={`0 0 ${SVG_W} ${SVG_H + 52}`}
            style={{ display: "block" }}
          >
            {/* 중심 기준선 */}
            <line
              x1="0" y1={SVG_CY} x2={SVG_W} y2={SVG_CY}
              stroke="currentColor" strokeOpacity="0.2" strokeWidth="1"
            />

            {/* 사인파 */}
            <path
              d={makeSinePath(amp, cycles)}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* 진폭 주석: 중심 ↕ 정점 (빨강) */}
            <line
              x1="22" y1={SVG_CY - amp}
              x2="22" y2={SVG_CY + amp}
              stroke="#ef4444" strokeWidth="1.5"
            />
            {/* 위쪽 화살촉 */}
            <polygon
              points={`16,${SVG_CY - amp + 9} 22,${SVG_CY - amp} 28,${SVG_CY - amp + 9}`}
              fill="#ef4444"
            />
            {/* 아래쪽 화살촉 */}
            <polygon
              points={`16,${SVG_CY + amp - 9} 22,${SVG_CY + amp} 28,${SVG_CY + amp - 9}`}
              fill="#ef4444"
            />
            <text
              x="32" y={SVG_CY}
              fill="#ef4444" fontSize="12" dominantBaseline="middle"
            >
              진폭 A
            </text>

            {/* 파장 주석: 한 주기 폭 (보라) */}
            <line
              x1="6" y1={SVG_H + 18}
              x2={waveLen - 6} y2={SVG_H + 18}
              stroke="#8b5cf6" strokeWidth="1.5"
            />
            {/* 왼쪽 화살촉 */}
            <polygon
              points={`${6 + 9},${SVG_H + 12} 6,${SVG_H + 18} ${6 + 9},${SVG_H + 24}`}
              fill="#8b5cf6"
            />
            {/* 오른쪽 화살촉 */}
            <polygon
              points={`${waveLen - 6 - 9},${SVG_H + 12} ${waveLen - 6},${SVG_H + 18} ${waveLen - 6 - 9},${SVG_H + 24}`}
              fill="#8b5cf6"
            />
            {/* 눈금선 */}
            <line x1="6" y1={SVG_H + 8} x2="6" y2={SVG_H + 28} stroke="#8b5cf6" strokeWidth="1" />
            <line x1={waveLen - 6} y1={SVG_H + 8} x2={waveLen - 6} y2={SVG_H + 28} stroke="#8b5cf6" strokeWidth="1" />
            <text
              x={waveLen / 2} y={SVG_H + 44}
              fill="#8b5cf6" fontSize="12" textAnchor="middle"
            >
              파장 λ
            </text>
          </svg>
        </div>

        <p className="text-xs text-muted mt-2">
          슬라이더를 움직여 진폭(붉은 화살표)과 파장(보라 화살표)이 각각 독립적으로 변하는 것을 확인하세요.
        </p>
      </CalcBox>

      <CalcBox title="■ 파장과 진폭">
        <SubSection title="● 파장 (λ, wavelength)">
          <p className="text-sm mb-2">
            파동 한 주기의 길이(가로). 짧을수록 고주파입니다.
          </p>
          <BlockMath math="\lambda = \frac{c}{f}" />
          <p className="text-sm text-muted mt-2">
            <InlineMath math="c" /> = 빛의 속도(3×10⁸ m/s), <InlineMath math="f" /> = 주파수(Hz)
          </p>
        </SubSection>
        <SubSection title="● 진폭 (Amplitude)">
          <p className="text-sm mb-2">
            파동의 높이(세로). 클수록 신호가 강합니다.
            송신 출력(전력)을 높이면 진폭이 커집니다.
          </p>
        </SubSection>
        <SubSection title="● 둘은 독립적">
          <div className="text-sm space-y-1">
            <p>• 파장 짧고 진폭 큼 → 고주파 + 강한 신호</p>
            <p>• 파장 짧고 진폭 작음 → 고주파 + 약한 신호</p>
            <p>• 파장 길고 진폭 큼 → 저주파 + 강한 신호</p>
          </div>
          <Insight>
            주파수를 높인다고 진폭이 자동으로 바뀌지 않습니다.
            완전히 별개로 조절 가능합니다.
          </Insight>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 주파수와 파장의 관계">
        <p className="text-sm mb-3">주파수와 파장은 반비례합니다.</p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 mb-3">
          <pre>{`저주파 (AM 라디오)
〜〜〜〜〜〜〜〜〜〜〜〜
파장이 길다 = 1초에 적게 진동

고주파 (5G 밀리미터파)
/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\
파장이 짧다 = 1초에 많이 진동`}</pre>
        </div>
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm mt-4">
          <div className="bg-accent-light px-4 py-2 font-semibold">실제 예시</div>
          <table className="w-full text-sm">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">대역</th>
                <th className="px-3 py-2 text-left">주파수</th>
                <th className="px-3 py-2 text-left">파장</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2">AM 라디오</td><td className="px-3 py-2">1 MHz</td><td className="px-3 py-2">300m</td></tr>
              <tr><td className="px-3 py-2">FM 라디오</td><td className="px-3 py-2">100 MHz</td><td className="px-3 py-2">3m</td></tr>
              <tr><td className="px-3 py-2">4G LTE</td><td className="px-3 py-2">1.8 GHz</td><td className="px-3 py-2">17cm</td></tr>
              <tr><td className="px-3 py-2">5G mmWave</td><td className="px-3 py-2">28 GHz</td><td className="px-3 py-2">1cm</td></tr>
            </tbody>
          </table>
        </div>
      </CalcBox>

      <CalcBox title="■ 소리와 파동의 본질">
        <p className="text-sm mb-3">
          소리는 공기 분자들의 앞뒤 압력 변화일 뿐입니다.
          &ldquo;주파수&rdquo;는 인간이 그 현상을 이해하기 위해 붙인 이름입니다.
        </p>
        <div className="text-sm space-y-1 text-muted">
          <p>• 실제로 존재하는 것 → 공기 압력의 연속적 변화</p>
          <p>• 우리가 표현하는 방법 → 주파수, 파형, 진폭</p>
          <p>• 뇌가 해석한 것 → &ldquo;아 바이올린 소리다&rdquo;</p>
        </div>
        <Insight>
          자연에 &ldquo;소리&rdquo;는 없습니다. 압력 변화만 있을 뿐, 소리는 뇌 안에 있습니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
