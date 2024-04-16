import PayPalDonate from '@/components/auth/PayPalDonate';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa6';
import owl_image from '../../../public/images/about_owl_image.jpg';
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
              <Image src={owl_image} width={125} height={125} alt="default image" />
            </figure>
            <div className={styles.profiles_contents}>
              <p>양희철</p>
              <p>저희는 이번 프로젝트를 통해...</p>
            </div>
            <div className={styles.github_link}>
              <Link href="https://github.com/heechul94">
                <FaGithub size={50} />
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
                <FaGithub size={50} />
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
                <FaGithub size={50} />
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
                <FaGithub size={50} />
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
                <FaGithub size={50} />
              </Link>
            </div>
          </div>
        </section>
        <PayPalDonate />
      </main>
    </>
  );
}
