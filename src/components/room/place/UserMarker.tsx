'use client';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

import styles from './UserMarker.module.css';

type Prop = {
  id: string;
  lat: string;
  lng: string;
  user: {
    profile_url: string | null;
    name: string;
  } | null;
};

const UserMarker = ({ id, lat, lng, user }: Prop) => {
  const userInfo = {
    name: user?.name,
    avatar: user?.profile_url
  };

  return (
    <>
      <CustomOverlayMap position={{ lat: Number(lat), lng: Number(lng) }} yAnchor={1.4}>
        <div className={styles.marker_container}>
          <div className={styles.avatar}>
            <img src={`${userInfo.avatar}`} alt="user-avatar" />
          </div>
          <img className={styles.marker} src="/pin.svg" alt="user-marker" />
        </div>
      </CustomOverlayMap>
    </>
  );
};

export default UserMarker;
