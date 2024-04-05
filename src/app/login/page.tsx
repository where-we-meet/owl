import LoginButton from '@/components/auth/LoginButton';
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <h1>OWL-LiNK</h1>
      <LoginButton />
    </main>
  );
}
