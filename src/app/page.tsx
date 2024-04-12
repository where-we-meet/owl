import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <Link className={styles.start} href="/start">
          모임 시작하기
        </Link>
      </section>
    </main>
  );
}
