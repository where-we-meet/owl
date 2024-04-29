import LoginButton from '@/components/auth/LoginButton';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <LoginButton />
        </section>
      </main>
      <Footer />
    </>
  );
}
