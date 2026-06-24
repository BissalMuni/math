import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 2.5D 단면도: 기판 → C4 범프 → 인터포저 → 마이크로범프 → GPU/HBM */
function InterposerCrossSectionDiagram() {
  const hbmDies = [
    { x: 30, label: "HBM\n스택" },
    { x: 120, label: "HBM\n스택" },
  ];
  return (
    <svg
      width="100%"
      viewBox="0 0 440 230"
      style={{ fontFamily: "sans-serif", maxWidth: 520 }}
    >
      {/* ── 1) 유기 기판 (패키지 기판) ── */}
      <rect x={10} y={188} width={420} height={30} fill="#fde68a" stroke="#d97706" strokeWidth={1.2} rx={3} />
      <text x={220} y={208} textAnchor="middle" fontSize={10} fill="#92400e" fontWeight={700}>유기 기판 (Package Substrate)</text>

      {/* ── 2) C4 범프 (인터포저 ↔ 기판) ── */}
      {[60, 100, 180, 220, 260, 300, 360, 390].map((cx) => (
        <ellipse key={cx} cx={cx} cy={185} rx={5} ry={4} fill="#f59e0b" stroke="#b45309" strokeWidth={1} />
      ))}
      <text x={420} y={186} fontSize={8} fill="#b45309" textAnchor="end">C4 범프</text>

      {/* ── 3) 실리콘 인터포저 ── */}
      <rect x={10} y={148} width={420} height={35} fill="#c7d2fe" stroke="#6366f1" strokeWidth={1.5} rx={3} />
      <text x={220} y={160} textAnchor="middle" fontSize={10} fill="#3730a3" fontWeight={700}>실리콘 인터포저 (Silicon Interposer)</text>
      <text x={220} y={175} textAnchor="middle" fontSize={8.5} fill="#4338ca">RDL 미세 배선 + TSV (인터포저 관통)</text>

      {/* ── 인터포저 TSV ── */}
      {[70, 130, 220, 300, 370].map((cx) => (
        <line key={cx} x1={cx} y1={148} x2={cx} y2={183} stroke="#22c55e" strokeWidth={2} />
      ))}

      {/* ── 4) 마이크로범프 (칩 ↔ 인터포저) ── */}
      {[55, 75, 90, 110, 160, 180, 240, 265, 290, 315, 340, 365].map((cx) => (
        <ellipse key={cx} cx={cx} cy={146} rx={4} ry={3} fill="#a78bfa" stroke="#7c3aed" strokeWidth={0.8} />
      ))}
      <text x={420} y={145} fontSize={8} fill="#7c3aed" textAnchor="end">μbump</text>

      {/* ── 5) GPU 다이 ── */}
      <rect x={160} y={100} width={120} height={44} fill="#bfdbfe" stroke="#3b82f6" strokeWidth={1.5} rx={3} />
      <text x={220} y={120} textAnchor="middle" fontSize={10} fill="#1d4ed8" fontWeight={700}>GPU 다이</text>
      <text x={220} y={135} textAnchor="middle" fontSize={8} fill="#3b82f6">(로직 칩)</text>

      {/* ── 6) HBM 스택들 ── */}
      {hbmDies.map((d) => (
        <g key={d.x}>
          {/* 4 다이 레이어 */}
          {[110, 120, 130, 140].map((y) => (
            <rect key={y} x={d.x + 10} y={y} width={70} height={8} fill="#d1fae5" stroke="#10b981" strokeWidth={0.8} rx={1} />
          ))}
          {/* 베이스 다이 */}
          <rect x={d.x + 10} y={100} width={70} height={8} fill="#6ee7b7" stroke="#059669" strokeWidth={1} rx={1} />
          <text x={d.x + 45} y={97} textAnchor="middle" fontSize={8} fill="#065f46" fontWeight={700}>
            HBM 스택
          </text>
          <text x={d.x + 45} y={152} textAnchor="middle" fontSize={7} fill="#059669">
            베이스 다이
          </text>
        </g>
      ))}

      {/* ── 범례 ── */}
      <rect x={12} y={12} width={8} height={8} fill="#c7d2fe" stroke="#6366f1" strokeWidth={1} rx={1} />
      <text x={24} y={20} fontSize={8} fill="#94a3b8">인터포저</text>
      <rect x={70} y={12} width={8} height={8} fill="#bfdbfe" stroke="#3b82f6" strokeWidth={1} rx={1} />
      <text x={82} y={20} fontSize={8} fill="#94a3b8">GPU</text>
      <rect x={110} y={12} width={8} height={8} fill="#d1fae5" stroke="#10b981" strokeWidth={1} rx={1} />
      <text x={122} y={20} fontSize={8} fill="#94a3b8">HBM 스택</text>
      <line x1={170} y1={16} x2={178} y2={16} stroke="#22c55e" strokeWidth={2} />
      <text x={182} y={20} fontSize={8} fill="#94a3b8">TSV</text>
      <ellipse cx={216} cy={16} rx={4} ry={3} fill="#a78bfa" stroke="#7c3aed" strokeWidth={0.8} />
      <text x={224} y={20} fontSize={8} fill="#94a3b8">μbump</text>
      <ellipse cx={256} cy={16} rx={4} ry={3} fill="#f59e0b" stroke="#b45309" strokeWidth={0.8} />
      <text x={264} y={20} fontSize={8} fill="#94a3b8">C4 범프</text>
    </svg>
  );
}

