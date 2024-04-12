import { useGeoLocation } from '@/hooks/useGeoLocation';
import { Button } from '@nextui-org/react';
import { MdGpsFixed } from 'react-icons/md';

const GeolocationButton = () => {
  const { handleSetGeolocation } = useGeoLocation();
  return <MdGpsFixed style={{ cursor: 'pointer' }} onClick={handleSetGeolocation} />;
};

export default GeolocationButton;
