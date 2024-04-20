'use client';

import { useGetCalendar } from '@/hooks/useGetCalendar';
import { mostSchedule } from '@/utils/mostSchedule';
import { useParams } from 'next/navigation';
import { Link } from '@nextui-org/react';
import styles from './ResultSchedule.module.css';

const ResultSchedule = ({ roomId }: { roomId: string }) => {
  const { userSchedules } = useGetCalendar(roomId);
  const { maxDates } = mostSchedule(userSchedules);

  return (
    <div className={styles.box}>
      <ul>
        {maxDates.map((date, i) => (
          <li key={i}>{date}</li>
        ))}
      </ul>
      <Link href={`/room/${roomId}/pick-calendar`} className={styles.edit_calendar}>
        내 일정 변경하기
      </Link>
    </div>
  );
};

export default ResultSchedule;
