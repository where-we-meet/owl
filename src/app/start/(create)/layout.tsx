import ProgressBar from '@/components/room/setting/ProgressBar';
import styles from './layout.module.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.setting_container}>
      <ProgressBar basePath={`/start`} />
      {children}
    </div>
  );
};

export default Layout;
