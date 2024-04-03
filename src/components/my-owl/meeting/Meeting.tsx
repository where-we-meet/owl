import styles from './Meeting.module.css';

export const Meeting = () => {
  const getUserMeetings = () => {};
  return (
    <div className={styles.meeting_container}>
      <div className={styles.rooms_box}>
        <div className={styles.room_box}>
          <div>
            <h3>모임명</h3>
            <p>날짜</p>
            <p>위치</p>
          </div>
          <div>
            <div>
              <p>user들의 프로필사진</p>
            </div>
            <p>n명 참여중</p>
          </div>
        </div>
      </div>
    </div>
  );
};
