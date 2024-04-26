import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getRoomUsersData } from '@/api/supabaseCSR/supabase';
import { useQueryUser } from './useQueryUser';

export const useQueryRoomUsers = () => {
  const { id: roomId }: { id: string } = useParams();
  const { id: userId } = useQueryUser();

  const { data: userList = [], isPending } = useQuery({
    queryKey: ['room-users', roomId],
    queryFn: () => getRoomUsersData(roomId)
  });

  const adminUser = userList.filter((user) => user.is_admin);
  const currentUser = userList.filter((user) => !user.is_admin && user.user_id === userId);
  const otherUsers = userList.filter((user) => !user.is_admin && user.user_id !== userId);
  const roomUsers = [...adminUser, ...currentUser, ...otherUsers];

  return { roomUsers, currentUser, isPending };
};
