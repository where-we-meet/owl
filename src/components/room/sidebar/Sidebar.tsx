import React from 'react';

import { RoomUser } from '@/types/roomUser';

import style from './Sidebar.module.css';
import UserList from './user/UserList';

const Sidebar = ({ roomUsers }: { roomUsers: RoomUser[] }) => {
  return (
    <div className={style.container}>
      <section>
        <h2>방 제목</h2>
        <button>수정하기</button>
        <div>
          <button>공유하기</button>
        </div>
      </section>
      <UserList roomUsers={roomUsers} />
    </div>
  );
};

export default Sidebar;
