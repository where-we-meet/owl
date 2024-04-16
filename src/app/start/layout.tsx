import { ReactNode } from 'react';
import styles from './layout.module.css';

const RoomLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className={styles.main}>
      <div>{children}</div>
    </main>
  );
};

export default RoomLayout;
