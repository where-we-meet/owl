import styles from './MeetingIsPending.module.css';

export const MeetingIsPending = () => {
  return (
    <div className={styles.pending_container}>
      <img src="images/logo.png" alt="올빼미입니다" width={100} />
      <p>올빼미들을 불러오는 중...</p>
    </div>
  );
};
