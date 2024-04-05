import LoginButton from '@/components/auth/LoginButton';
import PaypalMark from '@/components/auth/PaypalMark';
import styles from './page.module.css';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.logo}>
          <Link href="/">OWL-LiNK</Link>
        </h1>
        <LoginButton />
      </section>

      <a target="_blank" className={styles.paypal} href="https://paypal.me/owllink">
        <PaypalMark />
        <span>개발자 응원하기</span>
      </a>
    </main>
  );
}
