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

  const changeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
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
      <div className={styles.date}>
        <label>
          시작일
          <Input type="date" min={startDate} name="start" value={startDate} onChange={changeDate} required />
        </label>
        <label>
          종료일
          <Input type="date" min={startDate} name="end" required />
        </label>
      </div>
      <div className={styles.start_button}>
        <Button type="submit">모임 시작하기</Button>
      </div>
    </form>
  );
};

export default StartMeeting;
