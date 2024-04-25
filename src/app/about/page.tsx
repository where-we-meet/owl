import Image from 'next/image';
import Link from 'next/link';
import owl_image from '../../../public/images/about_owl_image.jpg';
import PayPalDonate from '@/components/auth/PayPalDonate';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FaGithub } from 'react-icons/fa6';
import styles from './page.module.css';

const DEVELOPERS_INFO = {
  양희철: 'https://github.com/heechul94',
  이참: 'https://github.com/ketchup0211',
  나의찬: 'https://github.com/lauichan',
  오소향: 'https://github.com/SohyangO',
  박강토: 'https://github.com/gidalim'
};
export default function AboutPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.header_image}>
          <header className={styles.header}>
            <h1 className={styles.title}>저희는 개발자 5인으로 구성된 팀 We입니다.</h1>
          </header>
        </section>
        <section className={styles.section}>
          <div className={styles.profiles}>
            <figure className={styles.figure}>
              <Image src={owl_image} width={125} height={125} alt="default image" />
            </figure>
            <div className={styles.profiles_contents}>
              <p>양희철</p>
              <p>저희는 이번 프로젝트를 통해...</p>
            </div>
            <div className={styles.github_link}>
              <Link href="https://github.com/heechul94">
                <FaGithub color="#8a2be2" size={45} />
              </Link>
            </div>
          </div>
          <div className={styles.profiles}>
            <figure className={styles.figure}>
              <Image src={owl_image} width={125} height={125} alt="default image" />
            </figure>
            <div className={styles.profiles_contents}>
              <p>이참</p>
              <p>저희는 이번 프로젝트를 통해...</p>
            </div>
            <div className={styles.github_link}>
              <Link href="https://github.com/ketchup0211">
                <FaGithub color="#8a2be2" size={45} />
              </Link>
            </div>
          </div>
          <div className={styles.profiles}>
            <figure className={styles.figure}>
              <Image src={owl_image} width={125} height={125} alt="default image" />
            </figure>
            <div className={styles.profiles_contents}>
              <p>나의찬</p>
              <p>저희는 이번 프로젝트를 통해...</p>
            </div>
            <div className={styles.github_link}>
              <Link href="https://github.com/lauichan">
                <FaGithub color="#8a2be2" size={45} />
              </Link>
            </div>
          </div>
          <div className={styles.profiles}>
            <figure className={styles.figure}>
              <Image src={owl_image} width={125} height={125} alt="default image" />
            </figure>
            <div className={styles.profiles_contents}>
              <p>오소향</p>
              <p>저희는 이번 프로젝트를 통해...</p>
            </div>
            <div className={styles.github_link}>
              <Link href="https://github.com/SohyangO">
                <FaGithub color="#8a2be2" size={45} />
              </Link>
            </div>
          </div>
          <div className={styles.profiles}>
            <figure className={styles.figure}>
              <Image src={owl_image} width={125} height={125} alt="default image" />
            </figure>
            <div className={styles.profiles_contents}>
              <p>박강토</p>
              <p>저희는 이번 프로젝트를 통해...</p>
            </div>
            <div className={styles.github_link}>
              <Link href="https://github.com/gidalim">
                <FaGithub color="#8a2be2" size={45} />
              </Link>
            </div>
          </div>
        </section>
        <PayPalDonate />
      </main>
      <Footer />
    </>
  );
}
