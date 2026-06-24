"use client";

import { useState } from "react";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

type CellType = "SLC" | "MLC" | "TLC" | "QLC";

const CELL_DATA: {
  type: CellType;
  bits: number;
  states: number;
  speed: string;
  endurance: string;
  density: string;
  color: string;
}[] = [
  { type: "SLC", bits: 1, states: 2, speed: "매우 빠름", endurance: "10만+ 회", density: "낮음", color: "#22c55e" },
  { type: "MLC", bits: 2, states: 4, speed: "빠름", endurance: "3~1만 회", density: "보통", color: "#0ea5e9" },
  { type: "TLC", bits: 3, states: 8, speed: "보통", endurance: "1천~3천 회", density: "높음", color: "#f59e0b" },
  { type: "QLC", bits: 4, states: 16, speed: "느림", endurance: "수백~1천 회", density: "매우 높음", color: "#ef4444" },
];

/** 셀 전하량 상태 시각화 */
function CellStatesDiagram({ active }: { active: CellType }) {
  const cell = CELL_DATA.find((c) => c.type === active)!;
  const barW = 36;
  const gap = 8;
  const totalW = cell.states * (barW + gap) - gap;
  const startX = (360 - totalW) / 2;

  return (
    <svg width="100%" viewBox="0 0 360 120" style={{ maxWidth: 360 }}>
      <text x={180} y={18} textAnchor="middle" fontSize={11} fill="#94a3b8">
        {cell.type} — {cell.states}가지 전하 상태 ({cell.bits}비트/셀)
      </text>
      {Array.from({ length: cell.states }).map((_, i) => {
        const ratio = (i + 1) / cell.states;
        const barH = Math.round(60 * ratio);
        return (
          <g key={i}>
            <rect
              x={startX + i * (barW + gap)}
              y={90 - barH}
              width={barW}
              height={barH}
              rx={3}
              fill={cell.color}
              opacity={0.7 + 0.3 * ratio}
            />
            <text
              x={startX + i * (barW + gap) + barW / 2}
              y={105}
              textAnchor="middle"
              fontSize={9}
              fill="#94a3b8"
            >
              {i.toString(2).padStart(cell.bits, "0")}
            </text>
          </g>
        );
      })}
      <text x={180} y={118} textAnchor="middle" fontSize={9} fill="#64748b">
        각 막대 = 플로팅 게이트 전하량 레벨 (이진 코드)
      </text>
    </svg>
  );
}

