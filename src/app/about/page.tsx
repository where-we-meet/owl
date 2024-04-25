import { MemberCard } from '@/components/about/MemberCard';
import PayPalDonate from '@/components/auth/PayPalDonate';
import styles from './page.module.css';
import Image from 'next/image';

const DEVELOPERS_INFO = [
  { name: '양희철', githubURL: 'https://github.com/heechul94' },
  { name: '이참', githubURL: 'https://github.com/ketchup0211' },
  { name: '나의찬', githubURL: 'https://github.com/lauichan' },
  { name: '오소향', githubURL: 'https://github.com/SohyangO' },
  { name: '박강토', githubURL: 'https://github.com/gidalim' }
];

export default function AboutPage() {
  return (
    <>
      <title>Team OWNLP</title>
      <main className={styles.main}>
        <header className={styles.header}>
          <Image src="/images/real_logo_without_text_white.png" alt="logo" width={100} height={100} />
          <h1 className={styles.title}>We</h1>
        </header>
        <div className={styles.divider}>
          <div className={styles.divider_bar} />
          <span className={styles.divider_text}>Member & Project</span>
          <div className={styles.divider_bar} />
        </div>
        <div className={styles.section}>
          {DEVELOPERS_INFO.map((developer, index) => (
            <MemberCard key={index} name={developer.name} githubURL={developer.githubURL} />
          ))}
        </div>
        <PayPalDonate />
      </main>
    </>
  );
}
