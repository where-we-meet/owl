import Image from 'next/image';
import Link from 'next/link';
import styles from './MemberCard.module.css';
import { FaGithub } from 'react-icons/fa6';
import { Avatar } from '@nextui-org/react';

export const MemberCard = ({
  name,
  githubURL,
  handleMemberClick,
  index
}: {
  name: string;
  githubURL: string;
  handleMemberClick: (index: number) => void;
  index: number;
}) => {
  return (
    <div className={styles.profile} onClick={() => handleMemberClick(index)}>
      <div className={styles.profile_contents}>
        <Avatar src="/images/about_owl_image.jpg" className={styles.profile_avatar} />
        <div className={styles.default_info}>
          <p>{name}</p>
          <p>dev</p>
        </div>
      </div>
      {/* <div className={styles.github_link}>
        <Link href={githubURL}>
          <FaGithub color="#8a2be2" size={45} />
        </Link>
        <p>{`${name}의 GitHub 바로가기`}</p>
      </div> */}
    </div>
  );
};
