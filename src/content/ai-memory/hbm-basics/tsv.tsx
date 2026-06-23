import { CalcBox, SubSection, Step, Insight } from "@/components/content/shared";
import { InlineMath } from "@/components/math/math-formula";

const TSV_PARAMS = [
  { label: "직경(지름)", value: "약 5~10 µm", note: "머리카락의 1/10 수준" },
  { label: "깊이(다이 두께)", value: "약 50 µm", note: "웨이퍼를 얇게 갈아냄" },
  { label: "종횡비(깊이/직경)", value: "약 10 : 1", note: "깊고 가는 구멍" },
  { label: "피치(간격)", value: "약 40~50 µm", note: "촘촘히 배열" },
  { label: "한 스택의 TSV 수", value: "수천~수만 개", note: "넓은 버스폭의 원천" },
];

/** 와이어 본딩(가장자리) vs TSV(수직 관통) 비교 다이어그램 */
function WireVsTsvDiagram() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {/* 와이어 본딩 */}
      <div className="flex flex-col items-center gap-2">
        <svg width="100%" viewBox="0 0 220 170" style={{ maxWidth: 220, fontFamily: "sans-serif" }}>
          {[110, 80, 50].map((y) => (
            <rect key={y} x={50} y={y} width={120} height={22} fill="#c7d2fe" stroke="#6366f1" strokeWidth={1.2} rx={2} />
          ))}
          <rect x={50} y={140} width={120} height={20} fill="#fde68a" stroke="#d97706" strokeWidth={1.2} rx={2} />
          {/* 가장자리 와이어 */}
          {[50, 80, 110].map((y) => (
            <path key={y} d={`M50 ${y + 4} Q20 ${y - 10} 30 150`} fill="none" stroke="#ef4444" strokeWidth={1.5} />
          ))}
          {[170, 140, 110].map((y) => (
            <path key={y} d={`M170 ${y + 4} Q200 ${y - 10} 190 150`} fill="none" stroke="#ef4444" strokeWidth={1.5} />
          ))}
          <text x={110} y={14} textAnchor="middle" fontSize={11} fill="#94a3b8" fontWeight={600}>와이어 본딩</text>
          <text x={110} y={28} textAnchor="middle" fontSize={9} fill="#ef4444">가장자리로만 연결 → 핀 수 제한</text>
        </svg>
        <p className="text-xs text-muted text-center">기존 방식: 칩 가장자리 금속선. 길고 좁아 신호가 느리고 핀 수가 적다.</p>
      </div>

      {/* TSV */}
      <div className="flex flex-col items-center gap-2">
        <svg width="100%" viewBox="0 0 220 170" style={{ maxWidth: 220, fontFamily: "sans-serif" }}>
          {[110, 80, 50].map((y) => (
            <rect key={y} x={50} y={y} width={120} height={22} fill="#bfdbfe" stroke="#3b82f6" strokeWidth={1.2} rx={2} />
          ))}
          <rect x={50} y={140} width={120} height={20} fill="#fde68a" stroke="#d97706" strokeWidth={1.2} rx={2} />
          {/* 수직 TSV 기둥 */}
          {[75, 95, 115, 135, 145].map((x) => (
            <line key={x} x1={x} y1={50} x2={x} y2={160} stroke="#22c55e" strokeWidth={2.5} />
          ))}
          <text x={110} y={14} textAnchor="middle" fontSize={11} fill="#94a3b8" fontWeight={600}>TSV</text>
          <text x={110} y={28} textAnchor="middle" fontSize={9} fill="#22c55e">다이를 수직 관통 → 수천 개 병렬</text>
        </svg>
        <p className="text-xs text-muted text-center">TSV: 다이를 수직으로 뚫는 구리 기둥. 짧고 넓어 빠르고 핀(I/O)을 폭발적으로 늘린다.</p>
      </div>
    </div>
  );
}

