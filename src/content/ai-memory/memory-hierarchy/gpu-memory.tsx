"use client";

import { useState } from "react";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";
import { InlineMath } from "@/components/math/math-formula";

/** GPU-HBM 시스템 로드맵 (page 344) */
const GPU_ROADMAP = [
  {
    gen: "Rubin",
    year: 2026,
    system: "R200",
    gpuDie: 2,
    hbm: "HBM4×8",
    bwLow: 16,
    bwHigh: 32,
    capLow: 288,
    capHigh: 384,
    color: "#60a5fa",
  },
  {
    gen: "Feynman",
    year: 2028,
    system: "F400",
    gpuDie: 4,
    hbm: "HBM5×8",
    bwLow: 48,
    bwHigh: 48,
    capLow: 400,
    capHigh: 500,
    color: "#a78bfa",
  },
  {
    gen: "Post-Feynman X*",
    year: 2030,
    system: "X400*",
    gpuDie: 4,
    hbm: "HBM6×16",
    bwLow: 128,
    bwHigh: 256,
    capLow: 1536,
    capHigh: 1920,
    color: "#34d399",
  },
  {
    gen: "Next-Gen Z*",
    year: 2032,
    system: "Z800*",
    gpuDie: 8,
    hbm: "HBM7×32",
    bwLow: 1024,
    bwHigh: 1024,
    capLow: 5120,
    capHigh: 6144,
    color: "#fbbf24",
  },
];

type ChartTab = "bw" | "cap";

