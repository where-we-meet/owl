'use client';

import { useQuery } from '@tanstack/react-query';
import { getRoomData } from '@/api/supabaseCSR/supabase';
import { useHalfwayDataStore } from '@/store/halfwayStore';
import { useSearchDataStore } from '@/store/placeStore';
import LinkShare from '../share/LinkShare';
import UserProfile from '@/components/profile/UserProfileButton';
import { Image } from '@nextui-org/react';
import styles from './ResultHeader.module.css';

const ResultHeader = ({ roomId }: { roomId: string }) => {
  const { data: room } = useQuery({ queryKey: ['room', roomId], queryFn: () => getRoomData(roomId) });
  const { lat, lng, location } = useHalfwayDataStore((state) => state);
  const setLocation = useSearchDataStore((state) => state.setLocation);

  const handleMoveHalfway = () => {
    if (!lat || !lng) return;
    setLocation({ lat, lng });
  };

  return (
    <div className={styles.box}>
      <div className={styles.title_container}>
        <h1 className={styles.room_title}>{room ? room.name : '올빼미를 불러오는 중'}</h1>
        <div className={styles.wrap}>
          <LinkShare />
          <UserProfile />
        </div>
      </div>
      <div className={styles.confirm_info} onClick={handleMoveHalfway}>
        <Image src="/pin.svg" className={styles.pin} />
        <p>{location}</p>
        <span>/</span>
        <p>{room ? room.confirmed_date : '확정 날짜를 불러오는 중'}</p>
      </div>
    </div>
  );
};

export default ResultHeader;
