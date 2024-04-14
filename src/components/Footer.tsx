import { Link } from '@nextui-org/react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href="https://github.com/where-we-meet/owl">@github owllink</Link>
      <p>about us</p>
    </footer>
  );
};

export default Footer;
