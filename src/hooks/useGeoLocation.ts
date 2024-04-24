import { useGpsStatusStore, useSearchDataStore } from '@/store/placeStore';
import { GeolocationResult, myGeolocation } from '@/utils/place/myGeolocation';

export const useGeoLocation = () => {
  const setLocation = useSearchDataStore((state) => state.setLocation);
  const { setIsGpsLoading, setErrorMessage } = useGpsStatusStore((state) => state);

  const handleSetGeolocation = async () => {
    try {
      setIsGpsLoading(true);
      const { lat, lng, status, errorMessage }: GeolocationResult = await myGeolocation();
      if (lat && lng) {
        setLocation({ lat, lng });
        setIsGpsLoading(status);
      } else if (errorMessage) {
        alert('현재 위치를 가져오려면 위치 권한을 승인해주세요.');
        setErrorMessage(errorMessage);
        setIsGpsLoading(status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleSetGeolocation };
};
