import { CalcBox, SubSection, Insight } from "@/components/content/shared";

const COMPANIES = [
  {
    name: "SK하이닉스",
    country: "한국",
    color: "#f97316",
    border: "#ea580c",
    strength: "HBM 선도",
    hbm: "HBM3E 양산 · HBM4 개발",
    customer: "NVIDIA 주요 공급",
    strategy: "HBM 집중 투자 · MR-MUF 공정",
    challenge: "NAND 경쟁력 상대적으로 낮음",
  },
  {
    name: "삼성전자",
    country: "한국",
    color: "#3b82f6",
    border: "#2563eb",
    strength: "종합 반도체",
    hbm: "HBM3E · HBM4E 개발",
    customer: "HBM 고객 다변화 추진",
    strategy: "DRAM+NAND+파운드리 통합 역량",
    challenge: "HBM 수율 이슈 보도, 추격 중",
  },
  {
    name: "마이크론",
    country: "미국",
    color: "#22c55e",
    border: "#16a34a",
    strength: "미국 유일 DRAM",
    hbm: "HBM3E 양산 · HBM4 개발",
    customer: "NVIDIA · AI 가속기",
    strategy: "미국 정부 지원(CHIPS Act) 활용",
    challenge: "시장 점유 후발 추격 단계",
  },
];

const ROWS = [
  { label: "HBM 현황", key: "hbm" as const },
  { label: "주요 고객", key: "customer" as const },
  { label: "전략", key: "strategy" as const },
  { label: "과제", key: "challenge" as const },
];

