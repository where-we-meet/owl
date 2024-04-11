import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

export const getUserProfileData = async (user: User | null | undefined) => {
  const supabase = createClient();

  if (!user) return null;

  const { data, error } = await supabase.from('users').select('name, profile_url').eq('id', user.id).single();
  if (error) throw error;

  return {
    authSNS: user.app_metadata.providers,
    userInfo: {
      userId: user.id,
      name: data.name,
      profileURL: data.profile_url
    }
  };
};
