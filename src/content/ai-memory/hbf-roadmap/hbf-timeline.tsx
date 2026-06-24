import { CalcBox, SubSection, Step, Insight } from "@/components/content/shared";

const TIMELINE = [
  {
    year: "2026",
    label: "표준화 컨소시엄 결성",
    detail: "SK하이닉스 + SanDisk HBF 컨소시엄 (2026-02). JEDEC 초안 작업 시작.",
    color: "#6366f1",
    x: 40,
  },
  {
    year: "2027",
    label: "엔지니어링 샘플",
    detail: "HBF 엔지니어링 샘플 공급. GPU 파트너 검증 시작.",
    color: "#3b82f6",
    x: 130,
  },
  {
    year: "2028",
    label: "NVIDIA·Google·AMD 채택",
    detail: "Feynman(F400) GPU 세대. HBM5와 병행, HBF 첫 상용 탑재 목표.",
    color: "#22c55e",
    x: 240,
  },
  {
    year: "2032",
    label: "대중화·HBM7 전환기",
    detail: "HBM6·HBF 병치 확대. AI 에이전트 워크로드 메모리 수요 급증.",
    color: "#f59e0b",
    x: 350,
  },
  {
    year: "2035",
    label: "HBM7 + HBF 결합",
    detail: "HBM7(24 TB/s·160~192 GB) + HBF 본격 결합. HBF/LPDDR Ctrl + Storage network 통합(1-A).",
    color: "#ef4444",
    x: 460,
  },
  {
    year: "2038",
    label: "HBF 시장이 HBM 추월",
    detail: "HBM8 시대. HBF 시장 규모가 HBM을 초과할 것으로 전망.",
    color: "#ec4899",
    x: 570,
  },
];

/** 2026~2038 타임라인 SVG */
function TimelineSvg() {
  const LINE_Y = 100;
  const NODE_R = 9;

  return (
    <svg width="100%" viewBox="0 0 640 220" style={{ fontFamily: "sans-serif" }}>
      {/* 수평 기준선 */}
      <line x1={30} y1={LINE_Y} x2={610} y2={LINE_Y} stroke="#334155" strokeWidth={2} />

      {TIMELINE.map((ev, i) => {
        const isTop = i % 2 === 0;
        const textY = isTop ? LINE_Y - 60 : LINE_Y + 60;
        const lineEndY = isTop ? LINE_Y - NODE_R : LINE_Y + NODE_R;
        const lineStartY = isTop ? textY + 18 : textY - 18;

        return (
          <g key={ev.year}>
            {/* 수직선 */}
            <line
              x1={ev.x} y1={lineStartY} x2={ev.x} y2={lineEndY}
              stroke={ev.color} strokeWidth={1.5} strokeDasharray="3,2"
            />
            {/* 노드 */}
            <circle cx={ev.x} cy={LINE_Y} r={NODE_R} fill={ev.color} opacity={0.9} />
            {/* 연도 */}
            <text x={ev.x} y={LINE_Y + 4} textAnchor="middle" fontSize={8} fill="#0f172a" fontWeight={700}>
              {ev.year}
            </text>
            {/* 레이블 */}
            <text x={ev.x} y={textY} textAnchor="middle" fontSize={9.5} fill={ev.color} fontWeight={600}>
              {ev.label}
            </text>
          </g>
        );
      })}

      {/* 범례 */}
      <text x={320} y={210} textAnchor="middle" fontSize={9} fill="#475569">
        KAIST TERALAB HBM/HBF 로드맵 기반 (ver 1.7, 2025-06-11)
      </text>
    </svg>
  );
}

