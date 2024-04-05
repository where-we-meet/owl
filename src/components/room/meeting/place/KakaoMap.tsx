import Image from 'next/image';
import { Map } from 'react-kakao-maps-sdk';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useCenterState } from '@/hooks/useCenterState';

import RangeController from './RangeController';
import styles from './KakaoMap.module.css';

const KakaoMap = () => {
  const [loading, error] = useKakaoMap();

  const { userLocationData, handleChangeCenter, isGpsLoading, isDrag, setIsDrag, errorMassage } = useCenterState();

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
          <RangeController center={userLocationData.location} />
        </Map>
      </div>
      <div>{userLocationData.address}</div>
    </div>
  );
};

export default KakaoMap;
