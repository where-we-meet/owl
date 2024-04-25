import { useQueryAddress, useQuerySearchCategory } from '@/hooks/useQueryPlace';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRangeStore, useSearchDataStore } from '@/store/placeStore';
import { calcHalfwayPoint } from '@/utils/place/calcHalfwayPoint';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getRoomUsersData } from '@/api/supabaseCSR/supabase';
import { useHalfwayDataStore } from '@/store/halfwayStore';
import { debounce } from 'lodash';

export const useMapController = () => {
  const { id: roomId }: { id: string } = useParams();

  const [isDrag, setIsDrag] = useState(false);
  const [address, setAddress] = useState('');
  const [clickId, setClickId] = useState('');

  const { location, setLocation, searchOption } = useSearchDataStore((state) => state);
  const range = useRangeStore((state) => state.range);
  const updateHalfwayData = useHalfwayDataStore((state) => state.updateHalfwayData);

  const { data: roomUsers = [] } = useQuery({
    queryKey: ['room-users', roomId],
    queryFn: () => getRoomUsersData(roomId)
  });
  const { data: searchCategory, isPending: isCategoryPending } = useQuerySearchCategory(searchOption);

  const halfwayPoint = useMemo(() => calcHalfwayPoint(roomUsers), [roomUsers]);
  const { data } = useQueryAddress(halfwayPoint as { lat: number; lng: number }, false);

  const setCenter = (map: kakao.maps.Map) => {
    const latlng = map.getCenter();
    setLocation({ lat: latlng.getLat(), lng: latlng.getLng() });
  };

  const handleChangeCenter = useCallback(debounce(setCenter, 200), []);

  useEffect(() => {
    if (halfwayPoint.lat && halfwayPoint.lng) {
      updateHalfwayData({ lat: halfwayPoint.lat, lng: halfwayPoint.lng });
      setLocation({ lat: halfwayPoint.lat, lng: halfwayPoint.lng });
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
    location,
    range,
    address,
    halfwayPoint,
    roomUsers,
    searchCategory,
    clickId,
    setClickId,
    isDrag,
    setIsDrag,
    handleChangeCenter
  };
};
