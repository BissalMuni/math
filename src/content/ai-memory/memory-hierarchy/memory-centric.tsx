import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** GPU 중심 vs 메모리 중심 비교 SVG */
function ParadigmCompareSvg() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {/* GPU 중심 */}
      <div className="flex flex-col items-center gap-2">
        <svg width="100%" viewBox="0 0 220 160" style={{ fontFamily: "sans-serif" }}>
          {/* GPU (큰 중심) */}
          <rect x={65} y={50} width={90} height={60} rx={6} fill="#f87171" fillOpacity={0.2} stroke="#f87171" strokeWidth={2} />
          <text x={110} y={84} textAnchor="middle" fontSize={12} fill="#f87171" fontWeight={700}>GPU</text>
          {/* 메모리 (작은 주변) */}
          {[
            { x: 10, y: 66, label: "DRAM" },
            { x: 162, y: 66, label: "DRAM" },
          ].map((m) => (
            <g key={m.x}>
              <rect x={m.x} y={m.y} width={46} height={28} rx={4} fill="#60a5fa" fillOpacity={0.15} stroke="#60a5fa" strokeWidth={1.2} />
              <text x={m.x + 23} y={m.y + 15} textAnchor="middle" fontSize={9} fill="#60a5fa">{m.label}</text>
              <line x1={m.x + (m.x < 65 ? 46 : 0)} y1={m.y + 14} x2={m.x < 65 ? 65 : 162} y2={80}
                stroke="#60a5fa" strokeWidth={1} strokeDasharray="3,2" />
            </g>
          ))}
          <text x={110} y={20} textAnchor="middle" fontSize={11} fill="#94a3b8" fontWeight={600}>GPU 중심</text>
          <text x={110} y={148} textAnchor="middle" fontSize={9} fill="#64748b">데이터가 GPU로 이동</text>
        </svg>
        <p className="text-xs text-muted text-center">메모리 &rarr; GPU 이동 → 대역폭 병목</p>
      </div>

      {/* 메모리 중심 */}
      <div className="flex flex-col items-center gap-2">
        <svg width="100%" viewBox="0 0 220 160" style={{ fontFamily: "sans-serif" }}>
          {/* HBM (큰 중심) */}
          <rect x={55} y={40} width={110} height={70} rx={6} fill="#34d399" fillOpacity={0.18} stroke="#34d399" strokeWidth={2} />
          <text x={110} y={70} textAnchor="middle" fontSize={11} fill="#34d399" fontWeight={700}>HBM / HBF</text>
          <text x={110} y={86} textAnchor="middle" fontSize={9} fill="#34d399">(메모리 + 연산)</text>
          {/* 작은 연산 코어들 */}
          {[
            { x: 12, y: 58, label: "연산" },
            { x: 170, y: 58, label: "연산" },
            { x: 90, y: 128, label: "PIM" },
          ].map((c) => (
            <g key={`${c.x}-${c.y}`}>
              <circle cx={c.x + 16} cy={c.y + 12} r={15} fill="#a78bfa" fillOpacity={0.2} stroke="#a78bfa" strokeWidth={1.2} />
              <text x={c.x + 16} y={c.y + 16} textAnchor="middle" fontSize={8} fill="#a78bfa">{c.label}</text>
              <line x1={c.x + 16} y1={c.y + 12} x2={110} y2={75} stroke="#a78bfa" strokeWidth={1} strokeDasharray="3,2" />
            </g>
          ))}
          <text x={110} y={18} textAnchor="middle" fontSize={11} fill="#94a3b8" fontWeight={600}>메모리 중심</text>
          <text x={110} y={155} textAnchor="middle" fontSize={9} fill="#64748b">연산이 데이터로 이동</text>
        </svg>
        <p className="text-xs text-muted text-center">연산 &rarr; 메모리 이동 → 대역폭 절약</p>
      </div>
    </div>
  );
}

