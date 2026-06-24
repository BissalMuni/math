"use client";

import { useState } from "react";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

type TabKey = "diagram" | "members";

const ECOSYSTEM = [
  { name: "SK하이닉스", role: "HBF 개발·제조 (H3 아키텍처)", color: "#3b82f6" },
  { name: "SanDisk (WD)", role: "NAND 플래시 기술·표준 공동 발의", color: "#8b5cf6" },
  { name: "NVIDIA", role: "GPU 통합 파트너 (채택 목표 2028+)", color: "#22c55e" },
  { name: "Google", role: "TPU / AI 가속기 통합 검토", color: "#f59e0b" },
  { name: "AMD", role: "MI 시리즈 HBF 채택 검토", color: "#ef4444" },
  { name: "Broadcom", role: "네트워킹 ASIC 통합 검토", color: "#6366f1" },
];

/** H3 아키텍처 배치도 — GPU + HBM + HBF 병치 */
function H3DiagramSvg() {
  return (
    <svg width="100%" viewBox="0 0 520 220" style={{ fontFamily: "sans-serif" }}>
      {/* 인터포저 배경 */}
      <rect x={20} y={140} width={480} height={60} fill="#1e293b" stroke="#334155" strokeWidth={1.5} rx={4} />
      <text x={260} y={163} textAnchor="middle" fontSize={10} fill="#64748b">실리콘 인터포저 (Silicon Interposer)</text>
      <text x={260} y={178} textAnchor="middle" fontSize={9} fill="#475569">광폭 버스: HBM 1,024~2,048비트 / HBF TSV 기반 버스</text>

      {/* HBF 스택 (왼쪽) */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={`hbf-${i}`} x={40} y={30 + i * 24} width={100} height={20}
          fill="#7c3aed" stroke="#a78bfa" strokeWidth={1} rx={2} opacity={0.85} />
      ))}
      <text x={90} y={22} textAnchor="middle" fontSize={11} fill="#a78bfa" fontWeight={700}>HBF</text>
      <text x={90} y={130} textAnchor="middle" fontSize={9} fill="#7c3aed">3D NAND 적층</text>
      <text x={90} y={142} textAnchor="middle" fontSize={9} fill="#64748b">최대 512 GB</text>
      {/* HBF TSV lines */}
      {[60, 80, 100, 120].map((x) => (
        <line key={`hbf-tsv-${x}`} x1={x} y1={126} x2={x} y2={140} stroke="#7c3aed" strokeWidth={1.5} />
      ))}

      {/* GPU 다이 (중앙) */}
      <rect x={195} y={25} width={130} height={110} fill="#0f172a" stroke="#3b82f6" strokeWidth={2} rx={4} />
      <text x={260} y={52} textAnchor="middle" fontSize={12} fill="#93c5fd" fontWeight={700}>GPU</text>
      <text x={260} y={70} textAnchor="middle" fontSize={9} fill="#64748b">연산 코어</text>
      <text x={260} y={84} textAnchor="middle" fontSize={9} fill="#64748b">(NVIDIA Feynman+)</text>
      <rect x={220} y={95} width={80} height={14} fill="#1e3a5f" stroke="#3b82f6" strokeWidth={1} rx={2} />
      <text x={260} y={106} textAnchor="middle" fontSize={8} fill="#93c5fd">HBM 컨트롤러</text>
      <rect x={220} y={113} width={80} height={14} fill="#1e1b4b" stroke="#6366f1" strokeWidth={1} rx={2} />
      <text x={260} y={124} textAnchor="middle" fontSize={8} fill="#a5b4fc">HBF 컨트롤러</text>
      {/* GPU TSV to interposer */}
      {[220, 240, 260, 280, 300].map((x) => (
        <line key={`gpu-tsv-${x}`} x1={x} y1={135} x2={x} y2={140} stroke="#3b82f6" strokeWidth={1.5} />
      ))}

      {/* HBM 스택 (오른쪽) */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={`hbm-${i}`} x={380} y={22 + i * 14} width={100} height={11}
          fill="#0369a1" stroke="#38bdf8" strokeWidth={0.8} rx={2} opacity={0.85} />
      ))}
      <text x={430} y={14} textAnchor="middle" fontSize={11} fill="#38bdf8" fontWeight={700}>HBM</text>
      <text x={430} y={137} textAnchor="middle" fontSize={9} fill="#0369a1">DRAM 12~24-Hi</text>
      <text x={430} y={149} textAnchor="middle" fontSize={9} fill="#64748b">2 TB/s+ (HBM4)</text>
      {/* HBM TSV lines */}
      {[395, 415, 435, 455, 475].map((x) => (
        <line key={`hbm-tsv-${x}`} x1={x} y1={130} x2={x} y2={140} stroke="#0284c7" strokeWidth={1.5} />
      ))}

      {/* 연결 화살표 (인터포저 위) */}
      <line x1={140} y1={158} x2={193} y2={158} stroke="#7c3aed" strokeWidth={2} markerEnd="url(#arr-purple)" />
      <line x1={327} y1={158} x2={378} y2={158} stroke="#0284c7" strokeWidth={2} markerEnd="url(#arr-blue)" />

      <text x={167} y={152} textAnchor="middle" fontSize={8} fill="#a78bfa">HBF 버스</text>
      <text x={352} y={152} textAnchor="middle" fontSize={8} fill="#38bdf8">HBM 버스</text>

      {/* 비고 */}
      <text x={260} y={215} textAnchor="middle" fontSize={9} fill="#475569">
        기존: GPU + HBM만 인접 &rarr; H3: GPU + HBM + HBF 나란히 배치
      </text>

      <defs>
        <marker id="arr-purple" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#7c3aed" />
        </marker>
        <marker id="arr-blue" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#0284c7" />
        </marker>
      </defs>
    </svg>
  );
}

