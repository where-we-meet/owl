'use client';

import { useRouter } from 'next/navigation';
import { useGetModalData } from '@/hooks/useGetSidebarData';
import { useEffect, useState } from 'react';
import { Avatar, Skeleton } from '@nextui-org/react';
import styles from './Meeting.module.css';

import { BsCalendarDateFill } from 'react-icons/bs';
import { TbLocationFilled } from 'react-icons/tb';
import { FaMapLocationDot } from 'react-icons/fa6';

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
                  <p className={styles.meeting_date}>
                    <BsCalendarDateFill /> {meeting.confirmed_date || '확정된 날짜가 없습니다.'}
                  </p>
                  <p className={styles.meeting_location}>
                    <FaMapLocationDot /> {meeting.location || '확정된 위치가 없습니다.'}
                  </p>
                </div>
                <div className={styles.room_box_right}>
                  <div className={styles.participants_container}>
                    {meeting.userdata_room.map((participant, index) => (
                      <Avatar
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
