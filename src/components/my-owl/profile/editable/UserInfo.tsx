'use client';

import { ChangeEvent, useState } from 'react';

import styles from './UserInfo.module.css';
import { supabase } from '@/shared/supabase';

export interface UserInfoProps {
  userId: string;
  name: string;
  profileURL: string;
}

const UserInfo = ({ userId, name, profileURL }: UserInfoProps) => {
  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState(name);

  const handleChangeUserInfo = {
    name: (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const name = event.target.value;
      setUserName(name);
    }
  };

  const handleEditExit = () => {
    setUserName(name);
    setEditMode(false);
  };

  const handleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleEditDone = async () => {
    //update user name
    const { data, error } = await supabase.from('users').update({ name: userName }).eq('id', userId);
    //update user profile
    console.log(data);
    setEditMode(false);
  };

  return (
    <div>
      <div className={styles.profile_image}>UserInfo Image</div>
      <input className={styles.user_name} onChange={handleChangeUserInfo.name} value={userName} disabled={!editMode} />
      <div className={styles.button_container}>
        {editMode ? (
          <>
            <button onClick={handleEditExit}>취소</button>
            <button onClick={handleEditDone}>완료</button>
          </>
        ) : (
          <button onClick={handleEditMode}>프로필 편집</button>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
