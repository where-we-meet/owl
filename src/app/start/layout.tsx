import { ReactNode } from 'react';
import styles from './layout.module.css';
import Header from '@/components/header/Header';
import Footer from '@/components/Footer';

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
