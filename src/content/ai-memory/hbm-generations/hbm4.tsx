import { CalcBox, SubSection, Insight } from "@/components/content/shared";
import { InlineMath } from "@/components/math/math-formula";

/** HBM4 vs HBM3E 대역폭 비교 — 버스폭 2배 확장 효과 도식 */
function IoDoublingDiagram() {
  return (
    <svg
      width="100%"
      viewBox="0 0 480 200"
      style={{ fontFamily: "sans-serif", maxWidth: 560 }}
    >
      {/* 제목 */}
      <text x={8} y={16} fontSize={10} fill="#94a3b8" fontWeight={600}>
        I/O 버스폭 확장 — HBM3E &rarr; HBM4
      </text>

      {/* HBM3E 버스 */}
      <text x={4} y={52} fontSize={11} fill="#ec4899" fontWeight={600}>HBM3E</text>
      <text x={4} y={66} fontSize={9} fill="#64748b">1,024-bit</text>
      {/* 버스폭 블록 (1,024-bit = 64칸) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={`e${i}`} x={80 + i * 22} y={40} width={18} height={18} fill="#ec4899" rx={2} opacity={0.7} />
      ))}
      <text x={264} y={53} fontSize={10} fill="#ec4899" fontWeight={700}>1,024-bit · ~1.2 TB/s</text>

      {/* 화살표 */}
      <line x1={236} y1={100} x2={236} y2={120} stroke="#64748b" strokeWidth={1.5} markerEnd="url(#arr)" />
      <text x={244} y={113} fontSize={9} fill="#94a3b8">×2</text>

      {/* HBM4 버스 */}
      <text x={4} y={152} fontSize={12} fill="#f59e0b" fontWeight={700}>HBM4</text>
      <text x={4} y={166} fontSize={9} fill="#64748b">2,048-bit</text>
      {Array.from({ length: 16 }).map((_, i) => (
        <rect key={`h${i}`} x={80 + i * 22} y={138} width={18} height={18} fill="#f59e0b" rx={2} opacity={0.8} />
      ))}
      <text x={80} y={174} fontSize={10} fill="#f59e0b" fontWeight={700}>2,048-bit · 2.0 TB/s</text>

      {/* 화살표 마커 정의 */}
      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="3" refY="4" orient="auto">
          <path d="M0 0 L6 4 L0 8" fill="none" stroke="#64748b" strokeWidth="1.2" />
        </marker>
      </defs>
    </svg>
  );
}

