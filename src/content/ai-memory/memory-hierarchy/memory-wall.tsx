"use client";

import { useState } from "react";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";
import { BlockMath, InlineMath } from "@/components/math/math-formula";

/** 연산 성능 vs 대역폭 증가 격차 시각화 데이터 */
const PERF_DATA = [
  { year: 2000, flops: 1,   bw: 1   },
  { year: 2005, flops: 8,   bw: 2.5 },
  { year: 2010, flops: 40,  bw: 5   },
  { year: 2015, flops: 200, bw: 10  },
  { year: 2020, flops: 800, bw: 18  },
  { year: 2025, flops: 4000,bw: 32  },
];

const W = 480;
const H = 200;
const PAD = { t: 20, r: 20, b: 36, l: 48 };
const maxVal = 4000;

function scaleX(i: number, total: number) {
  return PAD.l + (i / (total - 1)) * (W - PAD.l - PAD.r);
}
function scaleY(val: number) {
  return PAD.t + (1 - val / maxVal) * (H - PAD.t - PAD.b);
}

function GapChart() {
  const pts = (key: "flops" | "bw") =>
    PERF_DATA.map((d, i) => `${scaleX(i, PERF_DATA.length)},${scaleY(d[key])}`).join(" ");

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ fontFamily: "sans-serif" }}>
      {/* 격차 영역 */}
      <polygon
        points={[
          ...PERF_DATA.map((d, i) => `${scaleX(i, PERF_DATA.length)},${scaleY(d.flops)}`),
          ...PERF_DATA.map((d, i) => `${scaleX(PERF_DATA.length - 1 - i, PERF_DATA.length)},${scaleY(PERF_DATA[PERF_DATA.length - 1 - i].bw)}`),
        ].join(" ")}
        fill="#ef444422"
      />
      {/* 연산 성능 선 */}
      <polyline points={pts("flops")} fill="none" stroke="#f87171" strokeWidth={2.5} />
      {/* 대역폭 선 */}
      <polyline points={pts("bw")} fill="none" stroke="#60a5fa" strokeWidth={2.5} />
      {/* x축 레이블 */}
      {PERF_DATA.map((d, i) => (
        <text key={d.year} x={scaleX(i, PERF_DATA.length)} y={H - 6} textAnchor="middle" fontSize={9} fill="#94a3b8">
          {d.year}
        </text>
      ))}
      {/* y축 레이블 */}
      <text x={PAD.l - 4} y={scaleY(4000)} textAnchor="end" fontSize={9} fill="#94a3b8">4000×</text>
      <text x={PAD.l - 4} y={scaleY(1)} textAnchor="end" fontSize={9} fill="#94a3b8">1×</text>
      {/* 범례 */}
      <rect x={W - 110} y={PAD.t} width={12} height={3} fill="#f87171" rx={1} />
      <text x={W - 94} y={PAD.t + 4} fontSize={9} fill="#f87171">연산 성능 (FLOPs)</text>
      <rect x={W - 110} y={PAD.t + 14} width={12} height={3} fill="#60a5fa" rx={1} />
      <text x={W - 94} y={PAD.t + 18} fontSize={9} fill="#60a5fa">메모리 대역폭</text>
      <text x={W / 2} y={H - PAD.b + 28} textAnchor="middle" fontSize={9} fill="#64748b">※ 2000년 기준 상대값 (로그 스케일 근사)</text>
      {/* 메모리 월 화살표 */}
      <text x={W - 130} y={scaleY(2000) - 8} fontSize={10} fill="#fbbf24" fontWeight={600}>메모리 월</text>
      <line x1={W - 60} y1={scaleY(1800)} x2={W - 30} y2={scaleY(60)} stroke="#fbbf24" strokeWidth={1.5} markerEnd="url(#arr)" />
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#fbbf24" />
        </marker>
      </defs>
    </svg>
  );
}

