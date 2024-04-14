'use client';

import { useGetCalendar } from '@/hooks/useGetCalendar';
import { mostSchedule } from '@/utils/mostSchedule';
import { useParams } from 'next/navigation';
import styles from './ResultSchedule.module.css';
import { Link } from '@nextui-org/react';

const ResultSchedule = () => {
  const { id: roomId }: { id: string } = useParams();
  const { userSchedules } = useGetCalendar(roomId);
  const { maxDates, maxLength } = mostSchedule(userSchedules);
  return (
    <div className={styles.box}>
      <strong>{maxLength}명의 유저가 선호하는 날짜</strong>
      {maxDates.map((date, i) => (
        <div key={i}>{date}</div>
      ))}
      <Link href={`/room/${roomId}/pick-calendar`} className={styles.edit_calendar}>
        내 일정 변경하기
      </Link>
    </div>
  );
};

export default ResultSchedule;
