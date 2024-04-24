import { useGeoLocation } from '@/hooks/useGeoLocation';

import { MdGpsFixed } from 'react-icons/md';
import styles from './GeolocationButton.module.css';
import AlertModal from './AlertModal';

const GeolocationButton = () => {
  const { isOpen, onOpenChange, handleSetGeolocation } = useGeoLocation();
  return (
    <>
      <div className={styles.wrapper} onClick={handleSetGeolocation}>
        <MdGpsFixed size={25} />
      </div>

      <AlertModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default GeolocationButton;
