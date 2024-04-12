'use client';

import React, { useState } from 'react';
import { format, subMonths, addMonths, isSameDay } from 'date-fns';

import styles from './Calender.module.css';
import EntireOfMonth from './EntireOfMonth';
import checkSelectedDates from './checkSelectedDates';

import { useCalendarStore } from '@/store/calendarStore';
import { useGetCalendar } from '@/hooks/useGetCalendar';

// import { createClient } from '@/utils/supabase/client';
// import { getCurrentUserData } from '@/api/supabaseCSR/supabase';
import { useParams } from 'next/navigation';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

const Calender = () => {
  const { id }: { id: string } = useParams();

  const [nowDate, setNowDate] = useState<Date>(new Date());
  const { selectedDate, setSelectedDate } = useCalendarStore();

  const { userSchedules } = useGetCalendar(id);

  const prevMonth = () => {
    setNowDate(subMonths(nowDate, 1));
  };

  const afterMonth = () => {
    setNowDate((prev) => {
      return addMonths(prev, 1);
    });
  };

  const handleDateClick = (date: Date) => {
    const isAlreadySelected = selectedDate.some((selected) => isSameDay(selected, date));

    if (isAlreadySelected) {
      const filteredDate = selectedDate.filter((item) => !isSameDay(item, date));
      setSelectedDate(filteredDate);
    } else {
      const newDateList = [...selectedDate, date];
      setSelectedDate(newDateList);
    }
  };

  console.log(selectedDate);

  const handleDateUpload = (date: Date) => {
    if (!checkSelectedDates(selectedDate)) return;

    const newDateList = [...selectedDate, date];
    setSelectedDate(newDateList);
  };

  // const handleMoveToPlace = () => {
  //   return <Link href={`/room/${id}/pick-calendar`} />;
  // };

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

        <ul>
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
            selectedDate={selectedDate}
            userSchedules={userSchedules}
            handleDateClick={handleDateClick}
          />
        </div>
        <div>
          <Button
            size="sm"
            className={styles.next_button}
            onClick={() => handleDateUpload}
            disabled={!checkSelectedDates(selectedDate)}
          >
            <Link href={`/room/${id}/pick-place`}>다음</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Calender;
