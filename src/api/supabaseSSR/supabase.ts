import { createClient } from '@/utils/supabase/server';

/*
 * SSR
 */

// my-owl 페이지의 유저 프로필 정보에 필요한 Data를 supabase, supabase auth에서 가져와 반환
export const getUserProfileData = async () => {
  const supabase = await createClient();

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
