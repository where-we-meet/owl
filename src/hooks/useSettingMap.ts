import { useGpsStatusStore, useSearchDataStore } from '@/store/placeStore';
import { myGeolocation } from '@/utils/place/myGeolocation';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useGetRoadAddress } from './useGetPlace';

export const useSettingMap = () => {
  const [isDrag, setIsDrag] = useState(false);

  const { location, address, setLocation, setAddress } = useSearchDataStore((state) => state);
  const isGpsLoading = useGpsStatusStore((state) => state.isGpsLoading);

  const { data: searchAddress, isPending: isAddressPending } = useGetRoadAddress(location, isDrag);

  const setCenter = (map: kakao.maps.Map) => {
    const latlng = map.getCenter();
    setLocation({ lat: latlng.getLat(), lng: latlng.getLng() });
  };

  const handleChangeCenter = useCallback(_.debounce(setCenter, 1000), []);

  useEffect(() => {
    if (searchAddress) {
      const address = searchAddress.road_address?.address_name || searchAddress.address?.address_name;
      setAddress(address);
    }
  }, [searchAddress]);

  return {
    location,
    address,
    handleChangeCenter,
    isDrag,
    setIsDrag,
    isGpsLoading
  };
};
