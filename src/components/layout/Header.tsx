import { createClient } from '@/utils/supabase/server';
import Logout from '../auth/LogoutButton';
import styles from './Header.module.css';
import Link from 'next/link';
import { headers } from 'next/headers';

const Header = async () => {
  const headersList = headers();
  const fullUrl = headersList.get('referer') || '';
  if (fullUrl.split('/')[3] === 'login') return null;

  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <header className={styles.header}>
      <Link href="/">owl-link</Link>
      <div className={styles.menu}>
        {user ? (
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
