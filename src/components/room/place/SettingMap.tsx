'use client';

import Image from 'next/image';
import { Map } from 'react-kakao-maps-sdk';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useSettingMap } from '@/hooks/useSettingMap';
import { Spinner } from '@nextui-org/react';
import GeolocationButton from './GeolocationButton';
import LocationSwitch from './LocationSwitch';
import SearchBar from './search/SearchBar';
import UserMarker from './UserMarker';
import Halfway from './Halfway';
import styles from './SettingMap.module.css';

const SettingMap = () => {
  const [loading, error] = useKakaoMap();
  const { location, halfwayPoint, roomUsers, isPinned, handleChangeCenter, isDrag, setIsDrag, isGpsLoading } =
    useSettingMap();

  const isHalfwayValid = halfwayPoint.lat && halfwayPoint.lng;

  if (loading) return <Spinner label="Loading..." color="primary" />;
  if (error) return <div>error</div>;

  return (
    <>
      <div className={styles.map_container}>
        <SearchBar />
        <div>
          {isGpsLoading && <Spinner className={styles.center_pin} color="primary" />}
          <div>
            <Image
              src={'/pin.svg'}
              className={`${styles.center_pin} ${isDrag && styles.center_pin_drag} ${
                isPinned && styles.center_pin_none
              }`}
              width={30}
              height={30}
              alt="pin"
            />
            <div
              className={`${styles.center_pin_base} ${isDrag && styles.center_pin_base_drag} ${
                isPinned && styles.center_pin_none
              }`}
            />
          </div>
        </div>
        <Map
          center={location}
          className={styles.map}
          onCenterChanged={(map) => handleChangeCenter(map)}
          onDragStart={() => setIsDrag(true)}
          onDragEnd={() => setIsDrag(false)}
          minLevel={11}
        >
          {roomUsers
            .filter(({ lat, lng }) => lat !== null && lng !== null)
            .map(({ id, lat, lng, users }) => (
              <UserMarker key={id} id={id} lat={lat as string} lng={lng as string} user={users} />
            ))}
          {isHalfwayValid && <Halfway location={halfwayPoint} />}
        </Map>
        <div className={styles.button_wrapper}>
          <LocationSwitch toggleState={isPinned} />
          <GeolocationButton />
        </div>
      </div>
    </>
  );
};

export default SettingMap;
