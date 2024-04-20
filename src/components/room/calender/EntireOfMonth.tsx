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
  checkInRange: (date: Date) => boolean;
};

const EntireOfMonth: React.FC<Props> = ({ nowDate, selectedDate, userSchedules, handleDateClick, checkInRange }) => {
  const entireOfMonth = calculateOfMonth(nowDate);

  return (
    <div className={styles.dates}>
      {entireOfMonth.map((week, index) => (
        <ul key={index} className={styles.day_container}>
          {week.map((day) => (
            <li
              key={day.toISOString()}
              className={`${styles.days}  ${!checkInRange(day) ? styles.disabled : ''}`}
              onClick={() => handleDateClick(day)}
            >
              {selectedDate.some((date) => isSameDay(date, day)) && (
                <span className={styles.selected_date_circle}></span>
              )}
              <SchedulesOfUsers userSchedules={userSchedules} day={day} />
              <span className={`${styles[dayColors(nowDate, day)]}`}>{day.getDate()}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default EntireOfMonth;
