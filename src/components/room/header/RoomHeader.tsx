'use client';

// import UserList from './user/UserList';
// import { useQueryUser } from '@/hooks/useQueryUser';
// import { useGetRoomUsers } from '@/hooks/useGetRoomUsers';

import LinkShare from '../share/LinkShare';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getRoomData } from '@/api/supabaseCSR/supabase';
import styles from './RoomHeader.module.css';

const RoomHeader = () => {
  // const { id: userId } = useQueryUser();
  // const { roomUsers } = useGetRoomUsers(roomId, userId);

  const { id: roomId }: { id: string } = useParams();
  const { data: room } = useQuery({ queryKey: ['room', roomId], queryFn: () => getRoomData(roomId) });

  return (
    <div className={styles.room_header}>
      <div>
        <div className={styles.left}>
          <h1 className={styles.room_title}>
            <p>{room ? room.name : '올빼미를 불러오는 중'}</p>
          </h1>
          {room && <LinkShare />}
        </div>
        {/* <UserList roomUsers={roomUsers} /> */}
      </div>
    </div>
  );
};

export default RoomHeader;
