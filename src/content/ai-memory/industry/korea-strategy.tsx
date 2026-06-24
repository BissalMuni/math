import { CalcBox, SubSection, Insight } from "@/components/content/shared";

const SWOT = [
  {
    label: "강점 (S)",
    color: "#22c55e",
    bg: "#14532d22",
    items: [
      "SK하이닉스·삼성의 HBM 공정 경험과 MR-MUF 등 독자 기술",
      "KAIST TERALAB 등 학계-산업 연계 로드맵 선행",
      "TSV·고급 패키징 인프라 집적",
    ],
  },
  {
    label: "약점 (W)",
    color: "#f97316",
    bg: "#7c2d1222",
    items: [
      "반도체 장비 대부분 네덜란드(ASML)·일본 의존",
      "팹리스·시스템 반도체 설계 역량 부족",
      "HBM 이외 메모리(NAND 등) 경쟁에서 격차 축소 중",
    ],
  },
  {
    label: "기회 (O)",
    color: "#3b82f6",
    bg: "#1e3a5f22",
    items: [
      "AI 에이전트 시대의 메모리 수요 폭증(1-D: 2030년대 1인당 ~100TB 전망)",
      "HBF 시장 태동 — 표준화 초기 단계에서 주도권 확보 가능",
      "NVIDIA 등 AI 칩 기업과 긴밀한 공급망 관계",
    ],
  },
  {
    label: "위협 (T)",
    color: "#ef4444",
    bg: "#7f1d1d22",
    items: [
      "마이크론의 CHIPS Act 지원·미국 지정학 이점",
      "중국의 DRAM 추격(단기 리스크는 낮으나 중장기 변수)",
      "파운드리 역량 약화 시 HBM Base Die 의존 리스크",
    ],
  },
];

