import React from 'react';
import type { Tables } from '@/types/supabase';

import calculateOfMonth from '@/utils/calendar/calculateOfMonth';
import { Schedules } from './Schedules/Schedules';

import dayColors from '@/utils/calendar/dayColors';
import styles from './EntireOfMonth.module.css';

export type UserSchedule = Tables<'room_schedule'>;

type Props = {
  nowDate: Date;
  selectedDate: Date[];
  userSchedules: UserSchedule[];
  handleDateClick: (date: Date) => void;
  checkInRange: (date: Date) => boolean;
};

const EntireOfMonth: React.FC<Props> = ({ nowDate, selectedDate, userSchedules, handleDateClick, checkInRange }) => {
  //  entireOfMonth에는 달력에 표시되는 날짜들이 주 단위로 배열에 나뉘어 들어가있다.
  const entireOfMonth = calculateOfMonth(nowDate);
  return (
    <div className={styles.dates}>
      {entireOfMonth.map((week, index) => (
        //  주 단위로 UI를 그린다.
        <ul key={index} className={styles.day_container}>
          {week.map((day) => (
            <li
              key={day.toISOString()}
              className={`${styles.days}  ${!checkInRange(day) ? styles.disabled : ''}`}
              onClick={() => handleDateClick(day)}
            >
              <span className={`${styles[dayColors(nowDate, day)]}`}>{day.getDate()}</span>
              <Schedules userSchedules={userSchedules} selectedDate={selectedDate} day={day} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default EntireOfMonth;
