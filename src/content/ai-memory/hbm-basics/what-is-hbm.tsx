"use client";

import { CalcBox, SubSection, Insight } from "@/components/content/shared";

const BANDWIDTH_DATA = [
  { label: "DDR5-6400",  bw: 51,   color: "#6b7280", tag: "CPU 메인" },
  { label: "LPDDR5X",   bw: 68,   color: "#6b7280", tag: "모바일" },
  { label: "GDDR6X",    bw: 576,  color: "#3b82f6", tag: "게이밍 GPU" },
  { label: "HBM2E",     bw: 460,  color: "#f59e0b", tag: "A100" },
  { label: "HBM3",      bw: 819,  color: "#f97316", tag: "H100" },
  { label: "HBM3E",     bw: 1229, color: "#ef4444", tag: "H200/MI325X" },
];

const MAX_BW = 1229;

/** HBM 적층 구조 SVG 다이어그램 */
function HbmStackDiagram() {
  const layers = [
    { label: "DRAM Die 8", y: 20,  fill: "#bfdbfe", stroke: "#3b82f6" },
    { label: "DRAM Die 7", y: 52,  fill: "#bfdbfe", stroke: "#3b82f6" },
    { label: "DRAM Die 6", y: 84,  fill: "#bfdbfe", stroke: "#3b82f6" },
    { label: "DRAM Die 5", y: 116, fill: "#bfdbfe", stroke: "#3b82f6" },
    { label: "DRAM Die 4", y: 148, fill: "#c7d2fe", stroke: "#6366f1" },
    { label: "DRAM Die 3", y: 180, fill: "#c7d2fe", stroke: "#6366f1" },
    { label: "DRAM Die 2", y: 212, fill: "#c7d2fe", stroke: "#6366f1" },
    { label: "DRAM Die 1", y: 244, fill: "#c7d2fe", stroke: "#6366f1" },
    { label: "로직 다이 (Base Die)", y: 280, fill: "#fde68a", stroke: "#d97706" },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width="100%"
        viewBox="0 0 420 360"
        style={{ maxWidth: 420, fontFamily: "sans-serif" }}
      >
        {/* TSV 수직선 */}
        {[130, 150, 170, 190, 250, 270, 290, 310].map((x) => (
          <line key={x} x1={x} y1={22} x2={x} y2={290} stroke="#94a3b8" strokeWidth={1} strokeDasharray="2,2" />
        ))}

        {/* 적층 레이어 */}
        {layers.map((l) => (
          <g key={l.label}>
            <rect
              x={60} y={l.y} width={300} height={26}
              fill={l.fill} stroke={l.stroke} strokeWidth={1.5} rx={3}
            />
            <text x={210} y={l.y + 17} textAnchor="middle" fontSize={11} fill="#1e293b" fontWeight={500}>
              {l.label}
            </text>
          </g>
        ))}

        {/* TSV 레이블 */}
        <text x={210} y={330} textAnchor="middle" fontSize={11} fill="#64748b">
          TSV (Through-Silicon Via) — 다이 간 수직 연결
        </text>

        {/* 화살표 + 라벨: 대역폭 */}
        <line x1={370} y1={22} x2={370} y2={304} stroke="#ef4444" strokeWidth={2} markerEnd="url(#arrow-down)" />
        <line x1={366} y1={22} x2={374} y2={22} stroke="#ef4444" strokeWidth={2} />
        <line x1={366} y1={304} x2={374} y2={304} stroke="#ef4444" strokeWidth={2} />
        <text x={400} y={165} textAnchor="middle" fontSize={10} fill="#ef4444" transform="rotate(90 400 165)">
          1 TB/s+
        </text>
        <text x={400} y={152} textAnchor="middle" fontSize={9} fill="#ef4444" transform="rotate(90 400 152)">
          대역폭
        </text>

        {/* 왼쪽 라벨 */}
        <text x={50} y={136} textAnchor="end" fontSize={9} fill="#3b82f6">상위</text>
        <text x={50} y={148} textAnchor="end" fontSize={9} fill="#3b82f6">스택</text>
        <text x={50} y={230} textAnchor="end" fontSize={9} fill="#6366f1">하위</text>
        <text x={50} y={242} textAnchor="end" fontSize={9} fill="#6366f1">스택</text>

        <defs>
          <marker id="arrow-down" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto">
            <path d="M0,0 L6,0 L3,6 Z" fill="#ef4444" />
          </marker>
        </defs>
      </svg>
      <p className="text-xs text-muted text-center">HBM3E 기준 — DRAM 다이 8장 적층, TSV로 다이 간 연결, 로직 다이가 I/O 처리</p>
    </div>
  );
}

