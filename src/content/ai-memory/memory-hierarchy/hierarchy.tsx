import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 메모리 계층별 사양 데이터 */
const LAYERS = [
  {
    name: "SRAM 캐시",
    latency: "< 1 ns",
    bandwidth: "수 TB/s",
    capacity: "수 MB",
    cost: "매우 높음",
    color: "#a78bfa",
    analogy: "책상 위 포스트잇",
  },
  {
    name: "HBM",
    latency: "~100 ns",
    bandwidth: "2~4 TB/s (스택당)",
    capacity: "36~500 GB",
    cost: "높음",
    color: "#60a5fa",
    analogy: "책상 옆 책꽂이",
  },
  {
    name: "HBF",
    latency: "수 µs",
    bandwidth: "최대 1.638 TB/s",
    capacity: "최대 512 GB",
    cost: "중간",
    color: "#34d399",
    analogy: "바로 옆 도서관",
  },
  {
    name: "SSD / NVMe",
    latency: "수십~수백 µs",
    bandwidth: "~14 GB/s (PCIe5)",
    capacity: "수 TB",
    cost: "낮음",
    color: "#fbbf24",
    analogy: "건물 내 창고",
  },
];

/** 계층 피라미드 SVG */
function HierarchyPyramid() {
  const W = 440;
  const totalH = 210;
  const count = LAYERS.length;

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${totalH}`} style={{ fontFamily: "sans-serif" }}>
      {LAYERS.map((layer, i) => {
        const rowH = (totalH - 20) / count;
        const y = 10 + i * rowH;
        const indent = i * 28;
        const rectW = W - 2 * indent - 110;
        const x = indent;
        return (
          <g key={layer.name}>
            <rect x={x} y={y + 2} width={rectW} height={rowH - 6} rx={6}
              fill={layer.color} fillOpacity={0.18} stroke={layer.color} strokeWidth={1.5} />
            <text x={x + 8} y={y + rowH / 2 + 1} dominantBaseline="middle" fontSize={11} fill={layer.color} fontWeight={700}>
              {layer.name}
            </text>
            <text x={x + rectW + 8} y={y + rowH / 2 - 6} dominantBaseline="middle" fontSize={9} fill="#94a3b8">
              {layer.bandwidth}
            </text>
            <text x={x + rectW + 8} y={y + rowH / 2 + 6} dominantBaseline="middle" fontSize={9} fill="#64748b">
              {layer.capacity}
            </text>
          </g>
        );
      })}
      {/* 속도/용량 화살표 */}
      <text x={W - 8} y={14} textAnchor="end" fontSize={9} fill="#f87171">속도 ↑</text>
      <line x1={W - 12} y1={18} x2={W - 12} y2={totalH - 10} stroke="#f87171" strokeWidth={1} strokeDasharray="3,2" />
      <text x={W - 8} y={totalH - 4} textAnchor="end" fontSize={9} fill="#22c55e">용량 ↑</text>
    </svg>
  );
}

export default function Hierarchy() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        컴퓨터 메모리는 &ldquo;빠를수록 비싸고 작다&rdquo;는 트레이드오프를 따릅니다.
        AI 가속기는 SRAM 캐시부터 HBM, HBF, SSD까지 계층을 쌓아 속도와 용량을 동시에 확보합니다.
      </p>

      {/* ── 계층 피라미드 ── */}
      <CalcBox title="■ 메모리 계층 — 속도 vs 용량 트레이드오프">
        <HierarchyPyramid />
        <p className="text-xs text-muted text-center mt-1">
          ▲ 위로 갈수록 빠르고 비싸며 작다. 아래로 갈수록 느리고 싸며 크다.
        </p>
      </CalcBox>

      {/* ── 각 계층 상세 ── */}
      <CalcBox title="■ 각 계층 상세">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-sidebar-border">
                {["계층", "지연(Latency)", "대역폭", "용량", "비용", "비유"].map((h) => (
                  <th key={h} className="text-left py-2 pr-3 font-semibold text-muted whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              {LAYERS.map((l) => (
                <tr key={l.name}>
                  <td className="py-2 pr-3 font-semibold whitespace-nowrap" style={{ color: l.color }}>{l.name}</td>
                  <td className="py-2 pr-3 text-muted">{l.latency}</td>
                  <td className="py-2 pr-3">{l.bandwidth}</td>
                  <td className="py-2 pr-3 text-muted">{l.capacity}</td>
                  <td className="py-2 pr-3 text-muted">{l.cost}</td>
                  <td className="py-2 text-muted text-xs">{l.analogy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CalcBox>

      {/* ── 책꽂이·도서관 비유 ── */}
      <CalcBox title="■ 책꽂이(HBM)와 도서관(HBF) 비유">
        <SubSection title="● GPU 앞의 책꽂이 — HBM">
          <p className="text-sm mb-2">
            HBM은 GPU 다이 바로 옆 실리콘 인터포저 위에 올라갑니다. 손을 뻗으면 바로 닿는
            <strong> 책상 옆 책꽂이</strong>처럼, 낮은 지연과 TB/s급 대역폭으로
            자주 쓰는 가중치와 활성화값을 공급합니다.
          </p>
          <p className="text-sm text-muted">
            척추 예시: GPU 앞 <strong>100 GB HBM (캐시)</strong>
          </p>
        </SubSection>
        <SubSection title="● GPU 옆의 도서관 — HBF">
          <p className="text-sm mb-2">
            HBF(High Bandwidth Flash)는 NAND 플래시를 수직 적층해 HBM 수준의 대역폭과
            SSD급 용량을 결합합니다. 도서관처럼 자주 쓰지 않는 책(가중치 라이브러리)을
            대량 보관하다가 필요할 때 빠르게 공급합니다.
          </p>
          <p className="text-sm text-muted">
            척추 예시: GPU 옆 <strong>1 TB HBF (라이브러리)</strong>. HBF 용량 ≈ HBM의 약 10배.
          </p>
        </SubSection>
        <SubSection title="● SK하이닉스 H3 아키텍처">
          <p className="text-sm">
            SK하이닉스 <strong>H3</strong>은 HBM과 HBF를 GPU 옆에 나란히 배치하는 구조입니다.
            캐시(HBM) + 라이브러리(HBF) 두 계층이 하나의 패키지 내에서 협동합니다.
          </p>
        </SubSection>
        <Insight>
          &ldquo;100 GB HBM(책꽂이) + 1 TB HBF(도서관)&rdquo; 조합은 단순한 용량 확장이 아닙니다.
          핫(hot) 데이터는 HBM에, 콜드(cold) 데이터는 HBF에 두어
          <strong> 대역폭 낭비 없이 모델 전체를 GPU 근방에</strong> 올려놓는 전략입니다.
        </Insight>
      </CalcBox>

      {/* ── SSD와의 차이 ── */}
      <CalcBox title="■ HBF vs NVMe SSD — 무엇이 다른가">
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-green-400 mb-2">HBF (High Bandwidth Flash)</div>
            <p className="text-muted">① 3D NAND + TSV 수직 적층 → GPU 인터포저 근방 배치</p>
            <p className="text-muted">② 대역폭 최대 1.638 TB/s (NVMe SSD 대비 100배+)</p>
            <p className="text-muted">③ 컨트롤러가 내부에 통합 → 지연 수 µs 수준</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-yellow-400 mb-2">PCIe5 NVMe SSD</div>
            <p className="text-muted">① PCIe 버스 경유 → 지연 수십~수백 µs</p>
            <p className="text-muted">② 대역폭 ~14 GB/s</p>
            <p className="text-muted">③ 용량 수 TB, 비용 낮음</p>
          </div>
        </div>
      </CalcBox>
    </div>
  );
}
