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
  getDate
} from 'date-fns';

const Calender = () => {
  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const weekDay = ['일', '월', '화', '수', '목', '금', '토'];
  const monthStart = startOfMonth(nowDate);
  const monthEnd = endOfMonth(monthStart);
  const startDay = startOfWeek(monthStart);
  const endDay = endOfWeek(monthEnd);

  const weeks = weekDay.map((weekdays) => {
    return <li className={`${styles.Weekdays}`}>{weekdays}</li>;
  });

  const entireOfMonth = []; // 월 전체 데이터

  let startWeek = startDay; // 첫 주 시작 날짜
  let entireOfWeek = []; // 주 전체 데이터

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    console.log(typeof startWeek);
  };

  while (startWeek <= endDay) {
    for (let i = 0; i < 7; i++) {
      const formOfDate = format(startWeek, 'd');
      entireOfWeek.push(
        <li
          //클릭 시 날짜 담기
          onClick={() => handleDateClick(startWeek)}
          className={`${styles.Days}`}
          key={startWeek.getDate()}
          style={{
            color:
              // 현재 날짜가 이번 달의 데이터가 아닐 경우 회색으로 표시
              // date-fns의 함수를 사용해 일요일이면 빨간색, 토요일이면 파란색으로 표시
              format(nowDate, 'M') !== format(startWeek, 'M')
                ? '#ddd'
                : isSunday(startWeek)
                ? 'red'
                : isSaturday(startWeek)
                ? 'blue'
                : isToday(startWeek)
                ? 'pink'
                : '#000'
          }}
        >
          {formOfDate}
          {selectedDate && selectedDate.getDate() === startWeek.getDate() && (
            <span className={styles.SelectedDateCircle}></span>
          )}
        </li>
      );
      startWeek = addDays(startWeek, 1);
    }
    entireOfMonth.push(
      <ul className={`${styles.DayContainer}`} key={startWeek.getDate()}>
        {entireOfWeek}
      </ul>
    );
    entireOfWeek = [];
  }

  const prevMonth = () => {
    setNowDate(subMonths(nowDate, 1));
  };

  const afterMonth = () => {
    setNowDate(addMonths(nowDate, 1));
  };

  return (
    <>
      <div className={`${styles.CalenderCnontainer}`}>Calender</div>

      <div>
        <div>
          <button onClick={prevMonth}>◀</button>
          {format(nowDate, 'yyyy')}년 {format(nowDate, 'M')}월<button onClick={afterMonth}>▶</button>
        </div>

        <ul>{weeks}</ul>
        <div className={`${styles.Dates}`}>{entireOfMonth}</div>
      </div>
    </>
  );
};

export default Calender;
