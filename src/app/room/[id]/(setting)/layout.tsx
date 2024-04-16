import styles from '@/app/room/[id]/(setting)/layout.module.css';
import ProgressBar from '@/components/room/setting/ProgressBar';

const Layout = ({ children, params }: { children: React.ReactNode; params: { id: string } }) => {
  return (
    <div className={styles.setting_container}>
      <ProgressBar basePath={`/room/${params.id}`} />
      {children}
    </div>
  );
};

export default Layout;
