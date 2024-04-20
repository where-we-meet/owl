import { upsertSchedule, updateStartLocation, deleteMySchedules } from '@/api/supabaseCSR/supabase';
import { UserLocationData } from '@/types/place.types';
import { UpsertUserSchedule } from '@/types/roomUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Payload = {
  userLocationData: UserLocationData;
  userSchedules: UpsertUserSchedule[];
};

export const useMutateUserData = () => {
  const { mutate, isSuccess } = useMutation({
    mutationFn: async (payload: Payload) => {
      await updateStartLocation(payload.userLocationData);
      await upsertSchedule(payload.userSchedules);
    }
  });
  return { mutate, isSuccess };
};

export const useUpdateStartLocation = () => {
  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: async (payload: UserLocationData) => {
      await updateStartLocation(payload);
    }
  });
  return { mutateAsync, isSuccess };
};

export const useDeleteUserSchedule = (roomId: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: async (payload: { roomId: string; userId: string }) => {
      await deleteMySchedules(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room-user-schedules', roomId] });
    }
  });
  return { mutateAsync, isSuccess };
};
