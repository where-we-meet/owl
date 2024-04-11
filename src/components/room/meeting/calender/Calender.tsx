'use client';

import React, { useState } from 'react';
import { format, subMonths, addMonths, isSameDay } from 'date-fns';

import styles from './Calender.module.css';
import EntireOfMonth from './EntireOfMonth';
import checkSelectedDates from './checkSelectedDates';

import { useGetCalendar } from '@/hooks/useGetCalendar';
import { createClient } from '@/utils/supabase/client';
import { getCurrentUserData } from '@/api/supabaseCSR/supabase';
import { useParams } from 'next/navigation';
import { useGetRoomData } from '@/hooks/useGetRoomData';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

const Calender = () => {
  const { id }: { id: string } = useParams();
  const { userId } = useGetRoomData(id);

  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date[]>([]);

  const { userSchedules } = useGetCalendar(id);

  const prevMonth = () => {
    setNowDate(subMonths(nowDate, 1));
  };

  const afterMonth = () => {
    setNowDate(addMonths(nowDate, 1));
  };

  const handleDateClick = (date: Date) => {
    const isAlreadySelected = selectedDate.some((selected) => isSameDay(selected, date));

    if (isAlreadySelected) {
      setSelectedDate((prev) => prev.filter((selected) => !isSameDay(selected, date)));
    } else {
      setSelectedDate((prev) => [...prev, date]);
    }
  };

  const handleDateUpload = async () => {
    if (!checkSelectedDates(selectedDate)) return;

    const currentUserData = await getCurrentUserData();

    const selectedDates = selectedDate.map((date) => {
      return {
        room_id: id,
        created_by: currentUserData.user.id,
        start_date: date.toDateString(),
        end_date: date.toDateString()
      };
    });

    const supabase = createClient();
    const { error } = await supabase.from('room_schedule').insert(selectedDates);
    if (error) throw error;
  };

  return (
    <>
      <div>Calender</div>

      <div>
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
        <button onClick={handleDateUpload} disabled={!checkSelectedDates(selectedDate)}>
          다음
        </button>
      </div>
    </>
  );
};

export default Calender;
