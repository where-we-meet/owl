'use client';

import { useEffect, useState } from 'react';
import styles from './Calender.module.css';
import { createClient } from '@/utils/supabase/client';
import { getUserSchedule, getCurrentUserData } from '@/api/supabaseCSR/supabase';

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

const Calender = ({ id }: { id: String }) => {
  const currentUserData = getCurrentUserData();

  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date[]>([]);
  const [userSchedules, setUserSchedules] = useState<any[]>([]);

  useEffect(() => {
    const dateOfusers = async () => {
      try {
        const data = await getUserSchedule(id.toString());
        setUserSchedules(data);
        console.log(data);
      } catch (error) {
        console.error('다른 유저들의 일정을 가져오는 중 오류 발생', error);
      }
    };
    dateOfusers();
  }, [id]);

  const weekDay = ['일', '월', '화', '수', '목', '금', '토'];
  const monthStart = startOfMonth(nowDate);
  const monthEnd = endOfMonth(monthStart);
  const startDay = startOfWeek(monthStart);
  const endDay = endOfWeek(monthEnd);
  const entireOfMonth = [];

  let startWeek = startDay;
  let entireOfWeek = [];

  const handleDateClick = (date: Date) => {
    const isAlreadySelected = selectedDate.some((selected) => isSameDay(selected, date));

    if (isAlreadySelected) {
      setSelectedDate((prev) => prev.filter((selected) => !isSameDay(selected, date)));
    } else {
      setSelectedDate((prev) => [...prev, date]);
    }
  };

  const handleDateUpload = async () => {
    const supabase = createClient();
    try {
      const roomId: string = id.toString();
      for (const date of selectedDate) {
        const { data, error } = await supabase
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

  const renderScheduleCircles = (date: Date) => {
    const schedulesOnDay = userSchedules.reduce((acc, schedule) => {
      if (isSameDay(new Date(schedule.start_date), new Date(schedule.start_date))) {
        acc.push(schedule);
      }
      return acc;
    }, []);
    console.log(userSchedules);
    const circles = schedulesOnDay.map((schedule: any, index: number) => (
      <span key={`${date.toISOString()}-${index}`} className={styles.schedule_circle}></span>
    ));

    return circles;
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
    const hasSchedule = userSchedules.some((schedule) => isSameDay(new Date(schedule.start_date), day));

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
                    onClick={() => handleDateClick(day)}
                    className={styles.days}
                    key={day.toISOString()}
                    style={{ ...dayStyle(day) }}
                  >
                    {selectedDate.some((date) => isSameDay(date, day)) ||
                    userSchedules.some((schedule) => isSameDay(new Date(schedule.start_date), day)) ? (
                      <>
                        <span className={styles.selected_date_circle}></span>
                        {renderScheduleCircles(day)}
                      </>
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
