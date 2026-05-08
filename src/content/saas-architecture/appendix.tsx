"use client";

import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅷ. 부록 — D.6 MFA · D.7 Spring Boot · D.8 kubelet · D.9 VPC 백본 · D.10 kubectl apply · D.11 Servlet */
export default function AppendixContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        본문에 등장한 기술 용어 상세 설명. 인증 체계(MFA·OTP), 응용 프레임워크(Spring Boot·Servlet), K8s 운영 도구(kubelet·kubectl apply), 클라우드 네트워크(VPC 백본).
      </p>

      {/* ===== D.6 MFA ===== */}
      <CalcBox title="■ D.6 MFA — 인증의 3대 요소">
        <SubSection title="● 약자 풀이">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3 mb-2">
            <pre>{`MFA = Multi-Factor Authentication
      (다중 요소 인증)`}</pre>
          </div>
          <p className="text-sm">
            <span className="font-medium">Multi</span>는 라틴어 <em>multus</em>(많은)에서 온 접두사 — &quot;둘 이상의·여러 개의&quot;. <span className="font-medium">Factor</span>는 &quot;본인 확인 수단(요소)&quot;.
            즉 MFA = 서로 다른 종류의 본인 확인 수단을 2개 이상 조합.
          </p>
        </SubSection>

        <SubSection title="● 인증의 3대 요소(Factor)">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">요소</th>
                  <th className="px-3 py-2 text-left">영문</th>
                  <th className="px-3 py-2 text-left">예시</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">지식 요소</td><td className="px-3 py-2">Something you know</td><td className="px-3 py-2">비밀번호, PIN</td></tr>
                <tr><td className="px-3 py-2 font-medium">소유 요소</td><td className="px-3 py-2">Something you have</td><td className="px-3 py-2">OTP 앱, USB 보안키</td></tr>
                <tr><td className="px-3 py-2 font-medium">생체 요소</td><td className="px-3 py-2">Something you are</td><td className="px-3 py-2">지문, 얼굴인식, 홍채</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-2">→ MFA는 서로 다른 종류 2개 이상을 요구. 같은 종류 2개(예: 비밀번호 + PIN)는 MFA가 아님.</p>
        </SubSection>

        <SubSection title="● SFA · 2FA · MFA 관계">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`[비밀번호만]            → 1단계 = SFA (Single-Factor)
[비밀번호 + OTP]         → 2단계 = 2FA (Two-Factor)
[비밀번호 + OTP + 지문]  → 3단계 = 3FA`}</pre>
          </div>
          <p className="text-sm text-muted mt-2">→ 2FA, 3FA를 모두 통칭 MFA. MFA ⊇ 2FA.</p>
        </SubSection>

        <SubSection title="● OTP — One-Time Password (일회용 비밀번호)">
          <p className="text-sm mb-2">
            <span className="font-medium">한 줄 정의</span> — 30초마다 자동으로 바뀌는 6자리 숫자 비밀번호. 한 번 사용하면 끝, 재사용 불가.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3 mb-2">
            <pre>{`[등록 시 1회] 서버가 QR → 사용자 앱이 비밀키 저장

[로그인 시 매번]
  서버:    비밀키 + 현재 시각 → 알고리즘 → 123456
  사용자:  비밀키 + 현재 시각 → 알고리즘 → 123456   ← 같은 값
                                              ↓
                                    사용자가 입력 → 일치 → 통과`}</pre>
          </div>
          <p className="text-sm text-muted">→ 인터넷 없이도 동작 (시각만 동기화). SMS OTP보다 안전 — SIM 스와핑 차단.</p>
        </SubSection>

        <Insight>
          단일 인증(SFA)만 적용된 관리자 계정은 보안성 검토 즉시 지적 사항. 본 시스템은 §20 관리자 접속의 Bastion + OTP 구조로 충족.
        </Insight>
      </CalcBox>

      {/* ===== D.7 Spring Boot ===== */}
      <CalcBox title='■ D.7 Spring Boot — 왜 "Boot"인가'>
        <SubSection title="● 약자 풀이">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3 mb-2">
            <pre>{`Spring Boot = Spring + Boot(strap)
              (스프링 프레임워크 + 부트스트래핑/즉시 시동)`}</pre>
          </div>
          <p className="text-sm">
            <span className="font-medium">Boot</span>은 <em>Bootstrap</em>의 줄임말. 컴퓨터 전원을 켜면 OS가 자동으로 올라오듯, &quot;명령어 한 줄로 즉시 서버가 부팅되어 실행된다&quot;는 의미.
          </p>
        </SubSection>

        <SubSection title="● Spring vs Spring Boot — 왜 등장했나">
          <p className="text-sm mb-2 font-medium">Before Spring Boot (2003~2013, 순수 Spring)</p>
          <ul className="text-sm list-disc list-inside mb-3 space-y-1">
            <li>XML 설정 파일 수백 줄 작성 필요</li>
            <li>Tomcat 별도 설치 후 WAR 배포</li>
            <li>개발 환경 세팅에 신규 인력이 2~3일 소요</li>
          </ul>
          <p className="text-sm mb-2 font-medium">After Spring Boot (2014~)</p>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li>XML 설정 0줄 (어노테이션 + application.yml)</li>
            <li>Tomcat JAR에 내장 → <code className="text-xs">java -jar app.jar</code> 만으로 실행</li>
            <li>신규 인력 환경 세팅 30분</li>
          </ul>
        </SubSection>

        <SubSection title="● Spring Boot 4대 특징">
          <ol className="text-sm list-decimal list-inside space-y-1">
            <li><span className="font-medium">Auto Configuration</span> — pom.xml 의존성 스캔하여 Bean 자동 등록</li>
            <li><span className="font-medium">Embedded Server</span> — Tomcat이 JAR에 포함, 컨테이너 시대에 이상적</li>
            <li><span className="font-medium">Starter</span> — 검증된 의존성 묶음 (starter-web, starter-data-jpa)</li>
            <li><span className="font-medium">Production-Ready</span> — Actuator로 헬스체크·메트릭 자동 제공 (K8s probe와 연동)</li>
          </ol>
        </SubSection>

        <SubSection title="● eGovFramework와의 관계">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">항목</th>
                  <th className="px-3 py-2 text-left">표준프레임워크</th>
                  <th className="px-3 py-2 text-left">Spring Boot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">설정 방식</td><td className="px-3 py-2">XML 중심</td><td className="px-3 py-2">어노테이션 + YAML</td></tr>
                <tr><td className="px-3 py-2 font-medium">버전 결정권</td><td className="px-3 py-2">행안부가 고정</td><td className="px-3 py-2">개발자 자유</td></tr>
                <tr><td className="px-3 py-2 font-medium">본 프로젝트</td><td className="px-3 py-2">패턴만 참조</td><td className="px-3 py-2">실제 사용 (3.2.5)</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <Insight>
          Spring 프레임워크의 복잡한 설정을 자동화하여, 명령어 한 줄로 웹 서버까지 즉시 부팅(Boot)되는 Java 애플리케이션을 만들 수 있게 해주는 프레임워크. 이름의 &quot;Boot&quot;가 곧 핵심 가치.
        </Insight>
      </CalcBox>

      {/* ===== D.8 kubelet ===== */}
      <CalcBox title="■ D.8 kubelet — Worker Node의 K8s 에이전트">
        <SubSection title="● 어원과 한 줄 정의">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3 mb-2">
            <pre>{`kubelet = kube + -let
          (K8s + 작은 것/하수인)`}</pre>
          </div>
          <p className="text-sm mb-2">
            &quot;piglet=새끼돼지&quot;처럼 <code className="text-xs">-let</code>은 작은/하급 단위 접미사.
          </p>
          <p className="text-sm">
            각 Worker Node에 1개씩 설치되어, Master Node의 명령을 받아 실제로 컨테이너를 띄우고 관리하는 에이전트(작업원).
          </p>
        </SubSection>

        <SubSection title="● 명령 흐름">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`[관리자] kubectl apply -f deployment.yaml
   ↓
[Master Node]
   │ "Worker Node A에 Pod 1개 띄워라"
   ↓ (gRPC)
[Worker Node A 의 kubelet]   ← 여기
   ├─ containerd에 명령
   ├─ 컨테이너 이미지 pull (NCR에서)
   ├─ 컨테이너 시작
   ├─ probe 주기 호출
   └─ 상태를 Master에 보고
   ↓
[Pod 실행]`}</pre>
          </div>
        </SubSection>

        <SubSection title="● kubelet의 5가지 책임">
          <ul className="text-sm list-disc list-inside space-y-1">
            <li><span className="font-medium">Pod 생성·삭제</span> — Master 명령에 따라 컨테이너 시작·중지</li>
            <li><span className="font-medium">probe 실행</span> — livenessProbe·readinessProbe 주기 호출</li>
            <li><span className="font-medium">자원 모니터링</span> — CPU·메모리 측정 → Master 보고</li>
            <li><span className="font-medium">로그 수집</span> — Pod 표준출력을 Node 디스크에 저장</li>
            <li><span className="font-medium">노드 상태 보고</span> — 10초마다 heartbeat 전송</li>
          </ul>
        </SubSection>

        <SubSection title="● kubectl과 혼동 주의">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">이름</th>
                  <th className="px-3 py-2 text-left">역할</th>
                  <th className="px-3 py-2 text-left">사용</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">kubectl</td><td className="px-3 py-2">CLI 도구</td><td className="px-3 py-2">사람이 명령</td></tr>
                <tr><td className="px-3 py-2 font-medium">kubelet</td><td className="px-3 py-2">노드 에이전트</td><td className="px-3 py-2">시스템이 자동</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>
      </CalcBox>

      {/* ===== D.9 VPC 백본 ===== */}
      <CalcBox title="■ D.9 VPC 백본 — 클라우드 내부 고속 네트워크">
        <SubSection title="● 용어 분해">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3 mb-2">
            <pre>{`VPC = Virtual Private Cloud (가상 사설 클라우드)
백본 = Backbone Network (등뼈/척추 네트워크)`}</pre>
          </div>
          <p className="text-sm">
            VPC = 클라우드 안에 만든 내 회사 전용 가상 네트워크. 백본 = 사람의 척추처럼 모든 트래픽이 지나는 중심 고속 네트워크.
          </p>
        </SubSection>

        <SubSection title="● 백본 vs 일반 네트워크">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`[일반 네트워크 = 거리의 골목길]   ← 100Mbps~1Gbps
[백본 네트워크 = 고속도로]         ← 100Gbps~400Gbps (1000배+)`}</pre>
          </div>
        </SubSection>

        <SubSection title="● NHN Cloud 데이터센터 구조">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`┌─ 평촌 데이터센터 ─────────────────────┐
│  [강남구청 VPC]   [다른 고객 VPC]      │
│       │                │               │
│       └─── VPC 백본 ───┘               │ ← NHN 운영 (100Gbps)
│              │                         │
│       [공통 서비스: RDS, NCR, K8s API] │
└──────┬─────────────────────────────────┘
       │ DC 간 백본 (전용 광케이블, 이중화)
┌──────┴─────────────────────────────────┐
│  판교 데이터센터 (재해복구용 DR)       │
└────────────────────────────────────────┘`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 백본이 해결하는 4가지">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">문제</th>
                  <th className="px-3 py-2 text-left">백본의 해결</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">속도</td><td className="px-3 py-2">Pod ↔ DB 통신을 100Gbps로 µs 응답</td></tr>
                <tr><td className="px-3 py-2 font-medium">격리</td><td className="px-3 py-2">고객사 간 트래픽이 VLAN/오버레이로 분리</td></tr>
                <tr><td className="px-3 py-2 font-medium">가용성</td><td className="px-3 py-2">백본 자체 이중화·다중 경로</td></tr>
                <tr><td className="px-3 py-2 font-medium">DDoS 방어</td><td className="px-3 py-2">진입점에서 대용량 공격 흡수</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <Insight>
          NHN Cloud 공공기관용이 CSAP IaaS 인증을 받았다는 것은 백본까지 회선 이중화·트래픽 격리·DDoS 방어·로그 보존 요건을 충족한다는 의미. 강남구청은 별도 검증 불필요.
        </Insight>
      </CalcBox>

      {/* ===== D.10 kubectl apply 흐름 ===== */}
      <CalcBox title="■ D.10 kubectl apply 흐름 — YAML 적용 요청 전체 추적">
        <SubSection title="● 핵심 개념 — Desired State (선언형)">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3 mb-2">
            <pre>{`[전통 명령형]              [K8s 선언형]
"Pod 1개 만들어"            "Pod 2개 있어야 함" (목표만)
"또 1개 만들어"             → K8s가 알아서 차이를 메움
"하나 죽었네 다시 만들어"`}</pre>
          </div>
          <p className="text-sm text-muted">→ apply = &quot;이 YAML이 원하는 상태(desired state)다, 알아서 맞춰라&quot;.</p>
        </SubSection>

        <SubSection title="● 단계별 흐름">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`[① kubectl 실행 (Bastion)]
       ↓ HTTPS POST (mTLS + 토큰)
[② API Server (Master Node)]
       ├─ 인증 (Authentication)
       ├─ 인가 (Authorization, RBAC)
       ├─ Admission Control (정책 검증)
       └─ etcd에 desired state 저장
       ↓
[③ Controller Manager]
       └─ Deployment Controller가 변화 감지
          → ReplicaSet → Pod 생성 요청
       ↓
[④ Scheduler (kube-scheduler)]
       └─ "어느 Worker Node에 띄울까?"
          Filtering → Scoring → 결정
       ↓
[⑤ kubelet (Worker Node)]
       ├─ 이미지 pull (NCR)
       ├─ 컨테이너 시작 (containerd)
       ├─ 네트워크 연결 (CNI → Pod IP)
       ├─ probe 시작 (/actuator/health)
       └─ 상태 보고 → API Server → etcd
       ↓
[⑥ Service / LB가 자동 인식 → 트래픽 전달]
       ↓
[⑦ kubectl 응답: "deployment created"]`}</pre>
          </div>
        </SubSection>

        <SubSection title="● apply vs create">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">명령</th>
                  <th className="px-3 py-2 text-left">동작</th>
                  <th className="px-3 py-2 text-left">두 번째 실행</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-mono">kubectl create</td><td className="px-3 py-2">새로 만들기</td><td className="px-3 py-2">❌ &quot;이미 있다&quot; 에러</td></tr>
                <tr><td className="px-3 py-2 font-mono">kubectl apply</td><td className="px-3 py-2">있으면 변경, 없으면 생성</td><td className="px-3 py-2">✅ 변경분만 패치</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-2">→ 운영에서는 항상 apply 사용.</p>
        </SubSection>

        <SubSection title="● 트러블슈팅 가이드">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">단계</th>
                  <th className="px-3 py-2 text-left">증상</th>
                  <th className="px-3 py-2 text-left">책임 영역</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2">② 인증/인가</td><td className="px-3 py-2 font-mono">Unauthorized / forbidden</td><td className="px-3 py-2">강남구청 (kubeconfig·RBAC)</td></tr>
                <tr><td className="px-3 py-2">④ Scheduler</td><td className="px-3 py-2 font-mono">Pending</td><td className="px-3 py-2">자원 부족 NHN, 정책 강남구청</td></tr>
                <tr><td className="px-3 py-2">⑤ 이미지 pull</td><td className="px-3 py-2 font-mono">ImagePullBackOff</td><td className="px-3 py-2">강남구청 (이미지·NCR)</td></tr>
                <tr><td className="px-3 py-2">⑤ 컨테이너 시작</td><td className="px-3 py-2 font-mono">CrashLoopBackOff</td><td className="px-3 py-2">강남구청 (응용 SW)</td></tr>
                <tr><td className="px-3 py-2">⑤ probe</td><td className="px-3 py-2 font-mono">0/1 Ready</td><td className="px-3 py-2">강남구청 (헬스체크)</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-2">→ 거의 모든 운영 트러블슈팅은 ⑤ kubelet 단계에서 발생.</p>
        </SubSection>
      </CalcBox>

      {/* ===== D.11 Servlet ===== */}
      <CalcBox title="■ D.11 Servlet — Java 표준 HTTP 처리 객체">
        <SubSection title="● 어원과 한 줄 정의">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3 mb-2">
            <pre>{`Servlet = Server + -let
          (서버 + 작은 것)`}</pre>
          </div>
          <p className="text-sm mb-2">
            <em>Applet</em>(브라우저에서 도는 작은 자바 프로그램)의 반대 개념. <span className="font-medium">서버 쪽에서 도는 작은 자바 프로그램</span>.
          </p>
          <p className="text-sm">
            HTTP 요청을 Java 객체로 받아 응답을 돌려주는 Java 표준 명세 (Java EE → Jakarta EE).
          </p>
        </SubSection>

        <SubSection title="● Servlet의 위치">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`[브라우저]
   ↓ HTTP 요청
[Tomcat (Servlet Container)]
   │  HTTP → HttpServletRequest 객체
   ↓
[Servlet 객체]                  ← 실제 처리
   │  Spring Boot에서는
   │  DispatcherServlet 1개가
   │  모든 요청 받아 Controller로 분배
   ↓
[HttpServletResponse]
   ↓ HTTP 응답
[브라우저]`}</pre>
          </div>
        </SubSection>

        <SubSection title="● Spring Boot에서의 Servlet">
          <p className="text-sm mb-2">
            직접 Servlet을 작성할 일은 거의 없음. Spring MVC가 <code className="text-xs">DispatcherServlet</code> 하나로 모든 요청을 받고, <code className="text-xs">@RestController</code> 메서드로 분배.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`[모든 HTTP 요청]
   ↓
[DispatcherServlet]   ← 단 1개 (Spring 제공)
   ↓ URL 매칭
[OrdinanceController.list()]    ← @GetMapping
[OrdinanceController.detail()]
...`}</pre>
          </div>
        </SubSection>

        <SubSection title="● Servlet vs Spring Controller">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">항목</th>
                  <th className="px-3 py-2 text-left">Servlet (순수)</th>
                  <th className="px-3 py-2 text-left">Spring Controller</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">요청 받기</td><td className="px-3 py-2 font-mono text-xs">doGet(req, resp)</td><td className="px-3 py-2 font-mono text-xs">@GetMapping</td></tr>
                <tr><td className="px-3 py-2 font-medium">파라미터</td><td className="px-3 py-2 font-mono text-xs">req.getParameter</td><td className="px-3 py-2 font-mono text-xs">@RequestParam</td></tr>
                <tr><td className="px-3 py-2 font-medium">응답</td><td className="px-3 py-2 font-mono text-xs">resp.getWriter().write</td><td className="px-3 py-2 font-mono text-xs">return dto;</td></tr>
                <tr><td className="px-3 py-2 font-medium">코드량</td><td className="px-3 py-2">많음</td><td className="px-3 py-2">적음</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-2">→ Spring Controller는 Servlet을 한 단계 더 추상화. 내부적으로는 여전히 Servlet 위에서 동작.</p>
        </SubSection>
      </CalcBox>
    </div>
  );
}
