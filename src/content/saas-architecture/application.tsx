"use client";

import { ComingSoon } from "@/components/content/shared";

/** Ⅱ. 응용 SW — 사용자·Spring Boot·Tomcat·Nginx·JVM·컨테이너·Pod */
export default function ApplicationContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        강남구청 책임 영역 — ① 사용자부터 ⑤ Pod까지의 응용 SW 계층.
        Spring Boot 프레임워크, 내장 Tomcat, JVM, Docker 컨테이너, K8s Pod의 역할을 다룬다.
      </p>
      <ComingSoon title="Ⅱ. 응용 SW — Spring Boot · Tomcat · JVM · Container · Pod" />
    </div>
  );
}
