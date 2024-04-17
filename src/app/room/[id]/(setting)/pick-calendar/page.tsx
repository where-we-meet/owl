'use client';

import Calender from '@/components/room/meeting/calender/Calender';
import { useCalendarStore } from '@/store/calendarStore';
import checkSelectedDates from '@/utils/calendar/checkSelectedDates';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getRangeOfSchedule } from '@/api/supabaseCSR/supabase';
import { useGetCalendar } from '@/hooks/useGetCalendar';
import { Button, Link } from '@nextui-org/react';
import styles from './page.module.css';
import { useGetSchedule } from '@/hooks/useGetSchedule';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useEffect } from 'react';

const PickCalendar = () => {
  const { id: userId }: { id: string } = useQueryUser();
  const { id: roomId }: { id: string } = useParams();
  const selectedDates = useCalendarStore((state) => state.selectedDates);
  const setSelectedDates = useCalendarStore((state) => state.setSelectedDates);

  const { userSchedules } = useGetCalendar(roomId);
  const { data: scheduleRange, isPending } = useQuery({
    queryKey: ['range', roomId],
    queryFn: () => getRangeOfSchedule(roomId),
    select: (data) => data[0]
  });

  const { myData: mySchedule } = useGetSchedule(userId, roomId);

  useEffect(() => {
    if (mySchedule) {
      setSelectedDates(mySchedule.map((schedule) => new Date(String(schedule.start_date))));
    }
  }, [mySchedule.length]);

  if (!scheduleRange || isPending) return <>로딩중</>;

  return (
    <>
      <Calender range={scheduleRange} schedules={userSchedules} />
      <div className={styles.footer}>
        <Button href={`/room/${roomId}/pick-place`} disabled={!checkSelectedDates(selectedDates)} as={Link}>
          다음
        </Button>
      </div>
    </>
  );
};

export default PickCalendar;
