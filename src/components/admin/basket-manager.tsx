"use client";

import { useState } from "react";
import type { Book } from "@/book/types";
import type { Basket } from "@/basket/types";

interface Props {
  books: Book[];
  baskets: Basket[];
}

interface EditableBasket {
  id: string;
  title: string;
  bookIds: string[];
  isNew?: boolean;
}

export function BasketManager({ books, baskets: initialBaskets }: Props) {
  const [baskets, setBaskets] = useState<EditableBasket[]>(
    initialBaskets.map((b) => ({ ...b, bookIds: [...b.bookIds] }))
  );
  const [addingNew, setAddingNew] = useState(false);
  const [newId, setNewId] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const hasChanges =
    JSON.stringify(baskets.map((b) => ({ id: b.id, title: b.title, bookIds: b.bookIds }))) !==
    JSON.stringify(initialBaskets.map((b) => ({ id: b.id, title: b.title, bookIds: b.bookIds })));

  /** 책 토글 */
  const toggleBook = (basketId: string, bookId: string) => {
    setBaskets((prev) =>
      prev.map((b) => {
        if (b.id !== basketId) return b;
        const has = b.bookIds.includes(bookId);
        return {
          ...b,
          bookIds: has
            ? b.bookIds.filter((id) => id !== bookId)
            : [...b.bookIds, bookId],
        };
      })
    );
  };

  /** 바구니 제목 변경 */
  const updateTitle = (basketId: string, title: string) => {
    setBaskets((prev) =>
      prev.map((b) => (b.id === basketId ? { ...b, title } : b))
    );
  };

  /** 바구니 삭제 */
  const removeBasket = (basketId: string) => {
    const basket = baskets.find((b) => b.id === basketId);
    if (basket && basket.bookIds.length > 0) {
      if (!confirm(`"${basket.title}" 바구니에 ${basket.bookIds.length}개 책이 있습니다. 삭제하시겠습니까?`)) {
        return;
      }
    }
    setBaskets((prev) => prev.filter((b) => b.id !== basketId));
  };

  /** 새 바구니 추가 */
  const addBasket = () => {
    if (!newId.trim() || !newTitle.trim()) {
      setMessage({ type: "error", text: "ID와 제목을 모두 입력해주세요" });
      return;
    }
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(newId)) {
      setMessage({ type: "error", text: "ID는 영문 소문자와 하이픈만 허용" });
      return;
    }
    if (baskets.some((b) => b.id === newId)) {
      setMessage({ type: "error", text: `이미 존재하는 바구니 ID: ${newId}` });
      return;
    }

    setBaskets((prev) => [...prev, { id: newId, title: newTitle, bookIds: [], isNew: true }]);
    setAddingNew(false);
    setNewId("");
    setNewTitle("");
    setMessage(null);
  };

  /** 저장 */
  const handleSave = async () => {
    // 모든 책이 최소 1개 바구니에 소속 확인
    const assignedBooks = new Set(baskets.flatMap((b) => b.bookIds));
    const orphans = books.filter((b) => !assignedBooks.has(b.id));
    if (orphans.length > 0) {
      setMessage({
        type: "error",
        text: `미소속 책: ${orphans.map((b) => b.title).join(", ")}. 모든 책은 최소 1개 바구니에 소속 필요.`,
      });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/baskets", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baskets: baskets.map((b) => ({
            id: b.id,
            title: b.title,
            bookIds: b.bookIds,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "저장 실패" });
        return;
      }

      setMessage({
        type: "success",
        text: `바구니 설정 저장 완료 (commit: ${data.commit?.slice(0, 7)}). 배포 후 반영됩니다.`,
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "네트워크 오류",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 바구니 목록 */}
      {baskets.map((basket) => (
        <div
          key={basket.id}
          className="rounded-lg border border-sidebar-border bg-sidebar-bg"
        >
          <div className="flex items-center justify-between border-b border-sidebar-border px-4 py-3">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={basket.title}
                onChange={(e) => updateTitle(basket.id, e.target.value)}
                className="rounded border border-sidebar-border bg-background px-2 py-1 text-sm font-semibold text-foreground"
              />
              <span className="text-xs text-muted font-mono">{basket.id}</span>
              {basket.isNew && (
                <span className="rounded bg-accent-light px-1.5 py-0.5 text-xs text-accent">
                  새로 추가
                </span>
              )}
            </div>
            <button
              onClick={() => removeBasket(basket.id)}
              className="text-xs text-red-500 hover:text-red-400"
            >
              삭제
            </button>
          </div>

          {/* 책 체크리스트 */}
          <div className="p-4">
            <div className="text-xs text-muted mb-2">소속 책 선택:</div>
            <div className="flex flex-wrap gap-2">
              {books.map((book) => {
                const isAssigned = basket.bookIds.includes(book.id);
                return (
                  <button
                    key={book.id}
                    onClick={() => toggleBook(basket.id, book.id)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      isAssigned
                        ? "bg-accent text-white"
                        : "bg-background border border-sidebar-border text-muted hover:text-foreground"
                    }`}
                  >
                    {isAssigned ? "✓ " : ""}{book.title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ))}

      {/* 새 바구니 추가 */}
      {!addingNew ? (
        <button
          onClick={() => setAddingNew(true)}
          className="rounded-lg border border-dashed border-sidebar-border px-4 py-3 text-sm text-accent hover:bg-accent-light w-full text-left"
        >
          + 새 바구니 추가
        </button>
      ) : (
        <div className="flex items-center gap-3 rounded-lg border border-accent bg-sidebar-bg p-4">
          <input
            type="text"
            value={newId}
            onChange={(e) => setNewId(e.target.value.toLowerCase())}
            placeholder="ID (예: science)"
            className="rounded border border-sidebar-border bg-background px-3 py-1.5 text-sm text-foreground font-mono"
            autoFocus
          />
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="제목 (예: 과학)"
            className="rounded border border-sidebar-border bg-background px-3 py-1.5 text-sm text-foreground"
          />
          <button
            onClick={addBasket}
            className="text-sm text-accent hover:brightness-125"
          >
            추가
          </button>
          <button
            onClick={() => {
              setAddingNew(false);
              setMessage(null);
            }}
            className="text-sm text-muted hover:text-foreground"
          >
            취소
          </button>
        </div>
      )}

      {/* 메시지 */}
      {message && (
        <div
          className={`rounded px-4 py-2 text-sm ${
            message.type === "success"
              ? "bg-green-500/10 text-green-500"
              : "bg-red-500/10 text-red-500"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* 저장 버튼 */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className={`rounded px-6 py-2 text-sm font-medium text-white ${
            hasChanges && !saving
              ? "bg-accent hover:brightness-110"
              : "cursor-not-allowed bg-muted/50"
          }`}
        >
          {saving ? "저장 중..." : "GitHub에 저장"}
        </button>
        {hasChanges && (
          <span className="text-xs text-amber-500">변경사항이 있습니다</span>
        )}
      </div>
    </div>
  );
}
