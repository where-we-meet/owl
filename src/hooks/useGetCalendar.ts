import { getUserSchedule } from '@/api/supabaseCSR/supabase';
import { Tables } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

type UserSchedule = Tables<'room_schedule'>;

export const useGetCalendar = (id: string | null) => {
  const [userSchedules, setUserSchedules] = useState<UserSchedule[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const dateOfUser = async () => {
      if (id) {
        const data = await getUserSchedule(id);
        setUserSchedules(data);
      }
    };
    dateOfUser();
  }, [id]);

  useEffect(() => {
    const subscription = supabase
      .channel('room')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'room_schedule', filter: `room_id=eq.${id}` },
        (payload) => {
          const updatedSchedule = payload.new as UserSchedule;
          setUserSchedules((currentSchedules) =>
            currentSchedules.map((schedule) =>
              schedule.id === updatedSchedule.id ? { ...schedule, start_date: updatedSchedule.start_date } : schedule
            )
          );
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [id, userSchedules]);

  return { userSchedules };
};
