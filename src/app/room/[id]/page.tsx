import ResultPlace from '@/components/room/meeting/ResultPlace';
import ResultSchedule from '@/components/room/meeting/calender/ResultSchedule';
import styles from './page.module.css';
import { Button } from '@nextui-org/react';

const RoomPage = () => {
  return (
    <div className={styles.container}>
      <ResultSchedule />
      <ResultPlace />
      <div className={styles.footer}>
        <Button>확정</Button>
      </div>
    </div>
  );
};

export default RoomPage;
