import React from 'react';
import UserList from './user/UserList';
import { RoomUser } from '@/types/roomUser';

const Sidebar = ({ roomUsers }: { roomUsers: RoomUser[] }) => {
  return (
    <>
      <section>
        <h2>방 제목</h2>
        <button>수정하기</button>
        <div>
          <button>공유하기</button>
        </div>
      </section>
      <UserList roomUsers={roomUsers} />
    </>
  );
};

export default Sidebar;
