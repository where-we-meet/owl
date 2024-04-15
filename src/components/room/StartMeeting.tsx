'use client';

import { insertNewRoom, insertRoomUser } from '@/api/room';
import { useQueryUser } from '@/hooks/useQueryUser';
import { getCurrentFormattedDate } from '@/utils/getCurrentFormattedDate';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './StartMeeting.module.css';
import { Button, Input } from '@nextui-org/react';
import { MdStart } from 'react-icons/md';
const StartMeeting = () => {
  const router = useRouter();
  const user = useQueryUser();

  const [startDate, setStartDate] = useState(getCurrentFormattedDate());
  const [endDate, setEndDate] = useState(getCurrentFormattedDate());

  const changeStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const changeEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const startNewRoom = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    const endDate = e.currentTarget.end.value;

    const [room] = await insertNewRoom({
      name: '운좋은 올빼미',
      created_by: user.id,
      start_date: startDate,
      end_date: endDate
    });
    await insertRoomUser({ room_id: room.id, user_id: user.id, is_admin: true });

    router.push(`/room/${room.id}/pick-calendar`);
  };

  return (
    <form onSubmit={startNewRoom}>
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
        <Button type="submit">
          모임 시작하기
          <MdStart />
        </Button>
      </div>
    </form>
  );
};

export default StartMeeting;