export default function HbfStandardization() {
  const [tab, setTab] = useState<TabKey>("diagram");

  return (
    <div className="space-y-8">
      <p className="text-muted">
        HBF(High Bandwidth Flash)는 3D NAND 플래시를 TSV로 수직 적층해 HBM 수준의 대역폭과 SSD급 대용량을
        동시에 구현하는 차세대 메모리입니다. 2026년 2월 SK하이닉스와 SanDisk가 공동 표준화 컨소시엄을 결성하며
        산업 생태계 형성이 본격화됐습니다.
      </p>

      {/* ── H3 아키텍처 ── */}
      <CalcBox title="■ H3 아키텍처 — GPU + HBM + HBF 병치">
        <p className="text-sm mb-4">
          SK하이닉스의 <strong>H3 아키텍처</strong>는 기존 &ldquo;GPU + HBM만 인접&rdquo;
          배치에서 나아가 <strong>HBF를 GPU 옆에 나란히</strong> 추가 배치하는 설계입니다.
          HBM이 초고속 캐시(책꽂이) 역할을 맡는다면, HBF는 대용량 라이브러리(도서관) 역할을 합니다.
        </p>

        {/* 탭 */}
        <div className="flex gap-1 bg-sidebar-bg rounded-lg p-1 mb-4">
          {([
            ["diagram", "배치도"],
            ["members", "생태계"],
          ] as [TabKey, string][]).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex-1 py-1.5 rounded-md text-sm transition-colors ${
                tab === key
                  ? "bg-white dark:bg-gray-800 font-semibold shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}>
              {label}
            </button>
          ))}
        </div>

        {tab === "diagram" && <H3DiagramSvg />}
        {tab === "members" && (
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            {ECOSYSTEM.map((e) => (
              <div key={e.name} className="rounded-lg border border-sidebar-border p-3">
                <span className="font-semibold" style={{ color: e.color }}>{e.name}</span>
                <p className="text-muted mt-0.5">{e.role}</p>
              </div>
            ))}
          </div>
        )}

        <Insight>
          HBM = 100 GB 캐시(초고속, 2 TB/s+) / HBF = 1 TB 라이브러리(대용량, 1.638 TB/s).
          H3 아키텍처는 두 메모리를 인터포저 위에서 병치해 AI 추론의 &ldquo;용량 vs 속도&rdquo; 딜레마를 동시에 해결합니다.
        </Insight>
      </CalcBox>

      {/* ── 표준화 컨소시엄 ── */}
      <CalcBox title="■ HBF 표준화 컨소시엄 (2026-02)">
        <SubSection title="● 결성 배경">
          <p className="text-sm mb-2">
            2026년 2월, SK하이닉스와 SanDisk(Western Digital)가 <strong>HBF 표준화 컨소시엄</strong>을
            공동 결성했습니다. 목표는 HBF 인터페이스·패키징·전기 특성의 업계 표준을 수립해 다양한 GPU·ASIC
            파트너가 동일 규격으로 통합할 수 있도록 생태계를 형성하는 것입니다.
          </p>
          <p className="text-sm text-muted">
            ① 공통 표준 없이는 각 GPU 업체가 독자 인터페이스를 개발해야 하므로 채택 비용이 폭증합니다.<br />
            ② JEDEC이 HBM 표준을 정비한 것처럼, HBF도 JEDEC 또는 독자 컨소시엄 경로로 표준화가 진행됩니다.<br />
            ③ NVIDIA·Google·AMD·Broadcom이 생태계 파트너로 참여 검토 중입니다.
          </p>
        </SubSection>

        <SubSection title="● JEDEC과의 관계">
          <p className="text-sm mb-2">
            HBM은 JEDEC JESD238 표준으로 정의됩니다. HBF는 HBM과 동일한 TSV·인터포저 패키징 기반을 공유하므로
            JEDEC 표준화 경로를 활용할 가능성이 높습니다. 표준 수립은 통상 엔지니어링 샘플 출시(~2027)
            이전에 초안을 완성하는 일정으로 진행됩니다.
          </p>
        </SubSection>
      </CalcBox>

      {/* ── HBM vs HBF 비교 ── */}
      <CalcBox title="■ HBM vs HBF — 역할 비교">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-sidebar-border">
                <th className="text-left py-2 pr-4 font-semibold text-muted">항목</th>
                <th className="text-left py-2 pr-4 font-semibold text-blue-400">HBM</th>
                <th className="text-left py-2 font-semibold text-purple-400">HBF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              {[
                ["메모리 셀", "DRAM", "3D NAND 플래시"],
                ["역할 비유", "책꽂이 (캐시)", "도서관 (대용량)"],
                ["용량 (유닛당)", "36~48 GB (HBM4)", "최대 512 GB"],
                ["대역폭 (유닛당)", "2.0 TB/s (HBM4)", "최대 1.638 TB/s"],
                ["내구성", "사실상 무제한", "쓰기 ~10만 회 / 읽기 무제한"],
                ["GPU 배치", "인접 (기존)", "인접 — H3 아키텍처 추가"],
                ["접속 방식", "TSV + 인터포저", "TSV + 베이스 로직 다이"],
              ].map(([item, hbm, hbf]) => (
                <tr key={item}>
                  <td className="py-2 pr-4 font-medium">{item}</td>
                  <td className="py-2 pr-4 text-blue-300">{hbm}</td>
                  <td className="py-2 text-purple-300">{hbf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CalcBox>
    </div>
  );
}
