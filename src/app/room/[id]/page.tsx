'use client';

import Meeting from '@/components/room/meeting/Meeting';
import Sidebar from '@/components/room/sidebar/Sidebar';
import { useGetRoomData } from '@/hooks/useGetRoomData';
import styles from './page.module.css';
import { useEffect } from 'react';
import { useRoomUserDataStore } from '@/store/store';
import { insertRoomUser } from '@/api/room';

const RoomPage = ({ params }: { params: { id: string } }) => {
  const { userId } = useGetRoomData(params.id);
  const roomUsers = useRoomUserDataStore((state) => state.roomUsers);

  useEffect(() => {
    const joinNewUser = async () => {
      if (userId && !roomUsers.find((user) => user.user_id === userId)) {
        await insertRoomUser(params.id, userId, false);
      }
    };
    joinNewUser();
  }, [params.id, userId]);

  return (
    <main className={styles.main}>
      <Sidebar />
      <Meeting id={params.id} />
    </main>
  );
};

export default RoomPage;
