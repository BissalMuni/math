import { getSessionFromCookies } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/constants";
import { redirect } from "next/navigation";
import { StructurePageTabs } from "@/components/admin/structure-page-tabs";
import { allBooks } from "@/book";
import { allBaskets } from "@/basket";
import { getBookMeta } from "@/lib/structure-serializer";

export default async function AdminStructurePage() {
  const session = await getSessionFromCookies();
  if (!session) redirect("/login");

  if (!hasPermission(session.role, "edit_structure") || session.role !== "super_admin") {
    redirect("/admin");
  }

  // 편집 가능한 책만 (getBookMeta가 null이면 제외)
  const editable = allBooks.filter(
    (b) => getBookMeta(b.id) !== null
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">구조 관리</h1>
        <p className="mt-1 text-sm text-muted">
          책·바구니·목차 트리를 관리합니다. 저장 시 GitHub main 브랜치에 커밋됩니다.
        </p>
      </div>

      <StructurePageTabs books={editable} baskets={allBaskets} />
    </div>
  );
}
