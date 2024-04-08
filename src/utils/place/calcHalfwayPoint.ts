import calcCenterPoint from '@/utils/place/calcCenterPoint';
import convexHull from '@/utils/place/convexHull';

import type { RoomUser } from '@/types/roomUser';

export const calcHalfwayPoint = (roomUsers: RoomUser[]) => {
  const hasLocationUsers = roomUsers
    .filter((user) => !!user.start_location)
    .map((user) => ({ location: { lat: Number(user.lat), lng: Number(user.lng) } }));
  const sortedMarkers = convexHull(hasLocationUsers);
  const result = calcCenterPoint(sortedMarkers);
  return result;
};
