'use client';

import { useQuery } from '@tanstack/react-query';
import { useQueryUser } from './useQueryUser';
import { sortMeetingInfo } from '@/utils/profile/sortMeetingInfo';
import { fetchMeetingInfo } from '@/api/room';

export const useQueryMyRooms = () => {
  const { id: userId } = useQueryUser();

  const { data = [], isPending } = useQuery({ queryKey: ['myRooms', userId], queryFn: () => fetchMeetingInfo(userId) });
  const myRooms = sortMeetingInfo(data);

  return { myRooms, isPending };
};
