import Image from 'next/image';
import Link from 'next/link';
import styles from './MemberCard.module.css';
import { FaGithub } from 'react-icons/fa6';

export const MemberCard = ({ name, githubLink }: { name: string; githubLink: string }) => {
  return (
    <div className={styles.profiles}>
      <figure className={styles.figure}>
        <Image src="images/about_owl_image.jpg" width={125} height={125} alt="default image" />
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
  );
};
