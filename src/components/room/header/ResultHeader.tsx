'use client';

import { Image } from '@nextui-org/react';
import { useQueryRoomData } from '@/hooks/useQueryRoomData';
import { useSearchDataStore } from '@/store/placeStore';
import UserProfile from '@/components/profile/UserProfileButton';
import LinkShare from '../share/LinkShare';
import styles from './ResultHeader.module.css';

const ResultHeader = () => {
  const { data: room } = useQueryRoomData();
  const setLocation = useSearchDataStore((state) => state.setLocation);

  const handleMoveHalfway = () => {
    if (!room || !room.lat || !room.lng) return;
    setLocation({ lat: +room.lat, lng: +room.lng });
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
        <Image src="/pin.svg" alt="pin" className={styles.pin} />
        <p>{room ? room.location : '주소를 불러오는 중'}</p>
        <span>/</span>
        <p>{room ? room.confirmed_date : '확정 날짜를 불러오는 중'}</p>
      </div>
    </div>
  );
};

export default ResultHeader;
