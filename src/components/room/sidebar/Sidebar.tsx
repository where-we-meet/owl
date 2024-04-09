import React from 'react';

import style from './Sidebar.module.css';
import UserList from './user/UserList';
import LinkShare from '../share/LinkShare';

const Sidebar = () => {
  return (
    <div className={style.container}>
      <section>
        <h2>방 제목</h2>
        <LinkShare />
      </section>
      <UserList />
    </div>
  );
};

export default Sidebar;
