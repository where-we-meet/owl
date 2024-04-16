import { getRoomUsersData } from '@/api/supabaseCSR/supabase';
import { useQuery } from '@tanstack/react-query';

export const useQueryRoomUsers = (roomId: string, userId: string) => {
  const { data = [], isPending } = useQuery({ queryKey: ['roomUsers'], queryFn: () => getRoomUsersData(roomId) });

  const adminUser = data.filter((user) => user.is_admin);
  const currentUser = data.filter((user) => !user.is_admin && user.user_id === userId);
  const otherUsers = data.filter((user) => !user.is_admin && user.user_id !== userId);
  const roomUsers = [...adminUser, ...currentUser, ...otherUsers];

  return { roomUsers, isPending };
};
