'use client';

import {  useState } from 'react';
import { format, isToday, isSunday, isSaturday, subMonths, addMonths, isSameDay } from 'date-fns';

import styles from './Calender.module.css';
import { createClient } from '@/utils/supabase/client';
import {  getCurrentUserData } from '@/api/supabaseCSR/supabase';
import { Tables } from '@/types/supabase';

import calculateOfMonth from './calculateOfMonth';
import checkSelectedDates from './checkSelectedDates';
import { useGetCalendar } from '@/hooks/useGetCalendar';

export type UserSchedule = Omit<Tables<'room_schedule'>, 'id' | 'created_at'>;

  const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];


const Calender = ({ id, changeTab }: { id: string; changeTab: (name: string) => void }) => {
  const currentUserData = getCurrentUserData();

  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date[]>([]);

  const { userSchedules } = useGetCalendar(id)

  const entireOfMonth = calculateOfMonth(nowDate);
  const isDatesSelected = checkSelectedDates(selectedDate);

  const prevMonth = () => {
    setNowDate(subMonths(nowDate, 1));
  };

  const afterMonth = () => {
    setNowDate(addMonths(nowDate, 1));
  };

  const dayStyle = (day: Date) => {
    const color =
      format(nowDate, 'M') !== format(day, 'M')
        ? '#ddd'
        : isSunday(day)
        ? 'red'
        : isSaturday(day)
        ? 'blue'
        : isToday(day)
        ? 'pink'
        : '#000';
    return { color };
  };

  const handleJump = () => {
    changeTab('장소');
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
    if (selectedDate.length === 0) {
      return;
    }

    const supabase = createClient();
    const roomId: string = id.toString();

    for (const date of selectedDate) {
      const { error } = await supabase
        .from('room_schedule')
        .insert([
          {
            room_id: roomId,
            created_by: (await currentUserData).user.id,
            start_date: date.toDateString(),
            end_date: date.toDateString()
          }
        ])
        .select();
      if (error) throw error;
    }
    changeTab('장소');
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
          {WEEKDAY.map((weekdays) => {
            return (
              <li key={weekdays} className={styles.weekdays}>
                {weekdays}
              </li>
            );
          })}
        </ul>

        <div className={styles.dates}>
          {entireOfMonth.map((week, index) => {
            return (
              <ul className={styles.day_container} key={index}>
                {week.map((day) => (
                  <li
                    onClick={() => handleDateClick(day)}
                    className={styles.days}
                    key={day.toISOString()}
                    style={{ ...dayStyle(day) }}
                  >
                    {selectedDate.some((date) => isSameDay(date, day)) && (
                      <span className={styles.selected_date_circle}></span>
                    )}

                    {userSchedules.map((schedule, index) => {
                      return (
                        isSameDay(new Date(String(schedule.start_date)), day) && (
                          <span key={index} className={styles.selected_date_circle}></span>
                        )
                      );
                    })}
                    {day.getDate()}
                  </li>
                ))}
              </ul>
            );
          })}
        </div>
        <button onClick={handleJump}>건너뛰기</button>
        <button onClick={handleDateUpload} disabled={!isDatesSelected}>
          다음
        </button>
      </div>
    </>
  );
};

export default Calender;