export default function NandFlash() {
  const [activeCell, setActiveCell] = useState<CellType>("TLC");

  return (
    <div className="space-y-8">
      <p className="text-muted">
        HBF의 토대인 3D NAND 플래시를 이해하면 HBF의 특성(비휘발·대용량·쓰기 수명 제한)이
        왜 그런지 명확해집니다. DRAM과 비교하면서 차이를 파악합니다.
      </p>

      {/* ── NAND 셀 원리 ── */}
      <CalcBox title="■ NAND 플래시 셀 원리 — 전하를 가두는 구조">
        <SubSection title="● 플로팅 게이트 / 차지 트랩">
          <p className="text-sm mb-3">
            NAND 셀은 <strong>플로팅 게이트(Floating Gate)</strong> 또는{" "}
            <strong>차지 트랩 레이어(Charge Trap Layer)</strong>에 전자를 가두어 데이터를 저장합니다.
            산화막(Oxide)이 전자를 붙잡아 두기 때문에 <strong>전원이 꺼져도 데이터가 유지</strong>됩니다.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-2 text-sm">셀 구조 (단면)</p>
              <svg width="100%" viewBox="0 0 200 160" style={{ maxWidth: 200 }}>
                {/* 기판 */}
                <rect x={20} y={130} width={160} height={20} rx={2} fill="#475569" />
                <text x={100} y={144} textAnchor="middle" fontSize={9} fill="#cbd5e1">기판 (Substrate)</text>
                {/* 터널 산화막 */}
                <rect x={20} y={112} width={160} height={18} rx={0} fill="#fde68a" opacity={0.7} />
                <text x={100} y={124} textAnchor="middle" fontSize={8} fill="#78350f">터널 산화막</text>
                {/* 플로팅 게이트 */}
                <rect x={20} y={88} width={160} height={24} rx={2} fill="#6366f1" opacity={0.85} />
                <text x={100} y={103} textAnchor="middle" fontSize={9} fill="#e0e7ff">플로팅 게이트 (전자 포획)</text>
                {/* 산화막 */}
                <rect x={20} y={70} width={160} height={18} rx={0} fill="#fde68a" opacity={0.7} />
                <text x={100} y={82} textAnchor="middle" fontSize={8} fill="#78350f">블로킹 산화막</text>
                {/* 컨트롤 게이트 */}
                <rect x={20} y={50} width={160} height={20} rx={2} fill="#0ea5e9" opacity={0.85} />
                <text x={100} y={63} textAnchor="middle" fontSize={9} fill="#e0f2fe">컨트롤 게이트</text>
                {/* 전자 표시 */}
                {[60, 80, 110, 140].map((x) => (
                  <circle key={x} cx={x} cy={100} r={4} fill="#facc15" opacity={0.9} />
                ))}
                <text x={100} y={15} textAnchor="middle" fontSize={9} fill="#64748b">전자(●) = 저장된 데이터</text>
              </svg>
            </div>
            <div className="space-y-2 text-sm">
              <p>① <strong>쓰기(Program)</strong>: 컨트롤 게이트에 고전압 → 전자가 터널 산화막을 통해 플로팅 게이트로 주입.</p>
              <p>② <strong>읽기(Read)</strong>: 컨트롤 게이트에 읽기 전압 → 전류 흐름 여부로 전하량(데이터) 판별.</p>
              <p>③ <strong>소거(Erase)</strong>: 기판에 고전압 → 전자를 플로팅 게이트 밖으로 빼냄. <strong>블록 단위</strong>로만 가능.</p>
            </div>
          </div>
        </SubSection>
        <SubSection title="● DRAM과의 핵심 차이">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mt-1">
              <thead>
                <tr className="border-b border-sidebar-border">
                  <th className="text-left py-2 pr-4 font-semibold text-muted">항목</th>
                  <th className="text-left py-2 pr-4 font-semibold text-blue-400">DRAM</th>
                  <th className="text-left py-2 font-semibold text-amber-400">NAND 플래시</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr>
                  <td className="py-2 pr-4 font-medium">저장 원리</td>
                  <td className="py-2 pr-4 text-muted">커패시터 전하 (누설)</td>
                  <td className="py-2 text-muted">플로팅 게이트 전자 포획</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">비휘발성</td>
                  <td className="py-2 pr-4 text-red-400">아니오 (리프레시 필요)</td>
                  <td className="py-2 text-green-400">예 (전원 꺼도 유지)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">소거 단위</td>
                  <td className="py-2 pr-4 text-muted">비트/바이트 단위</td>
                  <td className="py-2 text-muted">블록(수 MB) 단위</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">속도</td>
                  <td className="py-2 pr-4 text-muted">ns급 (매우 빠름)</td>
                  <td className="py-2 text-muted">µs급 (쓰기/소거 느림)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">내구성</td>
                  <td className="py-2 pr-4 text-muted">사실상 무제한</td>
                  <td className="py-2 text-muted">100~10만 회 (셀 종류별 상이)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SubSection>
        <Insight>
          NAND의 &ldquo;비휘발+대용량&rdquo;은 장점, &ldquo;블록 단위 소거+유한 수명&rdquo;은 HBF
          설계에서 반드시 관리해야 할 제약입니다.
        </Insight>
      </CalcBox>

      {/* ── 3D NAND ── */}
      <CalcBox title="■ 3D NAND — 수직 적층으로 용량 키우기">
        <p className="text-sm mb-4">
          평면(2D) NAND는 셀 간격을 줄이는 데 물리적 한계에 직면했습니다. 3D NAND는 셀을
          <strong> 수직으로 100층 이상</strong> 쌓아 같은 면적에서 용량을 수십 배 늘립니다.
          HBF는 이 3D NAND 다이를 TSV로 다시 수직 적층해 대역폭을 추가로 높입니다.
        </p>
        <div className="flex flex-col items-center gap-2">
          <svg width="100%" viewBox="0 0 400 180" style={{ maxWidth: 400 }}>
            {/* 2D NAND */}
            <text x={90} y={18} textAnchor="middle" fontSize={11} fill="#94a3b8" fontWeight={600}>2D NAND</text>
            {[30, 50, 70, 90, 110].map((x) => (
              <rect key={x} x={x} y={30} width={16} height={120} rx={2} fill="#6366f1" opacity={0.5} />
            ))}
            <text x={90} y={165} textAnchor="middle" fontSize={9} fill="#64748b">셀 가로 배열 → 미세화 한계</text>

            {/* 화살표 */}
            <text x={205} y={95} textAnchor="middle" fontSize={20} fill="#94a3b8">&rarr;</text>

            {/* 3D NAND */}
            <text x={310} y={18} textAnchor="middle" fontSize={11} fill="#94a3b8" fontWeight={600}>3D NAND</text>
            {[30, 20, 10].map((offset, idx) => (
              <rect key={idx} x={240 + offset} y={30 + idx * 30} width={140 - offset * 2} height={24}
                rx={3} fill="#0ea5e9" opacity={0.55 + idx * 0.15} />
            ))}
            {[70, 60, 50, 40, 30, 20].map((offset, idx) => (
              <rect key={idx} x={240 + offset / 3} y={130 - idx * 12} width={140 - offset / 1.5} height={10}
                rx={2} fill="#f59e0b" opacity={0.4 + idx * 0.08} />
            ))}
            <text x={220} y={170} textAnchor="start" fontSize={9} fill="#64748b">층을 위로 쌓아 100층+ 달성</text>
          </svg>
          <p className="text-xs text-muted text-center">3D NAND: 셀을 수직으로 쌓아 면적 대비 용량을 획기적으로 늘림</p>
        </div>
      </CalcBox>

      {/* ── SLC/MLC/TLC/QLC ── */}
      <CalcBox title="■ 셀 유형 — SLC · MLC · TLC · QLC">
        <p className="text-sm mb-4">
          한 셀에 몇 비트를 저장하느냐에 따라 속도·내구성·밀도가 달라집니다. 셀을 선택하면
          전하량 상태 다이어그램이 바뀝니다.
        </p>
        <div className="flex gap-1 bg-sidebar-bg rounded-lg p-1 mb-4">
          {CELL_DATA.map((c) => (
            <button
              key={c.type}
              onClick={() => setActiveCell(c.type)}
              className={`flex-1 py-1.5 rounded-md text-sm transition-colors ${
                activeCell === c.type
                  ? "bg-white dark:bg-gray-800 font-semibold shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {c.type}
            </button>
          ))}
        </div>

        <div className="flex justify-center mb-4">
          <CellStatesDiagram active={activeCell} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-sidebar-border">
                <th className="text-left py-2 pr-3 font-semibold text-muted">유형</th>
                <th className="text-left py-2 pr-3 font-semibold text-muted">비트/셀</th>
                <th className="text-left py-2 pr-3 font-semibold text-muted">P/E 내구성</th>
                <th className="text-left py-2 pr-3 font-semibold text-muted">속도</th>
                <th className="text-left py-2 font-semibold text-muted">밀도</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              {CELL_DATA.map((c) => (
                <tr
                  key={c.type}
                  className={activeCell === c.type ? "bg-sidebar-bg" : ""}
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveCell(c.type)}
                >
                  <td className="py-2 pr-3 font-bold" style={{ color: c.color }}>{c.type}</td>
                  <td className="py-2 pr-3">{c.bits}비트 ({c.states}상태)</td>
                  <td className="py-2 pr-3 text-muted">{c.endurance}</td>
                  <td className="py-2 pr-3 text-muted">{c.speed}</td>
                  <td className="py-2 text-muted">{c.density}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted mt-3">
          HBF는 대용량을 위해 TLC/QLC를 사용하므로 <strong>쓰기 내구성이 낮습니다</strong>.
          이것이 HBF가 &ldquo;read-heavy(읽기 중심) 운용 모델&rdquo;을 요구하는 근본 이유입니다.
        </p>
        <Insight>
          셀당 비트를 늘릴수록 용량&uarr;&middot;단가&darr;, 속도&darr;&middot;수명&darr;.
          HBF는 이 트레이드오프를 <strong>웨어레벨링(베이스 로직 다이)</strong>과
          <strong>읽기 중심 AI 워크로드</strong>로 극복합니다.
        </Insight>
      </CalcBox>

      {/* ── HBF로 연결 ── */}
      <CalcBox title="■ 3D NAND에서 HBF로 — 연결고리">
        <p className="text-sm mb-3">
          HBF는 3D NAND 다이를 기반으로 HBM의 패키징 철학(TSV + 적층 + 베이스 로직 다이)을
          결합한 기술입니다. 3D NAND가 &ldquo;셀을 위로 쌓는다&rdquo;면, HBF는{" "}
          <strong>&ldquo;그 3D NAND 다이 자체를 다시 TSV로 위로 쌓는다&rdquo;</strong>는 2중 적층 구조입니다.
        </p>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold mb-1">① 3D NAND</div>
            <p className="text-muted text-xs">셀을 수직 100층+ 쌓아 용량 확보</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold mb-1">② TSV 적층</div>
            <p className="text-muted text-xs">3D NAND 다이를 TSV로 다시 수직 연결 → 대역폭 확보</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold mb-1">③ 베이스 로직 다이</div>
            <p className="text-muted text-xs">최하단 컨트롤러가 웨어레벨링·I/O 관리</p>
          </div>
        </div>
      </CalcBox>
    </div>
  );
}
