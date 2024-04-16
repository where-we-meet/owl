import RoomHeader from '@/components/room/header/RoomHeader';
import { ReactNode } from 'react';
import styles from './layout.module.css';

const RoomLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className={styles.main}>
      {/* <RoomHeader /> */}
      <div>{children}</div>
    </main>
  );
};

export default RoomLayout;
