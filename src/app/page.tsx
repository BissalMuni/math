import Link from "next/link";
import { allBooks, getFirstLeafPath } from "@/book";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">📐 수학 학습</h1>
      <p className="text-muted mb-8">
        중·고등 수학과 LLM 수학을 인터랙티브하게 학습하세요.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {allBooks.map((book) => {
          const firstLeaf = getFirstLeafPath(book.children);
          const href = firstLeaf.length > 0
            ? `/${book.basePath}/${firstLeaf.join("/")}`
            : `/${book.basePath}`;
          return (
            <Link
              key={book.id}
              href={href}
              className="group rounded-xl border border-sidebar-border p-6 transition-colors hover:border-accent hover:bg-accent-light"
            >
              <h2 className="text-xl font-semibold mb-2 group-hover:text-accent">
                {book.title}
              </h2>
              <p className="text-sm text-muted">{book.description}</p>
              <p className="mt-3 text-xs text-muted">
                {book.children.length}개 카테고리
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
