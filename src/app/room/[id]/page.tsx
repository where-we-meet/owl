import SettingMap from '@/components/room/place/SettingMap';
import Sidebar from '@/components/room/sidebar/Sidebar';
import RoomHeader from '@/components/room/header/RoomHeader';
import styles from './page.module.css';

const SettingPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar_wrapper}>
        <RoomHeader />
        <Sidebar />
      </div>
      <div className={styles.map_wrapper}>
        <SettingMap />
      </div>
    </div>
  );
};

export default SettingPage;
