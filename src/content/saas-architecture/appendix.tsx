"use client";

import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅷ. 부록 D — 자주 묻는 기술 용어 상세 (D.1~D.15) */
export default function AppendixContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        본문에 등장한 약어·기술 용어 상세 설명. 설정 파일 형식(YAML), 가상화(KVM), 웹 보안(WAF·OWASP), DB 접근(JPA·QueryDSL), 외부 인터넷 출구(NAT Gateway), 인증 체계(MFA·OTP), 응용 프레임워크(Spring Boot·Servlet), K8s 운영 도구(kubelet·kubectl apply), 클라우드 네트워크(VPC 백본), Public Subnet 3대 관문(ALB·NAT·Bastion), Data 3축(PG·Redis·Storage), Observability 3축(Metrics·Traces·Logs), APM 상세.
      </p>

      {/* ===== D.1 YAML ===== */}
      <CalcBox title="■ D.1 YAML">
        <SubSection title="● 약자 풀이">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3 mb-2">
            <pre>{`YAML = YAML Ain't Markup Language
       (YAML은 마크업 언어가 아니다)`}</pre>
          </div>
          <p className="text-sm">
            <span className="font-medium">재귀적 약어</span>. 원래 <em>Yet Another Markup Language</em>였다가 &quot;마크업이 아닌 데이터 직렬화 형식이다&quot;를 강조하기 위해 변경.
          </p>
        </SubSection>

        <SubSection title="● 무엇인가">
          <p className="text-sm">
            사람이 읽기 쉬운 데이터 표현 형식 (JSON·XML과 같은 카테고리). K8s, Docker Compose, Spring Boot, GitHub Actions 등 <span className="font-medium">설정 파일의 사실상 표준</span>.
          </p>
        </SubSection>

        <SubSection title="● 같은 데이터를 3가지 형식으로 비교">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3 mb-2">
            <pre>{`# YAML — 들여쓰기로 구조 표현
name: law-matcher
replicas: 2
labels:
  app: law-matcher
  env: prod`}</pre>
          </div>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3 mb-2">
            <pre>{`// JSON — 중괄호·쉼표
{
  "name": "law-matcher",
  "replicas": 2,
  "labels": { "app": "law-matcher", "env": "prod" }
}`}</pre>
          </div>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`<!-- XML — 태그 -->
<config>
  <name>law-matcher</name>
  <replicas>2</replicas>
</config>`}</pre>
          </div>
          <p className="text-sm text-muted mt-2">→ YAML이 가장 간결.</p>
        </SubSection>

        <SubSection title="● 본 프로젝트에서">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">파일</th>
                  <th className="px-3 py-2 text-left">용도</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-mono text-xs">application.yml</td><td className="px-3 py-2">Spring Boot 환경 설정</td></tr>
                <tr><td className="px-3 py-2 font-mono text-xs">docker-compose.prod.yml</td><td className="px-3 py-2">Docker Compose 컨테이너 정의</td></tr>
                <tr><td className="px-3 py-2 font-mono text-xs">k8s/deployment.yaml</td><td className="px-3 py-2">K8s Pod 명세 (작성 예정)</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <Insight>
          YAML은 들여쓰기에 매우 민감 (스페이스 vs 탭, 정확한 칸 수). 잘못 쓰면 파싱 에러.
        </Insight>
      </CalcBox>

      {/* ===== D.2 KVM ===== */}
      <CalcBox title="■ D.2 KVM (Hypervisor)">
        <SubSection title="● 약자 풀이">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`KVM = Kernel-based Virtual Machine
      (커널 기반 가상 머신)`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 무엇인가">
          <p className="text-sm">
            <span className="font-medium">Linux 커널에 내장된 가상화 기술</span> — 1대의 물리 서버 위에 여러 VM을 만들어주는 SW. Hypervisor의 한 종류.
          </p>
        </SubSection>

        <SubSection title="● 위치 (계층 ⑦)">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`┌─────────────────────────────────┐
│ Worker Node (VM) ⑥              │  ← VM 하나
├─────────────────────────────────┤
│ KVM (Hypervisor) ⑦              │  ← 이게 KVM
├─────────────────────────────────┤
│ Linux 커널 (호스트 OS)          │
├─────────────────────────────────┤
│ Physical Server ⑧               │
└─────────────────────────────────┘`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 특징">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium w-32">만든 곳</td><td className="px-3 py-2">Red Hat (2007년)</td></tr>
                <tr><td className="px-3 py-2 font-medium">라이센스</td><td className="px-3 py-2">오픈소스 (GPL)</td></tr>
                <tr><td className="px-3 py-2 font-medium">성능</td><td className="px-3 py-2">매우 우수 (네이티브에 가까움)</td></tr>
                <tr><td className="px-3 py-2 font-medium">사용처</td><td className="px-3 py-2">NHN Cloud, AWS, GCP, Azure, OpenStack 등</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="● 다른 Hypervisor와 비교">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">Hypervisor</th>
                  <th className="px-3 py-2 text-left">만든 곳</th>
                  <th className="px-3 py-2 text-left">라이센스</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">KVM</td><td className="px-3 py-2">Red Hat</td><td className="px-3 py-2">오픈소스</td></tr>
                <tr><td className="px-3 py-2 font-medium">VMware ESXi</td><td className="px-3 py-2">VMware</td><td className="px-3 py-2">유료</td></tr>
                <tr><td className="px-3 py-2 font-medium">Hyper-V</td><td className="px-3 py-2">Microsoft</td><td className="px-3 py-2">Windows 포함</td></tr>
                <tr><td className="px-3 py-2 font-medium">Xen</td><td className="px-3 py-2">Citrix</td><td className="px-3 py-2">오픈소스</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-2">→ 대부분의 클라우드 회사가 KVM 또는 Xen 기반으로 자체 Hypervisor 구축. NHN Cloud도 KVM 기반으로 추정.</p>
        </SubSection>
      </CalcBox>

      {/* ===== D.3 WAF + OWASP ===== */}
      <CalcBox title="■ D.3 WAF + OWASP">
        <SubSection title="● WAF — Web Application Firewall">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3 mb-2">
            <pre>{`WAF = Web Application Firewall
      (웹 애플리케이션 방화벽)`}</pre>
          </div>
          <p className="text-sm">
            웹 공격을 차단하는 전문 방화벽. 일반 방화벽(IP·포트 기반)과 달리 <span className="font-medium">HTTP 요청 내용을 분석</span>하여 공격 차단.
          </p>
        </SubSection>

        <SubSection title="● OWASP — Open Worldwide Application Security Project">
          <p className="text-sm">
            <span className="font-medium">웹 보안 표준을 만드는 비영리 단체</span> (2001~). 가장 유명한 산출물: OWASP Top 10.
          </p>
        </SubSection>

        <SubSection title="● OWASP Top 10 (2021) — 가장 위험한 웹 취약점">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left w-12">#</th>
                  <th className="px-3 py-2 text-left">항목</th>
                  <th className="px-3 py-2 text-left">예시</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2">1</td><td className="px-3 py-2">Broken Access Control</td><td className="px-3 py-2">권한 없는 페이지 접근</td></tr>
                <tr><td className="px-3 py-2">2</td><td className="px-3 py-2">Cryptographic Failures</td><td className="px-3 py-2">약한 암호화·평문 전송</td></tr>
                <tr><td className="px-3 py-2">3</td><td className="px-3 py-2">Injection (SQL, NoSQL, Command)</td><td className="px-3 py-2 font-mono text-xs">&apos; OR 1=1 --</td></tr>
                <tr><td className="px-3 py-2">4</td><td className="px-3 py-2">Insecure Design</td><td className="px-3 py-2">설계 단계 결함</td></tr>
                <tr><td className="px-3 py-2">5</td><td className="px-3 py-2">Security Misconfiguration</td><td className="px-3 py-2">디폴트 비밀번호</td></tr>
                <tr><td className="px-3 py-2">6</td><td className="px-3 py-2">Vulnerable Components</td><td className="px-3 py-2">오래된 라이브러리</td></tr>
                <tr><td className="px-3 py-2">7</td><td className="px-3 py-2">Identification & Auth Failures</td><td className="px-3 py-2">약한 비밀번호 정책</td></tr>
                <tr><td className="px-3 py-2">8</td><td className="px-3 py-2">Software & Data Integrity Failures</td><td className="px-3 py-2">무결성 검사 없음</td></tr>
                <tr><td className="px-3 py-2">9</td><td className="px-3 py-2">Security Logging & Monitoring Failures</td><td className="px-3 py-2">로그 부재</td></tr>
                <tr><td className="px-3 py-2">10</td><td className="px-3 py-2">SSRF</td><td className="px-3 py-2">서버에서 공격자 요청 강제</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-2">→ 행안부 시큐어코딩 49항도 OWASP Top 10 기반.</p>
        </SubSection>

        <SubSection title='● "WAF가 OWASP 룰로 공격 차단" 의미'>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`[공격자]
   │ POST /api/login
   │ {"username": "admin' OR 1=1 --"}
   ↓
[WAF]
   ├─ OWASP Core Rule Set (CRS) 검사
   ├─ "OR 1=1" 패턴 발견 → SQL Injection 시도!
   └─ 403 Forbidden 응답, 차단
   ↓ (정상 요청만 통과)
[Spring Boot]`}</pre>
          </div>
        </SubSection>

        <SubSection title="● NHN Cloud의 WAF">
          <p className="text-sm mb-2">NHN Cloud는 <span className="font-medium">App Security</span>라는 이름으로 WAF 제공:</p>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li>OWASP Core Rule Set 자동 활성화</li>
            <li>한국형 룰셋 추가 (한글 인젝션, 한국 봇 패턴)</li>
            <li>차단 로그 6개월 보존</li>
            <li>콘솔에서 룰 ON/OFF 가능</li>
          </ul>
          <Insight>
            본 프로젝트는 WAF + 응용단 XSS 필터(XssFilterConfig) 이중 방어.
          </Insight>
        </SubSection>
      </CalcBox>

      {/* ===== D.4 JPA + QueryDSL ===== */}
      <CalcBox title="■ D.4 JPA + QueryDSL (Repository 계층)">
        <p className="text-sm mb-3">3가지 다른 개념이다.</p>

        <SubSection title="● Repository — DB 접근 계층">
          <p className="text-sm mb-2">Spring Boot의 계층 구조:</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`[Controller]    ← HTTP 요청 받음 (@RestController)
     ↓
[Service]       ← 비즈니스 로직 (@Service, @Transactional)
     ↓
[Repository]    ← DB 접근 ← 여기
     ↓
[Database]      ← PostgreSQL`}</pre>
          </div>
          <p className="text-sm text-muted mt-2">→ Repository = &quot;DB와 대화하는 클래스&quot;</p>
        </SubSection>

        <SubSection title="● JPA — Java Persistence API">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3 mb-2">
            <pre>{`JPA = Java Persistence API
      (Java 영속성 API)`}</pre>
          </div>
          <p className="text-sm mb-2">
            <span className="font-medium">Java 객체를 DB 테이블과 매핑하는 표준 명세</span>. 직접 SQL을 안 쓰고 Java 코드로 DB 조작.
          </p>
          <p className="text-sm font-medium mt-3 mb-1">Before JPA (순수 JDBC)</p>
          <div className="font-mono text-xs bg-sidebar-bg border border-sidebar-border rounded-lg p-3 mb-3">
            <pre>{`String sql = "SELECT id, name FROM ordinance WHERE id = ?";
PreparedStatement ps = connection.prepareStatement(sql);
ps.setLong(1, 100);
ResultSet rs = ps.executeQuery();
while (rs.next()) {
    Ordinance o = new Ordinance();
    o.setId(rs.getLong("id"));
    o.setName(rs.getString("name"));
}`}</pre>
          </div>
          <p className="text-sm font-medium mb-1">After JPA (Spring Data JPA)</p>
          <div className="font-mono text-xs bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`public interface OrdinanceRepository extends JpaRepository<Ordinance, Long> {
    // 메서드 이름만으로 SQL 자동 생성
    List<Ordinance> findByName(String name);
    Optional<Ordinance> findByIdAndStatus(Long id, String status);
}

