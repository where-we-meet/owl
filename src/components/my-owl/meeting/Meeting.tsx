import { createClient } from '@/utils/supabase/server';
import styles from './Meeting.module.css';

const supabase = createClient();
export const Meeting = () => {
  const getUserInfo = async () => {};
  const getUserMeetings = async () => {
    const { data, error } = await supabase.from('room_schedule').select('room_id, start_date, end_date, created_by');
  };
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
