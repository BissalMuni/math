"use client";

import { useState } from "react";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";
import { InlineMath } from "@/components/math/math-formula";

/** HBM4 → HBM5 I/O 도약 — 2,048 → 4,096 비트 */
function IoLeapDiagram() {
  return (
    <svg
      width="100%"
      viewBox="0 0 520 220"
      style={{ fontFamily: "sans-serif", maxWidth: 600 }}
    >
      <text x={8} y={16} fontSize={10} fill="#94a3b8" fontWeight={600}>
        I/O 버스폭 도약 — HBM4 &rarr; HBM5
      </text>

      {/* HBM4 */}
      <text x={4} y={52} fontSize={11} fill="#f59e0b" fontWeight={600}>HBM4 (2026)</text>
      <text x={4} y={65} fontSize={9} fill="#64748b">2,048-bit · 2.0 TB/s</text>
      {Array.from({ length: 16 }).map((_, i) => (
        <rect key={`h4${i}`} x={80 + i * 18} y={40} width={14} height={18} fill="#f59e0b" rx={2} opacity={0.7} />
      ))}

      {/* 화살표 */}
      <line x1={256} y1={100} x2={256} y2={128} stroke="#64748b" strokeWidth={1.5} />
      <path d="M250 128 L256 140 L262 128" fill="#64748b" />
      <text x={264} y={118} fontSize={9} fill="#94a3b8" fontWeight={700}>I/O ×2</text>
      <text x={264} y={130} fontSize={9} fill="#94a3b8">BW ×2</text>

      {/* HBM5 */}
      <text x={4} y={162} fontSize={12} fill="#22d3ee" fontWeight={700}>HBM5 (2029)</text>
      <text x={4} y={175} fontSize={9} fill="#64748b">4,096-bit · 4 TB/s</text>
      {Array.from({ length: 32 }).map((_, i) => (
        <rect key={`h5${i}`} x={80 + i * 12} y={148} width={9} height={18} fill="#22d3ee" rx={2} opacity={0.85} />
      ))}
      <text x={80} y={195} fontSize={10} fill="#22d3ee" fontWeight={700}>4,096-bit · 4 TB/s · 16-Hi · 80 GB · 100 W</text>
    </svg>
  );
}

/** HBM5 주요 사양 상수 (page 29) */
const HBM5_SPECS = [
  { label: "Data Rate (핀당)", value: "8 Gbps", note: "HBM4와 동일 — 버스폭 확장이 핵심" },
  { label: "I/O (버스폭)", value: "4,096-bit", note: "HBM4(2,048) 대비 2배" },
  { label: "대역폭/스택", value: "4 TB/s", note: "HBM4(2.0) 대비 2배" },
  { label: "다이당 용량", value: "40 Gb", note: "HBM4(24 Gb) 대비 +67 %" },
  { label: "Die stack", value: "16-Hi", note: "16층 적층" },
  { label: "스택 용량", value: "80 GB", note: "16-Hi × 40 Gb ÷ 8" },
  { label: "Power/HBM", value: "100 W", note: "HBM4(75 W) 대비 +25 W" },
];

type TabKey = "spec" | "arch" | "system";

