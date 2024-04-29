import { createClient } from '@/utils/supabase/client';
import type { UpsertUserSchedule } from '@/types/roomUser';

const supabase = createClient();

export const getUserSchedule = async (roomId: string) => {
  const { data, error } = await supabase.from('room_schedule').select('*').eq('room_id', roomId);
  if (error) throw error;
  return data;
};

export const upsertSchedule = async (payload: UpsertUserSchedule[]) => {
  const { error } = await supabase.from('room_schedule').upsert(payload);
  if (error) throw error;
};

export const deleteMySchedules = async (payload: { roomId: string; userId: string }) => {
  const { error } = await supabase
    .from('room_schedule')
    .delete()
    .eq('room_id', payload.roomId)
    .eq('created_by', payload.userId);
  if (error) throw error;
};

export const getRangeOfSchedule = async (id: string) => {
  const { data, error } = await supabase.from('rooms').select('start_date, end_date').eq('id', id).single();
  if (error) throw error;
  return data;
};

export const upsertSelectedDate = async ({ roomId, userId, date }: { roomId: string; userId: string; date: Date }) => {
  const { error } = await supabase
    .from('room_schedule')
    .upsert([
      {
        room_id: roomId,
        created_by: userId,
        start_date: date.toDateString(),
        end_date: date.toDateString()
      }
    ])
    .select();
  if (error) throw error;
};

export const deleteSelectedDate = async ({ roomId, userId, date }: { roomId: string; userId: string; date: Date }) => {
  const { error } = await supabase
    .from('room_schedule')
    .delete()
    .eq('room_id', roomId)
    .eq('created_by', userId)
    .eq('start_date', date.toDateString());
  if (error) throw error;
};
