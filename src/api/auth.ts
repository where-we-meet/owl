import { createClient } from '@/utils/supabase/server';

export const getSession = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (!user || error) throw error;
  return user;
};
