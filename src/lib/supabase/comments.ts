import { getSupabase } from "./client";
import type { Comment } from "@/lib/types";

/** 해당 경로의 의견 목록 조회 */
export async function getComments(contentPath: string): Promise<Comment[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("content_path", contentPath)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data || []) as Comment[];
}

/** 의견 등록 */
export async function createComment(
  contentPath: string,
  author: string,
  body: string,
  sectionTitle?: string
): Promise<Comment> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("comments")
    .insert({ content_path: contentPath, author, body, section_title: sectionTitle ?? null })
    .select()
    .single();

  if (error) throw error;
  return data as Comment;
}

/** 의견 삭제 (작성자 본인만) */
export async function deleteComment(
  id: string,
  author: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();

  const { data: existing, error: fetchError } = await supabase
    .from("comments")
    .select("author")
    .eq("id", id)
    .single();

  if (fetchError || !existing) return { success: false, error: "의견을 찾을 수 없습니다" };
  if (existing.author !== author) return { success: false, error: "작성자만 삭제할 수 있습니다" };

  const { error } = await supabase.from("comments").delete().eq("id", id);
  if (error) throw error;
  return { success: true };
}