export default function Hbm5() {
  const [tab, setTab] = useState<TabKey>("spec");

  return (
    <div className="space-y-8">
      <p className="text-muted">
        HBM5(2029년 예상)는 I/O 버스폭을 <strong>4,096-bit</strong>로 두 배 확장하고
        스택당 대역폭 <strong>4 TB/s</strong>를 달성하는 세대입니다. 아키텍처 면에서는
        NMC(Near-Memory Computing)가 본격 도입되어 메모리 안에서 연산을 수행하는
        &ldquo;지능형 HBM&rdquo;의 시대를 엽니다.
      </p>

      {/* ── 핵심 사양 + 탭 ── */}
      <CalcBox title="■ HBM5 핵심 사양 (KAIST TERALAB 로드맵 p.29)">
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
                  <th className="text-left py-2 pr-4 font-semibold text-cyan-400">HBM5 수치</th>
                  <th className="text-left py-2 font-semibold text-muted">의미</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                {HBM5_SPECS.map((r) => (
                  <tr key={r.label}>
                    <td className="py-2 pr-4 text-muted">{r.label}</td>
                    <td className="py-2 pr-4 font-semibold text-cyan-400">{r.value}</td>
                    <td className="py-2 text-muted text-xs">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "arch" && (
          <div className="space-y-3 text-sm">
            <p className="text-muted">KAIST TERALAB 로드맵(p.29) 아키텍처 진화 흐름:</p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
                <div className="font-semibold text-cyan-400 mb-1">① Custom HBM Base Die</div>
                <p className="text-muted text-xs">HBM4에서 시작된 커스텀 베이스 다이가 HBM5에서 심화 — GPU 벤더별 PHY·전력 최적화.</p>
              </div>
              <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
                <div className="font-semibold text-cyan-400 mb-1">② HBM-LPDDR 통합</div>
                <p className="text-muted text-xs">LPDDR 컨트롤러를 HBM 베이스 다이에 내장 — 메모리 계층 통합으로 지연 감소.</p>
              </div>
              <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
                <div className="font-semibold text-cyan-400 mb-1">③ 3D NMC-HBM + Stacked Cache</div>
                <p className="text-muted text-xs">Near-Memory Computing 프로세서 삽입 + 캐시·디캡 적층 — 데이터를 메모리 근방에서 처리.</p>
              </div>
            </div>
            <Insight>
              NMC(Near-Memory Computing)란 연산 유닛을 메모리 다이 안 또는 베이스 다이에 심어,
              CPU/GPU까지 데이터를 보내지 않고 <strong>메모리 내부에서 전처리</strong>하는 개념입니다.
              이동 에너지를 줄이고 대역폭 병목을 완화합니다.
            </Insight>
          </div>
        )}

        {tab === "system" && (
          <div className="space-y-3 text-sm">
            <p className="text-muted">KAIST TERALAB 로드맵(p.344) — Feynman F400 GPU 시스템:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-sidebar-border">
                    <th className="text-left py-2 pr-4 font-semibold text-muted">항목</th>
                    <th className="text-left py-2 font-semibold text-cyan-400">Feynman F400 (2028)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sidebar-border">
                  <tr><td className="py-2 pr-4 text-muted">GPU 다이 수</td><td className="py-2">4개</td></tr>
                  <tr><td className="py-2 pr-4 text-muted">HBM 구성</td><td className="py-2 font-semibold text-cyan-400">HBM5 × 8 스택</td></tr>
                  <tr><td className="py-2 pr-4 text-muted">총 대역폭</td><td className="py-2 font-bold">48 TB/s</td></tr>
                  <tr><td className="py-2 pr-4 text-muted">총 HBM 용량</td><td className="py-2">400 / 500 GB</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted text-xs mt-2">
              스택당 4 TB/s × 8 스택 = <strong>32 TB/s</strong>(HBM5 단독 기준).
              F400 사양 48 TB/s는 GPU 내부 인터커넥트 등 추가 구성 포함 수치.
              총 용량 400~500 GB는 AI 추론 시 대형 모델 전체를 메모리에 적재 가능한 규모.
            </p>
          </div>
        )}
      </CalcBox>

      {/* ── I/O 도약 시각화 ── */}
      <CalcBox title="■ I/O 2,048 &rarr; 4,096 — 버스폭 2배 도약">
        <p className="text-sm mb-3 text-muted">
          HBM5에서도 핀당 속도는 8 Gbps를 유지하면서 I/O 비트 수를 두 배로 늘리는
          &ldquo;버스폭 확장&rdquo; 전략을 계속합니다:
        </p>
        <p className="text-sm text-center mb-4">
          <InlineMath math="\text{대역폭} = 8\,\text{Gbps} \times 4{,}096\,\text{bit} \div 8 = 4\,\text{TB/s}" />
        </p>
        <IoLeapDiagram />
        <Insight>
          HBM4 &rarr; HBM5 전환의 핵심은 I/O 2배(2,048 &rarr; 4,096)입니다.
          핀당 속도를 높이면 신호 무결성 문제가 커지므로, KAIST 로드맵은 일관되게
          <strong> 버스폭 확장</strong>을 대역폭 증가의 주요 수단으로 삼습니다.
        </Insight>
      </CalcBox>

      {/* ── 대역폭 공식 ── */}
      <CalcBox title="■ 대역폭 계산 — HBM4 vs HBM5">
        <SubSection title="● HBM4 (2026)">
          <p className="text-sm text-muted mb-2">
            <InlineMath math="8\,\text{Gbps} \times 2{,}048 \div 8 = 2.0\,\text{TB/s}" />
          </p>
        </SubSection>
        <SubSection title="● HBM5 (2029)">
          <p className="text-sm text-muted mb-2">
            <InlineMath math="8\,\text{Gbps} \times 4{,}096 \div 8 = 4.0\,\text{TB/s}" />
          </p>
          <p className="text-sm text-muted">
            버스폭 2배 → 대역폭 정확히 2배. 핀당 속도 불변이므로 신호 무결성 비용 없음.
          </p>
        </SubSection>
      </CalcBox>

      {/* ── 도전과제 ── */}
      <CalcBox title="■ HBM5의 도전 과제">
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold text-red-400 mb-1">전력 100 W</div>
            <p className="text-muted text-xs">HBM4(75 W) 대비 25 W 증가. 스택 8개 탑재 시 총 800 W. D2C 액체 냉각 필수.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold text-purple-400 mb-1">NMC 설계 복잡도</div>
            <p className="text-muted text-xs">메모리 다이 안에 프로세서를 심으면 검증·디버깅이 기존 DRAM 대비 훨씬 복잡해진다.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold text-amber-400 mb-1">16-Hi 적층 열</div>
            <p className="text-muted text-xs">16층 스택 가운데 다이에서 방열이 어렵다. 로드맵은 이후 세대에서 Immersion 냉각으로 전환.</p>
          </div>
        </div>
      </CalcBox>
    </div>
  );
}
