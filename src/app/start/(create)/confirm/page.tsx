'use client';

import { useRouter } from 'next/navigation';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useCalendarStore } from '@/store/calendarStore';
import { useSearchDataStore } from '@/store/placeStore';
import { sortDate } from '@/utils/sortDate';
import { Button, Link } from '@nextui-org/react';
import { insertNewRoom, upsertRoomUser } from '@/api/room';
import { useCreateRoomStore } from '@/store/createRoomStore';
import styles from './page.module.css';
import { upsertSchedule } from '@/api/supabaseCSR/supabase';
import roomNameGenerator from '@/utils/roomNameGenerator';

const SettingConfirmPage = () => {
  const router = useRouter();
  const { id: userId } = useQueryUser();

  const { startDate, endDate } = useCreateRoomStore();
  const selectedDates = useCalendarStore((state) => state.selectedDates);
  const {
    location: { lat, lng },
    address
  } = useSearchDataStore((state) => state);

  const sortedDates = sortDate(selectedDates);


  const createNewRoom = async () => {
    if (!startDate || !endDate) return;

    const [room] = await insertNewRoom({
      name: roomNameGenerator(),
      created_by: userId,
      start_date: startDate,
      end_date: endDate
    });

    const userSchedules = sortedDates.map((date) => {
      return {
        room_id: room.id,
        created_by: userId,
        start_date: new Date(date).toDateString(),
        end_date: new Date(date).toDateString()
      };
    });

    await upsertRoomUser({
      room_id: room.id,
      user_id: userId,
      start_location: address,
      is_admin: true,
      lat: lat.toString(),
      lng: lng.toString()
    });

    await upsertSchedule(userSchedules);
    router.push(`/room/${room.id}`);
  };

  return (
    <>
      <div className={styles.box}>
        {sortedDates.length > 0 ? (
          <ul>
            {sortedDates.map((date, index) => (
              <li key={index}>{new Date(date).toLocaleDateString()}</li>
            ))}
          </ul>
        ) : (
          <p>선택한 일정이 없습니다</p>
        )}
      </div>
      <div className={styles.box}>{address}</div>
      <div className={styles.footer}>
        <Button as={Link} href="/start/pick-calendar">
          이전
        </Button>
        <Button onClick={createNewRoom}>모임 만들기</Button>
      </div>
    </>
  );
};

export default SettingConfirmPage;
