'use client';

import Image from 'next/image';
import { Map } from 'react-kakao-maps-sdk';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useSettingMap } from '@/hooks/useSettingMap';
import { Spinner } from '@nextui-org/react';
import styles from './ResultMap.module.css';
import GeolocationButton from './GeolocationButton';

const SettingMap = () => {
  const [loading, error] = useKakaoMap();
  const { location, handleChangeCenter, isDrag, setIsDrag, isGpsLoading } = useSettingMap();

  if (loading) return <Spinner label="Loading..." color="primary" />;
  if (error) return <div>error</div>;

  return (
    <>
      <div className={styles.map_container}>
        {isGpsLoading ? (
          <Spinner className={styles.center_pin} color="primary" />
        ) : (
          <div>
            <Image
              src={'/pin.svg'}
              className={`${styles.center_pin} ${isDrag && styles.center_pin_drag}`}
              width={30}
              height={30}
              alt="pin"
            />
          </div>
        )}
        <Map
          center={location}
          className={styles.map}
          onCenterChanged={(map) => handleChangeCenter(map)}
          onDragStart={() => setIsDrag(true)}
          onDragEnd={() => setIsDrag(false)}
        />
        <GeolocationButton />
      </div>
    </>
  );
};

export default SettingMap;
