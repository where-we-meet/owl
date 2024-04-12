import Image from 'next/image';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useMapController } from '@/hooks/useMapController';
import { Map } from 'react-kakao-maps-sdk';
import styles from './KakaoMap.module.css';

const SettingMap = () => {
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

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <>
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
        />
        <div>{address}</div>
      </div>
    </>
  );
};

export default SettingMap;