function ComparisonTable() {
  return (
    <div className="overflow-x-auto mt-2">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-sidebar-border">
            <th className="text-left py-2 pr-4 font-semibold text-muted w-24">항목</th>
            {COMPANIES.map((c) => (
              <th key={c.name} className="text-left py-2 pr-4 font-semibold" style={{ color: c.color }}>
                {c.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-sidebar-border">
          {ROWS.map((row) => (
            <tr key={row.label}>
              <td className="py-2 pr-4 text-muted font-medium">{row.label}</td>
              {COMPANIES.map((c) => (
                <td key={c.name} className="py-2 pr-4 text-sm">
                  {c[row.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompetitionDiagram() {
  return (
    <svg width="100%" viewBox="0 0 480 160" style={{ fontFamily: "sans-serif" }}>
      {/* HBM 리더십 스펙트럼 바 */}
      <rect x={20} y={60} width={440} height={40} rx={6} fill="#1e293b" />
      {/* SK하이닉스 — 앞부분 */}
      <rect x={20} y={60} width={200} height={40} rx={6} fill="#f97316" opacity={0.85} />
      {/* 삼성 — 중간 */}
      <rect x={220} y={60} width={140} height={40} fill="#3b82f6" opacity={0.8} />
      {/* 마이크론 — 후발 */}
      <rect x={360} y={60} width={100} height={40} rx={6} fill="#22c55e" opacity={0.75} />

      <text x={120} y={85} textAnchor="middle" fontSize={12} fill="white" fontWeight={700}>SK하이닉스</text>
      <text x={290} y={85} textAnchor="middle" fontSize={12} fill="white" fontWeight={700}>삼성</text>
      <text x={410} y={85} textAnchor="middle" fontSize={11} fill="white" fontWeight={700}>마이크론</text>

      <text x={240} y={30} textAnchor="middle" fontSize={11} fill="#94a3b8">HBM 공급 경쟁 구도 (정성적 — 수치 단정 금지)</text>
      <text x={20} y={130} fontSize={10} fill="#94a3b8">← HBM 선도</text>
      <text x={400} y={130} fontSize={10} fill="#94a3b8">추격 →</text>
    </svg>
  );
}

export default function SkSamsungMicron() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        글로벌 AI 가속기 수요가 급증하면서 HBM 공급망의 세 축인 SK하이닉스·삼성전자·마이크론의 역할과
        전략이 주목받고 있습니다. 각사의 강점과 현주소를 균형 있게 살펴봅니다.
      </p>

      {/* ── 경쟁 구도 개요 ── */}
      <CalcBox title="■ HBM 시장 경쟁 구도">
        <p className="text-sm mb-4">
          현재 HBM 시장은 SK하이닉스·삼성전자·마이크론 세 기업이 주도합니다.
          구체적인 점유율 수치는 분기마다 달라지고 공식 공표 값도 기관마다 차이가 있으므로,
          여기서는 정성적인 포지셔닝만 기술합니다.
        </p>
        <CompetitionDiagram />
        <Insight>
          SK하이닉스는 HBM3E를 NVIDIA에 안정적으로 공급하며 HBM 리더십을 유지하고 있으며,
          삼성과 마이크론은 HBM4 세대를 기점으로 추격에 나서고 있습니다.
        </Insight>
      </CalcBox>

      {/* ── 3사 비교표 ── */}
      <CalcBox title="■ 3사 전략 비교">
        <ComparisonTable />
      </CalcBox>

      {/* ── 각사 심층 ── */}
      <CalcBox title="■ 각사 강점과 과제">
        <SubSection title="● SK하이닉스 — HBM 집중 전략">
          <p className="text-sm mb-2">
            SK하이닉스는 NVIDIA의 H100/H200/Blackwell 시리즈에 HBM3E를 우선 공급하며
            HBM 리더십을 굳혔습니다. 독자 개발한 <strong>MR-MUF</strong>(Mass Reflow-Molded Underfill)
            공정으로 다이 적층 시 방열·신뢰성을 개선한 것이 주요 경쟁 요인으로 꼽힙니다.
            HBM4 이후엔 범프리스 Cu-Cu 본딩으로 전환을 준비 중입니다.
          </p>
          <p className="text-sm text-muted">
            ① 강점: NVIDIA와의 긴밀한 협력, MR-MUF 공정 완성도, HBM 전용 투자 집중<br />
            ② 과제: NAND 부문 경쟁력 보완, HBM4E·HBF 세대 기술 선도 유지
          </p>
        </SubSection>

        <SubSection title="● 삼성전자 — 종합 반도체 역량">
          <p className="text-sm mb-2">
            삼성은 DRAM·NAND·파운드리를 아우르는 종합 반도체 역량을 보유합니다.
            HBM4E 개발과 함께 자체 파운드리(GAA 공정)를 HBM 베이스 다이 제조에 활용하는 방향을
            모색하고 있습니다. 다만 HBM3E 수율 문제가 언론에 보도된 바 있어 양산 속도 회복이 과제입니다.
          </p>
          <p className="text-sm text-muted">
            ① 강점: DRAM+NAND+파운드리 통합, 자본력, 고객 포트폴리오 다변화 가능성<br />
            ② 과제: HBM 수율 안정화, HBM4E 적기 양산, NVIDIA 공급망 재진입
          </p>
        </SubSection>

        <SubSection title="● 마이크론 — 미국 유일의 선택지">
          <p className="text-sm mb-2">
            마이크론은 미국 내 유일한 DRAM·NAND 제조사로, CHIPS Act를 통한 정부 보조금 수혜와
            미국 AI 인프라 공급망 다변화 요구라는 지정학적 이점을 갖습니다.
            HBM3E 양산을 개시하며 NVIDIA 등 고객사에 공급을 확대하고 있습니다.
          </p>
          <p className="text-sm text-muted">
            ① 강점: 미국 지정학 이점, CHIPS Act 지원, NAND 경쟁력(3D NAND)<br />
            ② 과제: HBM 절대 물량·경험에서 한국 2사 대비 후발, 패키징 역량 확충
          </p>
        </SubSection>
      </CalcBox>

      {/* ── 인사이트 ── */}
      <CalcBox title="■ HBM 경쟁이 의미하는 것">
        <p className="text-sm mb-3">
          HBM은 단순한 메모리 제품을 넘어 AI 가속기의 성능을 결정짓는 핵심 부품이 되었습니다.
          KAIST TERALAB 로드맵이 보여주듯 HBM4(2026)에서 HBM8(2038)까지 세대별 대역폭은
          2 TB/s에서 64 TB/s로 32배 확장될 전망입니다.
        </p>
        <p className="text-sm text-muted">
          이 경쟁에서 누가 각 세대의 수율과 공급 안정성을 먼저 확보하느냐가
          AI 인프라 공급망에서의 지위를 결정하게 됩니다.
          한국 두 기업의 패키징 기술 주도권이 지속될지, 마이크론이 지정학적 이점을 기술 격차로
          전환할 수 있을지가 중기 관전 포인트입니다.
        </p>
        <Insight>
          HBM 경쟁은 &ldquo;누가 더 많이 쌓느냐&rdquo;에서 &ldquo;누가 더 뜨겁지 않게, 더 넓게
          연결하느냐&rdquo;로 진화하고 있습니다. 패키징·냉각·설계 역량이 다음 변수입니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
