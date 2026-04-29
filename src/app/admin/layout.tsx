import { redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth/session";
import { AdminNav } from "@/components/admin/admin-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionFromCookies();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav role={session.role} />
      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
    </div>
  );
}
