import { useEffect, useState } from 'react';

import calcCenterPoint from '@/utils/place/calcCenterPoint';
import convexHull from '@/utils/place/convexHull';

import type { Halfway } from '@/types/place.types';
import type { RoomUser } from '@/types/roomUser';

export const useGetHalfway = (roomUsers: RoomUser[]) => {
  const [halfwayPoint, setHalfwayPoint] = useState<Halfway>({ lat: null, lng: null });

  const hasLocationUsers = roomUsers
    .filter((user) => !!user.start_location)
    .map((user) => ({ location: { lat: Number(user.lat), lng: Number(user.lng) } }));
  const sortedMarkers = convexHull(hasLocationUsers);
  const result = calcCenterPoint(sortedMarkers);
  const numberOfStartLocation = hasLocationUsers.length;

  useEffect(() => {
    if (result && numberOfStartLocation >= 2) {
      setHalfwayPoint(result);
    }
  }, [result.lat, result.lng]);

  return { halfwayPoint };
};
