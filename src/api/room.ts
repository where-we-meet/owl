import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const insertNewRoom = async (name: string, created_by: string) => {
  const { data, error } = await supabase.from('rooms').insert([{ name, created_by }]).select();
  if (error) throw error;
  return data;
};

export const insertRoomUser = async (room_id: string, user_id: string, is_admin: boolean) => {
  const { data, error } = await supabase.from('userdata_room').insert([{ room_id, user_id, is_admin: true }]);
  if (error) throw error;
  return data;
};
