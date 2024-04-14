import { Circle, Map, MapMarker } from 'react-kakao-maps-sdk';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useMapController } from '@/hooks/useMapController';

import UserMarker from './UserMarker';
import Halfway from './Halfway';
import styles from './ResultMap.module.css';
import { useParams } from 'next/navigation';
import { Link } from '@nextui-org/react';

const ResultMap = () => {
  const [loading, error] = useKakaoMap();
  const { id: roomId } = useParams();
  const { address, halfwayPoint, range, roomUsers, searchCategory = [] } = useMapController();

  const isHalfwayValid = halfwayPoint.lat && halfwayPoint.lng;

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <>
      <div className={styles.box}>
        <div className={styles.address}>{address}</div>
        <Link href={`/room/${roomId}/pick-place`}>내 장소 변경하기</Link>
      </div>
      <div className={styles.map_container}>
        {isHalfwayValid && (
          <>
            <Map center={halfwayPoint} className={styles.map}>
              {roomUsers
                .filter(({ lat, lng }) => lat !== null && lng !== null)
                .map(({ id, lat, lng }) => (
                  <UserMarker key={id} id={id} lat={lat as string} lng={lng as string} />
                ))}
              {searchCategory.map(({ x, y }, i) => (
                <MapMarker key={i} position={{ lat: +y, lng: +x }} />
              ))}
              <>
                <Halfway location={halfwayPoint} />
                <Circle
                  center={halfwayPoint}
                  radius={range as number}
                  strokeWeight={3}
                  strokeColor={'#000000'}
                  strokeOpacity={0.1}
                  strokeStyle={'solid'}
                  fillColor={'#00a0e9'}
                  fillOpacity={0.05}
                />
              </>
            </Map>
          </>
        )}
      </div>
    </>
  );
};

export default ResultMap;
