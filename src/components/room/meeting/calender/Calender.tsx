'use client';

import { useState } from 'react';
import { format, subMonths, addMonths, isSameDay } from 'date-fns';

import styles from './Calender.module.css';
import EntireOfMonth from './EntireOfMonth';
import SchedulesOfUsers from './SchedulesOfIUsers';
import { createClient } from '@/utils/supabase/client';
import { getCurrentUserData } from '@/api/supabaseCSR/supabase';

import { useGetCalendar } from '@/hooks/useGetCalendar';
import calculateOfMonth from '@/utils/calendar/calculateOfMonth';
import checkSelectedDates from '@/utils/calendar/checkSelectedDates';
import dayColors from '@/utils/calendar/dayColors';
import { Tables } from '@/types/supabase';

export type UserSchedule = Omit<Tables<'room_schedule'>, 'id' | 'created_at'>;
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

const Calender = ({ id, changeTab }: { id: string; changeTab: (name: string) => void }) => {
  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date[]>([]);

  const { userSchedules } = useGetCalendar(id);

  const entireOfMonth = calculateOfMonth(nowDate);
  const isDatesSelected = checkSelectedDates(selectedDate);

  const prevMonth = () => {
    setNowDate(subMonths(nowDate, 1));
  };

  const afterMonth = () => {
    setNowDate(addMonths(nowDate, 1));
  };

  const dayStyle = (day: Date) => {
    return { color: dayColors(nowDate, day) };
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
    if (!checkSelectedDates(selectedDate)) {
      return;
    }

    const currentUserData = getCurrentUserData();

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
          {WEEKDAYS.map((weekday) => {
            return (
              <li key={weekday} className={styles.weekday}>
                {weekday}
              </li>
            );
          })}
        </ul>

        <div className={styles.dates}>
          {entireOfMonth.map((week, index) => {
            return (
              <ul key={index} className={styles.day_container}>
                {week.map((day) => (
                  <li
                    key={day.toISOString()}
                    onClick={() => handleDateClick(day)}
                    className={styles.days}
                    style={{ ...dayStyle(day) }}
                  >
                    {selectedDate.some((date) => isSameDay(date, day)) && (
                      <span className={styles.selected_date_circle}></span>
                    )}

                    {userSchedules.map((schedule, index) => {
                      const styleOfCircles: React.CSSProperties = {
                        position: 'absolute',
                        transform: `translateX(${index * 1.8}px)`,
                        backgroundColor: `hsl(140, 50, ${0.5 + index * 0.08}%)`
                      };

                      return (
                        isSameDay(new Date(String(schedule.start_date)), day) && (
                          <span
                            key={index}
                            className={styles.selected_date_circle}
                            style={{ ...styleOfCircles }}
                          ></span>
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
