import Link from 'next/link';
import { Avatar } from '@nextui-org/react';
import styles from './MemberCard.module.css';

export const MemberCard = ({
  name,
  githubURL,
  profile,
  handleMemberClick,
  index
}: {
  name: string;
  githubURL: string;
  profile: string;
  handleMemberClick: (index: number) => void;
  index: number;
}) => {
  return (
    <div className={styles.profile} onClick={() => handleMemberClick(index)}>
      <div className={styles.profile_contents}>
        <Avatar src={profile} className={styles.profile_avatar} />
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
