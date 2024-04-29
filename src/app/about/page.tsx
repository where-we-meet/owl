'use client';

import { MemberCard } from '@/components/about/MemberCard';
import PayPalDonate from '@/components/auth/PayPalDonate';
import Image from 'next/image';
import { useState } from 'react';
import type { MemberInfo } from '../../components/about/MemberInfo';
import { DEVELOPERS_INFO } from '../../components/about/MemberInfo';
import styles from './page.module.css';

export default function AboutPage() {
  const [selectedMember, setSelectedMember] = useState<MemberInfo>(DEVELOPERS_INFO[0]);

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
            <span className={styles.divider_text}>5 Member & Project</span>
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
