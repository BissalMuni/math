import Link from "next/link";
import { allCategories } from "@/data";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">📐 수학 학습</h1>
      <p className="text-muted mb-8">
        중·고등 수학과 LLM 수학을 인터랙티브하게 학습하세요.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allCategories.map((category) => (
          <Link
            key={category.id}
            href={`/${category.basePath}`}
            className="group rounded-xl border border-sidebar-border p-6 transition-colors hover:border-accent hover:bg-accent-light"
          >
            <h2 className="text-xl font-semibold mb-2 group-hover:text-accent">
              {category.title}
            </h2>
            <p className="text-sm text-muted">{category.description}</p>
            <p className="mt-3 text-xs text-muted">
              {category.children.length}개 과목/학년
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
