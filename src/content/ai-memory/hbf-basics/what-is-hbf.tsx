import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** GPU + HBM(캐시) + HBF(라이브러리) 계층 SVG */
function MemoryHierarchySvg() {
  return (
    <svg
      width="100%"
      viewBox="0 0 520 220"
      style={{ fontFamily: "sans-serif", maxWidth: 520 }}
      aria-label="GPU·HBM·HBF 메모리 계층 다이어그램"
    >
      {/* GPU 다이 */}
      <rect x={180} y={70} width={160} height={80} rx={6} fill="#6366f1" opacity={0.9} />
      <text x={260} y={106} textAnchor="middle" fontSize={13} fill="#fff" fontWeight={700}>
        GPU
      </text>
      <text x={260} y={122} textAnchor="middle" fontSize={10} fill="#c7d2fe">
        연산 다이
      </text>

      {/* HBM — 책꽂이(캐시) */}
      <rect x={20} y={60} width={130} height={100} rx={6} fill="#0ea5e9" opacity={0.88} />
      <text x={85} y={96} textAnchor="middle" fontSize={12} fill="#fff" fontWeight={700}>
        HBM
      </text>
      <text x={85} y={112} textAnchor="middle" fontSize={9} fill="#e0f2fe">
        GPU 옆 책꽂이
      </text>
      <text x={85} y={126} textAnchor="middle" fontSize={9} fill="#e0f2fe">
        (캐시 · 수십~수백 GB)
      </text>
      <text x={85} y={142} textAnchor="middle" fontSize={9} fill="#bae6fd">
        ~2 TB/s
      </text>

      {/* HBF — 도서관(대용량) */}
      <rect x={370} y={60} width={130} height={100} rx={6} fill="#f59e0b" opacity={0.88} />
      <text x={435} y={96} textAnchor="middle" fontSize={12} fill="#fff" fontWeight={700}>
        HBF
      </text>
      <text x={435} y={112} textAnchor="middle" fontSize={9} fill="#fef3c7">
        GPU 옆 도서관
      </text>
      <text x={435} y={126} textAnchor="middle" fontSize={9} fill="#fef3c7">
        (대용량 · ~512 GB/유닛)
      </text>
      <text x={435} y={142} textAnchor="middle" fontSize={9} fill="#fde68a">
        최대 1.638 TB/s
      </text>

      {/* 연결선 */}
      <line x1={150} y1={110} x2={180} y2={110} stroke="#94a3b8" strokeWidth={2.5} markerEnd="url(#arr)" />
      <line x1={370} y1={110} x2={340} y2={110} stroke="#94a3b8" strokeWidth={2.5} markerEnd="url(#arr)" />

      <defs>
        <marker id="arr" markerWidth={7} markerHeight={7} refX={6} refY={3.5} orient="auto">
          <path d="M0,0 L0,7 L7,3.5Z" fill="#94a3b8" />
        </marker>
      </defs>

      {/* 라벨 아래 */}
      <text x={85} y={175} textAnchor="middle" fontSize={9} fill="#64748b">
        ≈ HBM의 1/10 용량
      </text>
      <text x={435} y={175} textAnchor="middle" fontSize={9} fill="#64748b">
        ≈ HBM의 10배 용량
      </text>
      <text x={260} y={175} textAnchor="middle" fontSize={9} fill="#64748b">
        인터포저 위 병렬 탑재
      </text>

      {/* 범례 */}
      <rect x={20} y={195} width={12} height={10} rx={2} fill="#0ea5e9" />
      <text x={36} y={204} fontSize={9} fill="#94a3b8">HBM (DRAM 캐시)</text>
      <rect x={160} y={195} width={12} height={10} rx={2} fill="#f59e0b" />
      <text x={176} y={204} fontSize={9} fill="#94a3b8">HBF (NAND 라이브러리)</text>
      <rect x={340} y={195} width={12} height={10} rx={2} fill="#6366f1" />
      <text x={356} y={204} fontSize={9} fill="#94a3b8">GPU 컴퓨트</text>
    </svg>
  );
}

