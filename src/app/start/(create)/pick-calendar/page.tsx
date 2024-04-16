'use client';

import Calender from '@/components/room/meeting/calender/Calender';
import { useCalendarStore } from '@/store/calendarStore';
import checkSelectedDates from '@/utils/calendar/checkSelectedDates';
import { Button, Link } from '@nextui-org/react';
import { useCreateRoomStore } from '@/store/createRoomStore';
import styles from './page.module.css';

const PickCalendar = () => {
  const selectedDates = useCalendarStore((state) => state.selectedDates);
  const { startDate, endDate } = useCreateRoomStore();

  return (
    <>
      <Calender range={{ start_date: startDate, end_date: endDate }} schedules={[]} />
      <div className={styles.footer}>
        <Button href={`/start/pick-place`} disabled={!checkSelectedDates(selectedDates)} as={Link}>
          다음
        </Button>
      </div>
    </>
  );
};

export default PickCalendar;
