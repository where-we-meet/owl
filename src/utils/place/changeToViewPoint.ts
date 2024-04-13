import { Place } from '@/types/place.types';

export const changeToViewPoint = (place: Place) => {
  return { name: place.place_name, addressName: place.road_address_name, lat: +place.y, lng: +place.x };
};
