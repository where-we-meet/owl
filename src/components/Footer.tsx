import { Link } from '@nextui-org/react';
import styles from './Footer.module.css';
import { FaGithub } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>이용약관</div>
      <div className={styles.about_container}>
        <Link className={styles.github} href="https://github.com/where-we-meet/owl">
          <FaGithub />
          &nbsp;owl-link
        </Link>
        <Link href="/about">@about us</Link>
      </div>
    </footer>
  );
};

export default Footer;
{
  /* <Link href="/about">@about us</Link> */
}
