import { useGpsStatusStore, useRoomUserDataStore, useSearchDataStore } from '@/store/placeStore';
import { myGeolocation } from '@/utils/place/myGeolocation';
import { useEffect } from 'react';
import { useQueryUser } from './useQueryUser';

export const useGeoLocation = () => {
  const setLocation = useSearchDataStore((state) => state.setLocation);
  const { setIsGpsLoading, setErrorMessage } = useGpsStatusStore((state) => state);
  const roomUsers = useRoomUserDataStore((state) => state.roomUsers);

  const { id } = useQueryUser();
  const user = roomUsers.find((user) => user.user_id === id);

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
    if (user && user.start_location === '') {
      console.log('if', user, user.start_location);
      handleSetGeolocation();
    } else {
      console.log('else', user, user?.start_location);
      setIsGpsLoading(false);
    }
  }, [user?.start_location]);

  return { handleSetGeolocation };
};
