import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryAddress, useQuerySearchCategory } from '@/hooks/useQueryPlace';
import { useRangeStore, useSearchDataStore } from '@/store/placeStore';
import { calcHalfwayPoint } from '@/utils/place/calcHalfwayPoint';
import { useHalfwayDataStore } from '@/store/halfwayStore';
import { useQueryRoomUsers } from './useQueryRoomUsers';

export const useMapController = () => {
  const [isDrag, setIsDrag] = useState(false);
  const [address, setAddress] = useState('');
  const [clickId, setClickId] = useState('');

  const { location, setLocation, searchOption } = useSearchDataStore((state) => state);
  const range = useRangeStore((state) => state.range);
  const { setHalfwayPoint, setHalfwayAddress } = useHalfwayDataStore((state) => state);

  const { roomUsers } = useQueryRoomUsers();
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
      setHalfwayPoint({ lat: halfwayPoint.lat, lng: halfwayPoint.lng });
      setLocation({ lat: halfwayPoint.lat, lng: halfwayPoint.lng });
    }
  }, []);

  useEffect(() => {
    if (data) {
      const address = data.road_address?.address_name || data.address?.address_name;
      setAddress(address);
      setHalfwayAddress(address);
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
