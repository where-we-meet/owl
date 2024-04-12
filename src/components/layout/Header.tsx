import { createClient } from '@/utils/supabase/server';
import Logout from '../auth/LogoutButton';
import UserProfile from '../auth/UserProfileButton';
import styles from './Header.module.css';
import Link from 'next/link';
import { MeetingModalButton } from '../auth/MeetingModalButton';

const Header = async () => {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <header className={styles.header}>
      {user ? <MeetingModalButton /> : null}
      <Link href="/">owl-link</Link>
      <div className={styles.menu}>
        {user ? (
          <>
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
