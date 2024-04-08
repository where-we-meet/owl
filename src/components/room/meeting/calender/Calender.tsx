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

export type UserSchedule = Omit<Tables<'room_schedule'>, 'created_at'>;
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

const Calender = ({ id, changeTab }: { id: string; changeTab: (name: string) => void }) => {
  const currentUserData = getCurrentUserData();

  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date[]>([]);

  const { userSchedules } = useGetCalendar(id);

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
          <EntireOfMonth
            nowDate={nowDate}
            handleDateClick={handleDateClick}
            selectedDate={selectedDate}
            dayStyle={dayStyle}
          />
          <SchedulesOfUsers userSchedules={userSchedules} day={nowDate} />
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
