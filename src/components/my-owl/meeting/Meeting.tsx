'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserId } from '@/utils/my-owl/getUserId';
import { getRoomData, getUsersData, getRoomParticipantsId, getUserMeetingsId } from '@/api/supabase';
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
      const meetingIds = await getUserMeetingsId(userId);
      const meetingInfoPromises = meetingIds.map(async (meetingId: { room_id: string }) => {
        const roomId = meetingId.room_id;
        const roomInfo = await getRoomData(roomId);
        const participantsIds = await getRoomParticipantsId(roomId);
        const participantsInfoPromises = participantsIds.map(async (participantId: { user_id: string }) => {
          const userInfo = await getUsersData(participantId.user_id);
          return userInfo[0];
        });
        const participantsInfo = await Promise.all(participantsInfoPromises);
        return {
          id: roomId,
          name: roomInfo[0].name,
          location: roomInfo[0].location,
          participants: participantsInfo,
          created_at: roomInfo[0].created_at,
          verified: roomInfo[0].verified
        };
      });
      const fetchedMeetingInfo = await Promise.all(meetingInfoPromises);

      const sortedMeetingInfo = sortMeetingInfo(fetchedMeetingInfo as MeetingInfo[]);
      setMeetingInfo(sortedMeetingInfo);
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
