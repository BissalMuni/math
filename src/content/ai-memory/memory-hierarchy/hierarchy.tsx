"use client";

import { useState } from "react";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 메모리 계층별 사양 데이터 */
const LAYERS = [
  {
    name: "SRAM 캐시",
    latency: "< 1 ns",
    bandwidth: "수 TB/s (추정 ~5,000 GB/s)",
    bwGB: 5000,
    capacity: "수 MB",
    cost: "매우 높음",
    color: "#a78bfa",
    analogy: "책상 위 포스트잇",
    detail:
      "GPU/CPU 코어와 가장 가까운 고속 캐시. 제조 비용이 극히 높아 소량만 탑재. 접근 지연이 1 ns 미만으로 연산 클럭 속도에 거의 근접. AI 가속기 내 L1/L2 캐시가 여기에 해당.",
  },
  {
    name: "HBM",
    latency: "~100 ns",
    bandwidth: "2~4 TB/s (스택당)",
    bwGB: 3000,
    capacity: "36~500 GB",
    cost: "높음",
    color: "#60a5fa",
    analogy: "책상 옆 책꽂이",
    detail:
      "GPU 다이 옆에 3D 적층된 DRAM. TSV·실리콘 인터포저로 단거리 연결. HBM4(2026) 스택당 2 TB/s → HBM5(2029) 4 TB/s 로드맵. AI 훈련·추론의 핫(hot) 가중치 저장.",
  },
  {
    name: "HBF",
    latency: "수 µs",
    bandwidth: "최대 1.638 TB/s",
    bwGB: 1638,
    capacity: "최대 512 GB",
    cost: "중간",
    color: "#34d399",
    analogy: "바로 옆 도서관",
    detail:
      "NAND 플래시를 수직 적층해 HBM급 대역폭과 SSD급 용량을 결합. AI 추론의 read-heavy 패턴과 최적 정합. 콜드(cold) 가중치·KV 캐시의 2차 저장소로 활용.",
  },
  {
    name: "SSD / NVMe",
    latency: "수십~수백 µs",
    bandwidth: "~14 GB/s (PCIe5)",
    bwGB: 14,
    capacity: "수 TB",
    cost: "낮음",
    color: "#fbbf24",
    analogy: "건물 내 창고",
    detail:
      "PCIe 버스를 경유해 지연이 크고 대역폭이 낮음. 비용 대비 대용량 저장에 유리. 학습 데이터셋·체크포인트 저장에 사용. HBF와 비교하면 대역폭이 ~100배 낮다.",
  },
];

const LOG_MAX = Math.log10(5000);
const LOG_MIN = Math.log10(10);

