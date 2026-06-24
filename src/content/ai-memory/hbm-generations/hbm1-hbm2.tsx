import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** HBM1·HBM2·HBM2E 세대별 사양 데이터 */
const GEN_DATA = [
  {
    gen: "HBM1",
    year: "2015",
    pinRate: "1 Gbps",
    bus: "1,024-bit",
    bw: "~128 GB/s",
    maxStack: "4-Hi",
    maxCap: "4 GB",
    note: "AMD Radeon Fiji 첫 탑재",
    color: "#6366f1",
    bar: 64,
  },
  {
    gen: "HBM2",
    year: "2016~",
    pinRate: "2 Gbps",
    bus: "1,024-bit",
    bw: "~256 GB/s",
    maxStack: "8-Hi",
    maxCap: "8 GB",
    note: "NVIDIA V100·AMD Vega",
    color: "#3b82f6",
    bar: 128,
  },
  {
    gen: "HBM2E",
    year: "2019~",
    pinRate: "~3.6 Gbps",
    bus: "1,024-bit",
    bw: "~460 GB/s",
    maxStack: "8-Hi",
    maxCap: "16 GB",
    note: "NVIDIA A100(HBM2E×5)",
    color: "#06b6d4",
    bar: 230,
  },
];

/** 세대별 대역폭 막대그래프 */
function BandwidthChart() {
  const MAX_BW = 460;
  const BAR_MAX_W = 260;

  return (
    <svg
      width="100%"
      viewBox="0 0 400 160"
      style={{ fontFamily: "sans-serif", maxWidth: 480 }}
    >
      {/* 제목 */}
      <text x={8} y={16} fontSize={10} fill="#94a3b8" fontWeight={600}>
        스택당 대역폭 (GB/s)
      </text>

      {GEN_DATA.map((d, i) => {
        const y = 32 + i * 40;
        const barW = (d.bar / MAX_BW) * BAR_MAX_W;
        return (
          <g key={d.gen}>
            {/* 레이블 */}
            <text x={4} y={y + 14} fontSize={11} fill="#cbd5e1" fontWeight={600}>
              {d.gen}
            </text>
            <text x={4} y={y + 26} fontSize={9} fill="#64748b">
              {d.year}
            </text>
            {/* 막대 */}
            <rect x={68} y={y + 4} width={barW} height={18} fill={d.color} rx={3} opacity={0.85} />
            {/* 수치 */}
            <text x={68 + barW + 6} y={y + 17} fontSize={10} fill={d.color} fontWeight={700}>
              {d.bw}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** 적층 수·용량 비교 표 */
function SpecTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-sidebar-border">
            <th className="text-left py-2 pr-4 font-semibold text-muted">세대</th>
            <th className="text-left py-2 pr-4 font-semibold text-muted">연도</th>
            <th className="text-left py-2 pr-4 font-semibold text-muted">핀당 속도</th>
            <th className="text-left py-2 pr-4 font-semibold text-muted">버스폭</th>
            <th className="text-left py-2 pr-4 font-semibold text-muted">대역폭/스택</th>
            <th className="text-left py-2 pr-4 font-semibold text-muted">최대 적층</th>
            <th className="text-left py-2 font-semibold text-muted">최대 용량</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-sidebar-border">
          {GEN_DATA.map((d) => (
            <tr key={d.gen}>
              <td className="py-2 pr-4 font-semibold" style={{ color: d.color }}>
                {d.gen}
              </td>
              <td className="py-2 pr-4 text-muted">{d.year}</td>
              <td className="py-2 pr-4">{d.pinRate}</td>
              <td className="py-2 pr-4 text-orange-400">{d.bus}</td>
              <td className="py-2 pr-4 font-semibold">{d.bw}</td>
              <td className="py-2 pr-4 text-muted">{d.maxStack}</td>
              <td className="py-2">{d.maxCap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Hbm1Hbm2() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        HBM1(2015)은 세계 최초의 고대역폭 메모리 표준으로, AMD Radeon Fiji GPU에 처음 탑재됐습니다.
        HBM2(2016)와 HBM2E(2019)로 이어지며 대역폭과 용량이 두 배 이상 성장했고,
        이 계보는 JEDEC 표준을 통해 전 업계에 정착했습니다.
      </p>

      {/* ── HBM1 ── */}
      <CalcBox title="■ HBM1 (2015) — 표준의 시작">
        <SubSection title="● 탄생 배경">
          <p className="text-sm">
            2013년 JEDEC이 HBM 표준 초안을 발표하고, 2015년 AMD·SK하이닉스가 공동 개발한
            HBM1을 <strong>Radeon R9 Fury X(코드명 Fiji)</strong> GPU에 처음 양산 탑재했습니다.
            기존 GDDR5 대비 버스폭을 획기적으로 넓혀 전력 효율과 대역폭을 동시에 끌어올렸습니다.
          </p>
        </SubSection>
        <SubSection title="● 핵심 사양">
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-indigo-400 mb-1">대역폭</div>
              <p className="text-muted">스택당 <strong>~128 GB/s</strong> — 동시대 GDDR5의 약 3배.</p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-indigo-400 mb-1">버스폭 · 핀당 속도</div>
              <p className="text-muted">1,024-bit 인터페이스, <strong>1 Gbps</strong>/핀 — 넓고 느린 전략.</p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-indigo-400 mb-1">적층 수 · 용량</div>
              <p className="text-muted">최대 <strong>4-Hi</strong>(4층 스택), 스택당 <strong>4 GB</strong>.</p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-indigo-400 mb-1">연결 방식</div>
              <p className="text-muted">TSV(Through-Silicon Via) + 실리콘 인터포저 — 2.5D 패키징.</p>
            </div>
          </div>
        </SubSection>
        <Insight>
          &ldquo;넓고 느리게&rdquo;가 HBM의 철학입니다. 핀당 속도를 낮추는 대신 버스폭을 1,024비트로 늘려
          비트당 전력을 줄이면서 총 대역폭을 높입니다.
        </Insight>
      </CalcBox>

      {/* ── HBM2 ── */}
      <CalcBox title="■ HBM2 (2016) · HBM2E (2019) — AI 가속기 시대">
        <SubSection title="● HBM2 — 속도 2배, 용량 2배">
          <p className="text-sm mb-3">
            2016년 JEDEC이 HBM2 표준(JESD235)을 확정하고, SK하이닉스·삼성이 양산했습니다.
            핀당 속도가 <strong>2 Gbps</strong>로 배가됐고, 8층 적층(8-Hi)으로 스택당
            <strong> 8 GB</strong>까지 늘었습니다. 대역폭은 스택당 <strong>~256 GB/s</strong>.
            NVIDIA V100(Volta, 2017)와 AMD Vega(2017)가 대표 탑재 제품입니다.
          </p>
          <p className="text-sm text-muted">
            V100은 HBM2 스택 4개를 탑재해 총 대역폭 <strong>900 GB/s</strong>를 달성했으며,
            딥러닝 연구의 표준 플랫폼이 됐습니다.
          </p>
        </SubSection>
        <SubSection title="● HBM2E — 용량·대역폭 한 번 더 도약">
          <p className="text-sm mb-3">
            2019~2020년 등장한 HBM2E(Extended)는 핀당 속도를 ~3.6 Gbps까지 높여
            스택당 대역폭 <strong>~460 GB/s</strong>, 스택 용량 <strong>16 GB</strong>를 달성했습니다.
          </p>
          <p className="text-sm text-muted">
            NVIDIA A100(Ampere, 2020)은 HBM2E 스택 5개를 탑재해
            총 대역폭 <strong>2 TB/s</strong>(5 × 400 GB/s), 총 용량 <strong>80 GB</strong>로
            GPT-3 학습의 주역이 됐습니다.
          </p>
        </SubSection>

        {/* 막대그래프 */}
        <div className="mt-4">
          <BandwidthChart />
        </div>
      </CalcBox>

      {/* ── 스펙 종합표 ── */}
      <CalcBox title="■ HBM1 · HBM2 · HBM2E 사양 비교">
        <SpecTable />
        <p className="text-xs text-muted mt-3">
          ※ HBM2E 대역폭은 구현체(SK하이닉스 Hynix4e·삼성 Flashbolt)마다 차이가 있으며, ~410~460 GB/s 범위.
        </p>
      </CalcBox>

      {/* ── JEDEC 표준화 ── */}
      <CalcBox title="■ JEDEC 표준화의 의미">
        <p className="text-sm mb-4">
          HBM이 특정 기업의 독점 규격이 아닌 <strong>업계 공통 표준</strong>으로 자리 잡은 것은
          JEDEC의 표준화 덕분입니다.
        </p>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-blue-400 mb-1">① 공급망 다양화</div>
            <p className="text-muted">SK하이닉스·삼성·마이크론이 동일 표준 하에 경쟁 → GPU 벤더 선택지 확보.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-blue-400 mb-1">② 패키징 생태계</div>
            <p className="text-muted">인터페이스·전기 규격이 표준화 → TSMC·삼성 파운드리 패키지 공정 투자 가능.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-blue-400 mb-1">③ 세대 연속성</div>
            <p className="text-muted">HBM1 &rarr; HBM2 &rarr; HBM2E &rarr; HBM3 가 하위 호환 설계 원칙을 유지.</p>
          </div>
        </div>
        <Insight>
          HBM1·HBM2 세대는 &ldquo;AI 가속기 메모리&rdquo;라는 시장 범주 자체를 열었습니다.
          HBM3·HBM3E(다음 단원)에서는 핀당 속도가 6.4~9.6 Gbps로 훨씬 빠르게 치솟으며
          TB/s 시대를 엽니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
