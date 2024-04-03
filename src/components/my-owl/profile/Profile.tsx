import UserInfo from './editable/UserInfo';
import LoginInfo from './uneditable/LoginInfo';

import styles from './Profile.module.css';
import { createClient } from '@/utils/supabase/server';

const Profile = async () => {
  const { userInfo, authSNS } = await getUserData();
  return (
    <div className={styles.profile_container}>
      {userInfo && <UserInfo {...userInfo} />}
      {authSNS && <LoginInfo authSNS={authSNS} />}
    </div>
  );
};

export default Profile;

const supabase = createClient();

// authSNS, userId 제외한 요소는 supabase Auth가 아닌 supabse DB의 users에서 가져와야함.
export const getUserData = async () => {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  if (user !== null) {
    const { data, error } = await supabase.from('users').select('name, profile_url').eq('id', user.id).single();

    if (error) {
      throw error;
    }

    return {
      authSNS: user.app_metadata.providers,
      userInfo: {
        userId: user.id,
        name: data.name,
        profileURL: data.profile_url
      }
    };
  } else {
    return {
      authSNS: null,
      userInfo: null
    };
  }
};
