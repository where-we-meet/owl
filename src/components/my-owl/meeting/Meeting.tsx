'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getUserMeetingsId, getMyParticipatingRoomsData } from '@/api/supabaseCSR/supabase';
import { getUserId } from '@/utils/my-owl/getUserId';
import { sortMeetingInfo } from '@/utils/my-owl/meeting/sortMeetingInfo';

import styles from './Meeting.module.css';

export type UserInfo = {
  user_id: string;
  users: {
    profile_url: string | null;
  } | null;
};

export type MeetingInfo = {
  id: string;
  name: string | null;
  confirmed_date: string | null;
  created_at: string;
  location: string | null;
  verified: boolean | null;
  userdata_room: UserInfo[];
};

export const Meeting = () => {
  const [meetingInfo, setMeetingInfo] = useState<MeetingInfo[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMeetingInfo = async () => {
      const userId = await getUserId();
      const roomData = await getUserMeetingsId(userId);
      const roomIds = roomData.map((item) => item.room_id);
      const fetchedData = await getMyParticipatingRoomsData(roomIds);
      const sortedData = sortMeetingInfo(fetchedData);
      setMeetingInfo(sortedData);
    };

    fetchMeetingInfo();

  }, []);

  const handleClickRoom = (roomId: string | null) => {
    router.push(`/room/${roomId}`);
  };
  
  return (
    <div className={styles.meeting_container}>
      {meetingInfo.map((meeting, index) => (
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
