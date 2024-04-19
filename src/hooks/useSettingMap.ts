'use client';

import { useGpsStatusStore, useSearchDataStore } from '@/store/placeStore';
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetRoadAddress } from './useGetPlace';
import { useRoomUserDataStore } from '@/store/roomUserStore';
import { useHalfwayDataStore } from '@/store/halfwayStore';
import { getRoomUsersData } from '@/api/supabaseCSR/supabase';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { calcHalfwayPoint } from '@/utils/place/calcHalfwayPoint';

export const useSettingMap = () => {
  const { id: roomId }: { id: string } = useParams();
  const [isDrag, setIsDrag] = useState(false);

  const { location, address, setLocation, setAddress } = useSearchDataStore((state) => state);
  const isGpsLoading = useGpsStatusStore((state) => state.isGpsLoading);
  const { data: searchAddress, isPending: isAddressPending } = useGetRoadAddress(location, isDrag);
  const { data: roomUsers = [] } = useQuery({ queryKey: ['roomUsers'], queryFn: () => getRoomUsersData(roomId) });

  const updateHalfwayData = useHalfwayDataStore((state) => state.updateHalfwayData);

  const roomUser = useRoomUserDataStore((state) => state.roomUser);

  const isPinned = !!roomUser?.start_location;

  const halfwayPoint = useMemo(() => calcHalfwayPoint(roomUsers), [roomUsers]);

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
