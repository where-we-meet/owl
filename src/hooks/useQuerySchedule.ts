import { getRangeOfSchedule, getUserSchedule } from '@/api/supabaseCSR/supabase';
import { useQuery } from '@tanstack/react-query';

export const useQuerySchedule = ({ roomId, userId }: { roomId: string; userId: string }) => {
  const { data = [] } = useQuery({
    queryKey: ['room-user-schedules', roomId],
    queryFn: () => getUserSchedule(roomId),
    enabled: !!roomId
  });

  const { data: scheduleRange } = useQuery({
    queryKey: ['range', roomId],
    queryFn: () => getRangeOfSchedule(roomId),
    select: (data) => data[0]
  });

  const userSchedules = data.filter((schedule) => schedule.created_by !== userId);
  const mySchedules = data.filter((schedule) => schedule.created_by === userId);

  return { data, userSchedules, mySchedules, scheduleRange };
};
