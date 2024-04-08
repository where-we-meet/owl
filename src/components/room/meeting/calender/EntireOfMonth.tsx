import React from 'react';
import { format, isSameDay } from 'date-fns';
import calculateOfMonth from '@/utils/calendar/calculateOfMonth';
import styles from './Calender.module.css';

interface Props {
  nowDate: Date;
  handleDateClick: (date: Date) => void;
  dayStyle: (day: Date) => React.CSSProperties;
  selectedDate: Date[];
}

const EntireOfMonth: React.FC<Props> = ({ nowDate, handleDateClick, dayStyle, selectedDate }) => {
  const entireOfMonth = calculateOfMonth(nowDate);
  return (
    <div className={styles.dates}>
      {entireOfMonth.map((week, index) => (
        <ul key={index} className={styles.day_container}>
          {week.map((day) => (
            <li
              key={day.toISOString()}
              onClick={() => handleDateClick(day)}
              className={styles.days}
              style={dayStyle(day)}
            >
              {selectedDate.some((date) => isSameDay(date, day)) && (
                <span className={styles.selected_date_circle}></span>
              )}
              {day.getDate()}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default EntireOfMonth;
