"use client";

import { useState } from "react";
import type { Book } from "@/book/types";
import type { Basket } from "@/basket/types";

interface Props {
  books: Book[];
  baskets: Basket[];
}

type PathConvention = "flat" | "nested";

export function BookManager({ books, baskets }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pathConvention, setPathConvention] = useState<PathConvention>("nested");
  const [basketId, setBasketId] = useState(baskets[0]?.id ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async () => {
    if (!id.trim() || !title.trim() || !basketId) {
      setMessage({ type: "error", text: "ID, 제목, 바구니를 모두 입력해주세요" });
      return;
    }

    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) {
      setMessage({ type: "error", text: "ID는 영문 소문자와 하이픈만 (예: korean-grammar)" });
      return;
    }

    if (books.some((b) => b.id === id)) {
      setMessage({ type: "error", text: `이미 존재하는 ID: ${id}` });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, description, pathConvention, basketId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "저장 실패" });
        return;
      }

      setMessage({
        type: "success",
        text: `책 "${title}" 생성 완료 (commit: ${data.commit?.slice(0, 7)}). 배포 후 반영됩니다.`,
      });
      setShowForm(false);
      setId("");
      setTitle("");
      setDescription("");
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
      {/* 현재 책 목록 */}
      <div className="rounded-lg border border-sidebar-border bg-sidebar-bg">
        <div className="border-b border-sidebar-border px-4 py-3">
          <h3 className="text-sm font-semibold text-foreground">현재 등록된 책</h3>
        </div>
        <div className="divide-y divide-sidebar-border">
          {books.map((book) => {
            const bookBaskets = baskets.filter((b) => b.bookIds.includes(book.id));
            return (
              <div key={book.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="text-sm font-medium text-foreground">{book.title}</div>
                  <div className="text-xs text-muted font-mono">/{book.basePath}</div>
                </div>
                <div className="flex items-center gap-2">
                  {bookBaskets.map((b) => (
                    <span
                      key={b.id}
                      className="rounded-full bg-accent-light px-2 py-0.5 text-xs text-foreground"
                    >
                      {b.title}
                    </span>
                  ))}
                  <span className="text-xs text-muted">
                    {book.children.length}개 노드
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 새 책 추가 */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg border border-dashed border-sidebar-border px-4 py-3 text-sm text-accent hover:bg-accent-light w-full text-left"
        >
          + 새 책 추가
        </button>
      ) : (
        <div className="rounded-lg border border-accent bg-sidebar-bg p-4 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">새 책 추가</h3>

          <div className="grid grid-cols-2 gap-4">
            {/* ID */}
            <div>
              <label className="block text-xs text-muted mb-1">ID (URL 경로)</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value.toLowerCase())}
                placeholder="korean-grammar"
                className="w-full rounded border border-sidebar-border bg-background px-3 py-1.5 text-sm text-foreground font-mono"
              />
              {id && <span className="text-xs text-muted mt-1 block">URL: /{id}</span>}
            </div>

            {/* 제목 */}
            <div>
              <label className="block text-xs text-muted mb-1">제목</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="국어 문법"
                className="w-full rounded border border-sidebar-border bg-background px-3 py-1.5 text-sm text-foreground"
              />
            </div>
          </div>

          {/* 설명 */}
          <div>
            <label className="block text-xs text-muted mb-1">설명 (선택)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="국어 문법 학습 내용"
              className="w-full rounded border border-sidebar-border bg-background px-3 py-1.5 text-sm text-foreground"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* 경로 패턴 */}
            <div>
              <label className="block text-xs text-muted mb-1">경로 패턴</label>
              <select
                value={pathConvention}
                onChange={(e) => setPathConvention(e.target.value as PathConvention)}
                className="w-full rounded border border-sidebar-border bg-background px-3 py-1.5 text-sm text-foreground"
              >
                <option value="nested">2단계 (상위폴더/콘텐츠) — 고등수학, 중등수학</option>
                <option value="flat">1단계 (콘텐츠만) — LLM 학습</option>
              </select>
            </div>

            {/* 소속 바구니 */}
            <div>
              <label className="block text-xs text-muted mb-1">소속 바구니</label>
              <select
                value={basketId}
                onChange={(e) => setBasketId(e.target.value)}
                className="w-full rounded border border-sidebar-border bg-background px-3 py-1.5 text-sm text-foreground"
              >
                {baskets.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 미리보기 */}
          {id && (
            <div className="rounded border border-sidebar-border bg-background p-3 text-xs text-muted space-y-1">
              <div className="font-semibold text-foreground mb-1">생성될 파일:</div>
              <div>src/book/data/{id}.json</div>
              <div>src/book/{id}.ts</div>
              <div>src/app/{id}/page.tsx</div>
              <div>src/app/{id}/[...slugs]/page.tsx</div>
              <div className="text-muted mt-1">+ book/index.ts, map/index.ts, structure-serializer.ts 재생성</div>
            </div>
          )}

          {/* 버튼 */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSubmit}
              disabled={saving}
              className={`rounded px-4 py-2 text-sm font-medium text-white ${
                saving ? "cursor-not-allowed bg-muted/50" : "bg-accent hover:brightness-110"
              }`}
            >
              {saving ? "생성 중..." : "GitHub에 커밋"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setMessage(null);
              }}
              className="text-sm text-muted hover:text-foreground"
            >
              취소
            </button>
          </div>
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
    </div>
  );
}
