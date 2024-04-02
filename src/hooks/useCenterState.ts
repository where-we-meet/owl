import { CenterData } from '@/types/place.types';
import { useEffect, useState } from 'react';

export const useCenterState = () => {
  const [centerData, setCenterData] = useState<CenterData>({
    center: {
      lat: 33.450701,
      lng: 126.570667
    },
    errMsg: null,
    isLoading: true,
    roadAddress: null
  });

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenterData((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude // 경도
            },
            isLoading: false
          }));
        },
        (err) => {
          setCenterData((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setCenterData((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false
      }));
    }
  }, []);

  return { centerData, setCenterData };
};
