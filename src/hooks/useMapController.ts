import { useGetRoadAddress } from '@/hooks/useGetPlace';
import { useCallback, useEffect, useState } from 'react';
import { useSearchDataStore } from '@/store/store';
import _ from 'lodash';

export const useMapController = () => {
  const [isGpsLoading, setIsGpsLoading] = useState(true);
  const [errorMassage, setErrorMassage] = useState('');
  const [isDrag, setIsDrag] = useState(false);

  const userLocationData = useSearchDataStore((state) => state);
  const setLocation = useSearchDataStore((state) => state.setLocation);
  const setAddress = useSearchDataStore((state) => state.setAddress);

  const { data, isPending } = useGetRoadAddress(userLocationData.location, isDrag);

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
    if (data) {
      const address = data.road_address?.address_name || data.address?.address_name;
      setAddress(address);
    }
  }, [data]);

  return { userLocationData, setLocation, handleChangeCenter, isGpsLoading, isDrag, setIsDrag, errorMassage };
};
