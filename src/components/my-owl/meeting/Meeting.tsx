'use client';
import { createClient } from '@/utils/supabase/client';
import styles from './Meeting.module.css';
import { MouseEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserInfo {
  name: string;
  profile_url: string;
}

interface MeetingInfo {
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
      const meetingIds = await getUserMeetingsId();
      const meetingInfoPromises = meetingIds.map(async (meetingId: { room_id: string }) => {
        const roomId = meetingId.room_id;
        const roomInfo = await getRoomInfo(roomId);
        const participantsIds = await getRoomParticipantsId(roomId);
        const participantsInfoPromises = participantsIds.map(async (participantId: { user_id: string }) => {
          const userInfo = await getUserInfo(participantId.user_id);
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

  //meetingInfo를 시간순으로
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
              <p>방 생성일 : {meeting.created_at}</p>
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
  const { data, error } = await supabase.from('rooms').select('name, location, created_at, verified').eq('id', roomId);
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

const sortMeetingInfo = (meetingInfo: MeetingInfo[]): MeetingInfo[] => {
  return meetingInfo.sort((a, b) => {
    // 정렬 1순위 : verified가 true
    if (a.verified && !b.verified) return -1;
    if (!a.verified && b.verified) return 1;
    // 정렬 2순위 : created_at
    if (a.created_at && b.created_at) return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    return 0;
  });
};
