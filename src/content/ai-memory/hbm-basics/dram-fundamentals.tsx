import { CalcBox, SubSection, Step, Insight } from "@/components/content/shared";
import { InlineMath, BlockMath } from "@/components/math/math-formula";

const DDR_GENERATIONS = [
  { gen: "SDR",  rate: 166,  prefetch: "1n",  year: "1997", color: "#6b7280" },
  { gen: "DDR",  rate: 400,  prefetch: "2n",  year: "2000", color: "#6b7280" },
  { gen: "DDR2", rate: 1066, prefetch: "4n",  year: "2003", color: "#3b82f6" },
  { gen: "DDR3", rate: 2133, prefetch: "8n",  year: "2007", color: "#3b82f6" },
  { gen: "DDR4", rate: 3200, prefetch: "8n",  year: "2014", color: "#f59e0b" },
  { gen: "DDR5", rate: 8400, prefetch: "16n", year: "2020", color: "#ef4444" },
];

const MAX_RATE = 8400;

/** 1T1C DRAM 셀 회로 모식도 */
function DramCellDiagram() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="100%" viewBox="0 0 360 260" style={{ maxWidth: 360, fontFamily: "sans-serif" }}>
        {/* 비트라인 (세로) */}
        <line x1={120} y1={20} x2={120} y2={240} stroke="#ef4444" strokeWidth={2} />
        <text x={120} y={14} textAnchor="middle" fontSize={11} fill="#ef4444" fontWeight={600}>
          비트라인 (Bit Line)
        </text>

        {/* 워드라인 (가로) */}
        <line x1={40} y1={110} x2={300} y2={110} stroke="#3b82f6" strokeWidth={2} />
        <text x={300} y={104} textAnchor="end" fontSize={11} fill="#3b82f6" fontWeight={600}>
          워드라인 (Word Line)
        </text>

        {/* 트랜지스터 (게이트=워드라인, 채널=비트라인↔커패시터) */}
        <rect x={150} y={96} width={28} height={28} fill="none" stroke="#94a3b8" strokeWidth={1.5} rx={3} />
        <line x1={120} y1={110} x2={150} y2={110} stroke="#94a3b8" strokeWidth={2} />
        <line x1={178} y1={110} x2={210} y2={110} stroke="#94a3b8" strokeWidth={2} />
        <text x={164} y={142} textAnchor="middle" fontSize={10} fill="#94a3b8">접근 트랜지스터</text>

        {/* 커패시터 */}
        <line x1={210} y1={110} x2={210} y2={150} stroke="#22c55e" strokeWidth={2} />
        <line x1={192} y1={150} x2={228} y2={150} stroke="#22c55e" strokeWidth={2.5} />
        <line x1={192} y1={160} x2={228} y2={160} stroke="#22c55e" strokeWidth={2.5} />
        <line x1={210} y1={160} x2={210} y2={195} stroke="#22c55e" strokeWidth={2} />
        {/* 접지 */}
        <line x1={196} y1={195} x2={224} y2={195} stroke="#64748b" strokeWidth={2} />
        <line x1={201} y1={200} x2={219} y2={200} stroke="#64748b" strokeWidth={2} />
        <line x1={206} y1={205} x2={214} y2={205} stroke="#64748b" strokeWidth={2} />
        <text x={246} y={158} textAnchor="start" fontSize={11} fill="#22c55e" fontWeight={600}>
          커패시터
        </text>
        <text x={246} y={172} textAnchor="start" fontSize={9} fill="#64748b">
          전하 = 1비트
        </text>
      </svg>
      <p className="text-xs text-muted text-center">
        DRAM 셀 = 트랜지스터 1개 + 커패시터 1개(1T1C). 워드라인이 트랜지스터를 열면 커패시터의 전하가 비트라인으로 흐른다.
      </p>
    </div>
  );
}

/** DDR 세대별 전송률 막대그래프 */
function DdrRateChart() {
  return (
    <svg width="100%" viewBox="0 0 520 230" style={{ fontFamily: "sans-serif" }}>
      {DDR_GENERATIONS.map((d, i) => {
        const barW = (d.rate / MAX_RATE) * 320;
        const y = 14 + i * 34;
        return (
          <g key={d.gen}>
            <text x={84} y={y + 14} textAnchor="end" fontSize={11} fill="#94a3b8" fontWeight={600}>
              {d.gen}
            </text>
            <rect x={90} y={y} width={barW} height={22} fill={d.color} rx={3} opacity={0.85} />
            <text x={90 + barW + 6} y={y + 14} fontSize={11} fill="#e2e8f0" fontWeight={600}>
              {d.rate} MT/s
            </text>
            <text x={514} y={y + 14} textAnchor="end" fontSize={10} fill="#64748b">
              프리페치 {d.prefetch} · {d.year}
            </text>
          </g>
        );
      })}
      <line x1={90} y1={6} x2={90} y2={218} stroke="#334155" strokeWidth={1} />
      <text x={250} y={224} textAnchor="middle" fontSize={10} fill="#64748b">
        세대별 최대 데이터 전송률 (MT/s, 핀당) — 코어 클럭은 거의 그대로, 프리페치로 대역폭 확장
      </text>
    </svg>
  );
}

