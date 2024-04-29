'use client';

import { MemberCard } from '@/components/about/MemberCard';
import PayPalDonate from '@/components/auth/PayPalDonate';
import Image from 'next/image';
import { useState } from 'react';
import styles from './page.module.css';

type MemberInfo = {
  name: string;
  githubURL: string;
  review_title: string;
  review: string;
  review_end: string;
};

const DEVELOPERS_INFO: MemberInfo[] = [
  {
    name: '양희철',
    githubURL: 'https://github.com/heechul94',
    review_title: '희철님 제목',
    review: '희철님 후기',
    review_end: '희철님 한마디'
  },
  {
    name: '이참',
    githubURL: 'https://github.com/ketchup0211',
    review_title: '참님 제목',
    review: '참님 후기',
    review_end: '참님 한마디'
  },
  {
    name: '나의찬',
    githubURL: 'https://github.com/lauichan',
    review_title: '참님 제목',
    review: '참님 후기',
    review_end: '참님 한마디'
  },
  {
    name: '오소향',
    githubURL: 'https://github.com/SohyangO',
    review_title: '소향님 제목',
    review: '소향님 후기',
    review_end: '소향님 한마디'
  },
  {
    name: '박강토',
    githubURL: 'https://github.com/gidalim',
    review_title: '경험은 무엇보다도 소중한 지식의 한 페이지입니다.',
    review:
      '이번 프로젝트를 거치면서 부족했던 많은 점을 해결하고 문제를 다루고 대처하는 능력을 기를 수 있었습니다. 문제는 늘 발생하지만, 항상 외부에 의존하던 모습에서 스스로 처리할 수 있는 능동적인 개발자가 될 수 있는 초석이 되었습니다. 이제 우리는 스스로가 첫 발을 내딛을 일만 남았습니다.',
    review_end: '우리의 지금은 우리의 명함에 값지게 새겨졌습니다. -박강토'
  }
];

export default function AboutPage() {
  const [selectedMember, setSelectedMember] = useState<MemberInfo | null>(null);

  const handleMemberClick = (index: number) => {
    setSelectedMember(DEVELOPERS_INFO[index]);
  };

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
              <MemberCard
                key={index}
                name={developer.name}
                githubURL={developer.githubURL}
                handleMemberClick={handleMemberClick}
                index={index}
              />
            ))}
          </div>
          <div className={styles.content_container}>
            <div className={styles.content_wrap}>
              <div className={styles.owl_link_introduce_container}>
                <div className={styles.owl_link_img_box}>
                  <Image src="/images/center_owl.png" alt="logo" width={100} height={100} />
                </div>
                <div className={styles.owl_link_content_box}>
                  <h3 className={styles.service_title}>OWL-LiNK</h3>
                  <div className={styles.introduce_wrap}>
                    <p className={styles.introduce}>
                      약속을 잡을 때 결정사항과 고민거리를 줄여주어 편리하고, <br />더 나아가 다음 모임을 기대하게
                      만드는 서비스를 제공하고자 합니다.
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.review_card}>
                <div className={styles.review_card_wrap}>
                  <div className={styles.profile_image_box}>
                    <img src="/images/real_logo_without_text_white.png" className={styles.profile_image}></img>
                  </div>

                  <div className={styles.review_box}>
                    {selectedMember && (
                      <>
                        <span className={styles.review_title}>{selectedMember.review_title}</span>
                        <p className={styles.review_content}>{selectedMember.review}</p>
                        <span className={styles.review_end}>{selectedMember.review_end}</span>
                      </>
                    )}
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
