import LoginButton from '@/components/auth/LoginButton';
import styles from './page.module.css';
import PayPalDonate from '@/components/auth/PayPalDonate';
import Header from '@/components/header/Header';
import Footer from '@/components/Footer';

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <LoginButton />
        </section>
        <PayPalDonate />
      </main>
      <Footer />
    </>
  );
}
