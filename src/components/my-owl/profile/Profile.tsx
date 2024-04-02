import UserInfo from './editable/UserInfo';
import LoginInfo from './uneditable/LoginInfo';

import styles from './Profile.module.css';
import { supabase } from '@/shared/supabase';

interface ProfileProps {
  authSNS: string[];
  userInfo: {
    userId: string;
    name: string;
    profileURL: string;
  };
}

const Profile = ({ authSNS, userInfo }: ProfileProps) => {
  return (
    <div className={styles.profile_container}>
      <UserInfo {...userInfo} />
      <LoginInfo authSNS={authSNS} />
    </div>
  );
};

export default Profile;

export async function getServerSideProps(context: any) {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user !== null) {
      return {
        props: {
          authSNS: user.app_metadata.providers,
          userInfo: {
            userId: user.id,
            name: user.user_metadata.full_name,
            profileURL: user.user_metadata.avatar_url
          }
        }
      };
    } else {
      return {
        notFound: true
      };
    }
  } catch (error) {
    console.error(error);
  }
}
