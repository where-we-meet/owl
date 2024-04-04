'use client';

import { ChangeEvent, useState } from 'react';

import { ImageUploadModal } from './modal/Modal';
import { updateUserName } from '@/api/supabaseCSR/supabase';

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
  const [toggleModal, setToggleModal] = useState(false);

  const handleChangeUserInfo = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setUserName(name);
  };

  const handleEditExit = () => {
    setUserName(name);
    setEditMode(false);
  };

  const handleToggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleNameEditDone = () => {
    updateUserName(userId, userName);
    setEditMode(false);
  };

  const handleToggleModal = () => {
    setToggleModal((prev) => !prev);
  };

  return (
    <div className={styles.user_container}>
      <div className={styles.profile_image} style={{ backgroundImage: `url(${profileURL})` }}>
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
            <button className={styles.button} onClick={handleNameEditDone}>
              완료
            </button>
          </>
        ) : (
          <button className={styles.button} onClick={handleToggleEditMode}>
            프로필 편집
          </button>
        )}
      </div>
      {toggleModal && <ImageUploadModal handleToggleModal={handleToggleModal} />}
    </div>
  );
};

export default UserInfo;