/** 2.5D vs 3D 비교 다이어그램 */
function TwoAndHalfVsThreeDDiagram() {
  return (
    <div className="grid sm:grid-cols-2 gap-4 mt-3">
      {/* 2.5D */}
      <div className="flex flex-col items-center gap-2">
        <svg width="100%" viewBox="0 0 200 140" style={{ maxWidth: 200, fontFamily: "sans-serif" }}>
          {/* 인터포저 */}
          <rect x={10} y={90} width={180} height={20} fill="#c7d2fe" stroke="#6366f1" strokeWidth={1} rx={2} />
          <text x={100} y={104} textAnchor="middle" fontSize={8} fill="#3730a3" fontWeight={700}>실리콘 인터포저</text>
          {/* GPU */}
          <rect x={70} y={58} width={60} height={30} fill="#bfdbfe" stroke="#3b82f6" strokeWidth={1} rx={2} />
          <text x={100} y={77} textAnchor="middle" fontSize={8} fill="#1d4ed8">GPU</text>
          {/* HBM 좌 */}
          <rect x={15} y={58} width={45} height={30} fill="#d1fae5" stroke="#10b981" strokeWidth={1} rx={2} />
          <text x={37} y={77} textAnchor="middle" fontSize={7} fill="#065f46">HBM</text>
          {/* HBM 우 */}
          <rect x={140} y={58} width={45} height={30} fill="#d1fae5" stroke="#10b981" strokeWidth={1} rx={2} />
          <text x={162} y={77} textAnchor="middle" fontSize={7} fill="#065f46">HBM</text>
          {/* 라벨 */}
          <text x={100} y={130} textAnchor="middle" fontSize={9} fill="#94a3b8" fontWeight={700}>2.5D — 나란히 배치</text>
          <text x={100} y={18} textAnchor="middle" fontSize={8} fill="#94a3b8">(같은 평면, 인터포저로 연결)</text>
        </svg>
        <p className="text-xs text-muted text-center">GPU와 HBM이 인터포저 위에서 나란히. 제조가 상대적으로 쉽고 현재 주류.</p>
      </div>
      {/* 3D */}
      <div className="flex flex-col items-center gap-2">
        <svg width="100%" viewBox="0 0 200 140" style={{ maxWidth: 200, fontFamily: "sans-serif" }}>
          {/* 기판 */}
          <rect x={55} y={110} width={90} height={15} fill="#fde68a" stroke="#d97706" strokeWidth={1} rx={2} />
          <text x={100} y={121} textAnchor="middle" fontSize={7} fill="#92400e">기판</text>
          {/* 로직 다이 */}
          <rect x={55} y={82} width={90} height={25} fill="#bfdbfe" stroke="#3b82f6" strokeWidth={1} rx={2} />
          <text x={100} y={98} textAnchor="middle" fontSize={8} fill="#1d4ed8">로직/GPU 다이</text>
          {/* DRAM 스택 위에 */}
          <rect x={55} y={54} width={90} height={25} fill="#d1fae5" stroke="#10b981" strokeWidth={1} rx={2} />
          <text x={100} y={70} textAnchor="middle" fontSize={8} fill="#065f46">DRAM 다이 (위에 적층)</text>
          {/* TSV 연결 */}
          {[80, 100, 120].map((cx) => (
            <line key={cx} x1={cx} y1={79} x2={cx} y2={107} stroke="#22c55e" strokeWidth={1.5} />
          ))}
          <text x={100} y={130} textAnchor="middle" fontSize={9} fill="#94a3b8" fontWeight={700}>3D — 위에 직접 적층</text>
          <text x={100} y={18} textAnchor="middle" fontSize={8} fill="#94a3b8">(다이 위에 다이, TSV 수직 연결)</text>
          <text x={100} y={28} textAnchor="middle" fontSize={7} fill="#94a3b8">더 짧은 거리 / 더 높은 난도</text>
        </svg>
        <p className="text-xs text-muted text-center">로직 다이 위에 DRAM을 직접 쌓는 3D. 거리가 더 짧지만 발열·제조 난도가 크다.</p>
      </div>
    </div>
  );
}

