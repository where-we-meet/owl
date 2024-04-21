import { useEffect } from 'react';
import { useGpsStatusStore, useSearchDataStore } from '@/store/placeStore';
import { useRoomUserDataStore } from '@/store/roomUserStore';
import { myGeolocation } from '@/utils/place/myGeolocation';

export const useGeoLocation = () => {
  const setLocation = useSearchDataStore((state) => state.setLocation);
  const { setIsGpsLoading, setErrorMessage } = useGpsStatusStore((state) => state);
  const roomUser = useRoomUserDataStore((state) => state.roomUser);

  const handleSetGeolocation = async () => {
    setIsGpsLoading(true);
    const {
      lat,
      lng,
      status,
      errorMessage
    }: { lat: number | null; lng: number | null; status: boolean; errorMessage: string | null } = await myGeolocation();
    if (lat && lng) {
      setLocation({ lat, lng });
      setIsGpsLoading(status);
    } else if (errorMessage) {
      setErrorMessage(errorMessage);
      setIsGpsLoading(status);
    }
  };

  useEffect(() => {
    if (roomUser) {
      if (roomUser.start_location !== '' && roomUser.start_location !== null) {
        setIsGpsLoading(false);
      } else {
        handleSetGeolocation();
      }
    } else {
      handleSetGeolocation();
    }
  }, []);

  return { handleSetGeolocation };
};
