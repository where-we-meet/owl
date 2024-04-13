import { createClient } from '@/utils/supabase/client';

export const getUserProfileData = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.from('users').select('name, profile_url').eq('id', id).single();
  if (error) throw error;

  return data;
};
