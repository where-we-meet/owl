import styles from './LogoutButton.module.css';

const Logout = () => {
  return (
    <form className={styles.logout} action="/auth/signout" method="post" title="잘가올...">
      <button type="submit">로그아웃</button>
    </form>
  );
};

export default Logout;
