import { createClient } from '@/utils/supabase/server';
import Logout from '../auth/LogoutButton';
import styles from './Header.module.css';
import Link from 'next/link';

const Header = async () => {
  const supabase = createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  return (
    <header className={styles.header}>
      <Link href="/">owl-link</Link>
      {session ? (
        <Logout />
      ) : (
        <>
          <Link href="/my-owl">마이페이지</Link>
          <Link href="/login">로그인</Link>
        </>
      )}
    </header>
  );
};

export default Header;
