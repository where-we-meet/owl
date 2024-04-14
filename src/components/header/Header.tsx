import { createClient } from '@/utils/supabase/server';
import Logout from '../auth/LogoutButton';
import styles from './Header.module.css';
import Link from 'next/link';
import { MeetingModalButton } from './MeetingModalButton';
import UserProfile from './UserProfileButton';

const Header = async () => {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <header className={styles.header}>
      <Link href="/" title="홈으로 이동">
        owl-link
      </Link>
      <div className={styles.menu}>
        {user ? (
          <>
            <MeetingModalButton />
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
