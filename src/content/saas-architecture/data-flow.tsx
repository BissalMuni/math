"use client";

import { CalcBox, Insight } from "@/components/content/shared";

/** Ⅵ. 데이터 흐름 — §18 일반 사용자 요청, §19 외부 API 호출, §20 관리자 접속 */
export default function DataFlowContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        시스템 안에서 데이터가 흐르는 3가지 시나리오. 일반 사용자 요청, 외부 API 호출, 관리자 점검 접속의 단계별 흐름.
      </p>

      {/* ===== §18 일반 사용자 요청 ===== */}
      <CalcBox title="■ §18. 일반 사용자 요청">
        <p className="text-sm mb-3">법규 검색 등 일반 사용자 요청의 흐름:</p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
          <pre>{`[강남구청 직원 PC]
   ↓ HTTPS (TLS 1.2+)
[App Security (WAF)]   ← OWASP 룰로 공격 차단
   ↓
[Load Balancer]        ← 트래픽을 Pod 1·2에 분산, TLS 종료
   ↓
[Spring Boot Pod]
  ├─ [Tomcat]          ← HTTP 수신 → Java 객체 변환
  ├─ [Controller]      ← @RequestMapping, JWT 검증
  ├─ [Service]         ← 비즈니스 로직
  ├─ [Repository]      ← JPA QueryDSL
   ↓ JDBC (TLS)
[RDS for PostgreSQL]   ← DB 엔진
   ↓
[저장 엔진]            ← PostgreSQL 내부
   ↓
[블록 스토리지 (암호화)] ← NHN 관리
   ↓
[물리 SSD]             ← NHN 데이터센터`}</pre>
        </div>
      </CalcBox>

      {/* ===== §19 외부 API 호출 ===== */}
      <CalcBox title="■ §19. 외부 API 호출">
        <p className="text-sm mb-3">법령 동기화 등 외부 API 호출:</p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
          <pre>{`[Spring Boot Pod]
   ↓ HTTPS 외부망 호출
[NAT Gateway / Egress]  ← VPC에서 외부 인터넷으로 나가는 게이트웨이
   ↓
[법제처 Open API]       ← https://www.law.go.kr
   ↓ XML 응답
[Spring Boot Pod]
   ↓ JDBC
[RDS for PostgreSQL]    ← 결과 저장`}</pre>
        </div>
        <Insight>
          NAT Gateway는 Pod이 외부 인터넷으로 나갈 때의 단일 출구. 모든 외부 호출 트래픽이 한 IP로 통합되어 법제처 입장에서 IP 화이트리스트 등록이 단순화. 자세한 내용은 부록 D.5 참조.
        </Insight>
      </CalcBox>

      <CalcBox title="■ §20. 관리자 접속 — 전체 흐름">
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
          <pre>{`[관리자 PC (강남구청 사무실)]
   ↓ SSH + MFA
[Bastion Host]          ← IP 화이트리스트 + 2FA
   ↓ kubectl / psql
[Spring Boot Pod] 또는 [RDS]`}</pre>
        </div>
      </CalcBox>

      <CalcBox title="■ §20.1 Bastion Host = 점프 서버">
        <p className="text-sm mb-3">
          <span className="font-medium">한 줄 정의</span> — 운영 시스템(Spring Boot Pod, PostgreSQL)에 직접 접속하지 못하게 막고, 반드시 거쳐야만 들어갈 수 있는 단 하나의 중간 서버.
        </p>
        <p className="text-sm mb-3">
          관리자 PC → 점프 서버 → 운영 서버 식으로 두 단계로 &quot;점프&quot; 한다고 해서 점프 서버라 부른다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
          <pre>{`[관리자 PC]  ━━X━━  [Spring Boot Pod]   ← 직접 접속 불가
[관리자 PC]  ━━X━━  [PostgreSQL DB]      ← 직접 접속 불가

[관리자 PC]  ──→  [점프 서버]  ──→  [Spring Boot Pod / DB]
                       ↑
                  여기서 한 번 "점프"해서 들어감`}</pre>
        </div>
      </CalcBox>

      <CalcBox title="■ §20.2 같은 개념, 다른 이름">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">용어</th>
                <th className="px-3 py-2 text-left">강조점</th>
                <th className="px-3 py-2 text-left">사용처</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr>
                <td className="px-3 py-2 font-medium">Bastion Host</td>
                <td className="px-3 py-2">보안 요새(Bastion=요새)</td>
                <td className="px-3 py-2">AWS, NHN Cloud 공식 문서</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">점프 서버 (Jump Server)</td>
                <td className="px-3 py-2">거쳐 가는 중간 서버 — 동작 방식</td>
                <td className="px-3 py-2">한국 SI/공공기관 현장 용어</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Jump Box</td>
                <td className="px-3 py-2">점프 서버의 영문 별칭</td>
                <td className="px-3 py-2">외국 인프라 문서</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Stepping Stone</td>
                <td className="px-3 py-2">디딤돌 — 일본·중국권 표현</td>
                <td className="px-3 py-2">일본 클라우드 문서</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted mt-3">→ 모두 같은 것. 본 문서에서는 &quot;Bastion Host&quot;로 통일 표기.</p>
      </CalcBox>

      <CalcBox title="■ §20.3 점프 서버의 핵심 보안 효과">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">효과</th>
                <th className="px-3 py-2 text-left">설명</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr>
                <td className="px-3 py-2 font-medium">공격 표면 축소</td>
                <td className="px-3 py-2">운영 서버는 인터넷에서 안 보임 → 직접 공격 불가</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">단일 진입점</td>
                <td className="px-3 py-2">모든 관리 트래픽이 한 곳을 지남 → 감사 로그 집중</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">강한 인증 적용</td>
                <td className="px-3 py-2">점프 서버에만 MFA·OTP 적용해도 모든 운영 서버가 보호</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">계정 분리</td>
                <td className="px-3 py-2">점프 서버 계정 ≠ 운영 서버 계정 → 한쪽이 뚫려도 즉시 못 들어감</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CalcBox>

      <CalcBox title="■ §20.4 점프 서버가 없으면">
        <p className="text-sm mb-3">
          운영 서버(Spring Boot, PostgreSQL)가 인터넷에 직접 노출 → 매일 수만 건의 SSH 무차별 공격을 운영 서버가 직접 받음 → 한 번이라도 비밀번호가 뚫리면 즉시 데이터 유출.
        </p>
        <Insight>
          점프 서버를 두면 공격은 점프 서버에서 막히고, 점프 서버는 MFA(OTP) 때문에 비밀번호만으로는 못 뚫림. 행안부 시큐어코딩 A07(인증·권한관리), A09(로깅·모니터링) 통제와 직접 연결.
        </Insight>
      </CalcBox>
    </div>
  );
}
