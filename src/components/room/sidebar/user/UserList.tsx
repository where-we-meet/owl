'use client';

import { useGetRoomUsers } from '@/hooks/useGetRoomUsers';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import UserCard from './UserCard';
import { upsertRoomUser } from '@/api/room';

const UserList = () => {
  const { id: userId } = useQueryUser();
  const { id: roomId }: { id: string } = useParams();
  const { roomUsers } = useGetRoomUsers(roomId, userId);

  const joinNewUser = async () => {
    await upsertRoomUser({
      room_id: roomId,
      user_id: userId,
      start_location: null,
      is_admin: false,
      lat: null,
      lng: null
    });
  };

  useEffect(() => {
    const isExistUser = roomUsers.some((user) => user.user_id === userId);
    if (!isExistUser) {
      joinNewUser();
    }
  }, [roomUsers.length]);

  return (
    <>
      {roomUsers.map((user) => (
        <UserCard key={user.user_id} user={user} />
      ))}
    </>
  );
};

export default UserList;
