'use client';

import { getMyParticipatingRoomsData, getUserMeetingsId } from '@/api/supabaseCSR/supabase';
import { getUserId } from '@/utils/my-owl/getUserId';
import { sortMeetingInfo } from '@/utils/my-owl/meeting/sortMeetingInfo';
import { useEffect, useState } from 'react';

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

export const useGetSidebarData = () => {
const [meetingInfo, setMeetingInfo] = useState<MeetingInfo[]>([]);

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

  return meetingInfo
};
