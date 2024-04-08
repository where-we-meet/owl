'use client';

import { ChangeEvent, useState } from 'react';

import { ImageUploadModal } from './modal/Modal';
import { changeUserProfile, updateUserName } from '@/api/supabaseCSR/supabase';

import styles from './UserInfo.module.css';
import Image from 'next/image';

export interface UserInfoProps {
  userId: string;
  name: string;
  profileURL: string | null;
}

const UserInfo = ({ userId, name, profileURL }: UserInfoProps) => {
  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState(name);
  const [userProfileURL, setUserProfileURL] = useState(profileURL);
  const [toggleModal, setToggleModal] = useState(false);

  const handleChangeUserInfo = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setUserName(name);
  };

  const handleEditExit = () => {
    setUserName(name);
    setUserProfileURL(profileURL);
    setEditMode(false);
  };

  const handleToggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleEditDone = () => {
    updateUserName(userId, userName);
    if (userProfileURL !== null) {
      changeUserProfile({ userId, profile_url: userProfileURL });
    }
    setEditMode(false);
  };

  const handleToggleModal = () => {
    setToggleModal((prev) => !prev);
  };

  return (
    <div className={styles.user_container}>
      <div className={styles.profile_image} style={{ backgroundImage: `url(${userProfileURL})` }}>
        {editMode ? (
          <Image
            className={styles.edit}
            onClick={handleToggleModal}
            src="/images/edit_mode.svg"
            alt="edit mode"
            width={24}
            height={21}
          />
        ) : null}
      </div>
      <input className={styles.user_name} onChange={handleChangeUserInfo} value={userName} disabled={!editMode} />
      <div className={styles.button_container}>
        {editMode ? (
          <>
            <button className={styles.button} onClick={handleEditExit}>
              취소
            </button>
            <button className={styles.button} onClick={handleEditDone}>
              완료
            </button>
          </>
        ) : (
          <button className={styles.button} onClick={handleToggleEditMode}>
            프로필 편집
          </button>
        )}
      </div>
      {toggleModal && <ImageUploadModal handleToggleModal={handleToggleModal} setUserProfileURL={setUserProfileURL} />}
    </div>
  );
};

export default UserInfo;
