import ResultMap from '@/components/room/place/ResultMap';
import ResultHeader from '@/components/room/header/ResultHeader';
import styles from './page.module.css';

const RoomPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className={styles.container}>
      <ResultHeader roomId={params.id} />
      <ResultMap roomId={params.id} />
    </div>
  );
};

export default RoomPage;
