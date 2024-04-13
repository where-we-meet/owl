import { upsertSchedule, updateStartLocation } from '@/api/supabaseCSR/supabase';
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
      const updateLocationResponse = await updateStartLocation(payload.userLocationData);
      const updateCalendarResponse = await upsertSchedule(payload.userSchedules);
    }
  });
  return { mutate, isSuccess };
};
