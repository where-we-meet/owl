import React from 'react';

import UserList from './user/UserList';
import LinkShare from '../share/LinkShare';

const RoomHeader = () => {
  return (
    <div>
      <h1>호기심 많은 올빼미</h1>
      <LinkShare />
      <UserList />
    </div>
  );
};

export default RoomHeader;
