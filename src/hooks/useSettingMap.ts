'use client';

import debounce from 'lodash-es/debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGpsStatusStore, useSearchDataStore } from '@/store/placeStore';
import { useQueryAddress } from './useQueryPlace';
import { useHalfwayDataStore } from '@/store/halfwayStore';
import { calcHalfwayPoint } from '@/utils/place/calcHalfwayPoint';
import { useQueryRoomUsers } from './useQueryRoomUsers';

export const useSettingMap = () => {
  const [isDrag, setIsDrag] = useState(false);
  const { roomUsers } = useQueryRoomUsers();
  const {
    currentUser: [roomUser]
  } = useQueryRoomUsers();

  const { location, address, setLocation, setAddress } = useSearchDataStore((state) => state);
  const isGpsLoading = useGpsStatusStore((state) => state.isGpsLoading);
  const updateHalfwayData = useHalfwayDataStore((state) => state.updateHalfwayData);

  const { data: searchAddress, isPending: isAddressPending } = useQueryAddress(location, isDrag);

  const isPinned = !!roomUser?.start_location;

  const halfwayPoint = useMemo(() => calcHalfwayPoint(roomUsers), [roomUsers]);

  const setCenter = (map: kakao.maps.Map) => {
    const latlng = map.getCenter();
    setLocation({ lat: latlng.getLat(), lng: latlng.getLng() });
  };

  const handleChangeCenter = useCallback(debounce(setCenter, 200), []);

  useEffect(() => {
    if (searchAddress) {
      const address = searchAddress.road_address?.address_name || searchAddress.address?.address_name;
      setAddress(address);
    }
  }, [searchAddress]);

  useEffect(() => {
    if (halfwayPoint) {
      updateHalfwayData({ lat: halfwayPoint.lat, lng: halfwayPoint.lng });
    }
  }, [halfwayPoint]);

  return {
    location,
    address,
    handleChangeCenter,
    isDrag,
    setIsDrag,
    isPinned,
    isGpsLoading,
    halfwayPoint,
    roomUsers,
    roomUser
  };
};
