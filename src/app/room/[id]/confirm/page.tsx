import ResultMap from '@/components/room/place/ResultMap';
import ResultSchedule from '@/components/room/calender/ResultSchedule';
import styles from './page.module.css';

const RoomPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className={styles.container}>
      <ResultMap roomId={params.id} />
      <ResultSchedule roomId={params.id} />
    </div>
  );
};

export default RoomPage;