function logBarPct(bwGB: number) {
  return ((Math.log10(Math.max(bwGB, 10)) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 100;
}

/** 클릭 가능한 계층 피라미드 */
function InteractivePyramid({
  selected,
  onSelect,
}: {
  selected: number | null;
  onSelect: (i: number) => void;
}) {
  const W = 440;
  const totalH = 220;
  const count = LAYERS.length;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${W} ${totalH}`}
      style={{ fontFamily: "sans-serif", cursor: "pointer" }}
      role="img"
      aria-label="메모리 계층 피라미드"
    >
      {LAYERS.map((layer, i) => {
        const rowH = (totalH - 20) / count;
        const y = 10 + i * rowH;
        const indent = i * 28;
        const rectW = W - 2 * indent - 110;
        const x = indent;
        const isSelected = selected === i;
        return (
          <g key={layer.name} onClick={() => onSelect(i)} aria-label={layer.name}>
            <rect
              x={x}
              y={y + 2}
              width={rectW}
              height={rowH - 6}
              rx={6}
              fill={layer.color}
              fillOpacity={isSelected ? 0.38 : 0.18}
              stroke={layer.color}
              strokeWidth={isSelected ? 2.8 : 1.5}
            />
            <text
              x={x + 10}
              y={y + rowH / 2 + 1}
              dominantBaseline="middle"
              fontSize={11}
              fill={layer.color}
              fontWeight={700}
            >
              {layer.name}
            </text>
            <text
              x={x + rectW + 8}
              y={y + rowH / 2 - 7}
              dominantBaseline="middle"
              fontSize={9}
              fill="#94a3b8"
            >
              {layer.bandwidth.split(" (")[0]}
            </text>
            <text
              x={x + rectW + 8}
              y={y + rowH / 2 + 6}
              dominantBaseline="middle"
              fontSize={9}
              fill="#64748b"
            >
              {layer.capacity}
            </text>
          </g>
        );
      })}
      {/* 속도/용량 방향 표시 */}
      <text x={W - 8} y={14} textAnchor="end" fontSize={9} fill="#f87171">
        속도 ↑
      </text>
      <line
        x1={W - 12}
        y1={18}
        x2={W - 12}
        y2={totalH - 10}
        stroke="#f87171"
        strokeWidth={1}
        strokeDasharray="3,2"
      />
      <text x={W - 8} y={totalH - 4} textAnchor="end" fontSize={9} fill="#22c55e">
        용량 ↑
      </text>
    </svg>
  );
}

/** 대역폭 로그 스케일 비교 바 */
function BwBarChart() {
  return (
    <div className="space-y-2 pt-3">
      <p className="text-xs text-muted">대역폭 비교 (로그 스케일, 10 GB/s 기준)</p>
      {LAYERS.map((l) => (
        <div key={l.name} className="flex items-center gap-2 text-xs">
          <span className="w-20 shrink-0 font-medium" style={{ color: l.color }}>
            {l.name}
          </span>
          <div className="flex-1 bg-sidebar-bg rounded overflow-hidden h-4">
            <div
              className="h-4 rounded"
              style={{
                width: `${logBarPct(l.bwGB)}%`,
                background: l.color,
                opacity: 0.65,
              }}
            />
          </div>
          <span className="w-28 shrink-0 text-muted text-right">
            {l.bandwidth.split(" (")[0]}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Hierarchy() {
  const [selected, setSelected] = useState<number | null>(null);
  const sel = selected !== null ? LAYERS[selected] : null;

  return (
    <div className="space-y-8">
      <p className="text-muted">
        컴퓨터 메모리는 &ldquo;빠를수록 비싸고 작다&rdquo;는 트레이드오프를 따릅니다.
        AI 가속기는 SRAM 캐시부터 HBM, HBF, SSD까지 계층을 쌓아 속도와 용량을 동시에 확보합니다.
        <strong> 각 계층을 클릭</strong>하면 상세 정보와 대역폭 비교를 확인할 수 있습니다.
      </p>

      {/* ── 계층 피라미드 (인터랙티브) ── */}
      <CalcBox title="■ 메모리 계층 — 속도 vs 용량 트레이드오프">
        <InteractivePyramid
          selected={selected}
          onSelect={(i) => setSelected(i === selected ? null : i)}
        />
        <p className="text-xs text-muted text-center mt-1">
          ▲ 위로 갈수록 빠르고 비싸며 작다. 계층을 클릭하면 상세 정보가 나타납니다.
        </p>

        {/* 선택된 계층 상세 패널 */}
        {sel && (
          <div
            className="mt-4 rounded-lg border p-4 transition-all"
            style={{ borderColor: sel.color, background: `${sel.color}11` }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="font-bold text-base" style={{ color: sel.color }}>
                {sel.name}
              </span>
              <span className="text-xs text-muted">비유: {sel.analogy}</span>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 text-sm mb-3">
              <div>
                <p className="text-muted text-xs mb-0.5">지연 (Latency)</p>
                <p className="font-medium">{sel.latency}</p>
              </div>
              <div>
                <p className="text-muted text-xs mb-0.5">대역폭</p>
                <p className="font-medium">{sel.bandwidth.split(" (")[0]}</p>
              </div>
              <div>
                <p className="text-muted text-xs mb-0.5">용량 / 비용</p>
                <p className="font-medium">
                  {sel.capacity} · {sel.cost}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted">{sel.detail}</p>
          </div>
        )}

        <BwBarChart />
      </CalcBox>

      {/* ── 각 계층 상세 ── */}
      <CalcBox title="■ 각 계층 상세">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-sidebar-border">
                {["계층", "지연(Latency)", "대역폭", "용량", "비용", "비유"].map((h) => (
                  <th
                    key={h}
                    className="text-left py-2 pr-3 font-semibold text-muted whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              {LAYERS.map((l) => (
                <tr key={l.name}>
                  <td
                    className="py-2 pr-3 font-semibold whitespace-nowrap"
                    style={{ color: l.color }}
                  >
                    {l.name}
                  </td>
                  <td className="py-2 pr-3 text-muted">{l.latency}</td>
                  <td className="py-2 pr-3">{l.bandwidth.split(" (")[0]}</td>
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
