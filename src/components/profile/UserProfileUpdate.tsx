'use client';

import { useEffect, useState, type ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, ModalHeader, ModalBody, Avatar, Tooltip } from '@nextui-org/react';
import { changeUserProfile, deleteProfileImage, getUserProfileData, updateUserName } from '@/api/profile';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useRoomUserDataStore } from '@/store/userProfileStore';
import { ImageUploadModal } from './ImageUploadModal';
import { IoChevronBack } from 'react-icons/io5';
import { AiFillPlusCircle } from 'react-icons/ai';
import styles from './UserProfileUpdate.module.css';

const MAX_NAME_LENGTH = 8;

const UserProfileUpdate = ({
  toggleEditMode,
  isOpen,
  handleClose
}: {
  toggleEditMode: () => void;
  isOpen: boolean;
  handleClose: () => void;
}) => {
  const [userName, setUserName] = useState('');
  const [userProfileURL, setUserProfileURL] = useState<string | null>('');
  const [toggleModal, setToggleModal] = useState(false);
  const { setUploadedProfileURL, setCurrentProfileURL, currentProfileURL, uploadedProfileURL } = useRoomUserDataStore();

  const user = useQueryUser();
  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getUserProfileData(user.id)
  });

  const handleToggleModal = () => {
    setToggleModal((prev) => !prev);
  };

  const handleChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setUserName(name);
  };

  const handleEditDone = async () => {
    if (userName.length < 1) {
      alert('닉네임은 최소 1글자 이상으로 지어주세요.');
    } else if (userName.length > MAX_NAME_LENGTH) {
      alert(`닉네임은 최대 ${MAX_NAME_LENGTH}글자 이하로 지어주세요.`);
    } else {
      await updateUserName(user.id, userName);
      if (userProfileURL !== '' && userProfileURL !== null) {
        // 기존 프로필 삭제
        await deleteProfileImage({ userId: user.id, fileURL: currentProfileURL });
        await changeUserProfile({ userId: user.id, profile_url: userProfileURL });
      }

      toggleEditMode();
    }
  };

  const handleEditExit = async () => {
    // 업로드 된 이미지 삭제
    await deleteProfileImage({ userId: user.id, fileURL: uploadedProfileURL });
    setUploadedProfileURL('');
    toggleEditMode();
  };

  useEffect(() => {
    if (data) {
      setUserName(data.name);
      setUserProfileURL(data.profile_url);
      setUploadedProfileURL('');
      setCurrentProfileURL(data.profile_url);
    }
  }, [data]);

  const handleUnload = async (e: BeforeUnloadEvent) => {
    e.preventDefault();
    return '';
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('popstate', handleClose);
      window.addEventListener('beforeunload', handleUnload);
    } else {
      window.removeEventListener('popstate', handleClose);
      window.removeEventListener('beforeunload', handleUnload);
    }
    return () => {
      window.removeEventListener('popstate', handleClose);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [isOpen]);

  return (
    <>
      <Tooltip className={styles.tooltip} placement="right" content="돌아가기">
        <Button className={styles.back_btn} isIconOnly onPress={handleEditExit} endContent={<IoChevronBack />}></Button>
      </Tooltip>
      <ModalHeader className="flex flex-col gap-1 text-center">
        <h1 className={styles.header_title}>프로필 수정</h1>
      </ModalHeader>
      <ModalBody className={styles.modal_body}>
        <div className={styles.profile_container}>
          <Avatar className={styles.profile} showFallback alt="profile_image" src={`${userProfileURL}`} />
          <Button className={styles.profile_edit_button} isIconOnly onPress={handleToggleModal}>
            <AiFillPlusCircle className={styles.edit_icon} />
          </Button>
        </div>
        <div>
          <div className={styles.name_container}>
            <span className={styles.edit_name_description}>
              <label htmlFor="name">닉네임을 입력해주세요</label>
              <p>
                <span className={styles.current_name_length}>{userName.length}</span>/{MAX_NAME_LENGTH}
              </p>
            </span>
            <input
              id="name"
              type="text"
              onChange={handleChangeUserName}
              value={userName}
              maxLength={MAX_NAME_LENGTH}
              autoFocus
              autoComplete="off"
            />
          </div>
          <Button className={styles.save_button} onPress={handleEditDone}>
            저장
          </Button>
        </div>

        {toggleModal && (
          <ImageUploadModal
            handleToggleModal={handleToggleModal}
            setUserProfileURL={setUserProfileURL}
            userId={user.id}
          />
        )}
      </ModalBody>
    </>
  );
};

export default UserProfileUpdate;
