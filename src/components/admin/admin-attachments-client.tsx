"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { TopicImage } from "@/lib/types";

interface Filters {
  contentPath: string;
  uploadedBy: string;
  fileName: string;
}

const PAGE_SIZE = 50;

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function AdminAttachmentsClient() {
  const [filters, setFilters] = useState<Filters>({
    contentPath: "",
    uploadedBy: "",
    fileName: "",
  });
  const [applied, setApplied] = useState<Filters>(filters);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState<TopicImage[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<TopicImage | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (applied.contentPath) params.set("content_path", applied.contentPath);
      if (applied.uploadedBy) params.set("uploaded_by", applied.uploadedBy);
      if (applied.fileName) params.set("file_name", applied.fileName);
      params.set("limit", String(PAGE_SIZE));
      params.set("offset", String(page * PAGE_SIZE));

      const res = await fetch(`/api/admin/images?${params.toString()}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? `조회 실패 (${res.status})`);
      }
      const json = (await res.json()) as { rows: TopicImage[]; total: number };
      setRows(json.rows);
      setTotal(json.total);
    } catch (e) {
      setError(e instanceof Error ? e.message : "조회 실패");
      setRows([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [applied, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleApply = () => {
    setPage(0);
    setApplied(filters);
  };

  const handleReset = () => {
    const empty = { contentPath: "", uploadedBy: "", fileName: "" };
    setFilters(empty);
    setApplied(empty);
    setPage(0);
  };

  const handleDelete = async (img: TopicImage) => {
    if (!window.confirm(`"${img.file_name}" 파일을 삭제하시겠습니까?`)) return;
    try {
      const res = await fetch(`/api/images/${img.id}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setToast({ type: "error", text: body?.error ?? "삭제 실패" });
        return;
      }
      setToast({ type: "success", text: "삭제되었습니다." });
      fetchData();
    } catch {
      setToast({ type: "error", text: "삭제 실패" });
    }
  };

  const lastPage = Math.max(0, Math.ceil(total / PAGE_SIZE) - 1);
  const fromCount = total === 0 ? 0 : page * PAGE_SIZE + 1;
  const toCount = Math.min(total, (page + 1) * PAGE_SIZE);

  const filterChips = useMemo(() => {
    const items: { key: keyof Filters; label: string }[] = [];
    if (applied.contentPath) items.push({ key: "contentPath", label: `경로: ${applied.contentPath}` });
    if (applied.uploadedBy) items.push({ key: "uploadedBy", label: `업로더: ${applied.uploadedBy}` });
    if (applied.fileName) items.push({ key: "fileName", label: `파일명: ${applied.fileName}` });
    return items;
  }, [applied]);

  return (
    <div className="space-y-4">
      {/* 필터 바 */}
      <div className="rounded-lg border border-sidebar-border bg-sidebar-bg p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <label className="flex flex-col gap-1 text-xs text-muted">
            경로 (content_path)
            <input
              type="text"
              value={filters.contentPath}
              onChange={(e) => setFilters((f) => ({ ...f, contentPath: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && handleApply()}
              placeholder="/topics/..."
              className="rounded border border-sidebar-border bg-background px-2 py-1 text-sm text-foreground"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-muted">
            파일명
            <input
              type="text"
              value={filters.fileName}
              onChange={(e) => setFilters((f) => ({ ...f, fileName: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && handleApply()}
              placeholder="포함 단어"
              className="rounded border border-sidebar-border bg-background px-2 py-1 text-sm text-foreground"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-muted">
            업로더
            <input
              type="text"
              value={filters.uploadedBy}
              onChange={(e) => setFilters((f) => ({ ...f, uploadedBy: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && handleApply()}
              placeholder="예: 편집자"
              className="rounded border border-sidebar-border bg-background px-2 py-1 text-sm text-foreground"
            />
          </label>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={handleApply}
            className="rounded bg-accent px-3 py-1.5 text-sm text-foreground hover:opacity-90"
          >
            필터 적용
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded border border-sidebar-border px-3 py-1.5 text-sm text-muted hover:text-foreground"
          >
            초기화
          </button>
          {filterChips.length > 0 && (
            <div className="ml-2 flex flex-wrap gap-1">
              {filterChips.map((c) => (
                <span
                  key={c.key}
                  className="rounded-full bg-accent-light px-2 py-0.5 text-xs text-foreground"
                >
                  {c.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 결과 메타 */}
      <div className="flex items-center justify-between text-sm text-muted">
        <span>
          {loading ? "조회 중..." : `${total}건 중 ${fromCount}–${toCount}`}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0 || loading}
            className="rounded border border-sidebar-border px-2 py-1 text-xs text-muted disabled:opacity-40"
          >
            이전
          </button>
          <span className="text-xs">
            {page + 1} / {lastPage + 1}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
            disabled={page >= lastPage || loading}
            className="rounded border border-sidebar-border px-2 py-1 text-xs text-muted disabled:opacity-40"
          >
            다음
          </button>
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto rounded-lg border border-sidebar-border bg-sidebar-bg">
        <table className="min-w-full text-sm">
          <thead className="bg-background/50 text-left text-xs uppercase text-muted">
            <tr>
              <th className="px-3 py-2">미리보기</th>
              <th className="px-3 py-2">파일</th>
              <th className="px-3 py-2">경로</th>
              <th className="px-3 py-2">크기</th>
              <th className="px-3 py-2">업로더</th>
              <th className="px-3 py-2">업로드일</th>
              <th className="px-3 py-2 text-right">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sidebar-border">
            {error && (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-red-500">
                  {error}
                </td>
              </tr>
            )}
            {!error && !loading && rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-10 text-center text-muted">
                  조회된 첨부파일이 없습니다
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-background/30">
                <td className="px-3 py-2">
                  {row.url ? (
                    <button
                      type="button"
                      onClick={() => setPreview(row)}
                      className="block h-12 w-12 overflow-hidden rounded border border-sidebar-border"
                      aria-label={`${row.file_name} 미리보기`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={row.url}
                        alt={row.file_name}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ) : (
                    <div className="h-12 w-12 rounded bg-background" />
                  )}
                </td>
                <td className="px-3 py-2 font-medium text-foreground">
                  <span className="break-all">{row.file_name}</span>
                </td>
                <td className="px-3 py-2">
                  <a
                    href={row.content_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-accent hover:underline"
                  >
                    {row.content_path}
                  </a>
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-muted">
                  {formatFileSize(row.file_size)}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-muted">{row.uploaded_by}</td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-muted">
                  {new Date(row.created_at).toLocaleString("ko-KR")}
                </td>
                <td className="px-3 py-2">
                  <div className="flex justify-end gap-1">
                    {row.url && (
                      <button
                        type="button"
                        onClick={() => setPreview(row)}
                        className="rounded border border-sidebar-border px-2 py-1 text-xs text-muted hover:text-foreground"
                      >
                        바로 보기
                      </button>
                    )}
                    {row.url && (
                      <a
                        href={row.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded border border-sidebar-border px-2 py-1 text-xs text-muted hover:text-foreground"
                      >
                        다운로드
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(row)}
                      className="rounded border border-red-500/40 px-2 py-1 text-xs text-red-500 hover:bg-red-500/10"
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 미리보기 모달 */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setPreview(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-background shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-sidebar-border px-4 py-2">
              <div className="min-w-0">
                <div className="truncate font-medium text-foreground">{preview.file_name}</div>
                <div className="truncate text-xs text-muted">{preview.content_path}</div>
              </div>
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="rounded p-1 text-muted hover:text-foreground"
                aria-label="닫기"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-sidebar-bg">
              {preview.url && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={preview.url}
                  alt={preview.file_name}
                  className="mx-auto max-h-[80vh] object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* 토스트 */}
      {toast && (
        <div
          className={`fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-lg px-4 py-2 text-sm text-white shadow-lg ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.text}
        </div>
      )}
    </div>
  );
}
