import { getCallbackURL } from '@/utils/getCallbackURL';
import { createClient } from '@/utils/supabase/client';

export const signInWithOAuth = async (provider: 'google' | 'kakao') => {
  const supabase = createClient();
  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: getCallbackURL()
    }
  });
};
