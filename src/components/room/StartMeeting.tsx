'use client';

import { getCurrentFormattedDate } from '@/utils/getCurrentFormattedDate';
import { ChangeEvent, useState } from 'react';
import { MdStart } from 'react-icons/md';
import { useCreateRoomStore } from '@/store/createRoomStore';
import { useRouter } from 'next/navigation';
import { useCalendarStore } from '@/store/calendarStore';
import { Button, Input } from '@nextui-org/react';
import styles from './StartMeeting.module.css';

const StartMeeting = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState(getCurrentFormattedDate());
  const [endDate, setEndDate] = useState(getCurrentFormattedDate());
  const setDateRange = useCreateRoomStore((state) => state.setDateRange);
  const setSelectedDates = useCalendarStore((state) => state.setSelectedDates);

  const changeStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const changeEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const createRoomOption = () => {
    setSelectedDates([]);
    setDateRange({ startDate, endDate });
    router.push('/start/pick-calendar');
  };

  return (
    <form>
      <h1 className={styles.title}>모임 일정의 범위를 선택해주세요</h1>
      <div className={styles.date}>
        <label>
          시작일
          <Input
            type="date"
            min={getCurrentFormattedDate()}
            name="start"
            value={startDate}
            onChange={changeStartDate}
          />
        </label>
        <p>~</p>
        <label>
          종료일
          <Input type="date" min={startDate} name="end" value={endDate} onChange={changeEndDate} />
        </label>
      </div>
      <div className={styles.start_button}>
        <Button onPress={createRoomOption}>
          모임 시작하기
          <MdStart />
        </Button>
      </div>
    </form>
  );
};

export default StartMeeting;
