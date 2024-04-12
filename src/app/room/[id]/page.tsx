import Meeting from '@/components/room/meeting/Meeting';
import Sidebar from '@/components/room/sidebar/Sidebar';
import styles from './page.module.css';

const RoomPage = ({ params }: { params: { id: string } }) => {
  return (
    <main className={styles.main}>
      <Sidebar />
      <Meeting id={params.id} />
    </main>
  );
};

export default RoomPage;
