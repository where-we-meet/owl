import LoginButton from '@/components/auth/LoginButton';
import styles from './page.module.css';
import PayPalDonate from '@/components/auth/PayPalDonate';

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <LoginButton />
      </section>

      <PayPalDonate />
    </main>
  );
}
