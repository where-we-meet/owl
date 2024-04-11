'use client';

import KakaoSymbol from './KakaoSymbol';
import GoogleLogo from './GoogleLogo';
import styles from './LoginButton.module.css';
import { createClient } from '@/utils/supabase/client';

const LoginButton = () => {
  const logInWithOAuth = async (provider: 'google' | 'kakao') => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    });
  };

  return (
    <form className={styles.form}>
      <button className={styles.kakao} onClick={() => logInWithOAuth('kakao')} role="button">
        <KakaoSymbol />
        <span>카카오 로그인</span>
      </button>
      <button className={styles.google} onClick={() => logInWithOAuth('google')} role="button">
        <GoogleLogo />
        <span>구글 로그인</span>
      </button>
    </form>
  );
};

export default LoginButton;
