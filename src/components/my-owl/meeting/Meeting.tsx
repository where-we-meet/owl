'use client';

import { useRouter } from 'next/navigation';
import styles from './Meeting.module.css';
import { useGetSidebarData } from '@/hooks/useGetSidebarData';

export const Meeting = () => {
  const router = useRouter();
  const SidebarData = useGetSidebarData();

  const handleClickRoom = (roomId: string | null) => {
    router.push(`/room/${roomId}`);
  };

  return (
    <div className={styles.meeting_container}>
      {SidebarData.map((meeting, index) => (
        <div key={index} className={styles.rooms_box} onClick={() => handleClickRoom(meeting.id)}>
          <div className={styles.room_box}>
            <div className={styles.room_box_left}>
              <h3>{meeting.name}</h3>
              <p>날짜 : {meeting.confirmed_date}</p>
              <p>위치 : {meeting.location}</p>
            </div>
            <div className={styles.room_box_right}>
              <div className={styles.participants_container}>
                {meeting.userdata_room.map((participant, index) => (
                  <div
                    className={styles.participant_profile}
                    style={{ backgroundImage: `url(${participant.users?.profile_url})` }}
                    key={index}
                  />
                ))}
              </div>
              <p>{meeting.userdata_room.length}명 참여중</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
