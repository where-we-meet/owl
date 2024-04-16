import ResultPlace from '@/components/room/meeting/ResultPlace';
import ResultSchedule from '@/components/room/meeting/calender/ResultSchedule';
import styles from './page.module.css';
import ConfirmedButton from '@/components/room/ConfirmedButton';

const RoomPage = () => {
  return (
    <div className={styles.container}>
      <ResultSchedule />
      <ResultPlace />
      <div className={styles.footer}>
        <ConfirmedButton />
      </div>
    </div>
  );
};

export default RoomPage;
