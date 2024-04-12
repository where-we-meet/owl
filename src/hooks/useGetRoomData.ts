import { getRoomUsersData } from '@/api/supabaseCSR/supabase';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { RoomUser } from '@/types/roomUser';

export const useGetRoomData = (roomId: string, userId: string) => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { data = [] } = useQuery({ queryKey: ['roomUsers'], queryFn: () => getRoomUsersData(roomId) });
  const [roomUsers, setRoomUsers] = useState(data);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      const adminUser = data.filter((user) => user.is_admin);
      const currentUser = data.filter((user) => !user.is_admin && user.user_id === userId);
      const otherUsers = data.filter((user) => !user.is_admin && user.user_id !== userId);

      const sortedUsers = [...adminUser, ...currentUser, ...otherUsers];

      setRoomUsers(sortedUsers);
      setIsLoading(false);
    };
    getUserData();
  }, [data]);

  useEffect(() => {
    const subscription = supabase
      .channel('room')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'userdata_room', filter: `room_id=eq.${roomId}` },
        (payload) => {
          const updated = payload.new as RoomUser;
          const updatedRoomUsers = roomUsers.map((user) =>
            user.user_id === updated.user_id ? { ...user, start_location: updated.start_location } : user
          );
          queryClient.setQueryData(['roomUsers'], updatedRoomUsers);
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'userdata_room', filter: `room_id=eq.${roomId}` },
        (payload) => {
          console.log('insert');
          const updated = payload.new as RoomUser;
          queryClient.setQueryData(['roomUsers'], [...roomUsers, updated]);
        }
      )
      .subscribe((status, err) => {
        if (status === 'SUBSCRIBED') {
          console.log('연결됨!');
        }

        if (status === 'CHANNEL_ERROR') {
          console.log(`에러 : ${err?.message}`);
        }

        if (status === 'TIMED_OUT') {
          console.log('시간 초과');
        }

        if (status === 'CLOSED') {
          console.log('연결 끊김');
        }
      });

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [supabase, roomUsers]);

  return { roomUsers, isLoading };
};
