'use client';

import UserList from './user/UserList';
import LinkShare from '../share/LinkShare';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useParams } from 'next/navigation';
import { useGetRoomUsers } from '@/hooks/useGetRoomUsers';
import { useQuery } from '@tanstack/react-query';
import { getRooomData } from '@/api/supabaseCSR/supabase';
import Link from 'next/link';
import styles from './RoomHeader.module.css';
import roomNameGenerator from '@/utils/roomNameGenerator';

const RoomHeader = () => {
  const { id: userId } = useQueryUser();
  const { id: roomId }: { id: string } = useParams();
  const { data: room } = useQuery({ queryKey: ['room', roomId], queryFn: () => getRooomData(roomId) });
  const { roomUsers } = useGetRoomUsers(roomId, userId);
  const roomName = roomNameGenerator()

  return (
    <div className={styles.room_header}>
      <div>
        <div className={styles.left}>
          <h1 className={styles.room_title}>
            <Link href={`/room/${roomId}`}>{room ? room.name : roomName}</Link>
          </h1>
          {room && <LinkShare />}
        </div>
        <UserList roomUsers={roomUsers} />
      </div>
    </div>
  );
};

export default RoomHeader;
