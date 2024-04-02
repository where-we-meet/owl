import UserInfo from './editable/UserInfo';
import LoginInfo from './uneditable/LoginInfo';

import styles from './Profile.module.css';
import { createClient } from '@/utils/supabase/server';

const Profile = async () => {
  const supabase = createClient();

  const getUserData = async () => {
    const {
      data: { user },
      error
    } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    if (user !== null) {
      return {
        authSNS: user.app_metadata.providers,
        userInfo: {
          userId: user.id,
          name: user.user_metadata.full_name,
          profileURL: user.user_metadata.avatar_url
        }
      };
    } else {
      return {
        authSNS: null,
        userInfo: null
      };
    }
  };

  const { userInfo, authSNS } = await getUserData();
  return (
    <div className={styles.profile_container}>
      {userInfo && <UserInfo {...userInfo} />}
      {authSNS && <LoginInfo authSNS={authSNS} />}
    </div>
  );
};

export default Profile;
