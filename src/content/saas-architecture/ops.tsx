"use client";

import { ComingSoon } from "@/components/content/shared";

/** Ⅴ. 운영 도구 — NHN 콘솔·CLI·kubectl */
export default function OpsContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        시스템을 조작·관리하는 3가지 도구.
        GUI(NHN 콘솔), CLI(NHN/REST/Terraform), K8s 표준 도구(kubectl)의 역할과 사용 시점.
      </p>
      <ComingSoon title="Ⅴ. 운영 도구 — NHN 콘솔 · CLI · kubectl" />
    </div>
  );
}
