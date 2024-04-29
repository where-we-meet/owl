import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useQuerySearchCategory } from '@/hooks/useQueryPlace';
import { useRangeStore, useSearchDataStore } from '@/store/placeStore';
import { useQueryRoomUsers } from './useQueryRoomUsers';
import { useQueryRoomData } from './useQueryRoomData';

type latlng = {
  lat: number | null;
  lng: number | null;
};

export const useMapController = () => {
  const [isDrag, setIsDrag] = useState(false);
  const [halfwayPoint, setHalfwayPoint] = useState<latlng>({ lat: null, lng: null });
  const [clickId, setClickId] = useState('');

  const { location, setLocation, searchOption } = useSearchDataStore((state) => state);
  const range = useRangeStore((state) => state.range);

  const { roomUsers } = useQueryRoomUsers();
  const { data: searchCategory } = useQuerySearchCategory(searchOption);

  const { data: room } = useQueryRoomData();

  const setCenter = (map: kakao.maps.Map) => {
    const latlng = map.getCenter();
    setLocation({ lat: latlng.getLat(), lng: latlng.getLng() });
  };

  const handleChangeCenter = useCallback(debounce(setCenter, 200), []);

  useEffect(() => {
    if (room && room.lat && room.lng) {
      setHalfwayPoint({ lat: +room.lat, lng: +room.lng });
      setLocation({ lat: +room.lat, lng: +room.lng });
    }
  }, [room]);

  return {
    location,
    halfwayPoint,
    range,
    roomUsers,
    searchCategory,
    clickId,
    setClickId,
    isDrag,
    setIsDrag,
    handleChangeCenter
  };
};
