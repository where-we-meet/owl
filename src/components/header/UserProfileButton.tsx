'use client';

import { Avatar, Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import UserProfileUpdate from './UserProfileUpdate';
import UserProfileRead from './UserProfileRead';

import styles from './UserProfileButton.module.css';
import { useQueryUser } from '@/hooks/useQueryUser';
import { getUserProfileData } from '@/api/profile';
import { usePathname } from 'next/navigation';

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
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState<string | null>('');
  const pathname = usePathname();
  console.log(pathname);
  const handleClose = () => {
    setEditMode(false);
    history.back();
    onClose();
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };
  // window.addEventListener(
  //   'popstate',
  //   function (event) {
  //     //4 or 8번이나 뜸. 왜?
  //     alert('뒤로가기 버튼이 클릭되었습니다!');
  //     handleClose();
  //   },
  //   { once: true }
  // );
  window.onpopstate = () => {
    alert('뒤로가기 버튼이 클릭되었습니다!');
    handleClose();
  };
  const handleModalOpen = () => {
    history.pushState(null, '내 프로필', pathname === '/' ? 'profile' : `${pathname}/profile`);
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

      <Modal className={styles.modal} backdrop="blur" isOpen={isOpen} onClose={handleClose} hideCloseButton>
        <ModalContent className={styles.modal_container}>
          {editMode ? (
            <UserProfileUpdate toggleEditMode={toggleEditMode} />
          ) : (
            <UserProfileRead toggleEditMode={toggleEditMode} handleClose={handleClose} />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserProfile;
