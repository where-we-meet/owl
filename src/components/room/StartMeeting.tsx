'use client';

import { insertNewRoom, insertRoomUser } from '@/api/room';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

const StartMeeting = () => {
  const router = useRouter();
  const user = useQueryUser();

  const [startDate, setStartDate] = useState(new Date().toDateString());

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
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <input type="date" name="start" value={startDate} onChange={changeDate} />
        <input type="date" min={startDate} name="end" />
      </div>
      <button>모임 시작하기</button>
    </form>
  );
};

export default StartMeeting;
