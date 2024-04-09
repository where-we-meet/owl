import { useGetRoadAddress, useGetSearchCategory } from '@/hooks/useGetPlace';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHalfwayDataStore, useRoomUserDataStore, useSearchDataStore } from '@/store/store';
import _ from 'lodash';
import { calcHalfwayPoint } from '@/utils/place/calcHalfwayPoint';

export const useMapController = () => {
  const [isGpsLoading, setIsGpsLoading] = useState(true);
  const [errorMassage, setErrorMassage] = useState('');
  const [isDrag, setIsDrag] = useState(false);

  const { location, address, searchOption, setLocation, setAddress } = useSearchDataStore((state) => state);
  const roomUsers = useRoomUserDataStore((state) => state.roomUsers);
  const updateHalfwayData = useHalfwayDataStore((state) => state.updateHalfwayData);

  const { data: searchAddress, isPending: isAddressPending } = useGetRoadAddress(location, isDrag);
  const { data: searchCategory, isPending: isCategoryPending } = useGetSearchCategory(searchOption);

  const halfwayPoint = useMemo(() => calcHalfwayPoint(roomUsers), [roomUsers]);

  const setCenter = (map: kakao.maps.Map) => {
    const latlng = map.getCenter();
    setLocation({ lat: latlng.getLat(), lng: latlng.getLng() });
  };

  const handleChangeCenter = useCallback(_.debounce(setCenter, 1000), []);

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude, // 위도
            lng: position.coords.longitude // 경도
          });
          setIsGpsLoading(false);
        },
        (err) => {
          setErrorMassage(err.message);
          setIsGpsLoading(false);
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setErrorMassage('geolocation을 사용할수 없어요..');
      setIsGpsLoading(false);
    }
  }, []);

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
    setLocation,
    handleChangeCenter,
    isGpsLoading,
    isDrag,
    setIsDrag,
    halfwayPoint,
    roomUsers,
    searchCategory
  };
};
