import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useQueryUser } from './useQueryUser';
import { getRoomUsersData } from '@/api/room';

export const useQueryRoomUsers = () => {
  const { id: roomId }: { id: string } = useParams();
  const { id: userId } = useQueryUser();

  const { data: userList = [], isPending } = useQuery({
    queryKey: ['room-users', roomId],
    queryFn: () => getRoomUsersData(roomId)
  });

  const currentUser = userList.filter((user) => user.user_id === userId);
  const adminUser = userList.filter((user) => user.user_id !== userId && user.is_admin);
  const otherUsers = userList.filter((user) => !user.is_admin && user.user_id !== userId);
  const roomUsers =
    currentUser[0]?.user_id === adminUser[0]?.user_id
      ? [...currentUser, ...otherUsers]
      : [...adminUser, ...currentUser, ...otherUsers];

  return { roomUsers, currentUser, isPending };
};
