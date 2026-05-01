import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

/** 서버사이드 Supabase 클라이언트 (service role) */
export function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY 환경변수가 없습니다");
  }

  // 같은 Supabase 프로젝트를 다른 앱과 공유하므로 'math' 전용 스키마를 사용한다.
  // (Supabase Settings → API → Exposed schemas 에 'math' 추가 필요)
  _supabase = createClient(url, key, {
    db: { schema: "math" },
  });
  return _supabase;
}
