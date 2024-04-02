import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const getUserSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data;
};

export const getRoomData = async (id: string) => {
  const { data, error } = await supabase.from('rooms').select('id, created_by, location, name, verified').eq('id', id);
  if (error) throw error;
  return data;
};

export const getUserSchedule = async () => {
  const { data, error } = await supabase.from('room_schedule').select('room_id, start_date, end_date, created_by');
  if (error) throw error;
  return data;
};

export const getRoomUsersData = async () => {
  const { data, error } = await supabase.from('userdata_room').select('*');
  if (error) throw error;
  return data;
};
