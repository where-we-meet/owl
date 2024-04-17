import { getUserSchedule } from '@/api/supabaseCSR/supabase';
import { useQuery } from '@tanstack/react-query';

export const useGetSchedule = (userId: string, roomId: string) => {
  const { data = [] } = useQuery({
    queryKey: ['getUserSchedules', roomId],
    queryFn: () => getUserSchedule(roomId),
    enabled: !!roomId
  });
  const myData = data.filter((user) => user.created_by === userId);
  const anotherUserData = data.filter((user) => user.created_by !== userId);

  return { data, myData, anotherUserData };
};
