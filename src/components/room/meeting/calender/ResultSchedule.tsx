'use client';

import { useGetCalendar } from '@/hooks/useGetCalendar';
import { mostSchedule } from '@/utils/mostSchedule';
import { useParams } from 'next/navigation';

const ResultSchedule = () => {
  const { id: roomId }: { id: string } = useParams();
  const { userSchedules } = useGetCalendar(roomId);
  const result = mostSchedule(userSchedules);
  return (
    <>
      {result.map((date, i) => (
        <div key={i}>{date}</div>
      ))}
    </>
  );
};

export default ResultSchedule;
