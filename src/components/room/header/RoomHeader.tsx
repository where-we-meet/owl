'use client';
import React, { useEffect } from 'react';
import UserList from './user/UserList';
import LinkShare from '../share/LinkShare';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useParams, useRouter } from 'next/navigation';
import { insertRoomUser } from '@/api/room';
import { useGetRoomUsers } from '@/hooks/useGetRoomUsers';
import { useQuery } from '@tanstack/react-query';
import { getRooomData } from '@/api/supabaseCSR/supabase';
import styles from './RoomHeader.module.css';
import Link from 'next/link';

const RoomHeader = () => {
  const router = useRouter();
  const { id: userId } = useQueryUser();
  const { id: roomId }: { id: string } = useParams();
  const { data: room, isPending } = useQuery({ queryKey: ['room', roomId], queryFn: () => getRooomData(roomId) });
  const { roomUsers } = useGetRoomUsers(roomId, userId);

  const joinNewUser = async () => {
    const isExistUser = roomUsers.some((user) => user.user_id === userId);
    if (isExistUser) return;
    router.replace(`/room/${roomId}/pick-calendar`);
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
        <div className={styles.left}>
          <h1 className={styles.room_title}>
            <Link href={`/room/${roomId}`}>{room.name}</Link>
          </h1>
          <LinkShare />
        </div>
        <UserList roomUsers={roomUsers} />
      </div>
    </div>
  );
};

export default RoomHeader;