/** 대역폭 비교 수평 막대그래프 */
function BandwidthChart() {
  return (
    <svg width="100%" viewBox="0 0 500 220" style={{ fontFamily: "sans-serif" }}>
      {BANDWIDTH_DATA.map((d, i) => {
        const barW = (d.bw / MAX_BW) * 310;
        const y = 18 + i * 32;
        return (
          <g key={d.label}>
            <text x={90} y={y + 14} textAnchor="end" fontSize={11} fill="#94a3b8">
              {d.label}
            </text>
            <rect x={96} y={y} width={barW} height={22} fill={d.color} rx={3} opacity={0.85} />
            <text x={96 + barW + 6} y={y + 14} fontSize={11} fill="#e2e8f0" fontWeight={600}>
              {d.bw} GB/s
            </text>
            <text x={490} y={y + 14} textAnchor="end" fontSize={10} fill="#64748b">
              {d.tag}
            </text>
          </g>
        );
      })}
      <line x1={96} y1={10} x2={96} y2={210} stroke="#334155" strokeWidth={1} />
      <text x={250} y={215} textAnchor="middle" fontSize={10} fill="#64748b">
        피크 메모리 대역폭 (GB/s, 단일 스택/채널 기준)
      </text>
    </svg>
  );
}

export default function WhatIsHbm() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        HBM(High Bandwidth Memory)은 DRAM 다이를 수직으로 쌓아 초고속 대역폭을 구현하는 차세대 메모리 기술입니다.
        AI 가속기의 핵심 부품으로, GPU 한 개에 수 TB/s의 데이터 처리를 가능하게 합니다.
      </p>

      {/* ── 탄생 배경 ── */}
      <CalcBox title="■ HBM의 탄생 배경">
        <SubSection title="● AI가 요구하는 메모리 대역폭">
          <p className="text-sm mb-3">
            딥러닝 모델의 학습과 추론은 매 연산마다 수십 GB의 가중치(weight)를 GPU 연산 코어로 공급해야 합니다.
            행렬 곱셈(GEMM) 하나만 해도 초당 수백 TB의 데이터를 읽고 써야 합니다.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold mb-1">① 연산 속도 vs 메모리 속도</div>
              <p className="text-muted">GPU 연산 코어(FLOPs)는 매 세대 2~4배 빠르지만, 메모리 대역폭은 훨씬 느리게 증가해 왔습니다.</p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold mb-1">② 메모리 월(Memory Wall)</div>
              <p className="text-muted">연산 코어가 빨라도 데이터 공급이 따라오지 못하면 코어가 대기합니다. 이 병목을 메모리 월이라 합니다.</p>
            </div>
          </div>
        </SubSection>

        <SubSection title="● 기존 DRAM의 핀(Pin) 수 한계">
          <p className="text-sm mb-3">
            GDDR(그래픽 DDR) 메모리는 칩 가장자리에 금속 핀을 배치해 데이터를 주고받습니다.
            핀 수를 늘리려면 칩 면적이 늘어나고, 핀당 배선이 길어져 신호 무결성이 저하됩니다.
          </p>
          <p className="text-sm text-muted">
            ① GDDR6X는 256비트 버스폭이 사실상 한계 &rarr; 핀 수 확장 불가.<br />
            ② 핀 피치를 줄이면 제조 비용과 신호 누화(crosstalk)가 급증합니다.<br />
            ③ HBM은 이 문제를 &ldquo;옆으로 넓히는 대신 위로 쌓는&rdquo; 방식으로 해결했습니다.
          </p>
        </SubSection>

        <Insight>
          HBM은 &quot;더 빠른 DRAM&quot;이 아니라 &quot;더 넓은 DRAM&quot;입니다. 클럭보다 버스폭을 극대화해 대역폭을 높입니다.
        </Insight>
      </CalcBox>

      {/* ── 핵심 구조 ── */}
      <CalcBox title="■ HBM의 핵심 구조 — 수직 적층">
        <p className="text-sm mb-4">
          HBM은 여러 장의 DRAM 다이(die)를 TSV(Through-Silicon Via)로 수직 관통 배선해 하나의 스택으로 만듭니다.
          이 스택이 실리콘 인터포저 위에 GPU와 나란히 놓입니다.
        </p>
        <HbmStackDiagram />
        <div className="grid sm:grid-cols-3 gap-3 mt-4 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold text-blue-400 mb-1">DRAM 다이</div>
            <p className="text-muted">표준 DRAM 셀을 얇게 가공(50~100 µm). HBM3E는 8~12장 적층.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold text-purple-400 mb-1">TSV</div>
            <p className="text-muted">다이를 관통하는 수십만 개의 구리 기둥. 핀 수를 1024~2048비트로 확장.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold text-amber-400 mb-1">로직 다이</div>
            <p className="text-muted">스택 최하단 베이스 다이. I/O 제어, ECC, 전력 관리 담당.</p>
          </div>
        </div>
      </CalcBox>

      {/* ── 대역폭 비교 ── */}
      <CalcBox title="■ 메모리 대역폭 비교">
        <p className="text-sm mb-4">
          단일 스택 또는 단일 채널 기준 피크 대역폭. HBM3E 1229 GB/s는 GDDR6X의 2배를 넘습니다.
          실제 GPU에는 HBM 스택이 4~8개 들어가므로 시스템 총 대역폭은 더 큽니다.
        </p>
        <BandwidthChart />
        <div className="mt-4 text-sm text-muted">
          <span className="font-semibold text-foreground">대역폭 공식: </span>
          버스폭(bit) × 동작 클럭(Hz) × 전송 회수(DDR=2) ÷ 8 = GB/s.
          HBM3E는 버스폭 1024비트 × 9.8 Gbps ÷ 8 ≈ 1,229 GB/s (스택당).
        </div>
      </CalcBox>

      {/* ── 적용 사례 ── */}
      <CalcBox title="■ HBM이 탑재된 AI 가속기">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-sidebar-border">
                <th className="text-left py-2 pr-4 font-semibold text-muted">제품</th>
                <th className="text-left py-2 pr-4 font-semibold text-muted">제조사</th>
                <th className="text-left py-2 pr-4 font-semibold text-muted">HBM</th>
                <th className="text-left py-2 pr-4 font-semibold text-muted">총 대역폭</th>
                <th className="text-left py-2 font-semibold text-muted">HBM 용량</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              {[
                ["H100 SXM5", "NVIDIA", "HBM3", "3.35 TB/s", "80 GB"],
                ["H200 SXM5", "NVIDIA", "HBM3E", "4.8 TB/s", "141 GB"],
                ["MI300X", "AMD", "HBM3", "5.3 TB/s", "192 GB"],
                ["MI325X", "AMD", "HBM3E", "6.0 TB/s", "256 GB"],
                ["Gaudi 3", "Intel", "HBM2E", "3.7 TB/s", "128 GB"],
              ].map(([prod, mfg, hbm, bw, cap]) => (
                <tr key={prod}>
                  <td className="py-2 pr-4 font-mono font-medium">{prod}</td>
                  <td className="py-2 pr-4 text-muted">{mfg}</td>
                  <td className="py-2 pr-4 text-blue-400">{hbm}</td>
                  <td className="py-2 pr-4 text-orange-400 font-semibold">{bw}</td>
                  <td className="py-2 text-muted">{cap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Insight>
          H200은 H100보다 HBM 용량이 76% 늘고 대역폭이 43% 증가했습니다. 대형 언어 모델의 KV 캐시 병목을 해소하는 것이 주목적입니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
