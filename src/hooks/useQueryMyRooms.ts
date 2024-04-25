'use client';

import { getMyRoomsData, getUserMeetingsId } from '@/api/supabaseCSR/supabase';
import { useQueryUser } from './useQueryUser';
import { useQuery } from '@tanstack/react-query';
import { sortMeetingInfo } from '@/utils/profile/sortMeetingInfo';

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

export const useQueryMyRooms = () => {
  const { id: userId } = useQueryUser();

  const fetchMeetingInfo = async () => {
    const roomData = await getUserMeetingsId(userId);
    const roomIds = roomData.map((item) => item.room_id);
    return await getMyRoomsData(roomIds);
  };

  const { data = [], isPending } = useQuery({ queryKey: ['myRooms', userId], queryFn: fetchMeetingInfo });
  const myRooms = sortMeetingInfo(data);

  return { myRooms, isPending };
};
