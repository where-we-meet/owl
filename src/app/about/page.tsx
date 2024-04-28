import { MemberCard } from '@/components/about/MemberCard';
import PayPalDonate from '@/components/auth/PayPalDonate';
import styles from './page.module.css';
import Image from 'next/image';
import { color } from 'framer-motion';

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
      <title>Team We</title>
      <main className={styles.main}>
        <div className={styles.container}>
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
          <div className={styles.content_container}>
            <div className={styles.content_wrap}>
              <div className={styles.owl_link_produce_container}>
                <div className={styles.owl_link_img_box}>
                  <Image src="/images/center_owl.png" alt="logo" width={100} height={100} />
                </div>
                <div className={styles.owl_link_content_box}>
                  <span className={styles.title}>OWL-LiNK</span>
                  <div className={styles.button_wrap}>
                    <div className={styles.link_button}>
                      약속을 잡을 때 결정사항과 고민거리를 줄여주어 편리하고, 더 나아가 다음 모임을 기대하게 만드는
                      서비스를 제공하고자 합니다.
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.review_card}>
                <div className={styles.review_card_wrap}>
                  <div className={styles.profile_image_box}>
                    <img src="" className={styles.profile_image}></img>
                  </div>
                  <div className={styles.review_box}>
                    <span className={styles.review_title}>
                      좋은 팀원분들과 함께 할 수 있어서 많이 배우는 시간이었습니다.
                    </span>
                    <span className={styles.review_content}>올빼미, Team We</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PayPalDonate />
      </main>
    </>
  );
}
