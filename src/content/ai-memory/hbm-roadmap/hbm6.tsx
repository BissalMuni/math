"use client";

import { useState } from "react";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";
import { InlineMath } from "@/components/math/math-formula";

/** HBM6 주요 사양 상수 (page 29) */
const HBM6_SPECS = [
  { label: "Data Rate (핀당)", value: "16 Gbps", note: "HBM5(8 Gbps) 대비 2배 — 처음으로 속도 도약" },
  { label: "I/O (버스폭)", value: "4,096-bit", note: "HBM5와 동일 버스폭 유지" },
  { label: "대역폭/스택", value: "8 TB/s", note: "핀당 속도 2배 → 대역폭 2배" },
  { label: "다이당 용량", value: "48 Gb", note: "HBM5(40 Gb) 대비 +20 %" },
  { label: "Die stack", value: "16/20-Hi", note: "최대 20층 적층 옵션 추가" },
  { label: "스택 용량", value: "96 / 120 GB", note: "16-Hi(96 GB) 또는 20-Hi(120 GB)" },
  { label: "Power/HBM", value: "120 W", note: "HBM5(100 W) 대비 +20 W" },
];

/** HBM5 → HBM6 대역폭 비교 막대 */
function BandwidthBarChart() {
  const bars = [
    { label: "HBM4", bw: 2.0, color: "#f59e0b" },
    { label: "HBM5", bw: 4.0, color: "#22d3ee" },
    { label: "HBM6", bw: 8.0, color: "#a78bfa" },
  ];
  const maxBw = 8.0;
  const barW = 70;
  const gap = 50;
  const chartH = 120;

  return (
    <svg width="100%" viewBox="0 0 360 180" style={{ fontFamily: "sans-serif", maxWidth: 420 }}>
      <text x={8} y={16} fontSize={10} fill="#94a3b8" fontWeight={600}>
        스택당 대역폭 비교 (TB/s)
      </text>
      {bars.map((b, i) => {
        const barH = (b.bw / maxBw) * chartH;
        const x = 30 + i * (barW + gap);
        const y = 30 + (chartH - barH);
        return (
          <g key={b.label}>
            <rect x={x} y={y} width={barW} height={barH} fill={b.color} rx={4} opacity={0.85} />
            <text x={x + barW / 2} y={y - 5} textAnchor="middle" fontSize={11} fill={b.color} fontWeight={700}>
              {b.bw} TB/s
            </text>
            <text x={x + barW / 2} y={165} textAnchor="middle" fontSize={10} fill="#94a3b8">
              {b.label}
            </text>
          </g>
        );
      })}
      <line x1={20} y1={30} x2={20} y2={150} stroke="#334155" strokeWidth={1} />
      <line x1={20} y1={150} x2={340} y2={150} stroke="#334155" strokeWidth={1} />
    </svg>
  );
}

/** Multi-tower HBM 구조 다이어그램 */
function MultiTowerDiagram() {
  return (
    <svg width="100%" viewBox="0 0 480 200" style={{ fontFamily: "sans-serif", maxWidth: 520 }}>
      <text x={8} y={16} fontSize={10} fill="#94a3b8" fontWeight={600}>
        Multi-tower HBM 구조 (개념도)
      </text>
      {/* Active/Hybrid Interposer 기판 */}
      <rect x={20} y={160} width={440} height={22} fill="#1e293b" stroke="#475569" strokeWidth={1.5} rx={3} />
      <text x={240} y={175} textAnchor="middle" fontSize={10} fill="#94a3b8" fontWeight={600}>
        Active / Hybrid Interposer
      </text>
      {/* GPU die */}
      <rect x={140} y={100} width={200} height={50} fill="#374151" stroke="#6b7280" strokeWidth={1.5} rx={4} />
      <text x={240} y={130} textAnchor="middle" fontSize={11} fill="#d1d5db" fontWeight={600}>GPU Die</text>

      {/* HBM6 타워 ×2 */}
      {[40, 380].map((bx, ti) => (
        <g key={ti}>
          {[0, 1, 2, 3].map((di) => (
            <rect key={di} x={bx} y={48 - di * 22} width={60} height={18} fill="#a78bfa" stroke="#7c3aed" strokeWidth={1} rx={2} opacity={0.8 + di * 0.05} />
          ))}
          <rect x={bx} y={68} width={60} height={18} fill="#4c1d95" stroke="#7c3aed" strokeWidth={1} rx={2} />
          <text x={bx + 30} y={81} textAnchor="middle" fontSize={8} fill="#c4b5fd">Base Die</text>
          <text x={bx + 30} y={110} textAnchor="middle" fontSize={9} fill="#a78bfa" fontWeight={700}>
            {ti === 0 ? "HBM6 Tower A" : "HBM6 Tower B"}
          </text>
        </g>
      ))}
      {/* 연결선 */}
      <line x1={100} y1={88} x2={140} y2={125} stroke="#a78bfa" strokeWidth={1.5} strokeDasharray="4,2" />
      <line x1={380} y1={88} x2={340} y2={125} stroke="#a78bfa" strokeWidth={1.5} strokeDasharray="4,2" />
    </svg>
  );
}

type TabKey = "spec" | "arch" | "system";

