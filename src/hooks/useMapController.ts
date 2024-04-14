import { useGetRoadAddress, useGetSearchCategory } from '@/hooks/useGetPlace';
import { useEffect, useMemo, useState } from 'react';
import { useHalfwayDataStore, useRangeStore, useSearchDataStore } from '@/store/placeStore';
import _ from 'lodash';
import { calcHalfwayPoint } from '@/utils/place/calcHalfwayPoint';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getRoomUsersData } from '@/api/supabaseCSR/supabase';

export const useMapController = () => {
  const { id: roomId }: { id: string } = useParams();

  const [address, setAddress] = useState('');

  const { searchOption } = useSearchDataStore((state) => state);
  const range = useRangeStore((state) => state.range);
  const updateHalfwayData = useHalfwayDataStore((state) => state.updateHalfwayData);

  const { data: roomUsers = [] } = useQuery({ queryKey: ['roomUsers'], queryFn: () => getRoomUsersData(roomId) });
  const { data: searchCategory, isPending: isCategoryPending } = useGetSearchCategory(searchOption);

  const halfwayPoint = useMemo(() => calcHalfwayPoint(roomUsers), [roomUsers]);
  const { data } = useGetRoadAddress(halfwayPoint as { lat: number; lng: number }, false);

  useEffect(() => {
    if (halfwayPoint) {
      updateHalfwayData({ lat: halfwayPoint.lat, lng: halfwayPoint.lng });
    }
  }, [halfwayPoint]);

  useEffect(() => {
    if (data) {
      const address = data.road_address?.address_name || data.address?.address_name;
      setAddress(address);
      updateHalfwayData({ location: address });
    }
  }, [data]);

  return {
    range,
    address,
    halfwayPoint,
    roomUsers,
    searchCategory
  };
};
