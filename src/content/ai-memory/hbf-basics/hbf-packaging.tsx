import { CalcBox, SubSection, Insight, Step } from "@/components/content/shared";

/** HBF 스택 단면도 — NAND 다이들 + 베이스 로직 다이 */
function HbfStackDiagram() {
  const nandLayers = [
    { y: 20, label: "NAND 다이 8 (최상단)", fill: "#f59e0b" },
    { y: 46, label: "NAND 다이 7", fill: "#f59e0b" },
    { y: 72, label: "NAND 다이 6", fill: "#f59e0b" },
    { y: 98, label: "NAND 다이 5", fill: "#f59e0b" },
    { y: 124, label: "NAND 다이 4", fill: "#f59e0b" },
    { y: 150, label: "NAND 다이 3", fill: "#eab308" },
    { y: 176, label: "NAND 다이 2", fill: "#eab308" },
    { y: 202, label: "NAND 다이 1 (최하단 NAND)", fill: "#ca8a04" },
  ];

  return (
    <svg width="100%" viewBox="0 0 460 320" style={{ fontFamily: "sans-serif", maxWidth: 460 }}>
      {/* 제목 */}
      <text x={230} y={14} textAnchor="middle" fontSize={11} fill="#94a3b8" fontWeight={600}>
        HBF 스택 단면도
      </text>

      {/* NAND 다이들 */}
      {nandLayers.map((l, i) => (
        <g key={i}>
          <rect x={80} y={l.y} width={220} height={22} rx={3} fill={l.fill} opacity={0.8} />
          <text x={190} y={l.y + 14} textAnchor="middle" fontSize={9} fill="#1c1917" fontWeight={500}>
            {l.label}
          </text>
        </g>
      ))}

      {/* TSV 기둥들 */}
      {[110, 130, 150, 230, 250, 270].map((x) => (
        <line key={x} x1={x} y1={20} x2={x} y2={228} stroke="#22c55e" strokeWidth={2.5} opacity={0.85} />
      ))}

      {/* 베이스 로직 다이 */}
      <rect x={60} y={228} width={260} height={32} rx={4} fill="#6366f1" opacity={0.9} />
      <text x={190} y={240} textAnchor="middle" fontSize={10} fill="#e0e7ff" fontWeight={700}>
        베이스 로직 다이 (컨트롤러)
      </text>
      <text x={190} y={254} textAnchor="middle" fontSize={8} fill="#c7d2fe">
        I/O 관리 · 웨어레벨링 · ECC · 전원
      </text>

      {/* 범프/인터커넥트 */}
      {[90, 120, 160, 200, 240, 280, 300].map((x) => (
        <circle key={x} cx={x} cy={264} r={4} fill="#94a3b8" opacity={0.7} />
      ))}
      <text x={190} y={275} textAnchor="middle" fontSize={8} fill="#64748b">
        마이크로범프 / 인터포저 접속
      </text>

      {/* 인터포저 */}
      <rect x={40} y={278} width={300} height={18} rx={3} fill="#334155" opacity={0.9} />
      <text x={190} y={290} textAnchor="middle" fontSize={9} fill="#94a3b8">
        실리콘 인터포저 (GPU·HBM과 동일 기판)
      </text>

      {/* TSV 범례 */}
      <line x1={360} y1={60} x2={360} y2={80} stroke="#22c55e" strokeWidth={2.5} />
      <text x={368} y={73} fontSize={9} fill="#22c55e">TSV (다이 관통 배선)</text>

      {/* NAND 범례 */}
      <rect x={360} y={100} width={16} height={10} rx={2} fill="#f59e0b" opacity={0.8} />
      <text x={380} y={109} fontSize={9} fill="#94a3b8">NAND 플래시 다이</text>

      {/* 베이스 로직 범례 */}
      <rect x={360} y={120} width={16} height={10} rx={2} fill="#6366f1" opacity={0.9} />
      <text x={380} y={129} fontSize={9} fill="#94a3b8">베이스 로직 다이</text>

      {/* 화살표 — 데이터 흐름 */}
      <text x={36} y={120} fontSize={18} fill="#22c55e" textAnchor="middle">&#8597;</text>
      <text x={36} y={138} fontSize={8} fill="#64748b" textAnchor="middle">데이터</text>
    </svg>
  );
}

