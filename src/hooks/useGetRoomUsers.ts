import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useQueryRoomUsers } from './useQueryRoomUsers';
import type { RoomUser } from '@/types/roomUser';

export const useGetRoomUsers = (roomId: string, userId: string) => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { roomUsers, isPending } = useQueryRoomUsers();

  useEffect(() => {
    const subscription = supabase
      .channel(`room-${roomId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'userdata_room', filter: `room_id=eq.${roomId}` },
        (payload) => {
          const updated = payload.new as RoomUser;
          const updatedRoomUsers = roomUsers.map((user) =>
            user.user_id === updated.user_id ? { ...user, ...updated } : user
          );
          queryClient.setQueryData(['room-users', roomId], updatedRoomUsers);
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'userdata_room', filter: `room_id=eq.${roomId}` },
        (_payload) => {
          queryClient.refetchQueries({ queryKey: ['room-users', roomId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [supabase, roomUsers]);

  return { roomUsers, isPending };
};
