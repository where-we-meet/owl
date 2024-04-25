'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { subMonths, addMonths, isSameDay, isWithinInterval } from 'date-fns';
import { useQueryUser } from '@/hooks/useQueryUser';
import ResetSchedule from './ResetSchedule/ResetSchedule';
import EntireOfMonth from './EntireOfMonth';
import styles from './Calender.module.css';

import { useSubscribeCalendar } from '@/hooks/useSubscribeCalendar';
import { useMutateSchedule } from '@/hooks/useMutateSchedule';

import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';
import { Button } from '@nextui-org/react';
import { useQueryRoomUsers } from '@/hooks/useQueryRoomUsers';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Calender = () => {
  const { id: userId }: { id: string } = useQueryUser();
  const { id: roomId }: { id: string } = useParams();

  const { roomUsers, isPending } = useQueryRoomUsers();
  const participantNumber = roomUsers.length;

  const [nowDate, setNowDate] = useState<Date>(new Date());
  const { userSchedules, mySchedules, scheduleRange } = useSubscribeCalendar(roomId, userId);
  const { insertSchedule, deleteSchedule } = useMutateSchedule(roomId);
  const selectedDates = mySchedules.map((schedule) => new Date(schedule.start_date as string));

  useEffect(() => {
    if (scheduleRange?.start_date) {
      setNowDate(new Date(scheduleRange.start_date));
    }
  }, [scheduleRange?.start_date]);

  const prevMonth = () => {
    setNowDate((prev) => subMonths(prev, 1));
  };

  const afterMonth = () => {
    setNowDate((prev) => addMonths(prev, 1));
  };

  const checkInRange = (date: Date): boolean => {
    if (!scheduleRange?.start_date || !scheduleRange?.end_date) return true;

    const startDate = new Date(scheduleRange.start_date);
    const endDate = new Date(scheduleRange.end_date);

    if (!isWithinInterval(date, { start: startDate.setDate(startDate.getDate() - 1), end: endDate })) {
      return false;
    } else {
      return true;
    }
  };

  const handleDateClick = async (date: Date) => {
    if (!checkInRange(date)) return;

    const isAlreadySelected = selectedDates.some((selected) => isSameDay(selected, date));

    if (isAlreadySelected) {
      deleteSchedule.mutate({ roomId, userId, date });
      return;
    }

    insertSchedule.mutate({ roomId, userId, date });
  };
  const getMonth = () => {
    const month = nowDate.getMonth() + 1 + '';
    return month.length < 2 ? '0' + month : month;
  };
  return (
    <>
      <div className={styles.calendar_container}>
        <div className={styles.calendar_header}>
          <span className={styles.calendar_month_container}>
            <Button isIconOnly onPress={prevMonth} className={styles.calendar_month_controller}>
              <IoChevronBackSharp />
            </Button>
            <span className={styles.calendar_month}>{`${nowDate.getFullYear()}-${getMonth()}`}</span>
            <Button isIconOnly onPress={afterMonth} className={styles.calendar_month_controller}>
              <IoChevronForwardSharp />
            </Button>
          </span>
          <ResetSchedule />
        </div>
        <div className={styles.calendar_body}>
          <ul className={styles.weekday_container}>
            {WEEKDAYS.map((weekday, idx) => (
              <li key={idx} className={styles.weekday}>
                {weekday}
              </li>
            ))}
          </ul>
          <div className={styles.dates}>
            <EntireOfMonth
              nowDate={nowDate}
              selectedDate={selectedDates}
              userSchedules={userSchedules}
              handleDateClick={handleDateClick}
              checkInRange={checkInRange}
              participantNumber={participantNumber}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Calender;
