import { useGeoLocation } from '@/hooks/useGeoLocation';

import { MdGpsFixed } from 'react-icons/md';
import styles from './GeolocationButton.module.css';

const GeolocationButton = () => {
  const { handleSetGeolocation } = useGeoLocation();
  return (
    <div className={styles.wrapper} onClick={handleSetGeolocation}>
      <MdGpsFixed size={25} />
    </div>
  );
};

export default GeolocationButton;
