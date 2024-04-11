import { SupabaseClient } from '@supabase/supabase-js';

export const getSession = async (supabase: SupabaseClient) => {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) throw error;
  return user;
};
