import { deleteSelectedDate, upsertSelectedDate } from '@/api/supabaseCSR/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutateSchedule = (roomId: string) => {
  const queryClient = useQueryClient();

  const insertSchedule = useMutation({
    mutationFn: async (payload: { roomId: string; userId: string; date: Date }) => {
      await upsertSelectedDate(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room-user-schedules', roomId] });
    }
  });

  const deleteSchedule = useMutation({
    mutationFn: async (payload: { roomId: string; userId: string; date: Date }) => {
      await deleteSelectedDate(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room-user-schedules', roomId] });
    }
  });

  return { insertSchedule, deleteSchedule };
};