export default function Hbm6() {
  const [tab, setTab] = useState<TabKey>("spec");

  return (
    <div className="space-y-8">
      <p className="text-muted">
        HBM6(2032년 예상)은 핀당 속도를 처음으로 <strong>16 Gbps</strong>로 두 배 올려
        스택당 <strong>8 TB/s</strong>를 달성합니다. 구조 면에서는 Multi-tower HBM과
        Active/Hybrid Interposer가 도입되고, 냉각 방식이 침지(Immersion) 냉각으로
        전환되는 중요한 세대입니다.
      </p>

      {/* ── 핵심 사양 + 탭 ── */}
      <CalcBox title="■ HBM6 핵심 사양 (KAIST TERALAB 로드맵 p.29)">
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
                  <th className="text-left py-2 pr-4 font-semibold text-violet-400">HBM6 수치</th>
                  <th className="text-left py-2 font-semibold text-muted">의미</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                {HBM6_SPECS.map((r) => (
                  <tr key={r.label}>
                    <td className="py-2 pr-4 text-muted">{r.label}</td>
                    <td className="py-2 pr-4 font-semibold text-violet-400">{r.value}</td>
                    <td className="py-2 text-muted text-xs">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "arch" && (
          <div className="space-y-3 text-sm">
            <p className="text-muted">KAIST TERALAB 로드맵(p.29) HBM6 아키텍처 혁신:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
                <div className="font-semibold text-violet-400 mb-1">① Multi-tower HBM</div>
                <p className="text-muted text-xs">
                  단일 HBM 패키지에 복수의 DRAM 타워를 배치하는 구조.
                  물리적 한계에 근접한 단일 스택 대신 <strong>다중 타워</strong>로
                  용량·대역폭을 확장하는 방향.
                </p>
              </div>
              <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
                <div className="font-semibold text-violet-400 mb-1">② Active / Hybrid Interposer</div>
                <p className="text-muted text-xs">
                  수동 실리콘 인터포저(2.5D)를 넘어 인터포저 자체에 능동 회로(전력·신호 재분배)를
                  내장하는 <strong>액티브 인터포저</strong> 또는 혼합(Hybrid) 구조.
                  HBM7에서 더 심화됨.
                </p>
              </div>
            </div>
            <MultiTowerDiagram />
          </div>
        )}

        {tab === "system" && (
          <div className="space-y-3 text-sm">
            <p className="text-muted">KAIST TERALAB 로드맵(p.344) — Post-Feynman X400* GPU 시스템:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-sidebar-border">
                    <th className="text-left py-2 pr-4 font-semibold text-muted">항목</th>
                    <th className="text-left py-2 font-semibold text-violet-400">Post-Feynman X400* (2030)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sidebar-border">
                  <tr><td className="py-2 pr-4 text-muted">GPU 다이 수</td><td className="py-2">4개</td></tr>
                  <tr><td className="py-2 pr-4 text-muted">HBM 구성</td><td className="py-2 font-semibold text-violet-400">HBM6 × 16 스택</td></tr>
                  <tr><td className="py-2 pr-4 text-muted">총 대역폭</td><td className="py-2 font-bold">128 / 256 TB/s</td></tr>
                  <tr><td className="py-2 pr-4 text-muted">총 HBM 용량</td><td className="py-2">1,536 / 1,920 GB</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted text-xs mt-2">
              스택당 8 TB/s × 16 스택 = <strong>128 TB/s</strong>(기본 구성).
              총 용량 1.5~1.9 TB는 초대형 AI 모델 파라미터(수 조 개)를 메모리에 상주시킬 수 있는 규모.
            </p>
          </div>
        )}
      </CalcBox>

      {/* ── 대역폭 비교 ── */}
      <CalcBox title="■ HBM4 &rarr; HBM5 &rarr; HBM6 대역폭 폭발">
        <p className="text-sm text-muted mb-4">
          HBM6에서는 I/O 비트 수가 아닌 <strong>핀당 속도(8 &rarr; 16 Gbps)</strong>가 두 배가 됩니다.
          처음으로 클럭 도약이 주요 수단이 되는 세대입니다:
        </p>
        <p className="text-sm text-center mb-4">
          <InlineMath math="16\,\text{Gbps} \times 4{,}096\,\text{bit} \div 8 = 8\,\text{TB/s}" />
        </p>
        <BandwidthBarChart />
        <Insight>
          HBM5까지는 &ldquo;버스폭을 2배&rdquo;하는 전략을 썼다면, HBM6부터는
          &ldquo;핀당 속도를 2배&rdquo;하는 전략이 추가됩니다.
          이 때문에 신호 무결성(SI) 관리 난이도가 올라가고,
          Active Interposer 수준의 정밀한 인터커넥트가 필요해집니다.
        </Insight>
      </CalcBox>

      {/* ── 냉각 전환 ── */}
      <CalcBox title="■ 냉각 방식 전환 — D2C에서 Immersion으로">
        <SubSection title="● HBM5까지: D2C(Direct-to-Chip) 액체 냉각">
          <p className="text-sm text-muted mb-2">
            냉각수 튜브를 칩 표면 바로 위에 붙이는 방식. 단일 스택 100 W까지는 이 방법으로 충분하지만,
            스택 수 × 전력이 커지면 한계에 도달한다.
          </p>
        </SubSection>
        <SubSection title="● HBM6+: Immersion(침지) 냉각">
          <p className="text-sm text-muted mb-2">
            서버 전체 또는 GPU 모듈을 절연 냉각액에 직접 담그는 방식.
            HBM6 스택당 120 W × 16 스택 = 총 1,920 W를 다루려면
            D2C만으로는 한계 &mdash; Immersion이 다음 단계.
          </p>
          <p className="text-sm text-muted">
            로드맵(p.29): <strong>Direct-to-Chip &rarr; Immersion &rarr; Embedded Cooling</strong>
            순서로 냉각 방식이 세대별로 진화.
          </p>
        </SubSection>
      </CalcBox>
    </div>
  );
}
