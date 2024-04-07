import { getCurrentUserData, getRoomUsersData } from '@/api/supabaseCSR/supabase';
import { useRoomUserDataStore } from '@/store/store';
import { RoomUser } from '@/types/roomUser';
import { createClient } from '@/utils/supabase/client';
import { useEffect } from 'react';

export const useGetRoomData = (id: string) => {
  const supabase = createClient();
  const setRoomUsers = useRoomUserDataStore((state) => state.setRoomUsers);
  const updateRoomUserData = useRoomUserDataStore((state) => state.updateRoomUserData);

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
    };
    getUserData();
  }, []);

  useEffect(() => {
    const subscription = supabase
      .channel('room')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'userdata_room', filter: `room_id=eq.${id}` },
        async (payload) => {
          const changed = payload.new as RoomUser;
          updateRoomUserData(changed);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [id]);
};
