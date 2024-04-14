import styles from '@/app/room/[id]/(setting)/layout.module.css';
import ProgressBar from '@/components/room/setting/ProgressBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.setting_container}>
      <ProgressBar />
      {children}
    </div>
  );
};

export default Layout;
