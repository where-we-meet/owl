'use client';

import { getMyParticipatingRoomsData, getUserMeetingsId } from '@/api/supabaseCSR/supabase';
import { sortMeetingInfo } from '@/utils/my-owl/meeting/sortMeetingInfo';
import { useEffect, useState } from 'react';
import { useQueryUser } from './useQueryUser';

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

export const useGetModalData = () => {
  const { id: userId } = useQueryUser();
  const [meetingInfo, setMeetingInfo] = useState<MeetingInfo[]>([]);

  useEffect(() => {
    const fetchMeetingInfo = async () => {
      const roomData = await getUserMeetingsId(userId);
      const roomIds = roomData.map((item) => item.room_id);
      const fetchedData = await getMyParticipatingRoomsData(roomIds);
      const sortedData = sortMeetingInfo(fetchedData);

      setMeetingInfo(sortedData);
    };

    fetchMeetingInfo();
  }, []);

  return meetingInfo;
};
