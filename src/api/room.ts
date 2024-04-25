import type { RoomUserDate } from '@/hooks/useMutateUserData';
import { RoomUser } from '@/types/roomUser';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const insertNewRoom = async ({
  name,
  created_by,
  start_date,
  end_date
}: {
  name: string;
  created_by: string;
  start_date: string;
  end_date: string;
}) => {
  const { data, error } = await supabase.from('rooms').insert([{ name, created_by, start_date, end_date }]).select();
  if (error) throw error;
  return data;
};

export const upsertRoomUser = async (
  userData: Pick<RoomUser, 'room_id' | 'user_id' | 'start_location' | 'is_admin' | 'lat' | 'lng'>
) => {
  const { data, error } = await supabase.from('userdata_room').upsert([{ ...userData }]);
  if (error) throw error;
  return data;
};

export const getRoomIsConfirmed = async (roomId: string) => {
  const { data, error } = await supabase.from('rooms').select('verified, created_by').eq('id', roomId);
  if (error) throw error;
  return data;
};

export const updateRoomData = async (payload: { roomId: string; updated: RoomUserDate }) => {
  const { data, error } = await supabase.from('rooms').update(payload.updated).eq('id', payload.roomId).select();
  if (error) throw error;
  return data;
};

export const deleteExitUserData = async (payload: { roomId: string; userId: string }) => {
  const { error } = await supabase.from('userdata_room').delete().eq('user_id', payload.userId);

  if (error) throw error;
};

export const deleteExitUserSchedule = async (payload: { roomId: string; userId: string }) => {
  const { error } = await supabase
    .from('room_schedule')
    .delete()
    .eq('room_id', payload.roomId)
    .eq('created_by', payload.userId);

  if (error) throw error;
};

export const deleteRoomByAdmin = async (payload: { roomId: string; userId: string }) => {
  const { error } = await supabase.from('rooms').delete().eq('id', payload.roomId).eq('created_by', payload.userId);

  if (error) throw error;
};

export const getIsAdmin = async (roomId: string, userId: string) => {
  const { data, error } = await supabase.from('rooms').select('created_by').eq('id', roomId).eq('created_by', userId);
  if (error) throw error;
  return data;
};
