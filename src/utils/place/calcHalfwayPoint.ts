import calcCenterPoint from '@/utils/place/calcCenterPoint';
import convexHull from '@/utils/place/convexHull';

import type { RoomUser } from '@/types/roomUser';

export const calcHalfwayPoint = (roomUsers: RoomUser[]) => {
  if (roomUsers.length === 0) return { lat: null, lng: null };
  const hasLocationUsers = roomUsers
    .filter((user) => !!user.start_location)
    .map((user) => ({ location: { lat: Number(user.lat), lng: Number(user.lng) } }));
  if (hasLocationUsers.length === 1) {
    return hasLocationUsers[0].location;
  } else {
    const sortedMarkers = convexHull(hasLocationUsers);

    const halfwayPoint = calcCenterPoint(sortedMarkers);

    return halfwayPoint;
  }
};
