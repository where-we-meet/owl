'use client';

import { useRouter } from 'next/navigation';
import { BsCalendarDateFill } from 'react-icons/bs';
import { FaMapLocationDot } from 'react-icons/fa6';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { UserInfo, useQueryMyRooms } from '@/hooks/useQueryMyRooms';
import { Avatar, AvatarGroup } from '@nextui-org/react';
import styles from './Meeting.module.css';

export const Meeting = () => {
  const router = useRouter();
  const { myRooms, isPending } = useQueryMyRooms();

  const handleClickRoom = (roomId: string | null) => {
    router.push(`/room/${roomId}`);
  };

  if (isPending) return <>로딩중</>;

  return (
    <div className={styles.rooms_box}>
      {myRooms.length === 0 ? (
        <p>현재 참여중인 모임이 없습니다.</p>
      ) : (
        myRooms.map((meeting, index) => (
          <div key={index} onClick={() => handleClickRoom(meeting.id)}>
            <div className={styles.room_box}>
              <div className={styles.room_box_left}>
                <div className={styles.meeting_main_info}>
                  <h3 className={styles.meeting_name}>{meeting.name}</h3>
                  {meeting.verified ? <RiVerifiedBadgeFill className={styles.verified_icon} /> : null}
                </div>
                <p className={meeting.confirmed_date === null ? styles.undecided_meeting_date : styles.meeting_date}>
                  <BsCalendarDateFill /> {meeting.confirmed_date || '확정된 날짜가 없습니다.'}
                </p>
                <p className={meeting.location === null ? styles.undecided_meeting_location : styles.meeting_location}>
                  <FaMapLocationDot /> {meeting.location || '확정된 위치가 없습니다.'}
                </p>
              </div>
              <div className={styles.room_box_right}>
                <AvatarGroup className={styles.participants_container} max={3}>
                  {(meeting.userdata_room as UserInfo[]).map((participant, index) => (
                    <Avatar
                      key={index}
                      className={styles.participant_profile}
                      src={`${participant.users?.profile_url}`}
                      showFallback
                      name="부엉"
                      isBordered={true}
                    />
                  ))}
                </AvatarGroup>
                <p className={styles.participants_number}>{meeting.userdata_room.length}명 참여중</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