function SwotGrid() {
  return (
    <div className="grid sm:grid-cols-2 gap-3 mt-2">
      {SWOT.map((q) => (
        <div key={q.label} className="rounded-lg border border-sidebar-border p-3" style={{ background: q.bg }}>
          <div className="font-semibold text-sm mb-2" style={{ color: q.color }}>{q.label}</div>
          <ul className="space-y-1">
            {q.items.map((item, i) => (
              <li key={i} className="text-sm text-muted">
                {"① ② ③".split(" ")[i] || "•"} {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function SuccessionDiagram() {
  return (
    <svg width="100%" viewBox="0 0 500 110" style={{ fontFamily: "sans-serif" }}>
      {/* HBM 블록 */}
      <rect x={10} y={30} width={130} height={50} rx={8} fill="#3b82f6" opacity={0.85} />
      <text x={75} y={52} textAnchor="middle" fontSize={13} fill="white" fontWeight={700}>HBM</text>
      <text x={75} y={67} textAnchor="middle" fontSize={9} fill="#bfdbfe">(고대역폭 DRAM)</text>
      <text x={75} y={95} textAnchor="middle" fontSize={9} fill="#94a3b8">~2026 선도</text>

      {/* 화살표 1 */}
      <line x1={140} y1={55} x2={185} y2={55} stroke="#94a3b8" strokeWidth={2} markerEnd="url(#arr)" />
      <text x={163} y={48} textAnchor="middle" fontSize={8} fill="#94a3b8">주도권</text>
      <text x={163} y={58} textAnchor="middle" fontSize={8} fill="#94a3b8">계승</text>

      {/* HBM4~6 교량 */}
      <rect x={185} y={30} width={120} height={50} rx={8} fill="#8b5cf6" opacity={0.85} />
      <text x={245} y={52} textAnchor="middle" fontSize={12} fill="white" fontWeight={700}>HBM4&ndash;6</text>
      <text x={245} y={66} textAnchor="middle" fontSize={9} fill="#e9d5ff">패키징·냉각 심화</text>
      <text x={245} y={95} textAnchor="middle" fontSize={9} fill="#94a3b8">2026&ndash;2032</text>

      {/* 화살표 2 */}
      <line x1={305} y1={55} x2={350} y2={55} stroke="#94a3b8" strokeWidth={2} markerEnd="url(#arr)" />
      <text x={328} y={48} textAnchor="middle" fontSize={8} fill="#94a3b8">HBF</text>
      <text x={328} y={58} textAnchor="middle" fontSize={8} fill="#94a3b8">부상</text>

      {/* HBF 블록 */}
      <rect x={350} y={30} width={140} height={50} rx={8} fill="#f97316" opacity={0.85} />
      <text x={420} y={52} textAnchor="middle" fontSize={13} fill="white" fontWeight={700}>HBF</text>
      <text x={420} y={67} textAnchor="middle" fontSize={9} fill="#fed7aa">(고대역폭 플래시)</text>
      <text x={420} y={95} textAnchor="middle" fontSize={9} fill="#94a3b8">2027+ 표준화</text>

      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}

export default function KoreaStrategy() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        KAIST 김정호 교수가 제시하는 메모리-중심(1-D) 패러다임 전환은 한국 메모리 산업에
        기회이자 도전입니다. HBM 주도권을 HBF로 이어가는 전략과 그 구조적 과제를 균형 있게 살펴봅니다.
      </p>

      {/* ── 왜 메모리 중심인가 ── */}
      <CalcBox title="■ 왜 메모리-중심 전환이 한국의 기회인가">
        <p className="text-sm mb-3">
          에이전트형 AI와 컨텍스트 엔지니어링의 확산으로 AI 모델이 처리해야 할 입력 토큰 수가
          기존 대비 100~1,000배 늘어난다는 것이 김정호 교수의 진단(1-D)입니다.
          이는 곧 대역폭과 용량, 즉 메모리 수요의 폭증을 의미합니다.
        </p>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-blue-400 mb-1">① 대역폭</div>
            <p className="text-muted">HBM8(2038) 64 TB/s — AI 추론 병목이 연산이 아닌 메모리로 이동.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-purple-400 mb-1">② 용량</div>
            <p className="text-muted">2030년대 중반 1인당 ~100TB 필요 전망 — HBF가 SSD를 대체하는 새 계층 창출.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-orange-400 mb-1">③ 공급망 지위</div>
            <p className="text-muted">HBM 공급망을 선점한 한국 기업이 HBF 표준화까지 주도하면 AI 생태계 핵심 위치 유지 가능.</p>
          </div>
        </div>
      </CalcBox>

      {/* ── HBM→HBF 주도권 계승 ── */}
      <CalcBox title="■ HBM &rarr; HBF 주도권 계승 도식">
        <p className="text-sm mb-4">
          SK하이닉스·SanDisk가 2026년 2월 HBF 표준화 컨소시엄을 출범시킨 것은 HBM 이후 메모리
          계층에서도 주도권을 잡겠다는 전략적 선언입니다. KAIST 로드맵은 HBM7 세대(2035)부터
          HBM-HBF 결합 아키텍처를 명시합니다.
        </p>
        <SuccessionDiagram />
        <Insight>
          HBF는 아직 초기 단계입니다. 엔지니어링 샘플 ~2027, 본격 채택 2028+ 일정이므로
          &ldquo;주도권 확보&rdquo;는 현재진행형 도전이지 완성된 사실이 아닙니다.
        </Insight>
      </CalcBox>

      {/* ── 패키징·생태계 역량 ── */}
      <CalcBox title="■ 핵심 역량 — 패키징과 생태계">
        <SubSection title="● 패키징 기술 우위">
          <p className="text-sm mb-2">
            SK하이닉스의 MR-MUF, 삼성의 고급 패키징(HBM 베이스 다이 내재화 시도)은
            단순 칩 제조를 넘어 시스템 통합 역량을 보여줍니다.
            KAIST 로드맵이 마이크로범프 &rarr; Cu-Cu 하이브리드 본딩으로의 전환을 제시하듯,
            이 기술 전환의 주도권이 다음 경쟁의 핵심입니다.
          </p>
        </SubSection>
        <SubSection title="● H3 아키텍처 · HBF 생태계">
          <p className="text-sm mb-2">
            SK하이닉스의 H3 아키텍처 — HBM·HBF를 GPU 옆에 나란히 배치하는 구조 — 는
            메모리-중심 컴퓨팅의 구체적 구현 형태입니다.
            AI 가속기 설계사(NVIDIA·Google·AMD)와의 협력이 이 생태계의 채택 속도를 결정합니다.
          </p>
        </SubSection>
      </CalcBox>

      {/* ── SWOT ── */}
      <CalcBox title="■ SWOT — 균형 있는 평가">
        <SwotGrid />
        <p className="text-sm text-muted mt-4">
          한국 메모리 산업은 HBM에서 입증된 패키징·공정 역량을 HBF로 연장할 구조적 기회를 갖고 있습니다.
          그러나 장비 의존·팹리스 부재·지정학 변수는 실질적 리스크로 과소평가해서는 안 됩니다.
          전략의 성패는 표준화 주도권을 기술 완성도로 뒷받침할 수 있느냐에 달려 있습니다.
        </p>
      </CalcBox>
    </div>
  );
}
