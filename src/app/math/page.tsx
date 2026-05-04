import Link from "next/link";
import { math } from "@/structure";

/** 수학 책 개요 — 중등/고등/LLM 수학 카드 */
export default function MathPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">{math.title}</h1>
      <p className="text-muted mb-8">{math.description}</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {math.children.map((node) => (
          <Link
            key={node.id}
            href={`/math/${node.slug}`}
            className="group rounded-xl border border-sidebar-border p-6 transition-colors hover:border-accent hover:bg-accent-light"
          >
            <h2 className="text-xl font-semibold mb-2 group-hover:text-accent">
              {node.title}
            </h2>
            {node.children && (
              <p className="text-sm text-muted">
                {node.children.length}개 과목/학년
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
