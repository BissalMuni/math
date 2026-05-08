"use client";

import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 응용 SW 계층 — 사용자 (User) */
export default function ApplicationContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        시스템을 사용하는 사람·외부 시스템의 분류와 보안 통제. 강남구청 직원, 관리자, 외부 연계 API의 접속 방식과 인증 정책.
      </p>

      <CalcBox title="■ ① 사용자 (User) — 한눈에 보기">
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

        <SubSection title="● 책임 주체">
          <p className="text-sm">강남구청 (사용자 계정 관리)</p>
        </SubSection>

        <Insight>
          관리자 접속은 반드시 Bastion Host를 경유하며, SSH 키 + OTP의 2단계 인증(MFA)으로 보호됩니다. 자세한 흐름은 데이터 흐름 장의 §20 관리자 접속 참조.
        </Insight>
      </CalcBox>
    </div>
  );
}
