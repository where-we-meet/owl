import UserInfo from './editable/UserInfo';
import LoginInfo from './uneditable/LoginInfo';

import styles from './Profile.module.css';
import { createClient } from '@/utils/supabase/server';

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

// my-owl 페이지의 유저 프로필 정보에 필요한 Data를 supabase, supabase auth에서 가져와 반환 (SSR 로직으로 파일 분리 필요)
const supabase = createClient();
export const getUserProfileData = async () => {
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
