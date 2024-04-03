'use client';

import { useState } from 'react';
import styles from './Calender.module.css';

import {
  format,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  addDays,
  isToday,
  isSunday,
  isSaturday,
  subMonths,
  addMonths,
  isSameDay
} from 'date-fns';

const Calender = () => {
  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date[]>([]);
  const [selectedRange, setSelecteRange] = useState<Date[]>([]);

  const weekDay = ['일', '월', '화', '수', '목', '금', '토'];
  const monthStart = startOfMonth(nowDate);
  const monthEnd = endOfMonth(monthStart);
  const startDay = startOfWeek(monthStart);
  const endDay = endOfWeek(monthEnd);
  const entireOfMonth = [];

  let startWeek = startDay;
  let entireOfWeek = [];

  // const isDateInRange = selectedRange.length === 2 && date >= selectedRange[0] && date <= selectedRange[1];

  const handleDateClick = (date: Date) => {
    setSelectedDate((prev) => [...prev, date]);
  };

  const handleRangeSelect = (date: Date) => {
    if (selectedRange.length === 0 || selectedRange.length === 2) {
      setSelecteRange([date]);
    } else if (selectedRange.length === 1) {
      setSelecteRange((prev) => [...prev, date]);
      //  setSelectedDate([]);
    }
  };

  const isInRange = (date: Date) => {
    if (selectedRange.length === 2) {
      const [start, end] = selectedRange;
      return date >= start && date <= end;
    }
    return false;
  };

  while (startWeek <= endDay) {
    for (let i = 0; i < 7; i++) {
      entireOfWeek.push(startWeek);
      startWeek = addDays(startWeek, 1);
    }
    entireOfMonth.push(entireOfWeek);
    entireOfWeek = [];
  }

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

  const rangeStyle = (day: Date) => {
    return isInRange(day) ? 'lightblue' : 'transparent';
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
          {weekDay.map((weekdays) => {
            return (
              <li key={weekdays} className={styles.weekdays}>
                {weekdays}
              </li>
            );
          })}
        </ul>

        <div className={styles.dates}>
          {entireOfMonth.map((week, i) => {
            return (
              <ul className={styles.day_container} key={i}>
                {week.map((day) => (
                  <li
                    onClick={() => handleDateClick(day)}
                    onDoubleClick={() => handleRangeSelect(day)}
                    className={styles.days}
                    key={day.toISOString()}
                    style={{ ...dayStyle(day), backgroundColor: rangeStyle(day) }}
                  >
                    {selectedDate.some((date) => date.toISOString() === day.toISOString()) ? (
                      <span className={styles.selected_date_circle}></span>
                    ) : null}
                    {day.getDate()}
                  </li>
                ))}
              </ul>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Calender;
