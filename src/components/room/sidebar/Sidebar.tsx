import React from 'react';
import UserList, { RoomData } from './user/UserList';

const Sidebar = ({ roomData }: { roomData: RoomData }) => {
  return (
    <>
      <section>
        <h2>방 제목</h2>
        <button>수정하기</button>
        <div>
          <button>공유하기</button>
        </div>
      </section>
      <UserList roomData={roomData} />
    </>
  );
};

export default Sidebar;
