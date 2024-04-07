'use client';

import Meeting from '@/components/room/meeting/Meeting';
import Sidebar from '@/components/room/sidebar/Sidebar';
import { useGetRoomData } from '@/hooks/useGetRoomData';
import styles from './page.module.css';
import { useEffect } from 'react';
import { useRoomUserDataStore } from '@/store/store';
import { createClient } from '@/utils/supabase/client';

const RoomPage = ({ params }: { params: { id: string } }) => {
  const { userId } = useGetRoomData(params.id);
  const roomUsers = useRoomUserDataStore((state) => state.roomUsers);

  useEffect(() => {
    const joinNewUser = async () => {
      const supabase = createClient();
      const checkNewUser = roomUsers.find((user) => user.user_id === userId) ? true : false;
      if (userId && !checkNewUser) {
        await supabase.from('userdata_room').insert([{ room_id: params.id, user_id: userId, is_admin: false }]);
      }
    };
    joinNewUser();
  }, [userId]);

  return (
    <main className={styles.main}>
      <Sidebar />
      <Meeting id={params.id} />
    </main>
  );
};

export default RoomPage;
