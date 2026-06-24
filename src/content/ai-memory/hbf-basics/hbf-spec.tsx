import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 대역폭 비교 막대그래프 */
const BW_DATA = [
  { label: "PCIe5 NVMe SSD", bw: 14, unit: "GB/s", color: "#64748b", note: "약 14 GB/s" },
  { label: "HBF (최대)", bw: 1638, unit: "GB/s", color: "#f59e0b", note: "최대 1,638 GB/s" },
  { label: "HBM4 (1스택)", bw: 2000, unit: "GB/s", color: "#0ea5e9", note: "최대 2,000 GB/s" },
] as const;

function BandwidthBarChart() {
  const maxBw = 2200;
  const chartW = 340;
  const barH = 36;
  const gap = 14;
  const labelW = 130;
  const chartH = BW_DATA.length * (barH + gap) + 30;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${chartW + labelW + 20} ${chartH}`}
      style={{ fontFamily: "sans-serif", maxWidth: 520 }}
      aria-label="HBF · HBM · SSD 대역폭 비교 막대그래프"
    >
      <text x={(chartW + labelW) / 2} y={14} textAnchor="middle" fontSize={10} fill="#94a3b8">
        대역폭 비교 (GB/s 단위, 로그 스케일 아님)
      </text>
      {BW_DATA.map((d, i) => {
        const barW = Math.max(2, (d.bw / maxBw) * chartW);
        const y = 24 + i * (barH + gap);
        return (
          <g key={d.label}>
            {/* 배경 트랙 */}
            <rect x={labelW} y={y} width={chartW} height={barH} rx={4} fill="#1e293b" opacity={0.5} />
            {/* 실제 막대 */}
            <rect x={labelW} y={y} width={barW} height={barH} rx={4} fill={d.color} opacity={0.85} />
            {/* 라벨 (왼쪽) */}
            <text x={labelW - 6} y={y + barH / 2 + 4} textAnchor="end" fontSize={9} fill="#94a3b8">
              {d.label}
            </text>
            {/* 수치 (막대 위) */}
            <text x={labelW + barW + 5} y={y + barH / 2 + 4} fontSize={9} fill={d.color} fontWeight={600}>
              {d.note}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** 내구성 개념 시각화 */
function EnduranceDiagram() {
  const total = 10;
  const worn = 3;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="100%" viewBox="0 0 300 80" style={{ maxWidth: 300 }}>
        <text x={150} y={14} textAnchor="middle" fontSize={10} fill="#94a3b8">
          NAND 셀 수명 개념 (쓰기/소거 반복)
        </text>
        {Array.from({ length: total }).map((_, i) => {
          const isWorn = i < worn;
          return (
            <g key={i}>
              <rect
                x={10 + i * 28}
                y={24}
                width={22}
                height={40}
                rx={3}
                fill={isWorn ? "#ef4444" : "#22c55e"}
                opacity={isWorn ? 0.7 : 0.6}
              />
              <text
                x={21 + i * 28}
                y={50}
                textAnchor="middle"
                fontSize={8}
                fill="#fff"
              >
                {isWorn ? "소진" : "남음"}
              </text>
            </g>
          );
        })}
        <text x={150} y={76} textAnchor="middle" fontSize={9} fill="#64748b">
          쓰기 ~10만 회 후 빨간 셀 증가 → 읽기는 사실상 무제한
        </text>
      </svg>
    </div>
  );
}

export default function HbfSpec() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        KAIST TERALAB 로드맵(김정호 교수, 1-C)이 제시하는 HBF 핵심 사양을 정리합니다.
        수치는 원본을 그대로 인용하며, PCIe5 NVMe SSD와 HBM4 대비 성능을 비교합니다.
      </p>

      {/* ── 핵심 사양 카드 ── */}
      <CalcBox title="■ HBF 핵심 사양 (KAIST TERALAB 1-C)">
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-5 flex flex-col gap-1">
            <div className="text-xs text-amber-400 font-semibold uppercase tracking-wide">용량 (유닛당)</div>
            <div className="text-3xl font-bold text-amber-400">512 GB</div>
            <div className="text-muted text-xs">최대. HBM4 48 GB(12-Hi) 대비 약 10배.</div>
          </div>
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-5 flex flex-col gap-1">
            <div className="text-xs text-amber-400 font-semibold uppercase tracking-wide">대역폭 (유닛당)</div>
            <div className="text-3xl font-bold text-amber-400">1.638 TB/s</div>
            <div className="text-muted text-xs">최대. PCIe5 NVMe SSD(~14 GB/s) 대비 100배 이상.</div>
          </div>
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5 flex flex-col gap-1">
            <div className="text-xs text-red-400 font-semibold uppercase tracking-wide">쓰기 내구성</div>
            <div className="text-2xl font-bold text-red-400">~10만 회</div>
            <div className="text-muted text-xs">P/E(Program/Erase) 사이클. TLC/QLC 기준.</div>
          </div>
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5 flex flex-col gap-1">
            <div className="text-xs text-green-400 font-semibold uppercase tracking-wide">읽기 내구성</div>
            <div className="text-2xl font-bold text-green-400">사실상 무제한</div>
            <div className="text-muted text-xs">읽기는 셀을 소모하지 않음 &rarr; AI 추론에 최적.</div>
          </div>
        </div>
      </CalcBox>

      {/* ── 대역폭 비교 ── */}
      <CalcBox title="■ 대역폭 비교 — SSD vs HBF vs HBM">
        <p className="text-sm mb-4">
          HBF의 최대 대역폭(1.638 TB/s)은 PCIe5 NVMe SSD(약 14 GB/s)의 <strong>100배 이상</strong>,
          HBM4 1스택(최대 2 TB/s)과 유사한 수준입니다. 대용량+고대역폭이라는 조합이 HBF의 핵심 가치입니다.
        </p>
        <div className="flex justify-center mb-2">
          <BandwidthBarChart />
        </div>
        <p className="text-xs text-muted text-center mt-1">
          출처: KAIST TERALAB 로드맵 1-C (HBF), 1-A (HBM4)
        </p>
        <SubSection title="● 배율 정리">
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-sidebar-border">
                  <th className="text-left py-2 pr-4 font-semibold text-muted">메모리</th>
                  <th className="text-left py-2 pr-4 font-semibold text-muted">대역폭</th>
                  <th className="text-left py-2 font-semibold text-muted">SSD 대비</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr>
                  <td className="py-2 pr-4 font-medium text-gray-400">PCIe5 NVMe SSD</td>
                  <td className="py-2 pr-4 text-gray-400">~14 GB/s</td>
                  <td className="py-2 text-gray-400">1×</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium text-amber-400">HBF (최대)</td>
                  <td className="py-2 pr-4 text-amber-400">1,638 GB/s</td>
                  <td className="py-2 text-amber-400">~117×</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium text-blue-400">HBM4 (1스택)</td>
                  <td className="py-2 pr-4 text-blue-400">2,000 GB/s</td>
                  <td className="py-2 text-blue-400">~143×</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SubSection>
        <Insight>
          HBF는 &ldquo;SSD보다 100배 빠르고, HBM보다 10배 크다&rdquo;는 두 숫자가 핵심입니다.
          이 두 가지를 동시에 제공하기 때문에 AI 메모리 계층에서 독자적인 위치를 점합니다.
        </Insight>
      </CalcBox>

      {/* ── 내구성과 read-heavy ── */}
      <CalcBox title="■ 쓰기 내구성과 read-heavy 운용 모델">
        <p className="text-sm mb-4">
          NAND 플래시는 쓰기(Program)/소거(Erase)를 반복할수록 셀이 닳습니다.
          HBF의 쓰기 내구성은 <strong>약 10만 회</strong>(&asymp; TLC 기준)이며,
          읽기는 셀을 소모하지 않아 사실상 무제한입니다.
        </p>
        <div className="flex justify-center mb-4">
          <EnduranceDiagram />
        </div>
        <SubSection title="● read-heavy 모델이 필요한 이유">
          <p className="text-sm mb-3">
            AI <strong>추론(Inference)</strong> 워크로드는 모델 가중치와 KV캐시를 반복적으로
            <strong> 읽기</strong>만 합니다 &mdash; 학습이 완료된 가중치는 변하지 않습니다.
            즉, HBF는 AI 추론의 &ldquo;읽기 중심&rdquo; 특성과 정확히 맞습니다.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-green-500/30 p-3 bg-green-500/5">
              <div className="font-semibold text-green-400 mb-1">HBF에 적합</div>
              <p className="text-muted text-xs">
                AI 추론(Inference) &mdash; 가중치·KV캐시를 반복 읽기. 쓰기는 최초 로드 1회.
              </p>
            </div>
            <div className="rounded-lg border border-red-500/30 p-3 bg-red-500/5">
              <div className="font-semibold text-red-400 mb-1">HBF에 부적합</div>
              <p className="text-muted text-xs">
                AI 학습(Training) &mdash; 매 스텝마다 그래디언트 업데이트(쓰기) 발생. DRAM·HBM 필요.
              </p>
            </div>
          </div>
        </SubSection>
        <SubSection title="● 웨어레벨링으로 수명 연장">
          <p className="text-sm">
            베이스 로직 다이의 웨어레벨링이 쓰기 횟수를 전체 블록에 고르게 분산해
            실질 수명을 늘립니다. AI 추론처럼 읽기가 99%인 워크로드에서는 쓰기가 드물어
            10만 회 한도에 도달하는 데 매우 오랜 시간이 걸립니다.
          </p>
        </SubSection>
        <Insight>
          &ldquo;쓰기 ~10만 회 / 읽기 사실상 무제한&rdquo; &rarr; HBF는 <strong>읽기 중심 AI 추론</strong>에
          최적화된 메모리입니다. AI 프레임워크는 이 특성을 전제로 HBF를 &ldquo;읽기 전용 라이브러리&rdquo;로
          다뤄야 합니다.
        </Insight>
      </CalcBox>

      {/* ── 계층 활용 예시 ── */}
      <CalcBox title="■ 실제 활용 계층 예시">
        <p className="text-sm mb-3">
          KAIST TERALAB 로드맵(1-C)은 GPU 메모리 구성 예시로 다음을 제시합니다:
        </p>
        <div className="rounded-lg border border-sidebar-border bg-sidebar-bg p-4 text-sm">
          <p>
            GPU 앞 <strong className="text-blue-400">100 GB HBM</strong>(활성 캐시, 책꽂이) +{" "}
            <strong className="text-amber-400">1 TB HBF</strong>(모델 가중치·KV캐시 전체, 도서관)
          </p>
          <p className="text-muted text-xs mt-2">
            SK하이닉스 H3 아키텍처: HBM과 HBF를 GPU 옆 인터포저에 나란히 탑재.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mt-4 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="text-xs text-muted mb-1">① 접근 패턴</div>
            <p className="text-sm">자주 쓰는 레이어 &rarr; HBM 캐시로 이동. 나머지 &rarr; HBF 유지.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="text-xs text-muted mb-1">② 쓰기 시점</div>
            <p className="text-sm">모델 배포 시 HBF에 1회 쓰기. 추론 중 쓰기 없음.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="text-xs text-muted mb-1">③ 비용 효율</div>
            <p className="text-sm">HBF 단가 &lt; HBM &rarr; 대용량 구간은 HBF로 비용 절감.</p>
          </div>
        </div>
      </CalcBox>
    </div>
  );
}