/** HBF vs HBM vs SSD 패키징 비교 다이어그램 */
function PackagingCompareDiagram() {
  return (
    <div className="grid sm:grid-cols-3 gap-4 text-sm">
      {/* SSD */}
      <div className="flex flex-col items-center gap-2">
        <svg width="100%" viewBox="0 0 140 140" style={{ maxWidth: 140 }}>
          {[20, 50, 80].map((y) => (
            <rect key={y} x={10} y={y} width={120} height={24} rx={3} fill="#64748b" opacity={0.7} />
          ))}
          <rect x={10} y={110} width={120} height={20} rx={3} fill="#334155" opacity={0.9} />
          <text x={70} y={124} textAnchor="middle" fontSize={8} fill="#94a3b8">PCIe 컨트롤러</text>
          <text x={70} y={16} textAnchor="middle" fontSize={9} fill="#64748b">SSD</text>
          <text x={70} y={34} textAnchor="middle" fontSize={8} fill="#cbd5e1">NAND 패키지 A</text>
          <text x={70} y={64} textAnchor="middle" fontSize={8} fill="#cbd5e1">NAND 패키지 B</text>
          <text x={70} y={94} textAnchor="middle" fontSize={8} fill="#cbd5e1">NAND 패키지 C</text>
        </svg>
        <p className="text-xs text-muted text-center">
          개별 NAND 패키지를 PCB 위에 배치 &mdash; 와이어/솔더 연결, 낮은 대역폭
        </p>
      </div>

      {/* HBF */}
      <div className="flex flex-col items-center gap-2">
        <svg width="100%" viewBox="0 0 140 140" style={{ maxWidth: 140 }}>
          {[15, 32, 49, 66, 83].map((y) => (
            <rect key={y} x={15} y={y} width={110} height={15} rx={2} fill="#f59e0b" opacity={0.75} />
          ))}
          <rect x={15} y={100} width={110} height={22} rx={3} fill="#6366f1" opacity={0.9} />
          <text x={70} y={114} textAnchor="middle" fontSize={8} fill="#e0e7ff">베이스 로직 다이</text>
          {[35, 55, 75, 95, 110].map((x) => (
            <line key={x} x1={x} y1={15} x2={x} y2={100} stroke="#22c55e" strokeWidth={1.5} opacity={0.8} />
          ))}
          <text x={70} y={12} textAnchor="middle" fontSize={9} fill="#f59e0b" fontWeight={600}>HBF</text>
        </svg>
        <p className="text-xs text-muted text-center">
          NAND 다이를 TSV로 수직 적층 + 베이스 로직 &mdash; 대역폭 ×100 이상
        </p>
      </div>

      {/* HBM */}
      <div className="flex flex-col items-center gap-2">
        <svg width="100%" viewBox="0 0 140 140" style={{ maxWidth: 140 }}>
          {[15, 32, 49, 66, 83].map((y) => (
            <rect key={y} x={15} y={y} width={110} height={15} rx={2} fill="#0ea5e9" opacity={0.75} />
          ))}
          <rect x={15} y={100} width={110} height={22} rx={3} fill="#1d4ed8" opacity={0.9} />
          <text x={70} y={114} textAnchor="middle" fontSize={8} fill="#bfdbfe">베이스 다이 (DRAM)</text>
          {[35, 55, 75, 95, 110].map((x) => (
            <line key={x} x1={x} y1={15} x2={x} y2={100} stroke="#22c55e" strokeWidth={1.5} opacity={0.8} />
          ))}
          <text x={70} y={12} textAnchor="middle" fontSize={9} fill="#0ea5e9" fontWeight={600}>HBM</text>
        </svg>
        <p className="text-xs text-muted text-center">
          DRAM 다이를 TSV로 수직 적층 + 베이스 DRAM 다이 &mdash; 공통 패키징 철학
        </p>
      </div>
    </div>
  );
}

