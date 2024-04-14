import { getUserSchedule } from '@/api/supabaseCSR/supabase';
import { Tables } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

type UserSchedule = Tables<'room_schedule'>;

export const useGetCalendar = (roomId: string) => {
  const [userSchedules, setUserSchedules] = useState<UserSchedule[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const dateOfUser = async () => {
      if (roomId) {
        const data = await getUserSchedule(roomId);
        setUserSchedules(data);
      }
    };
    dateOfUser();
  }, [roomId]);

  useEffect(() => {
    const subscription = supabase
      .channel('schedule')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'room_schedule', filter: `room_id=eq.${roomId}` },
        (payload) => {
          const updatedSchedule = payload.new as UserSchedule;
          setUserSchedules((prev) => [...prev, updatedSchedule]);
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'room_schedule', filter: `room_id=eq.${roomId}` },
        async (payload) => {
          const data = await getUserSchedule(roomId);
          setUserSchedules(data);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [roomId, userSchedules]);

  return { userSchedules };
};
