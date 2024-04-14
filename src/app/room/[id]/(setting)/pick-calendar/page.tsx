'use client';

import Calender from '@/components/room/meeting/calender/Calender';
import ResetSchedule from '@/components/room/meeting/calender/ResetSchedule';
import { useCalendarStore } from '@/store/calendarStore';
import checkSelectedDates from '@/utils/calendar/checkSelectedDates';
import { Button, Link } from '@nextui-org/react';
import { useParams } from 'next/navigation';

const PickCalendar = () => {
  const { id } = useParams();
  const selectedDates = useCalendarStore((state) => state.selectedDates);

  return (
    <>
      <ResetSchedule />
      <Calender />
      <Button href={`/room/${id}/pick-place`} size="sm" disabled={!checkSelectedDates(selectedDates)} as={Link}>
        다음
      </Button>
    </>
  );
};

export default PickCalendar;