export default function HbfPackaging() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        HBF의 패키징은 HBM의 철학(TSV 수직 적층 + 베이스 로직 다이)을 NAND 플래시에 적용한
        것입니다. SSD 및 HBM 패키징과 비교하며 HBF만의 특성을 파악합니다.
      </p>

      {/* ── HBF 스택 구조 ── */}
      <CalcBox title="■ HBF 스택 구조 — NAND 다이 + 베이스 로직 다이">
        <p className="text-sm mb-4">
          HBF는 <strong>다수의 3D NAND 다이를 TSV(Through-Silicon Via)로 수직 연결</strong>하고,
          최하단에 <strong>베이스 로직 다이</strong>(컨트롤러)를 배치합니다.
          베이스 로직 다이가 I/O 프로토콜 처리, 웨어레벨링, ECC, 전원 관리를 담당합니다.
        </p>
        <div className="flex justify-center mb-4">
          <HbfStackDiagram />
        </div>
        <SubSection title="● 베이스 로직 다이의 역할">
          <div className="grid sm:grid-cols-2 gap-3 text-sm mt-2">
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-indigo-400 mb-1">I/O 인터페이스</div>
              <p className="text-muted text-xs">
                GPU / 인터포저와의 고속 신호 송수신. HBM과 유사한 광폭 버스 제공.
              </p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-indigo-400 mb-1">웨어레벨링 (Wear Leveling)</div>
              <p className="text-muted text-xs">
                NAND 쓰기를 여러 블록에 고르게 분산시켜 특정 블록만 먼저 닳지 않게 관리.
              </p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-indigo-400 mb-1">ECC (오류 정정)</div>
              <p className="text-muted text-xs">
                NAND 특유의 비트 오류를 하드웨어 레벨에서 정정 &mdash; AI 추론 신뢰성 보장.
              </p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3 bg-sidebar-bg">
              <div className="font-semibold text-indigo-400 mb-1">전원 관리</div>
              <p className="text-muted text-xs">
                NAND 프로그램·소거 전압 생성 및 각 다이별 전력 분배 제어.
              </p>
            </div>
          </div>
        </SubSection>
      </CalcBox>

      {/* ── 패키징 비교 ── */}
      <CalcBox title="■ SSD · HBF · HBM 패키징 비교">
        <p className="text-sm mb-4">
          세 메모리는 서로 다른 방식으로 다이를 연결합니다. HBF와 HBM은 TSV 적층이라는
          공통 철학을 공유하지만, 저장 소재(NAND vs DRAM)와 관리 복잡도가 다릅니다.
        </p>
        <PackagingCompareDiagram />
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-sidebar-border">
                <th className="text-left py-2 pr-3 font-semibold text-muted">항목</th>
                <th className="text-left py-2 pr-3 font-semibold text-gray-400">SSD</th>
                <th className="text-left py-2 pr-3 font-semibold text-amber-400">HBF</th>
                <th className="text-left py-2 font-semibold text-blue-400">HBM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr>
                <td className="py-2 pr-3 font-medium">저장 소재</td>
                <td className="py-2 pr-3 text-muted">NAND 플래시</td>
                <td className="py-2 pr-3 text-muted">NAND 플래시</td>
                <td className="py-2 text-muted">DRAM</td>
              </tr>
              <tr>
                <td className="py-2 pr-3 font-medium">다이 연결</td>
                <td className="py-2 pr-3 text-muted">개별 패키지 → PCB 실장</td>
                <td className="py-2 pr-3 text-muted">TSV 수직 적층</td>
                <td className="py-2 text-muted">TSV 수직 적층</td>
              </tr>
              <tr>
                <td className="py-2 pr-3 font-medium">대역폭</td>
                <td className="py-2 pr-3 text-muted">~14 GB/s (PCIe5)</td>
                <td className="py-2 pr-3 text-amber-400">최대 1.638 TB/s</td>
                <td className="py-2 text-blue-400">최대 2+ TB/s</td>
              </tr>
              <tr>
                <td className="py-2 pr-3 font-medium">쓰기 관리</td>
                <td className="py-2 pr-3 text-muted">SSD 컨트롤러(별도 칩)</td>
                <td className="py-2 pr-3 text-muted">베이스 로직 다이 내장</td>
                <td className="py-2 text-muted">불필요 (DRAM 무제한)</td>
              </tr>
              <tr>
                <td className="py-2 pr-3 font-medium">비휘발성</td>
                <td className="py-2 pr-3 text-green-400">예</td>
                <td className="py-2 pr-3 text-green-400">예</td>
                <td className="py-2 text-red-400">아니오</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Insight>
          HBF는 &ldquo;SSD의 용량 + HBM의 대역폭&rdquo;을 TSV 패키징으로 결합한 구조입니다.
          HBM과 제조 공정 철학을 공유하므로 기존 인터포저 생태계를 그대로 활용할 수 있습니다.
        </Insight>
      </CalcBox>

      {/* ── 제조 흐름 ── */}
      <CalcBox title="■ HBF 패키징 제조 흐름">
        <p className="text-sm mb-4">
          HBF 패키징은 NAND 다이 준비 &rarr; TSV 가공 &rarr; 적층 &rarr; 베이스 로직 결합 순서로
          이루어집니다. HBM 패키징과 대부분 동일하며, NAND 특성에 맞는 웨어레벨링 펌웨어가 추가됩니다.
        </p>
        <div className="space-y-3">
          <div>
            <Step n={1} label="3D NAND 다이 제조" />
            <p className="text-sm text-muted mt-1">
              수직 100층+ 3D NAND 웨이퍼를 제조한 뒤 얇게 갈아내(박막화) TSV 구멍을 뚫을 준비.
            </p>
          </div>
          <div>
            <Step n={2} label="TSV 가공" />
            <p className="text-sm text-muted mt-1">
              식각(DRIE) &rarr; 절연·배리어 막 코팅 &rarr; 구리 전해도금 &rarr; CMP 평탄화 순서로
              각 NAND 다이에 TSV를 형성.
            </p>
          </div>
          <div>
            <Step n={3} label="다이 수직 적층" />
            <p className="text-sm text-muted mt-1">
              마이크로범프 또는 Cu-Cu 하이브리드 본딩으로 NAND 다이를 8장 이상 적층.
              각 다이의 TSV가 맞닿아 수직 데이터 경로 형성.
            </p>
          </div>
          <div>
            <Step n={4} label="베이스 로직 다이 결합" />
            <p className="text-sm text-muted mt-1">
              최하단 NAND 다이 아래에 베이스 로직 다이를 접합. 이 다이가 I/O·웨어레벨링·ECC를 모두 처리.
            </p>
          </div>
          <div>
            <Step n={5} label="인터포저 탑재" />
            <p className="text-sm text-muted mt-1">
              완성된 HBF 스택을 GPU, HBM과 함께 실리콘 인터포저 위에 병렬 배치.
              SK하이닉스 H3 아키텍처는 이 방식으로 HBM과 HBF를 동일 인터포저에 탑재합니다.
            </p>
          </div>
        </div>
      </CalcBox>

      {/* ── HBM vs HBF 차이 심화 ── */}
      <CalcBox title="■ HBM 패키징과의 공통점·차이점">
        <SubSection title="● 공통점 (TSV · 적층)">
          <p className="text-sm">
            ① TSV를 이용한 다이 수직 연결 &mdash; 넓은 버스폭으로 높은 대역폭 달성.{" "}
            ② 베이스 다이(로직 다이)가 최하단에 위치해 인터페이스를 담당.{" "}
            ③ 실리콘 인터포저 위에 GPU와 나란히 탑재.
          </p>
        </SubSection>
        <SubSection title="● 차이점 (NAND 특성·대용량·쓰기 관리)">
          <p className="text-sm">
            ① NAND는 블록 단위 소거가 필요해 베이스 로직 다이가 <strong>웨어레벨링·ECC</strong>를
            수행해야 합니다 &mdash; HBM의 베이스 DRAM 다이보다 훨씬 복잡한 펌웨어가 필요.{" "}
            ② 비휘발성이므로 전원 차단 후에도 데이터가 유지됩니다.{" "}
            ③ 쓰기 내구성이 유한(~10만 회)해 <strong>read-heavy 운용</strong>이 전제됩니다.{" "}
            ④ 같은 면적에서 HBM의 약 10배 용량을 제공합니다.
          </p>
        </SubSection>
        <Insight>
          &ldquo;TSV로 쌓는다&rdquo;는 철학은 HBM과 같지만, NAND 특성 때문에 베이스 로직 다이의
          역할이 훨씬 크고 AI 프레임워크가 읽기 중심으로 설계되어야 한다는 점이 핵심 차이입니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
