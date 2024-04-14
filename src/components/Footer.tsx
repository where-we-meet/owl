import { Link } from '@nextui-org/react';
import styles from './Footer.module.css';
import { FaGithub } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href="https://github.com/where-we-meet/owl">
        <FaGithub />
        &nbsp;owl-link
      </Link>
      <div>
        <p>about us</p>
      </div>
    </footer>
  );
};

export default Footer;
