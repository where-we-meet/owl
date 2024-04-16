import { upsertSchedule, updateStartLocation, deleteSchedule } from '@/api/supabaseCSR/supabase';
import { UserLocationData } from '@/types/place.types';
import { UpsertUserSchedule } from '@/types/roomUser';
import { useMutation } from '@tanstack/react-query';

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

export const useDeleteUserSchedule = () => {
  const { mutate, isSuccess } = useMutation({
    mutationFn: async (payload: { roomId: string; userId: string }) => {
      await deleteSchedule(payload);
    }
  });
  return { mutate, isSuccess };
};
