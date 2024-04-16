import Dashboard from '@/components/room/Dashboard';
import styles from './page.module.css';

const RoomPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className={styles.container}>
      <Dashboard roomId={params.id} />
    </div>
  );
};

export default RoomPage;
