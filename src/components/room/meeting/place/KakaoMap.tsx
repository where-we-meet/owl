import Image from 'next/image';
import { useMemo } from 'react';

import { Map } from 'react-kakao-maps-sdk';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useMapController } from '@/hooks/useMapController';
import { calcHalfwayPoint } from '@/utils/place/calcHalfwayPoint';
import { useRoomUserDataStore } from '@/store/store';

import UserMarker from './UserMarker';
import Halfway from './Halfway';
import RangeController from './RangeController';
import styles from './KakaoMap.module.css';

const KakaoMap = () => {
  const [loading, error] = useKakaoMap();
  const { userLocationData, handleChangeCenter, isGpsLoading, isDrag, setIsDrag } = useMapController();

  const roomUsers = useRoomUserDataStore((state) => state.roomUsers);
  const halfwayPoint = useMemo(() => calcHalfwayPoint(roomUsers), [roomUsers]);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <div>
      <div className={styles.map_container}>
        {isGpsLoading ? (
          <div className={`${styles.center_pin}`}>loading...</div>
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
          center={userLocationData.location}
          className={styles.map}
          onCenterChanged={(map) => handleChangeCenter(map)}
          onDragStart={() => setIsDrag(true)}
          onDragEnd={() => setIsDrag(false)}
        >
          {roomUsers
            .filter(({ lat, lng }) => lat !== null && lng !== null)
            .map(({ id, lat, lng }) => (
              <UserMarker key={id} id={id} lat={lat as string} lng={lng as string} />
            ))}
          {halfwayPoint.lat && halfwayPoint.lng && (
            <>
              <Halfway location={halfwayPoint} />
              <RangeController center={halfwayPoint} />
            </>
          )}
        </Map>
      </div>
      <div>{userLocationData.address}</div>
    </div>
  );
};

export default KakaoMap;
