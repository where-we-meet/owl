'use client';

import KakaoSymbol from './KakaoSymbol';
import GoogleLogo from './GoogleLogo';
import styles from './LoginButton.module.css';
import { logInWithOAuth } from '@/api/auth';

const LoginButton = () => {
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
