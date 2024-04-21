'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { format, subMonths, addMonths, isSameDay, isWithinInterval } from 'date-fns';
import { useQueryUser } from '@/hooks/useQueryUser';
import ResetSchedule from './ResetSchedule';
import EntireOfMonth from './EntireOfMonth';
import styles from './Calender.module.css';

import { useSubscribeCalendar } from '@/hooks/useSubscribeCalendar';
import { useMutateSchedule } from '@/hooks/useMutateSchedule';

import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

const Calender = () => {
  const { id: userId }: { id: string } = useQueryUser();
  const { id: roomId }: { id: string } = useParams();

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

  return (
    <>
      <div className={styles.calendar_container}>
        <div className={styles.calendar_header}>
          <div>
            <button onClick={prevMonth}>
              <IoChevronBackSharp />
            </button>
            <span>
              {format(nowDate, 'yyyy')}년 {format(nowDate, 'M')}월
            </span>
            <button onClick={afterMonth}>
              <IoChevronForwardSharp />
            </button>
          </div>
          <ResetSchedule />
        </div>

        <div className={styles.scehdule_container}>
          <ul className={styles.weekday_container}>
            {WEEKDAYS.map((weekday) => {
              return (
                <li key={weekday} className={styles.weekday}>
                  {weekday}
                </li>
              );
            })}
          </ul>

          <div className={styles.dates}>
            <EntireOfMonth
              nowDate={nowDate}
              selectedDate={selectedDates}
              userSchedules={userSchedules}
              handleDateClick={handleDateClick}
              checkInRange={checkInRange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Calender;
