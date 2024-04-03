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
  const [startRangeDate, setStartRangeDate] = useState<Date[]>([]);
  const [endRangeDate, setEndRangeDate] = useState<Date[]>([]);

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
    console.log(startRangeDate);
    if (startRangeDate.length === 0) {
      setStartRangeDate([date]);
    } else {
      // 시작일이 선택된 상태라면 종료일로 설정
      setEndRangeDate([date]);
      const [start] = startRangeDate;
      const [end] = endRangeDate;

      // 시작일과 종료일 사이의 모든 날짜를 구하여 범위로 설정
      let range: Date[] = [];
      let currentDate = new Date(start);
      while (currentDate <= end) {
        range.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      console.log(range);
      setSelecteRange(range);
    }
  };

  const isInRange = (date: Date) => {
    return selectedRange.length === 2 && date >= selectedRange[0] && date <= selectedRange[1];
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
                    draggable="true"
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
