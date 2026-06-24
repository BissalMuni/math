"use client";

import { useState } from "react";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 개념적 HBM vs HBF 시장 추세 (2028~2038) */
const MARKET_DATA = [
  { year: 2028, hbm: 20, hbf: 2 },
  { year: 2030, hbm: 35, hbf: 8 },
  { year: 2032, hbm: 55, hbf: 22 },
  { year: 2034, hbm: 70, hbf: 52 },
  { year: 2036, hbm: 82, hbf: 80 },
  { year: 2038, hbm: 90, hbf: 100 },
];

const MAX_VAL = 100;

/** HBM vs HBF 시장 추세 교차 그래프 */
function MarketCrossChart() {
  const W = 560;
  const H = 200;
  const PAD_L = 50;
  const PAD_R = 20;
  const PAD_T = 20;
  const PAD_B = 40;
  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_T - PAD_B;
  const n = MARKET_DATA.length;

  const toX = (i: number) => PAD_L + (i / (n - 1)) * chartW;
  const toY = (v: number) => PAD_T + chartH - (v / MAX_VAL) * chartH;

  const hbmPoints = MARKET_DATA.map((d, i) => `${toX(i)},${toY(d.hbm)}`).join(" ");
  const hbfPoints = MARKET_DATA.map((d, i) => `${toX(i)},${toY(d.hbf)}`).join(" ");

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ fontFamily: "sans-serif" }}>
      {/* Y축 */}
      <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={PAD_T + chartH} stroke="#334155" strokeWidth={1} />
      {/* X축 */}
      <line x1={PAD_L} y1={PAD_T + chartH} x2={PAD_L + chartW} y2={PAD_T + chartH} stroke="#334155" strokeWidth={1} />

      {/* Y축 보조선 */}
      {[0, 25, 50, 75, 100].map((v) => {
        const y = toY(v);
        return (
          <g key={v}>
            <line x1={PAD_L} y1={y} x2={PAD_L + chartW} y2={y} stroke="#1e293b" strokeWidth={0.8} />
            <text x={PAD_L - 6} y={y + 4} textAnchor="end" fontSize={8} fill="#64748b">{v}</text>
          </g>
        );
      })}

      {/* Y축 라벨 */}
      <text x={12} y={PAD_T + chartH / 2} textAnchor="middle" fontSize={9} fill="#64748b"
        transform={`rotate(-90 12 ${PAD_T + chartH / 2})`}>
        상대 시장 규모 (개념, 2038 HBF=100)
      </text>

      {/* X축 연도 */}
      {MARKET_DATA.map((d, i) => (
        <text key={d.year} x={toX(i)} y={PAD_T + chartH + 14} textAnchor="middle" fontSize={9} fill="#64748b">
          {d.year}
        </text>
      ))}

      {/* HBM 선 */}
      <polyline points={hbmPoints} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
      {MARKET_DATA.map((d, i) => (
        <circle key={`hbm-${d.year}`} cx={toX(i)} cy={toY(d.hbm)} r={4} fill="#38bdf8" />
      ))}

      {/* HBF 선 */}
      <polyline points={hbfPoints} fill="none" stroke="#a78bfa" strokeWidth={2.5} strokeDasharray="5,3" />
      {MARKET_DATA.map((d, i) => (
        <circle key={`hbf-${d.year}`} cx={toX(i)} cy={toY(d.hbf)} r={4} fill="#a78bfa" />
      ))}

      {/* 교차 표시 */}
      <line x1={toX(4.5)} y1={PAD_T} x2={toX(4.5)} y2={PAD_T + chartH}
        stroke="#ef4444" strokeWidth={1} strokeDasharray="4,3" opacity={0.6} />
      <text x={toX(4.5) + 4} y={PAD_T + 14} fontSize={9} fill="#ef4444">교차 ~2036~2038</text>

      {/* 범례 */}
      <rect x={PAD_L + 10} y={PAD_T + 6} width={10} height={4} fill="#38bdf8" rx={1} />
      <text x={PAD_L + 24} y={PAD_T + 12} fontSize={9} fill="#38bdf8">HBM</text>
      <line x1={PAD_L + 70} y1={PAD_T + 8} x2={PAD_L + 80} y2={PAD_T + 8}
        stroke="#a78bfa" strokeWidth={2} strokeDasharray="3,2" />
      <text x={PAD_L + 84} y={PAD_T + 12} fontSize={9} fill="#a78bfa">HBF</text>
    </svg>
  );
}

type ScenKey = "moderate" | "bull";

const SCENARIOS: Record<ScenKey, { label: string; desc: string }> = {
  moderate: {
    label: "기본 시나리오",
    desc: "에이전트형 AI 보급이 점진적으로 진행되며 2038년 HBF가 HBM을 소폭 추월.",
  },
  bull: {
    label: "가속 시나리오",
    desc: "1인당 100 TB 메모리 수요가 2032년 이전에 현실화돼 HBF 채택이 앞당겨짐. 2036년 교차 가능.",
  },
};

