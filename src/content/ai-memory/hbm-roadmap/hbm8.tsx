"use client";

import { useState } from "react";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";
import { InlineMath, BlockMath } from "@/components/math/math-formula";

/** HBM8 주요 사양 상수 (page 29) */
const HBM8_SPECS = [
  { label: "Data Rate (핀당)", value: "32 Gbps", note: "HBM7(24 Gbps) 대비 ×1.33" },
  { label: "I/O (버스폭)", value: "16,384-bit", note: "HBM7(8,192) 대비 2배 — 역대 최대" },
  { label: "대역폭/스택", value: "64 TB/s", note: "HBM7(24) 대비 ×2.67 — Peta급 진입" },
  { label: "다이당 용량", value: "80 Gb", note: "HBM7(64 Gb) 대비 +25 %" },
  { label: "Die stack", value: "20/24-Hi", note: "HBM7과 동일 적층 수 — 품질 심화" },
  { label: "스택 용량", value: "200 / 240 GB", note: "20-Hi(200 GB) 또는 24-Hi(240 GB)" },
  { label: "Power/HBM", value: "180 W", note: "HBM7(160 W) 대비 +20 W — 임베디드 냉각 필수" },
];

/** HBM3 ~ HBM8 대역폭 + I/O 폭발 트렌드 */
type ViewKey = "bw" | "io";

const TREND_DATA = [
  { label: "HBM3",  year: 2023, bw: 0.819, io: 1024,  color: "#94a3b8" },
  { label: "HBM4",  year: 2026, bw: 2.0,   io: 2048,  color: "#f59e0b" },
  { label: "HBM5",  year: 2029, bw: 4.0,   io: 4096,  color: "#22d3ee" },
  { label: "HBM6",  year: 2032, bw: 8.0,   io: 4096,  color: "#a78bfa" },
  { label: "HBM7",  year: 2035, bw: 24.0,  io: 8192,  color: "#34d399" },
  { label: "HBM8",  year: 2038, bw: 64.0,  io: 16384, color: "#f87171" },
];

