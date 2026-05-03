"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Role } from "@/lib/auth/constants";
import { ROLE_LABELS } from "@/lib/auth/constants";

export function AdminNav({ role }: { role: Role }) {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/admin", label: "대시보드" },
    { href: "/admin/changes", label: "수정 이력" },
    ...(role === "super_admin"
      ? [{ href: "/admin/structure", label: "구조 편집" }]
      : []),
  ];

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <nav className="border-b border-sidebar-border bg-sidebar-bg px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="text-lg font-bold text-foreground">
            관리자
          </Link>
          <div className="flex gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm ${
                  pathname === link.href
                    ? "font-semibold text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-foreground">
            {ROLE_LABELS[role]}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm text-muted hover:text-foreground"
          >
            로그아웃
          </button>
        </div>
      </div>
    </nav>
  );
}
