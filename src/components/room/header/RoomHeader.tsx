'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getRoomData } from '@/api/supabaseCSR/supabase';
import ConfirmedButton from '../ConfirmedButton';
import styles from './RoomHeader.module.css';

const RoomHeader = () => {
  const { id: roomId }: { id: string } = useParams();
  const { data: room } = useQuery({ queryKey: ['room', roomId], queryFn: () => getRoomData(roomId) });
  return (
    <div className={styles.room_header}>
      <div>
        <div className={styles.title_container}>
          <h1 className={styles.room_title}>{room ? room.name : '올빼미를 불러오는 중'}</h1>
        </div>
        <div>
          <ConfirmedButton />
        </div>
      </div>
      <p className={styles.center_address}>중심 위치 주소를 보여줍니다.</p>
    </div>
  );
};

export default RoomHeader;
