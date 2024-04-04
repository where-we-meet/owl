import { RoomData } from '@/components/room/sidebar/user/UserList';
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

export const updateSchedule = async (id: string, dateList: []) => {
  const { data, error } = await supabase.from('room_schedule').upsert({ id: id, date_list: dateList }).select();

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

export const getRealtimeRoomData = (id: string, setRoomData: (roomData: RoomData) => void) => {
  const subscription = supabase
    .channel('room')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'userdata_room', filter: `room_id=eq.${id}` },
      async (payload) => {
        console.log('변경 사항을 표기합니다 : ', payload);
        const { error, data } = await supabase
          .from('userdata_room')
          .select(`*, users(profile_url, name)`)
          .eq('room_id', id);
        if (error) {
          console.error('불러오기 실패', error);
        } else {
          setRoomData(data);
        }
      }
    )
    .subscribe();
  return subscription;
};
