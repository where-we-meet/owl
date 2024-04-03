import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const getCurrentUserData = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data;
};

export const getRoomData = async (id: string) => {
  const { data, error } = await supabase.from('rooms').select('id, created_by, location, name, verified').eq('id', id);
  if (error) throw error;
  return data;
};

export const getUserSchedule = async (id: string) => {
  const { data, error } = await supabase
    .from('room_schedule')
    .select('room_id, start_date, end_date, created_by')
    .eq('room_id', id);
  if (error) throw error;
  return data;
};

export const getRoomUsersData = async (id: string) => {
  const { data, error } = await supabase
    .from('userdata_room')
    .select(
      `*,
      users(
        profile_url,
        name
      )
      `
    )
    .eq('room_id', id);

  if (error) throw error;
  return data;
};

export const getUsersData = async (id: string) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', id);
  if (error) throw error;
  return data;
};

//테스트 중

type Payload = {};

export const getRealtimeRoomData = (
  id: string,
  start_location: string,
  onUpdateUserData: (payload: Payload) => void,
  refetch: () => void
) => {
  const subscription = supabase
    .channel('room')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'userdata_room', filter: `room_id=eq.${id}` },
      (payload) => {
        console.log('변경 사항을 표기합니다 : ', payload);
        onUpdateUserData(payload);
        refetch();
      }
    )
    .subscribe();
  return () => {
    supabase.removeChannel(subscription);
  };
};
