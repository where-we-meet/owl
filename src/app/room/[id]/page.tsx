'use client';

import Meeting from '@/components/room/meeting/Meeting';
import Sidebar from '@/components/room/sidebar/Sidebar';
import { useGetRoomData } from '@/hooks/useGetRoomData';

const RoomPage = ({ params }: { params: { id: string } }) => {
  useGetRoomData(params.id);
  return (
    <main style={{ display: 'flex' }}>
      <Sidebar />
      <Meeting id={params.id} />
    </main>
  );
};

export default RoomPage;
