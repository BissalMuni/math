"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, invalidateSession } from "@/lib/auth/use-session";

/** 사이드바 우상단 로그인/역할 표시 */
export function SidebarAuth() {
  const router = useRouter();
  const { session, loading } = useSession();

  if (loading) {
    return <span className="text-[10px] text-muted">…</span>;
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="rounded-full border border-sidebar-border px-2 py-0.5 text-[10px] text-muted hover:border-accent hover:text-accent transition-colors"
      >
        로그인
      </Link>
    );
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    invalidateSession();
    router.refresh();
  };

  const canAccessAdmin = session.permissions.some(
    (p) => p !== "read"
  );

  return (
    <div className="flex items-center gap-1">
      {canAccessAdmin && (
        <Link
          href="/admin"
          className="rounded-full border border-sidebar-border px-2 py-0.5 text-[10px] text-muted hover:border-accent hover:text-accent transition-colors"
        >
          관리자
        </Link>
      )}
      <span
        className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] text-accent"
        title={`역할: ${session.label}`}
      >
        {session.label}
      </span>
      <button
        type="button"
        onClick={handleLogout}
        className="text-[10px] text-muted hover:text-red-500 transition-colors"
      >
        로그아웃
      </button>
    </div>
  );
}
