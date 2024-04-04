import Meeting from '@/components/room/meeting/Meeting';
import Sidebar from '@/components/room/sidebar/Sidebar';

const RoomPage = async ({ params }: { params: { id: string } }) => {
  return (
    <main style={{ display: 'flex' }}>
      <Sidebar id={params.id} />
      <Meeting id={params.id} />
    </main>
  );
};

export default RoomPage;
