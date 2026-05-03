import { getSessionFromCookies } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/constants";
import { redirect } from "next/navigation";
import { StructureTreeEditor } from "@/components/admin/structure-tree-editor";
import { allCategories } from "@/structure";
import { getCategoryMeta } from "@/lib/structure-serializer";

export default async function AdminStructurePage() {
  const session = await getSessionFromCookies();
  if (!session) redirect("/login");

  if (!hasPermission(session.role, "edit_structure") || session.role !== "super_admin") {
    redirect("/admin");
  }

  // 편집 가능한 카테고리만 (llm-concepts는 복합 구조라 제외)
  const editable = allCategories.filter(
    (c) => getCategoryMeta(c.id) !== null
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">구조 편집</h1>
        <p className="mt-1 text-sm text-gray-500">
          목차 트리를 직접 편집합니다. 저장 시 GitHub main 브랜치에 커밋됩니다.
        </p>
      </div>

      <StructureTreeEditor categories={editable} />
    </div>
  );
}
