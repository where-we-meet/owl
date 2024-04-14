'use client';

import { useRouter } from 'next/navigation';
import { useGetModalData } from '@/hooks/useGetSidebarData';
import { useEffect, useState } from 'react';
import { Skeleton } from '@nextui-org/react';
import styles from './Meeting.module.css';

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
    <div className={styles.rooms_box}>
      {ModalData.length === 0 ? (
        <p>현재 참여중인 모임이 없습니다.</p>
      ) : (
        ModalData.map((meeting, index) => (
          <div key={index} onClick={() => handleClickRoom(meeting.id)}>
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
        ))
      )}
    </div>
  );
};