export default function Tsv() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        HBM이 DRAM을 &ldquo;위로 쌓을&rdquo; 수 있는 핵심 기술이 TSV입니다. TSV(Through-Silicon Via)는 실리콘
        다이를 수직으로 관통하는 구리 배선으로, 칩 가장자리에 의존하던 기존 연결의 한계를 넘어 넓고 짧은
        데이터 통로를 만듭니다.
      </p>

      {/* ── TSV란 ── */}
      <CalcBox title="■ TSV란 — 다이를 수직 관통하는 구리 기둥">
        <p className="text-sm mb-4">
          TSV는 실리콘 웨이퍼에 깊은 구멍을 뚫고 구리로 채워, 다이의 앞면과 뒷면을 전기적으로 잇는 수직 배선입니다.
          여러 장의 다이를 TSV로 연결하면, 가장자리 핀이 아니라 <strong>다이 전면(全面)</strong>을 통해 신호를
          주고받을 수 있습니다.
        </p>
        <WireVsTsvDiagram />
        <Insight>
          핵심은 &ldquo;옆으로 넓히는 대신 위로 쌓고, 수직으로 뚫는다&rdquo;는 것입니다. 이 덕분에 HBM은 버스폭을
          1024~2048비트까지 넓혀 TB/s급 대역폭을 얻습니다.
        </Insight>
      </CalcBox>

      {/* ── 왜 TSV ── */}
      <CalcBox title="■ 왜 TSV인가 — 넓고 짧은 길">
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold mb-1">① 넓은 버스폭</div>
            <p className="text-muted">가장자리가 아닌 면 전체에 수천 개를 배치 → I/O를 1024~2048비트로 확장.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold mb-1">② 짧은 경로</div>
            <p className="text-muted">신호 거리가 수십 µm로 짧아져 지연(latency)과 비트당 전력이 줄어든다.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
            <div className="font-semibold mb-1">③ 고집적</div>
            <p className="text-muted">평면을 키우지 않고 위로 쌓아 같은 면적에 더 많은 용량을 담는다.</p>
          </div>
        </div>
        <p className="text-sm text-muted mt-4">
          느린 코어 클럭으로도 대역폭을 키울 수 있는 이유가 여기 있습니다. 대역폭은
          <InlineMath math="\text{버스폭} \times \text{클럭} \times 2 \div 8" /> 이므로, 클럭 대신
          <strong> 버스폭</strong>을 키우는 것이 TSV의 전략입니다.
        </p>
      </CalcBox>

      {/* ── 공정 ── */}
      <CalcBox title="■ TSV는 어떻게 만드는가 — 공정 흐름">
        <p className="text-sm mb-4">
          TSV 제조는 깊은 구멍을 뚫고, 절연·금속 막을 입힌 뒤 구리로 채우고, 웨이퍼를 갈아 뒷면으로 드러내는
          순서로 진행됩니다.
        </p>
        <div className="space-y-3">
          <div>
            <Step n={1} label="식각 (DRIE)" />
            <p className="text-sm text-muted mt-1">깊은 반응성 이온 식각으로 직경 5~10 µm, 깊이 50 µm의 구멍을 뚫는다(종횡비 약 10:1).</p>
          </div>
          <div>
            <Step n={2} label="절연·배리어 막" />
            <p className="text-sm text-muted mt-1">구멍 벽에 산화막(절연)과 배리어(Ta/TaN)·시드층을 입혀 구리 확산을 막는다.</p>
          </div>
          <div>
            <Step n={3} label="구리 전해도금" />
            <p className="text-sm text-muted mt-1">구멍을 구리로 빈틈없이 채운다(void 없는 충전이 수율의 관건).</p>
          </div>
          <div>
            <Step n={4} label="CMP 평탄화" />
            <p className="text-sm text-muted mt-1">화학적·기계적 연마로 표면의 잉여 구리를 제거해 평탄하게 만든다.</p>
          </div>
          <div>
            <Step n={5} label="웨이퍼 박막화·후면 노출" />
            <p className="text-sm text-muted mt-1">웨이퍼 뒷면을 ~50 µm까지 갈아내 TSV 끝을 드러내고(reveal), 다음 다이와 접합할 준비를 한다.</p>
          </div>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-sidebar-border">
                <th className="text-left py-2 pr-4 font-semibold text-muted">파라미터</th>
                <th className="text-left py-2 pr-4 font-semibold text-muted">대략값</th>
                <th className="text-left py-2 font-semibold text-muted">의미</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              {TSV_PARAMS.map((p) => (
                <tr key={p.label}>
                  <td className="py-2 pr-4 font-medium">{p.label}</td>
                  <td className="py-2 pr-4 text-orange-400 font-semibold">{p.value}</td>
                  <td className="py-2 text-muted">{p.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CalcBox>

      {/* ── 다이 접합 ── */}
      <CalcBox title="■ 다이를 붙이는 법 — 마이크로범프에서 하이브리드 본딩으로">
        <SubSection title="● 마이크로범프 (현재 주류, MR-MUF)">
          <p className="text-sm mb-2">
            TSV로 신호를 위로 올려도, 다이와 다이는 작은 땜납 범프(마이크로범프)로 이어집니다. SK하이닉스의
            <strong> MR-MUF</strong>(Mass Reflow-Molded Underfill)는 여러 다이를 한 번에 접합하고 보호재로 채워
            방열·신뢰성을 높입니다.
          </p>
        </SubSection>
        <SubSection title="● 범프리스 Cu-Cu 하이브리드 본딩 (차세대)">
          <p className="text-sm mb-2">
            범프를 없애고 구리 패드끼리 직접 붙이는 <strong>하이브리드 본딩</strong>은 다이 간 간격을 더 줄여
            더 많은 다이를 더 얇게 쌓고, 전기·열 특성을 개선합니다.
          </p>
          <p className="text-sm text-muted">
            KAIST TERALAB 로드맵은 다이 접합이 <strong>Microbump(MR-MUF) → 범프리스 Cu-Cu Direct bonding</strong>
            으로 전환된다고 봅니다. 적층 수가 12-Hi에서 20~24-Hi로 늘수록 이 전환이 필수가 됩니다.
          </p>
        </SubSection>
      </CalcBox>

      {/* ── 도전 과제 ── */}
      <CalcBox title="■ TSV의 도전 과제">
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold text-blue-400 mb-1">응력·KOZ</div>
            <p className="text-muted">구리와 실리콘의 열팽창 차이로 응력이 생겨, TSV 주변엔 소자를 두지 않는 금지영역(KOZ)이 필요하다.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold text-purple-400 mb-1">발열</div>
            <p className="text-muted">다이를 많이 쌓을수록 가운데 열이 갇힌다. 로드맵이 D2C·침지·임베디드 냉각으로 가는 이유.</p>
          </div>
          <div className="rounded-lg border border-sidebar-border p-3">
            <div className="font-semibold text-amber-400 mb-1">수율</div>
            <p className="text-muted">수만 개 TSV 중 하나만 불량이어도 스택 전체가 실패할 수 있어, void 없는 충전과 검사가 중요하다.</p>
          </div>
        </div>
        <Insight>
          TSV는 HBM의 &ldquo;엘리베이터&rdquo;입니다. 다음 단원에서는 이 스택을 GPU와 나란히 올려놓는 바닥판,
          <strong> 실리콘 인터포저</strong>를 다룹니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
