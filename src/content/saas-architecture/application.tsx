"use client";

import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 응용 SW 계층 — §3 사용자, §4 Spring Boot/Tomcat/Nginx, §5 JVM, §6 Docker, §7 Pod */
export default function ApplicationContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        강남구청 책임 영역 — ① 사용자부터 ⑤ Pod까지의 응용 SW 계층. Spring Boot 프레임워크, 내장 Tomcat, JVM, Docker 컨테이너, K8s Pod의 역할.
      </p>

      {/* ===== §3 사용자 ===== */}
      <CalcBox title="■ §3. ① 사용자 (User)">
        <SubSection title="● 무엇인가">
          <p className="text-sm">시스템을 사용하는 사람 또는 외부 시스템.</p>
        </SubSection>

        <SubSection title="● 구성 요소">
          <ul className="text-sm list-disc list-inside space-y-1">
            <li>강남구청 직원 (조례 및 기획예산 담당자)</li>
            <li>관리자/개발자 (시스템 운영자)</li>
            <li>외부 연계 API (법제처 Open API, LLM API)</li>
          </ul>
        </SubSection>

        <SubSection title="● 역할">
          <ul className="text-sm list-disc list-inside space-y-1">
            <li>웹 브라우저로 시스템 접속 (HTTPS)</li>
            <li>자치법규 등록·검색·검토 업무 수행</li>
            <li>
              <span className="font-medium">관리자는 Bastion Host(점프 서버)를 통해 SSH + MFA로 접속하여 kubectl/psql로 시스템 점검</span>
            </li>
          </ul>
        </SubSection>

        <SubSection title="● 보안 통제">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">대상</th>
                  <th className="px-3 py-2 text-left">인증 수단</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2">일반 사용자</td><td className="px-3 py-2">JWT 인증</td></tr>
                <tr><td className="px-3 py-2">관리자</td><td className="px-3 py-2">SSH + MFA</td></tr>
                <tr><td className="px-3 py-2">외부 시스템</td><td className="px-3 py-2">API Key</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <Insight>
          관리자 접속은 반드시 Bastion Host를 경유하며, SSH 키 + OTP의 2단계 인증(MFA)으로 보호. 자세한 흐름은 §20 관리자 접속 참조.
        </Insight>
      </CalcBox>

      {/* ===== §4 응용 SW (Spring Boot) ===== */}
      <CalcBox title="■ §4. ② 응용 SW (Spring Boot)">
        <SubSection title="● §4.1 Spring Boot 프레임워크 — 한 줄 정의">
          <p className="text-sm mb-2">Java로 서버를 빠르게 만들 수 있게 해주는 프레임워크.</p>
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium w-40">버전</td><td className="px-3 py-2">Spring Boot 3.2.5</td></tr>
                <tr><td className="px-3 py-2 font-medium">만든 곳</td><td className="px-3 py-2">VMware (옛 Pivotal)</td></tr>
                <tr><td className="px-3 py-2 font-medium">언어</td><td className="px-3 py-2">Java (Kotlin도 가능)</td></tr>
                <tr><td className="px-3 py-2 font-medium">공공기관 비중</td><td className="px-3 py-2">80%+ (eGovFramework 기반)</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="● Spring Boot의 4대 특징">
          <ol className="text-sm list-decimal list-inside space-y-1">
            <li><span className="font-medium">Auto Configuration</span> — pom.xml 의존성만 추가하면 관련 설정을 자동 활성화. 예: <code className="text-xs">spring-boot-starter-web</code> 추가 시 내장 Tomcat·JSON 변환기(Jackson)·MVC 설정이 한꺼번에 적용됨. 개발자가 XML 설정 파일을 별도 작성할 필요 없음.</li>
            <li><span className="font-medium">Embedded Server</span> — Tomcat이 JAR에 포함되어 별도 설치 불필요</li>
            <li><span className="font-medium">Starter</span> — starter-web, starter-data-jpa 등 기능별 묶음</li>
            <li><span className="font-medium">Production-Ready</span> — 헬스체크·메트릭·로그 자동 제공</li>
          </ol>
        </SubSection>

        <SubSection title="● 핵심 어노테이션">
          <p className="text-sm mb-3">
            <strong>어노테이션</strong>이란 <code className="text-xs">@</code>으로 시작하는 Java 메타데이터 태그입니다.
            클래스·메서드·필드 앞에 붙여 &quot;이 코드가 어떤 역할을 한다&quot;고 Spring Boot에게 알립니다.
            어노테이션 하나로 수십 줄의 XML 설정을 대체합니다.
          </p>
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">어노테이션</th>
                  <th className="px-3 py-2 text-left">역할</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-mono text-xs">@SpringBootApplication</td><td className="px-3 py-2">진입점</td></tr>
                <tr><td className="px-3 py-2 font-mono text-xs">@RestController + @GetMapping</td><td className="px-3 py-2">REST API 메서드 매핑</td></tr>
                <tr><td className="px-3 py-2 font-mono text-xs">@Service + @Transactional</td><td className="px-3 py-2">비즈니스 로직, 트랜잭션 자동 관리</td></tr>
                <tr><td className="px-3 py-2 font-mono text-xs">@Repository (JpaRepository)</td><td className="px-3 py-2">DB 접근, 메서드 이름으로 SQL 자동 생성</td></tr>
                <tr><td className="px-3 py-2 font-mono text-xs">@Entity + @Table</td><td className="px-3 py-2">DB 테이블 매핑</td></tr>
                <tr><td className="px-3 py-2 font-mono text-xs">@Configuration + @Bean</td><td className="px-3 py-2">설정 클래스</td></tr>
                <tr><td className="px-3 py-2 font-mono text-xs">@Valid + @NotNull, @Size</td><td className="px-3 py-2">입력값 자동 검증</td></tr>
                <tr><td className="px-3 py-2 font-mono text-xs">@PreAuthorize(&quot;hasRole(&apos;ADMIN&apos;)&quot;)</td><td className="px-3 py-2">메서드 수준 인가</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="● 프로젝트 디렉토리 구조">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`backend/
├── pom.xml                              ← 의존성 (Maven)
├── Dockerfile                           ← 컨테이너 패키징
└── src/main/
    ├── java/kr/go/gangnam/lawmatcher/
    │   ├── LawMatcherApplication.java   ← 진입점
    │   ├── controller/                  ← REST API
    │   ├── service/                     ← 비즈니스 로직
    │   ├── repository/                  ← DB 접근
    │   ├── entity/                      ← DB 매핑
    │   ├── dto/                         ← 요청·응답 객체
    │   ├── config/                      ← 설정 (Security, XSS 등)
    │   ├── auth/                        ← JWT 인증
    │   └── exception/                   ← 전역 예외 처리
    └── resources/
        ├── application.yml              ← 환경 설정
        └── application-prod.yml         ← 운영 환경 설정`}</pre>
          </div>
        </SubSection>

        <SubSection title="● 시큐어코딩 49항과 Spring Boot">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">시큐어코딩 항목</th>
                  <th className="px-3 py-2 text-left">Spring Boot 기능</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2">§1-1 SQL Injection</td><td className="px-3 py-2 font-mono text-xs">JPA @Param 자동 바인딩</td></tr>
                <tr><td className="px-3 py-2">§1-3 XSS</td><td className="px-3 py-2 font-mono text-xs">XssFilterConfig (FilterRegistrationBean)</td></tr>
                <tr><td className="px-3 py-2">§2-1 인증</td><td className="px-3 py-2">Spring Security 필터 체인</td></tr>
                <tr><td className="px-3 py-2">§2-4 암호화</td><td className="px-3 py-2 font-mono text-xs">BCryptPasswordEncoder</td></tr>
                <tr><td className="px-3 py-2">§2-7 하드코드 비밀번호</td><td className="px-3 py-2 font-mono text-xs">${"${JWT_SECRET}"} 환경변수</td></tr>
                <tr><td className="px-3 py-2">§4-1 오류 메시지</td><td className="px-3 py-2 font-mono text-xs">@RestControllerAdvice 전역 처리</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-3">
            <strong>JPA @Param 바인딩과 SQL Injection 방어</strong> — 맞습니다. JPA는 <code className="text-xs">WHERE id = :userId</code>처럼 파라미터 자리를 먼저 정의하고 값을 나중에 대입합니다. 사용자 입력이 SQL 코드가 아닌 <em>데이터</em>로만 처리되어, <code className="text-xs">1 OR 1=1</code>을 입력해도 SQL로 해석되지 않습니다.
          </p>
        </SubSection>

        <SubSection title="● §4.2 Tomcat 내장 서버">
          <p className="text-sm mb-2">
            <span className="font-medium">한 줄 정의</span> — Java 웹 서버. HTTP 요청을 받아 Java 코드(Servlet)에 전달. Apache Tomcat 10.1.x, 포트 8080. Spring Boot JAR에 내장되어 별도 설치 불필요.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`[브라우저]
   │ HTTP 요청 (GET /api/ordinances)
   ↓
[Tomcat]
  ├─ 포트 8080 리스닝
  ├─ HTTP 요청 파싱
  ├─ Java 객체로 변환 (HttpServletRequest)
  └─ Spring Boot Controller에 전달
       ↓
   [Spring Boot] 비즈니스 로직 실행
   ↓
[Tomcat]
  └─ HTTP 응답 변환
   ↓
[브라우저] (JSON 응답)`}</pre>
          </div>
          <div className="text-sm mt-4 space-y-2">
            <div className="p-3 rounded-lg bg-sidebar-bg border border-sidebar-border">
              <p className="font-medium mb-1">Servlet이란?</p>
              <p className="text-muted">HTTP 요청을 처리하는 Java 서버 프로그램의 표준 규격입니다. Tomcat이 HTTP 연결을 받으면 해당 요청을 Servlet에게 전달하고, Spring Boot의 <code className="text-xs">@RestController</code>가 내부적으로 Servlet 규격을 구현합니다.</p>
            </div>
            <div className="p-3 rounded-lg bg-sidebar-bg border border-sidebar-border">
              <p className="font-medium mb-1">Tomcat vs Spring Boot 차이</p>
              <p className="text-muted"><strong>Tomcat</strong>은 HTTP 연결·요청 파싱을 담당하는 서버 엔진이고, <strong>Spring Boot</strong>는 그 위에서 실행되는 애플리케이션 프레임워크입니다. 비유: Tomcat = 카페 건물(손님 맞이), Spring Boot = 바리스타(음료 제조). 둘이 Java와 HTML을 서로 변환하는 것이 아니라, HTTP 텍스트를 Java 객체로 변환하는 것입니다.</p>
            </div>
            <div className="p-3 rounded-lg bg-sidebar-bg border border-sidebar-border">
              <p className="font-medium mb-1">HttpServletRequest — JSON과의 관계</p>
              <p className="text-muted">비슷한 개념입니다. 브라우저가 보내는 HTTP 요청(URL, 헤더, 바디 등의 텍스트)을 Tomcat이 <code className="text-xs">HttpServletRequest</code> Java 객체로 변환합니다. 현대 Spring Boot에서는 <code className="text-xs">@RequestBody</code>가 JSON 바디를 추가로 Java 객체로 변환해주므로, 개발자는 <code className="text-xs">HttpServletRequest</code>를 직접 다루지 않아도 됩니다.</p>
            </div>
          </div>
        </SubSection>

        <SubSection title="● Tomcat 튜닝 (application.yml)">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`server:
  port: 8080
  tomcat:
    threads:
      max: 200                  # 동시 요청 처리 스레드
      min-spare: 10
    connection-timeout: 5000ms
    max-connections: 8192
    accept-count: 100
  compression:
    enabled: true               # gzip
  shutdown: graceful            # Pod 종료 시 진행 중 요청 마무리`}</pre>
          </div>
        </SubSection>

        <SubSection title="● §4.3 Nginx vs Tomcat">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">항목</th>
                  <th className="px-3 py-2 text-left">Nginx</th>
                  <th className="px-3 py-2 text-left">Tomcat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">카테고리</td><td className="px-3 py-2">웹 서버 / 리버스 프록시 / LB</td><td className="px-3 py-2">Java 애플리케이션 서버</td></tr>
                <tr><td className="px-3 py-2 font-medium">언어</td><td className="px-3 py-2">C로 작성</td><td className="px-3 py-2">Java로 작성</td></tr>
                <tr><td className="px-3 py-2 font-medium">주 용도</td><td className="px-3 py-2">정적 파일·SSL·프록시·LB</td><td className="px-3 py-2">Java 코드 실행</td></tr>
                <tr><td className="px-3 py-2 font-medium">Java 코드</td><td className="px-3 py-2">❌ 못함</td><td className="px-3 py-2">✅ 가능</td></tr>
                <tr><td className="px-3 py-2 font-medium">속도</td><td className="px-3 py-2">매우 빠름 (수만 동시 연결)</td><td className="px-3 py-2">보통 (스레드 모델)</td></tr>
              </tbody>
            </table>
          </div>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3 mt-3">
            <pre>{`[브라우저] → HTTPS → [Nginx] → HTTP → [Tomcat]
                       ↑                  ↑
              SSL 종료, LB, 정적 파일    Java 실행`}</pre>
          </div>
          <Insight>
            본 프로젝트의 진화 — 현재(docker-compose)는 Nginx + Tomcat. NHN Cloud 배포 시 NHN LB가 Nginx 역할을 대체하여 Nginx 컨테이너 제거. 클라우드에서는 Nginx 자리를 관리형 LB가 차지하여 운영 부담 감소.
          </Insight>
        </SubSection>
      </CalcBox>

      {/* ===== §5 JVM ===== */}
      <CalcBox title="■ §5. ③ JVM (Java Virtual Machine)">
        <p className="text-sm mb-3">
          <span className="font-medium">한 줄 정의</span> — Java 17 코드를 실행하는 가상 머신.
        </p>
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2 font-medium w-32">버전</td><td className="px-3 py-2">Eclipse Temurin 17 JRE</td></tr>
              <tr>
                <td className="px-3 py-2 font-medium">역할</td>
                <td className="px-3 py-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li><code className="text-xs">java -jar app.jar</code> 명령으로 Spring Boot 실행</li>
                    <li>메모리 관리 (Heap, Metaspace)</li>
                    <li>가비지 컬렉션 (G1GC 기본)</li>
                    <li>JIT 컴파일 (성능 최적화)</li>
                  </ul>
                </td>
              </tr>
              <tr><td className="px-3 py-2 font-medium">메모리</td><td className="px-3 py-2">힙 최소 512MB ~ 최대 4GB. Pod 1개당 약 1~2GB 할당</td></tr>
              <tr><td className="px-3 py-2 font-medium">위치</td><td className="px-3 py-2 font-mono text-xs">backend/Dockerfile의 eclipse-temurin:17-jre 베이스 이미지</td></tr>
              <tr><td className="px-3 py-2 font-medium">시큐어코딩 §1-14</td><td className="px-3 py-2">JVM이 메모리 버퍼 오버플로우 자동 검사</td></tr>
              <tr><td className="px-3 py-2 font-medium">책임 주체</td><td className="px-3 py-2">강남구청 (Dockerfile에 포함)</td></tr>
            </tbody>
          </table>
        </div>
      </CalcBox>

      {/* ===== §6 Docker 컨테이너 ===== */}
      <CalcBox title="■ §6. ④ 컨테이너 (Docker)">
        <p className="text-sm mb-3">
          <span className="font-medium">한 줄 정의</span> — Docker 이미지에서 실행된 격리된 프로세스.
        </p>
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2 font-medium w-32">기반 기술</td><td className="px-3 py-2">Linux Namespace + Cgroup</td></tr>
              <tr>
                <td className="px-3 py-2 font-medium">이미지 구성</td>
                <td className="px-3 py-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Base: <code className="text-xs">eclipse-temurin:17-jre</code> (Linux + Java)</li>
                    <li>App: <code className="text-xs">law-matcher.jar</code> (Spring Boot)</li>
                    <li>사용자: <code className="text-xs">appuser</code> (root 비사용)</li>
                  </ul>
                </td>
              </tr>
              <tr><td className="px-3 py-2 font-medium">격리 효과</td><td className="px-3 py-2">다른 컨테이너의 프로세스·파일 시스템 접근 불가</td></tr>
              <tr><td className="px-3 py-2 font-medium">빌드</td><td className="px-3 py-2 font-mono text-xs">docker build -t law-matcher:1.0 .</td></tr>
              <tr><td className="px-3 py-2 font-medium">실행</td><td className="px-3 py-2 font-mono text-xs">docker run law-matcher:1.0 (로컬) 또는 K8s가 자동</td></tr>
              <tr><td className="px-3 py-2 font-medium">책임 주체</td><td className="px-3 py-2">강남구청 (Dockerfile 작성)</td></tr>
            </tbody>
          </table>
        </div>
      </CalcBox>

      {/* ===== §7 Pod ===== */}
      <CalcBox title="■ §7. ⑤ Pod (Kubernetes)">
        <p className="text-sm mb-3">
          <span className="font-medium">한 줄 정의</span> — 쿠버네티스(K8s)가 관리하는 컨테이너 1개를 감싼 실행 단위. 구글이 만든 오픈소스 표준.
        </p>
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <tbody className="divide-y divide-sidebar-border">
              <tr>
                <td className="px-3 py-2 font-medium w-32">구성</td>
                <td className="px-3 py-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>컨테이너 (보통 1개, 가끔 사이드카 추가)</li>
                    <li>IP 주소 1개 (Pod 단위로 부여)</li>
                    <li>라벨 (<code className="text-xs">app=law-matcher</code>)</li>
                    <li>헬스체크 정의 (<code className="text-xs">/actuator/health</code>)</li>
                  </ul>
                </td>
              </tr>
              <tr><td className="px-3 py-2 font-medium">관리 방법</td><td className="px-3 py-2">YAML 파일(deployment.yaml)로 명세 → K8s가 자동 실행</td></tr>
              <tr><td className="px-3 py-2 font-medium">이중화</td><td className="px-3 py-2 font-mono text-xs">replicas: 2 설정 시 자동으로 Pod 2개 유지</td></tr>
              <tr>
                <td className="px-3 py-2 font-medium">자동 기능</td>
                <td className="px-3 py-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>죽으면 자동 재시작 (Self-Healing)</li>
                    <li>트래픽 따라 자동 증감 (HPA)</li>
                    <li>무중단 배포 (Rolling Update)</li>
                  </ul>
                </td>
              </tr>
              <tr><td className="px-3 py-2 font-medium">책임 주체</td><td className="px-3 py-2">강남구청 (YAML 작성)</td></tr>
            </tbody>
          </table>
        </div>

        <SubSection title="● Pod 생애주기">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`1. kubectl apply -f deployment.yaml
       ↓
2. K8s가 Pod 생성 결정
       ↓
3. Worker Node에 컨테이너 이미지 다운로드
       ↓
4. 컨테이너 시작 → Spring Boot 부팅
       ↓
5. Readiness Probe (/actuator/health/readiness) 통과
       ↓
6. Service에서 트래픽 받기 시작
       ↓
7. Liveness Probe로 지속 모니터링
       ↓ (장애 시)
8. K8s가 자동 재시작 (또는 새 Node로 재배치)`}</pre>
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
