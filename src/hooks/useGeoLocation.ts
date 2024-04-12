import { useGpsStatusStore, useRoomUserDataStore, useSearchDataStore } from '@/store/placeStore';
import { myGeolocation } from '@/utils/place/myGeolocation';
import { useEffect } from 'react';
import { useQueryUser } from './useQueryUser';

export const useGeoLocation = () => {
  const setLocation = useSearchDataStore((state) => state.setLocation);
  const { setIsGpsLoading, setErrorMessage } = useGpsStatusStore((state) => state);
  const roomUsers = useRoomUserDataStore((state) => state.roomUsers);

  const { id } = useQueryUser();

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

  const roomUser = roomUsers.find((user) => user.user_id === id);

  useEffect(() => {
    if (roomUser?.start_location) {
      setIsGpsLoading(false);
    } else {
      handleSetGeolocation();
    }
  }, []);

  return { handleSetGeolocation };
};
