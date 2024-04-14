import { createClient } from '@/utils/supabase/client';
import { eq } from 'lodash';

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

export const insertRoomUser = async ({
  room_id,
  user_id,
  is_admin
}: {
  room_id: string;
  user_id: string;
  is_admin: boolean;
}) => {
  const { data, error: insertUserError } = await supabase
    .from('userdata_room')
    .insert([{ room_id, user_id, is_admin }]);

  if (insertUserError) throw insertUserError;

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
