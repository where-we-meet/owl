import { useGpsStatusStore, useSearchDataStore } from '@/store/placeStore';
import { myGeolocation } from '@/utils/place/myGeolocation';
import { useEffect } from 'react';

export const useGeoLocation = () => {
  const { location, setLocation } = useSearchDataStore((state) => state);
  const { setIsGpsLoading, setErrorMessage } = useGpsStatusStore((state) => state);

  const handleSetGeolocation = async () => {
    setIsGpsLoading(true);
    const { lat, lng, status, errorMessage } = await myGeolocation();
    if (lat && lng) {
      setLocation({ lat, lng });
      setIsGpsLoading(status);
    } else if (errorMessage) {
      setErrorMessage(errorMessage);
      setIsGpsLoading(status);
    }
  };

  useEffect(() => {
    if (!location) {
      handleSetGeolocation();
    } else {
      setIsGpsLoading(false);
    }
  }, []);

  return { handleSetGeolocation };
};
