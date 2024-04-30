import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { MeetingModalButton } from '../meeting/MeetingModalButton';
import UserProfile from '../profile/UserProfileButton';
import styles from './Header.module.css';

const Header = async () => {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <header className={styles.header}>
      <Link href="/" title="홈으로 이동">
        <span className={styles.logo}>
          <img src="images/real_logo_without_text_white.webp" width={40} height={21} alt="OWL-LiNK logo" />
          OWL-LiNK
        </span>
      </Link>

      <div className={styles.menu}>
        {user ? (
          <>
            <MeetingModalButton />
            <UserProfile />
          </>
        ) : (
          <Link href="/login" className={styles.login}>
            로그인
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
