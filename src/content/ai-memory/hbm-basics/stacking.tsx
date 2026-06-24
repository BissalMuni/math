import { CalcBox, SubSection, Step, Insight } from "@/components/content/shared";

/** 적층 높이 진화 막대그래프 (세대별 Hi 수) */
function StackHeightChart() {
  const data = [
    { gen: "HBM4\n(2026)", hi: 16, maxHi: 16, color: "#3b82f6", hiLabel: "12/16-Hi" },
    { gen: "HBM5\n(2029)", hi: 16, maxHi: 16, color: "#8b5cf6", hiLabel: "16-Hi" },
    { gen: "HBM6\n(2032)", hi: 20, maxHi: 20, color: "#10b981", hiLabel: "16/20-Hi" },
    { gen: "HBM7\n(2035)", hi: 24, maxHi: 24, color: "#f59e0b", hiLabel: "20/24-Hi" },
    { gen: "HBM8\n(2038)", hi: 24, maxHi: 24, color: "#ef4444", hiLabel: "20/24-Hi" },
  ];
  const maxVal = 24;
  const barW = 50;
  const gap = 22;
  const chartH = 110;
  const baseY = 145;
  const totalW = data.length * (barW + gap) + gap;

  return (
    <svg width="100%" viewBox={`0 0 ${totalW} 185`} style={{ fontFamily: "sans-serif" }}>
      {/* 가로선 */}
      {[8, 12, 16, 20, 24].map((v) => {
        const y = baseY - (v / maxVal) * chartH;
        return (
          <g key={v}>
            <line x1={gap} x2={totalW - gap / 2} y1={y} y2={y} stroke="#334155" strokeWidth={0.7} strokeDasharray="3,3" />
            <text x={gap - 3} y={y + 3} textAnchor="end" fontSize={7} fill="#64748b">{v}</text>
          </g>
        );
      })}

      {/* 막대 */}
      {data.map((d, i) => {
        const x = gap + i * (barW + gap);
        const barH = (d.hi / maxVal) * chartH;
        const y = baseY - barH;
        // 두 줄 gen 라벨 처리
        const lines = d.gen.split("\n");
        return (
          <g key={d.gen}>
            <rect x={x} y={y} width={barW} height={barH} fill={d.color} opacity={0.85} rx={3} />
            <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize={8.5} fill={d.color} fontWeight={700}>
              {d.hiLabel}
            </text>
            <text x={x + barW / 2} y={baseY + 12} textAnchor="middle" fontSize={8} fill="#94a3b8">{lines[0]}</text>
            <text x={x + barW / 2} y={baseY + 22} textAnchor="middle" fontSize={8} fill="#94a3b8">{lines[1]}</text>
          </g>
        );
      })}

      {/* Y축 라벨 */}
      <text x={gap - 14} y={baseY - chartH / 2} textAnchor="middle" fontSize={8} fill="#64748b"
        transform={`rotate(-90, ${gap - 14}, ${baseY - chartH / 2})`}>
        적층 수 (Hi)
      </text>
      <text x={totalW / 2} y={178} textAnchor="middle" fontSize={9} fill="#64748b">
        HBM 세대별 Die Stack 높이 진화 (KAIST TERALAB 로드맵, page 29)
      </text>
    </svg>
  );
}

