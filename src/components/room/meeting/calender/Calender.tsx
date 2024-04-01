'use client';

import { useState } from 'react';
import {
  format,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  addDays,
  isSunday,
  isSaturday,
  subMonths,
  addMonths
} from 'date-fns';

const Calender = () => {
  const [nowDate, setNowDate] = useState<Date>(new Date());

  const weekDay = ['일', '월', '화', '수', '목', '금', '토'];
  const monthStart = startOfMonth(nowDate);
  const monthEnd = endOfMonth(monthStart);
  const startDay = startOfWeek(monthStart);
  const endDay = endOfWeek(monthEnd);

  const entireOfMonth = []; // 월 전체 데이터

  let startWeek = startDay; // 첫 주 시작 날짜
  let entireOfWeek = []; // 주 전체 데이터

  while (startWeek <= endDay) {
    for (let i = 0; i < 7; i++) {
      //
      const formOfDate = format(startWeek, 'd');
      entireOfWeek.push(
        <li
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
                : '#000'
          }}
        >
          {formOfDate}
        </li>
      );
      startWeek = addDays(startWeek, 1);
    }
    entireOfMonth.push(<div key={startWeek.getDate()}>{entireOfWeek}</div>);
    entireOfWeek = [];
  }

  const weeks = weekDay.map((weekdays) => {
    return <li>{weekdays}</li>;
  });

  const prevMonth = () => {
    setNowDate(subMonths(nowDate, 1));
  };

  const afterMonth = () => {
    setNowDate(addMonths(nowDate, 1));
  };

  return (
    <>
      <div>Calender</div>
      <button onClick={prevMonth}>◀</button>
      <button onClick={afterMonth}>▶</button>
      <div>
        {format(nowDate, 'yyyy')}년 {format(nowDate, 'M')}월
      </div>
      <ul>{weeks}</ul>
      <div>{entireOfMonth}</div>
    </>
  );
};

export default Calender;