function TrendGraph({ view }: { view: ViewKey }) {
  const values = TREND_DATA.map((d) => (view === "bw" ? d.bw : d.io));
  const maxVal = Math.max(...values);
  const W = 520;
  const H = 150;
  const padL = 50;
  const padR = 20;
  const padT = 20;
  const padB = 30;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const n = TREND_DATA.length;

  const cx = (i: number) => padL + (i / (n - 1)) * chartW;
  const cy = (v: number) => padT + chartH - (v / maxVal) * chartH;

  const polyline = TREND_DATA.map((d, i) =>
    `${cx(i)},${cy(view === "bw" ? d.bw : d.io)}`
  ).join(" ");

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H + 20}`} style={{ fontFamily: "sans-serif", maxWidth: 580 }}>
      <text x={padL} y={14} fontSize={10} fill="#94a3b8" fontWeight={600}>
        {view === "bw"
          ? "스택당 대역폭 (TB/s) — HBM3 → HBM8"
          : "I/O 버스폭 (bit) — HBM3 → HBM8"}
      </text>
      <polyline points={polyline} fill="none" stroke="#475569" strokeWidth={1.5} strokeDasharray="5,3" />
      {TREND_DATA.map((d, i) => {
        const v = view === "bw" ? d.bw : d.io;
        const label = view === "bw"
          ? (v < 1 ? `${Math.round(v * 1000)}G` : `${v}T`)
          : v >= 1000 ? `${v / 1000}K` : `${v}`;
        return (
          <g key={d.label}>
            <circle cx={cx(i)} cy={cy(v)} r={6} fill={d.color} />
            <text x={cx(i)} y={cy(v) - 9} textAnchor="middle" fontSize={9} fill={d.color} fontWeight={700}>
              {label}
            </text>
            <text x={cx(i)} y={H + 8} textAnchor="middle" fontSize={8} fill="#94a3b8">
              {d.label}
            </text>
          </g>
        );
      })}
      <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="#1e293b" strokeWidth={1} />
      <line x1={padL} y1={padT + chartH} x2={W - padR} y2={padT + chartH} stroke="#1e293b" strokeWidth={1} />
    </svg>
  );
}

/** Full-3D HBM-Centric 구조 다이어그램 */
function FullThreeDDiagram() {
  return (
    <svg width="100%" viewBox="0 0 480 220" style={{ fontFamily: "sans-serif", maxWidth: 540 }}>
      <text x={8} y={16} fontSize={10} fill="#94a3b8" fontWeight={600}>
        Full-3D HBM-Centric Computing — HBM8 구조 (개념도)
      </text>

      {/* HBM-Centric Interposer */}
      <rect x={20} y={180} width={440} height={22} fill="#1e293b" stroke="#ef4444" strokeWidth={1.5} rx={3} />
      <text x={240} y={195} textAnchor="middle" fontSize={10} fill="#f87171" fontWeight={600}>
        HBM-Centric Interposer
      </text>

      {/* HBM8 스택 (왼쪽) */}
      {[0, 1, 2, 3].map((di) => (
        <rect key={`l${di}`} x={30} y={60 + di * 20} width={90} height={16} fill="#f87171" stroke="#dc2626" strokeWidth={0.8} rx={2} opacity={0.7 + di * 0.08} />
      ))}
      <rect x={30} y={145} width={90} height={18} fill="#7f1d1d" stroke="#dc2626" strokeWidth={1} rx={2} />
      <text x={75} y={158} textAnchor="middle" fontSize={8} fill="#fca5a5">Base Die</text>
      <text x={75} y={176} textAnchor="middle" fontSize={9} fill="#f87171" fontWeight={700}>HBM8-A</text>

      {/* Stacked XPU Processor — 중앙 */}
      <rect x={160} y={80} width={160} height={70} fill="#1c1917" stroke="#f87171" strokeWidth={2} rx={6} />
      <text x={240} y={112} textAnchor="middle" fontSize={10} fill="#fef2f2" fontWeight={700}>Stacked XPU</text>
      <text x={240} y={126} textAnchor="middle" fontSize={9} fill="#f87171">Processor</text>
      <text x={240} y={140} textAnchor="middle" fontSize={8} fill="#fca5a5">(Full-3D 적층)</text>

      {/* HBM8 스택 (오른쪽) */}
      {[0, 1, 2, 3].map((di) => (
        <rect key={`r${di}`} x={360} y={60 + di * 20} width={90} height={16} fill="#f87171" stroke="#dc2626" strokeWidth={0.8} rx={2} opacity={0.7 + di * 0.08} />
      ))}
      <rect x={360} y={145} width={90} height={18} fill="#7f1d1d" stroke="#dc2626" strokeWidth={1} rx={2} />
      <text x={405} y={158} textAnchor="middle" fontSize={8} fill="#fca5a5">Base Die</text>
      <text x={405} y={176} textAnchor="middle" fontSize={9} fill="#f87171" fontWeight={700}>HBM8-B</text>

      {/* Double-side Cooling 표시 */}
      <rect x={20} y={40} width={440} height={14} fill="#0f172a" stroke="#0ea5e9" strokeWidth={1} strokeDasharray="4,2" rx={2} />
      <text x={240} y={51} textAnchor="middle" fontSize={8} fill="#38bdf8">Double-side Cooling (상단)</text>

      {/* 연결선 */}
      <line x1={120} y1={115} x2={160} y2={115} stroke="#f87171" strokeWidth={2} />
      <line x1={320} y1={115} x2={360} y2={115} stroke="#f87171" strokeWidth={2} />
    </svg>
  );
}

type TabKey = "spec" | "arch" | "system";

export default function Hbm8() {
  const [tab, setTab] = useState<TabKey>("spec");
  const [trendView, setTrendView] = useState<ViewKey>("bw");

  return (
    <div className="space-y-8">
      <p className="text-muted">
        HBM8(2038년 예상)은 I/O 버스폭 <strong>16,384-bit</strong>와 핀당 속도 32 Gbps로
        스택당 <strong>64 TB/s</strong>를 달성하며 Peta(페타) 대역폭 시대를 엽니다.
        아키텍처 측에서는 Full-3D / HBM-Centric Computing, Double-side &amp; Embedded Cooling이 도입되고,
        열결합(thermal coupling) 문제가 설계의 핵심 난제로 부상합니다.
      </p>

      {/* ── 핵심 사양 + 탭 ── */}
      <CalcBox title="■ HBM8 핵심 사양 (KAIST TERALAB 로드맵 p.29)">
        <div className="flex gap-1 bg-sidebar-bg rounded-lg p-1 mb-4">
          {([
            ["spec", "사양표"],
            ["arch", "아키텍처"],
            ["system", "GPU 시스템"],
          ] as [TabKey, string][]).map(([key, label]) => (
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

        {tab === "spec" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-sidebar-border">
                  <th className="text-left py-2 pr-4 font-semibold text-muted">항목</th>
                  <th className="text-left py-2 pr-4 font-semibold text-red-400">HBM8 수치</th>
                  <th className="text-left py-2 font-semibold text-muted">의미</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                {HBM8_SPECS.map((r) => (
                  <tr key={r.label}>
                    <td className="py-2 pr-4 text-muted">{r.label}</td>
                    <td className="py-2 pr-4 font-semibold text-red-400">{r.value}</td>
                    <td className="py-2 text-muted text-xs">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-sm text-muted mt-3">
              대역폭 계산:
              {" "}<InlineMath math="32\,\text{Gbps} \times 16{,}384\,\text{bit} \div 8 = 65.536\,\text{TB/s} \approx 64\,\text{TB/s}" />
            </p>
          </div>
        )}

        {tab === "arch" && (
          <div className="space-y-3 text-sm">
            <p className="text-muted">KAIST TERALAB 로드맵(p.29) HBM8 아키텍처 혁신:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
                <div className="font-semibold text-red-400 mb-1">① Full-3D / HBM-Centric Computing</div>
                <p className="text-muted text-xs">
                  연산 유닛(XPU)을 HBM 스택과 함께 3D 적층. 메모리가 단순 저장소가 아닌
                  <strong> 컴퓨팅의 중심</strong>이 됩니다. HBM-Centric Interposer가 이를 지탱.
                </p>
              </div>
              <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
                <div className="font-semibold text-red-400 mb-1">② Double-side Cooling</div>
                <p className="text-muted text-xs">
                  패키지 상·하 양면에서 동시에 냉각. 스택당 180 W × 수십 스택의 열을
                  단면 냉각으로는 감당할 수 없어 양면 냉각이 도입됩니다.
                </p>
              </div>
              <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
                <div className="font-semibold text-red-400 mb-1">③ Embedded Cooling</div>
                <p className="text-muted text-xs">
                  마이크로채널을 인터포저 또는 다이 내부에 식각해 냉각수를 직접 흘리는 방식.
                  냉각 경로가 짧아져 열저항이 최소화됩니다.
                </p>
              </div>
              <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
                <div className="font-semibold text-red-400 mb-1">④ Optical I/O (보조 출처)</div>
                <p className="text-muted text-xs">
                  고밀도 전기 I/O(16,384-bit)에서 발생하는 전력·발열을 줄이기 위해
                  칩렛 간·보드 간 광(Optical) 인터커넥트 도입이 연구되고 있습니다.
                </p>
              </div>
            </div>
            <FullThreeDDiagram />
          </div>
        )}

        {tab === "system" && (
          <div className="space-y-3 text-sm">
            <p className="text-muted">KAIST TERALAB 로드맵(p.344) — HBM8-XPU Full-3D 시스템:</p>
            <p className="text-muted">
              HBM8 세대에는 &ldquo;stacked processor 포함 <strong>full-3D HBM-XPU</strong> 구조&rdquo;가
              필요하다고 명시됩니다. GPU+HBM 병렬 배치를 넘어 XPU와 HBM이 수직 통합되는 형태입니다.
            </p>
            <Insight>
              Full-3D HBM-XPU에서는 신호무결성(SI)·<strong>열결합(thermal coupling)</strong>이
              핵심 난제로 부각됩니다(로드맵 p.344). 열결합은 인접한 다이끼리 서로의 열에 영향을 받는
              현상으로, 거리에 반비례하여 심화됩니다:
              <div className="mt-2">
                <BlockMath math="\text{열결합} \propto \frac{1}{\text{다이 간 거리}}" />
              </div>
              Full-3D 적층에서 다이 간 거리가 µm 수준으로 줄어들면 열결합이 극도로 강해지므로,
              Double-side Cooling + Embedded Cooling 조합이 필수입니다.
            </Insight>
          </div>
        )}
      </CalcBox>

      {/* ── 대역폭·I/O 폭발 추세 ── */}
      <CalcBox title="■ HBM3 &rarr; HBM8 대역폭·I/O 폭발 추세">
        <div className="flex gap-2 mb-4">
          {([
            ["bw", "대역폭 (TB/s)"],
            ["io", "I/O (bit)"],
          ] as [ViewKey, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTrendView(key)}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                trendView === key
                  ? "bg-red-500 text-white font-semibold"
                  : "bg-sidebar-bg text-muted hover:text-foreground border border-sidebar-border"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <TrendGraph view={trendView} />
        <p className="text-sm text-muted mt-3">
          {trendView === "bw"
            ? "HBM3(819 GB/s) → HBM8(64 TB/s): 약 78배 증가(2023→2038, 15년). 복리 환산 연평균 약 34 % 성장."
            : "HBM3(1,024-bit) → HBM8(16,384-bit): 16배 증가. 핀당 속도 상승과 I/O 확장이 동시에 진행."}
        </p>
        <Insight>
          HBM8에서 I/O 16,384-bit는 현재 PC 메모리 버스(64~128-bit)의 128~256배 너비입니다.
          이 수준의 버스를 패키지 안에서 구현하려면 실리콘 인터포저를 넘어
          <strong> HBM-Centric 인터포저</strong>라는 전용 기판이 필요합니다.
        </Insight>
      </CalcBox>

      {/* ── 열결합 심화 ── */}
      <CalcBox title="■ 열결합(Thermal Coupling) — Full-3D의 핵심 난제">
        <SubSection title="● 열결합이란">
          <p className="text-sm text-muted mb-2">
            3D 적층에서 한 다이의 발열이 인접 다이의 온도를 끌어올리는 현상.
            다이 간 거리(d)가 줄어들수록 열결합이 강해져:
          </p>
          <p className="text-sm text-center mb-2">
            <InlineMath math="Q_{\text{coupling}} \propto \frac{1}{d}" />
          </p>
          <p className="text-sm text-muted">
            Full-3D HBM-XPU 구조에서 다이 간 거리가 µm 수준이면
            열결합이 극도로 심화되어 다이 하나가 과열되면 옆 다이도 동반 과열됩니다.
          </p>
        </SubSection>
        <SubSection title="● 대응 전략 (로드맵 p.29 아키텍처 특징)">
          <div className="grid sm:grid-cols-3 gap-3 text-sm mt-2">
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-blue-400 mb-1">① Double-side Cooling</div>
              <p className="text-muted text-xs">상·하 양면에서 동시 냉각 → 열경로 절반으로 단축.</p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-blue-400 mb-1">② Embedded Cooling</div>
              <p className="text-muted text-xs">인터포저/다이 내 마이크로채널 → 발열원 최근접 냉각.</p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-blue-400 mb-1">③ AI 설계 자동화</div>
              <p className="text-muted text-xs">LLM 기반 대화형 설계 에이전트로 열-전기 공동 최적화.</p>
            </div>
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
