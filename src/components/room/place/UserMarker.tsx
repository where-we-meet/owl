'use client';

import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import type { RoomUser } from '@/types/roomUser';
import styles from './UserMarker.module.css';

const UserMarker = ({ user }: { user: RoomUser }) => {
  return (
    <CustomOverlayMap position={{ lat: Number(user.lat), lng: Number(user.lng) }} yAnchor={1.4}>
      <div className={styles.marker_container}>
        <div className={styles.avatar}>
          <img src={`${user.profile_url}`} alt="user-avatar" />
        </div>
        <img className={styles.marker} src="/pin.svg" alt="user-marker" />
      </div>
    </CustomOverlayMap>
  );
};

export default UserMarker;
