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
          <Link href={githubURL} style={{ color: '#9d9d9d' }}>
            github
          </Link>
        </div>
      </div>
    </div>
  );
};
