import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { RoomUser } from '@/types/roomUser';
import { useQueryRoomUsers } from './useQueryRoomUsers';
import { useRoomUserDataStore } from '@/store/roomUserStore';

export const useGetRoomUsers = (roomId: string, userId: string) => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { roomUsers, isPending } = useQueryRoomUsers(roomId, userId);

  const setRoomUser = useRoomUserDataStore((state) => state.setRoomUser);

  useEffect(() => {
    const subscription = supabase
      .channel('room')
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
          queryClient.refetchQueries({ queryKey: ['myRooms', userId] });
        }
      )
      .subscribe((status, err) => {
        if (status === 'SUBSCRIBED') {
          console.log('연결됨!');
        }

        if (status === 'CHANNEL_ERROR') {
          console.error(`에러 : ${err?.message}`);
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

  useEffect(() => {
    const userInfo = roomUsers.find((user) => user.user_id === userId);
    if (userInfo) setRoomUser(userInfo);
  }, [roomUsers]);

  return { roomUsers, isPending };
};
