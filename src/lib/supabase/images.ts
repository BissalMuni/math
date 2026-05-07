import { getSupabase } from "./client";
import type { TopicImage } from "@/lib/types";

const BUCKET = "math-attachments";
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED = ["image/jpeg", "image/png", "image/gif", "image/webp"];
// Signed URL 유효 기간(초). 매 조회 시 새로 발급.
const SIGNED_URL_TTL = 3600;

export interface AdminImageFilters {
  /** content_path 부분 일치 검색 */
  contentPath?: string;
  /** 업로더 이름(역할 라벨) 정확 일치 */
  uploadedBy?: string;
  /** 파일명 부분 일치 */
  fileName?: string;
  limit?: number;
  offset?: number;
}

export interface AdminImageList {
  rows: TopicImage[];
  total: number;
}

/**
 * 관리자용 — 모든 이미지 첨부를 필터와 함께 조회.
 * 매 호출 시 Signed URL 일괄 발급 (조회 페이지 단위로만).
 */
export async function getAllImages(
  filters: AdminImageFilters = {}
): Promise<AdminImageList> {
  const supabase = getSupabase();
  const { contentPath, uploadedBy, fileName, limit = 50, offset = 0 } = filters;

  let query = supabase
    .from("topic_images")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (contentPath) query = query.ilike("content_path", `%${contentPath}%`);
  if (uploadedBy) query = query.eq("uploaded_by", uploadedBy);
  if (fileName) query = query.ilike("file_name", `%${fileName}%`);

  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;
  if (error) throw error;

  const rows = data || [];
  if (rows.length === 0) return { rows: [], total: count ?? 0 };

  const paths = rows.map((r) => r.storage_path);
  const { data: signed, error: signError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrls(paths, SIGNED_URL_TTL);
  if (signError) throw signError;

  const enriched = rows.map((row, idx) => ({
    ...row,
    url: signed?.[idx]?.signedUrl ?? "",
  })) as TopicImage[];

  return { rows: enriched, total: count ?? enriched.length };
}

/** 해당 경로의 이미지 목록 조회 */
export async function getImages(contentPath: string): Promise<TopicImage[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("topic_images")
    .select("*")
    .eq("content_path", contentPath)
    .order("created_at", { ascending: false });

  if (error) throw error;

  const rows = data || [];
  if (rows.length === 0) return [];

  const paths = rows.map((r) => r.storage_path);
  const { data: signed, error: signError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrls(paths, SIGNED_URL_TTL);
  if (signError) throw signError;

  return rows.map((row, idx) => ({
    ...row,
    url: signed?.[idx]?.signedUrl ?? "",
  })) as TopicImage[];
}

/** 이미지 업로드 */
export async function uploadImage(
  file: File,
  contentPath: string,
  uploadedBy: string
): Promise<TopicImage> {
  if (file.size > MAX_SIZE) throw new Error("파일 크기는 5MB 이하여야 합니다");
  if (!ALLOWED.includes(file.type)) throw new Error("jpg, png, gif, webp만 가능합니다");

  const supabase = getSupabase();
  const uuid = crypto.randomUUID();
  const ext = file.name.split(".").pop();
  // Supabase Storage 키는 ASCII 만 허용 — 한글·특수문자는 '_' 로 치환, 선행 슬래시 제거.
  // content_path 자체는 DB 에 원형 그대로 저장되므로 조회에 영향 없음.
  const cleanPath = contentPath
    .replace(/^\/+/, "")
    .replace(/[^a-zA-Z0-9/._-]/g, "_");
  const storagePath = `${cleanPath.replace(/\//g, "_")}/${uuid}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buffer, { contentType: file.type });

  if (uploadError) throw uploadError;

  const { data, error: insertError } = await supabase
    .from("topic_images")
    .insert({
      content_path: contentPath,
      file_name: file.name,
      storage_path: storagePath,
      file_size: file.size,
      uploaded_by: uploadedBy,
    })
    .select()
    .single();

  if (insertError) {
    // DB 실패 시 스토리지도 정리
    await supabase.storage.from(BUCKET).remove([storagePath]);
    throw insertError;
  }

  const { data: signed, error: signError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(storagePath, SIGNED_URL_TTL);
  if (signError) throw signError;

  return { ...data, url: signed.signedUrl } as TopicImage;
}

/** 이미지 삭제 (업로더 본인 또는 canOverride=true 인 admin 이상) */
export async function deleteImage(
  id: string,
  uploadedBy: string,
  canOverride = false
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();

  const { data: existing, error: fetchError } = await supabase
    .from("topic_images")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !existing) return { success: false, error: "이미지를 찾을 수 없습니다" };
  if (!canOverride && existing.uploaded_by !== uploadedBy) {
    return { success: false, error: "업로더만 삭제할 수 있습니다" };
  }

  await supabase.storage.from(BUCKET).remove([existing.storage_path]);
  const { error } = await supabase.from("topic_images").delete().eq("id", id);
  if (error) throw error;
  return { success: true };
}