export default function WhatIsHbf() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        HBF(High Bandwidth Flash)는 NAND 플래시를 수직 적층(TSV + 베이스 로직 다이)해
        HBM 수준의 대역폭과 SSD급의 대용량을 동시에 제공하는 새로운 메모리 계층입니다.
        AI 모델 가중치와 KV캐시의 급격한 용량 팽창에 대응하기 위해 등장했습니다.
      </p>

      {/* ── 한 줄 정의 ── */}
      <CalcBox title="■ HBF란 무엇인가">
        <p className="text-sm mb-4">
          KAIST TERALAB 로드맵(김정호 교수)은 HBF를 다음과 같이 정의합니다:
        </p>
        <div className="rounded-lg border border-sidebar-border bg-sidebar-bg p-4 text-sm leading-relaxed mb-4">
          <span className="font-semibold text-amber-400">HBF</span> &mdash;{" "}
          <strong>NAND 플래시 다이를 TSV로 수직 적층</strong>하고 최하단 베이스 로직 다이(컨트롤러)를
          결합해, <strong>HBM 수준의 대역폭</strong>과 <strong>SSD급의 대용량</strong>을 하나의 패키지로
          제공하는 차세대 메모리.
        </div>
        <SubSection title="● 핵심 수치 (KAIST TERALAB, 1-C)">
          <div className="grid sm:grid-cols-3 gap-3 text-sm mt-2">
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="text-amber-400 font-bold text-lg">512 GB</div>
              <div className="text-muted text-xs mt-1">유닛당 최대 용량</div>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="text-amber-400 font-bold text-lg">1.638 TB/s</div>
              <div className="text-muted text-xs mt-1">유닛당 최대 대역폭</div>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="text-amber-400 font-bold text-lg">×10</div>
              <div className="text-muted text-xs mt-1">HBM 대비 용량 배수</div>
            </div>
          </div>
        </SubSection>
      </CalcBox>

      {/* ── 비유 ── */}
      <CalcBox title="■ 책꽂이 vs 도서관 — HBM과 HBF의 역할 분담">
        <p className="text-sm mb-4">
          KAIST TERALAB 로드맵은 GPU 메모리 계층을 아래 비유로 설명합니다:
        </p>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl border border-blue-500/40 bg-blue-500/5 p-4">
            <div className="text-blue-400 font-bold text-base mb-1">HBM &mdash; GPU 옆 책꽂이</div>
            <ul className="text-muted space-y-1 list-none">
              <li>① DRAM 기반, 빠른 접근 (캐시 역할)</li>
              <li>② 수십~수백 GB 용량</li>
              <li>③ 지금 당장 연산에 필요한 데이터</li>
              <li>④ TB/s급 대역폭, 높은 단가</li>
            </ul>
          </div>
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-4">
            <div className="text-amber-400 font-bold text-base mb-1">HBF &mdash; GPU 옆 도서관</div>
            <ul className="text-muted space-y-1 list-none">
              <li>① NAND 기반, 대용량 (라이브러리 역할)</li>
              <li>② 최대 512 GB/유닛</li>
              <li>③ 모델 가중치·KV캐시 전체 보관</li>
              <li>④ 최대 1.638 TB/s, HBM보다 낮은 단가</li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-muted mt-4">
          계층 예시: GPU 앞 <strong>100 GB HBM</strong>(캐시, 책꽂이) +{" "}
          <strong>1 TB HBF</strong>(라이브러리, 도서관). SK하이닉스{" "}
          <strong>H3 아키텍처</strong>는 HBM과 HBF를 GPU 옆에 나란히 탑재하는 구조입니다.
        </p>
        <div className="mt-4">
          <MemoryHierarchySvg />
        </div>
        <Insight>
          HBM이 &ldquo;지금 펼쳐놓은 책&rdquo;이라면, HBF는 &ldquo;책장 전체&rdquo;입니다.
          두 계층을 함께 써야 대형 AI 모델을 GPU 가까이 둘 수 있습니다.
        </Insight>
      </CalcBox>

      {/* ── 왜 필요한가 ── */}
      <CalcBox title="■ 왜 HBF가 필요한가 — AI 메모리 수요 폭증">
        <SubSection title="● AI 모델과 KV캐시 용량 급증">
          <p className="text-sm mb-3">
            에이전트형 AI와 컨텍스트 엔지니어링의 확산으로 AI 입력 길이가 100&rarr;1,000배 늘었습니다.
            KV캐시(Key-Value Cache) 크기는 컨텍스트 길이에 비례하므로, 수백 GB &sim; TB 규모의
            메모리가 GPU 근처에 필요해졌습니다.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold mb-1">모델 가중치 급증</div>
              <p className="text-muted text-xs">
                수백억 매개변수 모델의 FP16 가중치만 수백 GB&mdash;HBM만으론 부족.
              </p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold mb-1">KV캐시 용량 폭증</div>
              <p className="text-muted text-xs">
                긴 컨텍스트 추론 시 KV캐시가 모델 가중치를 초과하는 상황 발생.
              </p>
            </div>
          </div>
        </SubSection>
        <SubSection title="● SSD는 왜 부족한가">
          <p className="text-sm">
            PCIe 5 NVMe SSD의 대역폭은 약 14 GB/s &mdash; HBF 최대 대역폭(1.638 TB/s)의
            1/100 수준입니다. GPU&ndash;SSD 간 전송 병목이 추론 지연의 주원인이 되며,
            HBF는 이 공백을 메웁니다.
          </p>
        </SubSection>
        <Insight>
          HBF는 &ldquo;SSD보다 100배 빠르고 HBM보다 10배 크다&rdquo;는 두 가지 성질로
          AI 추론 메모리 계층의 빈 자리를 채웁니다.
        </Insight>
      </CalcBox>

      {/* ── HBM7 세대와의 연결 ── */}
      <CalcBox title="■ HBM 로드맵에서 HBF의 위치">
        <p className="text-sm mb-3">
          KAIST TERALAB 로드맵은 <strong>HBM7(2035) 세대부터 HBM&ndash;HBF 결합 구조</strong>가
          등장한다고 예측합니다. HBF는 HBM과 경쟁하는 것이 아니라 <em>함께</em> GPU 메모리 계층을
          구성하는 파트너입니다.
        </p>
        <div className="rounded-lg border border-sidebar-border bg-sidebar-bg p-4 text-sm">
          <p className="text-muted mb-2">주요 일정 (KAIST TERALAB 1-C):</p>
          <p>① <strong>2027</strong> &mdash; 엔지니어링 샘플 출시 예정</p>
          <p>② <strong>2028+</strong> &mdash; NVIDIA · Google · AMD 채택 전망</p>
          <p>③ <strong>2038</strong> &mdash; HBF 시장 규모가 HBM을 추월할 것으로 전망</p>
        </div>
      </CalcBox>
    </div>
  );
}
