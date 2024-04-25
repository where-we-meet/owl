import type { RoomUser } from '@/types/roomUser';

export function mergeRoomUsersById(
  roomUsers: Omit<RoomUser, 'name' | 'profile_url'>[],
  userProfiles: Pick<RoomUser, 'name' | 'profile_url'>[]
) {
  let mergedArray: RoomUser[] = [];

  roomUsers.forEach((roomUser) => {
    let userProfile = userProfiles.find((profile: Partial<RoomUser>) => profile.id === roomUser.user_id);

    if (userProfile) {
      const mergedObj = {
        id: roomUser.id,
        created_at: roomUser.created_at,
        is_admin: roomUser.is_admin,
        lat: roomUser.lat,
        lng: roomUser.lng,
        start_location: roomUser.start_location,
        user_id: roomUser.user_id,
        name: userProfile.name,
        profile_url: userProfile.profile_url
      };
      mergedArray.push(mergedObj);
    }
  });

  return mergedArray;
}
