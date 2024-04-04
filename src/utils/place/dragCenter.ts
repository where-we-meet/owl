import type { CenterData } from '@/types/place.types';
import type { SetStateAction, Dispatch } from 'react';

export const dragCenter = (map: kakao.maps.Map, setStater: Dispatch<SetStateAction<CenterData>>) => {
  const latlng = map.getCenter();
  setStater((prev) => ({ ...prev, center: { lat: latlng.getLat(), lng: latlng.getLng() } }));
};
