'use client';

import { Circle, Map } from 'react-kakao-maps-sdk';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useMapController } from '@/hooks/useMapController';
import UserMarker from './UserMarker';
import Halfway from './Halfway';
import CategoryMarker from './search/CategoryMarker';

import styles from './ResultMap.module.css';

const ResultMap = () => {
  const [loading, error] = useKakaoMap();

  const {
    location,
    halfwayPoint,
    range,
    clickId,
    setClickId,
    setIsDrag,
    handleChangeCenter,
    roomUsers,
    searchCategory = []
  } = useMapController();

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <>
      {halfwayPoint.lat && halfwayPoint.lng && (
        <Map
          center={location}
          className={styles.map}
          onCenterChanged={(map) => handleChangeCenter(map)}
          onDragStart={() => setIsDrag(true)}
          onDragEnd={() => setIsDrag(false)}
          onClick={() => setClickId('')}
          onTouchEnd={() => setClickId('')}
        >
          {roomUsers
            .filter(({ lat, lng }) => lat !== null && lng !== null)
            .map((user) => (
              <UserMarker key={user.id} user={user} />
            ))}
          {searchCategory.map((info) => (
            <CategoryMarker key={info.id} info={info} clickId={clickId} setClickId={setClickId} />
          ))}

          <Halfway location={{ lat: halfwayPoint.lat, lng: halfwayPoint.lng }} />
          <Circle
            center={{ lat: halfwayPoint.lat, lng: halfwayPoint.lng }}
            radius={range as number}
            strokeWeight={3}
            strokeColor={'#000000'}
            strokeOpacity={0.1}
            strokeStyle={'solid'}
            fillColor={'#00a0e9'}
            fillOpacity={0.05}
          />
        </Map>
      )}
    </>
  );
};

export default ResultMap;
