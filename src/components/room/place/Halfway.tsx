import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import styles from './Halfway.module.css';

const Halfway = ({ location }: { location: { lat: number; lng: number } }) => {
  return (
    <CustomOverlayMap position={location} yAnchor={1} zIndex={6}>
      <div className={styles.halfway_container}>
        <img className={styles.marker} src="/images/center_owl.png" alt="user-avatar" />
      </div>
    </CustomOverlayMap>
  );
};

export default Halfway;
