import { createClient } from '@/utils/supabase/server';
import Logout from '../auth/LogoutButton';
import UserProfile from '../auth/UserProfileButton';
import styles from './Header.module.css';
import Link from 'next/link';
import { MeetingButton } from '../auth/MeetingButton';

import { getUserProfileData } from '@/api/supabaseSSR/supabase';

const Header = async () => {
  const supabase = await createClient();
  const { userInfo, authSNS } = await getUserProfileData();

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
            {userInfo && authSNS && <UserProfile userInfo={userInfo} authSNS={authSNS} />}
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
