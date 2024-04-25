'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentFormattedDate } from '@/utils/getCurrentFormattedDate';
import { insertNewRoom, upsertRoomUser } from '@/api/room';
import { useQueryUser } from '@/hooks/useQueryUser';
import roomNameGenerator from '@/utils/roomNameGenerator';
import { MdStart } from 'react-icons/md';
import { Button, Input } from '@nextui-org/react';
import styles from './StartMeeting.module.css';

const StartMeeting = () => {
  const router = useRouter();
  const { id: userId } = useQueryUser();

  const [isFetching, setIsFetching] = useState(false);
  const [startDate, setStartDate] = useState(getCurrentFormattedDate());
  const [endDate, setEndDate] = useState(getCurrentFormattedDate());

  const changeStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const changeEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const createRoomOption = async () => {
    setIsFetching(true);
    const [newRoom] = await insertNewRoom({
      name: roomNameGenerator(),
      created_by: userId,
      start_date: startDate,
      end_date: endDate
    });

    if (!newRoom) {
      setIsFetching(false);
    }

    await upsertRoomUser({
      room_id: newRoom.id,
      user_id: userId,
      start_location: null,
      is_admin: true,
      lat: null,
      lng: null
    });
    router.replace(`/room/${newRoom.id}`);
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
        <Button onPress={createRoomOption} isLoading={isFetching}>
          모임 시작하기
          <MdStart />
        </Button>
      </div>
    </form>
  );
};

export default StartMeeting;
