import { Modal, ModalContent } from '@nextui-org/react';
import UserProfileUpdate from './UserProfileUpdate';
import UserProfileRead from './UserProfileRead';
import { useState } from 'react';

import styles from './ProfileModal.module.css';

export const ProfileModal = ({ onClose, isOpen }: { onClose: () => void; isOpen: boolean }) => {
  const [editMode, setEditMode] = useState(false);
  const handleClose = () => {
    if (editMode && !confirm('저장되지 않은 변경 사항이 있습니다. 그래도 나가시겠습니까?')) return;
    setEditMode(false);
    onClose();
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <Modal className={styles.modal} backdrop="blur" isOpen={isOpen} onClose={handleClose} hideCloseButton>
      <ModalContent className={styles.modal_container}>
        {editMode ? (
          <UserProfileUpdate toggleEditMode={toggleEditMode} isOpen={isOpen} handleClose={handleClose} />
        ) : (
          <UserProfileRead toggleEditMode={toggleEditMode} handleClose={handleClose} isOpen={isOpen} />
        )}
      </ModalContent>
    </Modal>
  );
};
