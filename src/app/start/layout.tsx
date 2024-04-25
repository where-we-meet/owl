import { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './layout.module.css';

const RoomLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default RoomLayout;
