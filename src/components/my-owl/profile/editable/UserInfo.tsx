'use client';

import { ChangeEvent, useState } from 'react';

import styles from './UserInfo.module.css';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';

// import { supabase } from '@/shared/supabase';

export interface UserInfoProps {
  userId: string;
  name: string;
  profileURL: string;
}

const UserInfo = ({ userId, name, profileURL }: UserInfoProps) => {
  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState(name);

  const handleChangeUserInfo = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const name = event.target.value;
    setUserName(name);
  };

  const handleEditExit = () => {
    setUserName(name);
    setEditMode(false);
  };

  const handleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleEditDone = async () => {
    const supabase = createClient();
    //update user name
    const { data, error } = await supabase.from('users').update({ name: userName }).eq('id', userId);
    //update user profile

    setEditMode(false);
  };

  return (
    <div className={styles.user_container}>
      <div className={styles.profile_image}>
        {editMode ? (
          <Image
            className={styles.edit}
            onClick={() => {}}
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
          <button className={styles.button} onClick={handleEditMode}>
            프로필 편집
          </button>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
