'use client';
import React, { useEffect } from 'react';
import UserList from './user/UserList';
import LinkShare from '../share/LinkShare';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useParams } from 'next/navigation';
import { insertRoomUser } from '@/api/room';
import { useGetRoomUsers } from '@/hooks/useGetRoomUsers';
import { useQuery } from '@tanstack/react-query';
import { getRooomData } from '@/api/supabaseCSR/supabase';
import styles from './RoomHeader.module.css';

const RoomHeader = () => {
  const { id: userId } = useQueryUser();
  const { id: roomId }: { id: string } = useParams();
  const { data: room, isPending } = useQuery({ queryKey: ['room', roomId], queryFn: () => getRooomData(roomId) });
  const { roomUsers } = useGetRoomUsers(roomId, userId);

  const joinNewUser = async () => {
    const isExistUser = roomUsers.some((user) => user.user_id === userId);
    if (isExistUser) return;
    await insertRoomUser({ room_id: roomId, user_id: userId, is_admin: false });
  };

  useEffect(() => {
    if (roomUsers.length > 0) {
      joinNewUser();
    }
  }, [roomUsers.length]);

  if (!room || isPending) return <div>로딩중</div>;

  return (
    <div className={styles.room_header}>
      <div>
        <h1 className={styles.room_title}>{room.name}</h1>
        <div className={styles.right}>
          <LinkShare />
          <UserList roomUsers={roomUsers} />
        </div>
      </div>
    </div>
  );
};

export default RoomHeader;
