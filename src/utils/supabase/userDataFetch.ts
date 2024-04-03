'use client';

import { getCurrentUserData, getRoomUsersData } from '@/api/supabase';
import { RoomData } from '@/components/room/sidebar/user/UserList';

export const userDataFetch = async (id: string, setRoomData: (roomData: RoomData) => void) => {
  const { user } = await getCurrentUserData();
  const userRoomData = await getRoomUsersData(id);
  const currentUserId = user.id;

  const adminUser = userRoomData.filter((user) => user.is_admin);
  const currentUser = userRoomData.filter((user) => !user.is_admin && user.user_id === currentUserId);
  const otherUsers = userRoomData.filter((user) => !user.is_admin && user.user_id !== currentUserId);

  const sortedUsers = [...adminUser, ...currentUser, ...otherUsers];
  setRoomData(sortedUsers);
};
