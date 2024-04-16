import { useGpsStatusStore, useSearchDataStore } from '@/store/placeStore';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useGetRoadAddress } from './useGetPlace';
import { useQueryUser } from './useQueryUser';
import { useRoomUserDataStore } from '@/store/roomUserStore';

export const useSettingMap = () => {
  const [isDrag, setIsDrag] = useState(false);

  const { location, address, setLocation, setAddress } = useSearchDataStore((state) => state);
  const { isGpsLoading, setIsGpsLoading } = useGpsStatusStore((state) => state);
  const roomUsers = useRoomUserDataStore((state) => state.roomUsers);

  const { id: userId } = useQueryUser();
  const { data: searchAddress, isPending: isAddressPending } = useGetRoadAddress(location, isDrag);

  const setCenter = (map: kakao.maps.Map) => {
    const latlng = map.getCenter();
    setLocation({ lat: latlng.getLat(), lng: latlng.getLng() });
  };

  const handleChangeCenter = useCallback(_.debounce(setCenter, 1000), []);

  const roomUser = roomUsers.find((user) => user.user_id === userId);

  useEffect(() => {
    const location = { lat: Number(roomUser?.lat), lng: Number(roomUser?.lng) };
    if (location.lat && location.lng) {
      setLocation(location);
      setIsGpsLoading(false);
    }
  }, [roomUser]);

  useEffect(() => {
    if (searchAddress) {
      const address = searchAddress.road_address?.address_name || searchAddress.address?.address_name;
      setAddress(address);
    }
  }, [searchAddress]);

  return {
    location,
    address,
    handleChangeCenter,
    isDrag,
    setIsDrag,
    isGpsLoading
  };
};
