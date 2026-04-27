import { getSupabase } from "./client";
import type { TopicImage } from "@/lib/types";

const BUCKET = "topic-images";
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED = ["image/jpeg", "image/png", "image/gif", "image/webp"];

/** 해당 경로의 이미지 목록 조회 */
export async function getImages(contentPath: string): Promise<TopicImage[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("topic_images")
    .select("*")
    .eq("content_path", contentPath)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map((item) => ({
    ...item,
    url: supabase.storage.from(BUCKET).getPublicUrl(item.storage_path).data
      .publicUrl,
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
  const storagePath = `${contentPath.replace(/\//g, "_")}/${uuid}.${ext}`;

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

  const url = supabase.storage.from(BUCKET).getPublicUrl(storagePath).data.publicUrl;
  return { ...data, url } as TopicImage;
}

/** 이미지 삭제 (업로더 본인만) */
export async function deleteImage(
  id: string,
  uploadedBy: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();

  const { data: existing, error: fetchError } = await supabase
    .from("topic_images")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !existing) return { success: false, error: "이미지를 찾을 수 없습니다" };
  if (existing.uploaded_by !== uploadedBy) return { success: false, error: "업로더만 삭제할 수 있습니다" };

  await supabase.storage.from(BUCKET).remove([existing.storage_path]);
  const { error } = await supabase.from("topic_images").delete().eq("id", id);
  if (error) throw error;
  return { success: true };
}
