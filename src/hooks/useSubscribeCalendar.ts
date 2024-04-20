import { Tables } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useQuerySchedule } from './useQuerySchedule';

export type UserSchedule = Tables<'room_schedule'>;

export const useSubscribeCalendar = (roomId: string, userId: string) => {
  const supabase = createClient();
  const queryClient = useQueryClient();

  const { userSchedules, mySchedules, scheduleRange } = useQuerySchedule({ roomId, userId });

  useEffect(() => {
    const subscription = supabase
      .channel('schedule')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'room_schedule', filter: `room_id=eq.${roomId}` },
        (payload) => {
          const updatedSchedule = payload.new as UserSchedule;
          queryClient.setQueryData(['room-user-schedules', roomId], (prevData: UserSchedule[]) => {
            return [...prevData, updatedSchedule];
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'room_schedule', filter: `room_id=eq.${roomId}` },
        async (payload) => {
          const deletedScheduleId = payload.old.id;
          queryClient.setQueryData(['room-user-schedules', roomId], (prevData: UserSchedule[]) => {
            return prevData.filter((schedule) => schedule.id !== deletedScheduleId);
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [roomId]);

  return { userSchedules, mySchedules, scheduleRange };
};