// 사용
Ordinance o = ordinanceRepository.findById(100L).orElseThrow();`}</pre>
          </div>
          <p className="text-sm text-muted mt-2">→ SQL 안 짜고 메서드 이름만으로 쿼리 생성.</p>
        </SubSection>

        <SubSection title="● QueryDSL — Type-safe SQL builder">
          <p className="text-sm mb-2">JPA의 한계: 복잡한 동적 쿼리는 어려움. QueryDSL은 이를 타입세이프한 Java 코드로 작성:</p>
          <div className="font-mono text-xs bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`public List<Ordinance> search(String name, String status) {
    return queryFactory
        .selectFrom(ordinance)
        .where(
            nameContains(name),     // null이면 무시
            statusEq(status)
        )
        .fetch();
}

private BooleanExpression nameContains(String name) {
    return name == null ? null : ordinance.name.contains(name);
}`}</pre>
          </div>
          <p className="text-sm text-muted mt-2">→ 컴파일 시점에 SQL 오류 검출, IDE 자동완성 지원.</p>
        </SubSection>

        <SubSection title="● 본 프로젝트의 사용">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">용도</th>
                  <th className="px-3 py-2 text-left">도구</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-mono text-xs">findById, save 단순 CRUD</td><td className="px-3 py-2 font-medium">Spring Data JPA</td></tr>
                <tr><td className="px-3 py-2 font-mono text-xs">findByName 메서드 이름 쿼리</td><td className="px-3 py-2 font-medium">Spring Data JPA</td></tr>
                <tr><td className="px-3 py-2">복잡한 동적 검색·페이징</td><td className="px-3 py-2 font-medium">QueryDSL</td></tr>
                <tr><td className="px-3 py-2">통계 쿼리·서브쿼리</td><td className="px-3 py-2 font-medium">QueryDSL</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="● 시큐어코딩 §1-1 (SQL Injection) 충족">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">방식</th>
                  <th className="px-3 py-2 text-left">SQL Injection 방어</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2">순수 JDBC</td><td className="px-3 py-2">PreparedStatement 직접 사용 (실수 가능)</td></tr>
                <tr><td className="px-3 py-2 font-medium">JPA @Param</td><td className="px-3 py-2">✅ 자동 파라미터 바인딩</td></tr>
                <tr><td className="px-3 py-2 font-medium">QueryDSL</td><td className="px-3 py-2">✅ 타입세이프, SQL 직접 생성 안 함</td></tr>
              </tbody>
            </table>
          </div>
          <Insight>본 프로젝트는 JPA + QueryDSL 조합으로 SQL Injection 자동 방어.</Insight>
        </SubSection>
      </CalcBox>

      {/* ===== D.5 NAT Gateway / Egress ===== */}
      <CalcBox title="■ D.5 NAT Gateway / Egress">
        <SubSection title="● NAT — Network Address Translation">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3 mb-2">
            <pre>{`NAT = Network Address Translation
      (네트워크 주소 변환)`}</pre>
          </div>
          <p className="text-sm">
            여러 내부 IP를 하나의 외부 IP로 변환해주는 기술.
          </p>
        </SubSection>

        <SubSection title="● NAT Gateway">
          <p className="text-sm">
            VPC(가상 사설 클라우드)에서 외부 인터넷으로 나갈 때 사용하는 <span className="font-medium">단일 출구</span>.
          </p>
        </SubSection>

        <SubSection title="● 왜 필요한가 — 문제 상황">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`[VPC 내부]
