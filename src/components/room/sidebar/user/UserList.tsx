'use client';

import { useGetRoomUsers } from '@/hooks/useGetRoomUsers';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import UserCard from './UserCard';
import { upsertRoomUser } from '@/api/room';
import styles from './UserList.module.css';

const UserList = () => {
  const { id: userId } = useQueryUser();
  const { id: roomId }: { id: string } = useParams();
  const { roomUsers, isPending } = useGetRoomUsers(roomId, userId);

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
    if (!isPending) {
      const isExistUser = roomUsers.some((user) => user.user_id === userId);
      if (!isExistUser) {
        joinNewUser();
      }
    }
  }, [isPending]);

  return (
    <ul className={styles.user_list}>
      {roomUsers.map((user) => (
        <UserCard key={user.user_id} user={user} />
      ))}
    </ul>
  );
};

export default UserList;
