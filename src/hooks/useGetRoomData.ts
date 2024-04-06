import { RoomUser } from '@/types/roomUser';
import { createClient } from '@/utils/supabase/client';
import { userDataFetch } from '@/utils/supabase/userDataFetch';
import { useEffect, useState } from 'react';

export const useGetRoomData = (id: string) => {
  const supabase = createClient();
  const [roomUsers, setRoomUsers] = useState<RoomUser[]>([]);

  useEffect(() => {
    const sortedUserData = async () => {
      const data = await userDataFetch(id);
      setRoomUsers(data);
    };
    sortedUserData();
  }, []);

  useEffect(() => {
    const subscription = supabase
      .channel('room')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'userdata_room', filter: `room_id=eq.${id}` },
        async (payload) => {
          const changed = payload.new as RoomUser;
          setRoomUsers((prev) =>
            prev.map((user) => (user.id === changed.id ? { ...user, start_location: changed.start_location } : user))
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [id]);

  return { roomUsers };
};
