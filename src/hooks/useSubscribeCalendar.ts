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
      .channel(`schedule-${roomId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'room_schedule', filter: `room_id=eq.${roomId}` },
        (_payload) => {
          queryClient.invalidateQueries({ queryKey: ['room-user-schedules', roomId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [roomId]);

  return { userSchedules, mySchedules, scheduleRange };
};