/** 본딩 방식 비교 SVG */
function BondingComparisonDiagram() {
  return (
    <div className="grid sm:grid-cols-2 gap-4 mt-3">
      {/* MR-MUF */}
      <div className="flex flex-col items-center gap-2">
        <svg width="100%" viewBox="0 0 200 160" style={{ maxWidth: 220, fontFamily: "sans-serif" }}>
          {/* 다이 3개 */}
          {[30, 65, 100].map((y) => (
            <rect key={y} x={30} y={y} width={140} height={28} fill="#bfdbfe" stroke="#3b82f6" strokeWidth={1} rx={2} />
          ))}
          {/* 마이크로범프 */}
          {[55, 75, 95, 115, 135, 155].map((cx) => (
            <g key={cx}>
              <ellipse cx={cx} cy={63} rx={4} ry={3} fill="#a78bfa" stroke="#7c3aed" strokeWidth={0.8} />
              <ellipse cx={cx} cy={98} rx={4} ry={3} fill="#a78bfa" stroke="#7c3aed" strokeWidth={0.8} />
            </g>
          ))}
          {/* 언더필 MUF 영역 */}
          <rect x={30} y={58} width={140} height={8} fill="#fde68a" opacity={0.6} />
          <rect x={30} y={93} width={140} height={8} fill="#fde68a" opacity={0.6} />
          <text x={100} y={145} textAnchor="middle" fontSize={8.5} fill="#94a3b8" fontWeight={700}>마이크로범프 + MR-MUF</text>
          <text x={100} y={156} textAnchor="middle" fontSize={7} fill="#94a3b8">(범프=보라, 언더필=황색)</text>
          <text x={100} y={20} textAnchor="middle" fontSize={8} fill="#3b82f6" fontWeight={700}>현재 주류 방식</text>
        </svg>
        <p className="text-xs text-muted text-center">
          마이크로범프로 다이를 연결하고 MUF(몰드 언더필)로 채운다. 대량 접합(Mass Reflow)으로 여러 다이를 한 번에 처리.
        </p>
      </div>
      {/* Cu-Cu Hybrid Bonding */}
      <div className="flex flex-col items-center gap-2">
        <svg width="100%" viewBox="0 0 200 160" style={{ maxWidth: 220, fontFamily: "sans-serif" }}>
          {/* 다이 3개 — 더 얇고 촘촘 */}
          {[35, 65, 95].map((y) => (
            <rect key={y} x={30} y={y} width={140} height={24} fill="#d1fae5" stroke="#10b981" strokeWidth={1} rx={2} />
          ))}
          {/* Cu-Cu 접합면 (직선 경계, 범프 없음) */}
          {[59, 89].map((y) => (
            <line key={y} x1={30} x2={170} y1={y} y2={y} stroke="#22c55e" strokeWidth={2} />
          ))}
          {/* Cu 패드 표현 */}
          {[50, 70, 90, 110, 130, 150].map((cx) => (
            <g key={cx}>
              <rect x={cx - 4} y={56} width={8} height={6} fill="#22c55e" rx={1} />
              <rect x={cx - 4} y={86} width={8} height={6} fill="#22c55e" rx={1} />
            </g>
          ))}
          <text x={100} y={140} textAnchor="middle" fontSize={8.5} fill="#94a3b8" fontWeight={700}>범프리스 Cu-Cu 하이브리드 본딩</text>
          <text x={100} y={151} textAnchor="middle" fontSize={7} fill="#94a3b8">(접합면=녹색, 범프 없음)</text>
          <text x={100} y={22} textAnchor="middle" fontSize={8} fill="#10b981" fontWeight={700}>차세대 방식</text>
        </svg>
        <p className="text-xs text-muted text-center">
          범프 없이 구리 패드끼리 직접 접합. 다이 간 간격을 최소화해 더 얇고 많이 쌓을 수 있다.
        </p>
      </div>
    </div>
  );
}

