import type { CategoryRoot } from "./types";

/** 고등학교 수학 교육과정 (2022 개정) */
export const highSchool: CategoryRoot = {
  id: "high",
  basePath: "high",
  title: "고등학교 수학",
  description: "고등학교 수학 (2022 개정 교육과정)",
  children: [
    // ── 공통수학1 ──
    {
      id: "h-cm1",
      slug: "common-math1",
      title: "공통수학1",
      children: [
        {
          id: "h-cm1-ch1",
          slug: "polynomial",
          title: "Ⅰ. 다항식",
          children: [
            {
              id: "h-cm1-s1",
              slug: "polynomial-operation",
              title: "1. 다항식의 연산",
              children: [
                { id: "h-cm1-t1", slug: "poly-add-subtract", title: "다항식의 덧셈과 뺄셈" },
                { id: "h-cm1-t2", slug: "poly-multiply", title: "다항식의 곱셈" },
                { id: "h-cm1-t3", slug: "poly-divide", title: "다항식의 나눗셈" },
              ],
            },
            {
              id: "h-cm1-s2",
              slug: "remainder-factorization",
              title: "2. 나머지정리와 인수분해",
              children: [
                { id: "h-cm1-t4", slug: "remainder-factor-theorem", title: "나머지정리와 인수정리" },
                { id: "h-cm1-t5", slug: "factorization", title: "인수분해" },
              ],
            },
          ],
        },
        {
          id: "h-cm1-ch2",
          slug: "equation-inequality",
          title: "Ⅱ. 방정식과 부등식",
          children: [
            {
              id: "h-cm1-s3",
              slug: "complex-quadratic",
              title: "1. 복소수와 이차방정식",
              children: [
                { id: "h-cm1-t6", slug: "complex-number-operation", title: "복소수와 그 연산" },
                { id: "h-cm1-t7", slug: "discriminant", title: "이차방정식의 판별식" },
                { id: "h-cm1-t8", slug: "root-coefficient-relation", title: "이차방정식의 근과 계수의 관계" },
              ],
            },
            {
              id: "h-cm1-s4",
              slug: "quadratic-eq-func",
              title: "2. 이차방정식과 이차함수",
              children: [
                { id: "h-cm1-t9", slug: "quadratic-graph-eq-relation", title: "이차함수의 그래프와 이차방정식의 관계" },
                { id: "h-cm1-t10", slug: "quadratic-max-min", title: "이차함수의 최대·최소" },
              ],
            },
            {
              id: "h-cm1-s5",
              slug: "various-eq-ineq",
              title: "3. 여러 가지 방정식과 부등식",
              children: [
                { id: "h-cm1-t11", slug: "cubic-quartic-eq", title: "삼차방정식과 사차방정식" },
                { id: "h-cm1-t12", slug: "simultaneous-eq", title: "연립방정식" },
                { id: "h-cm1-t13", slug: "quadratic-ineq", title: "이차부등식과 연립부등식" },
              ],
            },
          ],
        },
        {
          id: "h-cm1-ch3",
          slug: "counting",
          title: "Ⅲ. 경우의 수",
          children: [
            {
              id: "h-cm1-s6",
              slug: "permutation-combination",
              title: "1. 순열과 조합",
              children: [
                { id: "h-cm1-t14", slug: "permutation", title: "순열" },
                { id: "h-cm1-t15", slug: "combination", title: "조합" },
              ],
            },
          ],
        },
      ],
    },

    // ── 공통수학2 ──
    {
      id: "h-cm2",
      slug: "common-math2",
      title: "공통수학2",
      children: [
        {
          id: "h-cm2-ch1",
          slug: "function",
          title: "Ⅰ. 함수",
          children: [
            {
              id: "h-cm2-s1",
              slug: "function-concept",
              title: "1. 함수",
              children: [
                { id: "h-cm2-t1", slug: "function-meaning-graph", title: "함수의 뜻과 그래프" },
                { id: "h-cm2-t2", slug: "composite-function", title: "합성함수" },
                { id: "h-cm2-t3", slug: "inverse-function", title: "역함수" },
              ],
            },
            {
              id: "h-cm2-s2",
              slug: "rational-irrational-func",
              title: "2. 유리함수와 무리함수",
              children: [
                { id: "h-cm2-t4", slug: "rational-function", title: "유리함수" },
                { id: "h-cm2-t5", slug: "irrational-function", title: "무리함수" },
              ],
            },
          ],
        },
        {
          id: "h-cm2-ch2",
          slug: "transformation",
          title: "Ⅱ. 도형의 이동",
          children: [
            {
              id: "h-cm2-s3",
              slug: "figure-transformation",
              title: "1. 도형의 이동",
              children: [
                { id: "h-cm2-t6", slug: "translation", title: "평행이동" },
                { id: "h-cm2-t7", slug: "reflection", title: "대칭이동" },
              ],
            },
          ],
        },
        {
          id: "h-cm2-ch3",
          slug: "line-circle-eq",
          title: "Ⅲ. 직선과 원의 방정식",
          children: [
            {
              id: "h-cm2-s4",
              slug: "line-equation",
              title: "1. 직선의 방정식",
              children: [
                { id: "h-cm2-t8", slug: "distance-two-points", title: "두 점 사이의 거리" },
                { id: "h-cm2-t9", slug: "division-point", title: "내분점과 외분점" },
                { id: "h-cm2-t10", slug: "line-eq", title: "직선의 방정식" },
                { id: "h-cm2-t11", slug: "two-line-relation", title: "두 직선의 관계" },
                { id: "h-cm2-t12", slug: "point-line-distance", title: "점과 직선 사이의 거리" },
              ],
            },
            {
              id: "h-cm2-s5",
              slug: "circle-equation",
              title: "2. 원의 방정식",
              children: [
                { id: "h-cm2-t13", slug: "circle-eq", title: "원의 방정식" },
                { id: "h-cm2-t14", slug: "line-circle-position", title: "직선과 원의 위치 관계" },
              ],
            },
          ],
        },
      ],
    },

    // ── 대수 ──
    {
      id: "h-alg",
      slug: "algebra",
      title: "대수",
      children: [
        {
          id: "h-alg-ch1",
          slug: "set-proposition",
          title: "Ⅰ. 집합과 명제",
          children: [
            {
              id: "h-alg-s1",
              slug: "set",
              title: "1. 집합",
              children: [
                { id: "h-alg-t1", slug: "set-meaning-expression", title: "집합의 뜻과 표현" },
                { id: "h-alg-t2", slug: "set-inclusion", title: "집합 사이의 포함 관계" },
                { id: "h-alg-t3", slug: "set-operation", title: "집합의 연산" },
              ],
            },
            {
              id: "h-alg-s2",
              slug: "proposition",
              title: "2. 명제",
              children: [
                { id: "h-alg-t4", slug: "proposition-condition", title: "명제와 조건" },
                { id: "h-alg-t5", slug: "converse-contrapositive", title: "명제의 역과 대우" },
                { id: "h-alg-t6", slug: "sufficient-necessary", title: "충분조건과 필요조건" },
                { id: "h-alg-t7", slug: "absolute-inequality-proof", title: "절대부등식의 증명" },
              ],
            },
          ],
        },
        {
          id: "h-alg-ch2",
          slug: "function-graph",
          title: "Ⅱ. 함수와 그래프",
          children: [
            {
              id: "h-alg-s3",
              slug: "various-function",
              title: "1. 함수",
              children: [
                { id: "h-alg-t8", slug: "various-functions", title: "여러 가지 함수" },
              ],
            },
            {
              id: "h-alg-s4",
              slug: "rational-irrational-application",
              title: "2. 유리함수와 무리함수의 활용",
              children: [
                { id: "h-alg-t9", slug: "rational-expression-application", title: "유리식과 유리함수의 활용" },
                { id: "h-alg-t10", slug: "irrational-expression-application", title: "무리식과 무리함수의 활용" },
              ],
            },
          ],
        },
        {
          id: "h-alg-ch3",
          slug: "exponent-logarithm",
          title: "Ⅲ. 지수와 로그",
          children: [
            {
              id: "h-alg-s5",
              slug: "exponent",
              title: "1. 지수",
              children: [
                { id: "h-alg-t11", slug: "power-root", title: "거듭제곱과 거듭제곱근" },
                { id: "h-alg-t12", slug: "exponent-extension", title: "지수의 확장" },
              ],
            },
            {
              id: "h-alg-s6",
              slug: "logarithm",
              title: "2. 로그",
              children: [
                { id: "h-alg-t13", slug: "log-meaning-property", title: "로그의 뜻과 성질" },
                { id: "h-alg-t14", slug: "common-log", title: "상용로그" },
              ],
            },
          ],
        },
        {
          id: "h-alg-ch4",
          slug: "exp-log-function",
          title: "Ⅳ. 지수함수와 로그함수",
          children: [
            {
              id: "h-alg-s7",
              slug: "exp-log-func",
              title: "1. 지수함수와 로그함수",
              children: [
                { id: "h-alg-t15", slug: "exp-func-graph", title: "지수함수의 그래프와 성질" },
                { id: "h-alg-t16", slug: "log-func-graph", title: "로그함수의 그래프와 성질" },
              ],
            },
            {
              id: "h-alg-s8",
              slug: "exp-log-equation",
              title: "2. 지수방정식과 로그방정식",
              children: [
                { id: "h-alg-t17", slug: "exp-equation", title: "지수방정식" },
                { id: "h-alg-t18", slug: "log-equation", title: "로그방정식" },
              ],
            },
            {
              id: "h-alg-s9",
              slug: "exp-log-inequality",
              title: "3. 지수부등식과 로그부등식",
              children: [
                { id: "h-alg-t19", slug: "exp-inequality", title: "지수부등식" },
                { id: "h-alg-t20", slug: "log-inequality", title: "로그부등식" },
              ],
            },
          ],
        },
      ],
    },

    // ── 미적분Ⅰ ──
    {
      id: "h-cal1",
      slug: "calculus1",
      title: "미적분Ⅰ",
      children: [
        {
          id: "h-cal1-ch1",
          slug: "sequence",
          title: "Ⅰ. 수열",
          children: [
            {
              id: "h-cal1-s1",
              slug: "arithmetic-geometric",
              title: "1. 등차수열과 등비수열",
              children: [
                { id: "h-cal1-t1", slug: "arithmetic-sequence", title: "등차수열" },
                { id: "h-cal1-t2", slug: "geometric-sequence", title: "등비수열" },
              ],
            },
            {
              id: "h-cal1-s2",
              slug: "series",
              title: "2. 수열의 합",
              children: [
                { id: "h-cal1-t3", slug: "sigma-notation", title: "합의 기호 Σ" },
                { id: "h-cal1-t4", slug: "various-series", title: "여러 가지 수열의 합" },
              ],
            },
            {
              id: "h-cal1-s3",
              slug: "mathematical-induction",
              title: "3. 수학적 귀납법",
              children: [
                { id: "h-cal1-t5", slug: "math-induction", title: "수학적 귀납법" },
              ],
            },
          ],
        },
        {
          id: "h-cal1-ch2",
          slug: "limit-continuity",
          title: "Ⅱ. 함수의 극한과 연속",
          children: [
            {
              id: "h-cal1-s4",
              slug: "function-limit",
              title: "1. 함수의 극한",
              children: [
                { id: "h-cal1-t6", slug: "limit-value", title: "함수의 극한값" },
                { id: "h-cal1-t7", slug: "limit-property", title: "함수의 극한에 대한 성질" },
              ],
            },
            {
              id: "h-cal1-s5",
              slug: "function-continuity",
              title: "2. 함수의 연속",
              children: [
                { id: "h-cal1-t8", slug: "continuity", title: "함수의 연속" },
                { id: "h-cal1-t9", slug: "continuous-func-property", title: "연속함수의 성질" },
              ],
            },
          ],
        },
        {
          id: "h-cal1-ch3",
          slug: "polynomial-differentiation",
          title: "Ⅲ. 다항함수의 미분법",
          children: [
            {
              id: "h-cal1-s6",
              slug: "derivative",
              title: "1. 미분계수와 도함수",
              children: [
                { id: "h-cal1-t10", slug: "derivative-coefficient", title: "미분계수" },
                { id: "h-cal1-t11", slug: "derivative-function", title: "도함수" },
                { id: "h-cal1-t12", slug: "differentiation-formula", title: "미분법의 공식" },
              ],
            },
            {
              id: "h-cal1-s7",
              slug: "derivative-application",
              title: "2. 도함수의 활용",
              children: [
                { id: "h-cal1-t13", slug: "tangent-line", title: "접선의 방정식" },
                { id: "h-cal1-t14", slug: "increasing-decreasing", title: "함수의 증가와 감소" },
                { id: "h-cal1-t15", slug: "extrema-max-min", title: "함수의 극대·극소와 최대·최소" },
                { id: "h-cal1-t16", slug: "eq-ineq-application", title: "방정식과 부등식에의 활용" },
                { id: "h-cal1-t17", slug: "velocity-acceleration", title: "속도와 가속도" },
              ],
            },
          ],
        },
        {
          id: "h-cal1-ch4",
          slug: "polynomial-integration",
          title: "Ⅳ. 다항함수의 적분법",
          children: [
            {
              id: "h-cal1-s8",
              slug: "indefinite-definite-integral",
              title: "1. 부정적분과 정적분",
              children: [
                { id: "h-cal1-t18", slug: "indefinite-integral", title: "부정적분" },
                { id: "h-cal1-t19", slug: "definite-integral", title: "정적분" },
                { id: "h-cal1-t20", slug: "definite-integral-property", title: "정적분의 성질" },
              ],
            },
            {
              id: "h-cal1-s9",
              slug: "integral-application",
              title: "2. 정적분의 활용",
              children: [
                { id: "h-cal1-t21", slug: "area", title: "넓이" },
                { id: "h-cal1-t22", slug: "velocity-distance", title: "속도와 거리" },
              ],
            },
          ],
        },
      ],
    },

    // ── 확률과 통계 ──
    {
      id: "h-ps",
      slug: "prob-stat",
      title: "확률과 통계",
      children: [
        {
          id: "h-ps-ch1",
          slug: "probability",
          title: "Ⅰ. 확률",
          children: [
            {
              id: "h-ps-s1",
              slug: "probability-usage",
              title: "1. 확률의 뜻과 활용",
              children: [
                { id: "h-ps-t1", slug: "trial-event", title: "시행과 사건" },
                { id: "h-ps-t2", slug: "probability-meaning", title: "확률의 뜻과 성질" },
                { id: "h-ps-t3", slug: "addition-rule", title: "확률의 덧셈정리" },
              ],
            },
            {
              id: "h-ps-s2",
              slug: "conditional-probability",
              title: "2. 조건부확률",
              children: [
                { id: "h-ps-t4", slug: "conditional-prob", title: "조건부확률" },
                { id: "h-ps-t5", slug: "multiplication-rule", title: "확률의 곱셈정리" },
                { id: "h-ps-t6", slug: "independence", title: "독립과 종속" },
                { id: "h-ps-t7", slug: "independent-trial", title: "독립시행의 확률" },
              ],
            },
          ],
        },
        {
          id: "h-ps-ch2",
          slug: "statistics",
          title: "Ⅱ. 통계",
          children: [
            {
              id: "h-ps-s3",
              slug: "probability-distribution",
              title: "1. 확률분포",
              children: [
                { id: "h-ps-t8", slug: "random-variable", title: "확률변수와 확률분포" },
                { id: "h-ps-t9", slug: "discrete-expected-variance", title: "이산확률변수의 기댓값, 분산, 표준편차" },
                { id: "h-ps-t10", slug: "binomial-distribution", title: "이항분포" },
                { id: "h-ps-t11", slug: "normal-distribution", title: "정규분포" },
              ],
            },
            {
              id: "h-ps-s4",
              slug: "statistical-estimation",
              title: "2. 통계적 추정",
              children: [
                { id: "h-ps-t12", slug: "population-sample", title: "모집단과 표본" },
                { id: "h-ps-t13", slug: "sample-mean-distribution", title: "표본평균의 분포" },
                { id: "h-ps-t14", slug: "mean-estimation", title: "모평균의 추정" },
              ],
            },
          ],
        },
      ],
    },

    // ── 미적분Ⅱ ──
    {
      id: "h-cal2",
      slug: "calculus2",
      title: "미적분Ⅱ",
      children: [
        {
          id: "h-cal2-ch1",
          slug: "various-differentiation",
          title: "Ⅰ. 여러 가지 함수의 미분법",
          children: [
            {
              id: "h-cal2-s1",
              slug: "various-func-diff",
              title: "1. 여러 가지 함수의 미분법",
              children: [
                { id: "h-cal2-t1", slug: "exp-log-limit", title: "지수함수와 로그함수의 극한" },
                { id: "h-cal2-t2", slug: "exp-log-diff", title: "지수함수와 로그함수의 미분" },
                { id: "h-cal2-t3", slug: "trig-addition", title: "삼각함수의 덧셈정리" },
                { id: "h-cal2-t4", slug: "trig-limit", title: "삼각함수의 극한" },
                { id: "h-cal2-t5", slug: "trig-diff", title: "삼각함수의 미분" },
              ],
            },
            {
              id: "h-cal2-s2",
              slug: "various-diff-methods",
              title: "2. 여러 가지 미분법",
              children: [
                { id: "h-cal2-t6", slug: "quotient-rule", title: "함수의 몫의 미분법" },
                { id: "h-cal2-t7", slug: "chain-rule", title: "합성함수의 미분법" },
                { id: "h-cal2-t8", slug: "parametric-diff", title: "매개변수로 나타낸 함수의 미분법" },
                { id: "h-cal2-t9", slug: "implicit-diff", title: "음함수의 미분법" },
                { id: "h-cal2-t10", slug: "inverse-func-diff", title: "역함수의 미분법" },
              ],
            },
            {
              id: "h-cal2-s3",
              slug: "derivative-application-2",
              title: "3. 도함수의 활용",
              children: [
                { id: "h-cal2-t11", slug: "tangent-line-2", title: "접선의 방정식" },
                { id: "h-cal2-t12", slug: "function-graph", title: "함수의 그래프" },
                { id: "h-cal2-t13", slug: "eq-ineq-application-2", title: "방정식과 부등식에의 활용" },
                { id: "h-cal2-t14", slug: "velocity-acceleration-2", title: "속도와 가속도" },
              ],
            },
          ],
        },
        {
          id: "h-cal2-ch2",
          slug: "various-integration",
          title: "Ⅱ. 여러 가지 함수의 적분법",
          children: [
            {
              id: "h-cal2-s4",
              slug: "various-integral-methods",
              title: "1. 여러 가지 적분법",
              children: [
                { id: "h-cal2-t15", slug: "substitution-integral", title: "치환적분법" },
                { id: "h-cal2-t16", slug: "integration-by-parts", title: "부분적분법" },
              ],
            },
            {
              id: "h-cal2-s5",
              slug: "integral-application-2",
              title: "2. 정적분의 활용",
              children: [
                { id: "h-cal2-t17", slug: "area-2", title: "넓이" },
                { id: "h-cal2-t18", slug: "volume", title: "부피" },
                { id: "h-cal2-t19", slug: "velocity-distance-2", title: "속도와 거리" },
              ],
            },
          ],
        },
      ],
    },

    // ── 기하 ──
    {
      id: "h-geo",
      slug: "geometry",
      title: "기하",
      children: [
        {
          id: "h-geo-ch1",
          slug: "conic-section",
          title: "Ⅰ. 이차곡선",
          children: [
            {
              id: "h-geo-s1",
              slug: "conic-section-concept",
              title: "1. 이차곡선",
              children: [
                { id: "h-geo-t1", slug: "parabola", title: "포물선" },
                { id: "h-geo-t2", slug: "ellipse", title: "타원" },
                { id: "h-geo-t3", slug: "hyperbola", title: "쌍곡선" },
              ],
            },
            {
              id: "h-geo-s2",
              slug: "conic-line",
              title: "2. 이차곡선과 직선",
              children: [
                { id: "h-geo-t4", slug: "conic-line-position", title: "이차곡선과 직선의 위치 관계" },
                { id: "h-geo-t5", slug: "conic-tangent", title: "접선의 방정식" },
              ],
            },
          ],
        },
        {
          id: "h-geo-ch2",
          slug: "vector",
          title: "Ⅱ. 벡터",
          children: [
            {
              id: "h-geo-s3",
              slug: "plane-vector",
              title: "1. 평면벡터",
              children: [
                { id: "h-geo-t6", slug: "vector-operation", title: "벡터의 뜻과 연산" },
                { id: "h-geo-t7", slug: "vector-component-dot", title: "벡터의 성분과 내적" },
              ],
            },
            {
              id: "h-geo-s4",
              slug: "vector-equation",
              title: "2. 직선과 원의 벡터 방정식",
              children: [
                { id: "h-geo-t8", slug: "line-vector-eq", title: "직선의 벡터 방정식" },
                { id: "h-geo-t9", slug: "circle-vector-eq", title: "원의 벡터 방정식" },
              ],
            },
          ],
        },
        {
          id: "h-geo-ch3",
          slug: "space-geometry",
          title: "Ⅲ. 공간도형과 공간좌표",
          children: [
            {
              id: "h-geo-s5",
              slug: "space-figure",
              title: "1. 공간도형",
              children: [
                { id: "h-geo-t10", slug: "line-plane-position", title: "직선과 평면의 위치 관계" },
                { id: "h-geo-t11", slug: "orthogonal-projection", title: "정사영" },
              ],
            },
            {
              id: "h-geo-s6",
              slug: "space-coordinate",
              title: "2. 공간좌표",
              children: [
                { id: "h-geo-t12", slug: "space-coord", title: "공간좌표" },
                { id: "h-geo-t13", slug: "space-distance", title: "두 점 사이의 거리" },
                { id: "h-geo-t14", slug: "sphere-equation", title: "구의 방정식" },
              ],
            },
          ],
        },
      ],
    },

    // ── 경제 수학 ──
    {
      id: "h-econ",
      slug: "econ-math",
      title: "경제 수학",
      children: [
        {
          id: "h-econ-ch1",
          slug: "math-economy",
          title: "Ⅰ. 수학과 경제",
          children: [
            {
              id: "h-econ-s1",
              slug: "number-economy",
              title: "1. 수와 생활경제",
              children: [
                { id: "h-econ-t1", slug: "exchange-rate", title: "환율" },
                { id: "h-econ-t2", slug: "tax", title: "세금" },
                { id: "h-econ-t3", slug: "interest-principal", title: "이자와 원리합계" },
              ],
            },
            {
              id: "h-econ-s2",
              slug: "sequence-finance",
              title: "2. 수열과 금융",
              children: [
                { id: "h-econ-t4", slug: "annuity-value", title: "연금의 현재가치와 미래가치" },
                { id: "h-econ-t5", slug: "loan-repayment", title: "대출 상환" },
              ],
            },
          ],
        },
        {
          id: "h-econ-ch2",
          slug: "function-economy",
          title: "Ⅱ. 함수와 경제",
          children: [
            {
              id: "h-econ-s3",
              slug: "function-economy-concept",
              title: "1. 함수와 경제 현상",
              children: [
                { id: "h-econ-t6", slug: "supply-demand", title: "수요함수와 공급함수" },
                { id: "h-econ-t7", slug: "cost-revenue-profit", title: "비용함수, 수입함수, 이윤함수" },
              ],
            },
            {
              id: "h-econ-s4",
              slug: "differentiation-economy",
              title: "2. 미분과 경제",
              children: [
                { id: "h-econ-t8", slug: "marginal-cost-revenue", title: "한계비용, 한계수입" },
                { id: "h-econ-t9", slug: "elasticity", title: "탄력성" },
              ],
            },
          ],
        },
        {
          id: "h-econ-ch3",
          slug: "data-economy",
          title: "Ⅲ. 자료 분석과 경제",
          children: [
            {
              id: "h-econ-s5",
              slug: "data-interpretation",
              title: "1. 자료의 정리와 해석",
              children: [
                { id: "h-econ-t10", slug: "economic-indicator", title: "경제 지표의 이해" },
                { id: "h-econ-t11", slug: "data-visualization", title: "자료의 정리와 시각화" },
              ],
            },
            {
              id: "h-econ-s6",
              slug: "decision-making",
              title: "2. 의사결정",
              children: [
                { id: "h-econ-t12", slug: "decision-optimization", title: "의사결정과 최적화" },
              ],
            },
          ],
        },
      ],
    },

    // ── 인공지능 수학 ──
    {
      id: "h-ai",
      slug: "ai-math",
      title: "인공지능 수학",
      children: [
        {
          id: "h-ai-ch1",
          slug: "data-representation",
          title: "Ⅰ. 자료의 표현",
          children: [
            {
              id: "h-ai-s1",
              slug: "data-visualization",
              title: "1. 자료의 정리와 시각화",
              children: [
                { id: "h-ai-t1", slug: "data-type", title: "자료의 종류와 특성" },
                { id: "h-ai-t2", slug: "data-viz", title: "자료의 시각화" },
              ],
            },
            {
              id: "h-ai-s2",
              slug: "matrix-data",
              title: "2. 행렬과 자료",
              children: [
                { id: "h-ai-t3", slug: "matrix-meaning-operation", title: "행렬의 뜻과 연산" },
                { id: "h-ai-t4", slug: "matrix-data-representation", title: "행렬과 데이터 표현" },
              ],
            },
          ],
        },
        {
          id: "h-ai-ch2",
          slug: "classification-prediction",
          title: "Ⅱ. 분류와 예측",
          children: [
            {
              id: "h-ai-s3",
              slug: "relation-classification",
              title: "1. 관계와 분류",
              children: [
                { id: "h-ai-t5", slug: "similarity", title: "유사도" },
                { id: "h-ai-t6", slug: "classification-clustering", title: "분류와 군집화" },
              ],
            },
            {
              id: "h-ai-s4",
              slug: "prediction-optimization",
              title: "2. 예측과 최적화",
              children: [
                { id: "h-ai-t7", slug: "regression-prediction", title: "회귀와 예측" },
                { id: "h-ai-t8", slug: "gradient-descent", title: "경사하강법" },
                { id: "h-ai-t9", slug: "optimization-loss", title: "최적화와 손실함수" },
              ],
            },
          ],
        },
        {
          id: "h-ai-ch3",
          slug: "information-probability",
          title: "Ⅲ. 정보와 확률",
          children: [
            {
              id: "h-ai-s5",
              slug: "conditional-prob-decision",
              title: "1. 조건부확률과 의사결정",
              children: [
                { id: "h-ai-t10", slug: "conditional-prob-usage", title: "조건부확률의 활용" },
                { id: "h-ai-t11", slug: "bayes-theorem", title: "베이즈 정리" },
              ],
            },
            {
              id: "h-ai-s6",
              slug: "information-entropy",
              title: "2. 정보와 엔트로피",
              children: [
                { id: "h-ai-t12", slug: "information-amount", title: "정보량" },
                { id: "h-ai-t13", slug: "entropy", title: "엔트로피" },
              ],
            },
          ],
        },
      ],
    },

    // ── 직무 수학 ──
    {
      id: "h-voc",
      slug: "vocational-math",
      title: "직무 수학",
      children: [
        {
          id: "h-voc-ch1",
          slug: "pattern-relation",
          title: "Ⅰ. 규칙과 관계",
          children: [
            {
              id: "h-voc-s1",
              slug: "finding-pattern",
              title: "1. 규칙 찾기",
              children: [
                { id: "h-voc-t1", slug: "number-pattern", title: "수의 규칙" },
                { id: "h-voc-t2", slug: "figure-pattern", title: "도형의 규칙" },
              ],
            },
            {
              id: "h-voc-s2",
              slug: "ratio-proportion",
              title: "2. 비와 비율",
              children: [
                { id: "h-voc-t3", slug: "proportion-distribution", title: "비례와 비례배분" },
                { id: "h-voc-t4", slug: "scale-blueprint", title: "축척과 도면 읽기" },
              ],
            },
          ],
        },
        {
          id: "h-voc-ch2",
          slug: "figure-measurement",
          title: "Ⅱ. 도형과 측정",
          children: [
            {
              id: "h-voc-s3",
              slug: "plane-measurement",
              title: "1. 평면도형의 측정",
              children: [
                { id: "h-voc-t5", slug: "length-area-angle", title: "길이, 넓이, 각도의 측정" },
                { id: "h-voc-t6", slug: "trig-ratio-usage", title: "삼각비의 활용" },
              ],
            },
            {
              id: "h-voc-s4",
              slug: "solid-measurement",
              title: "2. 입체도형의 측정",
              children: [
                { id: "h-voc-t7", slug: "surface-volume", title: "겉넓이와 부피" },
                { id: "h-voc-t8", slug: "real-measurement", title: "실생활 측정 문제" },
              ],
            },
          ],
        },
        {
          id: "h-voc-ch3",
          slug: "data-information",
          title: "Ⅲ. 자료와 정보",
          children: [
            {
              id: "h-voc-s5",
              slug: "data-organize",
              title: "1. 자료의 정리",
              children: [
                { id: "h-voc-t9", slug: "data-collection", title: "자료의 수집과 정리" },
                { id: "h-voc-t10", slug: "frequency-graph", title: "도수분포와 그래프" },
              ],
            },
            {
              id: "h-voc-s6",
              slug: "data-analysis",
              title: "2. 자료의 해석",
              children: [
                { id: "h-voc-t11", slug: "representative-dispersion", title: "대푯값과 산포도" },
                { id: "h-voc-t12", slug: "data-usage", title: "자료의 해석과 활용" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
