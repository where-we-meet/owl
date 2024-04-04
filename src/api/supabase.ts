import { RoomData } from '@/components/room/sidebar/user/UserList';
import { createClient } from '@/utils/supabase/client';

import { getFileName } from '@/utils/my-owl/profile/modal/getFileName';
import { Dispatch, SetStateAction } from 'react';

const supabase = createClient();

/*
 * CSR
 */

//  supabase auth에서 user Data 반환
export const getCurrentUserData = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data;
};

// supabase에서 roomId를 통해 room에 관련된 모든 Data 반환
export const getRoomData = async (id: string) => {
  const { data, error } = await supabase.from('rooms').select('id, created_by, location, name, verified').eq('id', id);
  if (error) throw error;
  return data;
};

// supabase에서 roomId를 통해 해당 room 일정과 관련된 모든 Data 반환
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

// my-owl 페이지의 유저 프로필 정보에 필요한 Data를 supabase, supabase auth에서 가져와 반환
export const getUserProfileData = async () => {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  if (user !== null) {
    const { data, error } = await supabase.from('users').select('name, profile_url').eq('id', user.id).single();

    if (error) {
      throw error;
    }

    return {
      authSNS: user.app_metadata.providers,
      userInfo: {
        userId: user.id,
        name: data.name,
        profileURL: data.profile_url
      }
    };
  } else {
    return {
      authSNS: null,
      userInfo: null
    };
  }
};

export const getUsersData = async (id: string) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', id);
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
  const { data, error } = await supabase.from('users').update({ name: newName }).eq('id', userId);
  if (error) throw error;
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

// Insert rows

export const updateStartLocation = async (roomId: string, userId: string, location: string) => {
  const { data, error } = await supabase
    .from('userdata_room')
    .update({ room_id: roomId, user_id: userId, start_location: location })
    .eq('room_id', roomId)
    .eq('user_id', userId);
};
