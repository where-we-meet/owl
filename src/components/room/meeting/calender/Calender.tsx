'use client';

import { useState, useEffect } from 'react';
import styles from './Calender.module.css';
import { createClient } from '@/utils/supabase/client';
import { getRoomData } from '@/api/supabase';
import { RoomData } from '../../sidebar/user/UserList';

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
  const [selectedRange, setSelectedRange] = useState<Date[]>([]);
  const [roomData, setRoomData] = useState<RoomData>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getRoomData(id); // 방 ID를 전달하여 방 데이터 가져오기
  //       setRoomData(data);
  //     } catch (error) {
  //       console.error('방 데이터 가져오기 오류:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
    console.log(selectedDate);
  };

  const handleRangeSelect = (date: Date) => {
    if (selectedRange.length === 0 || selectedRange.length === 2) {
      setSelectedRange([date]);
    } else if (selectedRange.length === 1) {
      setSelectedRange((prev) => [...prev, date]);
    }
  };

  const isInRange = (date: Date) => {
    if (selectedRange.length === 2) {
      const [start, end] = selectedRange;
      return date >= start && date <= end;
    }
    return false;
  };

  const handleDateUpload = async () => {
    const supabase = createClient();
    try {
      for (const date of selectedDate) {
        const { data, error } = await supabase
          .from('room_schedule')
          .insert([
            {
              start_date: date.toISOString(),
              end_date: date.toISOString()
              // created_by: roomData.created_by,
              // room_id: roomData.id
            }
          ])
          .select();
        if (error) {
          console.error('데이터 추가 중 오류 생김!', error);
        } else {
          console.log('데이터 추가하기 성공!', data);
        }
      }
    } catch (error) {
      console.error('데이터 업로드 중 오류 발생', error);
    }
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
          {entireOfMonth.map((week, index) => {
            return (
              <ul className={styles.day_container} key={index}>
                {week.map((day) => (
                  <li
                    draggable="true"
                    onDoubleClick={() => handleDateClick(day)}
                    onClick={() => handleRangeSelect(day)}
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
        <button>건너뛰기</button>
        <button onClick={handleDateUpload}>다음</button>
      </div>
    </>
  );
};

export default Calender;