/** HBM3E → HBM4 사양 비교표 */
function CompareTable() {
  const rows = [
    { item: "연도", hbm3e: "2024~", hbm4: "2026" },
    { item: "핀당 속도", hbm3e: "~9.6 Gbps", hbm4: "8 Gbps*" },
    { item: "I/O (버스폭)", hbm3e: "1,024-bit", hbm4: "2,048-bit ×2" },
    { item: "대역폭/스택", hbm3e: "~1.2 TB/s", hbm4: "2.0 TB/s" },
    { item: "다이당 용량", hbm3e: "—", hbm4: "24 Gb" },
    { item: "Die stack", hbm3e: "16-Hi", hbm4: "12/16-Hi" },
    { item: "스택 용량", hbm3e: "36 GB", hbm4: "36 / 48 GB" },
    { item: "Power/HBM", hbm3e: "—", hbm4: "75 W" },
    { item: "베이스 다이", hbm3e: "표준", hbm4: "커스텀 베이스 다이 도입" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-sidebar-border">
            <th className="text-left py-2 pr-4 font-semibold text-muted">항목</th>
            <th className="text-left py-2 pr-4 font-semibold text-pink-400">HBM3E</th>
            <th className="text-left py-2 font-semibold text-amber-400">HBM4 (KAIST 로드맵)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-sidebar-border">
          {rows.map((r) => (
            <tr key={r.item}>
              <td className="py-2 pr-4 text-muted">{r.item}</td>
              <td className="py-2 pr-4">{r.hbm3e}</td>
              <td className="py-2 font-semibold text-amber-400">{r.hbm4}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-muted mt-2">
        * HBM4 핀당 속도 8 Gbps는 KAIST TERALAB 로드맵(PDF p.29) 기준. 버스폭 2배 확장이 대역폭 도약의 주요인.
      </p>
    </div>
  );
}

export default function Hbm4() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        HBM4(2026년)는 I/O 버스폭을 1,024-bit에서 <strong>2,048-bit</strong>로 두 배 확장해
        스택당 대역폭 <strong>2.0 TB/s</strong>를 달성합니다. NVIDIA Rubin(R200) GPU에
        HBM4 스택 8개가 탑재되면 총 16~32 TB/s의 시스템 대역폭이 실현됩니다.
      </p>

      {/* ── 핵심 사양 ── */}
      <CalcBox title="■ HBM4 핵심 사양 (KAIST TERALAB 로드맵 p.29)">
        <div className="grid sm:grid-cols-3 gap-3 text-sm mb-4">
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-amber-400 mb-1">I/O 버스폭</div>
            <p className="font-bold text-2xl text-amber-400">2,048-bit</p>
            <p className="text-muted text-xs mt-1">HBM3E(1,024-bit)의 2배. 가장 큰 변화.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-amber-400 mb-1">대역폭/스택</div>
            <p className="font-bold text-2xl text-amber-400">2.0 TB/s</p>
            <p className="text-muted text-xs mt-1">HBM3E 대비 ~1.67배 향상.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-amber-400 mb-1">스택 용량</div>
            <p className="font-bold text-2xl text-amber-400">36 / 48 GB</p>
            <p className="text-muted text-xs mt-1">12-Hi(36 GB) 또는 16-Hi(48 GB). 다이당 24 Gb.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-amber-400 mb-1">핀당 속도</div>
            <p className="text-muted"><strong>8 Gbps</strong> — 클럭보다 버스폭 확장이 전략.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-amber-400 mb-1">소비전력</div>
            <p className="text-muted">스택당 <strong>75 W</strong> — 발열 관리가 중요 이슈.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-amber-400 mb-1">다이 접합</div>
            <p className="text-muted">Microbump(MR-MUF) 유지, 이후 세대에서 범프리스로 전환.</p>
          </div>
        </div>
      </CalcBox>

      {/* ── I/O 2048 도약 도식 ── */}
      <CalcBox title="■ I/O 1,024 → 2,048 — 버스폭 2배 확장의 의미">
        <p className="text-sm mb-4">
          HBM 대역폭 공식은 다음과 같습니다:
        </p>
        <p className="text-sm mb-4 text-center">
          <InlineMath math="\text{대역폭} = \text{핀당 속도(Gbps)} \times \text{I/O 비트 수} \div 8" />
        </p>
        <p className="text-sm text-muted mb-4">
          HBM3E는 9.6 Gbps × 1,024 ÷ 8 ≈ 1.23 TB/s. HBM4는 핀당 속도를
          오히려 8 Gbps로 낮추면서도 I/O를 2배로 늘려 8 × 2,048 ÷ 8 = <strong>2.0 TB/s</strong>를
          달성합니다. 클럭 경쟁 대신 <strong>버스폭 확장</strong>이 핵심 전략입니다.
        </p>
        <IoDoublingDiagram />
        <Insight>
          버스폭을 2배로 늘리면 같은 핀당 속도에서 대역폭이 2배가 됩니다. 반면 클럭을 2배 올리면
          신호 무결성(SI) 문제가 급격히 심화됩니다. HBM4의 선택은 &ldquo;더 많은 선, 더 안정적인 신호&rdquo;입니다.
        </Insight>
      </CalcBox>

      {/* ── HBM3E vs HBM4 비교 ── */}
      <CalcBox title="■ HBM3E → HBM4 사양 비교">
        <CompareTable />
      </CalcBox>

      {/* ── 커스텀 베이스 다이 ── */}
      <CalcBox title="■ 커스텀 베이스 다이 — HBM4의 구조 혁신">
        <SubSection title="● 기존 구조의 한계">
          <p className="text-sm mb-2">
            HBM1~HBM3E는 모든 GPU 벤더에게 동일한 표준 베이스 다이를 제공했습니다.
            베이스 다이는 스택 하부에서 PHY(물리 계층)·제어 로직·전력 회로를 담당합니다.
          </p>
        </SubSection>
        <SubSection title="● HBM4의 커스텀 베이스 다이">
          <p className="text-sm mb-3">
            HBM4부터 NVIDIA·AMD·구글 같은 GPU/가속기 설계사가 베이스 다이 내부 로직을
            <strong> 커스터마이징</strong>할 수 있게 됩니다. 이는 두 가지 결과를 낳습니다:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-green-400 mb-1">① 시스템 최적화</div>
              <p className="text-muted">
                GPU 아키텍처에 맞게 PHY 타이밍·전력 설계를 최적화 &rarr; 성능·전력 효율 향상.
              </p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-green-400 mb-1">② NMC 기능 탑재 준비</div>
              <p className="text-muted">
                로드맵 상 HBM5(2029)부터 본격화될 NMC(Near-Memory Computing) 프로세서 삽입의
                전 단계 — 베이스 다이 커스텀화가 그 시작점.
              </p>
            </div>
          </div>
        </SubSection>
      </CalcBox>

      {/* ── Rubin R200 연결 ── */}
      <CalcBox title="■ Rubin R200 (2026) — HBM4×8 시스템">
        <p className="text-sm mb-4">
          KAIST TERALAB 로드맵(PDF p.344)에 따르면, NVIDIA Rubin 세대 시스템
          <strong> R200</strong>(2026)은 GPU 다이 2개와 함께 <strong>HBM4 스택 8개</strong>를 탑재합니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-sidebar-border">
                <th className="text-left py-2 pr-4 font-semibold text-muted">항목</th>
                <th className="text-left py-2 font-semibold text-amber-400">Rubin R200 (2026)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="py-2 pr-4 text-muted">GPU 다이 수</td><td className="py-2">2개</td></tr>
              <tr><td className="py-2 pr-4 text-muted">HBM 구성</td><td className="py-2 font-semibold text-amber-400">HBM4 × 8 스택</td></tr>
              <tr><td className="py-2 pr-4 text-muted">총 대역폭</td><td className="py-2 font-bold">16 / 32 TB/s</td></tr>
              <tr><td className="py-2 pr-4 text-muted">총 HBM 용량</td><td className="py-2">288 / 384 GB</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted mt-3">
          스택당 2.0 TB/s × 8 스택 = 총 <strong>16 TB/s</strong>(36 GB 구성) 또는
          32 TB/s(48 GB 구성 시 추정). 이는 HBM3E 기반 H200(총 ~4.8 TB/s × 5 = 24 TB/s 상한선)과
          대등하거나 초과하는 규모입니다.
        </p>
        <Insight>
          HBM4 + Rubin은 2026년 AI 가속기 시장의 세대 전환점입니다. 버스폭 2배 확장과
          커스텀 베이스 다이라는 두 가지 구조 혁신이 동시에 등장하며, 이후
          HBM5(2029)의 4,096-bit·NMC 시대로 향하는 발판이 됩니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
