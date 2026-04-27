"use client";

import { useState, useEffect, useCallback } from "react";
import type { Comment, TopicImage } from "@/lib/types";
import { CommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";
import { ImageGrid } from "./ImageGrid";

const AUTHOR_KEY = "math-comment-author";

/** 목차 페이지별 의견 + 이미지 섹션 */
export function CommentSection({ contentPath }: { contentPath: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [images, setImages] = useState<TopicImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // localStorage에서 닉네임 복원
  useEffect(() => {
    setAuthor(localStorage.getItem(AUTHOR_KEY) || "");
  }, []);

  const fetchAll = useCallback(async () => {
    try {
      const [cRes, iRes] = await Promise.all([
        fetch(`/api/comments?content_path=${encodeURIComponent(contentPath)}`),
        fetch(`/api/images?content_path=${encodeURIComponent(contentPath)}`),
      ]);
      const [cData, iData] = await Promise.all([cRes.json(), iRes.json()]);
      setComments(cData.data || []);
      setImages(iData.data || []);
    } catch {
      // 조용히 실패
    } finally {
      setLoading(false);
    }
  }, [contentPath]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleSubmit = async (body: string) => {
    if (!author.trim()) {
      setError("닉네임을 먼저 입력해주세요");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content_path: contentPath, author: author.trim(), body }),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "등록 실패");
        return;
      }
      // 닉네임 저장
      localStorage.setItem(AUTHOR_KEY, author.trim());
      await fetchAll();
    } catch {
      setError("등록 실패");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (id: string) => {
    try {
      const res = await fetch(
        `/api/comments/${id}?author=${encodeURIComponent(author)}`,
        { method: "DELETE" }
      );
      if (res.ok) await fetchAll();
    } catch {
      // 무시
    }
  };

  const handleUploadImage = async (file: File) => {
    if (!author.trim()) {
      setError("닉네임을 먼저 입력해주세요");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("content_path", contentPath);
      formData.append("uploaded_by", author.trim());

      const res = await fetch("/api/images", { method: "POST", body: formData });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "업로드 실패");
        return;
      }
      localStorage.setItem(AUTHOR_KEY, author.trim());
      await fetchAll();
    } catch {
      setError("업로드 실패");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    try {
      const res = await fetch(
        `/api/images/${id}?uploaded_by=${encodeURIComponent(author)}`,
        { method: "DELETE" }
      );
      if (res.ok) await fetchAll();
    } catch {
      // 무시
    }
  };

  return (
    <section className="mt-16 border-t border-sidebar-border pt-8">
      <h2 className="text-lg font-semibold mb-6">의견 / 참고 이미지</h2>

      {/* 닉네임 입력 */}
      <div className="mb-6 flex items-center gap-2">
        <label className="text-sm text-muted whitespace-nowrap">내 닉네임</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          onBlur={() => author.trim() && localStorage.setItem(AUTHOR_KEY, author.trim())}
          placeholder="닉네임 입력"
          maxLength={50}
          className="rounded border border-sidebar-border bg-transparent px-3 py-1 text-sm focus:border-accent focus:outline-none w-40"
        />
        <span className="text-xs text-muted">※ 자신이 작성한 글/이미지만 삭제 가능</span>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-500">{error}</p>
      )}

      {loading ? (
        <p className="text-sm text-muted">불러오는 중...</p>
      ) : (
        <>
          {/* 의견 목록 */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-muted mb-3">
              의견 ({comments.length})
            </h3>
            <div className="space-y-1 mb-4">
              {comments.length === 0 && (
                <p className="text-sm text-muted py-2">첫 의견을 남겨보세요.</p>
              )}
              {comments.map((c) => (
                <CommentItem
                  key={c.id}
                  comment={c}
                  currentAuthor={author}
                  onDelete={handleDeleteComment}
                />
              ))}
            </div>
            <CommentForm onSubmit={handleSubmit} loading={submitting} />
          </div>

          {/* 이미지 섹션 */}
          <div>
            <h3 className="text-sm font-medium text-muted mb-3">
              참고 이미지 ({images.length})
            </h3>
            <ImageGrid
              images={images}
              currentAuthor={author}
              onDelete={handleDeleteImage}
              onUpload={handleUploadImage}
              uploading={uploading}
            />
          </div>
        </>
      )}
    </section>
  );
}
