import Meeting from '@/components/room/meeting/Meeting';
import { getRoomData } from '@/api/supabase';
import Sidebar from '@/components/room/sidebar/Sidebar';

const RoomPage = async ({ params }: { params: { id: string } }) => {
  const data = await getRoomData(params.id);
  console.log('roomData : ', data, 'id : ', params.id);

  return (
    <main style={{ display: 'flex' }}>
      <Sidebar id={params.id} />
      <Meeting />
    </main>
  );
};

export default RoomPage;
