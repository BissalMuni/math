import { CalcBox, SubSection, Insight } from "@/components/content/shared";
import { InlineMath } from "@/components/math/math-formula";

/** HBM7 주요 사양 상수 (page 29) */
const HBM7_SPECS = [
  { label: "Data Rate (핀당)", value: "24 Gbps", note: "HBM6(16 Gbps) 대비 ×1.5" },
  { label: "I/O (버스폭)", value: "8,192-bit", note: "HBM6(4,096) 대비 2배" },
  { label: "대역폭/스택", value: "24 TB/s", note: "HBM6(8 TB/s) 대비 3배" },
  { label: "다이당 용량", value: "64 Gb", note: "HBM6(48 Gb) 대비 +33 %" },
  { label: "Die stack", value: "20/24-Hi", note: "최대 24층 — 범프리스 Cu-Cu 필수 단계" },
  { label: "스택 용량", value: "160 / 192 GB", note: "20-Hi(160 GB) 또는 24-Hi(192 GB)" },
  { label: "Power/HBM", value: "160 W", note: "HBM6(120 W) 대비 +40 W" },
];

/** HBM3~HBM7 대역폭 트렌드 */
function TrendChart() {
  const pts = [
    { label: "HBM3\n(2023)", bw: 0.819, color: "#94a3b8" },
    { label: "HBM4\n(2026)", bw: 2.0, color: "#f59e0b" },
    { label: "HBM5\n(2029)", bw: 4.0, color: "#22d3ee" },
    { label: "HBM6\n(2032)", bw: 8.0, color: "#a78bfa" },
    { label: "HBM7\n(2035)", bw: 24.0, color: "#34d399" },
  ];
  const maxBw = 24.0;
  const W = 480;
  const H = 140;
  const pad = 40;
  const chartW = W - pad * 2;
  const chartH = H - 20;
  const n = pts.length;

  const cx = (i: number) => pad + (i / (n - 1)) * chartW;
  const cy = (bw: number) => 10 + chartH - (bw / maxBw) * chartH;

  const polyline = pts.map((p, i) => `${cx(i)},${cy(p.bw)}`).join(" ");

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H + 40}`} style={{ fontFamily: "sans-serif", maxWidth: 560 }}>
      <text x={8} y={14} fontSize={10} fill="#94a3b8" fontWeight={600}>
        스택당 대역폭 추이 (TB/s) — HBM3 &rarr; HBM7
      </text>
      <polyline points={polyline} fill="none" stroke="#64748b" strokeWidth={1.5} strokeDasharray="4,2" />
      {pts.map((p, i) => (
        <g key={p.label}>
          <circle cx={cx(i)} cy={cy(p.bw)} r={6} fill={p.color} />
          <text x={cx(i)} y={cy(p.bw) - 10} textAnchor="middle" fontSize={9} fill={p.color} fontWeight={700}>
            {p.bw < 1 ? `${Math.round(p.bw * 1000)} GB/s` : `${p.bw} TB/s`}
          </text>
          <text x={cx(i)} y={H + 15} textAnchor="middle" fontSize={8} fill="#94a3b8">
            {p.label.split("\n")[0]}
          </text>
          <text x={cx(i)} y={H + 26} textAnchor="middle" fontSize={8} fill="#64748b">
            {p.label.split("\n")[1]}
          </text>
        </g>
      ))}
      <line x1={pad} y1={10} x2={pad} y2={10 + chartH} stroke="#1e293b" strokeWidth={1} />
      <line x1={pad} y1={10 + chartH} x2={W - pad} y2={10 + chartH} stroke="#1e293b" strokeWidth={1} />
    </svg>
  );
}

/** HBM-HBF 결합 계층 다이어그램 */
function HbmHbfDiagram() {
  return (
    <svg width="100%" viewBox="0 0 480 200" style={{ fontFamily: "sans-serif", maxWidth: 540 }}>
      <text x={8} y={16} fontSize={10} fill="#94a3b8" fontWeight={600}>
        HBM7 시대 — HBM + HBF 결합 메모리 계층 (개념도)
      </text>

      {/* GPU */}
      <rect x={180} y={30} width={120} height={42} fill="#1e293b" stroke="#475569" strokeWidth={1.5} rx={4} />
      <text x={240} y={55} textAnchor="middle" fontSize={11} fill="#d1d5db" fontWeight={700}>GPU</text>

      {/* HBM7 */}
      <rect x={30} y={110} width={130} height={50} fill="#065f46" stroke="#34d399" strokeWidth={1.5} rx={4} />
      <text x={95} y={130} textAnchor="middle" fontSize={10} fill="#34d399" fontWeight={700}>HBM7</text>
      <text x={95} y={145} textAnchor="middle" fontSize={9} fill="#6ee7b7">24 TB/s · 160~192 GB</text>
      <text x={95} y={158} textAnchor="middle" fontSize={8} fill="#6ee7b7">&ldquo;책꽂이 (캐시)&rdquo;</text>

      {/* HBF */}
      <rect x={320} y={110} width={130} height={50} fill="#1e1b4b" stroke="#818cf8" strokeWidth={1.5} rx={4} />
      <text x={385} y={130} textAnchor="middle" fontSize={10} fill="#818cf8" fontWeight={700}>HBF</text>
      <text x={385} y={145} textAnchor="middle" fontSize={9} fill="#a5b4fc">대용량 · 최대 512 GB</text>
      <text x={385} y={158} textAnchor="middle" fontSize={8} fill="#a5b4fc">&ldquo;도서관 (라이브러리)&rdquo;</text>

      {/* Storage Network */}
      <rect x={140} y={175} width={200} height={20} fill="#1c1917" stroke="#78716c" strokeWidth={1} rx={3} />
      <text x={240} y={189} textAnchor="middle" fontSize={9} fill="#a8a29e">Storage Network</text>

      {/* 연결선 */}
      <line x1={240} y1={72} x2={95} y2={110} stroke="#34d399" strokeWidth={1.5} />
      <line x1={240} y1={72} x2={385} y2={110} stroke="#818cf8" strokeWidth={1.5} />
      <line x1={95} y1={160} x2={180} y2={175} stroke="#78716c" strokeWidth={1} strokeDasharray="3,2" />
      <line x1={385} y1={160} x2={300} y2={175} stroke="#78716c" strokeWidth={1} strokeDasharray="3,2" />
    </svg>
  );
}

export default function Hbm7() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        HBM7(2035년 예상)은 I/O 버스폭과 핀당 속도를 동시에 올려 스택당
        <strong> 24 TB/s</strong>라는 도약을 이룹니다. 더 중요한 변화는 아키텍처 측에서
        <strong> HBM-HBF(High Bandwidth Flash) 결합</strong>과 Storage Network가
        본격 등장해 용량의 물리적 한계를 돌파하는 것입니다.
      </p>

      {/* ── 핵심 사양 ── */}
      <CalcBox title="■ HBM7 핵심 사양 (KAIST TERALAB 로드맵 p.29)">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-sidebar-border">
                <th className="text-left py-2 pr-4 font-semibold text-muted">항목</th>
                <th className="text-left py-2 pr-4 font-semibold text-emerald-400">HBM7 수치</th>
                <th className="text-left py-2 font-semibold text-muted">의미</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              {HBM7_SPECS.map((r) => (
                <tr key={r.label}>
                  <td className="py-2 pr-4 text-muted">{r.label}</td>
                  <td className="py-2 pr-4 font-semibold text-emerald-400">{r.value}</td>
                  <td className="py-2 text-muted text-xs">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted mt-3">
          대역폭 계산:
          {" "}<InlineMath math="24\,\text{Gbps} \times 8{,}192\,\text{bit} \div 8 = 24.576\,\text{TB/s} \approx 24\,\text{TB/s}" />
        </p>
      </CalcBox>

      {/* ── 대역폭 추이 ── */}
      <CalcBox title="■ 대역폭 추이 — HBM3 &rarr; HBM7 폭발적 성장">
        <TrendChart />
        <Insight>
          HBM7(24 TB/s)은 HBM3(819 GB/s) 대비 약 <strong>29배</strong> 향상입니다.
          이 구간(2023→2035)의 대역폭 성장률은 DRAM 클럭 진화보다 훨씬 가파른데,
          I/O 버스폭과 핀당 속도가 <strong>동시에</strong> 확장되기 때문입니다.
        </Insight>
      </CalcBox>

      {/* ── HBM-HBF 결합 ── */}
      <CalcBox title="■ HBM-HBF 결합 시작 — 용량 한계 돌파 (핵심 혁신)">
        <p className="text-sm mb-4 text-muted">
          HBM만으로는 스택당 192 GB(24-Hi)가 물리적 한계에 근접합니다.
          HBM7 세대부터 <strong>HBF(High Bandwidth Flash)</strong>를 GPU 옆에 병치하고
          Storage Network로 연결해 용량 문제를 해결하는 전략이 본격화됩니다.
        </p>
        <HbmHbfDiagram />
        <SubSection title="● HBM vs HBF 역할 분리">
          <div className="grid sm:grid-cols-2 gap-3 text-sm mt-2">
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-emerald-400 mb-1">HBM7 — &ldquo;책꽂이&rdquo;</div>
              <p className="text-muted text-xs">
                ① 속도 최우선: 24 TB/s 대역폭.<br />
                ② GPU 바로 옆 배치(초저지연).<br />
                ③ 활성 모델 파라미터, KV 캐시를 상주.
              </p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-indigo-400 mb-1">HBF — &ldquo;도서관&rdquo;</div>
              <p className="text-muted text-xs">
                ① 용량 최우선: 단위당 최대 512 GB.<br />
                ② 대역폭 최대 1.638 TB/s(HBM 대비 낮지만 SSD 대비 100배+).<br />
                ③ 비활성 모델, 임베딩 테이블, 히스토리 저장.
              </p>
            </div>
          </div>
        </SubSection>
        <SubSection title="● Storage Network (KAIST 로드맵 p.29 특징 항목)">
          <p className="text-sm text-muted mb-2">
            HBM7 세대의 특징 중 하나로 <strong>Storage network</strong>가 명시됩니다.
            이는 HBF를 단순히 &ldquo;옆에 놓는&rdquo; 것이 아니라, 고대역폭 스토리지를
            네트워크처럼 연결해 다수의 GPU가 공유하는 구조를 가리킵니다.
          </p>
          <p className="text-sm text-muted">
            에이전트형 AI의 컨텍스트(1인당 ~100 TB 전망, 2030년대 중반)를 처리하려면
            개별 GPU HBM 용량만으로는 턱없이 부족하므로, 네트워크 연결 스토리지를
            메모리 계층에 통합하는 이 방향이 필수가 됩니다.
          </p>
        </SubSection>
      </CalcBox>

      {/* ── GPU 시스템 ── */}
      <CalcBox title="■ Next-Gen Z800* (2032) — HBM7×32 시스템">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-sidebar-border">
                <th className="text-left py-2 pr-4 font-semibold text-muted">항목</th>
                <th className="text-left py-2 font-semibold text-emerald-400">Next-Gen Z800* (2032)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="py-2 pr-4 text-muted">GPU 다이 수</td><td className="py-2">8개</td></tr>
              <tr><td className="py-2 pr-4 text-muted">HBM 구성</td><td className="py-2 font-semibold text-emerald-400">HBM7 × 32 스택</td></tr>
              <tr><td className="py-2 pr-4 text-muted">총 대역폭</td><td className="py-2 font-bold">1,024 TB/s</td></tr>
              <tr><td className="py-2 pr-4 text-muted">총 HBM 용량</td><td className="py-2">5,120 / 6,144 GB</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted mt-3">
          스택당 24 TB/s × 32 스택 = <strong>768 TB/s</strong>(순수 HBM7 계산치).
          Z800* 총 대역폭 1,024 TB/s(= 1 PB/s)는 인터커넥트 포함 시스템 수치.
          총 용량 5~6 TB는 현재의 데이터센터급 메모리를 단일 가속기에 집약한 규모입니다.
        </p>
        <Insight>
          Z800*의 1,024 TB/s는 현재 HBM3E 기반 시스템(수 TB/s 수준) 대비
          수백 배 규모입니다. HBM-HBF 결합 없이 HBM 단독으로는 용량을 확보할 수 없어,
          <strong> Storage Network가 Z800* 세대의 필수 구성 요소</strong>가 됩니다.
        </Insight>
      </CalcBox>

      {/* ── 적층 기술 전환 ── */}
      <CalcBox title="■ 20/24-Hi 적층 — 범프리스 Cu-Cu Direct Bonding 필수">
        <SubSection title="● 왜 범프리스인가">
          <p className="text-sm text-muted mb-2">
            마이크로범프(Microbump) 방식은 범프 자체의 높이가 다이 간 간격을 제한합니다.
            24층을 쌓으면 전체 스택 높이가 과도해져 패키지 제약에 걸리므로,
            범프 없이 구리 패드끼리 직접 접합하는 <strong>Cu-Cu Direct Bonding</strong>이 필수입니다.
          </p>
        </SubSection>
        <SubSection title="● 전환 시점">
          <p className="text-sm text-muted mb-2">
            KAIST 로드맵(p.29): <strong>Microbump(MR-MUF) &rarr; Bump-less Cu-Cu Direct Bonding</strong>.
            HBM7의 20/24-Hi는 이 전환이 완료된 단계에 해당하며, 다이 간격이 수 µm 수준으로
            줄어들어 전기·열 특성 모두 개선됩니다.
          </p>
        </SubSection>
      </CalcBox>
    </div>
  );
}
