import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useCenterState } from '@/hooks/useCenterState';

import { dragCenter } from '@/utils/place/dragCenter';
import styles from './KakaoMap.module.css';
import Image from 'next/image';
import { useGetRoadAddress } from '@/hooks/useGetPlace';
import RangeController from './RangeController';
import { useEffect, useState } from 'react';
import { useSearchDataStore } from '@/store/store';

const KakaoMap = () => {
  const [isDrag, setIsDrag] = useState(false);
  const [addressName, setAddressName] = useState('');

  const [loading, error] = useKakaoMap();

  const { centerData, setCenterData } = useCenterState();
  const { data, isPending } = useGetRoadAddress(centerData.center);

  const searchCenter = useSearchDataStore((state) => state.center);

  useEffect(() => {
    if (searchCenter) {
      setCenterData((prev) => ({ ...prev, center: { lat: searchCenter.lat, lng: searchCenter.lng } }));
      setAddressName(searchCenter.addressName);
    } else if (data) {
      const address = data.road_address?.address_name || data.address?.address_name;
      setAddressName(address);
    }
  }, [searchCenter, data]);

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
      <div>{addressName}</div>
    </div>
  );
};

export default KakaoMap;
