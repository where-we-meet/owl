import UserList from '@/components/room/meeting/user/UserList';
import Meeting from '@/components/room/meeting/Meeting';
import { getRoomData } from '@/api/supabase';

const RoomPage = async ({ params }: { params: { id: string } }) => {
  const data = await getRoomData(params.id);
  console.log('roomData : ', data, 'id : ', params.id);

  return (
    <main>
      <UserList />
      <Meeting />
    </main>
  );
};

export default RoomPage;
