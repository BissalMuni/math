"use client";

import { useState } from "react";
import type { Book } from "@/book/types";
import type { Basket } from "@/basket/types";
import { BookManager } from "./book-manager";
import { BasketManager } from "./basket-manager";

type TabKey = "books" | "baskets";

interface Props {
  books: Book[];
  baskets: Basket[];
}

export function StructurePageTabs({ books, baskets }: Props) {
  const [tab, setTab] = useState<TabKey>("books");

  const tabs: { key: TabKey; label: string }[] = [
    { key: "books", label: "책 관리" },
    { key: "baskets", label: "바구니 관리" },
  ];

  return (
    <div className="space-y-6">
      {/* 탭 바 */}
      <div className="flex gap-2 border-b border-sidebar-border">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.key
                ? "border-b-2 border-accent text-accent"
                : "text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 패널 */}
      {tab === "books" && <BookManager books={books} baskets={baskets} />}
      {tab === "baskets" && <BasketManager books={books} baskets={baskets} />}
    </div>
  );
}
