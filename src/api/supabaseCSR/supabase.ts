import { createClient } from '@/utils/supabase/client';
import { getFileName } from '@/utils/my-owl/profile/modal/getFileName';
import { Dispatch, SetStateAction } from 'react';
import { Tables } from '@/types/supabase';
import { UserLocationData } from '@/types/place.types';

const supabase = createClient();

//  supabase auth에서 user Data 반환
export const getCurrentUserData = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data;
};

// supabase에서 roomId를 통해 해당 room 일정과 관련된 모든 Data 반환
export const getUserSchedule = async (id: string) => {
  const { data, error } = await supabase.from('room_schedule').select('*').eq('room_id', id);
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

export const getMyParticipatingRoomsData = async (id: string[]) => {
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

//유저 프로필 사진 업데이트 로직
export const changeUserProfile = async ({ userId, profile_url }: { userId: string; profile_url: string }) => {
  const { data, error } = await supabase.from('users').update({ profile_url }).eq('id', userId);
  if (error) {
    alert(`문제가 발생하였습니다. ${error.message}`);
  }
};

//supabase store 이미지 업로드 로직
export const uploadImage = async (file: File, setFile: Dispatch<SetStateAction<File | null>>) => {
  const file_name = getFileName();

  if (file) {
    const { data, error } = await supabase.storage.from('images').upload(`users_profile/${file_name}`, file);
    setFile(null);

    if (error) {
      alert(`이미지 업로드에 실패하였습니다.\n 원인 : ${error.message} `);
    } else {
      alert(`이미지를 성공적으로 업로드하였습니다.`);
      return `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/images/users_profile/${file_name}`;
    }
  }
};

// supabase useres table에서 user Name 변경
export const updateUserName = async (userId: string, newName: string) => {
  const { error } = await supabase.from('users').update({ name: newName }).eq('id', userId);
  if (error) throw error;
};

export const getUserMeetingsId = async (userId: string) => {
  if (userId !== null) {
    const { data, error } = await supabase.from('userdata_room').select('room_id').eq('user_id', userId);
    if (error) throw error;
    return data;
  }
  return [];
};

// Insert rows

export const updateStartLocation = async (payload: UserLocationData) => {
  const { data, error } = await supabase
    .from('userdata_room')
    .update(payload)
    .eq('room_id', payload.room_id)
    .eq('user_id', payload.user_id);
};

// 모임 시작하기 페이지에서 설정한 일정 선택 범위 가져오는 로직
export const getRangeOfSchedule = async (id: string) => {
  const { data, error } = await supabase.from('rooms').select('start_date, end_date').eq('id', id);

  if (error) throw error;
  return data;
};
