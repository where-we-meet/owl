'use client';

import KakaoSymbol from './KakaoSymbol';
import GoogleLogo from './GoogleLogo';
import styles from './LoginButton.module.css';
import { signInWithOAuth } from '@/api/auth/signInWithOAuth';
import { useSearchParams } from 'next/navigation';

const LoginButton = () => {
  const params = useSearchParams();
  const next = params.get('next') ?? '/';

  return (
    <form className={styles.form}>
      <button className={styles.kakao} onClick={() => signInWithOAuth('kakao', next)} role="button">
        <KakaoSymbol />
        <span>카카오 로그인</span>
      </button>
      <button className={styles.google} onClick={() => signInWithOAuth('google', next)} role="button">
        <GoogleLogo />
        <span>구글 로그인</span>
      </button>
    </form>
  );
};

export default LoginButton;
