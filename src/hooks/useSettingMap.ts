'use client';

import { useGpsStatusStore, useSearchDataStore } from '@/store/placeStore';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useGetRoadAddress } from './useGetPlace';
import { useRoomUserDataStore } from '@/store/roomUserStore';

export const useSettingMap = () => {
  const [isDrag, setIsDrag] = useState(false);

  const { location, address, setLocation, setAddress } = useSearchDataStore((state) => state);
  const roomUser = useRoomUserDataStore((state) => state.roomUser);
  const { isGpsLoading, setIsGpsLoading } = useGpsStatusStore((state) => state);

  const { data: searchAddress, isPending: isAddressPending } = useGetRoadAddress(location, isDrag);

  const setCenter = (map: kakao.maps.Map) => {
    const latlng = map.getCenter();
    setLocation({ lat: latlng.getLat(), lng: latlng.getLng() });
  };

  const handleChangeCenter = useCallback(_.debounce(setCenter, 1000), []);

  useEffect(() => {
    if (roomUser && roomUser.lat && roomUser.lng) setLocation({ lat: +roomUser.lat, lng: +roomUser.lng });
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
