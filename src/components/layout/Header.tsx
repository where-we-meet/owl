import { createClient } from '@/utils/supabase/server';
import Logout from '../auth/LogoutButton';
import UserProfile from '../auth/UserProfileButton';
import styles from './Header.module.css';
import Link from 'next/link';
import { MeetingButton } from '../auth/MeetingButton';

const Header = async () => {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <header className={styles.header}>
      {user ? <MeetingButton /> : null}
      <Link href="/">owl-link</Link>
      <div className={styles.menu}>
        {user ? (
          <>
            <Link href="/my-owl">마이페이지</Link>
            <UserProfile />
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
