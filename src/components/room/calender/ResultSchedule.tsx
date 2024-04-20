'use client';

import { mostSchedule } from '@/utils/mostSchedule';
import { Link } from '@nextui-org/react';
import { useQuerySchedule } from '@/hooks/useQuerySchedule';
import { useQueryUser } from '@/hooks/useQueryUser';
import styles from './ResultSchedule.module.css';

const ResultSchedule = ({ roomId }: { roomId: string }) => {
  const { id: userId } = useQueryUser();
  const { userSchedules } = useQuerySchedule({ roomId, userId });
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