export default function MemoryCentric() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        KAIST 김정호 교수는 NVIDIA GPU 중심의 AI 컴퓨팅 패러다임이
        <strong> 메모리 중심(Memory-Centric)</strong>으로 전환될 것이라고 제시합니다.
        &ldquo;데이터를 연산으로 옮기는&rdquo; 대신 &ldquo;연산을 데이터 곁으로 옮기는&rdquo; 발상의 전환입니다.
      </p>

      {/* ── 패러다임 전환 ── */}
      <CalcBox title="■ GPU 중심 → 메모리 중심 패러다임 전환">
        <ParadigmCompareSvg />
        <SubSection title="● GPU 중심 (기존)">
          <p className="text-sm">
            ① 거대 GPU가 중심 &rarr; 메모리에서 데이터를 끌어와 연산.<br />
            ② 데이터 이동에 많은 에너지·시간 소비.<br />
            ③ 메모리 대역폭이 병목 &rarr; 메모리 월 심화.
          </p>
        </SubSection>
        <SubSection title="● 메모리 중심 (전환 방향)">
          <p className="text-sm">
            ① 메모리(HBM/HBF)가 중심 &rarr; 연산 로직을 메모리 내부·근방에 탑재.<br />
            ② 데이터 이동 최소화 &rarr; 에너지 효율 대폭 개선.<br />
            ③ 컴퓨팅 3자원(연산·대역폭·용량)의 균형.
          </p>
        </SubSection>
        <Insight>
          &ldquo;연산·대역폭·용량, 세 자원을 균형 있게&rdquo; &mdash; 한 자원이 과잉이고 다른 자원이 부족하면
          그 부족한 쪽이 전체 시스템의 병목이 됩니다.
        </Insight>
      </CalcBox>

      {/* ── PIM / NMC ── */}
      <CalcBox title="■ PIM / NMC — 메모리 내·근처 연산">
        <SubSection title="● PIM (Processing In Memory)">
          <p className="text-sm mb-2">
            메모리 <strong>셀 어레이 내부 또는 바로 옆</strong>에 연산 유닛을 배치합니다.
            데이터가 I/O 버스를 아예 벗어나지 않아도 되므로 이동 에너지가 거의 0에 가깝습니다.
          </p>
        </SubSection>
        <SubSection title="● NMC (Near-Memory Computing)">
          <p className="text-sm mb-2">
            메모리 <strong>베이스 다이</strong>(HBM Base Die 등)에 연산 로직을 통합합니다.
            KAIST TERALAB 로드맵의 <strong>3D NMC-HBM</strong>(HBM5 세대부터)이 대표 사례.
            메모리와 연산이 동일 패키지 내에서 짧은 TSV 경로로 통신합니다.
          </p>
        </SubSection>
        <div className="grid sm:grid-cols-2 gap-3 text-sm mt-2">
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-purple-400 mb-1">장점</div>
            <p className="text-muted">① 데이터 이동 최소 → 전력 절감</p>
            <p className="text-muted">② 메모리 대역폭을 내부에서 직접 소비</p>
            <p className="text-muted">③ AI 추론 워크로드와 최적 정합</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-amber-400 mb-1">과제</div>
            <p className="text-muted">① 메모리 공정과 로직 공정의 설계 공동 최적화</p>
            <p className="text-muted">② 열결합(thermal coupling) 관리</p>
            <p className="text-muted">③ 소프트웨어 스택 재설계</p>
          </div>
        </div>
      </CalcBox>

      {/* ── Storage Factory ── */}
      <CalcBox title="■ Storage Factory — 스토리지 내부 연산">
        <p className="text-sm mb-3">
          HBF(High Bandwidth Flash) 기반의 <strong>Storage Factory</strong>는
          스토리지 내부에서 전처리·집계 연산을 수행하는 개념입니다.
          AI 파이프라인에서 &ldquo;읽어서 이동 &rarr; 처리&rdquo; 순서를
          &ldquo;스토리지 안에서 처리 &rarr; 결과만 이동&rdquo;으로 뒤집습니다.
        </p>
        <p className="text-sm text-muted">
          HBF는 쓰기 내구성 약 10만 회 / 읽기 사실상 무제한의 특성 덕분에
          AI 추론의 <strong>read-heavy(읽기 중심)</strong> 패턴과 잘 맞습니다.
        </p>
      </CalcBox>

      {/* ── Full-3D HBM-Centric ── */}
      <CalcBox title="■ Full-3D HBM-Centric Computing — HBM8 세대 비전">
        <p className="text-sm mb-3">
          KAIST TERALAB 로드맵의 최종 목표는 <strong>Full-3D HBM-Centric Computing(HBM8, 2038년)</strong>입니다.
          HBM이 단순한 메모리를 넘어, 연산·캐시·인터포저·냉각까지 통합한 &ldquo;시스템 중심&rdquo;이 됩니다.
        </p>
        <SubSection title="● 주요 특징">
          <p className="text-sm">
            ① <strong>HBM-Centric Interposer</strong>: HBM이 인터포저 기능까지 담당.<br />
            ② <strong>Double-side Cooling</strong>: 3D 적층 발열을 위아래 양면에서 냉각.<br />
            ③ <strong>Edge-expand Stack</strong>: 스택 가장자리 확장으로 I/O 16,384비트(HBM8).<br />
            ④ LLM 기반 대화형 설계 에이전트(AI Design Agent)가 자동 최적화.
          </p>
        </SubSection>
        <Insight>
          메모리-중심 패러다임은 &ldquo;메모리가 더 빠르면 좋겠다&rdquo;를 넘어,
          <strong> 컴퓨팅의 무게중심 자체를 메모리로 옮기는</strong> 구조 혁신입니다.
          2038년 HBF 시장이 HBM 시장을 추월할 것이라는 전망도 이 흐름과 맞닿아 있습니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
