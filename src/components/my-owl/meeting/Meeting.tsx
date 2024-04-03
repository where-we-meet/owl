'use client';
import { createClient } from '@/utils/supabase/client';
import styles from './Meeting.module.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface UserInfo {
  name: string;
  profile_url: string;
}

interface MeetingInfo {
  name: string | null;
  location: string | null;
  participants: UserInfo[];
}

export const Meeting = () => {
  const [meetingInfo, setMeetingInfo] = useState<MeetingInfo[]>([]);

  useEffect(() => {
    const fetchMeetingInfo = async () => {
      const meetingIds = await getUserMeetingsId();
      const meetingInfoPromises = meetingIds.map(async (meetingId) => {
        const roomId = meetingId.room_id;
        const roomInfo = await getRoomInfo(roomId);
        const participantsIds = await getRoomParticipantsId(roomId);
        const participantsInfoPromises = participantsIds.map(async (participantId) => {
          const userInfo = await getUserInfo(participantId.user_id);
          return userInfo[0];
        });
        const participantsInfo = await Promise.all(participantsInfoPromises);
        return {
          name: roomInfo[0].name,
          location: roomInfo[0].location,
          participants: participantsInfo
        };
      });
      const fetchedMeetingInfo = await Promise.all(meetingInfoPromises);
      setMeetingInfo(fetchedMeetingInfo.filter((meeting) => meeting !== null) as MeetingInfo[]);
    };

    fetchMeetingInfo();
  }, []);

  return (
    <div className={styles.meeting_container}>
      {meetingInfo.map((meeting, index) => (
        <div key={index} className={styles.rooms_box}>
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

const supabase = createClient();

const getUserId = async () => {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();
  if (error) throw error;
  return user !== null ? user.id : null;
};

const getUserMeetingsId = async () => {
  const userId = await getUserId();
  if (userId !== null) {
    const { data, error } = await supabase.from('userdata_room').select('room_id').eq('user_id', userId);
    if (error) throw error;
    return data;
  }
  return [];
};

const getRoomInfo = async (roomId: string) => {
  const { data, error } = await supabase.from('rooms').select('name, location').eq('id', roomId);
  if (error) throw error;
  return data;
};

const getRoomParticipantsId = async (roomId: string) => {
  const { data, error } = await supabase.from('userdata_room').select('user_id').eq('room_id', roomId);
  if (error) throw error;
  return data;
};

const getUserInfo = async (userId: string) => {
  const { data, error } = await supabase.from('users').select('name, profile_url').eq('id', userId);
  if (error) throw error;
  return data;
};
