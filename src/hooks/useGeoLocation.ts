import { useGpsStatusStore, useSearchDataStore } from '@/store/placeStore';
import { myGeolocation } from '@/utils/place/myGeolocation';
import { useEffect } from 'react';
import { useQueryUser } from './useQueryUser';
import { useRoomUserDataStore } from '@/store/roomUserStore';

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
    if (roomUser && roomUser.start_location === '') {
      console.log('if', roomUser, roomUser.start_location);
      handleSetGeolocation();
    } else {
      console.log('else', roomUser, roomUser?.start_location);
      setIsGpsLoading(false);
    }
  }, [roomUser?.start_location]);

  return { handleSetGeolocation };
};
