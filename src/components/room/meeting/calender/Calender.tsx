'use client';

import React, { useState } from 'react';
import { format, subMonths, addMonths, isSameDay, isWithinInterval } from 'date-fns';

import styles from './Calender.module.css';
import EntireOfMonth from './EntireOfMonth';

import { useCalendarStore } from '@/store/calendarStore';
import { useGetCalendar } from '@/hooks/useGetCalendar';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getRangeOfSchedule } from '@/api/supabaseCSR/supabase';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

const Calender = () => {
  const { id }: { id: string } = useParams();

  const [nowDate, setNowDate] = useState<Date>(new Date());
  const { selectedDates, setSelectedDates } = useCalendarStore();

  const { userSchedules } = useGetCalendar(id);

  const { data } = useQuery({
    queryKey: ['range', id],
    queryFn: () => getRangeOfSchedule(id),
    select: (data) => data[0]
  });

  const prevMonth = () => {
    setNowDate(subMonths(nowDate, 1));
  };

  const afterMonth = () => {
    setNowDate((prev) => {
      return addMonths(prev, 1);
    });
  };

  const handleDateClick = (date: Date) => {
    const isAlreadySelected = selectedDates.some((selected) => isSameDay(selected, date));

    if (!data?.start_date || !data?.end_date) return;
    const startDate = new Date(data.start_date);
    const endDate = new Date(data.end_date);
    if (!isWithinInterval(date, { start: startDate.setDate(startDate.getDate() - 1), end: endDate })) {
      return;
    }

    if (isAlreadySelected) {
      const filteredDate = selectedDates.filter((item) => !isSameDay(item, date));
      setSelectedDates(filteredDate);
    } else {
      const newDateList = [...selectedDates, date];
      setSelectedDates(newDateList);
    }
  };

  return (
    <>
      <div className={styles.calendar_container}>
        <div>
          <button onClick={prevMonth}>◀</button>
          <span>
            {format(nowDate, 'yyyy')}년 {format(nowDate, 'M')}월
          </span>
          <button onClick={afterMonth}>▶</button>
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
              id={id}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Calender;
