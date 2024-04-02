import Logout from '../auth/LogoutButton';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      Header
      <Logout />
    </header>
  );
};

export default Header;
