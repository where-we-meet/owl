'use client';

import { createClient } from '@/utils/supabase/client';
import KakaoSymbol from './KakaoSymbol';
import GoogleLogo from './GoogleLogo';
import styles from './LoginButton.module.css';

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
    <form className={styles.form}>
      <button className={styles.kakao} onClick={signInWithKakao} role="button">
        <KakaoSymbol />
        <span>카카오 로그인</span>
      </button>
      <button className={styles.google} onClick={signInWithGoogle} role="button">
        <GoogleLogo />
        <span>구글 로그인</span>
      </button>
    </form>
  );
};

export default LoginButton;
