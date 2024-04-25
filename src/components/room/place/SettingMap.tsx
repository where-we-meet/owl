'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

import { Map } from 'react-kakao-maps-sdk';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useSettingMap } from '@/hooks/useSettingMap';
import { Spinner } from '@nextui-org/react';

import GeolocationButton from './GeolocationButton';
import SearchBar from './search/SearchBar';
import UserMarker from './UserMarker';
import Halfway from './Halfway';
import StartLocationBox from './StartLocationBox';
import styles from './SettingMap.module.css';

const SettingMap = ({ isOpened }: { isOpened: boolean }) => {
  const [loading, error] = useKakaoMap();
  const { location, halfwayPoint, roomUsers, isPinned, handleChangeCenter, isDrag, setIsDrag, isGpsLoading } =
    useSettingMap();

  const mapRef = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    setTimeout(function () {
      mapRef.current?.relayout();
    }, 300);
  }, [isOpened]);

  const isHalfwayValid = halfwayPoint.lat && halfwayPoint.lng;

  if (error) return <div>error</div>;

  return (
    <div className={styles.map_container}>
      {loading ? (
        <Spinner className={styles.map_container_spinner} label="지도를 가져오고 있습니다..." color="primary" />
      ) : (
        <>
          <div className={styles.searchbar_container}>
            <SearchBar />
            <GeolocationButton />
          </div>
          <div>
            {isGpsLoading && <Spinner className={styles.center_spinner} color="primary" />}
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
          <StartLocationBox />
          <Map
            center={location}
            className={styles.map}
            onCenterChanged={(map) => handleChangeCenter(map)}
            onDragStart={() => setIsDrag(true)}
            onDragEnd={() => setIsDrag(false)}
            minLevel={11}
            ref={mapRef}
          >
            {roomUsers
              .filter(({ lat, lng }) => lat !== null && lng !== null)
              .map((user) => (
                <UserMarker key={user.id} user={user} />
              ))}
            {isHalfwayValid && <Halfway location={halfwayPoint} />}
          </Map>
        </>
      )}
    </div>
  );
};

export default SettingMap;
