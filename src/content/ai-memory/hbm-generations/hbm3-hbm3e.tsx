import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** HBM3·HBM3E 세대 사양 */
const GEN_DATA = [
  {
    gen: "HBM3",
    year: "2022~",
    pinRate: "6.4 Gbps",
    io: "1,024",
    bw: "~819 GB/s",
    maxStack: "8-Hi",
    maxCap: "24 GB",
    ref: "NVIDIA H100",
    color: "#a855f7",
    barPct: 68,
  },
  {
    gen: "HBM3E",
    year: "2024~",
    pinRate: "~9.6 Gbps",
    io: "1,024",
    bw: "~1.2 TB/s",
    maxStack: "12-Hi",
    maxCap: "36 GB",
    ref: "H200 · MI325X",
    color: "#ec4899",
    barPct: 100,
  },
];

/** 세대별 대역폭 막대그래프 (HBM2E 기준선 포함) */
function BandwidthChart() {
  return (
    <svg
      width="100%"
      viewBox="0 0 460 200"
      style={{ fontFamily: "sans-serif", maxWidth: 520 }}
    >
      {/* 제목 */}
      <text x={8} y={16} fontSize={10} fill="#94a3b8" fontWeight={600}>
        스택당 대역폭 (GB/s) — HBM2E 이후 세대 비교
      </text>

      {/* HBM2E 기준선 */}
      <g>
        <text x={4} y={52} fontSize={11} fill="#64748b" fontWeight={600}>HBM2E</text>
        <text x={4} y={64} fontSize={9} fill="#475569">~460 GB/s</text>
        <rect x={80} y={42} width={109} height={18} fill="#06b6d4" rx={3} opacity={0.5} />
        <text x={196} y={55} fontSize={10} fill="#06b6d4" fontWeight={600}>~460 GB/s</text>
      </g>

      {GEN_DATA.map((d, i) => {
        const y = 90 + i * 52;
        const barW = (d.barPct / 100) * 287;
        return (
          <g key={d.gen}>
            <text x={4} y={y + 14} fontSize={12} fill="#e2e8f0" fontWeight={700}>
              {d.gen}
            </text>
            <text x={4} y={y + 27} fontSize={9} fill="#64748b">{d.year}</text>
            <rect x={80} y={y + 2} width={barW} height={22} fill={d.color} rx={3} opacity={0.85} />
            <text x={80 + barW + 6} y={y + 17} fontSize={11} fill={d.color} fontWeight={700}>
              {d.bw}
            </text>
          </g>
        );
      })}

      {/* 기준선 점선 */}
      <line x1={80} y1={22} x2={80} y2={185} stroke="#334155" strokeWidth={1} strokeDasharray="3 3" />
      <line x1={189} y1={32} x2={189} y2={185} stroke="#334155" strokeWidth={1} strokeDasharray="3 3" />
      <text x={135} y={185} fontSize={8} fill="#475569" textAnchor="middle">HBM2E 수준</text>
    </svg>
  );
}

