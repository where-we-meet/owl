import ProgressBar from '@/components/room/setting/ProgressBar';
import styles from './layout.module.css';
import RoomHeader from '@/components/room/header/RoomHeader';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.setting_container}>
      <RoomHeader />
      <ProgressBar basePath={`/start`} />
      {children}
    </div>
  );
};

export default Layout;
