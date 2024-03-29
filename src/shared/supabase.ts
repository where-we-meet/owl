import type { Database } from "@/types/supabase";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const supabase: SupabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