/** 사양 비교표 */
function SpecTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-sidebar-border">
            <th className="text-left py-2 pr-4 font-semibold text-muted">세대</th>
            <th className="text-left py-2 pr-4 font-semibold text-muted">연도</th>
            <th className="text-left py-2 pr-4 font-semibold text-muted">핀당 속도</th>
            <th className="text-left py-2 pr-4 font-semibold text-muted">I/O (비트)</th>
            <th className="text-left py-2 pr-4 font-semibold text-muted">대역폭/스택</th>
            <th className="text-left py-2 pr-4 font-semibold text-muted">최대 Hi</th>
            <th className="text-left py-2 pr-4 font-semibold text-muted">용량/스택</th>
            <th className="text-left py-2 font-semibold text-muted">대표 GPU</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-sidebar-border">
          {GEN_DATA.map((d) => (
            <tr key={d.gen}>
              <td className="py-2 pr-4 font-semibold" style={{ color: d.color }}>
                {d.gen}
              </td>
              <td className="py-2 pr-4 text-muted">{d.year}</td>
              <td className="py-2 pr-4 font-semibold" style={{ color: d.color }}>
                {d.pinRate}
              </td>
              <td className="py-2 pr-4 text-orange-400 font-semibold">{d.io}</td>
              <td className="py-2 pr-4 font-bold">{d.bw}</td>
              <td className="py-2 pr-4 text-muted">{d.maxStack}</td>
              <td className="py-2 pr-4">{d.maxCap}</td>
              <td className="py-2 text-muted">{d.ref}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Hbm3Hbm3e() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        HBM3(2022)는 핀당 속도를 6.4 Gbps로 끌어올려 스택당 대역폭 ~819 GB/s를 달성하며
        생성형 AI 붐과 함께 GPU 메모리의 주류가 됐습니다. HBM3E(2024)는 그 한 발 더 나아가
        ~9.6 Gbps, ~1.2 TB/s로 처음으로 1 TB/s 벽을 넘었습니다.
      </p>

      {/* ── HBM3 ── */}
      <CalcBox title="■ HBM3 (2022) — TB/s 시대의 문을 열다">
        <SubSection title="● 표준 사양">
          <p className="text-sm mb-3">
            JEDEC은 2022년 HBM3 표준(JESD238)을 확정했습니다. 핵심 수치는 다음과 같습니다:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-purple-400 mb-1">핀당 데이터 속도</div>
              <p className="text-muted"><strong>6.4 Gbps</strong> — HBM2E(~3.6 Gbps)의 약 1.8배.</p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-purple-400 mb-1">버스폭(I/O)</div>
              <p className="text-muted"><strong>1,024-bit</strong> 유지 — HBM의 넓은 버스 기준선.</p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-purple-400 mb-1">대역폭/스택</div>
              <p className="text-muted"><strong>~819 GB/s</strong>(6.4 Gbps × 1,024-bit ÷ 8).</p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-purple-400 mb-1">적층 · 용량</div>
              <p className="text-muted">최대 <strong>16-Hi</strong>, 스택당 최대 <strong>24 GB</strong>.</p>
            </div>
          </div>
        </SubSection>

        <SubSection title="● NVIDIA H100 탑재">
          <p className="text-sm mb-2">
            NVIDIA H100(Hopper, 2022)은 HBM3 스택 5개를 탑재해 총 대역폭
            <strong> ~3.35 TB/s</strong>, 총 용량 <strong>80 GB</strong>를 달성했습니다.
            ChatGPT 서비스 급성장 이후 H100 수요가 폭발하면서 HBM3는 사실상 AI 인프라의 기본 부품이 됐습니다.
          </p>
          <p className="text-sm text-muted">
            AMD MI300X 역시 HBM3 스택 8개(총 192 GB, ~5.3 TB/s)로 엔터프라이즈 AI 시장에 진입했습니다.
          </p>
        </SubSection>
        <Insight>
          HBM3부터 &ldquo;스택 수 × 대역폭&rdquo;이 처음으로 3 TB/s 시스템 대역폭을 넘었습니다.
          AI 모델의 파라미터 이동량이 주 병목인 추론 워크로드에서 이 수치가 직결됩니다.
        </Insight>
      </CalcBox>

      {/* ── HBM3E ── */}
      <CalcBox title="■ HBM3E (2024) — 1 TB/s 돌파">
        <SubSection title="● HBM3 대비 개선">
          <p className="text-sm mb-3">
            HBM3E는 핀당 속도를 <strong>~9.6 Gbps</strong>까지 올려 스택당
            <strong> ~1.2 TB/s</strong>를 달성했습니다. 버스폭은 동일한 1,024-bit를 유지해
            속도(클럭) 향상이 대역폭 증가의 주 원동력입니다.
            용량은 <strong>12-Hi</strong> 적층(3 GB 다이 12장)으로 스택당 <strong>36 GB</strong>(8-Hi는 24 GB).
          </p>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-pink-400 mb-1">NVIDIA H200</div>
              <p className="text-muted">HBM3E × 5개 &rarr; 총 <strong>4.8 TB/s</strong>, 141 GB.</p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-pink-400 mb-1">AMD MI325X</div>
              <p className="text-muted">HBM3E × 8개 &rarr; 총 <strong>~6.0 TB/s</strong>, 256 GB.</p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-pink-400 mb-1">NVIDIA B200</div>
              <p className="text-muted">HBM3E × 8개 &rarr; 총 <strong>~8 TB/s</strong>, 192 GB.</p>
            </div>
          </div>
        </SubSection>
        <SubSection title="● AI 붐과 HBM3E 수요">
          <p className="text-sm mb-2">
            2023~2024년 생성형 AI 인프라 투자가 급증하면서 HBM3E 공급 부족이 산업 이슈가 됐습니다.
            SK하이닉스는 NVIDIA 독점 공급으로 HBM 점유율 50% 이상을 달성했고,
            삼성·마이크론도 HBM3E 생산을 서둘렀습니다.
          </p>
          <p className="text-sm text-muted">
            HBM3E 단계까지 버스폭(1,024-bit)은 고정이었습니다. 다음 HBM4부터 버스폭이
            <strong> 2,048-bit</strong>로 2배 확장되며 새 시대를 엽니다.
          </p>
        </SubSection>
      </CalcBox>

      {/* ── 사양 종합표 및 대역폭 그래프 ── */}
      <CalcBox title="■ HBM3 · HBM3E 사양 비교">
        <SpecTable />
        <div className="mt-6">
          <BandwidthChart />
        </div>
        <p className="text-xs text-muted mt-2">
          ※ 대역폭은 핀당 속도 × 1,024-bit ÷ 8 계산치. 적층수는 양산 제품 기준(HBM3 8-Hi/24 GB, HBM3E 12-Hi/36 GB)이며, JEDEC 표준은 최대 16-Hi까지 허용. 실제 구현체는 일부 차이가 있을 수 있음.
        </p>
      </CalcBox>

      {/* ── HBM2E → HBM3 → HBM3E 점프 ── */}
      <CalcBox title="■ 세대 간 핵심 변화 요약">
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-blue-400 mb-1">HBM2E &rarr; HBM3</div>
            <p className="text-muted">
              핀당 속도 3.6 &rarr; 6.4 Gbps(+78%), 용량 16 &rarr; 24 GB(8-Hi).
            </p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-pink-400 mb-1">HBM3 &rarr; HBM3E</div>
            <p className="text-muted">
              핀당 속도 6.4 &rarr; 9.6 Gbps(+50%), 용량 24 GB(8-Hi) &rarr; 36 GB(12-Hi).
            </p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-orange-400 mb-1">I/O 버스폭 — 불변</div>
            <p className="text-muted">HBM1~3E 내내 1,024-bit 유지. 대역폭 성장 = 클럭 향상으로만.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-green-400 mb-1">HBM4의 과제</div>
            <p className="text-muted">클럭만으로는 한계 &rarr; I/O를 1,024 &rarr; <strong>2,048비트</strong>로 2배 확장.</p>
          </div>
        </div>
        <Insight>
          HBM3·HBM3E 세대는 AI 학습/추론 인프라의 표준이 됐으나, 핀당 속도 향상만으로는
          TB/s 이상의 점프가 어렵습니다. 다음 단원 HBM4에서 버스폭 혁신이 등장합니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
