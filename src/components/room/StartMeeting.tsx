'use client';

import { insertNewRoom, insertRoomUser } from '@/api/room';
import { useQueryUser } from '@/hooks/useQueryUser';
import { getCurrentFormattedDate } from '@/utils/getCurrentFormattedDate';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './StartMeeting.module.css';
import { Button } from '@nextui-org/react';

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
    <main className={styles.main}>
      <form onSubmit={startNewRoom}>
        <div className={styles.date}>
          <input type="date" min={startDate} name="start" value={startDate} onChange={changeDate} />
          <input type="date" min={startDate} name="end" />
        </div>
        <div className={styles.start_button}>
          <Button type="submit" color="primary">
            모임 시작하기
          </Button>
        </div>
      </form>
    </main>
  );
};

export default StartMeeting;
