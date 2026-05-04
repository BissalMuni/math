"use client";

import { useState } from "react";
import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** 중1 > Ⅵ. 자료의 정리와 해석 > 1. 자료의 정리와 해석 */

const STEM_LEAF_DATA = [
  { stem: 2, leaves: [3] },
  { stem: 3, leaves: [5, 8] },
  { stem: 4, leaves: [1, 2, 5, 7] },
  { stem: 5, leaves: [2, 5, 8] },
  { stem: 6, leaves: [1, 3] },
];

const DOT_R = 16;
const DOT_GAP = 40;
const LEFT_PAD = 60;
const ROW_H = 46;
const TOP_PAD = 20;

export default function DataAnalysis() {
  const [hoveredScore, setHoveredScore] = useState<number | null>(null);

  const maxLeaves = Math.max(...STEM_LEAF_DATA.map((r) => r.leaves.length));
  const svgH = STEM_LEAF_DATA.length * ROW_H + TOP_PAD * 2;
  const svgW = LEFT_PAD + maxLeaves * DOT_GAP + DOT_R + 16;

  return (
    <div className="space-y-8">
      <CalcBox title="1. 줄기와 잎 그림, 도수분포표">
        <SubSection title="(1) 줄기와 잎 그림">
          <p>
            자료를 <strong>줄기</strong>(십의 자리)와 <strong>잎</strong>(일의
            자리)으로 나누어 나타낸 그림입니다.
          </p>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">예: 수학 점수 자료</p>
            <p className="text-sm mb-2">23, 35, 38, 41, 42, 45, 47, 52, 55, 58, 61, 63</p>
            <div className="font-mono text-sm space-y-1">
              <p>줄기 | 잎</p>
              <p className="border-t border-sidebar-border pt-1">2 | 3</p>
              <p>3 | 5 8</p>
              <p>4 | 1 2 5 7</p>
              <p>5 | 2 5 8</p>
              <p>6 | 1 3</p>
            </div>
          </div>

          {/* 인터랙티브 시각화 */}
          <div className="mt-4">
            <p className="text-sm font-medium mb-1">시각화: 잎의 분포</p>
            <p className="text-xs text-muted mb-3">
              각 원에 마우스를 올리면 해당 점수를 확인할 수 있습니다.
            </p>
            <div className="rounded-lg border border-sidebar-border bg-sidebar-bg p-4 overflow-x-auto">
              <svg
                width="100%"
                viewBox={`0 0 ${svgW} ${svgH}`}
                style={{ minWidth: 240 }}
              >
                {/* 줄기-잎 구분선 */}
                <line
                  x1={LEFT_PAD - 10}
                  y1={TOP_PAD - 10}
                  x2={LEFT_PAD - 10}
                  y2={svgH - TOP_PAD + 10}
                  stroke="#6366f1"
                  strokeWidth="2"
                />

                {/* 헤더 */}
                <text
                  x={LEFT_PAD - 30}
                  y={TOP_PAD - 4}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#a0a0b0"
                >
                  줄기
                </text>
                <text
                  x={LEFT_PAD + 8}
                  y={TOP_PAD - 4}
                  textAnchor="start"
                  fontSize="11"
                  fill="#a0a0b0"
                >
                  잎 (일의 자리)
                </text>

                {STEM_LEAF_DATA.map((row, rowIdx) => {
                  const cy = TOP_PAD + rowIdx * ROW_H + ROW_H / 2;
                  return (
                    <g key={row.stem}>
                      {/* 줄기 숫자 */}
                      <text
                        x={LEFT_PAD - 28}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="15"
                        fontWeight="700"
                        fill="#818cf8"
                      >
                        {row.stem}
                      </text>

                      {/* 잎 원 */}
                      {row.leaves.map((leaf, leafIdx) => {
                        const cx = LEFT_PAD + leafIdx * DOT_GAP + DOT_R;
                        const score = row.stem * 10 + leaf;
                        const isHov = hoveredScore === score;
                        return (
                          <g
                            key={leafIdx}
                            onMouseEnter={() => setHoveredScore(score)}
                            onMouseLeave={() => setHoveredScore(null)}
                            style={{ cursor: "pointer" }}
                          >
                            <circle
                              cx={cx}
                              cy={cy}
                              r={DOT_R}
                              fill={isHov ? "#6366f1" : "#312e81"}
                              stroke={isHov ? "#a5b4fc" : "#4f46e5"}
                              strokeWidth="1.5"
                            />
                            <text
                              x={cx}
                              y={cy}
                              textAnchor="middle"
                              dominantBaseline="central"
                              fontSize="13"
                              fontWeight={isHov ? "700" : "400"}
                              fill={isHov ? "#fff" : "#c7d2fe"}
                            >
                              {leaf}
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  );
                })}

                {/* 호버 시 점수 표시 */}
                {hoveredScore !== null && (
                  <g>
                    <rect
                      x={svgW - 72}
                      y={4}
                      width={66}
                      height={24}
                      rx={5}
                      fill="#6366f1"
                    />
                    <text
                      x={svgW - 39}
                      y={16}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="12"
                      fill="white"
                      fontWeight="600"
                    >
                      {hoveredScore}점
                    </text>
                  </g>
                )}
              </svg>
            </div>
            <p className="text-xs text-muted mt-2">
              40대 줄기(4행)에 잎이 4개로 가장 많아 점수가 이 구간에 집중됨을
              한눈에 알 수 있습니다.
            </p>
          </div>

          <ul className="mt-3 list-disc pl-6 space-y-1 text-sm">
            <li>자료의 분포를 한눈에 파악할 수 있습니다.</li>
            <li>원래의 자료 값을 그대로 알 수 있습니다.</li>
          </ul>
        </SubSection>

        <SubSection title="(2) 도수분포표">
          <p>
            자료를 몇 개의 <strong>계급</strong>(구간)으로 나누고, 각 계급에
            속하는 자료의 수(<strong>도수</strong>)를 세어 표로 정리한 것입니다.
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              <strong>계급</strong>: 변량을 일정한 간격으로 나눈 구간
            </li>
            <li>
              <strong>계급의 크기</strong>: 각 계급의 너비 (구간의 폭)
            </li>
            <li>
              <strong>계급값</strong>: 각 계급의 가운데 값
            </li>
            <li>
              <strong>도수</strong>: 각 계급에 속하는 자료의 수
            </li>
          </ul>
          <div className="mt-3 rounded-lg border border-sidebar-border p-4">
            <p className="font-medium mb-2">예: 계급의 크기가 10인 경우</p>
            <table className="w-full text-center text-sm">
              <thead>
                <tr className="border-b border-sidebar-border">
                  <td className="py-1 font-medium">계급 (점)</td>
                  <td className="py-1 font-medium">계급값</td>
                  <td className="py-1 font-medium">도수 (명)</td>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-sidebar-border">
                  <td className="py-1">20 이상 ~ 30 미만</td>
                  <td className="py-1">25</td>
                  <td className="py-1">1</td>
                </tr>
                <tr className="border-b border-sidebar-border">
                  <td className="py-1">30 이상 ~ 40 미만</td>
                  <td className="py-1">35</td>
                  <td className="py-1">2</td>
                </tr>
                <tr className="border-b border-sidebar-border">
                  <td className="py-1">40 이상 ~ 50 미만</td>
                  <td className="py-1">45</td>
                  <td className="py-1">4</td>
                </tr>
                <tr className="border-b border-sidebar-border">
                  <td className="py-1">50 이상 ~ 60 미만</td>
                  <td className="py-1">55</td>
                  <td className="py-1">3</td>
                </tr>
                <tr>
                  <td className="py-1">60 이상 ~ 70 미만</td>
                  <td className="py-1">65</td>
                  <td className="py-1">2</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-2 text-right text-sm font-medium">합계: 12명</p>
          </div>
        </SubSection>

        <Insight>
          도수분포표를 만들면 자료의 전체적인 분포를 쉽게 파악할 수 있지만,
          원래의 자료 값은 알 수 없게 됩니다.
        </Insight>
      </CalcBox>

      <CalcBox title="2. 히스토그램과 도수분포다각형">
        <SubSection title="(1) 히스토그램">
          <p>
            도수분포표를 <strong>직사각형 막대 그래프</strong>로 나타낸 것입니다.
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>가로축: 계급 (변량의 구간)</li>
            <li>세로축: 도수</li>
            <li>각 직사각형의 가로 = 계급의 크기, 세로 = 도수</li>
            <li>
              직사각형들이 서로 <strong>붙어 있다</strong> (일반 막대그래프와의
              차이)
            </li>
          </ul>
        </SubSection>

        <SubSection title="(2) 히스토그램의 성질">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              (각 직사각형의 넓이) = (계급의 크기) <InlineMath math="\times" />{" "}
              (그 계급의 도수)
            </li>
            <li>
              (모든 직사각형의 넓이의 합) = (계급의 크기) <InlineMath math="\times" />{" "}
              (도수의 총합)
            </li>
          </ul>
        </SubSection>

        <SubSection title="(3) 도수분포다각형">
          <p>
            히스토그램에서 각 직사각형의 윗변의 <strong>가운데 점</strong>
            (계급값의 위치)을 선분으로 연결한 그래프입니다.
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              양 끝에 도수가 0인 계급을 하나씩 추가하여 가로축과 만나게 합니다.
            </li>
            <li>
              도수분포다각형과 가로축으로 둘러싸인 부분의 넓이는 히스토그램의
              넓이와 같습니다.
            </li>
          </ul>
        </SubSection>
      </CalcBox>

      <CalcBox title="3. 상대도수">
        <SubSection title="(1) 상대도수의 뜻">
          <p>
            각 계급의 도수를 도수의 총합으로 나눈 값을{" "}
            <strong>상대도수</strong>라고 합니다.
          </p>
          <BlockMath math="\text{(상대도수)} = \frac{\text{(그 계급의 도수)}}{\text{(도수의 총합)}}" />
        </SubSection>

        <SubSection title="(2) 상대도수의 성질">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              각 계급의 상대도수는 0 이상 1 이하입니다.
            </li>
            <li>
              모든 계급의 상대도수의 합은 <InlineMath math="1" />입니다.
            </li>
          </ul>
        </SubSection>

        <SubSection title="(3) 상대도수의 계산 예시">
          <div className="rounded-lg border border-sidebar-border p-4">
            <table className="w-full text-center text-sm">
              <thead>
                <tr className="border-b border-sidebar-border">
                  <td className="py-1 font-medium">계급 (점)</td>
                  <td className="py-1 font-medium">도수</td>
                  <td className="py-1 font-medium">상대도수</td>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-sidebar-border">
                  <td className="py-1">20 ~ 30</td>
                  <td className="py-1">1</td>
                  <td className="py-1"><InlineMath math="\frac{1}{12} \approx 0.08" /></td>
                </tr>
                <tr className="border-b border-sidebar-border">
                  <td className="py-1">30 ~ 40</td>
                  <td className="py-1">2</td>
                  <td className="py-1"><InlineMath math="\frac{2}{12} \approx 0.17" /></td>
                </tr>
                <tr className="border-b border-sidebar-border">
                  <td className="py-1">40 ~ 50</td>
                  <td className="py-1">4</td>
                  <td className="py-1"><InlineMath math="\frac{4}{12} \approx 0.33" /></td>
                </tr>
                <tr className="border-b border-sidebar-border">
                  <td className="py-1">50 ~ 60</td>
                  <td className="py-1">3</td>
                  <td className="py-1"><InlineMath math="\frac{3}{12} = 0.25" /></td>
                </tr>
                <tr>
                  <td className="py-1">60 ~ 70</td>
                  <td className="py-1">2</td>
                  <td className="py-1"><InlineMath math="\frac{2}{12} \approx 0.17" /></td>
                </tr>
              </tbody>
            </table>
            <p className="mt-2 text-right text-sm font-medium">합계: 12명 / 1.00</p>
          </div>
        </SubSection>

        <SubSection title="(4) 상대도수의 활용">
          <p>
            도수의 총합이 다른 두 집단의 분포를 비교할 때{" "}
            <strong>상대도수</strong>를 사용합니다.
          </p>
          <p className="mt-2">
            예: A반(30명)과 B반(40명)의 수학 성적 분포를 비교할 때, 도수만으로는
            공정한 비교가 어렵지만 상대도수를 구하면 비율로 비교할 수 있습니다.
          </p>
        </SubSection>

        <Insight>
          상대도수는 전체에서 각 계급이 차지하는 <strong>비율</strong>을
          나타냅니다. 상대도수에 100을 곱하면 백분율(%)이 됩니다.
        </Insight>
      </CalcBox>
    </div>
  );
}
