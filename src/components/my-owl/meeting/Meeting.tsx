'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  getRoomData,
  getUsersData,
  getRoomParticipantsId,
  getUserMeetingsId,
  getMyParticipatingRoomsData
} from '@/api/supabaseCSR/supabase';
import { getUserId } from '@/utils/my-owl/getUserId';
import { sortMeetingInfo } from '@/utils/my-owl/meeting/sortMeetingInfo';

import styles from './Meeting.module.css';

export interface UserInfo {
  name: string;
  profile_url: string;
}

export interface MeetingInfo {
  id: string | null;
  name: string | null;
  location: string | null;
  participants: UserInfo[];
  created_at: string | null;
  verified: boolean;
}

export const Meeting = () => {
  const [meetingInfo, setMeetingInfo] = useState<MeetingInfo[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMeetingInfo = async () => {
      const userId = await getUserId();
      const roomData = await getUserMeetingsId(userId);
      const roomIds = roomData.map((item) => item.room_id);
      const fetchedData = await getMyParticipatingRoomsData(roomIds);
      console.log('데이터의 상태', fetchedData);

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
              <p>날짜</p>
              <p>위치 : {meeting.location}</p>
            </div>
            <div className={styles.room_box_right}>
              <div className={styles.participants_container}>
                {meeting.participants.map((participant, index) => (
                  <div
                    className={styles.participant_profile}
                    style={{ backgroundImage: `url(${participant.profile_url})` }}
                    key={index}
                  />
                ))}
              </div>
              <p>{meeting.participants.length}명 참여중</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
