'use client';

import { Avatar, Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import UserProfileUpdate from './UserProfileUpdate';
import UserProfileRead from './UserProfileRead';
import { PiUserSquareDuotone } from 'react-icons/pi';

import styles from './UserProfileButton.module.css';
import { useQueryUser } from '@/hooks/useQueryUser';
import { getUserProfileData } from '@/api/profile';

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
  const [profile, setProfile] = useState<null | string>(null);

  const handleClose = () => {
    setEditMode(false);
    onClose();
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <>
      <div className="flex gap-4 items-center">
        <Avatar
          className={styles.profile}
          onClick={onOpen}
          showFallback
          name={user.user_metadata.user_name}
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
