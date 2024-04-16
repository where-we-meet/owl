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

export const updateRoomData = async (
  roomId: string,
  updated: { lat: string; lng: string; location: string; verified: boolean; confirmed_date: string }
) => {
  const { data, error } = await supabase.from('rooms').update(updated).eq('id', roomId).select();
  if (error) throw error;
  return data;
};