export default function Stacking() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        여러 DRAM 다이를 쌓아 하나의 HBM 스택으로 만드는 &ldquo;적층 패키징&rdquo;은
        TSV와 함께 HBM의 핵심 공정입니다. 어떻게 쌓는지(본딩 방식)와 얼마나 높이 쌓는지(Hi 수)는
        용량·대역폭·발열을 결정하며, 세대마다 진화하고 있습니다.
      </p>

      {/* ── 적층 높이 진화 ── */}
      <CalcBox title="■ 적층 높이(Hi)의 세대별 진화">
        <p className="text-sm mb-4">
          &ldquo;12-Hi&rdquo;는 베이스 다이 1장 + DRAM 다이 12장, 총 13장을 쌓은 스택을 뜻합니다.
          KAIST TERALAB 로드맵(PDF page 29)에 따르면, HBM 세대가 올라갈수록 Die Stack 수가
          증가해 용량과 대역폭을 확장합니다.
        </p>
        <StackHeightChart />
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-sidebar-border">
                <th className="text-left py-2 pr-3 font-semibold text-muted">세대</th>
                <th className="text-left py-2 pr-3 font-semibold text-muted">Die Stack</th>
                <th className="text-left py-2 pr-3 font-semibold text-muted">용량/HBM</th>
                <th className="text-left py-2 font-semibold text-muted">대역폭/스택</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              {[
                { gen: "HBM4 (2026)", stack: "12/16-Hi", cap: "36/48 GB", bw: "2.0 TB/s" },
                { gen: "HBM5 (2029)", stack: "16-Hi", cap: "80 GB", bw: "4 TB/s" },
                { gen: "HBM6 (2032)", stack: "16/20-Hi", cap: "96/120 GB", bw: "8 TB/s" },
                { gen: "HBM7 (2035)", stack: "20/24-Hi", cap: "160/192 GB", bw: "24 TB/s" },
                { gen: "HBM8 (2038)", stack: "20/24-Hi", cap: "200/240 GB", bw: "64 TB/s" },
              ].map((r) => (
                <tr key={r.gen}>
                  <td className="py-2 pr-3 font-medium">{r.gen}</td>
                  <td className="py-2 pr-3 text-orange-400 font-semibold">{r.stack}</td>
                  <td className="py-2 pr-3 text-blue-400">{r.cap}</td>
                  <td className="py-2 text-purple-400">{r.bw}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted mt-2">출처: KAIST TERALAB HBM Roadmap ver 1.7, PDF page 29</p>
      </CalcBox>

      {/* ── 다이 본딩 방식 ── */}
      <CalcBox title="■ 다이 본딩 방식 — MR-MUF에서 Cu-Cu로">
        <p className="text-sm mb-4">
          다이와 다이를 어떻게 붙이느냐에 따라 스택 두께, I/O 밀도, 열·신호 특성이 달라집니다.
          KAIST TERALAB 로드맵은 본딩 방식의 전환을
          <strong> Microbump(MR-MUF) &rarr; Bump-less Cu-Cu Direct bonding</strong>으로 명시합니다.
        </p>
        <BondingComparisonDiagram />

        <SubSection title="● MR-MUF (Mass Reflow — Molded Underfill)">
          <p className="text-sm mb-2">
            현재 SK하이닉스 HBM의 주력 공정. 주요 특징은 다음과 같습니다.
          </p>
          <div className="space-y-2 text-sm">
            <div>
              <Step n={1} label="다이 적재" />
              <p className="text-muted mt-1">베이스 다이 위에 DRAM 다이를 마이크로범프로 정렬해 차례로 올린다.</p>
            </div>
            <div>
              <Step n={2} label="Mass Reflow (대량 리플로우)" />
              <p className="text-muted mt-1">오븐에서 모든 다이를 한 번에 가열해 범프를 동시에 접합한다. 공정 수를 줄여 생산성을 높인다.</p>
            </div>
            <div>
              <Step n={3} label="MUF (몰드 언더필) 충전" />
              <p className="text-muted mt-1">다이 사이 공간에 에폭시 계열 몰드를 주입·경화. 기계적 보강 + 방열 경로 역할을 동시에 한다.</p>
            </div>
          </div>
          <p className="text-sm text-muted mt-3">
            MR-MUF의 핵심 장점: 배치 처리로 생산성이 높고, 언더필이 방열을 도와 신뢰성이 좋다.
            단점: 마이크로범프의 높이(∼20 µm)만큼 다이 간 간격이 생겨 스택 높이가 커진다.
          </p>
        </SubSection>

        <SubSection title="● TC-NCF (열압착 + 비전도성 필름)">
          <p className="text-sm">
            마이크로범프 본딩 후 NFC(비전도성 접착 필름)를 먼저 라미네이션하고, 열과 압력으로 한 장씩 접합하는 방식입니다.
            다이 당 개별 처리라 정밀도는 높지만 생산성이 MR-MUF보다 낮습니다.
            삼성이 일부 제품에 활용하며, HBM3E 세대까지 병행 사용됩니다.
          </p>
        </SubSection>

        <SubSection title="● 범프리스 Cu-Cu 하이브리드 본딩 (차세대)">
          <p className="text-sm mb-2">
            마이크로범프를 아예 없애고 다이 표면의 구리 패드끼리 직접 접합하는 방식입니다.
            &ldquo;하이브리드&rdquo;란 구리 패드(전기 접합)와 산화물 표면(기계 접합)을 동시에 붙이기 때문입니다.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-blue-400 mb-1">① 더 얇은 스택</div>
              <p className="text-muted">범프 두께(∼20 µm)가 사라져 같은 높이에 더 많은 다이를 넣을 수 있다.</p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-purple-400 mb-1">② 고밀도 I/O</div>
              <p className="text-muted">범프 피치 한계(∼40 µm)를 넘어 구리 패드 피치를 수 µm로 줄여 I/O 수를 폭발적으로 늘릴 수 있다.</p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-amber-400 mb-1">③ 전기·열 특성 개선</div>
              <p className="text-muted">구리-구리 직접 접합으로 저항이 낮아지고, 범프-언더필 계면이 없어져 열 전도가 더 균일해진다.</p>
            </div>
          </div>
          <Insight>
            KAIST TERALAB 로드맵 기준으로 적층 수가 HBM4의 12/16-Hi에서 HBM7·HBM8의
            20/24-Hi로 늘어남에 따라 Cu-Cu 하이브리드 본딩으로의 전환이 <strong>필수</strong>가 됩니다.
          </Insight>
        </SubSection>
      </CalcBox>

      {/* ── 웨이퍼 박막화 ── */}
      <CalcBox title="■ 웨이퍼 박막화와 적층 공정 과제">
        <p className="text-sm mb-4">
          DRAM 다이는 TSV(관통 비아)가 뒷면으로 드러나도록 뒷면을 연마해 ∼50 µm 두께로 얇게 만든 뒤 쌓습니다.
          이 박막화 과정과 적층 공정은 여러 기술적 과제를 낳습니다.
        </p>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold text-blue-400 mb-1">휨(Warpage)</div>
            <p className="text-muted">
              다이가 얇을수록 열·잔류 응력으로 휘기 쉽습니다. 휨이 크면 마이크로범프 정렬이 어긋나
              접합 불량이 납니다. 두꺼운 기판이나 지지 웨이퍼(Carrier)로 임시 보강합니다.
            </p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold text-purple-400 mb-1">발열 집중</div>
            <p className="text-muted">
              다이를 많이 쌓을수록 가운데 다이의 열이 빠져나가기 어렵습니다. 로드맵은
              D2C(Direct-to-Chip) 액침 &rarr; 임베디드 냉각 순으로 냉각 방식이 고도화된다고 봅니다.
            </p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold text-amber-400 mb-1">수율·KGD</div>
            <p className="text-muted">
              불량 다이 하나가 포함된 스택 전체가 폐기되므로, 적층 전 양품 다이만 선별하는
              KGD(Known-Good-Die) 테스트가 중요합니다.
              적층 수가 늘수록 스택 수율 = (다이 수율)<sup>n</sup> 으로 급감합니다.
            </p>
          </div>
        </div>
        <Insight>
          다이를 높이 쌓을수록 용량·대역폭이 늘지만 발열·휨·수율 문제도 함께 커집니다.
          이를 극복하기 위해 Cu-Cu 하이브리드 본딩, 정밀 박막화, 고효율 냉각이 동시에 진화해야 합니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