export default function Interposer() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        HBM 스택과 GPU를 &ldquo;한 판 위에&rdquo; 나란히 올려 수만 개의 신호를 잇는 실리콘 인터포저는
        2.5D 패키징의 핵심입니다. 유기 기판으로는 불가능한 미세 배선 밀도를 가능케 해, 현세대
        AI 가속기(A100·H100·B200 등)를 지탱하는 플랫폼입니다.
      </p>

      {/* ── 인터포저란 ── */}
      <CalcBox title="■ 실리콘 인터포저란 무엇인가">
        <p className="text-sm mb-4">
          실리콘 인터포저(Silicon Interposer)는 HBM 스택들과 GPU 다이를 <strong>같은 실리콘 판 위에 나란히 탑재</strong>하고,
          재배선층(RDL, Redistribution Layer)과 마이크로범프로 수천~수만 개의 신호를 연결하는
          <strong> 패시브(passive) 실리콘 기판</strong>입니다.
        </p>
        <p className="text-sm mb-4">
          인터포저 자체도 TSV(Through-Silicon Via)를 품어, 위(칩)의 신호를 아래 유기 기판(패키지 기판)으로
          C4(Controlled Collapse Chip Connection) 범프를 통해 전달합니다. 즉 신호 경로는
          <strong> 칩 &rarr; 마이크로범프 &rarr; 인터포저 RDL &rarr; 인터포저 TSV &rarr; C4 범프 &rarr; 유기 기판</strong>
          순으로 흐릅니다.
        </p>
        <InterposerCrossSectionDiagram />
        <p className="text-xs text-muted mt-2 text-center">
          단면도: 유기 기판(황색) &rarr; C4 범프(황금) &rarr; 실리콘 인터포저(보라) &rarr; 마이크로범프(보라 타원) &rarr; GPU(청색)·HBM 스택(녹색)
        </p>
      </CalcBox>

      {/* ── 왜 실리콘인가 ── */}
      <CalcBox title="■ 왜 유기 기판 대신 실리콘인가">
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-blue-400 mb-1">유기 기판 (Organic Substrate)</div>
            <p className="text-muted">
              PCB 계열 에폭시 소재. 열팽창계수(CTE)가 크고 배선 최소 피치가 수십~수백 µm 수준으로
              고밀도 배선이 어렵다. 비용은 저렴하지만 HBM 수준의 핀 밀도를 지탱하기 어렵다.
            </p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold text-purple-400 mb-1">실리콘 인터포저</div>
            <p className="text-muted">
              반도체 웨이퍼와 동일 소재라 열팽창계수가 칩과 가깝고, 포토리소그래피로
              서브마이크로미터 배선(RDL 피치 &lt; 2 µm)을 구현할 수 있다. GPU와 HBM
              사이 수만 개의 연결을 짧게 유지한다.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-sidebar-border">
                <th className="text-left py-2 pr-4 font-semibold text-muted">항목</th>
                <th className="text-left py-2 pr-4 font-semibold text-muted">유기 기판</th>
                <th className="text-left py-2 font-semibold text-muted">실리콘 인터포저</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              {[
                ["배선 최소 피치", "∼수십 µm", "< 2 µm (RDL)"],
                ["열팽창계수 (CTE)", "∼15–20 ppm/°C", "∼3 ppm/°C (Si와 동일)"],
                ["I/O 밀도", "낮음", "매우 높음 (수만 µbump 지원)"],
                ["제조 공정", "PCB 라인", "반도체 팹 (포토리소그래피)"],
                ["비용", "저렴", "고가"],
              ].map(([item, org, si]) => (
                <tr key={item}>
                  <td className="py-2 pr-4 font-medium">{item}</td>
                  <td className="py-2 pr-4 text-muted">{org}</td>
                  <td className="py-2 text-orange-400 font-semibold">{si}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CalcBox>

      {/* ── 2.5D vs 3D ── */}
      <CalcBox title="■ 2.5D 패키징 vs 3D 패키징">
        <p className="text-sm mb-2">
          &ldquo;2.5D&rdquo;는 칩들이 <strong>같은 평면의 인터포저 위에</strong> 나란히 올라가는 방식입니다.
          완전한 3D(칩 위에 칩)와 달리 각 칩을 따로 테스트(KGD, Known-Good-Die)한 뒤 조립할 수 있어
          수율 관리가 쉽습니다. TSMC의 <strong>CoWoS</strong>(Chip-on-Wafer-on-Substrate)가
          대표적인 상용 2.5D 패키지 기술입니다.
        </p>
        <TwoAndHalfVsThreeDDiagram />
        <Insight>
          현세대 AI 가속기(H100·B200·MI300X 등)는 대부분 2.5D 실리콘 인터포저 방식을 씁니다.
          3D(로직 위에 DRAM 직접 적층)는 발열·제조 난도가 크지만, KAIST TERALAB 로드맵은
          HBM8(2038) 세대에서 <strong>Full-3D HBM-Centric Computing</strong>으로 진화를 예측합니다.
        </Insight>
      </CalcBox>

      {/* ── 한계와 진화 ── */}
      <CalcBox title="■ 인터포저의 한계와 진화 방향">
        <SubSection title="● 현재의 한계">
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-sidebar-border p-3">
              <div className="font-semibold text-amber-400 mb-1">① 레티클 크기 제한</div>
              <p className="text-muted">
                실리콘 인터포저는 단일 노광 레티클로 제조하므로 크기 상한이 있습니다(∼858 mm²).
                GPU + HBM 여러 개를 덮으려면 &ldquo;브리지&rdquo; 타일링이나 포토마스크 이음 기법이 필요합니다.
              </p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3">
              <div className="font-semibold text-blue-400 mb-1">② 비용</div>
              <p className="text-muted">
                반도체 팹에서 포토리소그래피로 만드는 만큼 원가가 높습니다. GPU + 인터포저 + HBM 합산 패키지
                비용의 상당 부분을 인터포저가 차지합니다.
              </p>
            </div>
          </div>
        </SubSection>

        <SubSection title="● KAIST TERALAB 로드맵의 진화 경로">
          <p className="text-sm mb-3">
            KAIST TERALAB의 HBM 로드맵(ver 1.7)은 아키텍처 진화를 다음과 같이 정의합니다.
          </p>
          <div className="space-y-2 text-sm">
            {[
              { gen: "HBM4~5 (2026–2029)", label: "Custom HBM Base Die", color: "text-blue-400", desc: "베이스 다이 커스텀화, NMC(Near-Memory Computing) 프로세서 내장 시작" },
              { gen: "HBM6~7 (2032–2035)", label: "Active / Hybrid Interposer", color: "text-purple-400", desc: "인터포저에 능동 소자(Active) 또는 이종 소재를 결합한 하이브리드 인터포저 도입" },
              { gen: "HBM8 (2038)", label: "HBM-Centric Interposer", color: "text-orange-400", desc: "컴퓨팅 자체를 HBM 중심으로 재편. Double-side Cooling, Edge-expand Stack 포함" },
            ].map((r) => (
              <div key={r.gen} className="flex gap-3 rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className={`font-semibold ${r.color}`}>{r.label}</span>
                    <span className="text-xs text-muted">{r.gen}</span>
                  </div>
                  <p className="text-muted mt-0.5">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Insight>
            &ldquo;패시브 실리콘 기판&rdquo;이었던 인터포저가 능동 로직과 메모리를 품는
            &ldquo;HBM-Centric Interposer&rdquo;로 진화합니다. 이는 메모리를 중심에 두는
            <strong> 메모리-중심 컴퓨팅</strong> 패러다임 전환의 물리적 구현입니다.
          </Insight>
        </SubSection>
      </CalcBox>
    </div>
  );
}
