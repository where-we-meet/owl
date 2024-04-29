'use client';

import ConfirmedButton from '../ConfirmedButton';
import HalfwayButton from '../place/HalfwayButton';
import { useHalfwayDataStore } from '@/store/halfwayStore';
import { useQueryRoomData } from '@/hooks/useQueryRoomData';
import styles from './RoomHeader.module.css';

const RoomHeader = () => {
  const address = useHalfwayDataStore((state) => state.address);
  const { data: room } = useQueryRoomData();

  return (
    <>
      <div className={styles.room_header}>
        <div>
          <div className={styles.title_container}>
            <h1 className={styles.room_title}>{room ? room.name : '올빼미를 불러오는 중'}</h1>
          </div>
        </div>
        <HalfwayButton />
        <span className={styles.line}></span>
        <p className={styles.center_address_copy}>{address ? address : '중심 위치 주소를 보여줍니다.'}</p>
      </div>
      <div>
        <ConfirmedButton />
      </div>
    </>
  );
};

export default RoomHeader;