export default function DramFundamentals() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        HBM은 DRAM 다이를 수직으로 쌓은 메모리입니다. 따라서 HBM을 이해하려면 먼저 그 &ldquo;코어&rdquo;인 DRAM의
        셀 구조·동작 원리·세대 진화를 알아야 합니다. 이 단원은 DRAM의 기본기를 정리합니다.
      </p>

      {/* ── 1T1C 셀 ── */}
      <CalcBox title="■ DRAM 셀: 1T1C 구조">
        <p className="text-sm mb-4">
          DRAM(Dynamic RAM)의 한 비트는 <strong>트랜지스터 1개 + 커패시터 1개</strong>(1T1C)로 저장됩니다.
          커패시터에 전하가 차 있으면 1, 비어 있으면 0입니다. 구조가 단순해 셀 하나가 매우 작고, 그래서
          같은 면적에 가장 높은 집적도를 얻을 수 있습니다.
        </p>
        <DramCellDiagram />
        <div className="grid sm:grid-cols-2 gap-3 mt-4 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold mb-1">① 접근 트랜지스터</div>
            <p className="text-muted">게이트가 워드라인에 연결. 워드라인을 켜면 커패시터와 비트라인이 연결된다.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold mb-1">② 저장 커패시터</div>
            <p className="text-muted">전하를 담는 그릇(수십 fF). 용량이 작아 누설로 전하가 새어나간다.</p>
          </div>
        </div>
        <Insight>
          SRAM은 트랜지스터 6개(6T)로 한 비트를 &ldquo;정적&rdquo;으로 유지하지만, DRAM은 1T1C로 훨씬 작은 대신
          전하가 새므로 주기적 갱신(리프레시)이 필요합니다. 이름의 &ldquo;Dynamic&rdquo;이 여기서 옵니다.
        </Insight>
      </CalcBox>

      {/* ── 읽기/쓰기 ── */}
      <CalcBox title="■ 읽기와 파괴적 읽기(Destructive Read)">
        <SubSection title="● 감지 증폭기로 미세 전압을 판독">
          <p className="text-sm mb-3">
            비트라인을 먼저 <InlineMath math="V_{DD}/2" /> 로 프리차지해 둡니다. 워드라인을 켜면 커패시터의 전하가
            비트라인으로 흘러 전압이 아주 조금 오르거나(1) 내립니다(0). 이 미세한 차이를
            <strong> 감지 증폭기(Sense Amplifier)</strong>가 기준 전압과 비교해 0/1로 증폭합니다.
          </p>
        </SubSection>
        <SubSection title="● 읽으면 지워진다 → 되쓰기(Write-back)">
          <p className="text-sm mb-3">
            읽기 과정에서 커패시터의 전하가 비트라인으로 빠져나가므로 <strong>원래 값이 파괴</strong>됩니다.
            그래서 감지 증폭기가 증폭한 값을 같은 셀에 곧바로 다시 써넣습니다. 이 되쓰기까지가 한 번의 읽기입니다.
          </p>
          <p className="text-sm text-muted">
            ① 프리차지: 비트라인을 <InlineMath math="V_{DD}/2" /> 로 맞춤<br />
            ② 활성화(ACT): 워드라인 ON → 전하 공유 → 감지 증폭<br />
            ③ 되쓰기 + 프리차지(PRE): 행을 닫고 다음 접근 준비
          </p>
        </SubSection>
      </CalcBox>

      {/* ── 리프레시 ── */}
      <CalcBox title="■ 리프레시 — 잊지 않기 위한 주기적 갱신">
        <p className="text-sm mb-3">
          커패시터의 전하는 누설로 시간이 지나면 사라집니다. 데이터가 유지되는 시간을
          <strong> 리텐션(retention)</strong>이라 하며, JEDEC 표준은 보통 <strong>64 ms</strong> 안에
          모든 행을 한 번씩 다시 읽고 써서(=리프레시) 전하를 채워 넣도록 규정합니다.
        </p>
        <p className="text-sm mb-3">
          한 칩에 행이 <InlineMath math="8192" /> 개라면, 평균 리프레시 간격
          <InlineMath math="t_{REFI}" /> 는 다음과 같습니다.
        </p>
        <BlockMath math="t_{REFI} = \frac{64\,\text{ms}}{8192\ \text{rows}} \approx 7.8\,\mu s" />
        <p className="text-sm text-muted mt-3">
          고온에서는 누설이 빨라져 리프레시 주기를 절반(32 ms)으로 당깁니다. 리프레시 동안 해당 뱅크는
          접근이 막히므로, 용량이 커질수록 리프레시 오버헤드가 성능·전력의 부담이 됩니다.
        </p>
        <Insight>
          리프레시는 DRAM의 숙명적 비용입니다. HBM처럼 다이를 많이 쌓아 용량을 키울수록 리프레시 관리와
          발열이 중요해지며, 이는 뒤 단원의 냉각·베이스 다이 설계로 이어집니다.
        </Insight>
      </CalcBox>

      {/* ── 주소 구조 ── */}
      <CalcBox title="■ 주소 구조: 뱅크 · 행 · 열">
        <p className="text-sm mb-4">
          DRAM은 <strong>뱅크(bank) → 행(row) → 열(column)</strong> 의 2차원 배열로 구성됩니다.
          접근은 항상 &ldquo;행을 먼저 열고(Activate), 그 안에서 열을 고르는(Read/Write)&rdquo; 순서입니다.
        </p>
        <div className="space-y-3">
          <div>
            <Step n={1} label="행 활성화 (RAS / ACT)" />
            <p className="text-sm text-muted mt-1">
              행 주소를 보내 한 행 전체를 감지 증폭기 묶음(=행 버퍼, row buffer)으로 읽어 올린다.
            </p>
          </div>
          <div>
            <Step n={2} label="열 선택 (CAS / RD·WR)" />
            <p className="text-sm text-muted mt-1">
              열린 행 버퍼 안에서 원하는 열만 골라 읽거나 쓴다. 같은 행 내 연속 접근은 매우 빠르다(행 히트).
            </p>
          </div>
          <div>
            <Step n={3} label="프리차지 (PRE)" />
            <p className="text-sm text-muted mt-1">
              행을 닫고 비트라인을 다시 <InlineMath math="V_{DD}/2" /> 로 충전해 다음 행 접근을 준비한다.
            </p>
          </div>
        </div>
        <Insight>
          &ldquo;같은 행이면 빠르고, 행을 바꾸면 느리다&rdquo;는 DRAM의 핵심 성질입니다. 메모리 컨트롤러는
          접근 순서를 재배열해 행 히트를 최대화합니다.
        </Insight>
      </CalcBox>

      {/* ── 세대 진화 ── */}
      <CalcBox title="■ SDRAM에서 DDR5까지 — 세대 진화">
        <p className="text-sm mb-4">
          DRAM 셀(코어) 클럭은 수십 년째 크게 변하지 않았습니다. 대신 <strong>프리페치(prefetch)</strong> 폭을
          넓혀(2n → 16n) 한 번의 코어 접근에서 더 많은 비트를 길어 올리고, 클럭의 양쪽 엣지를 쓰는
          <strong> DDR(Double Data Rate)</strong> 방식으로 전송률을 끌어올렸습니다.
        </p>
        <DdrRateChart />
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-sidebar-border">
                <th className="text-left py-2 pr-4 font-semibold text-muted">세대</th>
                <th className="text-left py-2 pr-4 font-semibold text-muted">등장</th>
                <th className="text-left py-2 pr-4 font-semibold text-muted">프리페치</th>
                <th className="text-left py-2 pr-4 font-semibold text-muted">최대 전송률</th>
                <th className="text-left py-2 font-semibold text-muted">특징</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              {[
                ["SDR",  "1997", "1n",  "166 MT/s",  "클럭 동기화 시작"],
                ["DDR",  "2000", "2n",  "400 MT/s",  "양쪽 엣지 전송"],
                ["DDR2", "2003", "4n",  "1066 MT/s", "I/O 클럭 2배"],
                ["DDR3", "2007", "8n",  "2133 MT/s", "저전압(1.5V)"],
                ["DDR4", "2014", "8n",  "3200 MT/s", "뱅크 그룹 도입"],
                ["DDR5", "2020", "16n", "8400 MT/s", "온다이 ECC·채널 분할"],
              ].map(([gen, year, pf, rate, feat]) => (
                <tr key={gen}>
                  <td className="py-2 pr-4 font-mono font-medium">{gen}</td>
                  <td className="py-2 pr-4 text-muted">{year}</td>
                  <td className="py-2 pr-4 text-blue-400">{pf}</td>
                  <td className="py-2 pr-4 text-orange-400 font-semibold">{rate}</td>
                  <td className="py-2 text-muted">{feat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CalcBox>

      {/* ── HBM 연결 ── */}
      <CalcBox title="■ DRAM에서 HBM으로">
        <p className="text-sm mb-3">
          DDR 계열이 &ldquo;핀당 속도&rdquo;를 높이는 길을 걸었다면, HBM은 &ldquo;버스폭&rdquo;을 극단적으로
          넓히는 길을 택했습니다. 같은 DRAM 코어를 여러 장 쌓고 TSV로 1024~2048비트의 넓은 통로를 뚫어,
          느린 코어 클럭으로도 TB/s급 대역폭을 만듭니다.
        </p>
        <p className="text-sm text-muted">
          KAIST TERALAB 로드맵 기준 HBM은 다이당 용량이 HBM4 24 Gb → HBM8 80 Gb 로 커지고, 한 스택을
          12~24장까지 쌓아 스택당 36 GB → 240 GB 까지 확장됩니다. 그만큼 리프레시·발열 관리가 핵심 과제가 됩니다.
        </p>
        <Insight>
          DRAM은 &ldquo;작고 싸지만 잊어버리는&rdquo; 메모리입니다. HBM·HBF는 이 DRAM(과 NAND)을 어떻게 쌓고
          연결하고 식히느냐의 공학입니다. 다음 단원에서는 그 수직 연결 기술인 TSV를 다룹니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
