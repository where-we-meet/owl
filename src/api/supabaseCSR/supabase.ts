import { Dispatch, SetStateAction } from 'react';
import { createClient } from '@/utils/supabase/client';
import { getFileName } from '@/utils/my-owl/profile/modal/getFileName';
import type { UserLocationData } from '@/types/place.types';
import type { UpsertUserSchedule } from '@/types/roomUser';
import { extractFileNameFromURL } from '@/utils/extractFileNameFromURL';

const supabase = createClient();

// supabase에서 roomId를 통해 해당 room 일정과 관련된 모든 Data 반환
export const getUserSchedule = async (roomId: string) => {
  const { data, error } = await supabase.from('room_schedule').select('*').eq('room_id', roomId);
  if (error) throw error;
  return data;
};

// //supabase에서 roomId와 userId를 통해 내가 선택한 날짜를 반환
// export const getMySchedule = async (userId: string, roomId: string) => {
//   const { data, error } = await supabase
//     .from('room_schedule')
//     .select('*')
//     .eq('room_id', roomId)
//     .eq('created_by', userId);
//   if (error) throw error;
//   return data;
// };

// //supabase에서 roomId와 userId를 통해 내가 아닌 다른 유저들의 날짜를 반환
// export const getAnotherUsersSchedule = async (userId: string, roomId: string) => {
//   const { data, error } = await supabase
//     .from('room_schedule')
//     .select('*')
//     .eq('room_id', roomId)
//     .neq('created_by', userId);
//   if (error) throw error;
//   return data;
// };

export const getMessageData = async (roomId: string) => {
  const { data, error } = await supabase.from('message').select('*, users(*)').eq('room_id', roomId);
  if (error) throw error;
  return data;
};

export const getMessages = async (roomId: string) => {
  const { data, error } = await supabase.from('message').select('*').eq('room_Id', roomId);
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

export const getRoomParticipantNumber = async (roomId: string) => {
  const { data, error } = await supabase.from('userdata_room').select('user_id').eq('room_id', roomId);
  if (error) throw error;
  return data.length;
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
export const uploadImage = async ({
  file,
  setFile,
  userId
}: {
  file: File;
  setFile: Dispatch<SetStateAction<File | null>>;
  userId: string;
}) => {
  const file_name = getFileName();

  if (file) {
    const { data, error } = await supabase.storage.from('images').upload(`users_profile/${userId}/${file_name}`, file);
    setFile(null);

    if (error) {
      alert(`이미지 업로드에 실패하였습니다.\n 원인 : ${error.message} `);
    } else {
      alert(`이미지를 성공적으로 업로드하였습니다.`);
      return `${process.env
        .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/images/users_profile/${userId}/${file_name}`;
    }
  }
};

export const deleteProfileImage = async ({
  userId,
  fileURL
}: {
  userId: string;
  fileURL: string | null | undefined;
}) => {
  if (fileURL !== null && fileURL !== undefined) {
    const fileName = extractFileNameFromURL(fileURL);
    const { error } = await supabase.storage.from('images').remove([`users_profile/${userId}/${fileName}`]);
    if (error) return false;
    return true;
  }
  return false;
};

export const findCurrentUploadedProfileImage = async ({ userId }: { userId: string }) => {
  const folderPath = `users_profile/${userId}/`;
  const { data: files, error } = await supabase.storage.from('images').list(folderPath);

  if (error) throw error;
  if (files && files.length > 0) {
    const profilePicUrl = supabase.storage.from('images').getPublicUrl(files[files.length - 1].name);
    return profilePicUrl.data.publicUrl;
  }
  return null;
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

export const upsertSchedule = async (payload: UpsertUserSchedule[]) => {
  const { data, error } = await supabase.from('room_schedule').upsert(payload);
};

export const deleteMySchedules = async (payload: { roomId: string; userId: string }) => {
  await supabase.from('room_schedule').delete().eq('room_id', payload.roomId).eq('created_by', payload.userId);
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
