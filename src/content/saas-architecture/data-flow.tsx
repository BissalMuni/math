"use client";

import { ComingSoon } from "@/components/content/shared";

/** Ⅵ. 데이터 흐름 — 일반 요청·외부 API 호출·관리자 접속 */
export default function DataFlowContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        시스템 안에서 데이터가 흐르는 3가지 시나리오.
        사용자 요청, 외부 API 호출, 관리자 점검 접속의 단계별 흐름.
      </p>
      <ComingSoon title="Ⅵ. 데이터 흐름 — 사용자 요청 · 외부 API · 관리자 접속" />
    </div>
  );
}