export default function MemoryWall() {
  const [showRoof, setShowRoof] = useState(false);

  return (
    <div className="space-y-8">
      <p className="text-muted">
        CPU·GPU의 연산 성능(FLOPs)은 수십 년간 무어의 법칙을 따라 빠르게 성장했지만,
        메모리 대역폭은 그 속도를 따라가지 못했습니다. 코어가 데이터를 기다리며 노는 이
        &ldquo;메모리 월(Memory Wall)&rdquo; 현상은 AI 시대에 더욱 심각해졌습니다.
      </p>

      {/* ── 메모리 월이란 ── */}
      <CalcBox title="■ 메모리 월 — 데이터를 기다리는 코어">
        <p className="text-sm mb-4">
          메모리 월은 1994년 Wulf &amp; McKee가 처음 명명한 개념으로,
          <strong> 프로세서 속도 &gt; 메모리 대역폭</strong>의 격차가 커질수록
          코어가 연산보다 데이터를 기다리는 시간이 길어지는 병목을 말합니다.
        </p>
        <GapChart />
        <p className="text-xs text-muted mt-2 text-center">
          ▲ 연산 성능(빨강)과 메모리 대역폭(파랑) 증가 격차. 붉은 영역이 &ldquo;메모리 월&rdquo;.
        </p>
        <Insight>
          FLOPs가 4,000배 늘 때 대역폭은 32배 증가에 그칩니다. 격차가 클수록 코어의 &ldquo;유휴 시간&rdquo;이 늘어납니다.
        </Insight>
      </CalcBox>

      {/* ── 루프라인 모델 ── */}
      <CalcBox title="■ 루프라인 모델 — 병목이 연산인가 대역폭인가">
        <p className="text-sm mb-3">
          루프라인(Roofline) 모델은 커널의 실제 성능이 두 한계 중 낮은 쪽에 제약된다는 분석 틀입니다.
        </p>
        <SubSection title="● 연산 강도 (Arithmetic Intensity)">
          <BlockMath math="\text{AI} = \frac{\text{FLOPs}}{\text{메모리 이동량 (bytes)}}" />
          <p className="text-sm text-muted">
            AI가 낮으면 &ldquo;메모리 바운드&rdquo;, 높으면 &ldquo;연산 바운드&rdquo;.
          </p>
        </SubSection>
        <SubSection title="● 성능 상한">
          <BlockMath math="\text{달성 가능 성능} \leq \min\!\bigl(\text{피크 FLOPs},\ \text{대역폭} \times \text{AI}\bigr)" />
          <p className="text-sm text-muted">
            대역폭이 낮으면 AI를 아무리 높여도 대역폭 곱이 피크 FLOPs보다 먼저 한계에 달합니다.
            이 상태를 <strong>메모리 바운드</strong>라 합니다.
          </p>
        </SubSection>
        <div
          className="flex items-center gap-2 text-sm cursor-pointer text-blue-400 mt-2 select-none"
          onClick={() => setShowRoof(!showRoof)}
        >
          <span>{showRoof ? "▲" : "▼"}</span>
          <span>루프라인 그래프 {showRoof ? "접기" : "보기"}</span>
        </div>
        {showRoof && (
          <svg width="100%" viewBox="0 0 420 180" style={{ fontFamily: "sans-serif", marginTop: 8 }}>
            {/* 대역폭 경사 */}
            <line x1={50} y1={150} x2={260} y2={30} stroke="#60a5fa" strokeWidth={2} />
            {/* 피크 FLOPs 수평선 */}
            <line x1={260} y1={30} x2={400} y2={30} stroke="#f87171" strokeWidth={2} />
            {/* 실제 동작점 (메모리 바운드) */}
            <circle cx={150} cy={90} r={5} fill="#fbbf24" />
            <text x={155} y={86} fontSize={9} fill="#fbbf24">동작점 (메모리 바운드)</text>
            {/* 레이블 */}
            <text x={55} y={145} fontSize={9} fill="#60a5fa">대역폭 × AI</text>
            <text x={280} y={26} fontSize={9} fill="#f87171">피크 FLOPs</text>
            <text x={50} y={170} fontSize={9} fill="#94a3b8">낮은 AI (메모리 바운드)</text>
            <text x={330} y={170} fontSize={9} fill="#94a3b8">높은 AI (연산 바운드)</text>
            <text x={220} y={170} fontSize={8} fill="#64748b">▶ 연산 강도 (FLOPs/byte)</text>
          </svg>
        )}
      </CalcBox>

      {/* ── AI에서 더 심각 ── */}
      <CalcBox title="■ AI에서 더 심각한 이유">
        <SubSection title="● 거대 가중치">
          <p className="text-sm">
            GPT-4급 모델은 수백 GB의 가중치(파라미터)를 매 토큰 생성마다 메모리에서 읽습니다.
            추론 시 연산보다 <strong>가중치 로딩 대역폭</strong>이 실질적 병목입니다.
          </p>
        </SubSection>
        <SubSection title="● KV 캐시">
          <p className="text-sm">
            트랜스포머의 키(Key)·값(Value) 캐시는 컨텍스트 길이에 비례해 커집니다.
            컨텍스트 100K 토큰 &rarr; KV 캐시 수십~수백 GB 필요.
          </p>
        </SubSection>
        <SubSection title="● 에이전트형 AI">
          <p className="text-sm">
            생성형 &rarr; 에이전트형 AI로 진화하면서 컨텍스트 입력이 100~1,000배 증가.
            김정호 교수 로드맵: 2030년대 중반 1인당 <strong>~100 TB</strong> 메모리 요구.
          </p>
        </SubSection>
        <Insight>
          HBM(High Bandwidth Memory)은 메모리 월의 완화책입니다. HBM4(2026) 스택당
          <InlineMath math="2.0\ \text{TB/s}" />, HBM5(2029)
          <InlineMath math="4\ \text{TB/s}" />로 대역폭을 빠르게 늘려가는 이유가 여기 있습니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
