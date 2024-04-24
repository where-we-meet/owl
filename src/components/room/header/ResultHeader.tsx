'use client';
import { useMapController } from '@/hooks/useMapController';
import { useQuery } from '@tanstack/react-query';
import { getRoomData } from '@/api/supabaseCSR/supabase';
import styles from './ResultHeader.module.css';

const ResultHeader = ({ roomId }: { roomId: string }) => {
  const { data: room } = useQuery({ queryKey: ['room', roomId], queryFn: () => getRoomData(roomId) });
  const { address } = useMapController();

  return (
    <>
      <div className={styles.box}>
        <div className={styles.title_container}>
          <h1 className={styles.room_title}>{room ? room.name : '올빼미를 불러오는 중'}</h1>
        </div>
        <div className={styles.address}>
          <p>{address}</p>
          <p>{room ? room.confirmed_date : '확정 날짜를 불러오는 중'}</p>
        </div>
      </div>
    </>
  );
};

export default ResultHeader;
