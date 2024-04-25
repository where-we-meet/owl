import { Modal, ModalContent } from '@nextui-org/react';
import UserProfileUpdate from './UserProfileUpdate';
import UserProfileRead from './UserProfileRead';
import { useState } from 'react';

import styles from './ProfileModal.module.css';
import { useRoomUserDataStore } from '@/store/userProfileStore';
import { deleteProfileImage } from '@/api/supabaseCSR/supabase';
import { useQueryUser } from '@/hooks/useQueryUser';

export const ProfileModal = ({ onClose, isOpen }: { onClose: () => void; isOpen: boolean }) => {
  const [editMode, setEditMode] = useState(false);
  const user = useQueryUser();
  const { uploadedProfileURL, setUploadedProfileURL } = useRoomUserDataStore();
  const handleClose = async () => {
    if (editMode) {
      const isAgree = confirm('변경사항이 저장되지 않을 수 있습니다. 그래도 나가시겠습니까?');
      if (isAgree) {
        // 업로드하고 저장하지 않은 프로필이 있다면 삭제
        await deleteProfileImage({ userId: user.id, fileURL: uploadedProfileURL });
        setUploadedProfileURL('');
      } else return;
    }

    setEditMode(false);
    onClose();
  };

  const toggleEditMode = async () => {
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
