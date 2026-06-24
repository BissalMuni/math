import { CalcBox, SubSection, Insight } from "@/components/content/shared";

const TIMELINE = [
  { year: "1990s~", label: "KAIST 교수 부임", desc: "고속 인터커넥트 연구 시작" },
  { year: "2000s", label: "TSV 기반 HBM 구조 고안", desc: "DRAM 수직 적층 개념 제안 — &ldquo;HBM의 아버지&rdquo;" },
  { year: "2013", label: "JEDEC HBM 표준화", desc: "학계 연구가 산업 표준으로 채택" },
  { year: "2020s", label: "TERALAB 산학 협력 확대", desc: "삼성·SK하이닉스·SanDisk·NVIDIA 등 글로벌 파트너십" },
  { year: "2025-06-11", label: "HBM Roadmap Ver 1.7 공개", desc: "371페이지, HBM4~HBM8 + HBF 로드맵 종합" },
  { year: "2026-02", label: "HBF 기술 로드맵 설명회 발표", desc: "HBF 표준화 방향·AI 추론 메모리 계층 제시" },
];

function TimelineDiagram() {
  const W = 480;
  const itemH = 44;
  const H = TIMELINE.length * itemH + 20;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ fontFamily: "sans-serif" }}>
      {/* 수직 타임라인 선 */}
      <line x1={90} y1={10} x2={90} y2={H - 10} stroke="#475569" strokeWidth={2} />
      {TIMELINE.map((item, i) => {
        const cy = 10 + i * itemH + itemH / 2;
        const isLast = i === TIMELINE.length - 1;
        const dotColor = isLast ? "#f97316" : i >= 4 ? "#a855f7" : "#3b82f6";
        return (
          <g key={i}>
            <circle cx={90} cy={cy} r={6} fill={dotColor} />
            {/* 연도 */}
            <text x={82} y={cy + 4} textAnchor="end" fontSize={9} fill="#94a3b8" fontWeight={600}>
              {item.year}
            </text>
            {/* 라벨 */}
            <text x={102} y={cy - 2} fontSize={10} fill="#e2e8f0" fontWeight={700}>
              {item.label}
            </text>
            {/* 설명 */}
            <text x={102} y={cy + 11} fontSize={9} fill="#64748b">
              {item.desc}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function ContribCards() {
  const cards = [
    { color: "#3b82f6", title: "HBM 구조 고안", body: "DRAM 다이를 TSV로 수직 적층하는 HBM 기본 아키텍처를 제안. 이 개념이 JEDEC 표준(HBM1, 2013)의 토대가 됨." },
    { color: "#a855f7", title: "TERALAB", body: "KAIST TeraByte Interconnection and Package Laboratory. 고속 패키지 인터커넥트·신호무결성(SI)·전원무결성(PI) 연구 특화." },
    { color: "#f97316", title: "HBM Roadmap Ver 1.7", body: "2025-06-11 공개(371p). HBM4~HBM8 사양·아키텍처·냉각·AI 설계 에이전트 로드맵 종합. 이 책 전체의 기반 자료." },
    { color: "#22c55e", title: "HBF 로드맵", body: "2026-02 설명회. HBF(High Bandwidth Flash) 표준화 방향과 AI 추론용 메모리 계층 구조 제안. SK하이닉스·SanDisk 협력." },
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-3 mt-2">
      {cards.map((c) => (
        <div key={c.title} className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
          <div className="font-semibold text-sm mb-1" style={{ color: c.color }}>{c.title}</div>
          <p className="text-sm text-muted">{c.body}</p>
        </div>
      ))}
    </div>
  );
}

export default function KimJungho() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        이 책 &ldquo;AI 메모리&rdquo;의 콘텐츠는 KAIST 김정호(Joungho Kim) 교수와 TERALAB의
        공개 로드맵을 1차 근거로 삼습니다. 그가 누구인지, 무엇을 공개했는지를 먼저 짚습니다.
      </p>

      {/* ── 인물 소개 ── */}
      <CalcBox title="■ 김정호 교수 — &lsquo;HBM의 아버지&rsquo;">
        <SubSection title="● KAIST TERALAB">
          <p className="text-sm mb-2">
            김정호 교수는 KAIST(한국과학기술원)에서 <strong>TERALAB</strong>
            (TeraByte Interconnection and Package Laboratory)을 이끌고 있습니다.
            연구실 이름처럼 테라바이트급 인터커넥트와 고속 반도체 패키징이 핵심 연구 분야입니다.
          </p>
          <p className="text-sm text-muted">
            고속 신호무결성(Signal Integrity), 전원무결성(Power Integrity), TSV 기반 3D 패키징,
            그리고 HBM·HBF 같은 차세대 메모리 인터커넥트 기술이 주요 연구 주제입니다.
          </p>
        </SubSection>
        <SubSection title="● HBM 구조의 기원">
          <p className="text-sm mb-2">
            김정호 교수는 DRAM 다이를 TSV(Through-Silicon Via)로 수직 적층하는 HBM의 기본 구조를
            고안한 연구자로 알려져 있으며, 이 개념이 2013년 JEDEC HBM 표준화의 토대가 되었습니다.
            이 때문에 업계와 학계에서 &ldquo;HBM의 아버지&rdquo;로 불립니다.
          </p>
          <p className="text-sm text-muted">
            ※ 표현은 TrendForce 등 복수의 미디어 보도를 근거로 하며, JEDEC 표준화는 다수 기업의
            공동 작업임을 부기합니다.
          </p>
        </SubSection>
      </CalcBox>

      {/* ── 핵심 기여 ── */}
      <CalcBox title="■ 핵심 기여 정리">
        <ContribCards />
        <Insight>
          이 책이 인용하는 수치(HBM4 2 TB/s, HBM8 64 TB/s, HBF 1.638 TB/s 등)는 모두
          HBM Roadmap Ver 1.7(PDF 371p, 2025-06-11)을 1차 출처로 합니다.
        </Insight>
      </CalcBox>

      {/* ── 로드맵 타임라인 ── */}
      <CalcBox title="■ 연구·공개 타임라인">
        <TimelineDiagram />
      </CalcBox>

      {/* ── 산학 협력 ── */}
      <CalcBox title="■ 산학 협력 파트너십">
        <p className="text-sm mb-3">
          TERALAB은 순수 학술 연구를 넘어 산업계와 긴밀히 협력합니다.
          삼성전자·SK하이닉스·SanDisk·NVIDIA 등이 파트너사로 거론되며,
          로드맵 연구가 실제 제품 로드맵 수립에도 참고되는 구조입니다.
        </p>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-orange-400 mb-1">SK하이닉스</div>
            <p className="text-muted">HBM 제조 공정·MR-MUF 협력. HBF 표준화 공동 참여.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-blue-400 mb-1">삼성전자</div>
            <p className="text-muted">패키징·인터포저 기술 협력. HBM Base Die 설계 연구.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-green-400 mb-1">SanDisk / NVIDIA</div>
            <p className="text-muted">SanDisk — HBF 표준화 컨소시엄. NVIDIA &mdash; GPU-HBM 시스템 로드맵 참고.</p>
          </div>
        </div>
        <p className="text-sm text-muted mt-3">
          2026년 2월 HBF 기술 로드맵 설명회는 SK하이닉스·SanDisk의
          <strong> HBF 표준화 컨소시엄</strong> 출범과 시기를 같이하며,
          학계 로드맵이 산업 표준화를 이끄는 흐름을 보여줍니다.
        </p>
      </CalcBox>
    </div>
  );
}
