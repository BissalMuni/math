import { getSupabase } from "./client";
import type { ContentChange } from "@/lib/types";

/** 수정 이력 기록 */
export async function logContentChange(params: {
  role: string;
  actor: string;
  change_type: ContentChange["change_type"];
  file_path: string;
  diff?: string | null;
  before_content?: string | null;
  after_content?: string | null;
  commit_sha?: string | null;
  metadata?: Record<string, unknown> | null;
}): Promise<ContentChange> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("content_changes")
    .insert(params)
    .select()
    .single();

  if (error) throw error;
  return data as ContentChange;
}

/** 수정 이력 목록 조회 (페이지네이션) */
export async function getContentChanges(opts: {
  limit?: number;
  offset?: number;
  file_path?: string;
  change_type?: string;
}): Promise<{ data: ContentChange[]; count: number }> {
  const supabase = getSupabase();
  const { limit = 20, offset = 0, file_path, change_type } = opts;

  let query = supabase
    .from("content_changes")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (file_path) query = query.ilike("file_path", `%${file_path}%`);
  if (change_type) query = query.eq("change_type", change_type);

  const { data, error, count } = await query;
  if (error) throw error;
  return { data: (data || []) as ContentChange[], count: count ?? 0 };
}

/** 단일 수정 이력 조회 */
export async function getContentChangeById(
  id: string
): Promise<ContentChange | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("content_changes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as ContentChange;
}

/** 대시보드 요약 통계 */
export async function getChangeSummary(): Promise<{
  total: number;
  today: number;
  thisWeek: number;
  byType: Record<string, number>;
}> {
  const supabase = getSupabase();

  // 전체 수
  const { count: total } = await supabase
    .from("content_changes")
    .select("*", { count: "exact", head: true });

  // 오늘
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const { count: today } = await supabase
    .from("content_changes")
    .select("*", { count: "exact", head: true })
    .gte("created_at", todayStart.toISOString());

  // 이번 주 (7일)
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const { count: thisWeek } = await supabase
    .from("content_changes")
    .select("*", { count: "exact", head: true })
    .gte("created_at", weekAgo.toISOString());

  // 타입별 카운트
  const { data: typeData } = await supabase
    .from("content_changes")
    .select("change_type");

  const byType: Record<string, number> = {};
  for (const row of typeData || []) {
    byType[row.change_type] = (byType[row.change_type] || 0) + 1;
  }

  return {
    total: total ?? 0,
    today: today ?? 0,
    thisWeek: thisWeek ?? 0,
    byType,
  };
}
