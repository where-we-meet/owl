import PayPalDonate from '@/components/auth/PayPalDonate';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
export default function AboutPage() {
  return (
    <>
      <main className={styles.main}>
        <section className={styles.header_image}>
          <header className={styles.header}>
            <h1 className={styles.title}>저희는 개발자 5인으로 구성된 팀 We입니다.</h1>
          </header>
        </section>
        <section className={styles.section}>
          <div className={styles.profiles}>
            <figure className={styles.figure}>
              <Image src="" alt="default image" />
              <p>양희철</p>
              <p>저희는 이번 프로젝트를 통해...</p>
            </figure>
            <Link href={'/'} />
          </div>
          <div className={styles.profiles}>
            <figure className={styles.figure}>
              <Image src="" alt="default image" />
              <p>이참</p>
              <p>저희는 이번 프로젝트를 통해...</p>
            </figure>
            <Link href={'/'} />
          </div>
          <div className={styles.profiles}>
            <figure className={styles.figure}>
              <Image src="" alt="default image" />
              <p>나의찬</p>
              <p>저희는 이번 프로젝트를 통해...</p>
            </figure>
            <Link href={'/'} />
          </div>
          <div className={styles.profiles}>
            <figure className={styles.figure}>
              <Image src="" alt="default image" />
              <p>오소향</p>
              <p>저희는 이번 프로젝트를 통해...</p>
            </figure>
            <Link href={'/'} />
          </div>
          <div className={styles.profiles}>
            <figure className={styles.figure}>
              <Image src="" alt="default image" />
              <p>박강토</p>
              <p>저희는 이번 프로젝트를 통해...</p>
            </figure>
            <Link href={'/'} />
          </div>
        </section>
        <PayPalDonate />
      </main>
    </>
  );
}
