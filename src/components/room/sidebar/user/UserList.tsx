'use client';

import { useGetRoomUsers } from '@/hooks/useGetRoomUsers';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useParams } from 'next/navigation';
import React from 'react';
import UserCard from './UserCard';

const UserList = () => {
  const { id: userId } = useQueryUser();
  const { id: roomId }: { id: string } = useParams();
  const { roomUsers } = useGetRoomUsers(roomId, userId);

  return (
    <>
      {roomUsers.map((user) => (
        <UserCard key={user.user_id} user={user} />
      ))}
    </>
  );
};

export default UserList;
