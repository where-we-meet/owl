import { getCurrentUserData } from '@/api/supabaseCSR/supabase';

//유저 아이디 조회 로직
export const getUserId = async () => {
  const { user } = await getCurrentUserData();
  const userId = user.id;

  return userId;
};
