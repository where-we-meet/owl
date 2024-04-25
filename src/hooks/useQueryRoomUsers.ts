import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getRoomUsersData, getRoomUsersProfile } from '@/api/supabaseCSR/supabase';
import { mergeRoomUsersById } from '@/utils/mergeRoomUsersById';
import { useQueryUser } from './useQueryUser';

export const useQueryRoomUsers = () => {
  const { id: roomId }: { id: string } = useParams();
  const { id: userId } = useQueryUser();

  const { data = [], isPending } = useQuery({
    queryKey: ['room-users', roomId],
    queryFn: () => getRoomUsersData(roomId)
  });

  const userIds = data.map((user) => user.user_id);

  const { data: userProfiles = [] } = useQuery({
    queryKey: ['room-users-profile', roomId],
    queryFn: () => getRoomUsersProfile(userIds),
    enabled: userIds.length > 0
  });

  const userList = mergeRoomUsersById(data, userProfiles);

  const adminUser = userList.filter((user) => user.is_admin);
  const currentUser = userList.filter((user) => !user.is_admin && user.user_id === userId);
  const otherUsers = userList.filter((user) => !user.is_admin && user.user_id !== userId);
  const roomUsers = [...adminUser, ...currentUser, ...otherUsers];

  return { roomUsers, currentUser, isPending };
};
