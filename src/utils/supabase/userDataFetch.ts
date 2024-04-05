'use client';

import { getCurrentUserData, getRoomUsersData } from '@/api/supabaseCSR/supabase';

export const userDataFetch = async (id: string) => {
  const { user } = await getCurrentUserData();
  const userRoomData = await getRoomUsersData(id);
  const currentUserId = user.id;

  const adminUser = userRoomData.filter((user) => user.is_admin);
  const currentUser = userRoomData.filter((user) => !user.is_admin && user.user_id === currentUserId);
  const otherUsers = userRoomData.filter((user) => !user.is_admin && user.user_id !== currentUserId);

  const sortedUsers = [...adminUser, ...currentUser, ...otherUsers];

  return sortedUsers;
};
