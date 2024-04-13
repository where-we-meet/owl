import { getCallbackURL } from '@/utils/getCallbackURL';
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

export const logInWithOAuth = async (provider: 'google' | 'kakao') => {
  const supabase = createClient();
  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: getCallbackURL()
    }
  });
};
