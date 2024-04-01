'use client';

import { useState } from 'react';

import styles from './UserInfo.module.css';

const UserInfo = () => {
  const [editMode, setEditMode] = useState(true);

  const handleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleEditDone = () => {
    //  변경사항 저장 로직
    setEditMode(false);
  };

  return (
    <div>
      <div className={styles.profile_image}>UserInfo Image</div>
      <p className={styles.user_name}>User Name</p>
      <div className={styles.button_container}>
        <button onClick={handleEditMode}>{editMode ? '취소' : '프로필 편집'}</button>
        {editMode ? <button onClick={handleEditDone}>완료</button> : null}
      </div>
    </div>
  );
};

export default UserInfo;