/** 막대그래프 SVG */
function BarChart({ tab }: { tab: ChartTab }) {
  const W = 460;
  const H = 180;
  const PAD = { t: 20, r: 20, b: 44, l: 56 };
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;

  const vals = GPU_ROADMAP.map((d) => (tab === "bw" ? d.bwHigh : d.capHigh));
  const maxVal = Math.max(...vals);
  const barW = innerW / GPU_ROADMAP.length;

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ fontFamily: "sans-serif" }}>
      {/* y축 가이드라인 3개 */}
      {[0.25, 0.5, 0.75, 1].map((frac) => {
        const y = PAD.t + innerH * (1 - frac);
        const label = tab === "bw"
          ? `${Math.round(maxVal * frac)} TB/s`
          : `${Math.round(maxVal * frac / 1000)} PB`;
        return (
          <g key={frac}>
            <line x1={PAD.l} y1={y} x2={W - PAD.r} y2={y} stroke="#334155" strokeWidth={0.8} strokeDasharray="3,3" />
            <text x={PAD.l - 4} y={y + 4} textAnchor="end" fontSize={8} fill="#64748b">{label}</text>
          </g>
        );
      })}
      {/* 막대 */}
      {GPU_ROADMAP.map((d, i) => {
        const val = tab === "bw" ? d.bwHigh : d.capHigh;
        const barH = (val / maxVal) * innerH;
        const x = PAD.l + i * barW + barW * 0.15;
        const w = barW * 0.7;
        const y = PAD.t + innerH - barH;
        return (
          <g key={d.gen}>
            <rect x={x} y={y} width={w} height={barH} rx={3} fill={d.color} fillOpacity={0.75} />
            <text x={x + w / 2} y={y - 4} textAnchor="middle" fontSize={8} fill={d.color} fontWeight={700}>
              {tab === "bw" ? `${val} TB/s` : `${val >= 1000 ? `${(val / 1000).toFixed(1)}PB` : `${val}GB`}`}
            </text>
            {/* x축 레이블 */}
            <text x={x + w / 2} y={H - PAD.b + 14} textAnchor="middle" fontSize={9} fill="#94a3b8">{d.gen}</text>
            <text x={x + w / 2} y={H - PAD.b + 26} textAnchor="middle" fontSize={8} fill="#64748b">{d.year}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function GpuMemory() {
  const [tab, setTab] = useState<ChartTab>("bw");

  return (
    <div className="space-y-8">
      <p className="text-muted">
        KAIST TERALAB의 GPU-HBM 시스템 로드맵(PDF page 344)은
        Rubin(2026) &rarr; Feynman(2028) &rarr; Post-Feynman(2030) &rarr; Next-Gen(2032)으로
        이어지는 NVIDIA 플랫폼 세대별 HBM 구성·대역폭·용량 전망을 담고 있습니다.
      </p>

      {/* ── 로드맵 표 ── */}
      <CalcBox title="■ GPU-HBM 시스템 로드맵 (page 344)">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-sidebar-border">
                {["GPU 세대", "시스템", "연도", "GPU die 수", "HBM 구성", "총 대역폭", "총 HBM 용량"].map((h) => (
                  <th key={h} className="text-left py-2 pr-3 font-semibold text-muted whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              {GPU_ROADMAP.map((d) => (
                <tr key={d.gen}>
                  <td className="py-2 pr-3 font-semibold whitespace-nowrap" style={{ color: d.color }}>{d.gen}</td>
                  <td className="py-2 pr-3 font-mono text-xs">{d.system}</td>
                  <td className="py-2 pr-3 text-muted">{d.year}</td>
                  <td className="py-2 pr-3 text-center">{d.gpuDie}</td>
                  <td className="py-2 pr-3">{d.hbm}</td>
                  <td className="py-2 pr-3">
                    {d.bwLow === d.bwHigh
                      ? <InlineMath math={`${d.bwHigh}\\text{ TB/s}`} />
                      : <InlineMath math={`${d.bwLow}/{${d.bwHigh}}\\text{ TB/s}`} />}
                  </td>
                  <td className="py-2">
                    {d.capLow === d.capHigh
                      ? <>{d.capHigh >= 1000 ? `${(d.capHigh / 1000).toFixed(0)} TB` : `${d.capHigh} GB`}</>
                      : <>{d.capLow >= 1000 ? `${(d.capLow / 1000).toFixed(2)} / ${(d.capHigh / 1000).toFixed(2)} PB` : `${d.capLow} / ${d.capHigh} GB`}</>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted mt-2">* 표시는 예상치. 출처: KAIST TERALAB HBM Roadmap v1.7, page 344.</p>
      </CalcBox>

      {/* ── 성장 그래프 ── */}
      <CalcBox title="■ 세대별 총 대역폭 · 총 HBM 용량 성장">
        <div className="flex gap-1 bg-sidebar-bg rounded-lg p-1 mb-4">
          {([["bw", "총 대역폭 (TB/s)"], ["cap", "총 HBM 용량"]] as [ChartTab, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 py-1.5 rounded-md text-sm transition-colors ${
                tab === key
                  ? "bg-white dark:bg-gray-800 font-semibold shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <BarChart tab={tab} />
        {tab === "bw" ? (
          <p className="text-xs text-muted text-center mt-1">
            Rubin 32 TB/s &rarr; Next-Gen Z* 1,024 TB/s, 약 32배 증가 (2026&rarr;2032).
          </p>
        ) : (
          <p className="text-xs text-muted text-center mt-1">
            Rubin 384 GB &rarr; Next-Gen Z* 6,144 GB (≈ 6 PB), 약 16배 증가 (2026&rarr;2032).
          </p>
        )}
      </CalcBox>

      {/* ── 세대별 심화 ── */}
      <CalcBox title="■ 세대별 핵심 변화">
        <SubSection title="● Rubin (2026) — R200, HBM4×8">
          <p className="text-sm">
            GPU die 2개, HBM4 스택 8개로 총 대역폭 16/32 TB/s, 용량 288/384 GB.
            HBM4(스택당 <InlineMath math="2.0\ \text{TB/s}" />, 2,048 I/O)가 처음 양산 적용되는 세대.
          </p>
        </SubSection>
        <SubSection title="● Feynman (2028) — F400, HBM5×8">
          <p className="text-sm">
            GPU die 4개, HBM5(스택당 <InlineMath math="4\ \text{TB/s}" />)×8로 총 48 TB/s, 400/500 GB.
            Custom Base Die·3D NMC-HBM 아키텍처가 본격화되는 세대.
          </p>
        </SubSection>
        <SubSection title="● Post-Feynman X* (2030) — X400*, HBM6×16">
          <p className="text-sm">
            GPU die 4개, HBM6(스택당 <InlineMath math="8\ \text{TB/s}" />)×16로 총 128/256 TB/s, 최대 1,920 GB.
            Multi-tower HBM·Hybrid Interposer 적용 예상.
          </p>
        </SubSection>
        <SubSection title="● Next-Gen Z* (2032) — Z800*, HBM7×32">
          <p className="text-sm">
            GPU die 8개, HBM7(스택당 <InlineMath math="24\ \text{TB/s}" />)×32로 총 1,024 TB/s, 최대 6,144 GB.
            HBM7 세대부터 HBF·Storage network과 결합하는 HBM-HBF 아키텍처 등장.
          </p>
        </SubSection>
      </CalcBox>

      {/* ── H3 확장 ── */}
      <CalcBox title="■ H3 아키텍처 — HBM + HBF 병치로 확장">
        <p className="text-sm mb-3">
          SK하이닉스 <strong>H3(HBM + HBF)</strong> 아키텍처는 GPU 로드맵의 HBM 계층 옆에
          HBF를 나란히 배치해 용량 부족을 보완합니다.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-blue-400 mb-1">HBM 역할</div>
            <p className="text-muted">핫(hot) 데이터: 활성 가중치·KV 캐시. 낮은 지연·TB/s급 대역폭.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-green-400 mb-1">HBF 역할</div>
            <p className="text-muted">콜드(cold) 데이터: 가중치 라이브러리 전체. 최대 512 GB / 1.638 TB/s.</p>
          </div>
        </div>
        <Insight>
          Z800*(2032) 기준 HBM 단독으로도 6 PB에 달하지만, HBF를 병치하면
          GPU 근방에서 수십 PB 이상의 모델도 처리 가능해집니다.
          메모리 월이 아닌 &ldquo;메모리 초고속도로&rdquo; 시대로 가는 경로입니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
