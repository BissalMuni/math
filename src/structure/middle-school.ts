import type { CategoryRoot } from "./types";

/** 중학교 수학 교육과정 (2022 개정) */
export const middleSchool: CategoryRoot = {
  id: "middle",
  basePath: "middle",
  title: "중학교 수학",
  description: "중학교 1~3학년 수학 (2022 개정 교육과정)",
  children: [
    // ── 중학교 1학년 ──
    {
      id: "m1",
      slug: "1",
      title: "중학교 1학년",
      children: [
        {
          id: "m1-ch1",
          slug: "number-operation",
          title: "Ⅰ. 수와 연산",
          children: [
            {
              id: "m1-s1",
              slug: "prime-factorization",
              title: "1. 소인수분해",
              children: [
                { id: "m1-t1", slug: "prime-factorization-concept", title: "소인수분해" },
                { id: "m1-t2", slug: "gcd-lcm", title: "최대공약수와 최소공배수" },
              ],
            },
            {
              id: "m1-s2",
              slug: "integer-rational",
              title: "2. 정수와 유리수",
              children: [
                { id: "m1-t3", slug: "integer-rational-concept", title: "정수와 유리수의 개념" },
                { id: "m1-t4", slug: "add-subtract", title: "정수와 유리수의 덧셈과 뺄셈" },
                { id: "m1-t5", slug: "multiply-divide", title: "정수와 유리수의 곱셈과 나눗셈" },
              ],
            },
          ],
        },
        {
          id: "m1-ch2",
          slug: "expression",
          title: "Ⅱ. 문자와 식",
          children: [
            {
              id: "m1-s3",
              slug: "variable-expression",
              title: "1. 문자의 사용과 식의 계산",
              children: [
                { id: "m1-t6", slug: "variable-usage", title: "문자의 사용" },
                { id: "m1-t7", slug: "expression-value", title: "식의 값" },
                { id: "m1-t8", slug: "linear-expression-calc", title: "일차식의 계산" },
              ],
            },
            {
              id: "m1-s4",
              slug: "linear-equation",
              title: "2. 일차방정식",
              children: [
                { id: "m1-t9", slug: "equation-solution", title: "방정식과 그 해" },
                { id: "m1-t10", slug: "solving-linear-eq", title: "일차방정식의 풀이" },
                { id: "m1-t11", slug: "linear-eq-application", title: "일차방정식의 활용" },
              ],
            },
          ],
        },
        {
          id: "m1-ch3",
          slug: "coordinate-graph",
          title: "Ⅲ. 좌표평면과 그래프",
          children: [
            {
              id: "m1-s5",
              slug: "coordinate-plane-graph",
              title: "1. 좌표평면과 그래프",
              children: [
                { id: "m1-t12", slug: "ordered-pair-coordinate", title: "순서쌍과 좌표평면" },
                { id: "m1-t13", slug: "graph-interpretation", title: "그래프의 해석" },
                { id: "m1-t14", slug: "direct-inverse-proportion", title: "정비례와 반비례" },
              ],
            },
          ],
        },
        {
          id: "m1-ch4",
          slug: "basic-figure",
          title: "Ⅳ. 기본 도형과 작도",
          children: [
            {
              id: "m1-s6",
              slug: "basic-figure-concept",
              title: "1. 기본 도형",
              children: [
                { id: "m1-t15", slug: "point-line-surface-angle", title: "점, 선, 면, 각" },
                { id: "m1-t16", slug: "positional-relation", title: "위치 관계" },
              ],
            },
            {
              id: "m1-s7",
              slug: "construction-congruence",
              title: "2. 작도와 합동",
              children: [
                { id: "m1-t17", slug: "triangle-construction", title: "삼각형의 작도" },
                { id: "m1-t18", slug: "triangle-congruence", title: "삼각형의 합동 조건" },
              ],
            },
          ],
        },
        {
          id: "m1-ch5",
          slug: "plane-solid",
          title: "Ⅴ. 평면도형과 입체도형",
          children: [
            {
              id: "m1-s8",
              slug: "plane-figure",
              title: "1. 평면도형의 성질",
              children: [
                { id: "m1-t19", slug: "polygon-property", title: "다각형의 성질 (내각, 외각)" },
                { id: "m1-t20", slug: "circle-sector", title: "원과 부채꼴의 성질" },
              ],
            },
            {
              id: "m1-s9",
              slug: "solid-figure",
              title: "2. 입체도형의 성질",
              children: [
                { id: "m1-t21", slug: "polyhedron-revolution", title: "다면체와 회전체" },
                { id: "m1-t22", slug: "surface-area-volume", title: "입체도형의 겉넓이와 부피" },
              ],
            },
          ],
        },
        {
          id: "m1-ch6",
          slug: "data",
          title: "Ⅵ. 자료의 정리와 해석",
          children: [
            {
              id: "m1-s10",
              slug: "data-analysis",
              title: "1. 자료의 정리와 해석",
              children: [
                { id: "m1-t23", slug: "stem-leaf-frequency", title: "줄기와 잎 그림, 도수분포표" },
                { id: "m1-t24", slug: "histogram-polygon", title: "히스토그램과 도수분포다각형" },
                { id: "m1-t25", slug: "relative-frequency", title: "상대도수" },
              ],
            },
          ],
        },
      ],
    },

    // ── 중학교 2학년 ──
    {
      id: "m2",
      slug: "2",
      title: "중학교 2학년",
      children: [
        {
          id: "m2-ch1",
          slug: "number-expression",
          title: "Ⅰ. 수와 식",
          children: [
            {
              id: "m2-s1",
              slug: "rational-repeating",
              title: "1. 유리수와 순환소수",
              children: [
                { id: "m2-t1", slug: "rational-repeating-decimal", title: "유리수와 순환소수" },
                { id: "m2-t2", slug: "repeating-to-fraction", title: "순환소수의 분수 표현" },
              ],
            },
            {
              id: "m2-s2",
              slug: "polynomial-calc",
              title: "2. 식의 계산",
              children: [
                { id: "m2-t3", slug: "monomial-calc", title: "단항식의 계산" },
                { id: "m2-t4", slug: "polynomial-calc-concept", title: "다항식의 계산" },
              ],
            },
          ],
        },
        {
          id: "m2-ch2",
          slug: "inequality-equation",
          title: "Ⅱ. 부등식과 연립방정식",
          children: [
            {
              id: "m2-s3",
              slug: "linear-inequality",
              title: "1. 일차부등식",
              children: [
                { id: "m2-t5", slug: "inequality-property", title: "부등식의 성질" },
                { id: "m2-t6", slug: "solving-linear-ineq", title: "일차부등식의 풀이" },
                { id: "m2-t7", slug: "linear-ineq-application", title: "일차부등식의 활용" },
              ],
            },
            {
              id: "m2-s4",
              slug: "simultaneous-equation",
              title: "2. 연립일차방정식",
              children: [
                { id: "m2-t8", slug: "solving-simultaneous-eq", title: "연립일차방정식의 풀이" },
                { id: "m2-t9", slug: "simultaneous-eq-application", title: "연립일차방정식의 활용" },
              ],
            },
          ],
        },
        {
          id: "m2-ch3",
          slug: "linear-function",
          title: "Ⅲ. 일차함수",
          children: [
            {
              id: "m2-s5",
              slug: "linear-func-graph",
              title: "1. 일차함수와 그래프",
              children: [
                { id: "m2-t10", slug: "function-concept", title: "함수의 개념" },
                { id: "m2-t11", slug: "linear-func-meaning-graph", title: "일차함수의 뜻과 그래프" },
                { id: "m2-t12", slug: "slope-intercept", title: "일차함수의 기울기와 절편" },
                { id: "m2-t13", slug: "linear-func-graph-property", title: "일차함수의 그래프의 성질" },
              ],
            },
            {
              id: "m2-s6",
              slug: "linear-func-equation",
              title: "2. 일차함수와 일차방정식의 관계",
              children: [
                { id: "m2-t14", slug: "func-equation-relation", title: "일차함수와 일차방정식" },
                { id: "m2-t15", slug: "func-simultaneous-solution", title: "일차함수와 연립방정식의 해" },
              ],
            },
          ],
        },
        {
          id: "m2-ch4",
          slug: "triangle-quadrilateral",
          title: "Ⅳ. 삼각형과 사각형의 성질",
          children: [
            {
              id: "m2-s7",
              slug: "triangle-property",
              title: "1. 삼각형의 성질",
              children: [
                { id: "m2-t16", slug: "isosceles-triangle", title: "이등변삼각형의 성질" },
                { id: "m2-t17", slug: "circumcenter-incenter", title: "삼각형의 외심과 내심" },
              ],
            },
            {
              id: "m2-s8",
              slug: "quadrilateral-property",
              title: "2. 사각형의 성질",
              children: [
                { id: "m2-t18", slug: "parallelogram", title: "평행사변형의 성질" },
                { id: "m2-t19", slug: "various-quadrilateral", title: "여러 가지 사각형" },
                { id: "m2-t20", slug: "parallel-line-area", title: "평행선과 넓이" },
              ],
            },
          ],
        },
        {
          id: "m2-ch5",
          slug: "similarity",
          title: "Ⅴ. 도형의 닮음",
          children: [
            {
              id: "m2-s9",
              slug: "similarity-concept",
              title: "1. 도형의 닮음",
              children: [
                { id: "m2-t21", slug: "similar-figure-property", title: "닮은 도형의 성질" },
                { id: "m2-t22", slug: "triangle-similarity-condition", title: "삼각형의 닮음 조건" },
              ],
            },
            {
              id: "m2-s10",
              slug: "parallel-line-ratio",
              title: "2. 평행선과 선분의 비",
              children: [
                { id: "m2-t23", slug: "parallel-segment-ratio", title: "삼각형에서 평행선과 선분의 비" },
                { id: "m2-t24", slug: "midpoint-theorem", title: "삼각형의 중점연결정리" },
                { id: "m2-t25", slug: "similarity-application", title: "닮음의 활용" },
              ],
            },
          ],
        },
        {
          id: "m2-ch6",
          slug: "probability",
          title: "Ⅵ. 확률",
          children: [
            {
              id: "m2-s11",
              slug: "counting",
              title: "1. 경우의 수",
              children: [
                { id: "m2-t26", slug: "counting-cases", title: "경우의 수" },
                { id: "m2-t27", slug: "addition-multiplication-rule", title: "합의 법칙과 곱의 법칙" },
              ],
            },
            {
              id: "m2-s12",
              slug: "probability-concept",
              title: "2. 확률",
              children: [
                { id: "m2-t28", slug: "probability-meaning-property", title: "확률의 뜻과 성질" },
                { id: "m2-t29", slug: "probability-calculation", title: "확률의 계산" },
              ],
            },
          ],
        },
      ],
    },

    // ── 중학교 3학년 ──
    {
      id: "m3",
      slug: "3",
      title: "중학교 3학년",
      children: [
        {
          id: "m3-ch1",
          slug: "real-number",
          title: "Ⅰ. 실수와 그 계산",
          children: [
            {
              id: "m3-s1",
              slug: "square-root-real",
              title: "1. 제곱근과 실수",
              children: [
                { id: "m3-t1", slug: "square-root-meaning", title: "제곱근의 뜻과 성질" },
                { id: "m3-t2", slug: "irrational-real", title: "무리수와 실수" },
                { id: "m3-t3", slug: "real-number-order", title: "실수의 대소 관계" },
              ],
            },
            {
              id: "m3-s2",
              slug: "radical-calc",
              title: "2. 근호를 포함한 식의 계산",
              children: [
                { id: "m3-t4", slug: "radical-multiply-divide", title: "제곱근의 곱셈과 나눗셈" },
                { id: "m3-t5", slug: "radical-add-subtract", title: "제곱근의 덧셈과 뺄셈" },
              ],
            },
          ],
        },
        {
          id: "m3-ch2",
          slug: "polynomial-factorization",
          title: "Ⅱ. 다항식의 곱셈과 인수분해",
          children: [
            {
              id: "m3-s3",
              slug: "polynomial-multiplication",
              title: "1. 다항식의 곱셈",
              children: [
                { id: "m3-t6", slug: "polynomial-multiply", title: "다항식의 곱셈" },
                { id: "m3-t7", slug: "multiplication-formula", title: "곱셈 공식" },
              ],
            },
            {
              id: "m3-s4",
              slug: "factorization",
              title: "2. 인수분해",
              children: [
                { id: "m3-t8", slug: "factorization-concept", title: "인수분해" },
                { id: "m3-t9", slug: "factorization-application", title: "인수분해 공식의 활용" },
              ],
            },
          ],
        },
        {
          id: "m3-ch3",
          slug: "quadratic-equation",
          title: "Ⅲ. 이차방정식",
          children: [
            {
              id: "m3-s5",
              slug: "solving-quadratic",
              title: "1. 이차방정식의 풀이",
              children: [
                { id: "m3-t10", slug: "quadratic-eq-meaning", title: "이차방정식과 그 해" },
                { id: "m3-t11", slug: "factoring-method", title: "인수분해를 이용한 풀이" },
                { id: "m3-t12", slug: "square-root-method", title: "제곱근을 이용한 풀이" },
                { id: "m3-t13", slug: "quadratic-formula", title: "이차방정식의 근의 공식" },
              ],
            },
            {
              id: "m3-s6",
              slug: "quadratic-eq-application",
              title: "2. 이차방정식의 활용",
              children: [
                { id: "m3-t14", slug: "quadratic-eq-word-problem", title: "이차방정식의 활용" },
              ],
            },
          ],
        },
        {
          id: "m3-ch4",
          slug: "quadratic-function",
          title: "Ⅳ. 이차함수",
          children: [
            {
              id: "m3-s7",
              slug: "quadratic-func-graph",
              title: "1. 이차함수와 그래프",
              children: [
                { id: "m3-t15", slug: "y-ax2-graph", title: "이차함수 y = ax²의 그래프" },
                { id: "m3-t16", slug: "y-axpq-graph", title: "이차함수 y = a(x-p)² + q의 그래프" },
                { id: "m3-t17", slug: "y-ax2bxc-graph", title: "이차함수 y = ax² + bx + c의 그래프" },
              ],
            },
            {
              id: "m3-s8",
              slug: "quadratic-func-application",
              title: "2. 이차함수의 활용",
              children: [
                { id: "m3-t18", slug: "max-min-value", title: "이차함수의 최댓값과 최솟값" },
                { id: "m3-t19", slug: "quadratic-func-word-problem", title: "이차함수의 활용" },
              ],
            },
          ],
        },
        {
          id: "m3-ch5",
          slug: "pythagorean",
          title: "Ⅴ. 피타고라스 정리",
          children: [
            {
              id: "m3-s9",
              slug: "pythagorean-theorem",
              title: "1. 피타고라스 정리",
              children: [
                { id: "m3-t20", slug: "pythagorean-theorem-concept", title: "피타고라스 정리" },
                { id: "m3-t21", slug: "pythagorean-converse", title: "피타고라스 정리의 역" },
              ],
            },
            {
              id: "m3-s10",
              slug: "pythagorean-application",
              title: "2. 피타고라스 정리의 활용",
              children: [
                { id: "m3-t22", slug: "plane-figure-application", title: "평면도형에서의 활용" },
                { id: "m3-t23", slug: "distance-two-points", title: "좌표평면에서 두 점 사이의 거리" },
              ],
            },
          ],
        },
        {
          id: "m3-ch6",
          slug: "statistics",
          title: "Ⅵ. 통계",
          children: [
            {
              id: "m3-s11",
              slug: "representative-dispersion",
              title: "1. 대푯값과 산포도",
              children: [
                { id: "m3-t24", slug: "mean-median-mode", title: "평균, 중앙값, 최빈값" },
                { id: "m3-t25", slug: "variance-std-dev", title: "분산과 표준편차" },
              ],
            },
            {
              id: "m3-s12",
              slug: "correlation",
              title: "2. 상관관계",
              children: [
                { id: "m3-t26", slug: "scatter-plot", title: "산점도" },
                { id: "m3-t27", slug: "correlation-concept", title: "상관관계" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
