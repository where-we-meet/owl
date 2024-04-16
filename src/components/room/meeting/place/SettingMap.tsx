'use client';

import Image from 'next/image';
import { Map } from 'react-kakao-maps-sdk';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useSettingMap } from '@/hooks/useSettingMap';
import { Spinner } from '@nextui-org/react';
import styles from './ResultMap.module.css';

const SettingMap = () => {
  const [loading, error] = useKakaoMap();
  const { location, address, handleChangeCenter, isDrag, setIsDrag, isGpsLoading } = useSettingMap();

  if (loading) return <Spinner label="Loading..." color="primary" />;
  if (error) return <div>error</div>;

  return (
    <>
      <div className={styles.map_container}>
        {isGpsLoading ? (
          <Spinner className={styles.center_pin} color="primary" />
        ) : (
          <Image
            src={'/pin.svg'}
            className={`${styles.center_pin} ${isDrag && styles.center_pin_drag}`}
            width={50}
            height={50}
            alt="pin"
          />
        )}
        <Map
          center={location}
          className={styles.map}
          onCenterChanged={(map) => handleChangeCenter(map)}
          onDragStart={() => setIsDrag(true)}
          onDragEnd={() => setIsDrag(false)}
        />
        <div>{address}</div>
      </div>
    </>
  );
};

export default SettingMap;
