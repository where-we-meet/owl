'use client';

import { useMapController } from '@/hooks/useMapController';
import { useQuery } from '@tanstack/react-query';
import { getRoomData } from '@/api/supabaseCSR/supabase';
import UserProfile from '@/components/header/profile/UserProfileButton';
import LinkShare from '../share/LinkShare';
import styles from './ResultHeader.module.css';
import { Image } from '@nextui-org/react';

const ResultHeader = ({ roomId }: { roomId: string }) => {
  const { data: room } = useQuery({ queryKey: ['room', roomId], queryFn: () => getRoomData(roomId) });
  const { address } = useMapController();

  return (
    <>
      <div className={styles.box}>
        <div className={styles.title_container}>
          <h1 className={styles.room_title}>{room ? room.name : '올빼미를 불러오는 중'}</h1>
          <div className={styles.wrap}>
            <LinkShare />
            <UserProfile />
          </div>
        </div>
        <div className={styles.confirm_info}>
          <Image src="/pin.svg" className={styles.pin} />
          <p>{address}</p>
          <span>/</span>
          <p>{room ? room.confirmed_date : '확정 날짜를 불러오는 중'}</p>
        </div>
      </div>
    </>
  );
};

export default ResultHeader;