export default function HbfTimeline() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        HBF 상용화는 2026년 표준화 컨소시엄 결성을 출발점으로, 2027년 엔지니어링 샘플, 2028년 GPU 파트너
        채택, 그리고 2035년 HBM7과의 본격 결합까지 단계적으로 진행됩니다. 2038년에는 HBF 시장이 HBM 시장을
        추월할 것으로 전망됩니다.
      </p>

      {/* ── 타임라인 시각화 ── */}
      <CalcBox title="■ 2026~2038 HBF 상용화 타임라인">
        <TimelineSvg />
      </CalcBox>

      {/* ── 단계별 상세 ── */}
      <CalcBox title="■ 단계별 일정 상세">
        <SubSection title="● Phase 1 — 표준화·샘플 (2026~2027)">
          <div className="space-y-3 mt-2">
            <div>
              <Step n={1} label="컨소시엄 결성 (2026-02)" />
              <p className="text-sm text-muted mt-1">
                SK하이닉스 + SanDisk가 HBF 표준화 컨소시엄 공동 결성. JEDEC 초안, 전기 인터페이스 사양,
                패키징 규격 확정을 목표로 작업 시작.
              </p>
            </div>
            <div>
              <Step n={2} label="엔지니어링 샘플 공급 (~2027)" />
              <p className="text-sm text-muted mt-1">
                NVIDIA·Google·AMD 등 GPU 파트너에게 엔지니어링 샘플 제공. 시스템 통합·검증·드라이버
                개발이 이 시기에 집중됩니다.
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title="● Phase 2 — 첫 상용 채택 (2028+)">
          <div className="space-y-3 mt-2">
            <div>
              <Step n={3} label="NVIDIA·Google·AMD 상용 채택 (2028+)" />
              <p className="text-sm text-muted mt-1">
                NVIDIA Feynman(F400) GPU 세대(HBM5×8, 48 TB/s, 400~500 GB)와 함께 HBF를 보조 대용량
                메모리로 탑재하는 구성이 타깃입니다. 에이전트형 AI의 컨텍스트 윈도우 급팽창(입력
                100~1000배 증가)이 수요를 견인합니다.
              </p>
            </div>
            <div>
              <Step n={4} label="생태계 확산 (2028~2032)" />
              <p className="text-sm text-muted mt-1">
                AI 데이터센터·클라우드 사업자로 채택 확산. HBF 기반 메모리 임대(rental) 서비스 모델
                논의 시작.
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title="● Phase 3 — HBM7 결합 본격화 (2035~)">
          <div className="space-y-3 mt-2">
            <div>
              <Step n={5} label="HBM7 + HBF 아키텍처 통합 (2035)" />
              <p className="text-sm text-muted mt-1">
                KAIST TERALAB 로드맵(1-A)에 따르면 HBM7(2035)은 <strong>HBM-HBF 결합</strong>을
                핵심 특징으로 명시합니다. HBM7 사양: 데이터 레이트 24 Gbps·I/O 8,192·대역폭 24 TB/s·
                용량 160~192 GB. 베이스 다이에 <strong>HBF/LPDDR 컨트롤러 + Storage network</strong>가
                통합됩니다.
              </p>
            </div>
            <div>
              <Step n={6} label="HBF 시장이 HBM 추월 (~2038)" />
              <p className="text-sm text-muted mt-1">
                HBM8(2038)과 맞물려 HBF 시장 규모가 HBM을 초과할 것으로 전망됩니다. AI 스케일링의
                지배적 제약이 &ldquo;연산&rdquo;에서 &ldquo;용량&rdquo;으로 전환됩니다.
              </p>
            </div>
          </div>
        </SubSection>

        <Insight>
          HBF 채택의 핵심 드라이버는 에이전트형 AI 시대의 &ldquo;컨텍스트 폭발&rdquo;입니다. 2030년대 중반
          1인당 ~100 TB 메모리 수요를 HBM만으로는 충족할 수 없어 HBF가 필수 계층으로 부상합니다.
        </Insight>
      </CalcBox>

      {/* ── HBM7 연계 사양 ── */}
      <CalcBox title="■ HBM7(2035) + HBF 결합 사양 (1-A 인용)">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-sidebar-border">
                <th className="text-left py-2 pr-4 font-semibold text-muted">항목</th>
                <th className="text-left py-2 font-semibold text-orange-400">HBM7 (2035)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              {[
                ["데이터 레이트 (핀당)", "24 Gbps"],
                ["I/O 수", "8,192"],
                ["대역폭 (스택당)", "24 TB/s"],
                ["용량 (die당)", "64 Gb"],
                ["Die stack", "20/24-Hi"],
                ["용량 (스택당)", "160/192 GB"],
                ["소비 전력", "160 W"],
                ["아키텍처 특징", "HBM-HBF 결합 + HBF/LPDDR Ctrl + Storage network"],
                ["다이 접합", "범프리스 Cu-Cu Direct bonding"],
              ].map(([item, val]) => (
                <tr key={item}>
                  <td className="py-2 pr-4 font-medium">{item}</td>
                  <td className="py-2 text-orange-400 font-semibold">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CalcBox>
    </div>
  );
}
