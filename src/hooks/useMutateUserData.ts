import {
  deleteExitUserData,
  deleteExitUserSchedule,
  deleteRoomByAdmin,
  updateRoomData,
  upsertRoomUser
} from '@/api/room';
import { upsertSchedule, updateStartLocation, deleteMySchedules } from '@/api/supabaseCSR/supabase';
import type { UserLocationData } from '@/types/place.types';
import { UpsertUserSchedule } from '@/types/roomUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Payload = {
  userLocationData: UserLocationData;
  userSchedules: UpsertUserSchedule[];
};

export type RoomUserDate = {
  lat: string;
  lng: string;
  location: string | null;
  verified: boolean;
  confirmed_date: string;
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

export const useRoomUserData = () => {
  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: async (payload: { roomId: string; updated: RoomUserDate }) => {
      await updateRoomData(payload);
    }
  });
  return { mutateAsync, isSuccess };
};

export const useDeleteExitUser = (roomId: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: async (payload: { roomId: string; userId: string }) => {
      await deleteExitUserData(payload);
      await deleteExitUserSchedule(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['left-room-user', roomId] });
    }
  });
  return { mutateAsync, isSuccess };
};

export const useDeleteRoom = () => {
  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: async (payload: { roomId: string; userId: string }) => {
      await deleteRoomByAdmin(payload);
    }
  });
  return { mutateAsync, isSuccess };
};

export const useUpsertRoomUser = (roomId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertRoomUser,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['room-users', roomId] });
    }
  });
};
