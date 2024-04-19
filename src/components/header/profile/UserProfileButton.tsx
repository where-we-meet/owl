'use client';

import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from '@nextui-org/react';
import { useEffect, useState } from 'react';

import styles from './UserProfileButton.module.css';
import { useQueryUser } from '@/hooks/useQueryUser';
import { getUserProfileData } from '@/api/profile';
import { ProfileModal } from './ProfileModal';
import Logout from '@/components/auth/LogoutButton';

export type UserProfileData = { name: string; profile_url: string | null };
const UserProfile = () => {
  const user = useQueryUser();
  //state for recent profile data (from supabase DB)
  const [data, setData] = useState<UserProfileData>({
    name: '',
    profile_url: ''
  });

  // useEffect for take recent data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserProfileData(user.id);
        setData({ name: data.name, profile_url: data.profile_url });
      } catch (error) {
        console.error('Error fetching user profile data:', error);
      }
    };
    fetchData();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleModalOpen = () => {
    onOpen();
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <div className="flex gap-4 items-center" title="내 프로필 설정 및 보기">
            <Avatar
              className={styles.profile}
              showFallback
              name={user.user_metadata.user_name}
              isBordered={true}
              src={`${data.profile_url}`}
            />
          </div>
        </DropdownTrigger>
        <DropdownMenu className={styles.dropdown}>
          <DropdownItem className={styles.first_item}>
            <div className={styles.view_profile_container}>
              <Avatar
                className={styles.view_profile}
                showFallback
                name={user.user_metadata.user_name}
                src={`${data.profile_url}`}
              />
              <div className={styles.view_profile_text_container}>
                <p className={styles.user_name}>반가워올, {data.name}!</p>
                <p className={styles.view_profile_text} onClick={handleModalOpen}>
                  내 프로필 보기
                </p>
              </div>
            </div>
          </DropdownItem>
          <DropdownItem className={styles.logout}>
            <Logout />
          </DropdownItem>
        </DropdownMenu>
        <ProfileModal onClose={onClose} isOpen={isOpen} />
      </Dropdown>
      <ProfileModal onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default UserProfile;
