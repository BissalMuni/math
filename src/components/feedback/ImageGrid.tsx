"use client";

import { useRef, useState } from "react";
import type { TopicImage } from "@/lib/types";

interface Props {
  images: TopicImage[];
  currentAuthor: string;
  onDelete: (id: string) => void;
  onUpload: (file: File) => Promise<void>;
  uploading: boolean;
}

/** 참고 이미지 그리드 */
export function ImageGrid({ images, currentAuthor, onDelete, onUpload, uploading }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await onUpload(file);
    // 인풋 초기화 (같은 파일 재선택 허용)
    e.target.value = "";
  };

  return (
    <div>
      {/* 이미지 목록 */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
          {images.map((img) => {
            const isOwner = img.uploaded_by === currentAuthor && currentAuthor !== "";
            return (
              <div key={img.id} className="group relative aspect-square">
                <button
                  onClick={() => setPreview(img.url || null)}
                  className="w-full h-full"
                  aria-label={img.file_name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.file_name}
                    className="w-full h-full object-cover rounded-lg border border-sidebar-border hover:opacity-90 transition-opacity"
                  />
                </button>
                {/* 업로더 정보 + 삭제 */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between rounded-b-lg bg-black/50 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] text-white truncate">{img.uploaded_by}</span>
                  {isOwner && (
                    <button
                      onClick={() => {
                        if (confirm("삭제하시겠습니까?")) onDelete(img.id);
                      }}
                      className="text-[10px] text-red-400 hover:text-red-300 shrink-0 ml-1"
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 업로드 버튼 */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleFileChange}
        className="hidden"
        aria-label="이미지 파일 선택"
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 rounded-lg border border-dashed border-sidebar-border px-4 py-2 text-sm text-muted hover:border-accent hover:text-accent transition-colors disabled:opacity-40"
      >
        {uploading ? "업로드 중..." : "+ 이미지 추가 (jpg · png · gif · webp, 최대 5MB)"}
      </button>

      {/* 라이트박스 */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setPreview(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="미리보기"
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setPreview(null)}
            className="absolute top-4 right-4 text-white text-xl"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
