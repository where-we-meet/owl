'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { format, subMonths, addMonths, isSameDay, isWithinInterval } from 'date-fns';
import { getRangeOfSchedule } from '@/api/supabaseCSR/supabase';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useGetCalendar } from '@/hooks/useGetCalendar';
import { useGetSchedule } from '@/hooks/useGetSchedule';
import { useCalendarStore } from '@/store/calendarStore';
import ResetSchedule from './ResetSchedule';
import EntireOfMonth from './EntireOfMonth';
import styles from './Calender.module.css';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

const Calender = () => {
  const [nowDate, setNowDate] = useState<Date>(new Date());

  const { id: userId }: { id: string } = useQueryUser();
  const { id: roomId }: { id: string } = useParams();

  const { data: scheduleRange, isPending } = useQuery({
    queryKey: ['range', roomId],
    queryFn: () => getRangeOfSchedule(roomId),
    select: (data) => data[0]
  });

  const { userSchedules } = useGetCalendar(roomId);
  const { myData: mySchedule } = useGetSchedule(userId, roomId);

  const selectedDates = useCalendarStore((state) => state.selectedDates);
  const setSelectedDates = useCalendarStore((state) => state.setSelectedDates);

  useEffect(() => {
    if (scheduleRange?.start_date) {
      setNowDate(new Date(scheduleRange.start_date));
    }
  }, [scheduleRange?.start_date]);

  const prevMonth = () => {
    setNowDate(subMonths(nowDate, 1));
  };

  const afterMonth = () => {
    setNowDate((prev) => {
      return addMonths(prev, 1);
    });
  };

  const handleDateClick = (date: Date) => {
    if (!scheduleRange?.start_date || !scheduleRange?.end_date) return;

    const startDate = new Date(scheduleRange.start_date);
    const endDate = new Date(scheduleRange.end_date);

    if (!isWithinInterval(date, { start: startDate.setDate(startDate.getDate() - 1), end: endDate })) {
      return;
    }

    const isAlreadySelected = selectedDates.some((selected) => isSameDay(selected, date));

    if (isAlreadySelected) {
      const filteredDate = selectedDates.filter((item) => !isSameDay(item, date));
      setSelectedDates(filteredDate);
    } else {
      const newDateList = [...selectedDates, date];
      setSelectedDates(newDateList);
    }
  };

  const handleBlockSelect = (date: Date) => {
    if (!scheduleRange?.start_date || !scheduleRange?.end_date) return {};

    const startDate = new Date(scheduleRange.start_date);
    const endDate = new Date(scheduleRange.end_date);

    if (!isWithinInterval(date, { start: startDate.setDate(startDate.getDate() - 1), end: endDate })) {
      return { color: '#ccc' };
    } else {
      return {};
    }
  };
  useEffect(() => {
    if (mySchedule) {
      setSelectedDates(mySchedule.map((schedule) => new Date(String(schedule.start_date))));
    }
  }, [mySchedule.length]);

  if (isPending) return <>로딩중</>;

  return (
    <>
      <div className={styles.calendar_container}>
        <div className={styles.calendar_header}>
          <div>
            <button onClick={prevMonth}>◀</button>
            <span>
              {format(nowDate, 'yyyy')}년 {format(nowDate, 'M')}월
            </span>
            <button onClick={afterMonth}>▶</button>
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
              handleBlockSelect={handleBlockSelect}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Calender;
