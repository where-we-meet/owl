import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useCenterState } from '@/hooks/useCenterState';

import { dragCenter } from '@/utils/dragCenter';
import styles from './KakaoMap.module.css';
import Image from 'next/image';
import { useGetRoadAddress } from '@/hooks/useGetRoadAddress';

const KakaoMap = () => {
  const [loading, error] = useKakaoMap();
  const { centerData, setCenterData } = useCenterState();

  const { data, isPending } = useGetRoadAddress(centerData.center);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <div>
      <div className={styles.map_container}>
        <Image src={'/pin.svg'} className={styles.center_pin} width={50} height={50} alt="pin" />
        <Map
          center={centerData.center}
          className={styles.map}
          onDragStart={() => {}}
          onDragEnd={(map) => dragCenter(map, setCenterData)}
        >
          {centerData.isLoading && <div>위치 정보를 불러오고 있습니다.</div>}
        </Map>
      </div>
      <div>{`lat: ${centerData.center.lat} lng: ${centerData.center.lng}`}</div>
      <div>{data?.road_address?.address_name || data?.address?.address_name}</div>
    </div>
  );
};

export default KakaoMap;
