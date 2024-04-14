'use client';

import { insertNewRoom, insertRoomUser } from '@/api/room';
import { useQueryUser } from '@/hooks/useQueryUser';
import { getCurrentFormattedDate } from '@/utils/getCurrentFormattedDate';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './StartMeeting.module.css';
import { Button, Input } from '@nextui-org/react';

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

    router.push(`/room/${room.id}`);
  };

  return (
    <form onSubmit={startNewRoom}>
      <p>모임 참가자가 선택 가능한 날짜 범위를 지정해주세요</p>
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
        <label>
          종료일
          <Input type="date" min={startDate} name="end" value={endDate} onChange={changeEndDate} />
        </label>
      </div>
      <div className={styles.start_button}>
        <Button type="submit">모임 시작하기</Button>
      </div>
    </form>
  );
};

export default StartMeeting;
