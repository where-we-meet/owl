'use client';

import { createClient } from '@/utils/supabase/client';

const LoginButton = () => {
  const supabase = createClient();

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    });
  };

  const signInWithKakao = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    });
  };

  return (
    <form>
      <button onClick={signInWithGoogle} role="button">
        Continue with Google
      </button>
      <button onClick={signInWithKakao} role="button">
        Continue with Kakao
      </button>
    </form>
  );
};

export default LoginButton;
