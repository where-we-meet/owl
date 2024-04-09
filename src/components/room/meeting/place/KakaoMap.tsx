import Image from 'next/image';

import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useMapController } from '@/hooks/useMapController';

import UserMarker from './UserMarker';
import Halfway from './Halfway';
import RangeController from './RangeController';
import styles from './KakaoMap.module.css';

const KakaoMap = () => {
  const [loading, error] = useKakaoMap();
  const {
    location,
    address,
    handleChangeCenter,
    isGpsLoading,
    isDrag,
    setIsDrag,
    halfwayPoint,
    roomUsers,
    searchCategory = []
  } = useMapController();

  const isHalfwayValid = halfwayPoint.lat && halfwayPoint.lng;

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
          center={location}
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
          {searchCategory.map(({ x, y }, i) => (
            <MapMarker key={i} position={{ lat: +y, lng: +x }} />
          ))}
          {isHalfwayValid && (
            <>
              <Halfway location={halfwayPoint} />
              <RangeController center={halfwayPoint} />
            </>
          )}
        </Map>
      </div>
      <div>{address}</div>
    </div>
  );
};

export default KakaoMap;