export default function HbfMarket() {
  const [scen, setScen] = useState<ScenKey>("moderate");

  return (
    <div className="space-y-8">
      <p className="text-muted">
        HBF 상용화(~2028)로부터 약 10년 후인 2038년, HBF 시장 규모가 HBM 시장을 추월할 것으로 전망됩니다.
        AI 스케일링의 지배적 제약이 연산에서 메모리 용량으로 이동하는 구조적 전환이 이 성장의 배경입니다.
      </p>

      {/* ── 시장 교차 그래프 ── */}
      <CalcBox title="■ HBM vs HBF 시장 추세 — 2028~2038 교차 전망">
        <p className="text-sm text-muted mb-4">
          아래 그래프는 개념적 상대 시장 규모입니다. 2038년 HBF 규모를 100으로 정규화. 절대 수치가 아닌
          교차 시점과 성장 기울기가 핵심입니다.
        </p>

        {/* 시나리오 탭 */}
        <div className="flex gap-1 bg-sidebar-bg rounded-lg p-1 mb-4">
          {(Object.entries(SCENARIOS) as [ScenKey, { label: string; desc: string }][]).map(([key, s]) => (
            <button key={key} onClick={() => setScen(key)}
              className={`flex-1 py-1.5 rounded-md text-sm transition-colors ${
                scen === key
                  ? "bg-white dark:bg-gray-800 font-semibold shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}>
              {s.label}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted mb-3">{SCENARIOS[scen].desc}</p>
        <MarketCrossChart />

        <Insight>
          <strong>2038년 HBF 시장이 HBM 시장 추월</strong> — 상용화 약 10년 후. HBM이 DRAM에서
          독립적 시장으로 성장한 궤적과 유사합니다.
        </Insight>
      </CalcBox>

      {/* ── 수요 드라이버 ── */}
      <CalcBox title="■ 수요 드라이버 — 왜 용량이 지배적 제약인가">
        <SubSection title="● 에이전트형 AI의 컨텍스트 폭발">
          <p className="text-sm mb-2">
            생성형 AI(텍스트 생성)에서 <strong>에이전트형 AI(계획·실행·기억)</strong>로 전환되면
            컨텍스트 엔지니어링이 핵심이 됩니다. 에이전트는 태스크 히스토리, 도구 결과, 멀티-턴
            대화를 모두 메모리에 유지해야 합니다.
          </p>
          <p className="text-sm text-muted">
            ① 입력 토큰 100~1,000배 증가 &rarr; KV 캐시 메모리 수요 폭증.<br />
            ② 멀티-에이전트 오케스트레이션 &rarr; 수십 개 에이전트가 공유 메모리 사용.<br />
            ③ 2030년대 중반 <strong>1인당 ~100 TB 메모리</strong> 수요 전망(KAIST TERALAB 1-D).
          </p>
        </SubSection>

        <SubSection title="● HBM 단독으로는 부족한 이유">
          <p className="text-sm mb-2">
            HBM4(2026)는 스택당 최대 48 GB, HBM7(2035)도 최대 192 GB입니다. GPU 한 대에 HBM을
            8~32스택 탑재해도 수십 TB가 한계입니다. HBF는 유닛당 최대 512 GB로
            <strong> 용량 격차</strong>를 채웁니다.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 text-sm mt-2">
            <div className="rounded-lg border border-sidebar-border p-3">
              <div className="font-semibold text-blue-400 mb-1">HBM 용량 한계</div>
              <p className="text-muted">HBM7×32 = 최대 6,144 GB(~6 TB). 100 TB 수요에 부족.</p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3">
              <div className="font-semibold text-purple-400 mb-1">HBF 확장성</div>
              <p className="text-muted">512 GB/유닛. 다수 유닛 배치로 10~100 TB 메모리 계층 구현.</p>
            </div>
            <div className="rounded-lg border border-sidebar-border p-3">
              <div className="font-semibold text-amber-400 mb-1">읽기 중심 워크로드</div>
              <p className="text-muted">AI 추론 = read-heavy. HBF 읽기 내구성 사실상 무제한 &rarr; 추론에 최적.</p>
            </div>
          </div>
        </SubSection>

        <SubSection title="● 메모리 임대(Rental) 경제">
          <p className="text-sm mb-2">
            용량 중심 AI 시대에는 연산 자원보다 <strong>메모리 자원이 더 가치 있는 자원</strong>이 될 수
            있습니다. 클라우드·데이터센터에서 HBF 기반 메모리 임대 서비스가 새로운 비즈니스 모델로
            논의됩니다.
          </p>
          <p className="text-sm text-muted">
            ① GPU 시간 임대(현재) &rarr; 메모리 용량 임대(미래)로 과금 축이 이동.<br />
            ② SK하이닉스 H3 아키텍처는 HBF 교체·확장이 용이한 모듈형 설계를 지향합니다.<br />
            ③ KAIST 김정호 교수 &ldquo;메모리-중심 패러다임&rdquo;(1-D)의 핵심 시나리오.
          </p>
        </SubSection>
      </CalcBox>

      {/* ── 시장 전망 요약 ── */}
      <CalcBox title="■ HBF 시장 전망 요약">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-sidebar-border">
                <th className="text-left py-2 pr-4 font-semibold text-muted">시점</th>
                <th className="text-left py-2 pr-4 font-semibold text-muted">이정표</th>
                <th className="text-left py-2 font-semibold text-muted">비고</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              {[
                ["2026-02", "HBF 컨소시엄 결성", "SK하이닉스 + SanDisk"],
                ["~2027", "엔지니어링 샘플", "GPU 파트너 검증 시작"],
                ["2028+", "NVIDIA·Google·AMD 채택", "HBM5 병행 탑재 목표"],
                ["2030년대 중반", "1인당 ~100 TB 수요", "AI 에이전트 컨텍스트 급증"],
                ["2035", "HBM7 + HBF 결합", "Storage network 통합(1-A)"],
                ["~2038", "HBF 시장이 HBM 추월", "상용화 약 10년 후"],
              ].map(([time, milestone, note]) => (
                <tr key={time}>
                  <td className="py-2 pr-4 font-mono text-orange-400 font-semibold">{time}</td>
                  <td className="py-2 pr-4 font-medium">{milestone}</td>
                  <td className="py-2 text-muted">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CalcBox>
    </div>
  );
}
