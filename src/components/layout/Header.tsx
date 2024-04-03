'use client';
import { createClient } from '@/utils/supabase/client';
import Logout from '../auth/LogoutButton';
import styles from './Header.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = async () => {
  const supabase = createClient();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT') {
          setIsLogin(false);
        } else if (event === 'SIGNED_IN') {
          setIsLogin(true);
        }
      });
    };
    checkUser();
  }, []);

  return (
    <header className={styles.header}>
      <Link href="/">owl-link</Link>
      <div className={styles.menu}>
        {isLogin ? (
          <>
            <Link href="/my-owl">마이페이지</Link>
            <Logout />
          </>
        ) : (
          <Link href="/login">로그인</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
