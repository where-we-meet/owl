import Image from 'next/image';
import { Map } from 'react-kakao-maps-sdk';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useMapController } from '@/hooks/useMapController';

import RangeController from './RangeController';
import styles from './KakaoMap.module.css';
import UserMarker from './UserMarker';
import { useRoomUserDataStore } from '@/store/store';
import { useGetHalfway } from '@/hooks/useGetHalfway';
import Halfway from './Halfway';

const KakaoMap = () => {
  const [loading, error] = useKakaoMap();
  const { userLocationData, handleChangeCenter, isGpsLoading, isDrag, setIsDrag } = useMapController();

  const roomUsers = useRoomUserDataStore((state) => state.roomUsers);
  const { halfwayPoint } = useGetHalfway(roomUsers);

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
          {roomUsers.map(({ id, lat, lng }) => lat && lng && <UserMarker key={id} id={id} lat={lat} lng={lng} />)}
          {halfwayPoint && <Halfway location={halfwayPoint} />}
          <RangeController center={halfwayPoint} />
        </Map>
      </div>
      <div>{userLocationData.address}</div>
    </div>
  );
};

export default KakaoMap;
