'use client';

import { getRealtimeRoomData } from '@/api/supabaseCSR/supabase';
import Meeting from '@/components/room/meeting/Meeting';
import Sidebar from '@/components/room/sidebar/Sidebar';
import { RoomData } from '@/components/room/sidebar/user/UserList';
import { userDataFetch } from '@/utils/supabase/userDataFetch';
import { useEffect, useState } from 'react';

const RoomPage = ({ params }: { params: { id: string } }) => {
  const [roomData, setRoomData] = useState<RoomData>([]);

  useEffect(() => {
    getRealtimeRoomData(params.id, setRoomData);
    const sortedUserData = async () => {
      // const updateLocation = await

      const data = await userDataFetch(params.id);

      setRoomData(data);
    };
    sortedUserData();
  }, [params]);

  return (
    <main style={{ display: 'flex' }}>
      <Sidebar roomData={roomData} />
      <Meeting id={params.id} />
    </main>
  );
};

export default RoomPage;
