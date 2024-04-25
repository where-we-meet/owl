import { createClient } from '@/utils/supabase/client';
import type { UserLocationData } from '@/types/place.types';
import type { UpsertUserSchedule } from '@/types/roomUser';

const supabase = createClient();

// supabase에서 roomId를 통해 해당 room 일정과 관련된 모든 Data 반환
export const getUserSchedule = async (roomId: string) => {
  const { data, error } = await supabase.from('room_schedule').select('*').eq('room_id', roomId);
  if (error) throw error;
  return data;
};

export const getMessageData = async (roomId: string) => {
  const { data, error } = await supabase
    .from('message')
    .select('*, users!public_message_send_by_fkey(*)')
    .eq('room_id', roomId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
};

export const getUsersData = async (userId: string) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', userId);
  if (error) throw error;
  return data;
};

export const getRoomData = async (roomId: string) => {
  const { data, error } = await supabase.from('rooms').select('*').eq('id', roomId);
  if (error) throw error;
  return data[0];
};

export const getRoomUsersData = async (roomId: string) => {
  const { data, error } = await supabase.from('userdata_room').select(`*`).eq('room_id', roomId);
  if (error) throw error;
  return data;
};

export const getRoomUsersId = async (roomId: string) => {
  const { data, error } = await supabase.from('userdata_room').select('user_id').eq('room_id', roomId);
  if (error) throw error;
  return data;
};

export const getRoomUsersProfile = async (userIds: string[]) => {
  const { data, error } = await supabase.from('users').select(`*`).in('id', userIds);
  if (error) throw error;
  return data;
};

export const getMyRoomsData = async (id: string[]) => {
  const { data, error } = await supabase
    .from('rooms')
    .select(
      `
      id,
      name,
      confirmed_date,
      created_at,
      location,
      verified,
      userdata_room(
        user_id,
        users!inner(
          profile_url
        )
      )
    `
    )
    .in('id', id);
  if (error) throw error;
  return data;
};

export const updateUserName = async (userId: string, newName: string) => {
  const { error } = await supabase.from('users').update({ name: newName }).eq('id', userId);
  if (error) throw error;
};

export const getUserMeetingsId = async (userId: string) => {
  const { data, error } = await supabase.from('userdata_room').select('room_id').eq('user_id', userId);
  if (error) throw error;
  return data;
};

export const updateStartLocation = async (payload: UserLocationData) => {
  const { error } = await supabase
    .from('userdata_room')
    .update(payload)
    .eq('room_id', payload.room_id)
    .eq('user_id', payload.user_id);
  if (error) throw error;
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

// 모임 시작하기 페이지에서 설정한 일정 선택 범위 가져오는 로직
export const getRangeOfSchedule = async (id: string) => {
  const { data, error } = await supabase.from('rooms').select('start_date, end_date').eq('id', id);
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
