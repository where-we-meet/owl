'use client';

import { useGetCalendar } from '@/hooks/useGetCalendar';
import { mostSchedule } from '@/utils/mostSchedule';
import { useParams } from 'next/navigation';
import styles from './ResultSchedule.module.css';
import { Link } from '@nextui-org/react';

const ResultSchedule = () => {
  const { id: roomId }: { id: string } = useParams();
  const { userSchedules } = useGetCalendar(roomId);
  const { maxDates } = mostSchedule(userSchedules);

  return (
    <div className={styles.box}>
      {maxDates.map((date, i) => (
        <li key={i}>{date}</li>
      ))}
      <Link href={`/room/${roomId}/pick-calendar`} className={styles.edit_calendar}>
        내 일정 변경하기
      </Link>
    </div>
  );
};

export default ResultSchedule;
