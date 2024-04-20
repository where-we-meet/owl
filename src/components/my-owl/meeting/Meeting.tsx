'use client';

import { useRouter } from 'next/navigation';
import { useGetModalData } from '@/hooks/useGetSidebarData';
import { useEffect, useState } from 'react';
import { Avatar, AvatarGroup, Skeleton } from '@nextui-org/react';
import styles from './Meeting.module.css';

import { BsCalendarDateFill } from 'react-icons/bs';
import { FaMapLocationDot } from 'react-icons/fa6';
import { RiVerifiedBadgeFill } from 'react-icons/ri';

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
                  <div className={styles.meeting_main_info}>
                    <h3 className={styles.meeting_name}>{meeting.name}</h3>
                    {!meeting.verified ? <RiVerifiedBadgeFill className={styles.verified_icon} /> : null}
                  </div>
                  <p className={meeting.confirmed_date === null ? styles.undecided_meeting_date : styles.meeting_date}>
                    <BsCalendarDateFill /> {meeting.confirmed_date || '확정된 날짜가 없습니다.'}
                  </p>
                  <p
                    className={meeting.location === null ? styles.undecided_meeting_location : styles.meeting_location}
                  >
                    <FaMapLocationDot /> {meeting.location || '확정된 위치가 없습니다.'}
                  </p>
                </div>
                <div className={styles.room_box_right}>
                  <AvatarGroup className={styles.participants_container} max={3}>
                    {meeting.userdata_room.map((participant, index) => (
                      <Avatar
                        className={styles.participant_profile}
                        src={`${participant.users?.profile_url}`}
                        showFallback
                        name="부엉"
                        isBordered={true}
                        key={index}
                      />
                    ))}
                  </AvatarGroup>
                  <p className={styles.participants_number}>{meeting.userdata_room.length}명 참여중</p>
                </div>
              </div>
            </Skeleton>
          </div>
        ))
      )}
    </div>
  );
};
