import StartMeeting from '@/components/room/StartMeeting';
import styles from './page.module.css';

const page = async () => {
  return (
    <main className={styles.main}>
      <StartMeeting />
    </main>
  );
};

export default page;
