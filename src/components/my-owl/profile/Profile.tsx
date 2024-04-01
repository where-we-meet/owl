import UserInfo from './editable/UserInfo';
import LoginInfo from './uneditable/LoginInfo';

import styles from './Profile.module.css';

const Profile = () => {
  return (
    <div className={styles.profile_container}>
      <UserInfo />
      <LoginInfo />
    </div>
  );
};

export default Profile;
