import { createClient } from '@/utils/supabase/client';
import { mergeRoomUsersById } from '@/utils/mergeRoomUsersById';
import type { RoomUserDate } from '@/hooks/useMutateUserData';
import type { UpsertRoomUsers } from '@/types/roomUser';
import type { UserLocationData } from '@/types/place.types';

const supabase = createClient();

export const getRoomData = async (roomId: string) => {
  const { data, error } = await supabase.from('rooms').select('*').eq('id', roomId).single();
  if (error) throw error;
  return data;
};

export const getRoomUsersData = async (roomId: string) => {
  const { data, error } = await supabase.from('userdata_room').select('*').eq('room_id', roomId);
  if (error) throw error;
  const userIds = data.map((roomUserData) => roomUserData.user_id);
  const { data: usersData, error: usersError } = await supabase.from('users').select('*').in('id', userIds);
  if (usersError) throw usersError;
  return mergeRoomUsersById(data, usersData);
};

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

export const upsertRoomUser = async (userData: UpsertRoomUsers) => {
  const { data, error } = await supabase.from('userdata_room').upsert([{ ...userData }]);
  if (error) throw error;
  return data;
};

export const getRoomIsConfirmed = async (roomId: string) => {
  const { data, error } = await supabase.from('rooms').select('verified, created_by').eq('id', roomId).single();
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

export const updateStartLocation = async (payload: UserLocationData) => {
  const { error } = await supabase
    .from('userdata_room')
    .update(payload)
    .eq('room_id', payload.room_id)
    .eq('user_id', payload.user_id);
  if (error) throw error;
};

const getMyRoomsData = async (roomIds: string[]) => {
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
    .in('id', roomIds);
  if (error) throw error;
  return data;
};

const getUserMeetingsId = async (userId: string) => {
  const { data, error } = await supabase.from('userdata_room').select('room_id').eq('user_id', userId);
  if (error) throw error;
  return data;
};

export const fetchMeetingInfo = async (userId: string) => {
  const roomData = await getUserMeetingsId(userId);
  const roomIds = roomData.map((item) => item.room_id);
  return await getMyRoomsData(roomIds);
};
