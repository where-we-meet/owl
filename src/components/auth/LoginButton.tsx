'use client';

import KakaoSymbol from './KakaoSymbol';
import GoogleLogo from './GoogleLogo';
import styles from './LoginButton.module.css';
import { createClient } from '@/utils/supabase/client';

const getURL = () => {
  let url = process?.env?.NEXT_PUBLIC_SITE_URL ?? process?.env?.NEXT_PUBLIC_VERCEL_URL ?? 'http://localhost:3000/';
  url = url.includes('http') ? url : `https://${url}`;
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

const LoginButton = () => {
  const logInWithOAuth = async (provider: 'google' | 'kakao') => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: getURL()
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
