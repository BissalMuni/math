"use client";

import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅳ. 가용성·부하분산 — §13 Load Balancer, §14 High Availability */
export default function AvailabilityContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        사용자와 응용 SW 사이를 잇는 Load Balancer(LB)와 LB·Pod·DB를 자동 이중화하는 High Availability(HA) 메커니즘. 목표 가동률 연 99.95% 이상.
      </p>

      {/* ===== §13 Load Balancer ===== */}
      <CalcBox title="■ §13. Load Balancer (LB)">
        <SubSection title="● §13.1 한 줄 정의">
          <Insight>트래픽을 여러 서버에 나누는 장치</Insight>
        </SubSection>

        <SubSection title="● §13.2-1 트래픽 분산 (Distribution)">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3 mb-2">
            <pre>{`요청 1 → Pod 1
요청 2 → Pod 2
요청 3 → Pod 1
...`}</pre>
          </div>
          <p className="text-sm font-medium mt-2">알고리즘:</p>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li><span className="font-medium">Round Robin</span>: 순서대로 (기본)</li>
            <li><span className="font-medium">Least Connections</span>: 가장 한가한 Pod로</li>
            <li><span className="font-medium">IP Hash</span>: 같은 IP는 항상 같은 Pod로 (세션 유지)</li>
          </ul>
        </SubSection>

        <SubSection title="● §13.2-2 헬스 체크 (Health Check)">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`LB가 5초마다 각 Pod에 핑:
GET http://Pod1:8080/actuator/health → 200 OK ✅
GET http://Pod2:8080/actuator/health → 응답 없음 ❌

→ Pod 2를 분산 대상에서 자동 제외`}</pre>
          </div>
          <p className="text-sm text-muted mt-2">→ 이게 바로 HA의 핵심.</p>
        </SubSection>

        <SubSection title="● §13.2-3 SSL/TLS 종료 (TLS Termination)">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`[브라우저] → HTTPS 443 → [LB] → HTTP 80 → [Pod]
                          ↑
                     여기서 암호 풀음`}</pre>
          </div>
          <p className="text-sm text-muted mt-2">→ Pod은 HTTP만 처리, 암호화는 LB가. 인증서 관리도 LB에서만.</p>
        </SubSection>

        <SubSection title="● §13.2-4 트래픽 라우팅 (Routing)">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`[LB]
  ├─ /api/*    → Spring Boot Pod 그룹
  ├─ /static/* → Object Storage
  └─ /admin/*  → Admin Pod 그룹`}</pre>
          </div>
        </SubSection>

        <SubSection title="● §13.3 NHN Cloud LB 종류">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">종류</th>
                  <th className="px-3 py-2 text-left">용도</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">Application LB (ALB)</td><td className="px-3 py-2">HTTP/HTTPS, L7 라우팅 — <span className="font-medium">본 프로젝트 권장</span></td></tr>
                <tr><td className="px-3 py-2 font-medium">Network LB (NLB)</td><td className="px-3 py-2">TCP/UDP, L4 분산, 고성능</td></tr>
                <tr><td className="px-3 py-2 font-medium">Classic LB</td><td className="px-3 py-2">단순 L4, 레거시</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="● §13.4 NHN LB 설정 (콘솔에서)">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`NHN 콘솔 → Network → Load Balancer → 생성
   ├─ 이름: law-matcher-lb
   ├─ 종류: Application LB
   ├─ 리스너:
   │    ├─ HTTPS:443 (인증서: gangnam.go.kr)
   │    └─ HTTP:80 → HTTPS 자동 리다이렉트
   ├─ 백엔드 그룹:
   │    └─ 멤버: NKS Pod 2~5개 (자동)
   └─ 헬스 체크:
        ├─ 경로: /actuator/health
        ├─ 주기: 5초
        └─ 임계치: 3회 실패 시 제외`}</pre>
          </div>
          <p className="text-sm text-muted mt-2">→ 클릭만으로 HA 완성.</p>
        </SubSection>
      </CalcBox>

      {/* ===== §14 HA ===== */}
      <CalcBox title="■ §14. High Availability (HA)">
        <SubSection title="● §14.1 한 줄 정의">
          <Insight>장애가 발생해도 서비스가 계속 가능한 상태. 목표: 연 99.95% 이상 가동 (= 연 4.4시간 미만 다운타임).</Insight>
        </SubSection>

        <SubSection title="● §14.2 HA의 3대 요소">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`1. 이중화 (Redundancy)    → Pod 2개 이상
2. 자동 감지 (Detection)   → LB의 헬스 체크
3. 자동 인계 (Failover)    → 죽은 Pod 제외 + K8s 자동 재시작`}</pre>
          </div>
        </SubSection>

        <SubSection title="● §14.3 HA 자동 동작 시나리오">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`[정상 상태]
[LB] → [Pod 1 ✅] [Pod 2 ✅]
       50%        50%

[Pod 1 죽음 — 새벽 3시]
[LB] → [Pod 1 ☠️] [Pod 2 ✅]
   ↓ 헬스체크 5초마다 확인
   ↓ Pod 1 응답 없음 감지
   ↓ 자동으로 Pod 1 제외
[LB] → [Pod 2 ✅]
       100%

[K8s가 Pod 1 자동 재시작]
[LB] → [Pod 1 ✅ 부활] [Pod 2 ✅]
   ↓ 헬스체크 OK 감지
   ↓ 다시 분산 대상 포함
[LB] → [Pod 1 ✅] [Pod 2 ✅]
       50%        50%`}</pre>
          </div>
          <p className="text-sm text-muted mt-2">→ 사람이 자고 있어도 LB + K8s가 알아서. 이게 &quot;자동 HA&quot;.</p>
        </SubSection>

        <SubSection title="● §14.4 본 프로젝트의 HA 구성요소">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">계층</th>
                  <th className="px-3 py-2 text-left">HA 방법</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">LB</td><td className="px-3 py-2">NHN Cloud LB 자체 이중화 (NHN 책임)</td></tr>
                <tr><td className="px-3 py-2 font-medium">App (Pod)</td><td className="px-3 py-2">Pod 2~5개 + LB 헬스체크</td></tr>
                <tr><td className="px-3 py-2 font-medium">Worker Node</td><td className="px-3 py-2">NKS가 여러 Node에 Pod 분산</td></tr>
                <tr><td className="px-3 py-2 font-medium">DB</td><td className="px-3 py-2">RDS HA (Active-Standby)</td></tr>
                <tr><td className="px-3 py-2 font-medium">Redis</td><td className="px-3 py-2">Memorystore HA</td></tr>
                <tr><td className="px-3 py-2 font-medium">Object Storage</td><td className="px-3 py-2">NHN 자동 3중 복제</td></tr>
                <tr><td className="px-3 py-2 font-medium">데이터센터</td><td className="px-3 py-2">NHN 다중 AZ (선택)</td></tr>
              </tbody>
            </table>
          </div>
          <Insight>모든 계층이 이중화, 어느 하나가 죽어도 서비스 계속.</Insight>
        </SubSection>

        <SubSection title="● §14.5 SLA 기준">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">CSP</th>
                  <th className="px-3 py-2 text-left">LB SLA</th>
                  <th className="px-3 py-2 text-left">의미</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">NHN Cloud</td><td className="px-3 py-2">99.95%/월</td><td className="px-3 py-2">월 21분 미만 다운타임</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-2">→ NHN LB 자체도 NHN이 HA로 운영. 다운타임 시 SLA 크레딧 환불.</p>
        </SubSection>
      </CalcBox>
    </div>
  );
}
