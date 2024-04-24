'use client';

import { Circle, Map } from 'react-kakao-maps-sdk';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useMapController } from '@/hooks/useMapController';

import UserMarker from './UserMarker';
import Halfway from './Halfway';
import CategorySelector from './search/CategorySelector';
import CategoryMarker from './search/CategoryMarker';

import styles from './ResultMap.module.css';

const ResultMap = () => {
  const [loading, error] = useKakaoMap();

  const { halfwayPoint, range, clickId, setClickId, roomUsers, searchCategory = [] } = useMapController();

  const isHalfwayValid = halfwayPoint.lat && halfwayPoint.lng;

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <>
      <div className={styles.map_container}>
        <div className={styles.category_container}>
          <CategorySelector />
        </div>

        {isHalfwayValid && (
          <>
            <Map
              center={halfwayPoint}
              className={styles.map}
              onClick={() => setClickId('')}
              onTouchEnd={() => setClickId('')}
            >
              {roomUsers
                .filter(({ lat, lng }) => lat !== null && lng !== null)
                .map(({ id, lat, lng, users }) => (
                  <UserMarker key={id} id={id} lat={lat as string} lng={lng as string} user={users} />
                ))}
              {searchCategory.map((info) => (
                <CategoryMarker key={info.id} info={info} clickId={clickId} setClickId={setClickId} />
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
