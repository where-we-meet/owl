'use client';

import { Avatar, useDisclosure } from '@nextui-org/react';
import { useEffect, useState } from 'react';

import styles from './UserProfileButton.module.css';
import { useQueryUser } from '@/hooks/useQueryUser';
import { getUserProfileData } from '@/api/profile';
import { ProfileModal } from './ProfileModal';

const UserProfile = () => {
  const user = useQueryUser();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserProfileData(user.id);
        setProfile(data.profile_url);
      } catch (error) {
        console.error('Error fetching user profile data:', error);
      }
    };
    fetchData();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [profile, setProfile] = useState<string | null>('');

  const handleModalOpen = () => {
    onOpen();
  };

  return (
    <>
      <div className="flex gap-4 items-center" title="내 프로필 설정 및 보기">
        <Avatar
          className={styles.profile}
          onClick={handleModalOpen}
          showFallback
          name={user.user_metadata.user_name}
          isBordered={true}
          src={`${profile}`}
        />
      </div>
      <ProfileModal onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default UserProfile;
