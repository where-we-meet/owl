import { useGetSearchCategory } from '@/hooks/useGetPlace';
import { useEffect, useMemo, useState } from 'react';
import { useHalfwayDataStore, useRoomUserDataStore, useSearchDataStore } from '@/store/placeStore';
import _ from 'lodash';
import { calcHalfwayPoint } from '@/utils/place/calcHalfwayPoint';

export const useMapController = () => {
  const [isDrag, setIsDrag] = useState(false);

  const { location, address, searchOption, setLocation } = useSearchDataStore((state) => state);
  const roomUsers = useRoomUserDataStore((state) => state.roomUsers);
  const updateHalfwayData = useHalfwayDataStore((state) => state.updateHalfwayData);

  const { data: searchCategory, isPending: isCategoryPending } = useGetSearchCategory(searchOption);

  const halfwayPoint = useMemo(() => calcHalfwayPoint(roomUsers), [roomUsers]);

  useEffect(() => {
    if (halfwayPoint) {
      updateHalfwayData({ lat: halfwayPoint.lat, lng: halfwayPoint.lng });
    }
  }, [halfwayPoint]);

  return {
    location,
    address,
    setLocation,
    isDrag,
    setIsDrag,
    halfwayPoint,
    roomUsers,
    searchCategory
  };
};
