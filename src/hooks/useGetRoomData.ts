import { getCurrentUserData, getRoomUsersData } from '@/api/supabaseCSR/supabase';
import { useRoomUserDataStore } from '@/store/store';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

import type { RoomUser } from '@/types/roomUser';

export const useGetRoomData = (id: string) => {
  const supabase = createClient();
  const roomUsers = useRoomUserDataStore((state) => state.roomUsers);
  const setRoomUsers = useRoomUserDataStore((state) => state.setRoomUsers);
  const addRoomUserData = useRoomUserDataStore((state) => state.addRoomUserData);
  const updateRoomUserData = useRoomUserDataStore((state) => state.updateRoomUserData);
  const [userId, setUserId] = useState<string | null>(null);

  const roomUsersLength = roomUsers.length;

  useEffect(() => {
    const getUserData = async () => {
      const {
        user: { id: currentUserId }
      } = await getCurrentUserData();

      const users = await getRoomUsersData(id);

      const adminUser = users.filter((user) => user.is_admin);
      const currentUser = users.filter((user) => !user.is_admin && user.user_id === currentUserId);
      const otherUsers = users.filter((user) => !user.is_admin && user.user_id !== currentUserId);

      const sortedUsers = [...adminUser, ...currentUser, ...otherUsers];

      setRoomUsers(sortedUsers);
      setUserId(currentUserId);
    };
    getUserData();
  }, [roomUsersLength]);

  useEffect(() => {
    const subscription = supabase
      .channel('room')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'userdata_room', filter: `room_id=eq.${id}` },
        (payload) => {
          updateRoomUserData(payload.new as RoomUser);
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'userdata_room', filter: `room_id=eq.${id}` },
        (payload) => {
          addRoomUserData(payload.new as RoomUser);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [id]);

  return { userId };
};
