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
  const { error: insertScheduleError } = await supabase
    .from('room_schedule')
    .insert([{ room_id, created_by: user_id }]);
  if (insertUserError) throw insertUserError;
  if (insertScheduleError) throw insertScheduleError;
  return data;
};
