import { extractFileNameFromURL } from '@/utils/extractFileNameFromURL';
import { getFileName } from '@/utils/profile/getFileName';
import { createClient } from '@/utils/supabase/client';
import { Dispatch, SetStateAction } from 'react';
const supabase = createClient();

export const getUserProfileData = async (id: string) => {
  const { data, error } = await supabase.from('users').select('name, profile_url').eq('id', id).single();
  if (error) throw error;
  return data;
};

export const updateUserName = async (userId: string, newName: string) => {
  const { error } = await supabase.from('users').update({ name: newName }).eq('id', userId);
  if (error) throw error;
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
    const { error } = await supabase.storage.from('images').upload(`users_profile/${userId}/${file_name}`, file);
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

export const changeUserProfile = async ({ userId, profile_url }: { userId: string; profile_url: string }) => {
  const { error } = await supabase.from('users').update({ profile_url }).eq('id', userId);
  if (error) alert(`문제가 발생하였습니다. ${error.message}`);
};
