import UserInfo from './editable/UserInfo';
import LoginInfo from './uneditable/LoginInfo';

import { getUserProfileData } from '@/api/supabaseSSR/supabase';

import styles from './Profile.module.css';

const Profile = async () => {
  const { userInfo, authSNS } = await getUserProfileData();
  return (
    <div className={styles.profile_container}>
      {userInfo && <UserInfo {...userInfo} />}
      {authSNS && <LoginInfo authSNS={authSNS} />}
    </div>
  );
};

export default Profile;
