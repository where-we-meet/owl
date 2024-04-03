import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useCenterState } from '@/hooks/useCenterState';

import { dragCenter } from '@/utils/dragCenter';
import styles from './KakaoMap.module.css';
import Image from 'next/image';
import { useGetRoadAddress } from '@/hooks/useGetPlace';
import { useState } from 'react';
import RangeController from './RangeController';

const KakaoMap = () => {
  const [isDrag, setIsDrag] = useState(false);

  const [loading, error] = useKakaoMap();
  const { centerData, setCenterData } = useCenterState();

  const { data, isPending } = useGetRoadAddress(centerData.center);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <div>
      <div className={styles.map_container}>
        <Image
          src={'/pin.svg'}
          className={`${styles.center_pin} ${isDrag && styles.center_pin_drag}`}
          width={50}
          height={50}
          alt="pin"
        />
        <Map
          center={centerData.center}
          className={styles.map}
          onDragStart={() => setIsDrag(true)}
          onDragEnd={(map) => {
            setIsDrag(false);
            dragCenter(map, setCenterData);
          }}
        >
          {centerData.isLoading && <div>위치 정보를 불러오고 있습니다.</div>}
          <RangeController center={centerData.center} />
        </Map>
      </div>
      <div>{`lat: ${centerData.center.lat} lng: ${centerData.center.lng}`}</div>
      <div>{data?.road_address?.address_name || data?.address?.address_name}</div>
    </div>
  );
};

export default KakaoMap;
