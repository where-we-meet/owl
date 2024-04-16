'use client';

import React, { useState } from 'react';
import { format, subMonths, addMonths, isSameDay, isWithinInterval } from 'date-fns';
import EntireOfMonth, { UserSchedule } from './EntireOfMonth';
import { useCalendarStore } from '@/store/calendarStore';
import ResetSchedule from './ResetSchedule';
import styles from './Calender.module.css';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

const Calender = ({
  range,
  schedules
}: {
  range: { start_date: string | null; end_date: string | null };
  schedules: UserSchedule[];
}) => {
  const [nowDate, setNowDate] = useState<Date>(new Date());
  const { selectedDates, setSelectedDates } = useCalendarStore();

  const prevMonth = () => {
    setNowDate(subMonths(nowDate, 1));
  };

  const afterMonth = () => {
    setNowDate((prev) => {
      return addMonths(prev, 1);
    });
  };

  const handleDateClick = (date: Date) => {
    if (!range.start_date || !range.end_date) return;

    const startDate = new Date(range.start_date);
    const endDate = new Date(range.end_date);

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
    if (!range.start_date || !range?.end_date) return {};

    const startDate = new Date(range.start_date);
    const endDate = new Date(range.end_date);

    if (!isWithinInterval(date, { start: startDate.setDate(startDate.getDate() - 1), end: endDate })) {
      return { color: '#ccc' };
    } else {
      return {};
    }
  };

  if (!range.start_date || !range.end_date) return <>로딩중</>;

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
              userSchedules={schedules}
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
