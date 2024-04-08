import { useRoomUserDataStore } from '@/store/store';
import type { RoomUser } from '@/types/roomUser';
import calcCenterPoint from '@/utils/place/calcCenterPoint';
import convexHull from '@/utils/place/convexHull';
import { useEffect, useState } from 'react';

export const useGetHalfway = (roomUsers: RoomUser[]) => {
  const [halfwayPoint, setHalfwayPoint] = useState({ lat: 0, lng: 0 });

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
  }, [result?.lat, result?.lng]);

  return { halfwayPoint };
};
