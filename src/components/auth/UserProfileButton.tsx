'use client';

import { Button, Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import UserProfileUpdate from './UserProfileUpdate';
import UserProfileRead from './UserProfileRead';
import { PiUserSquareDuotone } from 'react-icons/pi';

import styles from './UserProfileButton.module.css';

const UserProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editMode, setEditMode] = useState(false);

  const handleOpen = () => {
    onOpen();
  };

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
        <Button isIconOnly onPress={handleOpen} aria-label="User Profile Setting">
          <PiUserSquareDuotone />
        </Button>
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
