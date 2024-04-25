import PayPalDonate from '@/components/auth/PayPalDonate';
import { MemberCard } from '@/components/about/MemberCard';
import styles from './page.module.css';

const DEVELOPERS_INFO = [
  { name: '양희철', githubURL: 'https://github.com/heechul94' },
  { name: '이참', githubURL: 'https://github.com/ketchup0211' },
  { name: '나의찬', githubURL: 'https://github.com/lauichan' },
  { name: '오소향', githubURL: 'https://github.com/SohyangO' },
  { name: '박강토', githubURL: 'https://github.com/gidalim' }
];

export default function AboutPage() {
  return (
    <div>
      <title>Team OWNLP</title>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>We</h1>
        </header>

        <p className={styles.divider_text}>Member & Project</p>

        <section className={styles.section}>
          {DEVELOPERS_INFO.map((developer, index) => (
            <MemberCard key={index} name={developer.name} githubURL={developer.githubURL} />
          ))}
        </section>
        <PayPalDonate />
      </main>
    </div>
  );
}
