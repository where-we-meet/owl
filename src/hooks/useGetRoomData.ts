import { RoomUser } from '@/types/roomUser';
import { createClient } from '@/utils/supabase/client';
import { userDataFetch } from '@/utils/supabase/userDataFetch';
import { useEffect, useState } from 'react';

export const useGetRoomData = (id: string) => {
  const supabase = createClient();
  const [roomUsers, setRoomUsers] = useState<RoomUser[]>([]);

  useEffect(() => {
    const subscription = supabase
      .channel('room')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'userdata_room', filter: `room_id=eq.${id}` },
        async (payload) => {
          setRoomUsers([...roomUsers, payload.new as RoomUser]);
        }
      )
      .subscribe();

    const sortedUserData = async () => {
      const data = await userDataFetch(id);
      setRoomUsers(data);
    };
    sortedUserData();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [id, roomUsers]);

  return { roomUsers };
};