├── Pod 1 (Private IP: 10.0.1.10)  ← 외부 인터넷 IP 없음
├── Pod 2 (Private IP: 10.0.1.11)
└── Pod 3 (Private IP: 10.0.1.12)
                ↓
       법제처 API 호출 시도
                ↓
              ???
              인터넷에 못 나감 (Private IP라서)`}</pre>
          </div>
          <p className="text-sm text-muted mt-2">→ Private IP는 외부에서 인식 못함.</p>
        </SubSection>

        <SubSection title="● 해결: NAT Gateway">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`[VPC 내부]
├── Pod 1 (10.0.1.10) ─┐
├── Pod 2 (10.0.1.11) ─┤
└── Pod 3 (10.0.1.12) ─┤
                       ↓
              [NAT Gateway]   ← 모든 Pod의 출구
              Public IP: 203.0.113.5
                       ↓
                  [인터넷]
                       ↓
                [법제처 Open API]
                "203.0.113.5에서 요청 옴"
                       ↓
                  [응답]
                       ↓
              [NAT Gateway]   ← 어느 Pod이 보냈는지 추적
                       ↓
              [Pod 1] ← 정확히 보낸 Pod에 전달`}</pre>
          </div>
        </SubSection>

        <SubSection title="● Egress = 외부로 나가는 트래픽">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">용어</th>
                  <th className="px-3 py-2 text-left">의미</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">Ingress</td><td className="px-3 py-2">외부 → 내부 (들어옴)</td></tr>
                <tr><td className="px-3 py-2 font-medium">Egress</td><td className="px-3 py-2">내부 → 외부 (나감)</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-2">→ NAT Gateway 통한 외부 호출 = Egress.</p>
        </SubSection>

        <SubSection title="● 보안 효과">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">효과</th>
                  <th className="px-3 py-2 text-left">설명</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">IP 숨김</td><td className="px-3 py-2">Pod의 실제 IP를 외부에 안 노출</td></tr>
                <tr><td className="px-3 py-2 font-medium">방화벽 정책</td><td className="px-3 py-2">NAT Gateway IP만 화이트리스트 등록 (법제처에서)</td></tr>
                <tr><td className="px-3 py-2 font-medium">로그 단순화</td><td className="px-3 py-2">모든 외부 호출이 한 IP로 통합</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="● Egress 제어 (선택)">
          <p className="text-sm mb-2">본 프로젝트에서 application.yml에 외부 URL을 하드코딩한 이유 (시큐어코딩 §1-6):</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`moleg:
  base-url: https://www.law.go.kr   # 고정 URL`}</pre>
          </div>
          <p className="text-sm text-muted mt-2">→ NAT Gateway는 통과시키지만, 응용 SW 레벨에서 사용자 입력 기반 동적 URL 호출 차단.</p>
        </SubSection>
      </CalcBox>

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

      {/* ===== D.12 Public Subnet 3대 관문 ===== */}
      <CalcBox title="■ D.12 Public Subnet 3대 관문 — ALB · NAT · Bastion 통합 패턴">
        <SubSection title="● 핵심 원칙">
          <Insight>
            인터넷과 직접 통신하는 모든 것은 Public Subnet, 나머지는 Private Subnet.
          </Insight>
          <p className="text-sm mt-2 text-muted">
            VPC 안에서 외부와 직접 패킷을 주고받는 컴포넌트는 모두 Public Subnet에 배치해야 함. 그렇지 않으면 라우팅 자체가 불가능(IGW에 도달할 길이 없음).
          </p>
        </SubSection>

        <SubSection title="● 3개의 관문(Gate)">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">관문</th>
                  <th className="px-3 py-2 text-left">트래픽 방향</th>
                  <th className="px-3 py-2 text-left">무엇을 하는가</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">ALB</td><td className="px-3 py-2">인터넷 → 내부 (Ingress)</td><td className="px-3 py-2">사용자 요청을 Pod로 분배</td></tr>
                <tr><td className="px-3 py-2 font-medium">NAT Gateway</td><td className="px-3 py-2">내부 → 인터넷 (Egress)</td><td className="px-3 py-2">Pod이 법제처 API 호출 시 통과</td></tr>
                <tr><td className="px-3 py-2 font-medium">Bastion Host</td><td className="px-3 py-2">관리자 → 내부 (Ingress)</td><td className="px-3 py-2">운영자가 SSH/kubectl 접속 시 통과</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-2">→ Public Subnet은 &quot;관문들의 집합&quot;, Private Subnet은 &quot;보호되는 자원의 집합&quot;.</p>
        </SubSection>

        <SubSection title="● 통합 다이어그램">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`        [인터넷]
            │
    ┌───────┴───────┐
    │      IGW      │
    └───────┬───────┘
            │
┌───────────┴────────────────────────┐
│  Public Subnet                     │
│  ┌──────┐ ┌──────┐ ┌──────────┐    │
│  │ ALB  │ │ NAT  │ │ Bastion  │    │
│  └──┬───┘ └──┬───┘ └────┬─────┘    │
└─────┼────────┼──────────┼──────────┘
      │        │          │
┌─────┼────────┼──────────┼──────────┐
│  Private Subnet                    │
│  ┌──▼─────┐  │     ┌────▼─────┐    │
│  │ App    │◄─┘     │ DB/Redis │    │
│  │ (Pod)  │────────►          │    │
│  └────────┘        └──────────┘    │
└────────────────────────────────────┘`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 라우팅 테이블">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">서브넷</th>
                  <th className="px-3 py-2 text-left">0.0.0.0/0 라우팅</th>
                  <th className="px-3 py-2 text-left">위치한 자원</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">Public Subnet</td><td className="px-3 py-2 font-mono text-xs">→ IGW</td><td className="px-3 py-2">ALB, NAT Gateway, Bastion</td></tr>
                <tr><td className="px-3 py-2 font-medium">Private Subnet</td><td className="px-3 py-2 font-mono text-xs">→ NAT Gateway</td><td className="px-3 py-2">App Pod, DB, Redis, 배치/스케줄러</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="● Public에 둬도 안전한 이유 — 관문별 공격면 축소">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">관문</th>
                  <th className="px-3 py-2 text-left">공격면 축소 방법</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">ALB</td><td className="px-3 py-2">80/443만 개방, WAF 연동, TLS 종단</td></tr>
                <tr><td className="px-3 py-2 font-medium">NAT Gateway</td><td className="px-3 py-2"><span className="font-medium">인바운드 연결 자체를 받지 않음</span> (Stateful — 내부에서 시작한 응답만 통과)</td></tr>
                <tr><td className="px-3 py-2 font-medium">Bastion</td><td className="px-3 py-2">IP 화이트리스트 + MFA + 22번 포트만</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-2">→ NAT Gateway는 &quot;Public에 있지만 외부에서 시작하는 연결은 거부&quot; 하므로 사실상 안전. ALB·Bastion만 실질적 공격면.</p>
        </SubSection>

        <SubSection title="● 흔한 혼동 포인트">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">혼동</th>
                  <th className="px-3 py-2 text-left">정정</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2">&quot;Egress용 NAT면 Private에 두는 거 아닌가?&quot;</td><td className="px-3 py-2">NAT 자체가 IGW와 통신해야 하므로 <span className="font-medium">반드시 Public</span>. Egress 대상(앱 서버)이 Private에 있는 것</td></tr>
                <tr><td className="px-3 py-2">&quot;Bastion도 위험하니 숨겨야지&quot;</td><td className="px-3 py-2">숨기는 게 아니라 <span className="font-medium">공격면을 1대로 좁혀서 단일 진입점만 강화</span>하는 패턴</td></tr>
                <tr><td className="px-3 py-2">&quot;ALB는 LB니까 어디든 OK&quot;</td><td className="px-3 py-2">사용자(인터넷)에서 직접 받으려면 <span className="font-medium">반드시 Public</span>. 내부 전용 ALB라면 Private에 두기도 함</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <Insight>
          AZ 이중화 권장 — NAT/ALB/Bastion은 각 AZ에 하나씩 배치. 단일 AZ NAT가 죽으면 그 AZ Private 서브넷 전체가 인터넷 단절.
        </Insight>
      </CalcBox>

      {/* ===== D.13 Data 3축 ===== */}
      <CalcBox title="■ D.13 Data 계층 3축 — PostgreSQL · Redis · Object Storage">
        <SubSection title="● 핵심 원칙">
          <Insight>Data 계층 = DB(정형) + Cache(휘발성) + Object Storage(비정형)</Insight>
          <p className="text-sm mt-2 text-muted">
            데이터는 성질에 따라 3가지 저장소로 분리. 한 곳에 다 넣으려 하면 어느 한 축이 병목·비용 폭증의 원인이 됨.
          </p>
        </SubSection>

        <SubSection title="● 3축 비교">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">구성요소</th>
                  <th className="px-3 py-2 text-left">저장 대상</th>
                  <th className="px-3 py-2 text-left">특징</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">PostgreSQL</td><td className="px-3 py-2">정형 데이터 (users, ordinances, reviews)</td><td className="px-3 py-2">트랜잭션, 관계, 영속성</td></tr>
                <tr><td className="px-3 py-2 font-medium">Redis</td><td className="px-3 py-2">휘발성·임시 데이터</td><td className="px-3 py-2">RAM 기반, ms 단위 응답</td></tr>
                <tr><td className="px-3 py-2 font-medium">Object Storage</td><td className="px-3 py-2">비정형 파일 (PDF, 이미지, 첨부)</td><td className="px-3 py-2">무제한 확장, URL로 접근</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="● Redis는 단순 캐시가 아니다">
          <p className="text-sm mb-2">&quot;캐시 = Redis&quot;로만 인식하면 절반만 활용. 실무 용도:</p>
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">용도</th>
                  <th className="px-3 py-2 text-left">사용 명령어/패턴</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">DB 조회 캐시</td><td className="px-3 py-2 font-mono text-xs">SET key value EX 60 (TTL)</td></tr>
                <tr><td className="px-3 py-2 font-medium">세션 / JWT 블랙리스트</td><td className="px-3 py-2 font-mono text-xs">SET jti:abc123 1 EX 3600</td></tr>
                <tr><td className="px-3 py-2 font-medium">Rate Limiting</td><td className="px-3 py-2 font-mono text-xs">INCR + EXPIRE</td></tr>
                <tr><td className="px-3 py-2 font-medium">분산 락 (중복 실행 방지)</td><td className="px-3 py-2 font-mono text-xs">SETNX / Redlock</td></tr>
                <tr><td className="px-3 py-2 font-medium">Pub/Sub (실시간 알림)</td><td className="px-3 py-2 font-mono text-xs">PUBLISH / SUBSCRIBE</td></tr>
                <tr><td className="px-3 py-2 font-medium">랭킹 / 정렬 집합</td><td className="px-3 py-2 font-mono text-xs">ZADD (Sorted Set)</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="● Object Storage가 별도여야 하는 이유">
          <p className="text-sm mb-2">PostgreSQL에 PDF·이미지를 BLOB로 넣으면 안 되는 이유:</p>
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">문제</th>
                  <th className="px-3 py-2 text-left">설명</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">백업 폭증</td><td className="px-3 py-2">DB 백업 시간이 수 시간으로 늘어남</td></tr>
                <tr><td className="px-3 py-2 font-medium">메모리 비효율</td><td className="px-3 py-2">DB 버퍼풀이 파일에 잠식됨</td></tr>
                <tr><td className="px-3 py-2 font-medium">CDN 연동 불가</td><td className="px-3 py-2">URL 단위 캐싱이 어려움</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-2">→ Object Storage에 올리고 DB에는 URL/key만 저장. NHN Object Storage는 자동 3중 복제로 내구성 보장.</p>
        </SubSection>

        <SubSection title="● 본 프로젝트 매핑">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">계층</th>
                  <th className="px-3 py-2 text-left">NHN Cloud 서비스</th>
                  <th className="px-3 py-2 text-left">law-matcher 데이터</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">DB</td><td className="px-3 py-2">DB Service for PostgreSQL (RDS)</td><td className="px-3 py-2">자치법규, 검토 결과, 사용자</td></tr>
                <tr><td className="px-3 py-2 font-medium">Cache</td><td className="px-3 py-2">DB Service for Redis</td><td className="px-3 py-2">JWT 블랙리스트, 분산 락, 조례 캐시</td></tr>
                <tr><td className="px-3 py-2 font-medium">Storage</td><td className="px-3 py-2">Object Storage</td><td className="px-3 py-2">조례 PDF 원문, 첨부 파일</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="● 4축·5축으로의 확장 (참고)">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">도구</th>
                  <th className="px-3 py-2 text-left">용도</th>
                  <th className="px-3 py-2 text-left">도입 시점</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">Elasticsearch / OpenSearch</td><td className="px-3 py-2">조례 본문 전문 검색</td><td className="px-3 py-2">SQL LIKE 한계 도달 시</td></tr>
                <tr><td className="px-3 py-2 font-medium">Prometheus / InfluxDB</td><td className="px-3 py-2">메트릭 시계열</td><td className="px-3 py-2">자체 메트릭 필요 시</td></tr>
                <tr><td className="px-3 py-2 font-medium">Kafka / RabbitMQ</td><td className="px-3 py-2">비동기 작업 큐</td><td className="px-3 py-2">Pod 간 이벤트 전달 필요 시</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-2">→ 현 단계는 3축이면 충분. 검색 병목 시 OpenSearch 추가하는 식으로 점진 도입.</p>
        </SubSection>
      </CalcBox>

      {/* ===== D.14 Observability 3축 ===== */}
      <CalcBox title="■ D.14 Observability 3축 — System Monitoring · APM · Log & Crash">
        <SubSection title="● 한 줄 정리">
          <Insight>
            운영 관측성(Observability)은 Metrics + Traces + Logs 3축. NHN Cloud에서는 System Monitoring · Pinpoint APM · Log &amp; Crash Search가 담당.
          </Insight>
        </SubSection>

        <SubSection title="● 3축 비교">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">서비스</th>
                  <th className="px-3 py-2 text-left">데이터 형태</th>
                  <th className="px-3 py-2 text-left">보는 대상</th>
                  <th className="px-3 py-2 text-left">답하는 질문</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">System Monitoring</td><td className="px-3 py-2">Metrics (시계열 숫자)</td><td className="px-3 py-2">인프라 (CPU/Memory/Disk)</td><td className="px-3 py-2"><span className="font-medium">서버가 살아있나?</span></td></tr>
                <tr><td className="px-3 py-2 font-medium">Pinpoint APM</td><td className="px-3 py-2">Traces (요청 경로)</td><td className="px-3 py-2">애플리케이션 (코드 레벨)</td><td className="px-3 py-2"><span className="font-medium">왜 느린가?</span></td></tr>
                <tr><td className="px-3 py-2 font-medium">Log &amp; Crash Search</td><td className="px-3 py-2">Logs (텍스트)</td><td className="px-3 py-2">로그·에러</td><td className="px-3 py-2"><span className="font-medium">무슨 일이 있었나?</span></td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="● 1. System Monitoring (Metrics)">
          <p className="text-sm mb-2">숫자 시계열 — 시간에 따른 변화 추적.</p>
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">메트릭</th>
                  <th className="px-3 py-2 text-left">알람 예시</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">CPU 사용률</td><td className="px-3 py-2">80% 초과 시 알람</td></tr>
                <tr><td className="px-3 py-2 font-medium">Memory 사용률</td><td className="px-3 py-2">90% 초과 시 OOM 임박</td></tr>
                <tr><td className="px-3 py-2 font-medium">Disk 사용량</td><td className="px-3 py-2">90% 초과 시 알람</td></tr>
                <tr><td className="px-3 py-2 font-medium">Network I/O</td><td className="px-3 py-2">비정상 트래픽 (DDoS 의심)</td></tr>
                <tr><td className="px-3 py-2 font-medium">프로세스 상태</td><td className="px-3 py-2">Spring Boot 다운 감지</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-2">→ Auto Scaling 트리거, 알람 발송의 근거.</p>
        </SubSection>

        <SubSection title="● 2. Pinpoint APM (Traces)">
          <p className="text-sm mb-2">
            오픈소스 Pinpoint(네이버 제작) 기반의 NHN 매니지드 서비스. 요청 1건이 어느 메서드를 거쳐 어디서 시간을 쓰는지 시각화:
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`GET /api/ordinances/123        총 1,250ms
├─ OrdinanceController.get()      2ms
│  └─ OrdinanceService.find()    1,245ms  ⚠️
│     ├─ Repository.findById()      8ms
│     │  └─ SELECT * FROM ord...    5ms
│     └─ ExternalApi.call()     1,230ms  ★ 병목!
│        └─ HTTP GET law.go.kr  1,228ms
└─ Response                        3ms`}</pre>
          </div>
          <p className="text-sm text-muted mt-2">→ N+1 쿼리, 외부 API 지연, 분산 트레이스 추적. Java/Spring 환경 특화 — 본 프로젝트(Spring Boot 3.x)에 적합.</p>
        </SubSection>

        <SubSection title="● 3. Log & Crash Search (Logs)">
          <p className="text-sm mb-2">텍스트 검색 기반 로그 수집(ELK·CloudWatch Logs와 유사).</p>
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">용도</th>
                  <th className="px-3 py-2 text-left">예시 쿼리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">에러 검색</td><td className="px-3 py-2 font-mono text-xs">level:ERROR AND user_id:1234</td></tr>
                <tr><td className="px-3 py-2 font-medium">감사 로그</td><td className="px-3 py-2">2026-05-08 누가 무엇을 조회했나</td></tr>
                <tr><td className="px-3 py-2 font-medium">디버깅</td><td className="px-3 py-2">특정 trace_id 추적</td></tr>
                <tr><td className="px-3 py-2 font-medium">보안 로그</td><td className="px-3 py-2">로그인 실패 패턴 분석</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-2">→ 행안부 보안성 검토에서 감사 로그 1년 이상 보존이 필수라 공공 프로젝트에서 사실상 필수.</p>
        </SubSection>

        <SubSection title="● 셋의 협업 시나리오">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`① 알람 수신
   "API 응답시간 5초 초과"
   → System Monitoring이 감지·발송

② 원인 추적
   "어느 구간이 느린가?"
   → Pinpoint APM에서 trace 확인
   → "PostgreSQL 쿼리가 4.5초"

③ 근본 원인
   "왜 그 쿼리가 느려졌나?"
   → Log & Crash Search에서 해당 시간대 로그 조회
   → "특정 사용자가 대량 조회 중"

④ 조치
   → Rate Limit 적용, 인덱스 추가`}</pre>
          </div>
          <p className="text-sm text-muted mt-2">→ Metrics가 장애를 빨리 발견, Traces가 원인을 좁히고, Logs가 근거를 찾는 분업 구조.</p>
        </SubSection>

        <SubSection title="● 본 프로젝트 연동 방법">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">도구</th>
                  <th className="px-3 py-2 text-left">연동 방법</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">System Monitoring</td><td className="px-3 py-2">NHN Cloud 인스턴스 자동 연동 (에이전트 설치)</td></tr>
                <tr><td className="px-3 py-2 font-medium">Pinpoint APM</td><td className="px-3 py-2 font-mono text-xs">-javaagent:pinpoint-bootstrap.jar JVM 옵션</td></tr>
                <tr><td className="px-3 py-2 font-medium">Log &amp; Crash Search</td><td className="px-3 py-2">Logback Appender 또는 Filebeat 수집</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>
      </CalcBox>

      {/* ===== D.15 APM 상세 ===== */}
      <CalcBox title="■ D.15 APM — Application Performance Monitoring 상세">
        <SubSection title="● 한 줄 정의">
          <Insight>코드 안에서 무슨 일이 일어나는지 들여다보는 도구.</Insight>
          <p className="text-sm mt-2 text-muted">
            System Monitoring이 &quot;서버 바깥&quot;(CPU/Memory)을 본다면, APM은 &quot;서버 안의 코드&quot;를 봄.
          </p>
        </SubSection>

        <SubSection title="● 메트릭만으로 답할 수 없는 질문">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">질문</th>
                  <th className="px-3 py-2 text-center">System Monitoring</th>
                  <th className="px-3 py-2 text-center">APM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2">CPU 사용률은?</td><td className="px-3 py-2 text-center">✅</td><td className="px-3 py-2 text-center">❌</td></tr>
                <tr><td className="px-3 py-2 font-medium">어느 API가 느린가?</td><td className="px-3 py-2 text-center">❌</td><td className="px-3 py-2 text-center">✅</td></tr>
                <tr><td className="px-3 py-2 font-medium">어느 메서드가 병목인가?</td><td className="px-3 py-2 text-center">❌</td><td className="px-3 py-2 text-center">✅</td></tr>
                <tr><td className="px-3 py-2 font-medium">어떤 SQL이 느린가?</td><td className="px-3 py-2 text-center">❌</td><td className="px-3 py-2 text-center">✅</td></tr>
                <tr><td className="px-3 py-2">메모리 사용률은?</td><td className="px-3 py-2 text-center">✅</td><td className="px-3 py-2 text-center">❌</td></tr>
                <tr><td className="px-3 py-2 font-medium">GC가 얼마나 자주 도나?</td><td className="px-3 py-2 text-center">△</td><td className="px-3 py-2 text-center">✅</td></tr>
                <tr><td className="px-3 py-2 font-medium">외부 API 호출 시간은?</td><td className="px-3 py-2 text-center">❌</td><td className="px-3 py-2 text-center">✅</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="● APM이 보여주는 4가지">
          <ol className="text-sm list-decimal list-inside space-y-1">
            <li><span className="font-medium">요청 흐름 (Distributed Trace)</span> — 요청 1건의 전체 경로를 메서드 단위로 분해 (D.14 trace 예시 참조)</li>
            <li><span className="font-medium">메서드별 호출 통계</span> — 호출 수, 평균/P95/P99 응답 시간</li>
            <li><span className="font-medium">DB 쿼리 분석</span> — N+1 자동 탐지, Slow Query, Connection Pool 상태</li>
            <li><span className="font-medium">JVM 내부</span> — Heap 사용량, GC Pause, Thread 상태(Deadlock), ClassLoader</li>
          </ol>
        </SubSection>

        <SubSection title="● 대표 APM 제품">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">분류</th>
                  <th className="px-3 py-2 text-left">제품</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">상용 (글로벌)</td><td className="px-3 py-2">Datadog APM, New Relic, Dynatrace, AppDynamics</td></tr>
                <tr><td className="px-3 py-2 font-medium">상용·오픈소스 (국산)</td><td className="px-3 py-2"><span className="font-medium">Pinpoint</span> (네이버), WhaTap, Scouter</td></tr>
                <tr><td className="px-3 py-2 font-medium">오픈소스</td><td className="px-3 py-2">OpenTelemetry, Jaeger, Zipkin, Elastic APM</td></tr>
                <tr><td className="px-3 py-2 font-medium">클라우드 매니지드</td><td className="px-3 py-2">NHN Pinpoint APM, AWS X-Ray, GCP Cloud Trace</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-2">→ 한국 공공·금융권에서는 국산 Pinpoint 채택률이 압도적. CSAP 보안성 검토에 유리.</p>
        </SubSection>

        <SubSection title="● 동작 원리 — Java Agent (Bytecode Instrumentation)">
          <p className="text-sm mb-2">APM은 코드 수정 없이 JVM 시작 시 옵션 부착으로 동작:</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`java -javaagent:/opt/pinpoint/pinpoint-bootstrap.jar \\
     -Dpinpoint.agentId=law-matcher-prod-1 \\
     -Dpinpoint.applicationName=law-matcher \\
     -jar law-matcher.jar`}</pre>
          </div>
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm mt-3">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">단계</th>
                  <th className="px-3 py-2 text-left">동작</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">클래스 로드 시점</td><td className="px-3 py-2">Agent가 bytecode에 측정 코드 자동 주입</td></tr>
                <tr><td className="px-3 py-2 font-medium">메서드 호출 시점</td><td className="px-3 py-2">진입·종료 시각, 인자, 반환값 수집</td></tr>
                <tr><td className="px-3 py-2 font-medium">수집 데이터</td><td className="px-3 py-2">별도 Pinpoint Collector 서버로 전송</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-2">→ 소스코드 변경 0줄. 운영 중에도 옵션만 추가하면 적용 가능.</p>
        </SubSection>

        <SubSection title="● 비용 / 오버헤드">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">항목</th>
                  <th className="px-3 py-2 text-left">일반적 수치</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">성능 오버헤드</td><td className="px-3 py-2">3~5% (잘 설정된 경우)</td></tr>
                <tr><td className="px-3 py-2 font-medium">잘못 설정 시</td><td className="px-3 py-2">10~20%까지 증가 가능</td></tr>
                <tr><td className="px-3 py-2 font-medium">운영 권장 샘플링</td><td className="px-3 py-2">5~10% (전체 요청 중 측정 비율)</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="● 본 프로젝트 적용 시 자동 추적 항목">
          <p className="text-sm mb-2">Pinpoint Agent를 Spring Boot 3.x 환경에 부착하면 자동 추적되는 영역:</p>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li>모든 <code className="text-xs">@RestController</code> 엔드포인트</li>
            <li><code className="text-xs">@Service</code> / <code className="text-xs">@Repository</code> 메서드</li>
            <li>JPA / QueryDSL 쿼리</li>
            <li><code className="text-xs">RestTemplate</code> / <code className="text-xs">WebClient</code> 외부 호출 (법제처 API)</li>
            <li>Redis 명령어</li>
            <li>JWT 처리 시간</li>
          </ul>
          <p className="text-sm text-muted mt-2">→ &quot;조례 검색이 느리다&quot; 민원 시 추측이 아니라 데이터로 원인 지목 가능.</p>
        </SubSection>

        <SubSection title="● 정리 — 운영 관측성에서 APM의 위치">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">도구</th>
                  <th className="px-3 py-2 text-left">비유</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">System Monitoring</td><td className="px-3 py-2">환자의 체온/혈압 (Vital Signs)</td></tr>
                <tr><td className="px-3 py-2 font-medium">APM</td><td className="px-3 py-2"><span className="font-medium">환자의 CT 사진 (Internal View)</span></td></tr>
                <tr><td className="px-3 py-2 font-medium">Logs</td><td className="px-3 py-2">진료 기록부</td></tr>
              </tbody>
            </table>
          </div>
          <Insight>성능 문제를 추측이 아니라 측정으로 해결하게 해주는 도구.</Insight>
        </SubSection>
      </CalcBox>
    </div>
  );
}
