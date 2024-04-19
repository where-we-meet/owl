import React from 'react';
import { isSameDay } from 'date-fns';

import calculateOfMonth from '@/utils/calendar/calculateOfMonth';
import SchedulesOfUsers from './SchedulesOfIUsers';

import styles from './Calender.module.css';
import dayColors from '@/utils/calendar/dayColors';

import type { Tables } from '@/types/supabase';

export type UserSchedule = Tables<'room_schedule'>;

type Props = {
  nowDate: Date;
  selectedDate: Date[];
  userSchedules: UserSchedule[];
  handleDateClick: (date: Date) => void;
  handleBlockSelect: (date: Date) => React.CSSProperties;
};

const EntireOfMonth: React.FC<Props> = ({
  nowDate,
  selectedDate,
  userSchedules,
  handleDateClick,
  handleBlockSelect
}) => {
  const entireOfMonth = calculateOfMonth(nowDate);

  const dayStyle = (day: Date) => {
    return { color: dayColors(nowDate, day) };
  };

  return (
    <div className={styles.dates}>
      {entireOfMonth.map((week, index) => (
        <ul key={index} className={styles.day_container}>
          {week.map((day) => (
            <li
              key={day.toISOString()}
              onClick={() => {
                handleDateClick(day);
              }}
              className={styles.days}
              style={(dayStyle(day), { ...handleBlockSelect(day) })}
            >
              {selectedDate.some((date) => isSameDay(date, day)) && (
                <span className={styles.selected_date_circle}></span>
              )}
              <SchedulesOfUsers userSchedules={userSchedules} day={day} />
              {day.getDate()}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default EntireOfMonth;
