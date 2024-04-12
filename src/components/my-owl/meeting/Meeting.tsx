'use client';

import { useRouter } from 'next/navigation';
import styles from './Meeting.module.css';
import { useGetModalData } from '@/hooks/useGetSidebarData';
import { useEffect, useState } from 'react';
import { Skeleton } from '@nextui-org/react';

export const Meeting = () => {
  const router = useRouter();
  const ModalData = useGetModalData();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (ModalData) {
      setIsLoaded(true);
    }
  }, [ModalData]);

  const handleClickRoom = (roomId: string | null) => {
    router.push(`/room/${roomId}`);
  };

  return (
    <div className={styles.meeting_container}>
      {ModalData.map((meeting, index) => (
        <div key={index} className={styles.rooms_box} onClick={() => handleClickRoom(meeting.id)}>
          <Skeleton isLoaded={isLoaded} className="rounded-lg">
            <div className={styles.room_box}>
              <div className={styles.room_box_left}>
                <h3 className={styles.meeting_name}>{meeting.name}</h3>
                <p className={styles.meeting_date}>날짜 : {meeting.confirmed_date}</p>
                <p className={styles.meeting_location}>위치 : {meeting.location}</p>
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
          </Skeleton>
        </div>
      ))}
    </div>
  );
};
