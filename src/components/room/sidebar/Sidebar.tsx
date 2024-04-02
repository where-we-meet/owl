import React from 'react';
import UserList from './user/UserList';

const Sidebar = ({ id }: { id: string }) => {
  return (
    <>
      <section>
        <h2>방 제목</h2>
        <button>수정하기</button>
        <div>
          <button>공유하기</button>
        </div>
      </section>
      <UserList id={id} />
    </>
  );
};

export default Sidebar;
