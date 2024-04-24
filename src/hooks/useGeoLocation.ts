import { useGpsStatusStore, useSearchDataStore } from '@/store/placeStore';
import { GeolocationResult, myGeolocation } from '@/utils/place/myGeolocation';
import { useDisclosure } from '@nextui-org/react';

export const useGeoLocation = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
        onOpen();
        setErrorMessage(errorMessage);
        setIsGpsLoading(status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleSetGeolocation, isOpen, onOpen, onOpenChange };
};
