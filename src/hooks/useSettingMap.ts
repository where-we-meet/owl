'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash-es/debounce';
import { useGpsStatusStore, useSearchDataStore } from '@/store/placeStore';
import { useQueryAddress } from './useQueryPlace';
import { useQueryRoomUsers } from './useQueryRoomUsers';
import { useHalfwayDataStore } from '@/store/halfwayStore';
import { calcHalfwayPoint } from '@/utils/place/calcHalfwayPoint';

export const useSettingMap = () => {
  const [isDrag, setIsDrag] = useState(false);
  const {
    roomUsers,
    currentUser: [roomUser]
  } = useQueryRoomUsers();

  const isGpsLoading = useGpsStatusStore((state) => state.isGpsLoading);
  const { location, address, setLocation, setAddress } = useSearchDataStore((state) => state);
  const { setHalfwayPoint, setHalfwayAddress } = useHalfwayDataStore((state) => state);

  const halfwayPoint = useMemo(() => calcHalfwayPoint(roomUsers), [roomUsers]);

  const isPinned = !!roomUser?.start_location;

  const { data: searchAddress, isPending: isAddressPending } = useQueryAddress(location, isDrag);
  const { data: halfwayPointAddress, isPending: halfwayPointAddressPending } = useQueryAddress(halfwayPoint, false);

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
    if (halfwayPoint.lat && halfwayPoint.lng && halfwayPointAddress) {
      const address = halfwayPointAddress.road_address?.address_name || halfwayPointAddress.address?.address_name;
      setHalfwayPoint({ lat: halfwayPoint.lat, lng: halfwayPoint.lng });
      setHalfwayAddress(address);
    }
  }, [halfwayPoint.lat, halfwayPoint.lng, halfwayPointAddress]);

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
